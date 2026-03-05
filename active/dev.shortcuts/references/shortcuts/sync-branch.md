Shortcut: Sync Current Branch

Instructions:

Create a to-do list with the following items then perform all of them:

1. Confirm the current branch and its upstream remote branch:
   - `BRANCH="$(git branch --show-current)"`
   - If `BRANCH` is empty, stop and ask the user which branch to sync.
   - `UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>/dev/null || true)"`
   - If `UPSTREAM` is empty, stop and ask the user which remote branch should be used.
   - `REMOTE="${UPSTREAM%%/*}"`
   - `REMOTE_BRANCH="${UPSTREAM#*/}"`

2. Ensure the worktree is clean before rebasing:
   - `git status --porcelain`
   - If the output is non-empty, stop and ask the user to stash or commit those changes first.

3. Fetch the latest refs from the upstream remote:
   - `git fetch "$REMOTE" --prune`

4. Rebase the current branch onto the upstream branch with pull:
   - `git pull --rebase "$REMOTE" "$REMOTE_BRANCH"`

5. If rebase conflicts occur, resolve them and continue until the rebase completes:
   - Use `git status` to list conflicted files.
   - Resolve conflict markers in the affected files, then `git add <resolved-files>`.
   - Run `git rebase --continue`.
   - Repeat until the rebase succeeds or a blocking issue requires user input.
   - If the user asks to stop, run `git rebase --abort`.
