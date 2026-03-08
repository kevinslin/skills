# Architecture Doc Workflow

## Use When

- Creating or updating a system architecture doc
- Documenting service boundaries, major components, and interface contracts
- Capturing key design decisions and operational constraints
- Producing an architecture artifact for onboarding and implementation alignment

## Template

- `@references/architecture/template.md`

## Output Location

- `$DOCS_ROOT/architecture/{YYYY-MM-DD}-architecture-{system}.md`

## Instructions

1. Review existing docs under `$DOCS_ROOT/architecture/` to align with local conventions.
2. Copy `@references/architecture/template.md` to `$DOCS_ROOT/ARCHITECTURE.md`.
3. Fill in the architecture doc based on user requirements and source-backed repository context.
4. Include at least one high-level system diagram (Mermaid or ASCII) and map components to concrete code or service boundaries.
5. Stop for clarification when ownership, boundaries, or critical interfaces are ambiguous.

## Required for Implementation Handoff

- Include explicit In Scope and Out of Scope sections.
- Document key components with responsibilities and interface contracts.
- Include a diagram plus a short narrative of primary request/data flows.
- Call out major risks, tradeoffs, and open questions.
