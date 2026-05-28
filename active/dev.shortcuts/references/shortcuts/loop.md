---
name: loop
description: Run provided instructions with a reviewer subagent and a fixer subagent until major findings are cleared or a blocker stops progress.
---

Shortcut: Loop

Arguments:

- `instructions`: instruction text, skill invocation, shortcut trigger, or review command to run repeatedly.

Examples:

- `trigger:loop $dev.review`
- `trigger:loop review the current diff with $dev.review`

Instructions:

Create a to-do list for repeated passes, then perform them in order. Each pass has three roles:

- Reviewer subagent: run `instructions` and report findings.
- Fixer subagent: apply the accepted fixes for blocker or major findings.
- Parent agent: decide which findings are major, scope the fixes, and decide whether another pass is needed.

For each pass:

1. Spawn a reviewer subagent to run `instructions` exactly as provided.
   - If `instructions` is missing, ask the user what should be looped.
   - Give the reviewer subagent the relevant artifact paths, current diff, and review scope.
   - The reviewer subagent should not apply fixes unless the user explicitly requested that the looped instruction itself makes edits.
   - Wait for the reviewer result before deciding whether to continue.

2. Classify the pass result:
   - Treat blocker, critical, high-severity, or major findings as major findings.
   - Treat minor, nit, informational, or no-issue feedback as not major findings.
   - If severity is unclear, use impact: anything that can cause incorrect behavior, failed validation, data loss, security/privacy risk, or an unusable workflow is major.

3. If no blocker or major findings remain, stop the loop and report the clean pass.

4. If blocker or major findings remain, the parent agent scopes the accepted fix list before another review pass.
   - Keep fixes scoped to the reviewed task.
   - Do not continue looping on a finding that needs user input; stop and ask for that input.
   - Drop minor-only feedback from the auto-fix list unless the user explicitly asked for all findings to be addressed.

5. Spawn a fixer subagent to address the accepted blocker or major findings.
   - Give the fixer subagent the exact findings, target files, and any validation expectations.
   - The fixer subagent should not perform a fresh review; it should only implement the scoped fixes.
   - Wait for the fixer result, then continue to the next review pass with a fresh reviewer subagent.

6. Continue looping until one of these exit conditions is met:
   - no blocker or major findings remain
   - the next step needs user input or approval
   - the same major finding repeats without meaningful progress after three passes

In the final report, include the number of review passes run, whether blocker or major findings remain, and any unresolved findings or follow-ups.
