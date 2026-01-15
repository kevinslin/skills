Shortcut: Create New Git Worktree for Feature

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ask the user for the feature description if not already provided (e.g., "create a foo factory")

2. Convert the feature description into a kebab-case branch name (e.g., "create a foo factory" becomes "create-foo-factory")

3. Fetch all remote branches with `git fetch --all`

4. Create a new worktree with the branch name in a sibling directory:
   - Determine the current repo directory name
   - Create the worktree at `../<repo-name>-<branch-name>` using `git worktree add -b <branch-name> ../<repo-name>-<branch-name> origin/main`

5. Change into the new worktree directory

6. Rebase the new branch onto the latest origin/main with `git rebase origin/main`

7. Confirm the worktree is set up correctly by showing the current branch and last commit
