---
name: integ
description: Create or maintain dedicated integration-test harness repositories under `~/integ/[project]`. Use only when explicitly invoked as `integ` to bootstrap a per-project integration repo, wire its `AGENTS.md`, add canonical runner scripts, or allocate numbered proof directories for integration evidence.
dependencies: []
---

# integ

Use this skill only when the user explicitly invokes `integ`.

## Goal

Keep integration harnesses out of the product repo. Each project gets a separate git repo at `~/integ/<project>` with this shape:

```text
AGENTS.md
proof/
  1/
scripts/
```

The integration repo is for harness code, fixtures, runner scripts, and proof artifacts. The associated source repo stays in its normal checkout elsewhere on disk.

## Bootstrap Workflow

1. Determine the associated source repo path.
   - If the user gives a path, use it.
   - Otherwise, if the current working directory is already the intended product repo, use its git root.
   - If neither is true, ask for the source repo path before bootstrapping.
2. Determine the integration repo name.
   - Prefer the user-supplied project name.
   - Otherwise derive it from the associated repo directory name.
3. Bootstrap or refresh the integration repo with:

```sh
python3 /Users/kevinlin/code/skills-public/active/integ/scripts/bootstrap_integ_repo.py \
  <project> \
  --associated-path /absolute/path/to/source/repo \
  [--test-command '<integration command>']
```

Pass `--test-command` more than once when the runner should execute multiple commands.

4. Inspect `~/integ/<project>/AGENTS.md` and `~/integ/<project>/scripts/run_integration_tests.sh`.
   - If the user supplied the real test command, make sure the runner uses it.
   - If not, leave the placeholder runner in place and tell the user it still needs the project-specific command.
5. Keep harness-only code in `~/integ/<project>`. Do not copy product source into the integration repo.

## Proof Runs

- Use `python3 ./scripts/new_proof_dir.py` from the integration repo to allocate the next proof directory.
- Keep proof numbers monotonic: `1`, `2`, `3`, ...
- Store logs, screenshots, exports, and notes for one run inside that run's directory.
- Use `./scripts/run_integration_tests.sh` as the canonical entrypoint unless the repo's `AGENTS.md` documents a replacement.

## Operating Rules

- Treat each `~/integ/<project>` as a standalone git repo.
- Keep the source repo path in `AGENTS.md` absolute so the on-disk association is unambiguous.
- Prefer editing the generated scripts in the integration repo over pasting one-off shell into `AGENTS.md`.
