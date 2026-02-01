Shortcut: Fix PR

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure the GitHub CLI `gh` is available 

2. Ask for the PR link if not already provided, and confirm whether to use a worktree. Default to a worktree unless the user says otherwise or if you are already on the branch matching the pr. 

3. Use `gh pr view <pr>` to identify the PR branch and remote, then fetch the branch as needed.

4. If using a worktree, create one for the PR branch (for example `../<repo>-pr-<number>`)
   and check out the branch there. Otherwise, check out the PR branch in the current repo.

5. Review PR comments and requested changes using `gh pr view <pr> --comments` and
   `gh pr diff <pr>`. Ask the user if any feedback is unclear.

6. Address all requested changes (including tests/docs when relevant).

7. trigger:commit-code

8. Push the branch updates to the PR remote.

9. trigger:check-ci