---
name: debug-test-failure
description: Debug whether test failures were introduced by the current branch. Use when asked to determine branch specific regressions.
dependencies:
- dev.worktrees
---

# Debug Test Failure

## Overview

Use this skill to answer one question: did the current branch's changes introduce the observed test failure, or did the failure already exist at the baseline before the user's or agent's changes?

## Workflow

1. Capture the current context.
   - Read repository instructions and respect prohibited commands.
   - Record the current repo path, branch, `git status --short`, and test command.
   - If the user specified test files, test names, or a test command, use that targeted test command.
   - If the user did not specify tests, run the repository's full test suite or the closest documented "all tests" command.

2. Identify the comparison baseline.
   - Determine "me" from the user's explicit identity if provided; otherwise use `git config user.email` and `git config user.name`.
   - Determine the branch base with the upstream or default branch, for example:

```bash
git merge-base HEAD @{upstream}
git merge-base HEAD origin/main
git merge-base HEAD origin/master
```

   - Inspect branch-only commits in chronological order:

```bash
git log --reverse --format='%H%x09%an%x09%ae%x09%s' <base>..HEAD
```

   - Select the earliest commit in that branch-only list whose author is not "me".
   - If every branch-only commit is authored by "me", use `<base>` as the comparison commit.
   - If the selected non-me commit still includes earlier branch changes, call that out in the final report.

3. Create an isolated worktree.
   - Follow `dev.worktrees` conventions when available: store worktrees under `~/.worktrees/<repo>/`.
   - Use a detached worktree so no branch pointer moves:

```bash
git worktree add --detach ~/.worktrees/<repo>/debug-test-failure-<short-sha> <baseline-commit>
```

   - Do not place the worktree inside the repository.
   - If the path already exists, use a clear suffix such as `debug-test-failure-<short-sha>-2`.

4. Run comparable tests.
   - Run the same selected test command in the baseline worktree.
   - If the current worktree has not already run that command, run it there too.
   - Keep logs separate, for example `/tmp/debug-test-failure-current.log` and `/tmp/debug-test-failure-baseline.log`.
   - Install or bootstrap dependencies only as required by repository instructions.
   - Do not run unrelated precommit hooks or broad cleanup commands unless the user explicitly asked for them.

5. Compare results.
   - If the baseline passes and the current worktree fails, report that the current branch likely introduced the failure.
   - If both fail with the same failure, report that the failure likely predates the current changes or is environmental/flaky.
   - If the baseline fails differently, report that the result is inconclusive and separate the baseline failure from the current failure.
   - If either run cannot execute, report the exact blocker and avoid claiming causality.

6. Report the outcome.
   - Include the current branch, baseline commit, baseline worktree path, test command, and pass/fail result for each worktree.
   - State the causality conclusion in one sentence.
   - Include the most relevant failure excerpt, not the full log.
   - Keep the baseline worktree available until the report is complete; remove it only if the user asked for cleanup or the artifact is clearly unnecessary.
