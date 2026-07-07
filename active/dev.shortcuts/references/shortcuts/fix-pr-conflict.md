Shortcut: Fix Current PR Conflict

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure `gh` is available and a PR exists for the current branch. Record the
   original child head before changing history:
   - `gh --version`
   - `gh pr view --json number,baseRefName,mergeStateStatus,headRefName,headRefOid,commits`
   - `OLD_HEAD="$(git rev-parse HEAD)"`

2. Detect whether the current PR is in a conflict state:
   - `MERGE_STATE="$(gh pr view --json mergeStateStatus --jq .mergeStateStatus)"`
   - If `MERGE_STATE` is not `DIRTY`, stop and report that no PR conflict was detected.

3. Fetch latest remote refs and select the replay boundary:
   - `BASE_BRANCH="$(gh pr view --json baseRefName --jq .baseRefName)"`
   - `HEAD_BRANCH="$(gh pr view --json headRefName --jq .headRefName)"`
   - `git fetch origin --prune`
   - `NEW_BASE="origin/$BASE_BRANCH"`
   - Compare `PR_COMMIT_COUNT="$(gh pr view --json commits --jq '.commits | length')"`
     with
     `REPLAY_COUNT="$(git rev-list --count "$(git merge-base "$OLD_HEAD" "$NEW_BASE")..$OLD_HEAD")"`.
     Inspect the replay range when it exceeds the child PR commit count.
   - For an ordinary base update, run `git rebase "$NEW_BASE"`.
   - If the base is a stacked parent branch whose history was rewritten, the
     merge base can sit below the old parent and include unrelated parent
     commits. Prove the old parent tip (`OLD_BASE`) from the child commit
     boundary, a recorded previous PR base, or the base branch reflog. Do not
     guess when the boundary is ambiguous.
   - Print `OLD_BASE`, `NEW_BASE`, and
     `git log --oneline "$OLD_BASE..$OLD_HEAD"`, then replay only child-owned
     commits with
     `git rebase --onto "$NEW_BASE" "$OLD_BASE" "$HEAD_BRANCH"`.

4. If rebase conflicts occur, resolve and continue until rebase completes:
   - Use `git status` to list conflicted files.
   - Resolve conflict markers in files, then `git add <resolved-files>`.
   - Run `git -c core.editor=true rebase --continue` so Git keeps the existing commit message without opening an editor in a noninteractive agent shell.
   - Repeat until rebase succeeds or a blocking issue requires user input.
   - If user asks to stop, run `git rebase --abort`.

5. For a rewritten stacked base, verify patch equivalence before pushing:
   - Run
     `git range-diff "$OLD_BASE..$OLD_HEAD" "$NEW_BASE..HEAD"`.
   - Inspect unexpected dropped, duplicated, or materially changed child
     patches. Stop instead of pushing when the range-diff cannot be explained
     by intentional conflict resolution.

6. Push the rebased branch with force-with-lease:
   - `git push --force-with-lease origin HEAD`

7. Final verification:
   - `gh pr view --json mergeStateStatus --jq .mergeStateStatus`
   - Report the final merge state and push result.
