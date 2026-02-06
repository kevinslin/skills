# Flow Doc (End2End) Workflow

## Use When

- Deep debugging where missing one branch can break conclusions
- Audit-grade lifecycle documentation for handoffs or incidents
- Capturing all branches, retries, validation gates, and failures
- Tracing state mutations and external side effects end to end

## Template

- `@references/flow-doc-end2end/template.md`

## Output Location

- `$ROOT_DIR/flows/{YYYY-MM-DD}-end2end-{topic}.md`

## Authoring Requirements

- Cover full lifecycle boundaries: entrypoints, terminal states, and out-of-scope boundaries.
- Include a complete logic inventory with stable step IDs and source citations.
- Document all conditional branches, retries, and error handling paths.
- Capture state/data mutations, external calls, metrics, and logs where applicable.
- Use TypeScript-like pseudocode and cite every referenced logic source.

## Shortcut

1. Review architecture docs and relevant project patterns.
2. Review existing flow docs in `$ROOT_DIR/flows/`.
3. Copy `@references/flow-doc-end2end/template.md` to `$ROOT_DIR/flows/{YYYY-MM-DD}-end2end-{topic-slug}.md`.
4. Use kebab-case for the topic slug (for example: `flows/2025-01-15-end2end-api-request-lifecycle.md`).
5. Perform a comprehensive code walk so every lifecycle step is inventoried.
6. Fill in the document based on user instructions, stopping for clarifications when needed.

## Revision Requirements

- Apply `@references/flow-doc/workflow.md` shortcut instructions for `Revise Flow Doc`.
- Confirm lifecycle-complete coverage from entrypoint to all terminal states.

## Best Practices

- Inventory first; do not write pseudocode before coverage is known.
- Include every meaningful branch, retry, validation, and error path.
- Ensure each inventory row maps directly to cited source.
- Keep side effects explicit (calls, metrics, logs, mutations).
