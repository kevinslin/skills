Shortcut: Merge Feature

Instructions:

Create a to-do list with the following items then perform all of them:

1. Check if there is a remote PR open for the current branch. Make sure that all pending checks have passed.

2. Update `CHANGELOG.md` with the changes using Conventional Commits style.

3. Commit the changelog changes with a concise, descriptive commit message.

4. If a remote PR exists, merge it remotely (use `gh` if available; see
   @docs/general/agent-setup/github-cli-setup.md if needed). No need to check for pending checks since we already did that in step 1.

5. If no remote PR exists, merge the branch locally.

6. Switch back to the main branch. If you merged in a remote PR, make sure to pull from the remote