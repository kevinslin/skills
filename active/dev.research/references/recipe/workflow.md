# Recipe Workflow

## Use When

- The user asks to capture a reproducible change recipe
- The source input is either the current conversation or a PR

## Template

- `@references/recipe/template.md`

## Output Location

- `$ROOT_DIR/recipes/{recipe-name}.md`

## Inputs

- `current_conversation`: derive steps from work and decisions in this thread
- `pr`: derive steps from a PR URL/number and its diff/context

## Instructions

1. Confirm the input source (`current_conversation` or `pr`) and gather relevant context.
2. Derive a concise kebab-case recipe name.
3. Copy `@references/recipe/template.md` to `$ROOT_DIR/recipes/{recipe-name}.md`.
4. Fill the recipe with concrete, reproducible steps including exact file paths and commands.
5. Add verification steps and assumptions so another agent can execute the recipe safely.

## Best Practices

- Keep steps sequential and deterministic.
- Prefer concrete edits over high-level advice.
- Include only source context needed to reproduce the change.
