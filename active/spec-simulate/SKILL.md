---
name: spec-simulate
description: Simulate implementing a spec against the real source code, then grade the spec as correct, comprehensive, and simple. Use only when explicitly invoked as $spec-simulate or when the user asks to simulate implementation from a spec.
dependencies: []
---

# spec-simulate

Use this skill to stress-test a spec before implementation by reading the spec,
reading the relevant source, mentally implementing it end to end, and grading
whether the spec is ready.

Default to review-only. Do not edit source code unless the user explicitly asks
for implementation. If the user asks to apply findings, edit the spec only.

## Workflow

1. Resolve the spec and goal.
   - Identify the spec path, target behavior, and stated grading criteria.
   - If the spec path is missing and cannot be inferred from the current task,
     ask one concise question.
2. Read the implementation context.
   - Read the spec first.
   - Read the source files, tests, helpers, data types, and existing APIs the
     spec names or clearly depends on.
   - Verify current behavior from code instead of relying on the spec's claims.
3. Simulate implementation end to end.
   - Walk through the concrete code changes the implementer would make.
   - Check call paths, data contracts, cache/state ownership, error handling,
     migration/backfill behavior, and tests.
   - Treat "I would need to decide X while coding" as a spec gap.
4. Grade the spec.
   - `correct`: whether the spec accomplishes the user's desired behavior and
     avoids wrong behavior or missed cases.
   - `comprehensive`: whether the spec is enough to implement end to end without
     ambiguity, including tests and verification.
   - `simple`: whether the spec uses the existing codebase's simplest viable
     path instead of duplicating logic or introducing unnecessary abstractions.
5. Classify findings.
   - Major: anything that can cause incorrect behavior, failed validation, data
     loss, security/privacy risk, incompatible contracts, or an implementation
     blocker.
   - Minor: clarity, test expansion, naming, or simplification feedback that
     improves the spec but does not block implementation.
6. If asked to apply findings, patch the spec.
   - Apply major findings first.
   - Keep changes scoped to the reviewed spec.
   - Re-run a quick simulation pass after edits when practical.

## Output

Use this shape for a review-only pass:

```markdown
correct: yes/no, with caveats
comprehensive: yes/no, with missing cases
simple: yes/no, with simplification opportunities

Major findings:
- ...

Minor findings:
- ...
```

If there are no major findings, say that explicitly. Keep the report focused on
spec changes that would affect implementation.

## Loop Mode

When the user asks for a loop or repeated simulation pass:

1. Run up to three passes.
2. After each pass, apply major findings to the spec if the user asked for
   fixes.
3. Stop early when a pass reports no major findings.
4. In the final report, include the number of passes and whether major findings
   remain.
