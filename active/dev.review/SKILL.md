---
name: dev.review
description: Review code, specs, architecture, UX, and design docs. Use when the user asks for a review or critique.
dependencies: [specy]
---

# dev.review

## Workflow

1. Identify the review type from the user's request and artifact.
   - Examples: code, design-doc, spec, architecture, ux, integrator.
   - If ambiguous, ask one clarifying question before reviewing.
2. Load the matching persona from `./references/persona-[review-type].md`.
   - If the persona file does not exist, ask the user for the prompt to add and pause the review.
   - For `integrator`, default input artifacts are outputs from `ag-learn` and adjacent retrospectives.
   - For code reviews that require flow docs, use the sibling dependency at `../specy/SKILL.md`.
3. Apply the persona to the material and produce the review.

## Output

- Lead with findings ordered by severity (blocker/major/minor) or by impact if severity is unclear.
- Prefer concrete, actionable feedback over generic commentary.
- Call out assumptions, risks, and unclear ownership/abstractions.
- Propose simplifications when possible.
- Keep the review concise; avoid restating large sections of the input.

## Personas

- `./references/persona-code.md` for code review.
- `./references/persona-design-doc.md` for design doc review.
- `./references/persona-spec.md` for product, implementation, or test spec review.
- `./references/persona-architecture.md` for architecture and system-boundary review.
- `./references/persona-ux.md` for UX review.
- `./references/persona-integrator.md` for integrating learnings into skill/code/project changes.
