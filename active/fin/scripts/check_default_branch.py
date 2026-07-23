#!/usr/bin/env python3
"""Gate fin actions on an exact repository-default/base-ref match."""

from __future__ import annotations

import argparse
import json
from typing import Any, Sequence


FINISHING_ACTIONS = ("archive", "merge", "cleanup", "full_finalization")


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Emit a machine-readable fin authorization record after comparing the "
            "repository default branch with the target base ref."
        )
    )
    parser.add_argument("--context")
    parser.add_argument("--repository-default-branch")
    parser.add_argument("--target-base-ref")
    return parser


def _valid_branch_name(value: object) -> bool:
    return isinstance(value, str) and bool(value) and value == value.strip()


def evaluate(
    *,
    context: object,
    repository_default_branch: object,
    target_base_ref: object,
) -> dict[str, Any]:
    valid_context = context in {"gh", "local"}
    valid_default = _valid_branch_name(repository_default_branch)
    valid_target = _valid_branch_name(target_base_ref)
    valid_input = valid_context and valid_default and valid_target
    matches = bool(
        valid_input and repository_default_branch == target_base_ref
    )
    allowed = matches

    if not valid_context:
        reason = "context must be exactly 'gh' or 'local'"
    elif not valid_default:
        reason = "repository default branch must be a non-empty, trimmed string"
    elif not valid_target:
        reason = "target base ref must be a non-empty, trimmed string"
    elif not matches:
        reason = (
            f"The target base {target_base_ref} is not origin's main branch "
            f"{repository_default_branch}. Do not merge this target. Retarget it "
            f"or create a PR against {repository_default_branch}, then rerun fin."
        )
    else:
        reason = "target base ref exactly matches the repository default branch"

    return {
        "allow": {action: allowed for action in FINISHING_ACTIONS},
        "context": context,
        "matches": matches,
        "reason": reason,
        "repository_default_branch": repository_default_branch,
        "status": "pass" if matches else "blocked",
        "target_base_ref": target_base_ref,
    }


def main(argv: Sequence[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    record = evaluate(
        context=args.context,
        repository_default_branch=args.repository_default_branch,
        target_base_ref=args.target_base_ref,
    )
    print(json.dumps(record, sort_keys=True))
    return 0 if record["status"] == "pass" else 2


if __name__ == "__main__":
    raise SystemExit(main())
