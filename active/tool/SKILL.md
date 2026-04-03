---
name: tool
description: Install and document local tools end to end, or document them without installing. Use when the user asks for commands like `$tool install NAME` or `$tool document NAME`, wants a CLI/app/tool installed on the current machine, or wants a schema-driven `vpkg.name` Dendron note set created or refreshed with practical usage instructions.
dependencies:
- dendron
---

# Tool

## Overview

Handle local tool onboarding in one pass: either install the tool with the best available package manager for the host and verify it, or document the tool without installing it, then create or update the schema-defined Dendron note set rooted at `[[vpkg.<name>]]` with concise install and usage guidance.

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
- "create a vpkg note set for uv"
- "fill out the ripgrep note template without installing it"
- Read [references/document.md](references/document.md) and follow it.

## Dendron Note Rules

- Use the schema in [references/tool.schema.yaml](references/tool.schema.yaml) to determine which notes to create or update.
- Use dot-delimited Dendron naming exactly, with `vpkg.<name>` as the root note for the tool.
- Create or update every note declared in the schema for the resolved tool name. The default note set includes `vpkg.<name>` and `vpkg.<name>.concepts`.
- Prefer the executable name for the root note when that is what the user will type, unless the package name is the clearer long-term identifier.
- Standardize title casing in frontmatter title, but keep file names lowercase.
- Base each note on the exact template mapped by the schema.
- If a note already exists, update the relevant sections in place instead of rewriting unrelated content.
- For regular Markdown links inside a note, always write them relative to the current note file.

## Example

For:

```text
$tool install delta
```

the expected flow is:

1. Confirm the official upstream project and install guidance.
2. On macOS with Homebrew available, install the package `git-delta`.
3. Verify the executable `delta` with `command -v delta` and `delta --version`.
4. Use the `dendron` skill to create or update the schema-defined note set rooted at `[[vpkg.delta]]`.
5. Fill `[[vpkg.delta]]` with install steps, `git config` examples, common `delta` commands, gotchas, config options, and official links.
6. Fill `[[vpkg.delta.concepts]]` with the core `delta` concepts and mental model.
