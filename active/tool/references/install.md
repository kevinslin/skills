# install

Read this file when the request maps to `$tool install <name>`.

## Workflow

### 1. Resolve the tool identity from primary sources

- Start with the official upstream repo/docs plus local package-manager metadata.
- Confirm all of these before installing:
  - package name
  - executable name
  - recommended install method
  - version to verify after install
  - first useful commands and config knobs for the note
- Prefer primary sources only. Avoid blogspam and copied setup guides.
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
- Create or update every note declared by the schema. The default note set is:
  - `vpkg.<name>` from [root.md.template](/Users/kevinlin/code/skills/active/tool/references/root.md.template)
  - `vpkg.<name>.concepts` from [concepts.md.template](/Users/kevinlin/code/skills/active/tool/references/concepts.md.template)
- Fill `vpkg.<name>` from verified local behavior and official docs:
  - `Quickstart`: install command, verify command, first required setup
  - `Cheatsheet`: common commands and shortcuts worth remembering
  - `Gotchas`: package-name vs binary-name mismatches, pager/path/config pitfalls, easy mistakes
  - `Config`: tunable knobs with short explanations
  - `Tips`: non-obvious but high-value usage, shortcuts, or features that may require extra configuration
  - `Resources`: official repo, manual, package page
- Fill `vpkg.<name>.concepts` with the core mental model, primary nouns, and the 3-7 concepts a first serious user needs to understand.
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
