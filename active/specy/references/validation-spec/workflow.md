# Validation Spec Workflow

## Use When

- Pairing with plan and implementation specs to review validation coverage
- Documenting remaining automated validation work
- Producing a clear manual validation checklist for the user

## Template

- `@references/validation-spec/template.md`

## Constants
- %%OUTPUT_DIR: $DOCS_ROOT/specs/
- %%OUTPUT_FILE: %%OUTPUT_DIR{YYYY-MM-DD}-{topic}.md

## Instructions

1. Identify the plan and implementation specs being validated.
2. Choose a `{topic}` slug that stays within the `{YYYY-MM-DD}-{topic}.md` filename format and includes a `-validation` qualifier when needed to avoid collisions.
3. Copy `@references/validation-spec/template.md` to %%OUTPUT_FILE.
4. Fill in validation status and remaining manual checks based on current implementation and tests.
5. Keep in-progress specs under `$DOCS_ROOT/specs/`. When the spec is complete, move it to `$DOCS_ROOT/specs/.archive/` without renaming it.
6. Resolve the current agent session id via `dev.llm-session` and include it in the `## Changelog` entry before handoff.

## Authoring Requirements

- Always reference both plan and implementation specs being validated.
- End the doc with `## Manual Notes` followed by `## Changelog`.
