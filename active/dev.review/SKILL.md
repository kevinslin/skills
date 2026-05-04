---
name: dev.review
description: Review code, specs, architecture, UX, or design docs.
dependencies: [specy]
---

# dev.review

## Workflow

1. Identify the review type from the user's request and artifact.
   - Examples: code, design-doc, spec, architecture, ux, integrator, deslop.
   - If ambiguous, ask one clarifying question before reviewing.
2. Load the matching workflow from `./references/workflow-[review-type].md`.
   - If the workflow file does not exist, ask the user for the prompt to add and pause the review.
   - For `integrator`, default input artifacts are outputs from `ag-learn` and adjacent retrospectives.
   - For code reviews that require flow docs, use the sibling dependency at `../specy/SKILL.md`.
3. Apply the workflow to the material and produce the review.

## Output

- Lead with findings ordered by severity (blocker/major/minor) or by impact if severity is unclear.
- Prefer concrete, actionable feedback over generic commentary.
- Call out assumptions, risks, and unclear ownership/abstractions.
- Propose simplifications when possible.
- Keep the review concise; avoid restating large sections of the input.

## Workflows

- `./references/workflow-code.md` for code review.
- `./references/workflow-design-doc.md` for design doc review.
- `./references/workflow-spec.md` for product, implementation, or test spec review.
- `./references/workflow-architecture.md` for architecture and system-boundary review.
- `./references/workflow-ux.md` for UX review.
- `./references/workflow-integrator.md` for integrating learnings into skill/code/project changes.
- `./references/workflow-deslop.md` for anti-slop code review focused on excess complexity, patch size, and unnecessary helper extraction.
