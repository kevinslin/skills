# Flow Doc (Normal) Workflow

## Use When

- Documenting how a system bootstraps or initializes
- Describing the lifecycle of an API request
- Capturing the execution sequence of a feature
- Creating a fast context-recapture doc for humans and LLMs

## Template

- `@references/flow-doc/template.md`

## Output Location

- `$DOCS_ROOT/flows/{flow-name}.md`

## Flow Naming Contract

- Core flows:
  - `core.init.md`: how the system gets started.
  - `core.exit.md`: how the system does cleanup.
- Topic flows cover major functionality for a given domain (for example orchestration):
  - `topic.{name}.md`
- Ref flows cover anything that is not `core` or `topic` (for example how to kickstart a new task):
  - `ref.{name}.md`
- `{name}` should be concise and kebab-case.

## Authoring Requirements

- Flow docs are question-first and debugging-oriented. Optimize for traceability.
- Use $sudocode with file annotations to describe code logic
- Cite precise files and line numbers where logic occurs.
- Format every sudocode source annotation as `path/to/file.ts#L28` or a tight range like `path/to/file.ts#L28-L42`.
- Preserve any line ending with `// manual` exactly across updates.
- Use a required `State` section.
- Use the compact `State` structure:
  `Core state / ordering risks`, `Runtime controls`, and `Notable gates`.
- In `Runtime controls`, capture user-settable configuration impacting the flow:
  Statsig gates/configs/experiments/layers, environment variables, and other user-controlled runtime flags/inputs.
- If no user-settable configuration applies, explicitly write `None identified` under `Runtime controls`.
- `Sequence diagram` is required.
- Use `$dev.diagram` to draft or revise the `Sequence diagram`.
- Prefer ASCII box diagrams for flow docs unless preserving an existing diagram format or the user explicitly asks for Mermaid.
- `$sudocode` is required
- Each `Ordered call path` entry should be a numbered step followed immediately by the relevant fenced sudocode block.
- Keep ordered-call-path prose terse; put detailed logic, branch callouts, and side notes in the sudocode and sudocode comments.
- The `Call path` section must be phase-based and must include:
  - trigger / entry condition
  - concrete entrypoints
  - ordered call path
  - state transitions / outputs
  - branch points / guards
  - external boundaries (RPC/HTTP/service calls) where relevant

## Instructions

1. Review existing architecture documents and relevant patterns used in the project.
2. Review existing flow docs in `$DOCS_ROOT/flows/` for consistency.
3. Choose `{flow-name}` using the naming contract:
   - `core.init` for how the system gets started.
   - `core.exit` for how the system does cleanup.
   - `topic.{name}` for major functionality within a specific domain.
   - `ref.{name}` for any supporting flow that is not `core` or `topic`.
4. Copy `@references/flow-doc/template.md` to `$DOCS_ROOT/flows/{flow-name}.md`.
5. Fill the required `Purpose` and `Entry points` sections first so scope is explicit.
6. Draft the `Call path` as phases. For each phase, capture trigger, entrypoints, ordered call path, state transitions, branch points, and external boundaries.
7. Under each phase's `Ordered call path`, use numbered steps with terse descriptions. Follow each numbered step immediately with a fenced sudocode block that includes source file annotations with line numbers.
8. Keep detailed logic, guard callouts, and external-call notes in the sudocode and sudocode comments instead of verbose step prose.
9. Fill the required `State` section using the compact structure: summarize key state/ordering risks, list runtime controls in one table, and call out notable gates. If no runtime controls apply, write `None identified`.
10. Use `$dev.diagram` to add or revise the required `Sequence diagram`. Prefer an ASCII box diagram unless preserving an existing diagram format or the user explicitly asks for Mermaid.
11. Fill in `Observability` and `Related docs`.
12. Run validator from this skill root:
    - `python3 scripts/validate_flow_doc.py --kind normal --doc "$DOCS_ROOT/flows/{flow-name}.md"`
13. Fill in the new flow document based on user instructions, stopping for clarifications when needed.

## Instructions: Revise Flow Doc

1. Read the given flow document.
2. Read all code referenced in the document.
3. Systematically review related code to identify gaps, inaccuracies, and stale sections.
4. Revise the doc so it matches current code while preserving style, structure, and existing useful detail where possible.
5. Prefer additive edits over broad rewrites; remove or reshape major sections only when they are inaccurate or explicitly requested.
6. Keep `## Manual Notes` and its content unchanged across revisions.
7. If the request includes specific questions, add focused clarifications that answer each question directly with file citations.
8. For context/state-sensitive behavior, make ordering validity explicit in the `Call path` and `State` sections.
9. Ensure the `State` section is accurate and complete, or explicitly says `None identified` under `Runtime controls` when no user-settable configuration applies.
10. If updating to the new format, move per-phase `#### Sudocode (...)` content into the matching numbered `Ordered call path` entries. If no format migration was requested, preserving legacy separate sudocode subsections is acceptable.
11. If migrating structure is not explicitly requested, prefer targeted/additive updates over format rewrites.
12. Run validator from this skill root:
    - `python3 scripts/validate_flow_doc.py --kind normal --doc "<path-to-flow-doc>"`
13. Perform a final scope check to ensure the diff is minimal and aligned with the user request.

## Pre-Handoff Checklist (Required)

- [ ] `## Call path` exists and is phase-based.
- [ ] Each call-path phase includes numbered `Ordered call path` steps with embedded fenced sudocode blocks, or intentionally preserved legacy `#### Sudocode (...)` subsections when migration was not requested.
- [ ] Ordered-call-path sudocode includes source annotations with line numbers and reflects runtime branch ordering.
- [ ] `## State` and `## Sequence diagram` are present.
- [ ] `validate_flow_doc.py` passes with no errors.

## Best Practices

- Focus on lifecycle and execution sequence, not only static architecture.
- Link related docs where available.
- Keep one lifecycle/behavior per document.
- Keep sudocode readable and source-cited with tight line-numbered annotations.
- Keep ordered-call-path descriptions terse; put nuance in sudocode/comments.
- Keep call-path phases and ordered-step sudocode aligned (same phase boundaries and branch labels).
- End your response with the exact flow-doc path (for discoverability).
