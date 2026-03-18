# FAQ Spec Workflow

## Use When

- The user asks to add a FAQ entry to an existing research artifact
- The user explicitly mentions `faq spec`
- The user wants a follow-up question captured inside the current research doc instead of as a standalone FAQ file

## Template

- `@references/faq-spec/template.md`

## Output Location

- The most recent research document type mentioned in the conversation (update in place)

## Instructions

1. Determine the target document by scanning the current conversation from newest to oldest.
2. Use the most recent research document type mentioned in the conversation as the target type.
3. Within that type, prefer the most recent explicit document path mentioned in the conversation.
4. If the conversation mentions the type but not a concrete target file, use the document currently under discussion for that type. If no target can be resolved, ask the user which document to update.
5. Capture the new question and gather supporting code references.
6. Read the target document and preserve its structure.
7. If the document already has `## FAQ`, append the new entry under that section.
8. If the document does not have `## FAQ`, insert `## FAQ` immediately before `## Manual Notes`.
9. Use `@references/faq-spec/template.md` as the insertion snippet, then refine the answer so it matches the target document's tone and level of detail.
10. Keep `## Manual Notes` and its content unchanged.
11. Append a new `## Changelog` entry describing the FAQ-spec update and include the current agent session id resolved via `dev.llm-session`.

## Authoring Requirements

- Prefer concise answers that point back to the target document's main call path, state, or observability sections where relevant.
- Cite concrete source files when the answer depends on code behavior.
- Do not create a new standalone file for this doc type.
