Shortcut: Rebase And Fix

Arguments:

- `branch`: branch or ref to rebase the current branch onto.

Instructions:

Create a to-do list with the following items then perform all of them:

1. Confirm the target branch/ref and current branch:
   - If `branch` was not provided, ask the user which branch or ref to rebase from.
   - `CURRENT_BRANCH="$(git branch --show-current)"`
   - If `CURRENT_BRANCH` is empty, stop and ask the user which branch should be rebased.

2. Ensure the worktree is clean before rebasing:
   - `git status --porcelain`
   - If the output is non-empty, stop and ask the user to stash or commit those changes first.

3. Fetch the latest refs for the target branch/ref when it appears to be remote-backed:
   - If `branch` is shaped like `remote/name`, run `git fetch "${branch%%/*}" --prune`.
   - Otherwise, run `git fetch --all --prune`.

4. Rebase the current branch onto `branch`:
   - `git rebase "$branch"`

5. If rebase conflicts occur, resolve and continue until the rebase completes:
   - Use `git status` to list conflicted files.
   - Resolve conflict markers in the affected files, then `git add <resolved-files>`.
   - Run `git rebase --continue`.
   - Repeat until the rebase succeeds or a blocking issue requires user input.
   - If the user asks to stop, run `git rebase --abort`.

6. Fix any PR merge conflicts after the rebase:
   - If the current branch has a PR and `gh pr view --json mergeStateStatus --jq .mergeStateStatus` reports `DIRTY`, run `trigger:fix-pr-conflict`.
   - If no PR exists or the merge state is not `DIRTY`, continue.

7. Publish the rebased branch:
   - `trigger:push-code`

8. Check CI:
   - `trigger:check-ci`
