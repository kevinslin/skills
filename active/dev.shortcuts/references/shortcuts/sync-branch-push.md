Shortcut: Sync Current Branch And Force Push

Instructions:

Create a to-do list with the following items then perform all of them:

1. trigger:sync-branch

2. Confirm the current branch and its upstream remote branch:
   - `BRANCH="$(git branch --show-current)"`
   - If `BRANCH` is empty, stop and ask the user which branch to sync.
   - `UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>/dev/null || true)"`
   - If `UPSTREAM` is empty, stop and ask the user which remote branch should be used.
   - `REMOTE="${UPSTREAM%%/*}"`
   - `REMOTE_BRANCH="${UPSTREAM#*/}"`

3. Force-push the rebased branch back to the upstream remote branch:
   - `git push --force-with-lease "$REMOTE" "HEAD:refs/heads/$REMOTE_BRANCH"`

4. Final verification:
   - `git fetch "$REMOTE" "$REMOTE_BRANCH"`
   - `git status`
   - `git rev-list --left-right --count "$REMOTE/$REMOTE_BRANCH...HEAD"`
   - Report whether the branch is clean and synced with `$REMOTE/$REMOTE_BRANCH`.
