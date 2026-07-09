---
name: create-spec
description: Create a spec with specy, then run looped dev.review and spec-simulate passes on it.
---

Shortcut: Create Spec

Arguments:

- `request`: the feature, investigation, validation, or design request to turn into a spec.

Instructions:

Create a to-do list with the following items, then perform all of them in order:

1. Resolve the requested spec goal, destination, and constraints from `request`.
   - If the goal, destination, or spec type is unclear, ask focused clarification questions before writing the spec.
   - Preserve any user-provided paths, scope boundaries, and validation requirements.

2. Use skill `specy` to create or update the spec.
   - Choose the correct spec type and target path.
   - Follow the relevant `specy` workflow and template.
   - Return the concrete spec path before starting review loops.

3. Run `trigger:loop $dev.review spec` against the created or updated spec.
   - Give the loop the exact spec path and the user request.
   - Scope the review to spec correctness, feasibility, simplicity, missing decisions, risks, and validation gaps.
   - Apply accepted blocker or major findings to the same spec through the loop fixer pass.

4. Run `trigger:loop $spec-simulate` against the reviewed spec.
   - Give the loop the exact spec path, target behavior, and any relevant implementation entrypoints named by the spec.
   - Scope the simulation to whether the spec is correct, comprehensive, and simple enough to implement against the real source.
   - Apply accepted blocker or major findings to the same spec through the loop fixer pass.

5. Report the final spec path, the number of review and simulation loop passes, whether blocker or major findings remain, and any open questions.
