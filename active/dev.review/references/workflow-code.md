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
4. Check for dead code and stale surface.
   - Look for unreachable branches, obsolete compatibility shims, abandoned helpers, duplicate implementations, unused parameters, stale feature flags, and outdated docs/tests/config left behind by the change.
   - Verify likely dead code with call-site, import/export, route, config, CLI, migration, or serialization searches before recommending deletion.
   - Treat public APIs, persisted data shapes, migrations, plugin/tool contracts, and documented CLI behavior as possible compatibility contracts; call out the contract before proposing removal.
   - Prefer concrete deletion follow-ups: file/symbol to remove, tests to update, and any compatibility note needed.
5. Check failure modes and risk.
   - Describe how the code could fail in production through inputs, scale, or partial failure.
   - Note regressions or backward-compatibility risks.
6. Sketch a simpler rewrite when useful.
   - Prefer clarity and robustness over flexibility.
7. Create or update a flow doc when the review needs one.
   - Use `$specy` under `$ROOT_DIR/prs/`.
   - Capture PR context, key files touched, execution/data flow, major risks, and open questions.
   - Use a stable PR-based filename when possible, for example `<pr-number>-<slug>.md`.
8. For PR review loops, verify the remote gate before handoff.
   - Confirm the current PR head SHA after every push or amend.
   - Inspect current checks, actionable comments/reviews, and unresolved non-outdated review threads.
   - Do not report the loop as finished while required checks are failed/pending or review items remain.
   - In the handoff, include head SHA, failing/pending check count, unresolved thread count, and any blocker that still needs user action.

## Severity Guidance

Clearly label severity for each issue: blocker, major, minor, or nit.
