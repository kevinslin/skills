# install

Read this file when the request maps to `$tool install <name>`.

## Workflow

### 1. Resolve the tool identity from primary sources

- Always search the internet for the tool first. Do not rely on internal knowledge alone.
- Start by finding the authoritative sources: prefer the official GitHub repo and official docs/manual, then use local package-manager metadata as supporting context.
- For API questions and API note expansion, treat the official GitHub repo and source code as authoritative. Official docs help, but the public interfaces are defined by the source.
- If the official docs do not fully answer the API question, clone the upstream repo into `~/code/vendor` and inspect the relevant source files directly.
- Confirm all of these before installing:
  - package name
  - executable name
  - recommended install method
  - version to verify after install
  - first useful commands and config knobs for the note
- Prefer primary sources only. Avoid blogspam and copied setup guides.
- Keep the authoritative links you find handy. You will add them to the root note `Resources` section later.
- Expect package name and executable name to differ. Example: Homebrew package `git-delta`, executable `delta`.

### 2. Choose the install method pragmatically

- Prefer a system package manager over building from source.
- On macOS, prefer Homebrew when it is installed and the tool has a formula/cask, unless the upstream docs clearly direct otherwise.
- Use language-specific installers such as `cargo`, `uv tool`, `pipx`, or `npm` only when they are the best supported route for that tool or the user asked for them.
- Do not clone/build from source unless there is no sensible package-manager route.

### 3. Install and verify locally

- Check whether the executable is already present with `command -v`.
- If the tool is already installed, report the current version and skip reinstall unless the user asked to reinstall or upgrade.
- Install with the chosen package manager.
- Verify with:
  - `command -v <exe>`
  - `<exe> --version` or the closest equivalent
  - a minimal smoke test if the tool needs one to prove it starts cleanly
- Capture any post-install caveats that matter in practice, such as shell completions, PATH changes, or required config.

### 4. Create or update the Dendron note set

- Use the `dendron` skill for vault discovery, note placement, and note editing.
- Use the schema in [tool.schema.yaml](/Users/kevinlin/code/skills/active/tool/references/tool.schema.yaml).
- Resolve the schema placeholders with the chosen tool name.
- Reuse existing notes if present. Do not create duplicates.
- Create or update every required note declared by the schema. The default required note set is:
  - `vpkg.<name>` from [root.md.template](/Users/kevinlin/code/skills/active/tool/references/root.md.template)
  - `vpkg.<name>.concepts` from [concepts.md.template](/Users/kevinlin/code/skills/active/tool/references/concepts.md.template)
- Create `vpkg.<name>.t.<topic>` only as needed from [topic.md.template](/Users/kevinlin/code/skills/active/tool/references/topic.md.template).
- `t` stands for topic. Topics represent large domain-specific areas of package functionality.
- Only add topic notes when the user is talking about that domain or when the current install/configuration work would clearly benefit from splitting it out.
- Create `vpkg.<name>.ref.<reference>` only as needed. These notes are intentionally freeform and do not use a fixed template.
- `ref` stands for reference. References point to self-contained functionality of the package rather than a broad domain.
- Only add reference notes when the user is talking about that functionality or when the current install/configuration work would clearly benefit from a dedicated pointer note.
- Create `vpkg.<name>.api.<api>` only as needed. `api` is a namespace, so instantiate concrete children via `api.<name>`.
- API notes often, but not always, map one-to-one with `vpkg.<name>.t.<topic>`. Reuse that overlap when it helps, but do not force it.
- Only add API notes when the user is asking about a module's public surface or when the current install/configuration work would clearly benefit from dedicated API coverage.
- Every created or updated note must include frontmatter with:
  - `title`
  - `last_refreshed`: current local timestamp in `YYYY-MM-DD HH:MM`
  - `last_refreshed_by`: `<agent_name>/<session id>`, for example `codex/<session id>`
- Refresh `last_refreshed` and `last_refreshed_by` whenever you update an existing note.
- If a root note already exists, read its `Resources` section before expanding the tool further. Reuse those authoritative links when they are still correct, and refresh them if they are stale or incomplete.
- Fill `vpkg.<name>` from verified local behavior and official docs:
  - `Quickstart`: install command, verify command, first required setup
  - `Cheatsheet`: common commands and shortcuts worth remembering
  - `Gotchas`: package-name vs binary-name mismatches, pager/path/config pitfalls, easy mistakes
  - `Config`: tunable knobs with short explanations
  - `Tips`: non-obvious but high-value usage, shortcuts, or features that may require extra configuration
  - `Resources`: authoritative links first, preferably official GitHub repo and official docs/manual, plus the package page when useful
- Fill `vpkg.<name>.concepts` with the core mental model, primary nouns, and the 3-7 concepts a first serious user needs to understand.
- Fill `vpkg.<name>.t.<topic>` with only the sections that are relevant for that domain. Omit unused sections instead of leaving placeholders behind.
- Fill `vpkg.<name>.ref.<reference>` with the required frontmatter plus only the fields and headings that help the current discussion. Useful fields include `Purpose`, `Inputs`, `Outputs`, `Commands`, `Configuration`, `Examples`, `Gotchas`, and `Related`, but only include what the referenced functionality actually needs.
- Fill `vpkg.<name>.api.<api>` from GitHub and source inspection, covering all public defined interfaces for that module. Include only the fields and headings that help the current discussion and match the exported surface.
- When needed, clone the upstream repo into `~/code/vendor` and inspect the relevant module source to verify exports, entrypoints, types, methods, options, or other public interfaces.
- Keep `api` notes narrow to one module or public surface area so they remain useful as a namespace child.
- When expanding a topic or reference note, check the root note `Resources` first before doing any additional sourcing.
- When expanding an API note, check the root note `Resources` first, then prefer the official GitHub repo and source tree before any secondary source.
- Keep `ref` notes narrow and pointer-like. They should make it easy to jump into one specific capability without turning into a second root note.
- Use `Tips` for capabilities that are easy to miss on a first read. Example for `delta`: `git blame` rendering, `grep`/`ripgrep` syntax highlighting pipelines, or terminal hyperlink support when extra config is required.
- Keep every note concise and practical. Summarize; do not paste long excerpts from docs.

### 5. Report back cleanly

- Include:
  - install status
  - executable path
  - version
  - root note path
  - any additional note paths created or updated from the schema
  - any optional next-step config the user might want
