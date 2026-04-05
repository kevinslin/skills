---
name: merge-pr-basic
description: merge a pr
---

Instructions:

Create a to-do list with the following items then perform all of them:

1. Check if there are any unstaged commits. If so, use trigger:commit-code to commit unstaged changes.

2. Check if there is a remote PR open for the current branch. Make sure that all pending checks have passed. If a remote PR is not available, throw an error. 

3. If a remote PR exists, merge it remotely (use `gh` if available). No need to wait for pending checks since we already did that in step 2. Delete the remote PR.
   - If `gh pr merge --delete-branch` reports that the local branch cannot be deleted because it is used by a linked worktree, immediately check whether the PR state is already `MERGED`.
   - When the PR is already merged, treat the command result as merge success plus incomplete local cleanup. Do not retry the merge; hand cleanup back to `merge-pr` so it can remove the worktree, prune, and delete the branch explicitly.
   - Only treat the step as a true merge failure when the PR did not merge remotely.
