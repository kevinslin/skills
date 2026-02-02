---
name: dev.worktrees
description: Standardize git worktree creation and management with all worktrees stored under ~/.worktrees/[repo]/[branch-name]. Use whenever running or planning git worktree commands (add/list/remove/prune), creating parallel checkouts, or setting up isolated branch workspaces.
---

# dev.worktrees

## Overview
Use this skill to create and manage git worktrees with a fixed on-disk layout rooted at `~/.worktrees`.

## Conventions
- Resolve the repo name from the main repo directory basename (folder containing `.git`), unless the user provides an override.
- Always store worktrees under `~/.worktrees/<repo>/<branch-name>`.
- Keep the branch name as-is; if it contains `/`, it naturally becomes nested folders.
- Run worktree commands from the main repo unless the user specifies a different worktree.
- If the user requests a different location, confirm the deviation before proceeding.

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
git worktree list
```

### Remove a worktree
```bash
git worktree remove ~/.worktrees/<repo>/<branch-name>
```
Then optionally delete the branch if it is no longer needed:
```bash
git branch -d <branch-name>
```

### Prune stale worktree metadata
```bash
git worktree prune
```

## Notes
- Never place worktrees inside the main repo or other worktrees.
- Prefer explicit paths and branch names in responses to avoid ambiguity.
