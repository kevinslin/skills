Shortcut: Merge Feature

Instructions:

Create a to-do list with the following items then perform all of them:

1. Update `CHANGELOG.md` with the changes using Conventional Commits style.

2. Commit the changelog changes with a concise, descriptive commit message.

3. Check if there is a remote PR open for the current branch.

4. If a remote PR exists, merge it remotely (use `gh` if available; see
   @docs/general/agent-setup/github-cli-setup.md if needed).

5. If no remote PR exists, merge the branch locally.

6. Switch back to the main branch. If you merged in a remote PR, make sure to pull from the remote