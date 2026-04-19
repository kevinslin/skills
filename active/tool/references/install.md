# install

Read this file when the request maps to `$tool install <prefix> <name>`.

## Workflow

### 1. Resolve the tool identity from primary sources

- Require the user to choose the root prefix up front. The only valid prefixes are `vpkg` and `pkg`.
- If the request does not specify a prefix, ask which one to use before creating or updating notes.
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
- Keep the authoritative links you find handy. Add package-wide links to the root note `Resources` section later, but keep note-specific research links in the note that uses them.
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
- Read and follow `../schemas/SKILL.md` for the `tool` schema before materializing notes.
- Reuse existing notes if present; do not create duplicates.
- Create optional note branches only when the install/configuration work benefits from a dedicated topic, reference, or API note.
- Refresh `last_refreshed` and `last_refreshed_by` whenever you update an existing note.
- If a root note already exists, read its `Resources` section before expanding the tool further. Reuse those shared package-wide links when they are still correct, and refresh them if they are stale or incomplete.
- Fill schema-created notes from verified local behavior and official docs. Use the schema descriptions and template headings as the routing guide.
- Omit unused template sections instead of leaving placeholders behind.
- If a topic, topic-child, reference, or API note depends on self-contained research, add those links to the current note, usually in a local `Resources` section or note-local footnotes, instead of copying all of them into the root note.
- Fill API notes from GitHub and source inspection, covering the public defined interfaces for that module or surface.
- When needed, clone the upstream repo into `~/code/vendor` and inspect the relevant module source to verify exports, entrypoints, types, methods, options, or other public interfaces.
- When expanding a topic, topic-child, reference, or API note, check the current note's links first when they exist, then the root note `Resources` for shared package-wide sources before doing any additional sourcing.
- When expanding an API note, after checking note-local and root links, prefer the official GitHub repo and source tree before any secondary source.
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
