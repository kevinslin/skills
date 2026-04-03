---
name: tool
description: Install and/or document local tools end to end. Use when the user asks for commands like `$tool install NAME` or `$tool document NAME`
dependencies:
- dendron
---

# Tool

## Overview

Handle local tool onboarding in one pass: either install the tool with the best available package manager for the host and verify it, or document the tool without installing it, then create or update the schema-defined Dendron note set rooted at `[[vpkg.<name>]]` with concise install and usage guidance.

When documenting or refreshing tool notes, always research the tool on the internet instead of relying on internal knowledge alone. Find the authoritative sources first and prefer the official GitHub repo and official docs/manual. Keep package-wide links in the root note's `Resources` section, but when the research is self-contained to a topic, reference, or API note, keep those links in the current note instead of pushing everything up to the root.

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
- Add `vpkg.<name>.api.<api>` notes only as needed when the user is actively asking about a module's public interfaces or when the current task benefits from a dedicated API note.
- Treat `api` as a namespace. Instantiate concrete children via `api.<name>`.
- API notes often, but not always, have a one-to-one mapping with `vpkg.<name>.t.<topic>` notes. Do not assume the mapping exists.
- Prefer the executable name for the root note when that is what the user will type, unless the package name is the clearer long-term identifier.
- Standardize title casing in frontmatter title, but keep file names lowercase.
- Every note page must include frontmatter with `last_refreshed` and `last_refreshed_by`.
- Set `last_refreshed` to the current local timestamp in `YYYY-MM-DD HH:MM` format.
- Set `last_refreshed_by` to `<agent_name>/<session id>`, for example `codex/<session id>`.
- When updating an existing note, refresh those frontmatter fields along with the note content you changed.
- For factual claims pulled from docs, source, or release metadata, use CommonMark footnotes in the note body so the claim is traceable to an authoritative source.
- Prefer placing the footnote marker at the end of the sentence or bullet that contains the claim.
- Footnote definitions should use authoritative URLs, ideally the official GitHub repo, official docs/manual, or upstream source file that supports the claim.
- Do not add footnotes for purely local observations you verified directly on the machine. Label those explicitly as local verification instead.
- Always research the tool on the internet instead of relying on internal knowledge alone.
- Find authoritative links first. Prefer the official GitHub repo and official docs/manual before using any secondary source.
- Keep package-wide authoritative links in the root note under `Resources`.
- When the research is self-contained to the current topic, reference, or API note, add those links to the current note instead of duplicating them in the root note.
- When expanding an existing tool note or adding topic/reference/api notes, check the current note's links first when they exist, then fall back to the root note `Resources` for shared package-wide links.
- For `api` notes, treat the official GitHub repo and source code as authoritative. Official docs may help, but public interfaces are defined by the source.
- If the docs do not fully answer an API question, clone the upstream repo into `~/code/vendor` and inspect the source to document the public interfaces accurately.
- Base each templated note on the exact template mapped by the schema. For children without a template, derive only the fields and headings that help with the functionality being documented.
- Keep `ref` notes freeform after the required frontmatter. Add fields on an as-needed basis as the user is talking about them, for example `Purpose`, `Inputs`, `Outputs`, `Commands`, `Configuration`, `Examples`, `Gotchas`, `Resources`, or `Related`.
- Keep `api` notes freeform after the required frontmatter. Cover all public defined interfaces for the module and choose the fields and headings that fit the exported surface.
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
9. Create a `[[vpkg.<tool>.api.<name>]]` note only when the tool exposes a concrete module or API surface that the user needs documented from the public source definitions.
