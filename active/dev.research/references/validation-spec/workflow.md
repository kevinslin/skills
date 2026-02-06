# Validation Spec Workflow

## Use When

- Pairing with plan and implementation specs to review validation coverage
- Documenting remaining automated validation work
- Producing a clear manual validation checklist for the user

## Template

- `@references/validation-spec/template.md`

## Output Location

- `$ROOT_DIR/project/specs/active/valid-{YYYY-MM-DD}-{topic}.md`
- Match the plan spec filename stem.

## Shortcut

1. Identify the plan and implementation specs being validated.
2. Copy `@references/validation-spec/template.md` to `$ROOT_DIR/project/specs/active/valid-{YYYY-MM-DD}-{topic}.md`.
3. Fill in validation status and remaining manual checks based on current implementation and tests.

## Authoring Requirements

- Always reference both plan and implementation specs being validated.
