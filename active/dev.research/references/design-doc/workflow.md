# Service Design Workflow

## Use When

- Proposing a new service or major system change
- Defining scope, users, and use cases
- Documenting architecture, APIs, data, and reliability expectations
- Capturing security posture, risks, and open questions

## Template

- `@references/design-doc/template.md`

## Output Location

- `$ROOT_DIR/design/{YYYY-MM-DD}-design-{topic}.md`

## Instructions

1. Review existing design docs under `$ROOT_DIR/design/` to align with local conventions.
2. Copy `@references/design-doc/template.md` to `$ROOT_DIR/design/{YYYY-MM-DD}-design-{topic-slug}.md`.
3. Fill in the design doc based on user requirements, stopping for clarifications when needed.

## Required for Implementation Handoff

- Include `Work Packages` with stable IDs (for example: `WP-01`).
- For each package, include In Scope, Out of Scope, Acceptance Criteria, and Dependencies.
- Include both a Mermaid dependency graph and a machine-readable handoff manifest (YAML).
- Keep package decomposition atomic so downstream execution plans can consume it directly.
