# Feature Spec Workflow

## Use When

- The task requires detailed implementation planning with persistent documentation.
- Architecture or design decisions should be documented before coding.
- Work spans multiple milestones, dependencies, or external integrations.
- The user explicitly asks for an execution plan, project plan, or feature spec.

## Template

- `@references/feature-spec/template.md`

## Output Location

- `$DOCS_ROOT/specs/{YYYY-MM-DD}-{title-in-kebab-case}.md`

## Instructions

1. Review related docs under `$DOCS_ROOT/specs/` and `$DOCS_ROOT/flows/` to align naming and known behavior.
2. Copy `@references/feature-spec/template.md` to the output location.
3. Fill the required sections with concrete, source-backed details from the repository and current task context. Omit optional subsections when they would only add boilerplate.
4. Use `@references/feature-spec/effective-planning.md` for planning quality standards.
5. Include a concrete `Required Pre-Read (LLM Agent)` list and explicit integration touchpoints (files/services/endpoints), because these are frequently reused during implementation sessions.
6. Record resolved ambiguities and explicit decisions in the spec as they are discovered; do not leave important pivots buried in chat history.
7. Include explicit validation and done criteria. If a dedicated validation spec is created, link it instead of duplicating a large matrix in the feature spec.
8. If the repository uses beads for tracking, follow `@references/feature-spec/beads.md`.
9. Present a concise summary plus unresolved questions, unless the user asked to proceed without waiting.
10. If the user asked to proceed without waiting, answer outstanding questions with best judgment and record assumptions in the spec.
11. Simplify where possible (remove redundant phases, merge low-value steps, prefer one strong section over many thin ones).
12. When editing an existing spec, preserve `## Manual Notes` unless the user explicitly asks to change it.

## Authoring Requirements

- Required sections: `Goal and Scope`, `Context and Constraints`, `Approach and Touchpoints`, `Phases and Dependencies`, `Validation and Done Criteria`, `Open Items and Risks`, `Manual Notes`, `Changelog`.
- Optional subsections should be omitted when empty or generic (for example, `Non-obvious Dependencies or Access`, `Important Implementation Notes`, `Unit tests`, `Separate Validation Spec`, `Simplifications and Assumptions`).
- Break implementation into milestones or phases with explicit dependencies.
- Each milestone must ship a verifiable outcome.
- Risks must include concrete mitigations.
- Prefer concrete touchpoints and decisions over generic `Technology Stack` or `Design Patterns` lists unless those are central to the implementation risk.
