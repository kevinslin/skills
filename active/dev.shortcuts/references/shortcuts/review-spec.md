---
name: review-spec
description: Run looped dev.review and spec-simulate passes against an existing spec.
---

Shortcut: Review Spec

Arguments:

- `spec`: the spec path, spec title, or current spec context to review.

Instructions:

Create a to-do list with the following items, then perform all of them in order:

1. Resolve the target spec and review goal from `spec`.
   - If the spec path cannot be inferred from the current task, ask one focused clarification question.
   - Preserve any user-provided paths, scope boundaries, implementation entrypoints, and validation requirements.

2. Run `trigger:loop $dev.review spec` against the resolved spec.
   - Give the loop the exact spec path and the user request.
   - Scope the review to spec correctness, feasibility, simplicity, missing decisions, risks, and validation gaps.
   - Apply accepted blocker or major findings to the same spec through the loop fixer pass.

3. Run `trigger:loop $spec-simulate` against the reviewed spec.
   - Give the loop the exact spec path, target behavior, and any relevant implementation entrypoints named by the spec.
   - Scope the simulation to whether the spec is correct, comprehensive, and simple enough to implement against the real source.
   - Apply accepted blocker or major findings to the same spec through the loop fixer pass.

4. Report the final spec path, the number of review and simulation loop passes, whether blocker or major findings remain, and any open questions.
