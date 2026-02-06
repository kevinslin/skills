# FAQ Workflow

## Use When

- The user asks to save current conversation context as a FAQ
- The user explicitly mentions `@faq` (for example: `@faq: how does X work`)

## Template

- `@references/faq-doc/template.md`

## Output Location

- `$ROOT_DIR/faq/{YYYY-MM-DD}-{topic}.md`

## Instructions

1. Capture the question being asked and gather supporting code references.
2. Copy `@references/faq-doc/template.md` to `$ROOT_DIR/faq/{YYYY-MM-DD}-{topic-slug}.md`.
3. Write the answer with citations, then refine for concise, follow-up-friendly clarity.

## Authoring Requirements

- Prefer TypeScript-like pseudocode when describing logic.
- Cite files where logic occurs.
