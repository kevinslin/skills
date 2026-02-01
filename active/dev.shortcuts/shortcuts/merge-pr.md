---
name: merge-pr
description: merge a remote pr
---

Instructions:

Create a to-do list with the following items then perform all of them:

0. Check if there are any unstaged commits. If so, use @shortcut:commit-code to commit unstaged changes.

1. Check if there is a remote PR open for the current branch. Make sure that all pending checks have passed. If a remote PR is not available, throw an error. 

3. If a remote PR exists, merge it remotely (use `gh` if available). No need to check for pending checks since we already did that in step 1.

4. Switch back to the main branch locally if you are not on it. Pull from the remote. Push all changes.

5. Delete the local branch if you switched branches. 