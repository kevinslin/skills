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

3. Capture the current local tip and fetch latest refs:
   - `LOCAL_HEAD=$(git rev-parse HEAD)`
   - `git fetch origin --prune`

4. Rebase the remote tracking branch onto the saved local tip:
   - Compute the number of commits that exist on `origin/$branch` but not on the saved local tip:
     - `REMOTE_ONLY_COUNT=$(git rev-list --right-only --count "$LOCAL_HEAD...origin/$branch")`
   - If `REMOTE_ONLY_COUNT` is `0`, set `TARGET_HEAD=$LOCAL_HEAD`.
   - Otherwise, use a temporary branch to replay remote-only commits on top of the saved local tip:
     - `tmp_branch="sync-branch/$branch-$(date +%Y%m%d-%H%M%S)"`
     - `git switch -c "$tmp_branch" "origin/$branch"`
     - `git rebase "$LOCAL_HEAD"`
     - If rebase conflicts occur, resolve them and continue until complete:
       - Use `git status` to list conflicted files.
       - Edit files to resolve conflicts, then `git add <resolved-files>`.
       - Continue with `git rebase --continue`.
       - Repeat until rebase succeeds or a blocking issue requires user input.
       - If the user asks to stop rebasing, use `git rebase --abort`.
     - Capture the rebased result:
       - `TARGET_HEAD=$(git rev-parse HEAD)`
     - Switch back to the original branch and move it to the rebased remote result:
       - `git switch "$branch"`
       - `git reset --hard "$TARGET_HEAD"`
     - Delete the temporary branch:
       - `git branch -D "$tmp_branch"`

5. Force-push the updated current branch to origin:
   - `git push --force-with-lease origin "HEAD:refs/heads/$branch"`

6. If `had_stash=true`, restore stashed changes:
   - `git stash pop`

7. If stash pop produces conflicts, resolve them before finishing:
   - Use `git status` to identify conflicted files.
   - Resolve conflicts, then `git add <resolved-files>`.
   - Confirm no unresolved conflicts remain with `git status`.
   - If `git stash pop` kept the stash entry because of conflicts, drop it only after confirming all intended stash changes are present:
     - `git stash list`
     - `git stash drop <stash-ref>`

8. Final verification:
   - `git fetch origin "$branch"`
   - `git status`
   - `git rev-list --left-right --count "origin/$branch...HEAD"`
   - Report whether the branch is clean and synced with `origin/$branch`.
