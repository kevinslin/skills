---
name: mem
description: Add, find, read, update, or delete knowledge in configured knowledge kernels. Use when the user invokes `$mem`, asks to add a finding to a memory or kernel, asks to look in a knowledge kernel, or wants persistent knowledge routed through a `.mem.json` knowledge-base configuration.
dependencies: []
---

# mem

Use this skill as a router for persistent knowledge kernels. Resolve the knowledge base from `.mem.json`, then use the configured per-base skill for all file operations in that base.

## Configuration

Resolve configuration in this order:

1. `$PWD/.mem.json`
2. `$HOME/.mem.json`

If neither file exists, stop and ask where the memory configuration should live. Do not guess a root.

Expected shape:

```yaml
version: 1
bases:
  - name: {{string}}
    root: {{path}}
    skill: {{name}}
```

Although the file is named `.mem.json`, tolerate either JSON or the YAML-like mapping above. Use a structured parser when one is available. Expand `~` and shell environment variables in `root`; resolve relative roots relative to the config file directory.

Each base has:

- `name`: short base identifier users can mention.
- `root`: filesystem root for that knowledge base.
- `skill`: skill name to load before creating, reading, updating, deleting, or searching files under `root`.

## Workflow

1. Parse the user request into an operation and kernel target.
   - `add this finding to $mem {{kernel}}`: add or update knowledge.
   - `look in $mem {{kernel}}`: search/read knowledge.
   - `delete from $mem {{kernel}}`: delete only when the user is explicit about what to remove.
2. Load `.mem.json` using the resolution order above.
3. Select a base:
   - If the kernel starts with `{{base.name}}/`, select that base and treat the remainder as the kernel path or query.
   - If the kernel exactly matches a base name, select that base and operate at the base root.
   - If only one base exists, select it.
   - If multiple bases match or none can be inferred, ask which base to use.
4. Load the skill named by the selected base's `skill` before touching files under `root`.
5. Use that base skill's rules for all monorepo navigation, search, file creation, edits, deletes, and citations.
6. Keep the final response concise: name the base, the kernel, what changed or what was found, and cite touched files when local-file citations are required.

## Finding Kernels

Treat the kernel argument as either a file-like target or a search query:

- If it looks like a path, title, or exact kernel name, search under the selected base root for a matching file before creating anything.
- If it is broad or ambiguous, search filenames first, then headings and body text.
- Prefer updating an existing kernel over creating a near-duplicate.
- If creating a new kernel, follow the selected base skill's naming, placement, and frontmatter conventions.

## Adding Knowledge

When adding a finding:

- Preserve the kernel's existing format and organization.
- Add the smallest durable note that will be useful later.
- Include source context when available: originating file, command, log, PR, conversation, date, or rationale.
- Avoid duplicating existing knowledge; merge with or refine the existing entry when the same point is already present.
- Do not add speculative claims as facts. Label uncertainty directly.

## Reading Knowledge

When looking in a kernel:

- Search before answering.
- Read the most relevant matching files.
- Summarize what the kernel says, not what you assume.
- Cite exact local files and line numbers when the surrounding agent instructions require file citations.

## Deletes

Delete knowledge only when the user explicitly asks to delete or remove it. Prefer targeted removals over deleting an entire kernel file, and report the exact file changed.

## Failure Modes

- Missing config: ask where to create or find `.mem.json`.
- Invalid config: report the parse or schema problem and stop before making changes.
- Missing base root: report the configured path and stop before making changes.
- Missing configured skill: report the missing skill name. Do read-only discovery only if it is clearly safe; ask before writes.
