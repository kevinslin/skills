Shortcut: Prepare

Instructions:

Create a to-do list with the following items then perform all of them:

1. Confirm this is a Git repository and choose the local trunk branch:
   - `git rev-parse --show-toplevel`
   - If the command fails, stop and report that the current directory is not inside a Git repository.
   - `ORIGIN_HEAD="$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null || true)"`
   - `ORIGIN_DEFAULT="${ORIGIN_HEAD#origin/}"`
   - If `ORIGIN_DEFAULT` is `master` or `main` and `git show-ref --verify --quiet "refs/heads/$ORIGIN_DEFAULT"` succeeds, set `TARGET_BRANCH="$ORIGIN_DEFAULT"`.
   - Otherwise, if `git show-ref --verify --quiet refs/heads/master` succeeds, set `TARGET_BRANCH="master"`.
   - Otherwise, if `git show-ref --verify --quiet refs/heads/main` succeeds, set `TARGET_BRANCH="main"`.
   - If neither local `master` nor local `main` exists, stop and report that no local trunk branch is available.

2. Stash any local changes before switching branches:
   - `STATUS="$(git status --porcelain --untracked-files=normal)"`
   - If `STATUS` is non-empty, run `git stash push -u -m "prepare: save local changes before updating trunk $(date -u +%Y%m%dT%H%M%SZ)"`.
   - Record whether a stash was created so the final report can mention it.

3. Switch to the selected local trunk branch:
   - `git switch "$TARGET_BRANCH"`

4. Pull the latest changes from `origin`:
   - `git pull --ff-only origin "$TARGET_BRANCH"`
   - If the pull cannot fast-forward, stop and report the blocker instead of merging.

5. Final verification:
   - `git status --short --branch`
   - `git log -1 --oneline`
   - Report the selected branch, whether a stash was created, and the final status.
