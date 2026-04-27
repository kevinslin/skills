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
   - Enumerate inline review threads explicitly. Review threads are the source of truth for resolvable conversations; `gh pr view --json comments,reviews` and `gh pr view --comments` are not enough.
   - Preferred: `gh api graphql` to list `pullRequest.reviewThreads`, including `id`, `isResolved`, `isOutdated`, `path`, `line`, and each comment's `databaseId`, `url`, `body`, and author.
   - Alternative: `gh api repos/<owner>/<repo>/pulls/<n>/comments` is useful for inline comment context, but it does not give the review thread id needed to resolve conversations.
   - Avoid `gh pr view --json reviewThreads` (unsupported).
   Ask the user if any feedback is unclear.

6. Address all requested changes (including tests/docs when relevant).

7. trigger:commit-code -> trigger:push-code

8. Resolve addressed review threads. DO NOT SKIP THIS STEP.
   - For every actionable review thread fixed by the code or explanation, call the GraphQL `resolveReviewThread` mutation with the thread id.
   - If starting from a URL like `#discussion_r123`, map the REST comment `databaseId` to the containing GraphQL `reviewThreads.nodes[].id`, then resolve that thread id.
   - Re-query `pullRequest.reviewThreads` after resolving and verify each addressed thread has `isResolved: true`.
   - Leave comments for any outstanding work and explicitly report unresolved threads that remain.

9. trigger:check-ci

10. Summarize changes made
