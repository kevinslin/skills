# Feature Spec Workflow

## Use When

- The task requires detailed implementation planning with persistent documentation.
- Architecture or design decisions should be documented before coding.
- Work spans multiple milestones, dependencies, or external integrations.
- The user explicitly asks for an execution plan, project plan, or feature spec.

## Template

- `./references/feature-spec/template.md`

## Output Location

- `$DOCS_ROOT/specs/{NN}-{title-in-kebab-case}.md`

## Instructions

1. Review related docs under `$DOCS_ROOT/specs/`, archived specs under `$DOCS_ROOT/specs/.archive/`, and `$DOCS_ROOT/flows/` to align naming and known behavior.
2. Choose the next feature-spec filename with a monotonic two-digit integer prefix: scan `$DOCS_ROOT/specs/` and `$DOCS_ROOT/specs/.archive/` for filenames matching `[0-9][0-9]-*.md`, choose `max(existing prefix)+1`, and start at `01` when none exist. Do not reuse gaps left by archived, deleted, or renamed specs.
3. Choose a title slug that stays within the `{NN}-{topic}.md` filename format and includes a qualifier when needed to avoid collisions with sibling specs.
4. Copy `./references/feature-spec/template.md` to the output location.
5. Fill the required sections with concrete, source-backed details from the repository and current task context. Omit optional subsections when they would only add boilerplate.
6. Use `./references/feature-spec/effective-planning.md` for planning quality standards.
7. Include a concrete `## Context` section with project-root-relative markdown links and a short explanation of what each item is for, so the agent can decide what to read based on need instead of following a blind pre-read checklist.
8. If the spec changes data/API/CLI/config/migration output, fill `Existing Contract Snapshot` before proposing new types or output fields. If no existing contract exists, state what was checked and why the new surface is needed.
9. If behavior depends on multiple states or source facts, fill `Target Decision Table` before implementation phases. Use it to separate raw input facts from final observable outputs.
10. If the spec adds fields, types, statuses, reasons, or config, fill `Minimal Model Check`. Keep a new field/type only when it has a named consumer or a clear persistence/interoperability reason.
11. Record resolved ambiguities and explicit decisions in the spec as they are discovered; do not leave important pivots buried in chat history.
12. Include explicit acceptance criteria, validation plan, and done criteria. Acceptance criteria answer "what must be true," validation answers "how it is proven," and done criteria answer "what must be complete before handoff." If a dedicated validation spec is created, link it instead of duplicating a large matrix in the feature spec.
13. If the repository uses beads for tracking, follow `./references/feature-spec/beads.md`.
14. Present a concise summary plus unresolved questions, unless the user asked to proceed without waiting.
15. If the user asked to proceed without waiting, answer outstanding questions with best judgment and record assumptions in the spec.
16. Simplify where possible: remove redundant phases, prefer existing contracts and seams, avoid storing derived values without consumers, and use one strong section over many thin ones.
17. When editing an existing spec, preserve `## Manual Notes` unless the user explicitly asks to change it.
18. Keep in-progress specs under `$DOCS_ROOT/specs/`. When the spec is complete, move it to `$DOCS_ROOT/specs/.archive/` without renaming it.
19. Resolve the current agent session id via `dev.llm-session` and include it in the `## Changelog` entry before handoff.

## Authoring Requirements

- Required sections: `Goal and Scope`, `Context`, `Approach and Touchpoints`, `Acceptance Criteria`, `Phases and Dependencies`, `Validation Plan`, `Done Criteria`, `Open Items and Risks`, `Manual Notes`, `Changelog`.
- Optional subsections should be omitted when empty or generic (for example, `Non-obvious Dependencies or Access`, `Important Implementation Notes`, `Unit tests`, `Separate Validation Spec`, `Simplifications and Assumptions`).
- `Existing Contract Snapshot`, `Target Decision Table`, and `Minimal Model Check` are optional for simple specs but required when their trigger applies. Keep them concise; one small table is better than a broad flow doc when only the output contract is at risk.
- Create or link a separate flow doc only when ordering, state propagation, cache/snapshot boundaries, or cross-component handoff is central to correctness.
- Use project-root-relative links in spec bodies. Do not use absolute filesystem paths in feature-spec links or citations.
- `Acceptance Criteria` is required and feature-level, not per-phase. Use it for observable outcomes and important invariants, not test commands, implementation tasks, or completion/admin items such as "docs updated."
- `Validation Plan` is required. Use it for automated and manual checks that prove the acceptance criteria, and link a separate validation spec when a larger matrix would be redundant here.
- `Done Criteria` is required, but keep it short and process-oriented (for example: implementation complete, validation reviewed, docs/specs updated, rollout or handoff complete where applicable). It may reference acceptance or validation completion, but must not restate the acceptance bullets or validation checklist.
- Break implementation into milestones or phases with explicit dependencies.
- Each milestone must ship a verifiable outcome.
- Risks must include concrete mitigations.
- Prefer concrete touchpoints and decisions over generic `Technology Stack` or `Design Patterns` lists unless those are central to the implementation risk.
