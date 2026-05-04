---
name: loop
description: Run provided instructions in a child agent up to three times, with the parent fixing major findings between passes.
---

Shortcut: Loop

Arguments:

- `instructions`: instruction text, skill invocation, shortcut trigger, or review command to run repeatedly.

Examples:

- `trigger:loop $dev.review`
- `trigger:loop review the current diff with $dev.review`

Instructions:

Create a to-do list for up to three passes, then perform them in order. Each pass has two roles:

- Child agent: run `instructions` and report findings.
- Parent agent: decide whether findings are major, apply fixes, and decide whether another pass is needed.

For each pass:

1. Spawn a child agent to run `instructions` exactly as provided.
   - If `instructions` is missing, ask the user what should be looped.
   - Give the child agent the relevant artifact paths, current diff, and review scope.
   - The child agent should not apply fixes unless the user explicitly requested that the looped instruction itself makes edits.
   - Wait for the child result before deciding whether to continue.

2. Classify the pass result:
   - Treat blocker, critical, high-severity, or major findings as major findings.
   - Treat minor, nit, informational, or no-issue feedback as not major findings.
   - If severity is unclear, use impact: anything that can cause incorrect behavior, failed validation, data loss, security/privacy risk, or an unusable workflow is major.

3. If no blocker or major findings remain, stop the loop and report the clean pass.

4. If blocker or major findings remain, the parent agent addresses them before the next pass.
   - Keep fixes scoped to the reviewed task.
   - Do not continue looping on a finding that needs user input; stop and ask for that input.
   - Do not ask the child agent to fix its own findings; the next child-agent pass should independently re-check the parent-applied fix.

Stop after the third pass even if major findings remain. In the final report, include the number of passes run, whether major findings remain, and the unresolved findings or follow-ups.
