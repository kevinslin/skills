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
6. Propose the simpler shape.
   - Describe what can be deleted, inlined, narrowed, or left unchanged.
   - When useful, sketch the smaller patch in concrete terms.

## Heuristics From The Downloaded Thread

- Do not split methods into helper methods that only have one call site unless the helper materially improves readability.
- Be suspicious of methods shorter than roughly five lines when they mainly exist to make the code look reusable.
- Watch for code broken into reusable-looking pieces that are not actually reused.
- Call out code that appears to optimize for generic flexibility instead of the current task.

## Output

- Lead with the most important simplification findings.
- For each finding, name the specific over-complexity pattern and the smaller alternative.
- Include "Keep" notes when apparently larger code is justified by an existing invariant, public contract, or real reuse.
- Avoid style-only complaints unless they affect correctness, reviewability, or future maintenance.
