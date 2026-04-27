---
name: babysit-pr
description: Babysit an active pull request by polling GitHub and CI until it is stable green or needs fixes.
dependencies: [dev.shortcuts, gen-notifier]
---

# PR Babysit Loop

Use this skill when the user asks to babysit, watch, or keep an eye on a pull request until review comments and CI are settled.

## Setup

1. Identify the PR URL or number. If the user did not provide one, infer it from the current branch with `gh pr view` when possible; otherwise ask for the PR.
2. Confirm `gh` is available and authenticated for the PR repo.
3. Create one dedicated thread automation for the loop. Name it with the repo and PR number, for example `babysit-pr: owner/repo#123`.
4. Store loop state in the automation context: PR identifier, last seen issue/comment/review identifiers, current head SHA, and the start time of the current quiet-green window. Do not create repo files just to track loop state.

If the runtime has no first-class thread automation API, emulate the loop in the current agent thread with timed sleeps and state that no persistent automation API was available.

## Polling Loop

Poll every 5 minutes until the pass condition or a terminal stop condition is reached.

At each poll:

1. Poll GitHub for new PR activity since the last baseline:
   - Issue comments and reviews from `gh pr view <pr> --json comments,reviews,reviewDecision,mergeStateStatus,headRefOid`.
   - Inline review threads through GraphQL `pullRequest.reviewThreads`, including unresolved, non-outdated threads and requested changes.
   - Merge conflicts or blocked merge states.
2. Poll CI for the current head SHA:
   - Start with `gh pr checks <pr>` or `gh pr view <pr> --json statusCheckRollup`.
   - Use repo-specific CI links or provider CLIs when the PR exposes them.
   - Use `trigger:check-ci` from `../dev.shortcuts/SKILL.md` when checks need deeper Buildkite/provider classification.
3. Classify issues:
   - New actionable comments, requested changes, or unresolved review threads are GitHub issues.
   - Failed, errored, cancelled, or clearly stuck checks are build issues.
   - Pending/running checks are not build issues, but they do not count toward the quiet-green window.

## Fix Cycle

When any GitHub or build issue is found:

1. Capture a short evidence summary: PR, head SHA, comment/review/check identifiers, URLs, and failure names.
2. Invoke `trigger:fix-pr` from `../dev.shortcuts/SKILL.md` with the PR and evidence.
3. After the fix flow completes, refresh the PR head SHA and reset the quiet-green timer.
4. Return to the 5-minute polling loop.

Do not mark the babysit loop complete immediately after a fix. Completion requires a fresh quiet-green window.

## Pass Condition

Complete only after all of these are true:

1. CI is green for the current head SHA.
2. No new actionable GitHub issues have appeared.
3. The PR has stayed in that green/no-new-issues state for at least 20 continuous minutes, checked at the 5-minute cadence.

Reset the 20-minute timer whenever a new commit appears, CI stops being green, or new actionable GitHub activity appears.

## Completion And Cleanup

When the pass condition is met:

1. Delete or cancel the thread automation that was running the babysit loop.
2. Use `../gen-notifier/SKILL.md` to send exactly one completion notification.
3. Report the PR, final head SHA, checks status, quiet-window duration, and automation deletion status.

If the loop hits an unrecoverable error, delete or cancel the automation when possible, notify with an error status through `../gen-notifier/SKILL.md`, and report the blocker.
