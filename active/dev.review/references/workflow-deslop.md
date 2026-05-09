# Anti-Slop Code Review Workflow

Use this workflow when the user asks for a deslop, anti-slop, simplification, over-editing, or "too AI-generated" review of code.

## Review Goal

Find code that is more complex, defensive, broad, or verbose than the task requires. Preserve correctness, but push the patch toward the smallest clear implementation that fits the existing codebase.

## Steps

1. Establish the required behavioral change.
   - Identify the user-visible behavior, bug fix, or contract change the patch actually needs.
   - Compare the required change with the size and shape of the implementation.
2. Check for helper-function overuse.
   - Flag helper functions with only one call site when they obscure the local flow.
   - Flag tiny helper functions that only wrap one or two obvious operations.
   - Prefer inlining when the helper exists for speculative reuse rather than current clarity.
3. Check for over-editing.
   - Flag rewrites of surrounding code that are not required by the task.
   - Identify broad refactors, renamed concepts, reshaped data flows, or unrelated cleanup that increases review burden.
4. Check for excessive defensiveness.
   - Flag broad `try`/`except`, repeated validation, fallback ladders, and error swallowing around code that should fail loudly or cannot reasonably fail.
   - Prefer using existing invariants and nearby contracts instead of revalidating everything locally.
5. Check complexity and patch metrics qualitatively.
   - Look for unnecessary branches, state machines, classes, adapters, config knobs, and abstraction layers.
   - Treat patch length and cyclomatic complexity as warning signals, not automatic failures.
6. Check for redundant derived fields.
   - For each new or changed data shape, ask: "Which field is the canonical owner of this fact?"
   - Flag fields that merely copy another field in the same object graph.
   - Flag boolean shortcuts that restate an enum, discriminated union, status object, or source record without adding new semantics.
   - Flag map values that repeat the map key unless values are routinely passed around without their key.
   - Treat duplicated persisted fields as higher severity than duplicated in-memory fields because they create upgrade, migration, and stale-state risk.
7. Propose the simpler shape.
   - Describe what can be deleted, inlined, narrowed, or left unchanged.
   - When useful, sketch the smaller patch in concrete terms.

## Redundant Field Correction Rules

- Pick one canonical owner for each fact before recommending a patch.
- Preserve source data in its source object; do not copy source fields to sibling fields for convenience.
- Keep resolved or normalized state in one resolved type; do not also carry raw-looking aliases unless callers need both representations.
- Derive UI, report, logging, and telemetry convenience fields at the boundary that emits them, not in shared runtime records.
- For maps, prefer the map key as the canonical id. If a caller needs both key and value, iterate entries or return a small boundary object that includes both.
- For persisted state, either write only the canonical shape or intentionally version/reject old shapes. Do not add compatibility shims unless the user or product contract explicitly requires them.
- Add a regression test at the consumer or parser boundary that would fail if code still depends on the deleted duplicate field.

## Heuristics From The Downloaded Thread

- Do not split methods into helper methods that only have one call site unless the helper materially improves readability.
- Be suspicious of methods shorter than roughly five lines when they mainly exist to make the code look reusable.
- Watch for code broken into reusable-looking pieces that are not actually reused.
- Call out code that appears to optimize for generic flexibility instead of the current task.
- Search for same-fact names across nearby types: source object names, ids, status booleans, reason fields, summary/detail fields, and derived readiness flags.
- When a type contains both a high-level object and scalar siblings, require an explanation for every scalar sibling that can be derived from the object.
- When a status boolean and a status reason appear together, check whether one is fully derivable from the other. Keep both only when they intentionally answer different questions.

## Output

- Lead with the most important simplification findings.
- For each finding, name the specific over-complexity pattern and the smaller alternative.
- Include "Keep" notes when apparently larger code is justified by an existing invariant, public contract, or real reuse.
- Avoid style-only complaints unless they affect correctness, reviewability, or future maintenance.
