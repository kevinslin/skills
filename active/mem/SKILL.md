---
name: mem
description: Manage user-defined knowledge bases when `$mem` is invoked or durable knowledge is being saved.
dependencies:
- dev.llm-session
- specy
---

# mem

Use this skill as a router for persistent knowledge bases. Resolve the knowledge base configuration from `.mem.yaml`, then use the configured per-base schemas and optional skill for file operations in that base.

## Invocation Rule

Invoke `$mem` whenever saving durable knowledge. Do not write durable knowledge directly to ad hoc files, repo-local `.mem` trees, Dendron notes, or other long-lived knowledge stores without first using this skill to resolve the configured base, schemas, and optional base-specific file rules.

This rule applies even when another skill discovers the learning, finding, decision, or workflow improvement. The discovering skill can decide what should be remembered, but `$mem` owns where and how that knowledge is persisted.

## Configuration

Resolve configuration in this order:

1. `$PWD/.mem.yaml`
2. `$HOME/.mem.yaml`

If neither file exists, stop and ask where the memory configuration should live. Do not guess a root.
If the user does not specify a base name, route by the configured base `description`. If no description clearly matches, prefer an exact `root` match with the working directory. If neither signal is decisive, stop and ask the user. Do not guess.

Expected shape:

```yaml
version: 1
bases:
  - name: {{string}}
    description: {{string}} # what this base is used for; used for routing
    root: {{path}}
    path_style: {{directory|dotted}} # optional; inferred from existing files when omitted
    skill: {{skill_name}} # optional
    schemas:
      - name: {{schema_name}}
        path: {{absolute_schema_file_path}} # optional
```

Load and validate `.mem.yaml` with the bundled parser script instead of hand-parsing:

```bash
python3 ./scripts/load_config.py --pretty
```

Run the command from the directory containing this `SKILL.md`, or otherwise resolve `./scripts/load_config.py` relative to this `SKILL.md` and run that copy. The script searches `$PWD/.mem.yaml`, then `$HOME/.mem.yaml`, validates the shape below, expands `~` and shell environment variables in `root`, resolves relative roots relative to the config file directory, requires roots to exist, and prints normalized JSON.

The parser enforces:

- `version` must be `1`.
- `bases` must be a non-empty list.
- Each base must include non-empty `name`, `description`, `root`, and `schemas` fields.
- `schemas` must be a non-empty list of schema objects.
- Each schema object must include non-empty `name`.
- Each schema object's `path` is optional. When present, it must be an absolute path to an existing schema file.
- `path_style` is optional; when present, it must be `directory` or `dotted`. When omitted, the parser infers it from existing Markdown files under `root` and falls back to `directory` if no convention is visible.
- `skill` is optional; when present, it must be non-empty.

Each base has:

- `name`: short base identifier users can mention.
- `description`: what the base is used for. Use this as the primary routing signal when the user does not name a base explicitly.
- `root`: filesystem root for that knowledge base.
- `path_style`: how schema paths map to files for this base. Use `dotted` for files such as `pkg.test.cli.md`; use `directory` for paths such as `pkg/test/cli.md`.
- `skill`: optional skill name to load for base-specific navigation and file operations under `root`.
- `schemas`: ordered schema objects to resolve into `$schema` definitions. `name` identifies a bundled schema when `path` is absent. `path` points to an absolute schema file when the schema is not bundled or should be loaded from a specific file. Use resolved schemas to understand the expected structure, placement, naming, frontmatter, and section format of knowledge bases in this base.

The selected base `root` is the authoritative filesystem root for that operation. Optional base skills must consume this selected root and the resolved schemas as context; they should not reinterpret their own independent root variables when `mem` has already selected a base.

## Workflow

1. Parse the user request into an operation and knowledge-base target.
   - `add this finding to $mem {{knowledge_base}}`: add or update knowledge.
   - `look in $mem {{knowledge_base}}`: search/read knowledge.
   - `delete from $mem {{knowledge_base}}`: delete only when the user is explicit about what to remove.
2. Load `.mem.yaml` by running `./scripts/load_config.py`; use the normalized JSON output for base selection and root paths.
3. Select a base:
   - If the knowledge-base target starts with `{{base.name}}/`, select that base and treat the remainder as the knowledge-base path or query.
   - If the knowledge-base target exactly matches a base name, select that base and operate at the base root.
   - If the user does not name a base, compare the request intent with each base's `description`; select the base only when one description clearly matches the operation.
   - If no description is decisive and one base has `root` equal to the working directory, select that base.
   - If only one base exists, select it.
   - If multiple bases match or none can be inferred, ask which base to use.
