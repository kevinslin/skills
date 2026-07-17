---
name: dev.worktrees
description: Create, inspect, remove, or transactionally clean landed Git worktrees.
dependencies: []
---

# dev.worktrees

## Overview

Create and manage Git worktrees under `~/.worktrees`. Use `cleanup-landed` only
after a caller has independently proved that the work landed and may be
discarded.

## Conventions

- Resolve the repo name from the main repo directory basename (folder containing `.git`), unless the user provides an override.
- Always store worktrees under `~/.worktrees/<repo>/<branch-name>`.
- Keep the branch name as-is; if it contains `/`, it naturally becomes nested folders.
- Run worktree commands from the main repo unless the user specifies a different worktree.
- If the user requests a different location, confirm the deviation before proceeding.
- Use absolute paths for removal and cleanup targets.
- Never remove the current, primary, locked, or dirty worktree through the ordinary removal path.

## Quick Tasks

### Create worktree for an existing branch

```bash
mkdir -p ~/.worktrees/<repo>
git worktree add ~/.worktrees/<repo>/<branch-name> <branch-name>
```

### Create worktree for a new branch

```bash
mkdir -p ~/.worktrees/<repo>
git worktree add -b <branch-name> ~/.worktrees/<repo>/<branch-name> [start-point]
```

### List worktrees

```bash
git worktree list --porcelain
```

## Ordinary Removal

Use ordinary removal only when the worktree is already clean and unlocked.
Inspect tracked and untracked state immediately before removal. If it is dirty,
stop and preserve it; do not force removal or infer that its contents landed.

```bash
git -C <worktree> status --short
git -C <repo> worktree remove <absolute-worktree-path>
```

Delete the local branch only when the caller separately established that it is
no longer needed:

```bash
git -C <repo> branch -d -- <branch-name>
```

## `cleanup-landed`

Use `./scripts/cleanup_worktree.py` to remove one exact worktree and its local
branch after the caller has proved the change landed. This path is destructive:
it resets tracked changes and deletes untracked and ignored files before
removing the worktree.

Before invoking it, record:

- a retained repository checkout outside the target worktree;
- the exact absolute target path, or `--no-worktree` for a branch checked out nowhere;
- the expected local branch or detached state;
- the full expected HEAD object ID;
- a refreshed local base branch;
- the full landed commit object ID contained by that base; and
- the actual merge mode: `merge`, `squash`, or `rebase`.

Run a dry run first and require JSON `status` `ready` or `noop`:

```bash
python3 ./scripts/cleanup_worktree.py \
  --repo <retained-checkout> \
  --worktree <absolute-worktree-path> \
  --expected-branch <branch> \
  --expected-head <full-object-id> \
  --base-ref <refreshed-local-base-branch> \
  --landed-commit <full-landed-object-id> \
  --merge-mode <merge|squash|rebase>
```

Rerun the exact command with `--execute`. Require final JSON `status`
`complete` or `noop`, with the path, registration, and local branch absent and
the base still containing the landed commit.

- Replace `--expected-branch <branch>` with `--detached` for a detached target.
- Replace `--worktree <path>` with `--no-worktree` for branch-only cleanup; detached cleanup is invalid in that mode.
- Treat `blocked`, `partial`, a nonzero exit, identity drift, or failed postconditions as a cleanup blocker.
- Preserve the reported journal after partial execution and rerun the exact command after resolving the blocker.
- If matching legacy and current journals both exist, stop and reconcile them; the executor fails closed rather than choosing one.
- Do not reproduce the reset, clean, removal, orphan recovery, or branch deletion steps manually.

The script serializes each target, revalidates identity under the lock, and
journals new transactions under the Git common directory's
`worktree-cleanup/` directory. It resumes matching legacy `fin-cleanup/`
journals in place. It never refreshes the base, proves external finalization,
runs repository hooks, prunes unrelated registrations, or mutates remote
branches; callers own those policies.

## Prune Stale Metadata

Prune only when the user explicitly requests repository-wide stale metadata
cleanup. Preview first and do not use pruning as a substitute for targeted
removal or journal recovery.

```bash
git -C <repo> worktree prune --dry-run
git -C <repo> worktree prune
```

## Notes

- Never place worktrees inside the main repo or other worktrees.
- Prefer explicit paths and branch names in responses to avoid ambiguity.
- Keep bulk Codex worktree garbage collection in `codex-clean-worktrees`; `cleanup-landed` owns one exact, proof-locked transaction.
