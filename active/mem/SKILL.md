---
name: mem
description: Manage user-defined knowledge bases. Use when directly invoked via `$mem`.
dependencies: []
---

# mem

Use this skill as a router for persistent knowledge bases. Resolve the knowledge base configuration from `.mem.yaml`, then use the configured per-base schemas and optional skill for file operations in that base.

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
    skill: {{skill_name}} # optional
    schemas: [{{schema_name}}, ...]
```

Parse `.mem.yaml` as YAML only. Require the top-level object to contain `version: 1` and a non-empty `bases` list. Require each base to include non-empty `name`, `root`, and `schemas` fields. `schemas` must be a non-empty list of schema names. `skill` is optional; when present, it must be non-empty. Expand `~` and shell environment variables in `root`; resolve relative roots relative to the config file directory.

Each base has:

- `name`: short base identifier users can mention.
- `root`: filesystem root for that knowledge base.
- `skill`: optional skill name to load before creating, reading, updating, deleting, or searching files under `root`.
- `schemas`: ordered schema names to resolve into `$schema` definitions; use them to understand the expected structure, placement, naming, frontmatter, and section format of knowledge bases in this base.

## Workflow

1. Parse the user request into an operation and knowledge-base target.
   - `add this finding to $mem {{knowledge_base}}`: add or update knowledge.
   - `look in $mem {{knowledge_base}}`: search/read knowledge.
   - `delete from $mem {{knowledge_base}}`: delete only when the user is explicit about what to remove.
2. Load `.mem.yaml` using the resolution order above.
3. Select a base:
   - If the knowledge-base target starts with `{{base.name}}/`, select that base and treat the remainder as the knowledge-base path or query.
   - If the knowledge-base target exactly matches a base name, select that base and operate at the base root.
   - If only one base exists, select it.
   - If multiple bases match or none can be inferred, ask which base to use.
4. Normalize and constrain any file-like knowledge-base target:
   - Expand only the selected base `root`; do not expand shell syntax inside the user-provided knowledge-base target.
   - Resolve the final candidate path after `..`, symlinks, and relative segments.
   - Reject the operation if the resolved candidate is outside the selected base `root`.
   - Do not follow user-provided absolute paths unless the resolved path is inside the selected base `root`.
5. If the selected base has `skill`, load that skill before touching files under `root`. If `skill` is absent, use normal file/search tools constrained to `root`.
6. Resolve every schema named in the selected base's `schemas` list to `$schema` definitions before creating, reading, updating, deleting, or summarizing knowledge bases.
   - Treat each `schemas` entry as a schema identifier, not a filesystem path.
   - Use the resolved `$schema` definitions to determine knowledge base structure, required fields, naming, placement, and update style.
   - If resolved schemas conflict with each other, ask the user which schema should govern the write before making changes.
   - If the schemas conflict with the optional base skill's file-operation rules, follow the base skill for how to touch files and the schemas for what knowledge base content should look like.
7. Use the optional base skill's rules for all monorepo navigation, search, file creation, edits, deletes, and citations when configured; otherwise keep all such operations under `root`.
8. Keep the final response concise: name the base, the knowledge base, what changed or what was found, and cite touched files when local-file citations are required.

## Finding Knowledge Bases

Treat the knowledge-base argument as either a file-like target or a search query:

- If it looks like a path, title, or exact knowledge base name, search under the selected base root for a matching file before creating anything.
- If it is broad or ambiguous, search filenames first, then headings and body text.
- Prefer updating an existing knowledge base over creating a near-duplicate.
- If creating a new knowledge base, follow the optional selected base skill's file rules when configured and the resolved `$schema` definitions' naming, placement, frontmatter, and structure conventions.

## Adding Knowledge

When adding a finding:

- Preserve the knowledge base's existing format and organization.
- Shape new or updated content according to the resolved `$schema` definitions.
- Add the smallest durable note that will be useful later.
- Include source context when available: originating file, command, log, PR, conversation, date, or rationale.
- Avoid duplicating existing knowledge; merge with or refine the existing entry when the same point is already present.
- Do not add speculative claims as facts. Label uncertainty directly.

## Reading Knowledge

When looking in a knowledge base:

- Search before answering.
- Read the most relevant matching files.
- Use the resolved `$schema` definitions to interpret fields, sections, and relationships.
- Summarize what the knowledge base says, not what you assume.
- Cite exact local files and line numbers when the surrounding agent instructions require file citations.

## Deletes

Delete knowledge only when the user explicitly asks to delete or remove it. Prefer targeted removals over deleting an entire knowledge base file, and report the exact file changed.

## Failure Modes

- Missing config: ask where to create or find `.mem.yaml`.
- Invalid config: report the parse or schemas problem and stop before making changes.
- Missing base root: report the configured path and stop before making changes.
- Missing configured skill: report the missing skill name and stop before any read or write under that base. If no skill is configured, continue using normal file/search tools constrained to `root`.
- Missing or unresolvable configured schemas: report the schema names and stop before any read or write under that base.