4. Normalize and constrain any file-like knowledge-base target:
   - Expand only the selected base `root`; do not expand shell syntax inside the user-provided knowledge-base target.
   - Resolve the final candidate path after `..`, symlinks, and relative segments.
   - Reject the operation if the resolved candidate is outside the selected base `root`.
   - Do not follow user-provided absolute paths unless the resolved path is inside the selected base `root`.
5. Resolve every schema object in the selected base's `schemas` list to `$schema` definitions before creating, reading, updating, deleting, or summarizing knowledge bases.
   - Treat schema entries as objects with `name` and optional `path`.
   - If `path` is present, load the schema from that absolute file path and use `name` as its local identifier.
   - If `path` is absent, resolve `name` as a bundled schema identifier.
   - Use the resolved `$schema` definitions to determine knowledge base structure, required fields, naming, placement, and update style.
   - If resolved schemas conflict with each other, ask the user which schema should govern the write before making changes.
   - If the schemas conflict with the optional base skill's file-operation rules, follow the base skill for how to touch files and the schemas for what knowledge base content should look like.
6. If the selected base has `skill`, load that skill with the selected base name, selected base `root`, knowledge-base target, and resolved `$schema` definitions as the operating context. If `skill` is absent, use normal file/search tools constrained to `root`.
7. Choose the schema node before writing:
   - If the knowledge-base target maps to a file path, match that path to the nearest resolved schema node first.
   - If the user references an existing numbered spec folder such as `spec 30`, `spec 30/foo`, or "under spec 30", resolve that reference against existing spec folders under the selected base root before choosing a new destination. Treat the matched spec folder as the container for sidecars instead of minting a new numbered spec.
   - Otherwise, use resolved schema node descriptions to choose candidate nodes.
   - Use `insertion_policy` only as a tie-breaker or guardrail when descriptions leave ambiguity.
   - Before writing, render or derive the expected file path for the chosen schema node under the selected base `root`, including required slug, name, and template conventions.
   - Use the selected base's normalized `path_style` when deriving paths or invoking schema materialization. If using `../schemas/scripts/schema.py materialize`, pass `--path-style {{path_style}}`.
   - For folder-based schemas, distinguish the primary document from sidecars. Example: in `ag-dir-v2`, the spec unit is `specs/{NN}-{slug}/spec.md` and report sidecars live at `specs/{NN}-{slug}/reports/{report}.md`. Do not treat the spec folder as a generic bucket, and do not create a reports-only spec folder with no `spec.md`.
   - Create only the chosen target file and its parent directories. Do not materialize a whole schema tree, required sibling nodes, or placeholder/default nodes just to create one knowledge file.
   - If using a schema helper command, use it only when it can render exactly the selected node. Do not run broad schema materialization commands that also create required siblings under the base root.
   - Do not invent schema metadata fields such as `schema_route`, `schema`, `route`, or `node`. Add or update route-like metadata only when the resolved schema template or the existing file explicitly defines that field, and then use the concrete materialized route for the selected root and `path_style`, not an unresolved template route.
   - Compare the expected path with any existing candidate file and schema-owned route or index metadata. If they disagree, treat the candidate as schema drift, not path authority.
   - Do not silently write to a drifted file just because it already exists. If the user's intent is clear and the drift is mechanical, repair the path, slug, and metadata first; otherwise ask.
   - Read the target file's existing headings before inserting; use its headings and the resolved template shape for section placement.
   - If candidate nodes still conflict, ask the user before writing.
   - After any schema-derived rename, numbering update, or move, rerun the same path invariant checks: expected file exists, old candidate paths have no files, empty old directories are removed or explicitly reported, and any route or index metadata still points at the concrete expected slug or path.
8. Use the optional base skill's rules for all domain-specific navigation, search, file creation, edits, deletes, and citations when configured; otherwise keep all such operations under `root`. The selected base `root` and resolved schemas remain the source of truth for paths and structure.
9. Keep the final response concise: name the base, the knowledge base, what changed or what was found, and cite touched files when local-file citations are required. For nontrivial schema routing, root-correctness questions, or any path repair, report the selected base root, the concrete written file, and the schema node separately so base-root selection is auditable.

