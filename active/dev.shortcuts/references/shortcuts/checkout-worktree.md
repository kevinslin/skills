---
name: checkout-worktree
description: move a linked worktree branch back into the main checkout with arbor
---

Instructions:

Create a to-do list with the following items then perform all of them:

1. Resolve the target linked worktree path before running `arbor`:
   - If the user provided a worktree path or unique directory name, resolve it to one absolute linked-worktree path from `git worktree list --porcelain`.
   - Otherwise, if the current checkout is a linked worktree, use `git rev-parse --show-toplevel` as the target worktree path.
   - If neither is true, stop and ask the user which linked worktree should be checked out.
   - If the target resolves to zero or multiple linked worktrees, stop and ask the user to disambiguate.

2. Derive the main checkout from the shared git dir and switch there before calling `arbor`:
   - `COMMON_GIT_DIR="$(git rev-parse --path-format=absolute --git-common-dir)"`
   - `MAIN_CHECKOUT="$(cd "$(dirname "$COMMON_GIT_DIR")" && pwd -P)"`
   - If `"$TARGET_WORKTREE" = "$MAIN_CHECKOUT"`, stop because the branch is already in the main checkout.
   - `cd "$MAIN_CHECKOUT"`

3. Refuse to proceed if either checkout is dirty:
   - `git -C "$TARGET_WORKTREE" status --porcelain`
   - `git -C "$MAIN_CHECKOUT" status --porcelain`
   - If either output is non-empty, stop and tell the user which checkout must be cleaned first.

4. Confirm the target linked worktree is on a named branch:
   - `TARGET_BRANCH="$(git -C "$TARGET_WORKTREE" branch --show-current)"`
   - If `TARGET_BRANCH` is empty, stop because `arbor checkout` cannot move a detached `HEAD` back into the main checkout.

5. Use the local `devtools` `arbor` CLI from the main checkout and pass the explicit target path:
   - `python3 /Users/kevinlin/code/devtools/bin/arbor checkout "$TARGET_WORKTREE"`
   - Do not rely on the implicit "current worktree" mode for this shortcut.

6. Verify both branch handoff and cleanup separately:
   - `MAIN_BRANCH="$(git -C "$MAIN_CHECKOUT" branch --show-current)"`
   - `git -C "$MAIN_CHECKOUT" worktree list --porcelain`
   - If `MAIN_BRANCH != "$TARGET_BRANCH"`, stop and report checkout failure.
   - If the old `TARGET_WORKTREE` path still appears in the worktree list, report partial success: the main checkout moved to the right branch but linked-worktree cleanup did not finish.
   - If the `arbor checkout` command appears stuck during cleanup, interrupt it once, run the two post-checks above, and report the same partial-success state instead of running destructive fallback cleanup automatically.
