# Flow Doc (End2End) Workflow

## Use When

- Deep debugging where missing one branch can break conclusions
- Audit-grade lifecycle documentation for handoffs or incidents
- Capturing all branches, retries, validation gates, and failures
- Tracing state mutations and external side effects end to end

## Template

- `@references/flow-doc-end2end/template.md`

## Output Location

- `$ROOT_DIR/flows/{flow-name}.md`

## Flow Naming Contract

- Canonical bootstrap flow must be named `bootstrap.md`.
- Canonical runtime invocation flow must be named `runtime_invoke.md`.
- All non-canonical flows must be named `ref.{name-of-flow}.md`.
- `{name-of-flow}` should be concise and kebab-case.

## Authoring Requirements

- Cover full lifecycle boundaries: entrypoints, terminal states, and out-of-scope boundaries.
- Include a complete logic inventory with stable step IDs and source citations.
- Document all conditional branches, retries, and error handling paths.
- Capture state/data mutations, external calls, metrics, and logs where applicable.
- Use TypeScript-like pseudocode and cite every referenced logic source.
- Include a `State Timeline Table` for critical values:
  `value | write step | snapshot step | read step | ordering valid?`.
- Include a required `Config` section that captures user-settable configuration impacting the flow:
  Statsig gates/configs/experiments/layers, environment variables, and other user-controlled runtime flags/inputs.
- If no user-settable configuration applies, explicitly write `None identified`.

## Instructions

1. Review architecture docs and relevant project patterns.
2. Review existing flow docs in `$ROOT_DIR/flows/`.
3. Choose `{flow-name}` using the naming contract:
   - `bootstrap` for initial build/context-establishment lifecycle.
   - `runtime_invoke` for steady-state invocation lifecycle.
   - `ref.{name-of-flow}` for all other flows.
4. Copy `@references/flow-doc-end2end/template.md` to `$ROOT_DIR/flows/{flow-name}.md`.
5. Fill the required `Config` section with user-settable configuration that affects behavior.
6. Build the `State Timeline Table` for critical values before drafting pseudocode.
7. Perform a comprehensive code walk so every lifecycle step is inventoried.
8. Fill in the document based on user instructions, stopping for clarifications when needed.

## Revision Requirements

- Apply `@references/flow-doc/workflow.md` shortcut instructions for `Revise Flow Doc`.
- Confirm lifecycle-complete coverage from entrypoint to all terminal states.
- Confirm `State Timeline Table` coverage for critical values and ensure ordering validity is explicit.
- Ensure the `Config` section is accurate and complete, or explicitly says `None identified`.

## Best Practices

- Inventory first; do not write pseudocode before coverage is known.
- Include every meaningful branch, retry, validation, and error path.
- Ensure each inventory row maps directly to cited source.
- Keep side effects explicit (calls, metrics, logs, mutations).
