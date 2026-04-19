# document

Read this file when the request maps to `$tool document <prefix> <name>`.

## Workflow

Use this path when the user wants the note and guidance but does not want a local install as part of the task.

### 1. Resolve the tool identity from primary sources

- Require the user to choose the root prefix up front. The only valid prefixes are `vpkg` and `pkg`.
- If the request does not specify a prefix, ask which one to use before creating or updating notes.
- Always search the internet for the tool first. Do not rely on internal knowledge alone.
- Start by finding the authoritative sources: prefer the official GitHub repo and official docs/manual, then use local package-manager metadata as supporting context.
- For API questions and API note expansion, treat the official GitHub repo and source code as authoritative. Official docs help, but the public interfaces are defined by the source.
- If the official docs do not fully answer the API question, clone the upstream repo into `~/code/vendor` and inspect the relevant source files directly.
- Confirm all of these before writing the note:
  - package name
  - executable name
  - recommended install method
  - version to mention or current stable release when the primary source exposes it clearly
  - first useful commands and config knobs for the note
- Prefer primary sources only. Avoid blogspam and copied setup guides.
- Keep the authoritative links you find handy. Add package-wide links to the root note `Resources` section later, but keep note-specific research links in the note that uses them.
- Expect package name and executable name to differ.

### 2. Check local state without changing it

- Check whether the executable is already present with `command -v`.
- If it is already installed, capture the executable path and current version for the note.
- Do not install, upgrade, reinstall, or modify PATH as part of the `document` command.
- If the tool is absent locally, continue anyway. The note should still document how to install and start using it.

### 3. Create or update the Dendron note set

- Use the `dendron` skill for vault discovery, note placement, and note editing.
- Read and follow `../schemas/SKILL.md` for the `tool` schema before materializing notes.
- Reuse existing notes if present; do not create duplicates.
- Create optional note branches only when the documentation task benefits from a dedicated topic, reference, or API note.
- Refresh `last_refreshed` and `last_refreshed_by` whenever you update an existing note.
- If a root note already exists, read its `Resources` section before expanding the tool further. Reuse those shared package-wide links when they are still correct, and refresh them if they are stale or incomplete.
- Use CommonMark footnotes for factual claims drawn from external sources.
- Add the footnote marker at the end of the sentence or bullet that makes the claim.
- Prefer one footnote per claim cluster or paragraph rather than one per sentence when the same source supports the whole block.
- Use standard CommonMark syntax, for example `ripgrep ignores hidden files by default.[^rg-hidden]` with a matching definition like `[^rg-hidden]: [rg manual](https://...)`.
- Footnote definitions should point at authoritative sources, ideally official docs, the official GitHub repo, release notes, or the exact upstream source file for API claims.
- Do not footnote purely local observations from `command -v`, `--version`, or other direct machine inspection. Mark those as local verification instead.
- Fill schema-created notes from official docs plus verified local behavior when available. Use the schema descriptions and template headings as the routing guide.
- Omit unused template sections instead of leaving placeholders behind.
- If a topic, topic-child, reference, or API note depends on self-contained research, add those links to the current note, usually in a local `Resources` section or note-local footnotes, instead of copying all of them into the root note.
- Fill API notes from GitHub and source inspection, covering the public defined interfaces for that module or surface.
- When needed, clone the upstream repo into `~/code/vendor` and inspect the relevant module source to verify exports, entrypoints, types, methods, options, or other public interfaces.
- When expanding a topic, topic-child, reference, or API note, check the current note's links first when they exist, then the root note `Resources` for shared package-wide sources before doing any additional sourcing.
- When expanding an API note, after checking note-local and root links, prefer the official GitHub repo and source tree before any secondary source.
- When the tool is not installed locally, write the note from official sources and leave local verification claims out.
- Keep every note concise and practical. Summarize; do not paste long excerpts from docs.
- Preserve readable prose. Use footnotes to support claims, not to turn the note into a citation dump.

### 4. Report back cleanly

- Include:
  - documentation status
  - whether the executable was already present locally
  - executable path and version when available
  - root note path
  - any additional note paths created or updated from the schema
  - any optional next-step config or install command the user might want later
