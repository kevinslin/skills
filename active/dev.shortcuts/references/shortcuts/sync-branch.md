Shortcut: Sync Current Branch With Origin

Instructions:

Create a to-do list with the following items then perform all of them:

1. Confirm you are on a branch (not detached HEAD):
   - `branch=$(git rev-parse --abbrev-ref HEAD)`
   - If `branch` is `HEAD`, stop and ask the user which branch to use.

2. Verify whether the branch is clean:
   - `git status --porcelain`
   - If output is empty, set `had_stash=false`.
   - If output is non-empty, stash everything (including untracked files) and set `had_stash=true`:
     - `git stash push -u -m "sync-branch:auto-stash $(date +%Y-%m-%dT%H:%M:%S%z)"`

3. Fetch latest refs and rebase onto the remote tracking branch:
   - `git fetch origin --prune`
   - `git rebase origin/$branch`

4. If rebase conflicts occur, resolve them and continue until complete:
   - Use `git status` to list conflicted files.
   - Edit files to resolve conflicts, then `git add <resolved-files>`.
   - Continue with `git rebase --continue`.
   - Repeat until rebase succeeds or a blocking issue requires user input.
   - If the user asks to stop rebasing, use `git rebase --abort`.

5. If `had_stash=true`, restore stashed changes:
   - `git stash pop`

6. If stash pop produces conflicts, resolve them before finishing:
   - Use `git status` to identify conflicted files.
   - Resolve conflicts, then `git add <resolved-files>`.
   - Confirm no unresolved conflicts remain with `git status`.
   - If `git stash pop` kept the stash entry because of conflicts, drop it only after confirming all intended stash changes are present:
     - `git stash list`
     - `git stash drop <stash-ref>`

7. Final verification:
   - `git status`
   - Report whether the branch is clean and synced with `origin/$branch`.
