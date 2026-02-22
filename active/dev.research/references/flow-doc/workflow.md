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

- Canonical bootstrap flow must be named `core.bootstrap.md`.
- Canonical runtime invocation flow must be named `core.runtime_invoke.md`.
- All non-canonical flows must be named `ref.{name-of-flow}.md`.
- `{name-of-flow}` should be concise and kebab-case.

## Authoring Requirements

- Flow doc are question-first and debugging-oriented. Optimize for tracability
- Use $sudocode with file annotations to describe code logic
- Cite files where logic occurs.
- Preserve any line ending with `// manual` exactly across updates.
- Use a required `State, config, and gates` section (not a standalone `Config` section only).
- In `State, config, and gates`, capture user-settable configuration impacting the flow:
  Statsig gates/configs/experiments/layers, environment variables, and other user-controlled runtime flags/inputs.
- If no user-settable configuration applies, explicitly write `None identified`.
- `Sequence diagram` is required 
- `$sudocode` is required
- $usdocode should be embedded under the corresponding `Call path` phases .
- The `Call path` section must be phase-based and must include:
  - trigger / entry condition
  - concrete entrypoints
  - ordered call path
  - state transitions / outputs
  - branch points / guards
  - external boundaries (RPC/HTTP/service calls) where relevant

## Instructions

1. Review existing architecture documents and relevant patterns used in the project.
2. Review existing flow docs in `$ROOT_DIR/flows/` for consistency.
3. Choose `{flow-name}` using the naming contract:
   - `bootstrap` for initial build/context-establishment lifecycle.
   - `runtime_invoke` for steady-state invocation lifecycle.
   - `ref.{name-of-flow}` for all other flows.
4. Copy `@references/flow-doc/template.md` to `$ROOT_DIR/flows/{flow-name}.md`.
5. Fill the required `Purpose / Question Answered` and `Entry points` sections first so scope is explicit.
6. Draft the `Call path` as phases. For each phase, capture trigger, entrypoints, ordered call path, state transitions, branch points, and external boundaries.
7. Add inlined sudocode under each relevant `Call path` phase (`#### Sudocode (...)`) with source file annotations.
8. Fill the required `State, config, and gates` section, including Statsig/env/user-settable inputs. If none apply, write `None identified`.
9. Add a required `Sequence diagram` (prefer Mermaid) that matches the documented `Call path`.
10. Fill in `Observability` and `Related docs`.
11. Fill in the new flow document based on user instructions, stopping for clarifications when needed.

## Instructions: Revise Flow Doc

1. Read the given flow document.
2. Read all code referenced in the document.
3. Systematically review related code to identify gaps, inaccuracies, and stale sections.
4. Revise the doc so it matches current code while preserving style, structure, and existing useful detail where possible.
5. Prefer additive edits over broad rewrites; remove or reshape major sections only when they are inaccurate or explicitly requested.
6. Keep `## Manual Notes` and its content unchanged across revisions.
7. If the request includes specific questions, add focused clarifications that answer each question directly with file citations.
8. If the document is end2end, verify explicit lifecycle-complete inventory coverage across branch, retry, and error paths.
9. For context/state-sensitive behavior, make ordering validity explicit in the `Call path` and `State, config, and gates` sections (table optional, not required).
10. Ensure the `State, config, and gates` section is accurate and complete, or explicitly says `None identified` for user-settable configuration.
11. If updating to the new format, inline sudocode under `Call path` phases instead of a standalone sudocode section.
12. If migrating structure is not explicitly requested, prefer targeted/additive updates over format rewrites.
13. Perform a final scope check to ensure the diff is minimal and aligned with the user request.

## Best Practices

- Focus on lifecycle and execution sequence, not only static architecture.
- Link related docs where available.
- Keep one lifecycle/behavior per document.
- Keep sudocode readable and source-cited.
- Keep call-path phases and sudocode aligned (same phase boundaries and branch labels).
- End your response with the exact flow-doc path (for discoverability).
