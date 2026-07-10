#!/usr/bin/env python3
"""Deterministically remove one landed Git worktree and its local branch.

The command is dry-run by default. Mutating execution requires both
``--final-hooks-complete`` and ``--execute``. A journal under the Git common
directory makes an interrupted or partially completed removal resumable without
guessing whether an unregistered filesystem path is safe to delete.
"""

from __future__ import annotations

import argparse
import fcntl
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Sequence


SCHEMA_VERSION = 1
EXIT_USAGE = 2
EXIT_VALIDATION = 3
EXIT_GIT = 4
EXIT_PARTIAL = 5
EXIT_POSTCONDITION = 6


class CleanupError(RuntimeError):
    def __init__(self, message: str, *, code: int, status: str = "blocked") -> None:
        super().__init__(message)
        self.code = code
        self.status = status


@dataclass(frozen=True)
class WorktreeRecord:
    path: Path
    head: str
    branch_ref: str | None
    detached: bool
    locked: bool


@dataclass
class Report:
    mode: str
    repo: str = ""
    worktree: str | None = None
    expected: dict[str, Any] = field(default_factory=dict)
    initial_state: dict[str, Any] = field(default_factory=dict)
    steps: list[dict[str, Any]] = field(default_factory=list)
    final_state: dict[str, Any] = field(default_factory=dict)
    journal_path: str | None = None
    blockers: list[str] = field(default_factory=list)
    status: str = "blocked"

    def step(
        self,
        name: str,
        *,
        attempted: bool,
        rc: int | None,
        outcome: str,
        detail: str | None = None,
    ) -> None:
        entry: dict[str, Any] = {
            "name": name,
            "attempted": attempted,
            "rc": rc,
            "outcome": outcome,
        }
        if detail:
            entry["detail"] = detail[-500:]
        self.steps.append(entry)

    def as_dict(self) -> dict[str, Any]:
        return {
            "schema_version": SCHEMA_VERSION,
            "mode": self.mode,
            "status": self.status,
            "repo": self.repo,
            "worktree": self.worktree,
            "expected": self.expected,
            "initial_state": self.initial_state,
            "steps": self.steps,
            "final_state": self.final_state,
            "journal_path": self.journal_path,
            "blockers": self.blockers,
        }


def _run(
    args: Sequence[str],
    *,
    cwd: Path | None = None,
    check: bool = False,
    timeout: int | None = None,
) -> subprocess.CompletedProcess[str]:
    try:
        result = subprocess.run(
            list(args),
            cwd=str(cwd) if cwd else None,
            text=True,
            capture_output=True,
            check=False,
            timeout=timeout,
        )
    except subprocess.TimeoutExpired as exc:
        raise CleanupError(
            f"command timed out after {timeout}s: {' '.join(args)}",
            code=EXIT_GIT,
            status="partial",
        ) from exc
    if check and result.returncode != 0:
        detail = (result.stderr or result.stdout).strip()
        raise CleanupError(
            f"command failed ({result.returncode}): {' '.join(args)}: {detail[-500:]}",
            code=EXIT_GIT,
        )
    return result


def _git(
    repo: Path, *args: str, check: bool = True
) -> subprocess.CompletedProcess[str]:
    return _run(["git", "-C", str(repo), *args], check=check)


def _canonical_absolute(raw: str, *, name: str) -> Path:
    path = Path(raw).expanduser()
    if not path.is_absolute():
        raise CleanupError(
            f"{name} must be an absolute path: {raw}", code=EXIT_VALIDATION
        )
    return path.resolve(strict=False)


