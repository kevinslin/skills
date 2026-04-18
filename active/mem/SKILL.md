---
name: mem
description: Add, find, read, update, or delete knowledge in configured knowledge kernels using configured base skills and kernel schemas. Use when the user invokes `$mem`, asks to add a finding to a memory or kernel, asks to look in a knowledge kernel, or wants persistent knowledge routed through a `.mem.yaml` knowledge-base configuration.
dependencies: []
---

# mem

Use this skill as a router for persistent knowledge kernels. Resolve the knowledge base from `.mem.yaml`, then use the configured per-base skill and schema for all file operations in that base.

## Configuration

Resolve configuration in this order:

1. `$PWD/.mem.yaml`
2. `$HOME/.mem.yaml`

If neither file exists, stop and ask where the memory configuration should live. Do not guess a root.

Expected shape:

```yaml
version: 1
bases:
  - name: {{string}}
    root: {{path}}
    skill: {{skill_name}}
    schema: {{schema_name}}
```

Parse `.mem.yaml` as YAML only. Require the top-level object to contain `version: 1` and a non-empty `bases` list. Require each base to include non-empty `name`, `root`, `skill`, and `schema` fields. Expand `~` and shell environment variables in `root`; resolve relative roots relative to the config file directory.

Each base has:

- `name`: short base identifier users can mention.
- `root`: filesystem root for that knowledge base.
- `skill`: skill name to load before creating, reading, updating, deleting, or searching files under `root`.
- `schema`: schema name to resolve into a `$schema`; use it to understand the expected structure, placement, naming, frontmatter, and section format of knowledge kernels in this base.

## Workflow

1. Parse the user request into an operation and kernel target.
   - `add this finding to $mem {{kernel}}`: add or update knowledge.
   - `look in $mem {{kernel}}`: search/read knowledge.
   - `delete from $mem {{kernel}}`: delete only when the user is explicit about what to remove.
2. Load `.mem.yaml` using the resolution order above.
3. Select a base:
   - If the kernel starts with `{{base.name}}/`, select that base and treat the remainder as the kernel path or query.
   - If the kernel exactly matches a base name, select that base and operate at the base root.
   - If only one base exists, select it.
   - If multiple bases match or none can be inferred, ask which base to use.
4. Normalize and constrain any file-like kernel target:
   - Expand only the selected base `root`; do not expand shell syntax inside the user-provided kernel.
   - Resolve the final candidate path after `..`, symlinks, and relative segments.
   - Reject the operation if the resolved candidate is outside the selected base `root`.
   - Do not follow user-provided absolute paths unless the resolved path is inside the selected base `root`.
5. Load the skill named by the selected base's `skill` before touching files under `root`.
6. Resolve the selected base's `schema` to a `$schema` before creating, reading, updating, deleting, or summarizing kernels.
   - Treat `schema` as a schema identifier, not a filesystem path.
   - Use the resolved `$schema` to determine kernel structure, required fields, naming, placement, and update style.
   - If the schema conflicts with the base skill's file-operation rules, follow the base skill for how to touch files and the schema for what kernel content should look like.
7. Use that base skill's rules for all monorepo navigation, search, file creation, edits, deletes, and citations.
8. Keep the final response concise: name the base, the kernel, what changed or what was found, and cite touched files when local-file citations are required.

## Finding Kernels

Treat the kernel argument as either a file-like target or a search query:

- If it looks like a path, title, or exact kernel name, search under the selected base root for a matching file before creating anything.
- If it is broad or ambiguous, search filenames first, then headings and body text.
- Prefer updating an existing kernel over creating a near-duplicate.
- If creating a new kernel, follow the selected base skill's file rules and the resolved `$schema`'s naming, placement, frontmatter, and structure conventions.

## Adding Knowledge

When adding a finding:

- Preserve the kernel's existing format and organization.
- Shape new or updated content according to the resolved `$schema`.
- Add the smallest durable note that will be useful later.
- Include source context when available: originating file, command, log, PR, conversation, date, or rationale.
- Avoid duplicating existing knowledge; merge with or refine the existing entry when the same point is already present.
- Do not add speculative claims as facts. Label uncertainty directly.

## Reading Knowledge

When looking in a kernel:

- Search before answering.
- Read the most relevant matching files.
- Use the resolved `$schema` to interpret fields, sections, and relationships.
- Summarize what the kernel says, not what you assume.
- Cite exact local files and line numbers when the surrounding agent instructions require file citations.

## Deletes

Delete knowledge only when the user explicitly asks to delete or remove it. Prefer targeted removals over deleting an entire kernel file, and report the exact file changed.

## Failure Modes

- Missing config: ask where to create or find `.mem.yaml`.
- Invalid config: report the parse or schema problem and stop before making changes.
- Missing base root: report the configured path and stop before making changes.
- Missing configured skill: report the missing skill name and stop before any read or write under that base.
- Missing or unresolvable configured schema: report the schema name and stop before any read or write under that base.
