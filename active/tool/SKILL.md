---
name: tool
description: Install and document local tools end to end, or document them without installing. Use when the user asks for commands like `$tool install NAME` or `$tool document NAME`, wants a CLI/app/tool installed on the current machine, or wants a schema-driven `vpkg.name` Dendron note set created or refreshed with practical usage instructions, including optional topic child notes for domain-specific package areas and optional reference child notes for self-contained package functionality.
dependencies:
- dendron
---

# Tool

## Overview

Handle local tool onboarding in one pass: either install the tool with the best available package manager for the host and verify it, or document the tool without installing it, then create or update the schema-defined Dendron note set rooted at `[[vpkg.<name>]]` with concise install and usage guidance.

When documenting or refreshing tool notes, always research the tool on the internet instead of relying on internal knowledge alone. Find the authoritative sources first, prefer the official GitHub repo and official docs/manual, add those links to the root note's `Resources` section, and consult that `Resources` section first before expanding the tool with more detail.

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
- Create or update every required note declared in the schema for the resolved tool name. The default required note set includes `vpkg.<name>` and `vpkg.<name>.concepts`.
- Add `vpkg.<name>.t.<topic>` notes only as needed when the user is actively asking about or working through a domain-specific area of the package.
- Treat `t` as "topic". A topic is a large domain-specific area of package functionality, for example an AWS package might have topics like `ec2`, `networking`, or `iam`.
- Add `vpkg.<name>.ref.<reference>` notes only as needed when the user is actively asking about a self-contained piece of package functionality.
- Treat `ref` as "reference". A reference is a pointer to self-contained functionality of a package, such as a command, provider, API surface, subtool, or workflow that can stand on its own.
- Prefer the executable name for the root note when that is what the user will type, unless the package name is the clearer long-term identifier.
- Standardize title casing in frontmatter title, but keep file names lowercase.
- Every note page must include frontmatter with `last_refreshed` and `last_refreshed_by`.
- Set `last_refreshed` to the current local timestamp in `YYYY-MM-DD HH:MM` format.
- Set `last_refreshed_by` to `<agent_name>/<session id>`, for example `codex/<session id>`.
- When updating an existing note, refresh those frontmatter fields along with the note content you changed.
- Always research the tool on the internet instead of relying on internal knowledge alone.
- Find authoritative links first. Prefer the official GitHub repo and official docs/manual before using any secondary source.
- Add authoritative links to the root note under `Resources`.
- When expanding an existing tool note or adding topic/reference notes, check the root note `Resources` links first.
- Base each templated note on the exact template mapped by the schema. For children without a template, derive only the fields and headings that help with the functionality being documented.
- Keep `ref` notes freeform after the required frontmatter. Add fields on an as-needed basis as the user is talking about them, for example `Purpose`, `Inputs`, `Outputs`, `Commands`, `Configuration`, `Examples`, `Gotchas`, or `Related`.
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
7. Create a `[[vpkg.delta.t.<topic>]]` note only when the user is digging into a specific `delta` domain that deserves its own note.
8. Create a `[[vpkg.delta.ref.<reference>]]` note only when the user is digging into one self-contained `delta` capability that deserves a dedicated pointer note.
