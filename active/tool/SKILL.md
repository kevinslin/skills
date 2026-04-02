---
name: tool
description: Install and document local tools end to end, or document them without installing. Use when the user asks for commands like `$tool install NAME` or `$tool document NAME`, wants a CLI/app/tool installed on the current machine, or wants a `vpkg.name` Dendron note created or refreshed with practical usage instructions.
dependencies:
- dendron
---

# Tool

## Overview

Handle local tool onboarding in one pass: either install the tool with the best available package manager for the host and verify it, or document the tool without installing it, then create or update a Dendron note named `[[vpkg.<name>]]` with concise install and usage guidance.

## Command

### install

Primary trigger:

```text
$tool install <name>
```

Also use this workflow for equivalent requests such as:
- "install delta"
- "set up uv locally"
- "install ripgrep and document it"
- Read [references/install.md](references/install.md) and follow it.

### document

Primary trigger:

```text
$tool document <name>
```

Also use this workflow for equivalent requests such as:
- "document delta"
- "create a vpkg note for uv"
- "fill out the ripgrep note template without installing it"
- Read [references/document.md](references/document.md) and follow it.

## Dendron Note Rules

- Use dot-delimited Dendron naming exactly: `vpkg.<name>`.
- Prefer the executable name for the note when that is what the user will type, unless the package name is the clearer long-term identifier.
- Standardize title casing in frontmatter title, but keep the file name lowercase.
- Base the note on the exact template in the bundled reference.
- If the note already exists, update the relevant sections in place instead of rewriting unrelated content.
- For regular Markdown links inside the note, always write them relative to the current note file.

## Example

For:

```text
$tool install delta
```

the expected flow is:

1. Confirm the official upstream project and install guidance.
2. On macOS with Homebrew available, install the package `git-delta`.
3. Verify the executable `delta` with `command -v delta` and `delta --version`.
4. Use the `dendron` skill to create or update `[[vpkg.delta]]`.
5. Fill the note with install steps, `git config` examples, common `delta` commands, gotchas, config options, and official links.
