# Flow Doc Workflow

## Use When

- Creating a balanced overview of specified code logic.
- Explaining how a startup, request, job, command, UI action, or feature flow works.
- Giving developers enough context to understand the main logic and then dive deeper through code and logs.
- The user asks for any flow-doc intent, including `flow doc`, `flow docs`, `flowdoc`, `call path doc`, or `execution flow doc`.

## Purpose

Flow docs explain how given logic works without becoming a line-by-line code
commentary. Optimize for a developer who needs the flow shape, major phases,
important branches, code pointers, log/metric pointers, and related docs.

## Template

- `./references/flow-doc/template.md`
- Use `$dev.diagram mermaid general-flow` for `## Sequence Diagram`.
- Use `$docy` `ref/execution-trace` for `## Execution Trace`.
- Use `$sudocode` for compact logic summaries inside execution-trace steps.

## Output Location

- `$DOCS_ROOT/flows/{flow-name}.md`

## Flow Naming Contract

- Use concise kebab-case for `{flow-name}`.
- Prefer the feature or behavior name over the implementation class name.
- If the repository already uses `core.*`, `topic.*`, or `ref.*` flow names, keep that convention.

## Authoring Requirements

- Keep the flow question-first and developer-oriented.
- Keep repo-internal markdown links portable and repo-relative.
- Do not use absolute local checkout paths under `$DOCS_ROOT`.
- Include at least one and at most three code pointers in `## Entry Points`.
- Use precise file/function pointers in execution-trace steps.
- Use `## Sequence Diagram` before `## Execution Trace`.
- Use `$dev.diagram mermaid general-flow` to draft or revise the general-flow diagram. The diagram must be a Mermaid `graph TD` general-flow diagram unless revising an existing flow doc whose diagram format the user explicitly asks to preserve.
- Identify important behavior-changing branches while reading source. Add important branches to the general-flow diagram, including meaningful fallback, retry, permission-denied, validation-failure, timeout, disabled-gate, and terminal-error outcomes when they materially change the flow.
- Do not force branch detail into the execution trace. The execution trace should follow the happy path end to end, with branch callouts only when needed to explain the next happy-path handoff.
- Use `$docy` `ref/execution-trace` before writing `## Execution Trace`; keep phases runtime-ordered.
- Use `$sudocode` inside execution-trace steps when summarizing code logic.
- Keep each step concise. Put behavior-changing conditions, state writes, side effects, and external boundaries in the sudocode or nearby notes.
- Fill `## Notes` with quirks, important constraints, important branch details, edge cases, and extra details that do not belong in the happy-path trace.
- Fill `## Observability` with concrete metrics and logs. If none are found, write `None identified`.
- Preserve `## Manual Notes` and its content exactly across edits.

## Instructions

1. Review existing architecture, flow, design, and debugging docs relevant to the target logic.
2. Read the source code for the target flow before drafting. Identify the external trigger, happy-path runtime phases, important branch points, state changes, external calls, and terminal effects.
3. Choose `{flow-name}` and copy `./references/flow-doc/template.md` to `$DOCS_ROOT/flows/{flow-name}.md`.
4. Fill frontmatter:
   - `created`: current date for new docs.
   - `updated`: current date.
   - `last_updated_session`: `{agent}/{session-id}` after resolving the current session id via `$dev.llm-session`.
5. Fill `## Overview` with 1-3 sentences describing what the flow covers, what questions it answers, and why the doc exists.
6. Fill `## Entry Points` with how the flow starts and 1-3 code pointers.
7. Draft `## Sequence Diagram` with `$dev.diagram mermaid general-flow`. Keep it as a Mermaid general-flow diagram, not a full call graph. Show the happy path plus important branches that materially change behavior; omit trivial guards and implementation-only conditionals.
8. Load `$docy` `ref/execution-trace` and draft `## Execution Trace` as happy-path, runtime-ordered phases.
9. For each phase:
   - Use a short phase name.
   - Add 1-2 sentences describing the phase.
   - Add only the steps needed to understand the logic.
   - Include concrete file/function pointers.
   - Add compact `$sudocode` for behavior-critical code.
10. Fill `## Notes` with quirks, important branch details, additional detail, and important behavior not covered by the happy-path trace.
11. Fill `## Observability` with metrics and logs, or `None identified`.
12. Fill `## Related docs` with related flow docs, architecture docs, specs, design docs, PR docs, and debugging notes.
13. Keep `## Manual Notes` unchanged.
14. Add a `## Changelog` entry with the current date and resolved session id.
15. Scan markdown links and convert repo-internal absolute local paths to repo-relative targets.
16. Run validator from this skill root:
    - `python3 ./scripts/validate_flow_doc.py --kind flow-doc --doc "$DOCS_ROOT/flows/{flow-name}.md"`
17. Resolve validator errors before handoff.

## Revision Instructions

1. Read the existing flow doc and preserve useful structure and detail.
2. Preserve `## Manual Notes` exactly.
3. Prefer targeted additive edits unless the existing doc is structurally wrong.
4. Re-read current source for any code paths being changed or corrected.
5. Update `updated`, `last_updated_session`, and `## Changelog`.
6. Re-run the flow-doc validator before handoff.

## Pre-Handoff Checklist

- [ ] `## Overview` states what the flow covers and why it exists.
- [ ] `## Entry Points` includes 1-3 code pointers.
- [ ] `## Sequence Diagram` appears before `## Execution Trace`, uses Mermaid general-flow syntax, and includes important behavior-changing branches when they exist.
- [ ] `## Execution Trace` is phase-based, runtime-ordered, and focused on the happy path.
- [ ] Execution-trace steps include concrete file/function pointers.
- [ ] Sudocode uses exact source identifiers for behavior-critical logic.
- [ ] `## Notes` captures quirks or explicitly says `None identified`.
- [ ] `## Observability` includes metrics/logs or `None identified`.
- [ ] Repo-internal markdown links are repo-relative.
- [ ] `## Manual Notes` was preserved.
- [ ] `validate_flow_doc.py --kind flow-doc` passes.
