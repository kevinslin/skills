# document

Read this file when the request maps to `$tool document <name>`.

## Workflow

Use this path when the user wants the note and guidance but does not want a local install as part of the task.

### 1. Resolve the tool identity from primary sources

- Always search the internet for the tool first. Do not rely on internal knowledge alone.
- Start by finding the authoritative sources: prefer the official GitHub repo and official docs/manual, then use local package-manager metadata as supporting context.
- Confirm all of these before writing the note:
  - package name
  - executable name
  - recommended install method
  - version to mention or current stable release when the primary source exposes it clearly
  - first useful commands and config knobs for the note
- Prefer primary sources only. Avoid blogspam and copied setup guides.
- Keep the authoritative links you find handy. You will add them to the root note `Resources` section later.
- Expect package name and executable name to differ.

### 2. Check local state without changing it

- Check whether the executable is already present with `command -v`.
- If it is already installed, capture the executable path and current version for the note.
- Do not install, upgrade, reinstall, or modify PATH as part of the `document` command.
- If the tool is absent locally, continue anyway. The note should still document how to install and start using it.

### 3. Create or update the Dendron note set

- Use the `dendron` skill for vault discovery, note placement, and note editing.
- Use the schema in [tool.schema.yaml](/Users/kevinlin/code/skills/active/tool/references/tool.schema.yaml).
- Resolve the schema placeholders with the chosen tool name.
- Reuse existing notes if present. Do not create duplicates.
- Create or update every required note declared by the schema. The default required note set is:
  - `vpkg.<name>` from [root.md.template](/Users/kevinlin/code/skills/active/tool/references/root.md.template)
  - `vpkg.<name>.concepts` from [concepts.md.template](/Users/kevinlin/code/skills/active/tool/references/concepts.md.template)
- Create `vpkg.<name>.t.<topic>` only as needed from [topic.md.template](/Users/kevinlin/code/skills/active/tool/references/topic.md.template).
- `t` stands for topic. Topics represent large domain-specific areas of package functionality.
- Only add topic notes when the user is talking about that domain or when the current task would clearly benefit from splitting it out.
- Create `vpkg.<name>.ref.<reference>` only as needed. These notes are intentionally freeform and do not use a fixed template.
- `ref` stands for reference. References point to self-contained functionality of the package rather than a broad domain.
- Only add reference notes when the user is talking about that functionality or when the current task would clearly benefit from a dedicated pointer note.
- Every created or updated note must include frontmatter with:
  - `title`
  - `last_refreshed`: current local timestamp in `YYYY-MM-DD HH:MM`
  - `last_refreshed_by`: `<agent_name>/<session id>`, for example `codex/<session id>`
- Refresh `last_refreshed` and `last_refreshed_by` whenever you update an existing note.
- If a root note already exists, read its `Resources` section before expanding the tool further. Reuse those authoritative links when they are still correct, and refresh them if they are stale or incomplete.
- Fill `vpkg.<name>` from official docs plus verified local behavior when available:
  - `Quickstart`: recommended install command, verify command, first required setup
  - `Cheatsheet`: common commands and shortcuts worth remembering
  - `Gotchas`: package-name vs binary-name mismatches, pager/path/config pitfalls, easy mistakes
  - `Config`: tunable knobs with short explanations
  - `Tips`: non-obvious but high-value usage, shortcuts, or features that may require extra configuration
  - `Resources`: authoritative links first, preferably official GitHub repo and official docs/manual, plus the package page when useful
- Fill `vpkg.<name>.concepts` with the core mental model, primary nouns, and the 3-7 concepts a first serious user needs to understand.
- Keep the concepts note terse. Do not invent filler headings just to satisfy the template.
- Fill `vpkg.<name>.t.<topic>` with only the sections that are relevant for that domain. Omit unused sections instead of leaving placeholders behind.
- Fill `vpkg.<name>.ref.<reference>` with the required frontmatter plus only the fields and headings that help the current discussion. Useful fields include `Purpose`, `Inputs`, `Outputs`, `Commands`, `Configuration`, `Examples`, `Gotchas`, and `Related`, but only include what the referenced functionality actually needs.
- When expanding a topic or reference note, check the root note `Resources` first before doing any additional sourcing.
- Keep `ref` notes narrow and pointer-like. They should make it easy to jump into one specific capability without turning into a second root note.
- When the tool is not installed locally, write the note from official sources and leave local verification claims out.
- Keep every note concise and practical. Summarize; do not paste long excerpts from docs.

### 4. Report back cleanly

- Include:
  - documentation status
  - whether the executable was already present locally
  - executable path and version when available
  - root note path
  - any additional note paths created or updated from the schema
  - any optional next-step config or install command the user might want later