## Protected Sections

Existing knowledge files may contain user-owned sections. Before editing any existing Markdown file, search for `## Manual Notes` and preservation text such as `[keep this for the user to add notes. do not change between edits]`.

When a protected manual-notes section exists:

- Treat the section body as user-owned content.
- Do not modify, reflow, move, remove, or append inside it unless the user explicitly asks to edit manual notes.
- Put status, checklist, implementation, review, and changelog updates outside that section.
- After editing, verify the diff does not touch that section. If it does, revert only that part before handoff.

## Specy Ending Sections

When creating or updating Markdown knowledge notes, apply the `../specy/SKILL.md` Required Ending Sections contract unless the selected schema template explicitly specifies a different changelog shape.

- Ensure each revised note ends with `## Manual Notes` followed by the exact preservation marker, then `## Changelog`.
- If the note already has `## Manual Notes`, preserve that section body byte-for-byte and place changelog edits outside it.
- Append one concise changelog entry for each `$mem` write in this shape: `- YYYY-MM-DD HH:MM: description of update (agent session id - current git sha)`.
- Use the current local date and time to the minute. Resolve the active session id with `../dev.llm-session/SKILL.md`; prefer the active thread/session id when available and do not leave placeholders such as `[agent session id]` or `[codex session id]`.
- Use the current git SHA for the repository or worktree that owns the knowledge note when available. If the note is outside a git worktree, write `no-git-sha` rather than inventing a value.

## Finding Knowledge Bases

Treat the knowledge-base argument as either a file-like target or a search query:

- If it looks like a path, title, or exact knowledge base name, search under the selected base root for a matching file before creating anything.
- If it is broad or ambiguous, search filenames first, then headings and body text.
- Prefer updating an existing knowledge base over creating a near-duplicate.
- If creating a new knowledge base, follow the optional selected base skill's file rules when configured and the resolved `$schema` definitions' naming, placement, frontmatter, and structure conventions.
- Create only the specific knowledge file needed for the request. Avoid schema scaffold generation that leaves placeholder files such as default navfiles, architecture docs, specs, recipes, or vendor docs.

## Adding Knowledge

When adding a finding:

- Preserve the knowledge base's existing format and organization.
- Choose the schema node before writing, then shape new or updated content according to the resolved `$schema` definitions.
- If another invoked skill proposes a default structure or template, treat that as content guidance only. The selected `$mem` schema node still owns the destination path and the required document shape.
- When the selected file does not exist, create that file directly from the selected node's expected template/sections. Do not initialize the rest of the schema around it.
- If the selected node is a sidecar under an existing folder-based unit, preserve the unit's required primary file. For example, adding `ag-dir-v2/reports/{{report}}` under `specs/{NN}-{slug}/` must leave `spec.md` present and authoritative for that spec folder.
- After writing, verify the schema-path invariants: the expected file exists, any wrong-path sibling is absent or intentionally left alone, empty wrong-path directories from this operation are removed or reported, and route or index metadata points at the expected concrete slug or path.
- Add the smallest durable note that will be useful later.
- Include source context when available: originating file, command, log, PR, conversation, date, or rationale.
- Avoid duplicating existing knowledge; merge with or refine the existing entry when the same point is already present.
- Do not add speculative claims as facts. Label uncertainty directly.

## Folder-Based Schema Example

When the selected base uses a folder-based schema such as `ag-dir-v2` and the user says "put this report under spec 30":

1. Resolve `spec 30` to the existing folder under the selected base root, for example `specs/30-crabshell-research/`.
2. Confirm the primary spec file exists or create/repair it if the schema requires it (`spec.md` for `ag-dir-v2`).
3. Choose the sidecar node `reports/{{report}}` for the requested artifact.
4. Write the concrete report file under that folder, for example `specs/30-crabshell-research/reports/open-shell.md`.
5. Use the report node's template/sections, not another skill's default research template, unless the existing file already has a stable user-owned format that you are preserving.

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
- Invalid config: report the `./scripts/load_config.py` error and stop before making changes.
- Missing base root: report the configured path and stop before making changes.
- Missing configured skill: report the missing skill name and stop before any read or write under that base. If no skill is configured, continue using normal file/search tools constrained to `root`.
- Missing or unresolvable configured schemas: report the schema names and stop before any read or write under that base.
