# Optimize an existing skill

Use this workflow for direct improvements to skill instructions, scripts, references, assets, triggers, or usability.

For improvements derived from sessions, PRs, audits, or repeated agent friction, complete the evidence review and candidate ranking first. Apply the resulting skill change through this canonical editing workflow.

## Workflow

1. Resolve and lock the canonical editable source using the source preflight in `../SKILL.md`.
2. Inventory the target skill's `SKILL.md`, scripts, references, assets, tests, and declared dependencies.
3. Read enough related content to preserve the existing behavioral contract and identify downstream consumers.
4. Build a coverage checklist from the current triggers, modes, required steps, outputs, failure states, and validation requirements.
5. Improve the smallest useful surface:
   - clarify the frontmatter trigger and scope;
   - use concise, affirmative, imperative instructions;
   - consolidate duplicated or conflicting guidance;
   - move detailed or conditional material into linked references;
   - add examples only where they resolve real ambiguity;
   - remove orphaned or obsolete resources.
6. Recheck the coverage checklist and dependency impact before finalizing the edit.
7. Run affected tests, synchronize dependency metadata when applicable, validate the skill, and package it.
8. Sync through the configured source workflow when the user requested an installed update, then verify the runtime copy against the canonical source.

## Authorization and clarification

Treat requests such as "update this skill," "optimize this skill," or "apply these recommendations" as authorization to make the described in-scope edits.

Ask for clarification when:

- multiple canonical source locations remain plausible after preflight;
- the requested optimization could remove or materially change behavior;
- the user requested recommendations or a draft rather than edits.

## Quality checklist

- The description states when the skill should trigger.
- Instructions are scannable, affirmative, and internally consistent.
- The default path appears before conditional or advanced paths.
- Every reference is linked and every bundled resource has a clear owner.
- Existing behavior is preserved unless the request explicitly changes it.
- Tests, validation, packaging, and runtime verification match the changed surface.
