#!/usr/bin/env python3

from __future__ import annotations

import argparse
import shlex
import subprocess
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create or refresh a dedicated integration-test repo under ~/integ/<project>."
    )
    parser.add_argument("project", help="Integration repo name under ~/integ/")
    parser.add_argument(
        "--associated-path",
        required=True,
        help="Absolute or user-relative path to the source repo this integration repo exercises.",
    )
    parser.add_argument(
        "--root",
        default="~/integ",
        help="Parent directory that stores integration repos. Defaults to ~/integ.",
    )
    parser.add_argument(
        "--test-command",
        action="append",
        default=[],
        help="Integration command to run from the associated repo. Repeat for multiple commands.",
    )
    parser.add_argument(
        "--overwrite-runner",
        action="store_true",
        help="Rewrite scripts/run_integration_tests.sh even if it already exists.",
    )
    return parser.parse_args()


def render_agents_md(
    project: str,
    repo_root: Path,
    associated_path: Path,
    runner_has_commands: bool,
) -> str:
    runner_note = (
        "The generated runner already shells into the associated repo and executes the configured integration command(s)."
        if runner_has_commands
        else "Edit `./scripts/run_integration_tests.sh` to add the real integration command for the associated repo before the first run."
    )
    return f"""# Integration Repo: {project}

## Association
- Associated source repo: `{associated_path}`
- Integration repo: `{repo_root}`

This repo is the dedicated integration harness for the source repo above. Keep product code in the source repo. Keep harness code, fixtures, helper scripts, and proof artifacts here.

## Canonical Invocation

Run integration tests from this repo with:

```sh
./scripts/run_integration_tests.sh
```

{runner_note}

## Proof Runs

- Allocate the next proof directory with `python3 ./scripts/new_proof_dir.py`.
- Store each run under `proof/<n>`.
- Keep numbers monotonic: `1`, `2`, `3`, ...
- Put logs, screenshots, exports, and notes for a single run inside that directory.
"""


def render_new_proof_dir_script() -> str:
    return """#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    proof_root = repo_root / "proof"
    proof_root.mkdir(parents=True, exist_ok=True)

    current_numbers = [
        int(path.name)
        for path in proof_root.iterdir()
        if path.is_dir() and path.name.isdigit()
    ]
    next_number = max(current_numbers, default=0) + 1
    target = proof_root / str(next_number)
    target.mkdir(parents=True, exist_ok=False)
    print(target)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
"""


def render_runner_script(associated_path: Path, test_commands: list[str]) -> str:
    associated_path_quoted = shlex.quote(str(associated_path))
    if not test_commands:
        command_block = """echo "No integration command is configured yet." >&2
echo "Edit ./scripts/run_integration_tests.sh and replace this placeholder with the real command." >&2
exit 1"""
    else:
        joined_commands = "\n".join(f"  {command}" for command in test_commands)
        command_block = (
            'PROOF_DIR="${INTEG_PROOF_DIR:-$(python3 "$REPO_ROOT/scripts/new_proof_dir.py")}"\n'
            'mkdir -p "$PROOF_DIR"\n\n'
            'echo "Using proof dir: $PROOF_DIR"\n\n'
            "(\n"
            f"  cd {associated_path_quoted}\n"
            f"{joined_commands}\n"
            ') 2>&1 | tee "$PROOF_DIR/integration.log"'
        )

    return f"""#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

{command_block}
"""


def write_file(path: Path, content: str, executable: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    if executable:
        path.chmod(0o755)


def ensure_git_repo(path: Path) -> None:
    if (path / ".git").exists():
        return
    subprocess.run(["git", "init", "-q"], cwd=path, check=True)


def main() -> int:
    args = parse_args()

    root = Path(args.root).expanduser().resolve()
    associated_path = Path(args.associated_path).expanduser().resolve()
    if not associated_path.exists():
        raise SystemExit(f"Associated path does not exist: {associated_path}")

    repo_root = root / args.project
    scripts_root = repo_root / "scripts"
    proof_root = repo_root / "proof"

    repo_root.mkdir(parents=True, exist_ok=True)
    scripts_root.mkdir(parents=True, exist_ok=True)
    proof_root.mkdir(parents=True, exist_ok=True)

    ensure_git_repo(repo_root)

    write_file(
        repo_root / "AGENTS.md",
        render_agents_md(
            project=args.project,
            repo_root=repo_root,
            associated_path=associated_path,
            runner_has_commands=bool(args.test_command),
        ),
    )

    write_file(
        scripts_root / "new_proof_dir.py",
        render_new_proof_dir_script(),
        executable=True,
    )
    write_file(proof_root / ".gitkeep", "")

    runner_path = scripts_root / "run_integration_tests.sh"
    if args.overwrite_runner or not runner_path.exists():
        write_file(
            runner_path,
            render_runner_script(associated_path, args.test_command),
            executable=True,
        )

    print(f"Integration repo: {repo_root}")
    print(f"Associated source repo: {associated_path}")
    print("Canonical runner: ./scripts/run_integration_tests.sh")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
