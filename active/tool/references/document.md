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
- Use the schema in [tool.schema.yaml](tool.schema.yaml).
- Resolve the schema placeholders with the chosen prefix and tool name.
- Reuse existing notes if present. Do not create duplicates.
- Create or update every required note declared by the schema. The default required note set is:
  - `<prefix>.<name>` from [root.md.template](root.md.template)
  - `<prefix>.<name>.concepts` from [concepts.md.template](concepts.md.template)
  - `<prefix>.<name>.dev` from [dev.md.template](dev.md.template)
  - `<prefix>.<name>.cli` from [cli.md.template](/Users/kevinlin/code/skills/active/tool/references/cli.md.template)
- Create `<prefix>.<name>.t.<topic>` only as needed from [topic.md.template](topic.md.template).
- `t` stands for topic. Topics represent large domain-specific areas of package functionality.
- Only add topic notes when the user is talking about that domain or when the current task would clearly benefit from splitting it out.
- Create `<prefix>.<name>.ref.<reference>` only as needed. These notes are intentionally freeform and do not use a fixed template.
- `ref` stands for reference. References point to self-contained functionality of the package rather than a broad domain.
- Only add reference notes when the user is talking about that functionality or when the current task would clearly benefit from a dedicated pointer note.
- Create `<prefix>.<name>.api.<api>` only as needed. `api` is a namespace, so instantiate concrete children via `api.<name>`.
- API notes often, but not always, map one-to-one with `<prefix>.<name>.t.<topic>`. Reuse that overlap when it helps, but do not force it.
- Only add API notes when the user is asking about a module's public surface or when the current task would clearly benefit from dedicated API coverage.
- Every created or updated note must include frontmatter with:
  - `title`
  - `last_refreshed`: current local timestamp in `YYYY-MM-DD HH:MM`
  - `last_refreshed_by`: `<agent_name>/<session id>`, for example `codex/<session id>`
- Refresh `last_refreshed` and `last_refreshed_by` whenever you update an existing note.
- If a root note already exists, read its `Resources` section before expanding the tool further. Reuse those shared package-wide links when they are still correct, and refresh them if they are stale or incomplete.
- Use CommonMark footnotes for factual claims drawn from external sources.
- Add the footnote marker at the end of the sentence or bullet that makes the claim.
- Prefer one footnote per claim cluster or paragraph rather than one per sentence when the same source supports the whole block.
- Use standard CommonMark syntax, for example `ripgrep ignores hidden files by default.[^rg-hidden]` with a matching definition like `[^rg-hidden]: [rg manual](https://...)`.
- Footnote definitions should point at authoritative sources, ideally official docs, the official GitHub repo, release notes, or the exact upstream source file for API claims.
- Do not footnote purely local observations from `command -v`, `--version`, or other direct machine inspection. Mark those as local verification instead.
- Fill `<prefix>.<name>` from official docs plus verified local behavior when available:
  - `Quickstart`: recommended install command, verify command, first required setup
  - `Cheatsheet`: common commands and shortcuts worth remembering
  - `Gotchas`: package-name vs binary-name mismatches, pager/path/config pitfalls, easy mistakes
  - `Config`: tunable knobs with short explanations
  - `Tips`: non-obvious but high-value usage, shortcuts, or features that may require extra configuration
  - `Resources`: package-wide authoritative links first, preferably official GitHub repo and official docs/manual, plus the package page when useful
- Fill `<prefix>.<name>.concepts` with the core mental model, primary nouns, and the 3-7 concepts a first serious user needs to understand.
- Keep the concepts note terse. Do not invent filler headings just to satisfy the template.
- Fill `<prefix>.<name>.dev` with contributor-facing workflows:
  - `Setup`: how to install dependencies, build from source, start the development server, and enable watch mode
  - `Tests`: how to run the main test suite and any targeted test commands
  - `Tips`: helpful debugging shortcuts, logs, env vars, or local verification steps
  - `Resources`: development-focused links such as contributor docs, source tree entrypoints, and relevant upstream manuals
- Fill `<prefix>.<name>.cli` with only the terminal-facing guidance that helps the user operate the executable:
  - `Cheatsheet`: common commands and shortcuts
  - `Gotchas`: easy mistakes, argument-order traps, shell-quoting pitfalls, or package-name versus executable-name mismatches
  - `Tips`: shortcuts, hidden features, or extra setup that unlocks useful workflows
  - `Resources`: authoritative CLI-facing links first, preferably the official GitHub repo and official docs/manual
- Fill `<prefix>.<name>.t.<topic>` with only the sections that are relevant for that domain. Omit unused sections instead of leaving placeholders behind.
- If a topic, reference, or API note depends on self-contained research, add those links to the current note, usually in a local `Resources` section or note-local footnotes, instead of copying all of them into the root note.
- Fill `<prefix>.<name>.ref.<reference>` with the required frontmatter plus only the fields and headings that help the current discussion. Useful fields include `Purpose`, `Inputs`, `Outputs`, `Commands`, `Configuration`, `Examples`, `Gotchas`, `Resources`, and `Related`, but only include what the referenced functionality actually needs.
- Fill `<prefix>.<name>.api.<api>` from GitHub and source inspection, covering all public defined interfaces for that module. Include only the fields and headings that help the current discussion and match the exported surface.
- When needed, clone the upstream repo into `~/code/vendor` and inspect the relevant module source to verify exports, entrypoints, types, methods, options, or other public interfaces.
- Keep `api` notes narrow to one module or public surface area so they remain useful as a namespace child.
- When expanding a topic, reference, or API note, check the current note's links first when they exist, then the root note `Resources` for shared package-wide sources before doing any additional sourcing.
- When expanding an API note, after checking note-local and root links, prefer the official GitHub repo and source tree before any secondary source.
- Keep `ref` notes narrow and pointer-like. They should make it easy to jump into one specific capability without turning into a second root note.
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
