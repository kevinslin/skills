# Dead Code Review Workflow

Use this workflow when the user asks for dead-code, stale-code, cleanup, unused-symbol, "can this be deleted?", or PR residue review.

## Review Goal

Audit every new named artifact introduced by the PR and decide whether it is still necessary. The review is complete only when each new class, function, method, variable, constant, option, config field, route, registration, test helper, and bundled file has an evidence-backed verdict.

## Steps

1. Establish the PR boundary.
   - Identify the base branch, merge base, or user-provided diff.
   - List changed files before reading deeply.
   - Stay scoped to the PR unless a symbol's call graph requires checking existing consumers.
2. Build a new-artifact inventory.
   - Enumerate all newly introduced named artifacts, including classes, dataclasses, structs, functions, methods, variables, constants, enum members, config fields, CLI flags/options, route names, decorators/registrations, assets, generated files, and test helpers.
   - Use language-aware tools when available, such as AST queries, type checker references, compiler errors, `rg`, or structured diff parsing.
   - Treat new members added to existing types as new artifacts.
   - Do not rely on sampling. Every new artifact needs a row, note, or explicit grouping with the same verdict.
3. Trace usage for each artifact.
   - Search for direct imports, callsites, reads, writes, serialization/deserialization, decorators, framework registration, CLI dispatch, route dispatch, schema use, docs references, and tests.
   - Separate production usage from test-only usage.
   - Distinguish "used because a test asserts it exists" from behavior that production actually needs.
   - Check whether usage is only a pass-through to another value, a stale integration-test hook, or a remnant of an earlier implementation approach.
4. Decide necessity.
   - Keep artifacts that implement required behavior, preserve a public or persisted contract, are consumed dynamically by a framework, or are clearly needed by the selected design.
   - Flag artifacts that have no production callsite, only test-only callsites, unused constructor parameters, unused fields, unused return values, dead branches, duplicate wrappers, speculative extension points, or config knobs that no profile or caller sets.
   - Flag artifacts that can be inlined into their only real callsite when the helper does not improve readability or enforce a meaningful invariant.
   - Flag tests that only preserve dead code rather than proving user-visible behavior.
5. Verify delete candidates.
   - Name the exact deletion or simplification.
   - Identify the expected follow-on cleanup: imports, tests, fixtures, docs, generated assets, config schemas, snapshots, or type declarations.
   - When feasible, state the targeted tests or type checks that should fail before cleanup or pass after cleanup.
   - Do not recommend deleting public API, migrations, serialized fields, feature flags, or framework-discovered registration points without calling out the compatibility risk.

## Inventory Format

Use a compact table or grouped checklist when the PR introduces more than a handful of artifacts:

| Artifact | Location | Evidence | Verdict |
| --- | --- | --- | --- |
| `name` | `path:line` | production callsite, test-only callsite, or no refs | keep/delete/simplify/needs decision |

## Output

- Lead with concrete delete/simplify findings, ordered by impact.
- For each finding, cite the artifact definition and the evidence showing why it is unnecessary.
- Include a short inventory summary: total new artifacts checked, keep count, delete/simplify count, and needs-decision count.
- Include "Keep" notes only for artifacts that look suspicious but are justified by dynamic registration, public contract, or real reuse.
- If no dead code remains, say that clearly and mention any residual risk from dynamic dispatch, generated code, or incomplete test execution.
