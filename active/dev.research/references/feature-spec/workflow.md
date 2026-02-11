# Feature Spec Workflow

## Use When

- The task requires detailed implementation planning with persistent documentation.
- Architecture or design decisions should be documented before coding.
- Work spans multiple milestones, dependencies, or external integrations.
- The user explicitly asks for an execution plan, project plan, or feature spec.

## Template

- `@references/feature-spec/template.md`

## Output Location

- `$ROOT_DIR/specs/active/{YYYY-MM-DD}-{title-in-kebab-case}.md`

## Instructions

1. Review related docs under `$ROOT_DIR/specs/active/`, `$ROOT_DIR/specs/`, and `$ROOT_DIR/flows/` to align naming and known behavior.
2. Copy `@references/feature-spec/template.md` to the output location.
3. Fill all sections with concrete, source-backed details from the repository and current task context.
4. Use `@references/feature-spec/effective-planning.md` for planning quality standards.
5. Include explicit tests and validation; prefer integration tests over unit tests when feasible.
6. If the repository uses beads for tracking, follow `@references/feature-spec/beads.md`.
7. Present a concise summary plus unresolved questions, unless the user asked to proceed without waiting.
8. If the user asked to proceed without waiting, answer outstanding questions with best judgment and record assumptions in the spec.
9. Simplify where possible (remove redundant phases, merge low-value steps) and document simplifications in `## Notes`.

## Authoring Requirements

- Break implementation into milestones or phases with explicit dependencies.
- Each milestone must ship a verifiable outcome.
- Risks must include concrete mitigations.
