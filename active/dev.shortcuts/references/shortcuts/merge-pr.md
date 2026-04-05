---
name: merge-pr
description: merge a remote pr
---

Instructions:

Create a to-do list with the following items then perform all of them:

1. trigger:merge-pr-basic

2. Switch back to the main branch locally if you are not on it. Pull from the remote or otherwise reconcile the branch to current remote state. Do not inspect whether local `main` has unpublished commits before this step. Always push all local `main` changes after reconciliation.

3. Clean up the merged branch aggressively.
   - If the merged branch is attached to any worktree, remove those worktrees first.
   - If the current session is still on the merged branch worktree, still remove that worktree as part of cleanup; do not treat the active attachment as a reason to keep the branch.
   - After removing worktrees, run `git worktree prune`.
   - Delete the local branch once no worktree still points at it.
