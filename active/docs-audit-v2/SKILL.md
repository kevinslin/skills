---
name: docs-audit-v2
description: Audit documentation rewrites with JSON-first, block-scoped, line-level coverage mappings. Use for moved-section checklists, preservation proofs, migration maps, or line-by-line coverage reviews of Markdown/MDX docs.
dependencies: []
---

# docs-audit-v2

Use this skill to prove that a documentation rewrite preserved, moved,
paraphrased, generated, or intentionally removed source content. It is for docs
coverage audits, not repository code-quality audits.

## Use When

- The user asks for a docs audit, preservation proof, migration map,
  moved-section checklist, or line-by-line coverage review.
- A rewrite removes, shortens, reorganizes, or splits substantial Markdown/MDX
  sections.
- Content moves across multiple destination docs or generated docs.
- Source docs contain behavior-sensitive facts: commands, config, defaults,
  lifecycle behavior, permissions, safety rules, or troubleshooting steps.

For general codebase quality audits, use the regular `audit` skill instead.

## Core Workflow

1. Resolve the pre-rewrite source ref and the explicit source docs.
2. Choose explicit destination docs from the refactor plan; do not audit every
   changed Markdown file by default.
3. Scaffold or refresh the JSON audit inventory with the CLI.
4. Author mapping patches with one mapping object per source block and one
   `mapping[]` row per material source line.
5. Reindex destination docs after edits, then hydrate and validate the JSON.
6. Fix every validation error. Accept warnings only when they are not
   preservation gaps and have reviewer-facing justification.
7. Render the Markdown report and self-contained HTML viewer from the validated
   JSON.
8. Handoff the JSON artifacts, rendered report/viewer, unresolved or accepted
   warnings, and exact validation output.

## References

Load only the reference needed for the current step:

- `./references/workflow.md`: command sequence, artifacts, validation loop, and
  handoff checklist.
- `./references/schema.md`: JSON schema, stable IDs, enums, destination entry
  shapes, validation findings, and invariants.
- `./references/refactor-integration.md`: contract for docs refactor skills
  that author mappings while rewriting docs.
- `./references/viewer.md`: Markdown report and HTML viewer rendering contract.

## CLI Contract

The first-version CLI commands are:

- `scaffold`
- `add-dest`
- `reindex-dest`
- `map`
- `hydrate`
- `validate`
- `render`

The canonical artifact is JSON. Markdown reports and HTML viewers are render
outputs and must not be parsed back into JSON as source of truth.

## Mapping Rules

- Use one stable mapping ID per source block.
- Account for every non-formatting source line with a line-level `mapping[]`
  row.
- Use `justification` as the canonical explanation field. Do not invent
  `notes` or `detailed_reason` aliases.
- Broad block fallback is not final proof for a material `covered` line.
- Destination entries with stale metadata cannot satisfy final coverage.
- Accepted warnings never hide errors and must not be used for unmapped source
  material, stale destinations, missing justifications, or line mappings without
  exact destination proof.

## Bundled Files

Reference bundled files relative to this `SKILL.md` directory:

- `./references/...`
- `./assets/audit-viewer.html`
- `./scripts/...`

Do not use machine-local absolute paths in skill instructions or generated
audit docs.
