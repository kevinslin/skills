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

1. Review related docs under `$DOCS_ROOT/specs/`, archived specs under `$DOCS_ROOT/specs/.archive/`, and `$DOCS_ROOT/flows/` to align naming and known behavior.
2. Choose a title slug that stays within the `{YYYY-MM-DD}-{topic}.md` filename format and includes a qualifier when needed to avoid collisions with sibling specs.
3. Copy `@references/feature-spec/template.md` to the output location.
4. Fill the required sections with concrete, source-backed details from the repository and current task context. Omit optional subsections when they would only add boilerplate.
5. Use `@references/feature-spec/effective-planning.md` for planning quality standards.
6. Include a concrete `Required Pre-Read (LLM Agent)` list and explicit integration touchpoints (files/services/endpoints), because these are frequently reused during implementation sessions.
7. Record resolved ambiguities and explicit decisions in the spec as they are discovered; do not leave important pivots buried in chat history.
8. Include explicit acceptance criteria, validation plan, and done criteria. Acceptance criteria answer "what must be true," validation answers "how it is proven," and done criteria answer "what must be complete before handoff." If a dedicated validation spec is created, link it instead of duplicating a large matrix in the feature spec.
9. If the repository uses beads for tracking, follow `@references/feature-spec/beads.md`.
10. Present a concise summary plus unresolved questions, unless the user asked to proceed without waiting.
11. If the user asked to proceed without waiting, answer outstanding questions with best judgment and record assumptions in the spec.
12. Simplify where possible (remove redundant phases, merge low-value steps, prefer one strong section over many thin ones).
13. When editing an existing spec, preserve `## Manual Notes` unless the user explicitly asks to change it.
14. Keep in-progress specs under `$DOCS_ROOT/specs/`. When the spec is complete, move it to `$DOCS_ROOT/specs/.archive/` without renaming it.
15. Resolve the current agent session id via `dev.llm-session` and include it in the `## Changelog` entry before handoff.

## Authoring Requirements

- Required sections: `Goal and Scope`, `Context and Constraints`, `Approach and Touchpoints`, `Acceptance Criteria`, `Phases and Dependencies`, `Validation Plan`, `Done Criteria`, `Open Items and Risks`, `Manual Notes`, `Changelog`.
- Optional subsections should be omitted when empty or generic (for example, `Non-obvious Dependencies or Access`, `Important Implementation Notes`, `Unit tests`, `Separate Validation Spec`, `Simplifications and Assumptions`).
- `Acceptance Criteria` is required and feature-level, not per-phase. Use it for observable outcomes and important invariants, not test commands, implementation tasks, or completion/admin items such as "docs updated."
- `Validation Plan` is required. Use it for automated and manual checks that prove the acceptance criteria, and link a separate validation spec when a larger matrix would be redundant here.
- `Done Criteria` is required, but keep it short and process-oriented (for example: implementation complete, validation reviewed, docs/specs updated, rollout or handoff complete where applicable). It may reference acceptance or validation completion, but must not restate the acceptance bullets or validation checklist.
- Break implementation into milestones or phases with explicit dependencies.
- Each milestone must ship a verifiable outcome.
- Risks must include concrete mitigations.
- Prefer concrete touchpoints and decisions over generic `Technology Stack` or `Design Patterns` lists unless those are central to the implementation risk.
