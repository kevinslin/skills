---
name: tool
description: Install and/or document local tools end to end. 
dependencies:
- dendron
- schemas
---

# Tool

## Overview

Handle local tool onboarding in one pass: either install the tool with the best available package manager for the host and verify it, or document the tool without installing it, then use the `schemas` skill to initialize and update the schema-defined Dendron note set rooted at `[[<prefix>.<name>]]` with concise install and usage guidance.

Require the user to choose the root prefix explicitly. The only valid prefixes are `vpkg` and `pkg`. If the request does not specify one, ask which prefix to use before creating or updating notes.

When documenting or refreshing tool notes, always research the tool on the internet instead of relying on internal knowledge alone. Find the authoritative sources first and prefer the official GitHub repo and official docs/manual. Keep package-wide links in the root note's `Resources` section, but when the research is self-contained to a topic, reference, or API note, keep those links in the current note instead of pushing everything up to the root.

## Command

### install

Primary trigger:

```text
$tool install <prefix> <name>
```

`<prefix>` must be either `vpkg` or `pkg`.

Also use this workflow for equivalent requests such as:
- "install delta"
- "install delta and use the pkg prefix"
- "set up uv locally"
- "install ripgrep and document it"
- Read [references/install.md](./references/install.md) and follow it.

### document

Primary trigger:

```text
$tool document <prefix> <name>
```

`<prefix>` must be either `vpkg` or `pkg`.

Also use this workflow for equivalent requests such as:
- "document delta"
- "create a vpkg note set for uv"
- "create a pkg note set for uv"
- "fill out the ripgrep note template without installing it"
- Read [references/document.md](./references/document.md) and follow it.

## Dendron Note Rules

- `<prefix>` must come from the user and must be either `vpkg` or `pkg`. Do not guess or silently default.
- Before creating, auditing, or materializing notes, read and follow `../schemas/SKILL.md` for the `tool` schema.
- Treat `schemas` as the source of truth for note paths, required files, optional namespaces, templates, insertion routing, and materialization.
- Prefer the executable name for the root note when that is what the user will type, unless the package name is the clearer long-term identifier.
- Standardize title casing in frontmatter title, but keep file names lowercase.
- When updating an existing note, refresh `last_refreshed` and `last_refreshed_by` in frontmatter along with the note content you changed.
- For factual claims pulled from docs, source, or release metadata, use CommonMark footnotes in the note body so the claim is traceable to an authoritative source.
- Prefer placing the footnote marker at the end of the sentence or bullet that contains the claim.
- Footnote definitions should use authoritative URLs, ideally the official GitHub repo, official docs/manual, or upstream source file that supports the claim.
- Do not add footnotes for purely local observations you verified directly on the machine. Label those explicitly as local verification instead.
- Always research the tool on the internet instead of relying on internal knowledge alone.
- Find authoritative links first. Prefer the official GitHub repo and official docs/manual before using any secondary source.
- Keep package-wide authoritative links in the root note under `Resources`.
- When the research is self-contained to the current topic, topic-child, reference, or API note, add those links to the current note instead of duplicating them in the root note.
- When expanding an existing tool note or adding topic/topic-child/reference/api notes, check the current note's links first when they exist, then fall back to the root note `Resources` for shared package-wide links.
- For `api` notes, treat the official GitHub repo and source code as authoritative. Official docs may help, but public interfaces are defined by the source.
- If the docs do not fully answer an API question, clone the upstream repo into `~/code/vendor` and inspect the source to document the public interfaces accurately.
- After materialization, fill the template sections that apply and remove placeholder comments or empty headings that do not help the note.
- Keep optional namespace children narrow to the specific topic, reference, or API surface that triggered their creation.
- If a note already exists, update the relevant sections in place instead of rewriting unrelated content.
- For regular Markdown links inside a note, always write them relative to the current note file.

## Example

For:

```text
$tool install vpkg delta
```

the expected flow is:

1. Confirm the official upstream project and install guidance.
2. On macOS with Homebrew available, install the package `git-delta`.
3. Verify the executable `delta` with `command -v delta` and `delta --version`.
4. Follow `../schemas/SKILL.md` to materialize missing `tool` schema notes for `vpkg.delta`.
5. Use the `dendron` skill to update the materialized notes from verified local behavior and official sources.
6. Create optional note branches only if the user is digging into a specific topic, reference, or API surface.

For a `pkg` request, mirror the exact same flow with `pkg` as the root prefix instead of `vpkg`.
