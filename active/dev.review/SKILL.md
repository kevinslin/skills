---
name: dev.review
description: Multi-type review skill for code, design docs/specs, architecture, UX, and other reviews. Use when the user asks for a review or critique (code review, design doc review, spec review, PR review). Select the appropriate review persona from references/persona-[review-type].md.
---

# dev.review

## Workflow

1. Identify the review type from the user's request and artifact.
   - Examples: code, design-doc, spec, architecture, ux.
   - If ambiguous, ask one clarifying question before reviewing.
2. Load the matching persona from `references/persona-[review-type].md`.
   - If the persona file does not exist, ask the user for the prompt to add and pause the review.
3. Apply the persona to the material and produce the review.

## Output

- Lead with findings ordered by severity (blocker/major/minor) or by impact if severity is unclear.
- Prefer concrete, actionable feedback over generic commentary.
- Call out assumptions, risks, and unclear ownership/abstractions.
- Propose simplifications when possible.
- Keep the review concise; avoid restating large sections of the input.

## Personas

- `references/persona-design-doc.md` for design doc review.
- `references/persona-code.md` for code review.
