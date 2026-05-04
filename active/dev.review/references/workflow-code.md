# Code Review Workflow

Use this workflow to review code with a bias toward simplicity and correctness.

## Steps

1. Check correctness and logic.
   - Identify bugs, edge cases, race conditions, or incorrect behavior.
   - Call out violated invariants or implicit contracts.
2. Check assumptions and documentation.
   - Cross-check against existing documentation, comments, and expected behavior.
   - Highlight assumptions that are undocumented, outdated, or unsafe.
3. Check complexity and design.
   - Identify unnecessary abstractions, indirection, or branching.
   - Propose concrete simplifications such as deletion, inlining, or narrower scope.
4. Check failure modes and risk.
   - Describe how the code could fail in production through inputs, scale, or partial failure.
   - Note regressions or backward-compatibility risks.
5. Sketch a simpler rewrite when useful.
   - Prefer clarity and robustness over flexibility.
6. Create or update a flow doc when the review needs one.
   - Use `$specy` under `$ROOT_DIR/prs/`.
   - Capture PR context, key files touched, execution/data flow, major risks, and open questions.
   - Use a stable PR-based filename when possible, for example `<pr-number>-<slug>.md`.

## Severity Guidance

Clearly label severity for each issue: blocker, major, minor, or nit.
