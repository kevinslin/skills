Shortcut: Fix PR

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure the GitHub CLI `gh` is available 

2. Ask for the PR link if not already provided, and confirm whether to use a worktree. Default to a worktree unless the user says otherwise or if you are already on the branch matching the PR. 

3. Use `gh pr view <pr>` to identify the PR branch and remote, then fetch the branch as needed.

4. If using a worktree, create one for the PR branch (for example `../<repo>-pr-<number>`)
   and check out the branch there. Otherwise, check out the PR branch in the current repo.

5. Review PR comments and requested changes:
   - Use `gh pr view <pr> --comments` and `gh pr diff <pr>` for general context.
   - Enumerate inline review threads explicitly (do not rely only on `gh pr view --comments`).
     Preferred: `gh api graphql` to list `reviewThreads` (includes thread ids + isResolved).
     Alternative: `gh api repos/<owner>/<repo>/pulls/<n>/comments` for inline comments.
   - Avoid `gh pr view --json reviewThreads` (unsupported).
   Ask the user if any feedback is unclear.

6. Address all requested changes (including tests/docs when relevant).

7. trigger:commit-code -> trigger:push-code

8. Resolve addressed review threads (via `resolveReviewThread` GraphQL mutation or reply)
   and leave comments for any outstanding work. DO NOT SKIP THIS STEP

9. trigger:check-ci

10. Summarize changes made