def _is_within(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
    except ValueError:
        return False
    return True


def _resolve_repo(raw: str) -> Path:
    candidate = _canonical_absolute(raw, name="--repo")
    result = _run(
        ["git", "-C", str(candidate), "rev-parse", "--show-toplevel"],
        check=True,
    )
    return Path(result.stdout.strip()).resolve()


def _git_common_dir(repo: Path) -> Path:
    result = _git(repo, "rev-parse", "--git-common-dir")
    value = Path(result.stdout.strip())
    if not value.is_absolute():
        value = repo / value
    return value.resolve()


def _resolve_commit(repo: Path, value: str, *, name: str) -> str:
    result = _git(repo, "rev-parse", "--verify", f"{value}^{{commit}}", check=False)
    if result.returncode != 0:
        raise CleanupError(f"{name} is not a commit: {value}", code=EXIT_VALIDATION)
    return result.stdout.strip()


def _resolve_immutable_commit(repo: Path, value: str, *, name: str) -> str:
    object_format = _git(repo, "rev-parse", "--show-object-format", check=False)
    oid_lengths = {"sha1": 40, "sha256": 64}
    oid_length = oid_lengths.get(object_format.stdout.strip())
    if object_format.returncode != 0 or oid_length is None:
        probe = _git(repo, "rev-parse", "--verify", "HEAD^{commit}", check=False)
        probe_value = probe.stdout.strip()
        if probe.returncode != 0 or len(probe_value) not in oid_lengths.values():
            raise CleanupError(
                "could not determine the repository object ID format",
                code=EXIT_GIT,
            )
        oid_length = len(probe_value)
    if not re.fullmatch(rf"[0-9a-fA-F]{{{oid_length}}}", value):
        raise CleanupError(
            f"{name} must be a full {oid_length}-character commit OID, "
            f"not a mutable ref: {value}",
            code=EXIT_VALIDATION,
        )
    resolved = _resolve_commit(repo, value, name=name)
    if resolved.lower() != value.lower():
        raise CleanupError(
            f"{name} did not resolve exactly to {value}", code=EXIT_VALIDATION
        )
    return resolved


def _resolve_local_branch_ref(repo: Path, value: str, *, name: str) -> str:
    result = _git(
        repo,
        "rev-parse",
        "--symbolic-full-name",
        "--verify",
        value,
        check=False,
    )
    ref = result.stdout.strip()
    if result.returncode != 0 or not ref.startswith("refs/heads/"):
        raise CleanupError(
            f"{name} must resolve to an existing local branch: {value}",
            code=EXIT_VALIDATION,
        )
    return ref


def _validate_branch_name(repo: Path, branch: str) -> str:
    result = _git(repo, "check-ref-format", "--branch", branch, check=False)
    if result.returncode != 0 or branch.startswith("-"):
        raise CleanupError(
            f"--expected-branch is not a valid local branch name: {branch}",
            code=EXIT_VALIDATION,
        )
    return f"refs/heads/{branch}"


def _protected_base_refs(repo: Path, selected_base_ref: str) -> set[str]:
    protected = {selected_base_ref}
    for branch in ("main", "master"):
        ref = f"refs/heads/{branch}"
        if _ref_oid(repo, ref) is not None:
            protected.add(ref)

    configured = _git(repo, "config", "--get", "init.defaultBranch", check=False)
    if configured.returncode == 0 and configured.stdout.strip():
        ref = f"refs/heads/{configured.stdout.strip()}"
        if _ref_oid(repo, ref) is not None:
            protected.add(ref)

    remote_heads = _git(
        repo,
        "for-each-ref",
        "--format=%(symref)",
        "refs/remotes/*/HEAD",
        check=False,
    )
    if remote_heads.returncode == 0:
        for remote_ref in remote_heads.stdout.splitlines():
            parts = remote_ref.strip().split("/", 3)
            if len(parts) == 4 and parts[:2] == ["refs", "remotes"]:
                local_ref = f"refs/heads/{parts[3]}"
                if _ref_oid(repo, local_ref) is not None:
                    protected.add(local_ref)
    return protected


def _is_ancestor(repo: Path, ancestor: str, descendant: str) -> bool:
    result = _git(
        repo, "merge-base", "--is-ancestor", ancestor, descendant, check=False
    )
    if result.returncode not in (0, 1):
        raise CleanupError(
            f"could not test ancestry: {ancestor} -> {descendant}",
            code=EXIT_GIT,
        )
    return result.returncode == 0


def _parse_worktrees(repo: Path) -> list[WorktreeRecord]:
    result = _git(repo, "worktree", "list", "--porcelain", "-z")
    records: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    for token in result.stdout.split("\0"):
        if not token:
            continue
        key, _, value = token.partition(" ")
        if key == "worktree":
            if current:
                records.append(current)
            current = {"path": value}
            continue
        if current is None:
            raise CleanupError("malformed git worktree porcelain output", code=EXIT_GIT)
        if key in {"detached", "locked"}:
            current[key] = True
        else:
            current[key] = value
    if current:
        records.append(current)

    parsed: list[WorktreeRecord] = []
    for record in records:
        parsed.append(
            WorktreeRecord(
                path=Path(record["path"]).resolve(strict=False),
                head=record.get("HEAD", ""),
                branch_ref=record.get("branch"),
                detached=bool(record.get("detached")),
                locked=bool(record.get("locked")),
            )
        )
    return parsed


def _record_for(repo: Path, target: Path) -> WorktreeRecord | None:
    matches = [record for record in _parse_worktrees(repo) if record.path == target]
    if len(matches) > 1:
        raise CleanupError(
            f"duplicate worktree registrations for {target}", code=EXIT_GIT
        )
    return matches[0] if matches else None


def _path_present(path: Path) -> bool:
    return os.path.lexists(path)


def _path_identity(path: Path) -> dict[str, int] | None:
    if not _path_present(path):
        return None
    stat = os.lstat(path)
    return {"device": stat.st_dev, "inode": stat.st_ino, "mode": stat.st_mode}


def _primary_checkout(common_dir: Path) -> Path | None:
    if common_dir.name != ".git" or not common_dir.is_dir():
        return None
    candidate = common_dir.parent.resolve()
    if (candidate / ".git").is_dir():
        return candidate
    return None


def _state(repo: Path, target: Path) -> tuple[bool, WorktreeRecord | None]:
    return _path_present(target), _record_for(repo, target)


def _ref_oid(repo: Path, ref: str) -> str | None:
    result = _git(
        repo, "rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}", check=False
    )
    if result.returncode == 1:
        return None
    if result.returncode != 0:
        raise CleanupError(f"could not read ref {ref}", code=EXIT_GIT)
    return result.stdout.strip()


def _transaction_path(common_dir: Path, identity: str) -> Path:
    digest = hashlib.sha256(identity.encode("utf-8")).hexdigest()[:24]
    return common_dir / "fin-cleanup" / f"{digest}.json"


def _journal_path(common_dir: Path, target: Path) -> Path:
    return _transaction_path(common_dir, f"worktree:{target}")


def _read_journal(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CleanupError(
            f"cannot read cleanup journal {path}: {exc}", code=EXIT_PARTIAL
        ) from exc
    if not isinstance(value, dict) or value.get("schema_version") != SCHEMA_VERSION:
        raise CleanupError(f"unsupported cleanup journal {path}", code=EXIT_PARTIAL)
    return value


def _write_journal(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        "w",
        encoding="utf-8",
        dir=path.parent,
        prefix=f".{path.name}.",
        delete=False,
    ) as handle:
        json.dump(value, handle, sort_keys=True)
        handle.write("\n")
        temporary = Path(handle.name)
    os.replace(temporary, path)


def _journal_matches(
    journal: dict[str, Any],
    *,
    repo: Path,
    target: Path,
    expected_head: str,
    branch_ref: str | None,
    detached: bool,
    base_branch_ref: str,
    landed_oid: str,
    merge_mode: str,
) -> bool:
    return (
        journal.get("repo") == str(repo)
        and journal.get("worktree") == str(target)
        and journal.get("expected_head") == expected_head
        and journal.get("branch_ref") == branch_ref
        and journal.get("detached") is detached
        and journal.get("base_branch_ref") == base_branch_ref
        and journal.get("landed_commit") == landed_oid
        and journal.get("merge_mode") == merge_mode
    )


def _validate_target_path(repo: Path, target: Path, *, primary: Path | None) -> None:
    if target == repo:
        raise CleanupError(
            "refusing to remove the retained checkout", code=EXIT_VALIDATION
        )
    if primary is not None and target == primary:
        raise CleanupError(
            f"refusing to remove the repository's primary checkout: {primary}",
            code=EXIT_VALIDATION,
        )
    if _is_within(target, repo) or _is_within(repo, target):
        raise CleanupError(
            "worktree and retained checkout must not contain one another",
            code=EXIT_VALIDATION,
        )
    cwd = Path.cwd().resolve()
    if cwd == target or _is_within(cwd, target):
        raise CleanupError(
            "run cleanup outside the target worktree", code=EXIT_VALIDATION
        )
    if target == Path(target.anchor) or target == Path.home().resolve():
        raise CleanupError(f"unsafe worktree path: {target}", code=EXIT_VALIDATION)
    if target.is_symlink():
        raise CleanupError(
            f"refusing symlink worktree path: {target}", code=EXIT_VALIDATION
        )
    if target.exists() and os.path.ismount(target):
        raise CleanupError(
            f"refusing mounted worktree path: {target}", code=EXIT_VALIDATION
        )


def _validate_registered_identity(
    record: WorktreeRecord,
    *,
    expected_head: str,
    branch_ref: str | None,
    detached: bool,
) -> None:
    if record.locked:
        raise CleanupError(f"worktree is locked: {record.path}", code=EXIT_VALIDATION)
    if record.head != expected_head:
        raise CleanupError(
            f"worktree HEAD moved: expected {expected_head}, found {record.head}",
            code=EXIT_VALIDATION,
        )
    if detached:
        if not record.detached or record.branch_ref is not None:
            raise CleanupError(
                "worktree is not detached as expected", code=EXIT_VALIDATION
            )
    elif record.branch_ref != branch_ref:
        raise CleanupError(
            f"worktree branch mismatch: expected {branch_ref}, found {record.branch_ref}",
            code=EXIT_VALIDATION,
        )


def _remove_path(path: Path) -> None:
    if path.is_symlink():
        raise CleanupError(
            f"refusing orphan symlink: {path}", code=EXIT_PARTIAL, status="partial"
        )
    if path.exists() and os.path.ismount(path):
        raise CleanupError(
            f"refusing orphan mount: {path}", code=EXIT_PARTIAL, status="partial"
        )
    if path.is_dir():
        shutil.rmtree(path)
    elif _path_present(path):
        path.unlink()


def _require_journaled_path_identity(path: Path, journal: dict[str, Any]) -> None:
    expected = journal.get("path_identity")
    actual = _path_identity(path)
    if not isinstance(expected, dict) or actual != expected:
        raise CleanupError(
            "orphan path identity differs from the journal; refusing recursive deletion",
            code=EXIT_PARTIAL,
            status="partial",
        )


def _remaining_clean_candidates(target: Path) -> list[str]:
    result = _run(
        ["git", "-C", str(target), "clean", "-ndx"],
        check=False,
    )
    if result.returncode != 0:
        raise CleanupError("git clean dry-run failed after cleanup", code=EXIT_GIT)
    return [line for line in result.stdout.splitlines() if line.strip()]


def _prepare_registered_worktree(report: Report, target: Path) -> None:
    reset = _run(["git", "-C", str(target), "reset", "--hard"], check=False)
    report.step(
        "reset_hard",
        attempted=True,
        rc=reset.returncode,
        outcome="passed" if reset.returncode == 0 else "failed",
        detail=reset.stderr.strip() or None,
    )
    if reset.returncode != 0:
        raise CleanupError("initial reset --hard failed", code=EXIT_GIT)

    tracked = _run(
        ["git", "-C", str(target), "status", "--porcelain=v1", "--untracked-files=no"],
        check=False,
    )
    if tracked.returncode != 0 or tracked.stdout:
        raise CleanupError("tracked state is not clean after reset", code=EXIT_GIT)

    clean = _run(["git", "-C", str(target), "clean", "-fdx", "-q"], check=False)
    report.step(
        "clean_untracked_ignored",
        attempted=True,
        rc=clean.returncode,
        outcome="passed" if clean.returncode == 0 else "failed",
        detail=clean.stderr.strip() or None,
    )
    if clean.returncode != 0:
        raise CleanupError("git clean -fdx -q failed", code=EXIT_GIT)

    tracked_after = _run(
        ["git", "-C", str(target), "status", "--porcelain=v1", "--untracked-files=no"],
        check=False,
    )
    if tracked_after.returncode != 0:
        raise CleanupError("tracked-state check failed after clean", code=EXIT_GIT)
    if tracked_after.stdout:
        recovery = _run(["git", "-C", str(target), "reset", "--hard"], check=False)
        report.step(
            "post_clean_tracked_recovery",
            attempted=True,
            rc=recovery.returncode,
            outcome="passed" if recovery.returncode == 0 else "failed",
            detail=f"tracked_entries={len(tracked_after.stdout.splitlines())}",
        )
        if recovery.returncode != 0:
            raise CleanupError("post-clean reset --hard failed", code=EXIT_GIT)
        recheck = _run(
            [
                "git",
                "-C",
                str(target),
                "status",
                "--porcelain=v1",
                "--untracked-files=no",
            ],
            check=False,
        )
        if recheck.returncode != 0 or recheck.stdout:
            raise CleanupError(
                "tracked state remains dirty after one post-clean recovery reset",
                code=EXIT_POSTCONDITION,
            )
    else:
        report.step(
            "post_clean_tracked_recovery",
            attempted=False,
            rc=None,
            outcome="not_needed",
        )

    full_status = _run(
        ["git", "-C", str(target), "status", "--porcelain=v1", "--untracked-files=all"],
        check=False,
    )
    if full_status.returncode != 0 or full_status.stdout:
        raise CleanupError(
            "worktree is dirty after reset and clean", code=EXIT_POSTCONDITION
        )
    remaining = _remaining_clean_candidates(target)
    if remaining:
        raise CleanupError(
            f"git clean left {len(remaining)} removable paths; refusing removal",
            code=EXIT_POSTCONDITION,
        )


def _recover_registered_absent(report: Report, repo: Path, target: Path) -> None:
    stale = [
        record for record in _parse_worktrees(repo) if not _path_present(record.path)
    ]
    target_stale = [record for record in stale if record.path == target]
    unrelated = [record.path for record in stale if record.path != target]
    if not target_stale:
        return
    remove = _git(repo, "worktree", "remove", "--force", str(target), check=False)
    report.step(
        "remove_stale_registration",
        attempted=True,
        rc=remove.returncode,
        outcome="passed" if remove.returncode == 0 else "failed",
        detail=(
            f"unrelated_stale_registrations_preserved={len(unrelated)}; "
            f"{remove.stderr.strip()}"
        ).strip(),
    )
    if remove.returncode != 0:
        raise CleanupError(
            "could not remove the exact stale worktree registration",
            code=EXIT_PARTIAL,
            status="partial",
        )


def _remove_worktree(
    report: Report,
    *,
    repo: Path,
    target: Path,
    journal_path: Path,
    journal: dict[str, Any],
    timeout_seconds: int,
) -> None:
    path_present, record = _state(repo, target)
    if record is not None:
        journal["phase"] = "prepare"
        _write_journal(journal_path, journal)
        if path_present:
            _prepare_registered_worktree(report, target)
            journal["phase"] = "remove_started"
            _write_journal(journal_path, journal)
            try:
                result = _run(
                    ["git", "-C", str(repo), "worktree", "remove", str(target)],
                    check=False,
                    timeout=timeout_seconds,
                )
                report.step(
                    "git_worktree_remove",
                    attempted=True,
                    rc=result.returncode,
                    outcome="passed" if result.returncode == 0 else "failed",
                    detail=result.stderr.strip() or None,
                )
            except CleanupError as exc:
                report.step(
                    "git_worktree_remove",
                    attempted=True,
                    rc=None,
                    outcome="timed_out",
                    detail=str(exc),
                )
            journal["phase"] = "remove_returned"
            _write_journal(journal_path, journal)
        else:
            journal["phase"] = "stale_registration_recovery"
            _write_journal(journal_path, journal)
            _recover_registered_absent(report, repo, target)

    path_present, record = _state(repo, target)
    if record is not None and not path_present:
        _recover_registered_absent(report, repo, target)
        path_present, record = _state(repo, target)
    if record is None and path_present:
        persisted = _read_journal(journal_path)
        if persisted is None or persisted.get("phase") not in {
            "remove_started",
            "remove_returned",
            "orphan_recovery",
        }:
            raise CleanupError(
                "unregistered path exists without a cleanup transaction proving ownership",
                code=EXIT_PARTIAL,
                status="partial",
            )
        journal["phase"] = "orphan_recovery"
        _write_journal(journal_path, journal)
        _require_journaled_path_identity(target, journal)
        _remove_path(target)
        report.step(
            "remove_journaled_orphan",
            attempted=True,
            rc=0,
            outcome="passed",
        )
        path_present, record = _state(repo, target)
    if record is not None or path_present:
        raise CleanupError(
            "worktree removal did not reach unregistered+absent",
            code=EXIT_POSTCONDITION,
            status="partial",
        )


def _delete_branch(
    report: Report,
    *,
    repo: Path,
    branch: str,
    expected_head: str,
    base_oid: str,
    landed_oid: str,
    merge_mode: str,
) -> None:
    branch_ref = f"refs/heads/{branch}"
    current = _ref_oid(repo, branch_ref)
    if current is None:
        report.step(
            "delete_local_branch",
            attempted=False,
            rc=None,
            outcome="already_absent",
        )
        return
    if current != expected_head:
        raise CleanupError(
            f"local branch moved: expected {expected_head}, found {current}",
            code=EXIT_VALIDATION,
        )
    users = [
        record.path
        for record in _parse_worktrees(repo)
        if record.branch_ref == branch_ref
    ]
    if users:
        raise CleanupError(
            f"local branch is still checked out at: {', '.join(map(str, users))}",
            code=EXIT_POSTCONDITION,
        )
    if not _is_ancestor(repo, landed_oid, base_oid):
        raise CleanupError(
            "base ref does not contain the landed commit", code=EXIT_VALIDATION
        )
    if merge_mode == "merge":
        if not _is_ancestor(repo, expected_head, base_oid):
            raise CleanupError(
                "merge-mode branch head is not contained in the base ref",
                code=EXIT_VALIDATION,
            )
        flag = "-d"
    else:
        flag = "-D"
    result = _git(repo, "branch", flag, "--", branch, check=False)
    report.step(
        "delete_local_branch",
        attempted=True,
        rc=result.returncode,
        outcome="passed" if result.returncode == 0 else "failed",
        detail=result.stderr.strip() or None,
    )
    if result.returncode != 0:
        raise CleanupError("local branch deletion failed", code=EXIT_GIT)


def _sparse_state(target: Path) -> str | None:
    if not target.exists():
        return None
    result = _run(
        ["git", "-C", str(target), "config", "--bool", "core.sparseCheckout"],
        check=False,
    )
    if result.returncode == 0:
        return result.stdout.strip() or "false"
    return "false"


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Safely remove one landed Git worktree and its local branch.",
    )
    parser.add_argument(
        "--repo", required=True, help="Retained checkout for the repository"
    )
    location = parser.add_mutually_exclusive_group(required=True)
    location.add_argument("--worktree", help="Exact absolute worktree path")
    location.add_argument(
        "--no-worktree",
        action="store_true",
        help="Delete only a proven landed local branch that is checked out nowhere",
    )
    identity = parser.add_mutually_exclusive_group(required=True)
    identity.add_argument("--expected-branch", help="Expected local branch name")
    identity.add_argument(
        "--detached", action="store_true", help="Require a detached worktree"
    )
    parser.add_argument(
        "--expected-head", required=True, help="Expected full worktree HEAD commit OID"
    )
    parser.add_argument(
        "--base-ref", required=True, help="Locally refreshed local base branch"
    )
    parser.add_argument(
        "--landed-commit",
        required=True,
        help="Full commit OID proving landing in base",
    )
    parser.add_argument(
        "--merge-mode",
        required=True,
        choices=("merge", "squash", "rebase"),
    )
    parser.add_argument(
        "--final-hooks-complete",
        action="store_true",
        help="Assert matching fin hooks have completed",
    )
    parser.add_argument(
        "--execute", action="store_true", help="Perform destructive cleanup"
    )
    parser.add_argument("--timeout-seconds", type=int, default=900)
    return parser


def _populate_final_state_best_effort(report: Report) -> None:
    if not report.repo or not report.expected:
        return
    try:
        repo = Path(report.repo)
        if report.worktree:
            path_present, record = _state(repo, Path(report.worktree))
        else:
            path_present, record = False, None
        branch = report.expected.get("branch")
        branch_ref = f"refs/heads/{branch}" if branch else None
        branch_present = _ref_oid(repo, branch_ref) is not None if branch_ref else False
        landed = report.expected.get("landed_commit")
        base_oid = report.expected.get("base_oid")
        base_contains = (
            _is_ancestor(repo, landed, base_oid) if landed and base_oid else None
        )
        report.final_state = {
            "path_present": path_present,
            "registered": record is not None,
            "branch_present": branch_present,
            "base_contains_landed_commit": base_contains,
        }
    except CleanupError:
        # Preserve the original blocker; best-effort reporting must not mask it.
        return


def _failure_after_mutation(report: Report) -> bool:
    return report.mode == "execute" and any(
        step.get("attempted") for step in report.steps
    )


def run(args: argparse.Namespace, report: Report | None = None) -> tuple[Report, int]:
    report = report or Report(mode="execute" if args.execute else "dry-run")
    repo = _resolve_repo(args.repo)
    common_dir = _git_common_dir(repo)
    primary = _primary_checkout(common_dir)
    target: Path | None = None
    if args.worktree:
        raw_target = Path(args.worktree).expanduser()
        if raw_target.is_symlink():
            raise CleanupError(
                f"refusing symlink worktree argument: {raw_target}",
                code=EXIT_VALIDATION,
            )
        target = _canonical_absolute(args.worktree, name="--worktree")
        _validate_target_path(repo, target, primary=primary)
    elif args.detached:
        raise CleanupError(
            "--no-worktree requires --expected-branch",
            code=EXIT_USAGE,
        )
    expected_head = _resolve_immutable_commit(
        repo, args.expected_head, name="--expected-head"
    )
    base_branch_ref = _resolve_local_branch_ref(repo, args.base_ref, name="--base-ref")
    base_oid = _resolve_commit(repo, args.base_ref, name="--base-ref")
    landed_oid = _resolve_immutable_commit(
        repo, args.landed_commit, name="--landed-commit"
    )
    branch_ref = (
        _validate_branch_name(repo, args.expected_branch)
        if args.expected_branch
        else None
    )

    report.repo = str(repo)
    report.worktree = str(target) if target else None
    report.expected = {
        "branch": args.expected_branch,
        "detached": args.detached,
        "head": expected_head,
        "base_ref": args.base_ref,
        "base_branch_ref": base_branch_ref,
        "base_oid": base_oid,
        "landed_commit": landed_oid,
        "merge_mode": args.merge_mode,
    }

    if not args.final_hooks_complete:
        raise CleanupError(
            "--final-hooks-complete is required before cleanup",
            code=EXIT_VALIDATION,
        )
    if args.timeout_seconds < 1:
        raise CleanupError("--timeout-seconds must be positive", code=EXIT_USAGE)
    if branch_ref and branch_ref in _protected_base_refs(repo, base_branch_ref):
        raise CleanupError(
            f"refusing to delete a protected base branch: {branch_ref}",
            code=EXIT_VALIDATION,
        )
    if not _is_ancestor(repo, landed_oid, base_oid):
        raise CleanupError(
            f"base ref {args.base_ref} does not contain landed commit {landed_oid}",
            code=EXIT_VALIDATION,
        )

    if target is not None:
        path_present, record = _state(repo, target)
        if record is not None:
            _validate_registered_identity(
                record,
                expected_head=expected_head,
                branch_ref=branch_ref,
                detached=args.detached,
            )
        elif path_present:
            if target.is_symlink() or os.path.ismount(target):
                raise CleanupError(
                    "refusing unsafe unregistered target path", code=EXIT_PARTIAL
                )
    else:
        path_present, record = False, None
        users = [
            worktree.path
            for worktree in _parse_worktrees(repo)
            if worktree.branch_ref == branch_ref
        ]
        if users:
            raise CleanupError(
                f"--no-worktree branch is checked out at: {', '.join(map(str, users))}",
                code=EXIT_VALIDATION,
            )

    branch_oid = _ref_oid(repo, branch_ref) if branch_ref else None
    if branch_oid is not None and branch_oid != expected_head:
        raise CleanupError(
            f"local branch moved: expected {expected_head}, found {branch_oid}",
            code=EXIT_VALIDATION,
        )
    if args.merge_mode == "merge" and branch_oid is not None:
        if not _is_ancestor(repo, expected_head, base_oid):
            raise CleanupError(
                "merge-mode branch head is not contained in the base ref",
                code=EXIT_VALIDATION,
            )

    journal_path = (
        _journal_path(common_dir, target)
        if target is not None
        else _transaction_path(common_dir, f"branch:{branch_ref}")
    )
    report.journal_path = str(journal_path)
    journal = _read_journal(journal_path) if target is not None else None
    if target is not None and record is None and path_present:
        if journal is None or not _journal_matches(
            journal,
            repo=repo,
            target=target,
            expected_head=expected_head,
            branch_ref=branch_ref,
            detached=args.detached,
            base_branch_ref=base_branch_ref,
            landed_oid=landed_oid,
            merge_mode=args.merge_mode,
        ):
            raise CleanupError(
                "unregistered path has no matching cleanup journal",
                code=EXIT_PARTIAL,
                status="partial",
            )
        if journal.get("phase") not in {
            "remove_started",
            "remove_returned",
            "orphan_recovery",
        }:
            raise CleanupError(
                "unregistered path journal is not in an orphan-recovery phase",
                code=EXIT_PARTIAL,
                status="partial",
            )
        _require_journaled_path_identity(target, journal)

    report.initial_state = {
        "path_present": path_present,
        "registered": record is not None,
        "sparse": _sparse_state(target) if target is not None else None,
        "locked": record.locked if record else False,
        "branch_present": branch_oid is not None,
    }

    if not args.execute:
        if record is None and not path_present and branch_oid is None:
            report.status = "noop"
        else:
            report.status = "ready"
        report.final_state = dict(report.initial_state)
        return report, 0

    lock_path = journal_path.with_suffix(".lock")
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    with lock_path.open("a+", encoding="utf-8") as lock_handle:
        try:
            fcntl.flock(lock_handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as exc:
            raise CleanupError(
                f"another cleanup process holds {lock_path}",
                code=EXIT_PARTIAL,
                status="partial",
            ) from exc

        # Revalidate under the transaction lock.
        if target is not None:
            path_present, record = _state(repo, target)
            if record is not None:
                _validate_registered_identity(
                    record,
                    expected_head=expected_head,
                    branch_ref=branch_ref,
                    detached=args.detached,
                )
            persisted = _read_journal(journal_path)
            if persisted is not None and not _journal_matches(
                persisted,
                repo=repo,
                target=target,
                expected_head=expected_head,
                branch_ref=branch_ref,
                detached=args.detached,
                base_branch_ref=base_branch_ref,
                landed_oid=landed_oid,
                merge_mode=args.merge_mode,
            ):
                raise CleanupError(
                    "cleanup journal identity mismatch", code=EXIT_PARTIAL
                )
            if persisted is not None and path_present:
                _require_journaled_path_identity(target, persisted)
            journal = persisted or {
                "schema_version": SCHEMA_VERSION,
                "repo": str(repo),
                "worktree": str(target),
                "expected_head": expected_head,
                "branch_ref": branch_ref,
                "detached": args.detached,
                "base_branch_ref": base_branch_ref,
                "landed_commit": landed_oid,
                "merge_mode": args.merge_mode,
                "path_identity": _path_identity(target) if path_present else None,
                "phase": "started",
            }
            _write_journal(journal_path, journal)

            _remove_worktree(
                report,
                repo=repo,
                target=target,
                journal_path=journal_path,
                journal=journal,
                timeout_seconds=args.timeout_seconds,
            )
        if args.expected_branch:
            _delete_branch(
                report,
                repo=repo,
                branch=args.expected_branch,
                expected_head=expected_head,
                base_oid=base_oid,
                landed_oid=landed_oid,
                merge_mode=args.merge_mode,
            )

        if target is not None:
            final_path, final_record = _state(repo, target)
        else:
            final_path, final_record = False, None
        final_branch = _ref_oid(repo, branch_ref) if branch_ref else None
        report.final_state = {
            "path_present": final_path,
            "registered": final_record is not None,
            "branch_present": final_branch is not None,
            "base_contains_landed_commit": _is_ancestor(repo, landed_oid, base_oid),
        }
        if final_path or final_record is not None or final_branch is not None:
            raise CleanupError(
                "cleanup postconditions failed",
                code=EXIT_POSTCONDITION,
                status="partial",
            )
        if target is not None:
            journal_path.unlink(missing_ok=True)
        report.status = (
            "complete" if any(step["attempted"] for step in report.steps) else "noop"
        )
        return report, 0


def main(argv: Sequence[str] | None = None) -> int:
    parser = _build_parser()
    report = Report(mode="unknown")
    try:
        args = parser.parse_args(argv)
        report.mode = "execute" if args.execute else "dry-run"
        report, code = run(args, report)
    except CleanupError as exc:
        code = exc.code
        report.status = exc.status
        if _failure_after_mutation(report):
            report.status = "partial"
            code = EXIT_PARTIAL
        report.blockers.append(str(exc))
        _populate_final_state_best_effort(report)
        print(str(exc), file=sys.stderr)
        print(json.dumps(report.as_dict(), sort_keys=True))
        return code
    print(json.dumps(report.as_dict(), sort_keys=True))
    return code


if __name__ == "__main__":
    raise SystemExit(main())
