# document

Read this file when the request maps to `$tool document <name>`.

## Workflow

Use this path when the user wants the note and guidance but does not want a local install as part of the task.

### 1. Resolve the tool identity from primary sources

- Start with the official upstream repo/docs plus local package-manager metadata.
- Confirm all of these before writing the note:
  - package name
  - executable name
  - recommended install method
  - version to mention or current stable release when the primary source exposes it clearly
  - first useful commands and config knobs for the note
- Prefer primary sources only. Avoid blogspam and copied setup guides.
- Expect package name and executable name to differ.

### 2. Check local state without changing it

- Check whether the executable is already present with `command -v`.
- If it is already installed, capture the executable path and current version for the note.
- Do not install, upgrade, reinstall, or modify PATH as part of the `document` command.
- If the tool is absent locally, continue anyway. The note should still document how to install and start using it.

### 3. Create or update the Dendron note

- Use the `dendron` skill for vault discovery, note placement, and note editing.
- Target note name: `vpkg.<name>`.
- Reuse an existing note if present. Do not create duplicates.
- Use the template in [vpkg-note-template.md](/Users/kevinlin/code/skills/active/tool/references/vpkg-note-template.md).
- Fill the note from official docs plus verified local behavior when available:
  - `Quickstart`: recommended install command, verify command, first required setup
  - `Cheatsheet`: common commands and shortcuts worth remembering
  - `Gotchas`: package-name vs binary-name mismatches, pager/path/config pitfalls, easy mistakes
  - `Config`: tunable knobs with short explanations
  - `Tips`: non-obvious but high-value usage, shortcuts, or features that may require extra configuration
  - `Resources`: official repo, manual, package page
- When the tool is not installed locally, write the note from official sources and leave local verification claims out.
- Keep the note concise and practical. Summarize; do not paste long excerpts from docs.

### 4. Report back cleanly

- Include:
  - documentation status
  - whether the executable was already present locally
  - executable path and version when available
  - note path
  - any optional next-step config or install command the user might want later
