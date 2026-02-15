# Flow Doc (Normal) Workflow

## Use When

- Documenting how a system bootstraps or initializes
- Describing the lifecycle of an API request
- Capturing the execution sequence of a feature
- Creating a fast context-recapture doc for humans and LLMs

## Template

- `@references/flow-doc/template.md`

## Output Location

- `$ROOT_DIR/flows/{flow-name}.md`

## Flow Naming Contract

- Canonical bootstrap flow must be named `bootstrap.md`.
- Canonical runtime invocation flow must be named `runtime_invoke.md`.
- All non-canonical flows must be named `ref.{name-of-flow}.md`.
- `{name-of-flow}` should be concise and kebab-case.

## Authoring Requirements

- Prefer TypeScript-like pseudocode.
- Cite files where logic occurs.
- Preserve any line ending with `// manual` exactly across updates.
- For context/state-sensitive behavior, include a `State Timeline Table` with:
  `value | write step | snapshot step | read step | ordering valid?`.
- Include a required `Config` section that captures user-settable configuration impacting the flow:
  Statsig gates/configs/experiments/layers, environment variables, and other user-controlled runtime flags/inputs.
- If no user-settable configuration applies, explicitly write `None identified`.

## Instructions

1. Review existing architecture documents and relevant patterns used in the project.
2. Review existing flow docs in `$ROOT_DIR/flows/` for consistency.
3. Choose `{flow-name}` using the naming contract:
   - `bootstrap` for initial build/context-establishment lifecycle.
   - `runtime_invoke` for steady-state invocation lifecycle.
   - `ref.{name-of-flow}` for all other flows.
4. Copy `@references/flow-doc/template.md` to `$ROOT_DIR/flows/{flow-name}.md`.
5. Fill the required `Config` section with user-settable configuration that affects behavior.
6. When behavior depends on propagated state/context, add a `State Timeline Table` before drafting pseudocode.
7. Fill in the new flow document based on user instructions, stopping for clarifications when needed.

## Instructions: Revise Flow Doc

1. Read the given flow document.
2. Read all code referenced in the document.
3. Systematically review related code to identify gaps, inaccuracies, and stale sections.
4. Revise the doc so it matches current code while preserving style, structure, and existing useful detail where possible.
5. Prefer additive edits over broad rewrites; remove or reshape major sections only when they are inaccurate or explicitly requested.
6. Keep `## Manual Notes` and its content unchanged across revisions.
7. If the request includes specific questions, add focused clarifications that answer each question directly with file citations.
8. If the document is end2end, verify explicit lifecycle-complete inventory coverage across branch, retry, and error paths.
9. For context/state-sensitive behavior, ensure the doc has a `State Timeline Table` and that ordering validity is explicit.
10. Ensure the `Config` section is accurate and complete, or explicitly says `None identified`.
11. Add a `Future Considerations` section with `Open Questions` and `Potential Improvements`.
12. Perform a final scope check to ensure the diff is minimal and aligned with the user request.

## Best Practices

- Focus on lifecycle and execution sequence, not only static architecture.
- Link related docs where available.
- Keep one lifecycle/behavior per document.
- Keep pseudocode readable and source-cited.
