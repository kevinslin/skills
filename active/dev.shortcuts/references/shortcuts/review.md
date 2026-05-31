---
name: review
description: create a fresh PR worktree and run dev.review on the PR link
---

Instructions:

1. Require the input to be a GitHub PR link. If the user did not provide a PR link, ask for one.

2. Create a new worktree for the PR:
   - Use the repository's normal worktree workflow when available.
   - If no local workflow is documented, use `gh pr checkout <pr> --recurse-submodules=false` or an equivalent `git worktree add` flow that checks out the PR branch in a separate worktree.
   - Do not switch or mutate the user's current checkout except as needed to inspect clean status or create the linked worktree.
   - Before creating the worktree, check `git status -sb` in the current checkout and report any dirty state that could affect the operation.
   - Name the worktree from the PR number or branch so it is easy to identify.

3. In the new worktree, run the review using `$dev.review`:
   - Read the PR details and diff with `gh pr view` / `gh pr diff`.
   - Review from the new worktree against the PR base branch.
   - Use a code-review stance: lead with bugs, behavioral regressions, missing tests, and merge risks.
   - Do not post GitHub comments or reviews unless the user explicitly asks.

4. Report the result to the user:
   - Include the worktree path and branch.
   - List findings in severity order with file/line references when there are issues.
   - If there are no findings, say that clearly and note residual test or proof gaps.
