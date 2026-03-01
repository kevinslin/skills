Shortcut: Fix Current PR Conflict

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure `gh` is available and a PR exists for the current branch:
   - `gh --version`
   - `gh pr view --json number,baseRefName,mergeStateStatus,headRefName`

2. Detect whether the current PR is in a conflict state:
   - `MERGE_STATE="$(gh pr view --json mergeStateStatus --jq .mergeStateStatus)"`
   - If `MERGE_STATE` is not `DIRTY`, stop and report that no PR conflict was detected.

3. Fetch latest remote refs and rebase the PR branch onto the PR base branch:
   - `BASE_BRANCH="$(gh pr view --json baseRefName --jq .baseRefName)"`
   - `git fetch origin --prune`
   - `git rebase "origin/$BASE_BRANCH"`

4. If rebase conflicts occur, resolve and continue until rebase completes:
   - Use `git status` to list conflicted files.
   - Resolve conflict markers in files, then `git add <resolved-files>`.
   - Run `git rebase --continue`.
   - Repeat until rebase succeeds or a blocking issue requires user input.
   - If user asks to stop, run `git rebase --abort`.

5. Push the rebased branch with force-with-lease:
   - `git push --force-with-lease origin HEAD`

6. Final verification:
   - `gh pr view --json mergeStateStatus --jq .mergeStateStatus`
   - Report the final merge state and push result.
