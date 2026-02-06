# Flow Doc (Normal) Workflow

## Use When

- Documenting how a system bootstraps or initializes
- Describing the lifecycle of an API request
- Capturing the execution sequence of a feature
- Creating a fast context-recapture doc for humans and LLMs

## Template

- `@references/flow-doc/template.md`

## Output Location

- `$ROOT_DIR/flows/{YYYY-MM-DD}-{topic}.md`

## Authoring Requirements

- Prefer TypeScript-like pseudocode.
- Cite files where logic occurs.
- Preserve any line ending with `// manual` exactly across updates.

## Instructions

1. Review existing architecture documents and relevant patterns used in the project.
2. Review existing flow docs in `$ROOT_DIR/flows/` for consistency.
3. Copy `@references/flow-doc/template.md` to `$ROOT_DIR/flows/{YYYY-MM-DD}-{topic-slug}.md`.
4. Use kebab-case for the topic slug (for example: `flows/2025-01-15-api-request-lifecycle.md`).
5. Fill in the new flow document based on user instructions, stopping for clarifications when needed.

## Instructions: Revise Flow Doc

1. Read the given flow document.
2. Read all code referenced in the document.
3. Systematically review related code to identify gaps, inaccuracies, and stale sections.
4. Revise the doc so it matches current code while preserving style and structure where possible.
5. If the document is end2end, verify explicit lifecycle-complete inventory coverage across branch, retry, and error paths.
6. Add a `Future Considerations` section with `Open Questions` and `Potential Improvements`.

## Best Practices

- Focus on lifecycle and execution sequence, not only static architecture.
- Link related docs where available.
- Keep one lifecycle/behavior per document.
- Keep pseudocode readable and source-cited.
