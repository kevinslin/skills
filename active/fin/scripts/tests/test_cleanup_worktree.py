#!/usr/bin/env python3
"""Integration tests for fin's deterministic worktree cleanup."""

from __future__ import annotations

import importlib.util
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest import mock
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "cleanup_worktree.py"
SPEC = importlib.util.spec_from_file_location("fin_cleanup_worktree", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
cleanup = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = cleanup
SPEC.loader.exec_module(cleanup)


def git(repo: Path, *args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        ["git", "-C", str(repo), *args],
        text=True,
        capture_output=True,
        check=False,
    )
    if check and result.returncode != 0:
        raise AssertionError(
            f"git {' '.join(args)} failed ({result.returncode}): {result.stderr}"
        )
    return result


class CleanupWorktreeTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.repo = self.root / "retained checkout"
        self.repo.mkdir()
        git(self.repo, "init", "-b", "main")
        git(self.repo, "config", "user.email", "fin-tests@example.com")
        git(self.repo, "config", "user.name", "Fin Tests")
        (self.repo / ".gitignore").write_text("ignored.txt\n", encoding="utf-8")
        (self.repo / "tracked.txt").write_text("base\n", encoding="utf-8")
        git(self.repo, "add", ".gitignore", "tracked.txt")
        git(self.repo, "commit", "-m", "base")
        self.base_commit = git(self.repo, "rev-parse", "HEAD").stdout.strip()

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def make_worktree(
        self,
        *,
        branch: str = "feature",
        path_name: str = "feature worktree",
        detached: bool = False,
    ) -> tuple[Path, str]:
        path = self.root / path_name
        if detached:
            git(self.repo, "worktree", "add", "--detach", str(path), self.base_commit)
        else:
            git(self.repo, "branch", branch, self.base_commit)
            git(self.repo, "worktree", "add", str(path), branch)
        head = git(path, "rev-parse", "HEAD").stdout.strip()
        return path, head

    def commit_feature(self, path: Path, message: str = "feature") -> str:
        with (path / "tracked.txt").open("a", encoding="utf-8") as handle:
            handle.write(f"{message}\n")
        git(path, "add", "tracked.txt")
        git(path, "commit", "-m", message)
        return git(path, "rev-parse", "HEAD").stdout.strip()

    def invoke(
        self,
        worktree: Path,
        expected_head: str,
        *,
        branch: str | None = "feature",
        base_ref: str = "main",
        landed_commit: str | None = None,
        merge_mode: str = "merge",
        execute: bool = False,
        cwd: Path | None = None,
        repo: Path | None = None,
        env: dict[str, str] | None = None,
    ) -> tuple[subprocess.CompletedProcess[str], dict[str, object]]:
        command = [
            sys.executable,
            str(SCRIPT),
            "--repo",
            str(repo or self.repo),
            "--worktree",
            str(worktree),
            "--expected-head",
            expected_head,
            "--base-ref",
            base_ref,
            "--landed-commit",
            landed_commit or self.base_commit,
            "--merge-mode",
            merge_mode,
            "--final-hooks-complete",
        ]
        if branch is None:
            command.append("--detached")
        else:
            command.extend(["--expected-branch", branch])
        if execute:
            command.append("--execute")
        result = subprocess.run(
            command,
            cwd=str(cwd or self.root),
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )
        try:
            payload = json.loads(result.stdout)
        except json.JSONDecodeError as exc:
            raise AssertionError(
                f"script did not emit JSON\nstdout={result.stdout}\nstderr={result.stderr}"
            ) from exc
        return result, payload

    def invoke_without_worktree(
        self,
        expected_head: str,
        *,
        branch: str = "feature",
        landed_commit: str | None = None,
        merge_mode: str = "merge",
        base_ref: str = "main",
        execute: bool = False,
    ) -> tuple[subprocess.CompletedProcess[str], dict[str, object]]:
        command = [
            sys.executable,
            str(SCRIPT),
            "--repo",
            str(self.repo),
            "--no-worktree",
            "--expected-branch",
            branch,
            "--expected-head",
            expected_head,
            "--base-ref",
            base_ref,
            "--landed-commit",
            landed_commit or self.base_commit,
            "--merge-mode",
            merge_mode,
            "--final-hooks-complete",
        ]
        if execute:
            command.append("--execute")
        result = subprocess.run(
            command,
            cwd=str(self.root),
            text=True,
            capture_output=True,
            check=False,
        )
        return result, json.loads(result.stdout)

    def test_dry_run_is_non_mutating(self) -> None:
        worktree, head = self.make_worktree()

        result, payload = self.invoke(worktree, head)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "ready")
        self.assertTrue(worktree.exists())
        self.assertEqual(git(self.repo, "rev-parse", "feature").stdout.strip(), head)

    def test_merge_cleanup_removes_dirty_worktree_and_local_branch(self) -> None:
        worktree, _ = self.make_worktree()
        head = self.commit_feature(worktree)
        git(self.repo, "merge", "--no-ff", "feature", "-m", "merge feature")
        landed = git(self.repo, "rev-parse", "HEAD").stdout.strip()
        (worktree / "tracked.txt").write_text("dirty\n", encoding="utf-8")
        (worktree / "untracked.txt").write_text("untracked\n", encoding="utf-8")
        (worktree / "ignored.txt").write_text("ignored\n", encoding="utf-8")

        result, payload = self.invoke(
            worktree,
            head,
            landed_commit=landed,
            execute=True,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        self.assertFalse(worktree.exists())
        self.assertNotIn(str(worktree), git(self.repo, "worktree", "list").stdout)
        self.assertNotEqual(
            git(
                self.repo, "show-ref", "--verify", "refs/heads/feature", check=False
            ).returncode,
            0,
        )

    def test_squash_cleanup_requires_and_uses_landed_commit_proof(self) -> None:
        worktree, _ = self.make_worktree()
        head = self.commit_feature(worktree)
        git(self.repo, "merge", "--squash", "feature")
        git(self.repo, "commit", "-m", "squash feature")
        landed = git(self.repo, "rev-parse", "HEAD").stdout.strip()

        result, payload = self.invoke(
            worktree,
            head,
            landed_commit=landed,
            merge_mode="squash",
            execute=True,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["final_state"]["base_contains_landed_commit"], True)
        self.assertFalse(worktree.exists())
        self.assertNotEqual(
            git(
                self.repo, "show-ref", "--verify", "refs/heads/feature", check=False
            ).returncode,
            0,
        )

    def test_refuses_cleanup_when_base_lacks_landed_commit(self) -> None:
        worktree, _ = self.make_worktree()
        head = self.commit_feature(worktree)

        result, payload = self.invoke(
            worktree,
            head,
            landed_commit=head,
            merge_mode="squash",
            execute=True,
        )

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertEqual(payload["status"], "blocked")
        self.assertTrue(worktree.exists())
        self.assertEqual(git(self.repo, "rev-parse", "feature").stdout.strip(), head)

    def test_refuses_wrong_registered_branch_without_mutation(self) -> None:
        worktree, head = self.make_worktree(branch="actual")

        result, payload = self.invoke(worktree, head, branch="expected", execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertEqual(payload["status"], "blocked")
        self.assertTrue(worktree.exists())

    def test_refuses_current_worktree(self) -> None:
        worktree, head = self.make_worktree()

        result, payload = self.invoke(worktree, head, execute=True, cwd=worktree)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertEqual(payload["status"], "blocked")
        self.assertTrue(worktree.exists())

    def test_refuses_locked_worktree(self) -> None:
        worktree, head = self.make_worktree()
        git(self.repo, "worktree", "lock", str(worktree))

        result, payload = self.invoke(worktree, head, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertEqual(payload["status"], "blocked")
        self.assertTrue(worktree.exists())

    def test_refuses_symlink_target(self) -> None:
        worktree, head = self.make_worktree()
        symlink = self.root / "worktree symlink"
        symlink.symlink_to(worktree, target_is_directory=True)

        result, payload = self.invoke(symlink, head, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertEqual(payload["status"], "blocked")
        self.assertTrue(worktree.exists())

    def test_registered_absent_recovers_exact_stale_metadata(self) -> None:
        worktree, head = self.make_worktree()
        shutil.rmtree(worktree)

        result, payload = self.invoke(worktree, head, execute=True)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        self.assertNotIn(str(worktree), git(self.repo, "worktree", "list").stdout)
        self.assertNotEqual(
            git(
                self.repo, "show-ref", "--verify", "refs/heads/feature", check=False
            ).returncode,
            0,
        )

    def test_unjournaled_orphan_is_refused(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        orphan = self.root / "orphan worktree"
        orphan.mkdir()
        (orphan / "important.txt").write_text("preserve\n", encoding="utf-8")

        result, payload = self.invoke(orphan, self.base_commit, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_PARTIAL)
        self.assertEqual(payload["status"], "partial")
        self.assertEqual(payload["final_state"]["path_present"], True)
        self.assertEqual(payload["final_state"]["registered"], False)
        self.assertTrue((orphan / "important.txt").exists())

    def test_journaled_orphan_is_removed_exactly(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        orphan = self.root / "journaled orphan"
        orphan.mkdir()
        (orphan / "disposable.txt").write_text("remove\n", encoding="utf-8")
        common = cleanup._git_common_dir(self.repo)
        journal_path = cleanup._journal_path(common, orphan.resolve())
        cleanup._write_journal(
            journal_path,
            {
                "schema_version": cleanup.SCHEMA_VERSION,
                "repo": str(self.repo.resolve()),
                "worktree": str(orphan.resolve()),
                "expected_head": self.base_commit,
                "branch_ref": "refs/heads/feature",
                "detached": False,
                "base_branch_ref": "refs/heads/main",
                "landed_commit": self.base_commit,
                "merge_mode": "merge",
                "path_identity": cleanup._path_identity(orphan),
                "phase": "remove_returned",
            },
        )

        result, payload = self.invoke(orphan, self.base_commit, execute=True)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        self.assertFalse(orphan.exists())
        self.assertFalse(journal_path.exists())

    def test_detached_cleanup_uses_exact_head_and_keeps_branches(self) -> None:
        worktree, head = self.make_worktree(detached=True)

        result, payload = self.invoke(
            worktree,
            head,
            branch=None,
            execute=True,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        self.assertFalse(worktree.exists())
        self.assertEqual(
            git(self.repo, "rev-parse", "main").stdout.strip(), self.base_commit
        )

    def test_sparse_cleanup_preserves_unrelated_worktree_and_branch(self) -> None:
        worktree, head = self.make_worktree()
        git(worktree, "sparse-checkout", "init", "--cone")
        git(self.repo, "branch", "unrelated", self.base_commit)
        unrelated = self.root / "unrelated worktree"
        git(self.repo, "worktree", "add", str(unrelated), "unrelated")

        result, payload = self.invoke(worktree, head, execute=True)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn(payload["initial_state"]["sparse"], ("true", "false"))
        self.assertFalse(worktree.exists())
        self.assertTrue(unrelated.exists())
        self.assertEqual(
            git(self.repo, "rev-parse", "unrelated").stdout.strip(), self.base_commit
        )

    def test_targeted_stale_recovery_preserves_unrelated_stale_metadata(self) -> None:
        worktree, head = self.make_worktree()
        git(self.repo, "branch", "other", self.base_commit)
        other = self.root / "other stale worktree"
        git(self.repo, "worktree", "add", str(other), "other")
        shutil.rmtree(worktree)
        shutil.rmtree(other)

        result, payload = self.invoke(worktree, head, execute=True)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        registrations = git(self.repo, "worktree", "list").stdout
        self.assertNotIn(str(worktree), registrations)
        self.assertIn(str(other), registrations)

    def test_idempotent_rerun_is_noop(self) -> None:
        worktree, head = self.make_worktree()
        first, _ = self.invoke(worktree, head, execute=True)
        self.assertEqual(first.returncode, 0, msg=first.stderr)

        second, payload = self.invoke(worktree, head, execute=True)

        self.assertEqual(second.returncode, 0, msg=second.stderr)
        self.assertEqual(payload["status"], "noop")
        self.assertEqual(payload["final_state"]["path_present"], False)

    def test_branch_only_cleanup_requires_branch_to_be_checked_out_nowhere(
        self,
    ) -> None:
        git(self.repo, "branch", "feature", self.base_commit)

        result, payload = self.invoke_without_worktree(self.base_commit, execute=True)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "complete")
        self.assertIsNone(payload["worktree"])
        self.assertNotEqual(
            git(
                self.repo, "show-ref", "--verify", "refs/heads/feature", check=False
            ).returncode,
            0,
        )

    def test_refuses_primary_checkout_even_when_repo_is_a_linked_checkout(self) -> None:
        linked = self.root / "retained linked checkout"
        git(self.repo, "branch", "retained-link", self.base_commit)
        git(self.repo, "worktree", "add", str(linked), "retained-link")

        result, payload = self.invoke(
            self.repo,
            self.base_commit,
            branch="main",
            execute=True,
            repo=linked,
        )

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertIn("primary checkout", payload["blockers"][0])
        self.assertTrue(self.repo.exists())

    def test_refuses_mutable_expected_head_ref(self) -> None:
        worktree, _ = self.make_worktree()

        result, payload = self.invoke(worktree, "feature", execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertIn("full 40-character commit OID", payload["blockers"][0])
        self.assertTrue(worktree.exists())

    def test_execute_refuses_head_that_moved_after_dry_run(self) -> None:
        worktree, old_head = self.make_worktree()
        planned, payload = self.invoke(worktree, old_head)
        self.assertEqual(planned.returncode, 0, msg=planned.stderr)
        self.assertEqual(payload["status"], "ready")
        new_head = self.commit_feature(worktree, "moved after plan")

        result, payload = self.invoke(worktree, old_head, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertIn("HEAD moved", payload["blockers"][0])
        self.assertEqual(git(worktree, "rev-parse", "HEAD").stdout.strip(), new_head)

    def test_refuses_default_branch_through_base_alias(self) -> None:
        git(self.repo, "branch", "baseproof", self.base_commit)
        git(self.repo, "checkout", "--detach", self.base_commit)

        result, payload = self.invoke_without_worktree(
            self.base_commit,
            branch="main",
            base_ref="baseproof",
            execute=True,
        )

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertIn("protected base branch", payload["blockers"][0])
        self.assertEqual(
            git(self.repo, "rev-parse", "main").stdout.strip(), self.base_commit
        )

    def test_no_worktree_refuses_branch_checked_out_in_primary(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        git(self.repo, "checkout", "feature")

        result, payload = self.invoke_without_worktree(
            self.base_commit,
            execute=True,
        )

        self.assertEqual(result.returncode, cleanup.EXIT_VALIDATION)
        self.assertIn("checked out", payload["blockers"][0])
        self.assertEqual(
            git(self.repo, "branch", "--show-current").stdout.strip(), "feature"
        )

    def test_orphan_journal_phase_mismatch_blocks_dry_run(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        orphan = self.root / "phase mismatch orphan"
        orphan.mkdir()
        common = cleanup._git_common_dir(self.repo)
        journal_path = cleanup._journal_path(common, orphan.resolve())
        cleanup._write_journal(
            journal_path,
            {
                "schema_version": cleanup.SCHEMA_VERSION,
                "repo": str(self.repo.resolve()),
                "worktree": str(orphan.resolve()),
                "expected_head": self.base_commit,
                "branch_ref": "refs/heads/feature",
                "detached": False,
                "base_branch_ref": "refs/heads/main",
                "landed_commit": self.base_commit,
                "merge_mode": "merge",
                "path_identity": cleanup._path_identity(orphan),
                "phase": "started",
            },
        )

        result, payload = self.invoke(orphan, self.base_commit)

        self.assertEqual(result.returncode, cleanup.EXIT_PARTIAL)
        self.assertEqual(payload["status"], "partial")
        self.assertTrue(orphan.exists())

    def test_reused_orphan_path_is_preserved(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        orphan = self.root / "reused orphan"
        orphan.mkdir()
        original_identity = cleanup._path_identity(orphan)
        common = cleanup._git_common_dir(self.repo)
        journal_path = cleanup._journal_path(common, orphan.resolve())
        cleanup._write_journal(
            journal_path,
            {
                "schema_version": cleanup.SCHEMA_VERSION,
                "repo": str(self.repo.resolve()),
                "worktree": str(orphan.resolve()),
                "expected_head": self.base_commit,
                "branch_ref": "refs/heads/feature",
                "detached": False,
                "base_branch_ref": "refs/heads/main",
                "landed_commit": self.base_commit,
                "merge_mode": "merge",
                "path_identity": original_identity,
                "phase": "remove_returned",
            },
        )
        shutil.rmtree(orphan)
        orphan.mkdir()
        (orphan / "replacement.txt").write_text("preserve\n", encoding="utf-8")

        result, payload = self.invoke(orphan, self.base_commit, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_PARTIAL)
        self.assertEqual(payload["status"], "partial")
        self.assertTrue((orphan / "replacement.txt").exists())

    def test_branch_delete_failure_after_worktree_removal_reports_partial(self) -> None:
        worktree, _ = self.make_worktree()
        head = self.commit_feature(worktree)
        git(self.repo, "merge", "--no-ff", "feature", "-m", "merge feature")
        landed = git(self.repo, "rev-parse", "HEAD").stdout.strip()
        real_git = shutil.which("git")
        assert real_git is not None
        wrapper_dir = self.root / "git wrapper"
        wrapper_dir.mkdir()
        wrapper = wrapper_dir / "git"
        wrapper.write_text(
            "#!/bin/sh\n"
            'case " $* " in\n'
            '  *" branch -d -- feature "*) exit 29 ;;\n'
            "esac\n"
            f'exec "{real_git}" "$@"\n',
            encoding="utf-8",
        )
        wrapper.chmod(0o755)
        env = dict(os.environ)
        env["PATH"] = f"{wrapper_dir}{os.pathsep}{env['PATH']}"

        result, payload = self.invoke(
            worktree,
            head,
            landed_commit=landed,
            execute=True,
            env=env,
        )

        self.assertEqual(result.returncode, cleanup.EXIT_PARTIAL)
        self.assertEqual(payload["status"], "partial")
        self.assertFalse(payload["final_state"]["path_present"])
        self.assertFalse(payload["final_state"]["registered"])
        self.assertTrue(payload["final_state"]["branch_present"])
        self.assertTrue(Path(payload["journal_path"]).exists())

    def test_post_clean_tracked_recovery_restores_sparse_worktree(self) -> None:
        worktree, _ = self.make_worktree()
        git(worktree, "sparse-checkout", "init", "--cone")
        original_run = cleanup._run

        def remove_tracked_after_clean(*args: object, **kwargs: object) -> object:
            result = original_run(*args, **kwargs)
            command = list(args[0])
            if command[-3:] == ["clean", "-fdx", "-q"]:
                (worktree / "tracked.txt").unlink()
            return result

        report = cleanup.Report(mode="execute")
        with mock.patch.object(cleanup, "_run", side_effect=remove_tracked_after_clean):
            cleanup._prepare_registered_worktree(report, worktree)

        recovery = next(
            step
            for step in report.steps
            if step["name"] == "post_clean_tracked_recovery"
        )
        self.assertTrue(recovery["attempted"])
        self.assertTrue((worktree / "tracked.txt").exists())

    def test_post_clean_recovery_fails_closed_if_tracked_state_changes_again(
        self,
    ) -> None:
        worktree, _ = self.make_worktree()
        git(worktree, "sparse-checkout", "init", "--cone")
        original_run = cleanup._run
        resets = 0

        def keep_tracked_state_dirty(*args: object, **kwargs: object) -> object:
            nonlocal resets
            result = original_run(*args, **kwargs)
            command = list(args[0])
            if command[-3:] == ["clean", "-fdx", "-q"]:
                (worktree / "tracked.txt").unlink()
            if command[-2:] == ["reset", "--hard"]:
                resets += 1
                if resets == 2:
                    (worktree / "tracked.txt").unlink()
            return result

        report = cleanup.Report(mode="execute")
        with mock.patch.object(cleanup, "_run", side_effect=keep_tracked_state_dirty):
            with self.assertRaises(cleanup.CleanupError) as caught:
                cleanup._prepare_registered_worktree(report, worktree)

        self.assertEqual(caught.exception.code, cleanup.EXIT_POSTCONDITION)

    def test_orphan_resume_refuses_changed_transaction_proof(self) -> None:
        git(self.repo, "branch", "feature", self.base_commit)
        orphan = self.root / "proof mismatch orphan"
        orphan.mkdir()
        common = cleanup._git_common_dir(self.repo)
        journal_path = cleanup._journal_path(common, orphan.resolve())
        cleanup._write_journal(
            journal_path,
            {
                "schema_version": cleanup.SCHEMA_VERSION,
                "repo": str(self.repo.resolve()),
                "worktree": str(orphan.resolve()),
                "expected_head": self.base_commit,
                "branch_ref": "refs/heads/feature",
                "detached": False,
                "base_branch_ref": "refs/heads/main",
                "landed_commit": self.base_commit,
                "merge_mode": "squash",
                "path_identity": cleanup._path_identity(orphan),
                "phase": "remove_returned",
            },
        )

        result, payload = self.invoke(orphan, self.base_commit, execute=True)

        self.assertEqual(result.returncode, cleanup.EXIT_PARTIAL)
        self.assertEqual(payload["status"], "partial")
        self.assertIn("no matching cleanup journal", payload["blockers"][0])
        self.assertTrue(orphan.exists())

    def test_sha256_repository_accepts_full_object_ids(self) -> None:
        repo = self.root / "sha256 retained"
        repo.mkdir()
        initialized = git(
            repo,
            "init",
            "--object-format=sha256",
            "-b",
            "main",
            check=False,
        )
        if initialized.returncode != 0:
            self.skipTest("installed Git does not support SHA-256 repositories")
        git(repo, "config", "user.email", "fin-tests@example.com")
        git(repo, "config", "user.name", "Fin Tests")
        (repo / "tracked.txt").write_text("sha256\n", encoding="utf-8")
        git(repo, "add", "tracked.txt")
        git(repo, "commit", "-m", "sha256 base")
        head = git(repo, "rev-parse", "HEAD").stdout.strip()
        self.assertEqual(len(head), 64)
        git(repo, "branch", "feature", head)
        worktree = self.root / "sha256 worktree"
        git(repo, "worktree", "add", str(worktree), "feature")
        command = [
            sys.executable,
            str(SCRIPT),
            "--repo",
            str(repo),
            "--worktree",
            str(worktree),
            "--expected-branch",
            "feature",
            "--expected-head",
            head,
            "--base-ref",
            "main",
            "--landed-commit",
            head,
            "--merge-mode",
            "merge",
            "--final-hooks-complete",
        ]

        result = subprocess.run(
            command,
            cwd=str(self.root),
            text=True,
            capture_output=True,
            check=False,
        )
        payload = json.loads(result.stdout)

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "ready")
        self.assertTrue(worktree.exists())


if __name__ == "__main__":
    unittest.main()
