# Feature Spec: Create docs-audit-v2 Skill and CLI

**Date:** 2026-05-13
**Status:** Planning

---

## Goal and Scope

### Goal
Create a public `docs-audit-v2` skill and CLI for block-by-block, line-by-line
documentation rewrite audits. The new workflow should start from first
principles, use JSON as the canonical audit artifact, and render both a detailed
Markdown report and a single-page HTML review UI from that JSON.

### In Scope
- Add a new public skill under `active/docs-audit-v2`.
- Add a reusable CLI for source/destination Markdown inventory, mapping
  hydration, validation, Markdown report rendering, and HTML viewer rendering.
- Add a schema for source docs, destination docs, Markdown blocks, physical
  source lines, block-scoped mappings, line-level destination mappings,
  validation findings, and viewer metadata.
- Rebuild the useful viewer behavior from the current OpenClaw audit viewer
  without carrying over its table-first data model.
- Document the contract a docs refactor skill should follow when it authors JSON
  mappings during a rewrite and hands them to the audit CLI.
- Add automated tests for the new CLI and schema behavior.
- Update the public skills README/index surfaces required by this repo when
  adding a skill.

### Out of Scope
- Migrating existing OpenClaw audit JSON or reports into the new schema.
- Replacing the repo-local OpenClaw `openclaw-docs-audit` skill in the first
  implementation.
- Patching repo-specific refactor skills such as OpenClaw
  `openclaw-refactor-docs`; this spec creates the reusable integration contract
  they can adopt later.
- Making the CLI depend on OpenClaw-specific docs, `.mem` paths, or git refs.
- Building a hosted web app or local web server. The first version renders a
  self-contained static HTML file; reviewers can open it directly or serve the
  output directory with an existing generic file server.
- Fully automating semantic equivalence. The CLI can generate candidates, but
  final coverage mappings require human or LLM-authored justification.
- Claim-level IDs and claim extraction. V1 maps physical source lines; a later
  schema version can add claim IDs if line-level mappings are not enough.

---

## Context

### Background
The OpenClaw plugin-docs migration exposed failure modes in the current audit
workflow: table-first reports made JSON a derived artifact, broad destination
blocks were sometimes treated as proof, line-level facts hid inside broad block
mappings, and viewer diffs could imply changed coverage where a destination file
was only a related unchanged reference. The new public skill should generalize
the useful parts while avoiding OpenClaw-specific assumptions.

### Current State
- The reusable skill source tree for public skills is `active/`; runtime mirrors
  under `~/.codex/skills` are not the editable source of truth.
- The existing OpenClaw local skill has one large script and a static HTML
  template. It supports source/destination previews, block mode, doc mode, diff
  rendering, URL fragment persistence, search, wrap controls, and validation
  warnings, but the data model evolved through several patches.
- The current OpenClaw audit data is schema-v3 JSON generated from a prior
  detailed Markdown table. It has line destination ranges and required
  justifications, but the table-first origin still makes some mappings fragile.
- The skills repo requires tests for new or modified scripts under `scripts/`
  and requires README updates when a skill is added or significantly changed.

### Context
- [../../../active/sc/SKILL.md](../../../active/sc/SKILL.md): Public skill
  creation rules, editable source root, packaging flow, and constraints on
  skill contents.
- [../../../active/sc/scripts/init_skill.py](../../../active/sc/scripts/init_skill.py):
  Preferred skill scaffold entrypoint for public skills.
- [../../../active/sc/scripts/package_skill.py](../../../active/sc/scripts/package_skill.py):
  Packaging and validation command to run after the skill is implemented.
- [../../../active/audit/SKILL.md](../../../active/audit/SKILL.md): Existing
  public audit skill to avoid naming or trigger ambiguity with code-quality
  audits.
- [../../../README.md](../../../README.md): Public skill index that must be
  updated when adding `docs-audit-v2`.
- `OpenClaw local reference`: `code/openclaw/.agents/skills/openclaw-docs-audit`
  in the developer's local checkout. Use as design input only; do not copy
  OpenClaw-specific paths or contracts into the public skill.

### Constraints
- The skill must live in the public source tree, not a runtime-installed mirror.
- The skill body should stay lean. Put schema details, CLI reference, and viewer
  details in bundled references or scripts where appropriate.
- The canonical audit artifact must be JSON. Markdown reports and HTML viewer
  files are render outputs.
- CLI behavior must be deterministic where it touches source parsing, hydration,
  validation, rendering, and stale-line checks.
- Semantic mapping can be assisted but must not be silently trusted without
  required justifications.
- File links in repo docs must be relative, not machine-local absolute paths.

---

## Approach and Touchpoints

### Proposed Approach
Create `active/docs-audit-v2` as a public skill with:

- `SKILL.md`: short router/workflow instructions.
- `references/schema.md`: canonical audit JSON schema and field semantics.
- `references/workflow.md`: step-by-step audit workflow for agents.
- `references/refactor-integration.md`: contract for refactor skills that
  generate mappings while rewriting docs.
- `references/viewer.md`: viewer behavior and interaction contract.
- `scripts/docs-audit-v2.mjs`: CLI entrypoint.
- `scripts/tests/`: automated tests for inventory parsing, hydration,
  validation, and rendering.
- `assets/audit-viewer.html`: static HTML template used by `render`.

The CLI should expose a JSON-first pipeline:

1. `scaffold`: read source docs and destination docs, parse Markdown blocks,
   assign stable block/line IDs, and write a draft JSON audit.
2. `add-dest`: append newly created destination docs to an existing audit
   inventory without renumbering source docs or existing destination docs.
3. `map`: accept authored mappings or merge mapping patches into the JSON.
   The CLI may also emit candidate mappings, but candidates are not final proof.
4. `hydrate`: refresh source/destination line text, block text, changed-file
   metadata, and generated-line metadata from current files.
5. `validate`: enforce schema rules, stale-line checks, coverage invariants,
   and weak-mapping warnings.
6. `render`: render the detailed Markdown report and self-contained HTML viewer
   from the JSON.

Ownership boundary:

- `docs-audit-v2` owns the generic audit data model, CLI, validation, Markdown
  report rendering, and HTML viewer.
- A docs refactor skill owns the rewrite workflow: choosing source pages,
  planning destination pages, editing docs, and authoring the mapping decisions
  as content moves.
- For OpenClaw, a future update to the repo-local `openclaw-refactor-docs`
  skill should invoke `docs-audit-v2` for substantial rewrites instead of
  reimplementing audit storage or viewer behavior.
- The first public skill implementation must include a reusable integration
  reference so repo-specific refactor skills can adopt the workflow without
  copying schema or CLI details into their own instructions.
- The audit skill should not become a refactor skill. It can be used after a
  rewrite to audit existing changes, or during a rewrite by a refactor skill as
  the preservation ledger.

Refactor skills should invoke this audit workflow when any of these are true:

- The user asks for an audit, preservation proof, migration map, moved-section
  checklist, or line-by-line coverage.
- The rewrite removes, shortens, or reorganizes substantial sections.
- Content moves across multiple docs pages.
- New destination docs or generated docs are introduced.
- The source page contains behavior-sensitive facts such as commands, config,
  defaults, safety rules, lifecycle behavior, permissions, or troubleshooting.
- The source page is large enough that manual compare is likely to miss facts.

Agent workflow for a refactor-backed audit:

1. Resolve the source ref before editing. For git-backed docs, this is usually
   the commit or branch that represents the pre-refactor source.
2. Identify source docs explicitly from the requested refactor scope.
3. Identify candidate destination docs from the refactor plan before editing.
   Include the original page if it remains, any pages expected to receive moved
   content, generated pages when they own moved content, and any new pages the
   refactor creates.
4. Run `scaffold` with explicit `--source` and `--dest` lists. Do not treat all
   changed Markdown files as destinations by default.
5. If a planned destination page does not exist yet, either create a minimal
   destination stub before `scaffold` or add it later with `add-dest` after the
   file exists.
6. During the rewrite, keep a mapping patch with one mapping object per source
   block. Each mapping object must include a `mapping[]` row for every
   non-formatting source line in that block, whether the line maps to one
   destination, multiple destinations, or an explicit removal/no-destination
   decision.
7. After editing, compare the explicit destination list with changed Markdown
   files from `git diff --name-only <base> -- '*.md' '*.mdx'`. Add changed docs
   to the audit only when they plausibly contain moved or retained source
   content; ignore unrelated changed docs. Use `add-dest` for any newly
   accepted destination file not present in the scaffolded audit.
8. Run `map`, then `hydrate`, then `validate --out`.
9. Fix missing, stale, weak, or over-broad mappings until validation has no
   errors. Warnings must be either resolved or explicitly accepted in the final
   audit report.
10. Run `render` against the validated JSON to produce the detailed Markdown
    report and HTML viewer.
11. Include the audit artifacts in the refactor handoff so reviewers can inspect
    source and destination coverage.

Refactor-owned audit artifacts:

- Draft audit JSON: `.audit/<slug>/audit.json`, or a caller-provided output path.
- Mapping patch while editing: `.audit/<slug>/mapping-patch.json`.
- Hydrated audit JSON: `.audit/<slug>/audit.hydrated.json`.
- Validated audit JSON: `.audit/<slug>/audit.validated.json`.
- Detailed Markdown report: `.audit/<slug>/audit.md`.
- HTML viewer: `.audit/<slug>/audit.html`.

The refactor skill owns `mapping-patch.json` while editing. It may be partial
during the rewrite, but it is final only when every non-formatting source line
has a `mapping[]` row and `validate` reports no errors.
The final refactor handoff must list the hydrated JSON, validated JSON,
Markdown report, HTML viewer, unresolved warnings if any, and the exact
validation command output.
A refactor skill should treat the mapping patch as a draft until validation has
no errors. Draft patches may leave mappings incomplete; final handoffs may not.
Accepted warnings are allowed only when the warning is not a preservation gap.
The final handoff must include the accepted warning code, affected source IDs,
and reviewer-facing justification.

First-version CLI contract:

| Command | Required args | Optional args | Reads | Writes | Exit behavior |
| --- | --- | --- | --- | --- | --- |
| `scaffold` | `--source <path[,path...]>`, `--dest <path[,path...]>`, `--out <audit.json>` | `--base <git-ref>`, `--cwd <repo-root>`, `--force` | source docs from `--base` when provided, otherwise current files; destination docs from current files | new audit JSON at `--out`; fails if it exists unless `--force` is set | `0` on write; non-zero with stderr summary when an input is missing, JSON cannot be written, or `--out` exists without `--force` |
| `add-dest` | `--data <audit.json>`, `--dest <path[,path...]>`, `--out <audit.json>` | `--cwd <repo-root>`, `--force` | existing audit JSON and current destination docs | audit JSON with appended destination docs and stable new `D{n}` IDs | `0` when all new destination docs are appended; non-zero when a destination is missing, already present, or output would overwrite without `--force` |
| `map` | `--data <audit.json>`, `--patch <mapping-patch.json>`, `--out <audit.json>` | `--cwd <repo-root>`, `--force` | existing audit JSON and mapping patch JSON | merged audit JSON | `0` when patch applies cleanly; non-zero when ids are unknown, required mapping fields are missing, or output would overwrite without `--force` |
| `hydrate` | `--data <audit.json>`, `--out <audit.json>` | `--base <git-ref>`, `--cwd <repo-root>`, `--force` | audit JSON, source docs from stored doc/audit base refs, destination docs from current files, optional base override | refreshed audit JSON with current line text and changed-file metadata | `0` when every referenced local file/range resolves; non-zero for stale missing files or invalid refs |
| `validate` | `--data <audit.json>` | `--cwd <repo-root>`, `--changed-only`, `--diff-base <git-ref>`, `--json`, `--out <audit.json>`, `--force` | audit JSON and current files | stdout validation summary, optionally JSON stdout, and optionally audit JSON with refreshed `validation` findings | `0` with no errors; `1` when errors exist; warnings alone do not fail unless a later `--strict` option is added |
| `render` | `--data <audit.json>` | `--html-out <viewer.html>`, `--md-out <report.md>`, `--force` | validated audit JSON and viewer template | HTML and/or Markdown outputs; at least one output flag is required | `0` on render; non-zero for invalid JSON, missing template, no outputs, or overwrite without `--force` |

CLI rules:

- Default `--cwd` is `process.cwd()`.
- All relative input and output paths resolve against `--cwd`.
- Commands write machine-readable progress summaries to stdout and actionable
  errors to stderr.
- Commands that write files are idempotent for identical inputs and fail before
  overwriting existing files unless `--force` is set.
- Commands create missing output parent directories before writing files.
- `add-dest`, `hydrate`, `validate`, and `render` must not renumber existing
  doc, block, line, destination, or mapping IDs.
- `validate --out` writes only refreshed `validation` findings and audit update
  metadata; it must not mutate docs, lines, mappings, or destination entries.
- `add-dest` assigns new destination doc IDs after the current maximum
  destination ID, preserving existing `D{n}` IDs even when destination file
  order changes.
- `map` only merges authored mapping data. It may later grow candidate
  generation, but V1 does not need a semantic matcher.
- `hydrate` source docs from `sourceDocs[].baseRef` when present, then
  `audit.baseRef`, then current files only when no base ref exists. Destination
  docs always hydrate from current files. A `--base` value overrides
  `audit.baseRef` only for this command run and should be written back only when
  paired with an explicit future option, not in V1.

### Integration Points / Touchpoints
- [../../../active/docs-audit-v2/SKILL.md](../../../active/docs-audit-v2/SKILL.md)
  - new public skill entrypoint and trigger guidance.
- [../../../active/docs-audit-v2/references/schema.md](../../../active/docs-audit-v2/references/schema.md)
  - schema reference for source docs, destination docs, blocks, lines,
    block mappings, line-level destination entries, validation findings, and
    viewer metadata.
- [../../../active/docs-audit-v2/references/workflow.md](../../../active/docs-audit-v2/references/workflow.md)
  - audit workflow for agents using the skill.
- [../../../active/docs-audit-v2/references/refactor-integration.md](../../../active/docs-audit-v2/references/refactor-integration.md)
  - invocation criteria, artifact paths, command sequence, draft/final patch
    states, and handoff checklist for docs refactor skills.
- [../../../active/docs-audit-v2/references/viewer.md](../../../active/docs-audit-v2/references/viewer.md)
  - viewer UX and rendering contract.
- [../../../active/docs-audit-v2/scripts/docs-audit-v2.mjs](../../../active/docs-audit-v2/scripts/docs-audit-v2.mjs)
  - deterministic CLI entrypoint.
- [../../../active/docs-audit-v2/scripts/tests/](../../../active/docs-audit-v2/scripts/tests/)
  - CLI and schema tests required by the repo script-testing rule.
- [../../../active/docs-audit-v2/assets/audit-viewer.html](../../../active/docs-audit-v2/assets/audit-viewer.html)
  - static viewer template.
- [../../../README.md](../../../README.md)
  - public skill listing update.

### Resolved Ambiguities / Decisions
- The public skill name should be `docs-audit-v2`, not
  `openclaw-docs-audit-v2`, because the new skill is intended for reusable
  documentation audits outside OpenClaw.
- JSON is the canonical audit artifact. Markdown detailed reports are rendered
  from JSON, not parsed into JSON as the primary workflow.
- "Line element" means a physical Markdown source line inside a parsed Markdown
  block, not a Markdown AST node.
- Use page-scoped stable IDs such as `S1.B001`, `S1.B001.L001`, `D2.B014`, and
  `D2.B014.L003` instead of ambiguous `1.1` IDs.
- Model mappings as first-class block-scoped objects: each source block gets one
  stable mapping ID, and its `mapping[]` entries describe every source-line to
  destination mapping. This keeps reviewer navigation block-oriented while still
  proving line-level coverage.
- Use `justification` as the canonical free-text explanation. Do not introduce
  `notes` or `detailed_reason` aliases in the V2 schema.
- Use `status` for audit result and `confidence` for trust level. Do not
  overload status with reviewer confidence.
- Do not add claim IDs in V1. A line with multiple independent behavior facts
  must use line-level destination mappings and justification to explain how the
  facts are preserved or intentionally removed; claim IDs can be added in a
  later schema if this proves insufficient.
- Use a dependency-free Node.js CLI for the first version. The Markdown block
  inventory parser should be a small deterministic line scanner that preserves
  physical line numbers for frontmatter, headings, paragraphs, lists, tables,
  code fences, MDX/admonition blocks, and link blocks. Do not introduce a parser
  dependency unless tests prove the line scanner cannot represent required
  block spans.
- `serve` is out of scope for V1. The viewer is a self-contained HTML file.
- Destination docs are explicit inputs. A changed-file scan is only a
  reconciliation check after editing, not an automatic destination-discovery
  mechanism.

### Stable ID Rules

- `scaffold` assigns source doc IDs in the exact order of `--source` and
  destination doc IDs in the exact order of `--dest`.
- Within each doc, block IDs are assigned in physical source order:
  `S1.B001`, `S1.B002`, `D1.B001`, and so on.
- Line IDs are assigned within their parent block in physical line order:
  `S1.B001.L001`, `S1.B001.L002`, and so on.
- Mapping IDs are assigned in source block traversal order: `M001` for the first
  mapped source block, `M002` for the second mapped source block, and so on.
- Destination entries inside `mapping[].dest[]` do not need separate IDs in V1.
  They are addressed by their parent mapping ID plus `mapping[].sourceId` and
  destination array index.
- `add-dest`, `hydrate`, `map`, `validate`, and `render` preserve existing IDs
  exactly. They may update line text and range metadata, but they must not
  renumber existing docs, blocks, lines, or mappings.
- If a user changes the input file list order and reruns `scaffold`, the new
  output is a new inventory. The CLI does not try to reconcile reordered file
  lists with an existing audit.
- If source or destination docs change after scaffolding, `hydrate` reports
  stale or missing ranges instead of silently reassigning IDs. A future
  explicit rebase command can be considered after V1 if needed.

### Schema Contract

V1 audit JSON uses `schemaVersion: 1` for this public skill:

```json
{
  "schemaVersion": 1,
  "audit": {
    "id": "docs-audit-v2-fixture",
    "title": "Docs Audit",
    "baseRef": "HEAD~1",
    "createdAt": "2026-05-13T00:00:00.000Z",
    "updatedAt": "2026-05-13T00:00:00.000Z"
  },
  "sourceDocs": [],
  "destDocs": [],
  "mappings": [],
  "validation": { "errors": [], "warnings": [], "acceptedWarnings": [] }
}
```

Validation finding objects:

```json
{
  "severity": "error",
  "code": "unmapped-source-line",
  "message": "S1.B002.L003 is material source content but is not mapped.",
  "sourceIds": ["S1.B002.L003"],
  "destinationIds": [],
  "ranges": [
    {
      "path": "docs/source.md",
      "startLine": 18,
      "endLine": 18
    }
  ],
  "suggestion": "Add a line-level mapping entry or mark the content intentionally removed."
}
```

Allowed finding `severity` values are `error` and `warning`. Persisted
`validation.errors[]`, persisted `validation.warnings[]`, and `validate --json`
stdout must use this same object shape. `validation.errors[]` may only contain
`severity: "error"` findings; `validation.warnings[]` may only contain
`severity: "warning"` findings.

Accepted warning objects use the same finding shape plus:

```json
{
  "acceptedJustification": "This unchanged reference destination is intentionally not a diff because the destination page was not edited in this refactor."
}
```

`validation.acceptedWarnings[]` may only contain warnings. Accepted warnings do
not hide errors and must not be used for unmapped source material, stale exact
ranges, missing justifications, or covered source lines without exact
destination mappings.

Validation severity rules:

| Finding code | Severity | When emitted |
| --- | --- | --- |
| `unmapped-source-line` | error | A non-formatting source line has no line-level mapping row and no explicit removal decision. |
| `unknown-id` | error | A mapping, destination entry, or accepted warning references an unknown source/destination/mapping ID. |
| `missing-justification` | error | A final mapping, destination entry, removal, or accepted warning lacks reviewer-facing justification. |
| `stale-source-range` | error | A stored source line/range no longer matches the configured source ref. |
| `stale-destination-range` | error | A mapped destination range no longer matches current destination file text. |
| `missing-destination` | error | A `covered`, `partially-covered`, `redundant`, or `generated-source` source-line mapping has no required destination. |
| `covered-block-fallback-only` | error | A material `covered` source-line mapping uses only broad block fallback with no exact line destination. |
| `weak-block-fallback` | warning | A non-final or partial mapping uses broad block fallback and needs reviewer attention. |
| `unchanged-reference-destination` | warning | A mapping references an unchanged destination page, so the viewer should show related-reference mode instead of a diff. |
| `low-confidence-mapping` | warning | A mapping has low confidence or appears semantically weak but is not structurally invalid. |

Document objects:

```json
{
  "id": "S1",
  "role": "source",
  "path": "docs/source.md",
  "baseRef": "HEAD~1",
  "changedSinceBase": true,
  "blocks": []
}
```

Block objects:

```json
{
  "id": "S1.B001",
  "kind": "paragraph",
  "path": "docs/source.md",
  "startLine": 10,
  "endLine": 12,
  "lines": []
}
```

Allowed `kind` values are `frontmatter`, `heading`, `paragraph`, `list`,
`table`, `code`, `mdx`, `admonition`, `link-block`, and `blank`.

Line objects:

```json
{
  "id": "S1.B001.L001",
  "path": "docs/source.md",
  "line": 10,
  "columnStart": 1,
  "columnEnd": 72,
  "text": "Original line text."
}
```

Mapping objects:

```json
{
  "id": "M001",
  "summary": "Setup title and commands were merged into the new setup intro.",
  "source": {
    "docId": "S1",
    "blockIds": ["S1.B001"],
    "lineIds": ["S1.B001.L001", "S1.B001.L002", "S1.B001.L003"]
  },
  "action": "merged",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination keeps the widget setup topic, package install instruction, and login command in a shorter intro.",
  "mapping": [
    {
      "sourceId": "S1.B001.L001",
      "dest": [
        {
          "docId": "D1",
          "blockIds": ["D1.B001"],
          "lineIds": ["D1.B001.L001", "D1.B001.L002"],
          "range": { "path": "dest.md", "startLine": 1, "endLine": 2 },
          "mappingKind": "semantic-confirmed",
          "changedSinceBase": true,
          "justification": "Line 2 combines the install and login commands while line 1 keeps the setup topic."
        }
      ]
    },
    {
      "sourceId": "S1.B001.L002",
      "dest": [
        {
          "docId": "D1",
          "blockIds": ["D1.B001"],
          "lineIds": ["D1.B001.L002"],
          "range": { "path": "dest.md", "startLine": 2, "endLine": 2 },
          "mappingKind": "semantic-confirmed",
          "changedSinceBase": true,
          "justification": "The install command is preserved in the combined setup sentence."
        }
      ]
    }
  ]
}
```

Line-level destination objects:

```json
{
  "docId": "D1",
  "blockIds": ["D1.B003"],
  "lineIds": ["D1.B003.L001", "D1.B003.L002"],
  "range": {
    "path": "docs/dest.md",
    "startLine": 20,
    "endLine": 21
  },
  "mappingKind": "semantic-confirmed",
  "changedSinceBase": true,
  "justification": "Why these destination lines preserve the source."
}
```

Generated destination entries add:

```json
{
  "generated": true,
  "generator": {
    "path": "scripts/generate-docs.mjs",
    "startLine": 40,
    "endLine": 55
  }
}
```

External-only destination entries use:

```json
{
  "external": true,
  "label": "external source; no repo line"
}
```

Allowed `action` values: `retained`, `paraphrase`, `moved`, `split`, `merged`,
`removed`.

Allowed `reason` values: `same-scope`, `redundant`, `verbose`,
`mis-categorized`, `generated-source`, `obsolete`, `unsupported`,
`duplicate-linking`, `nav-only`.

Allowed `status` values: `covered`, `partially-covered`, `missing`,
`intentionally-removed`, `needs-source-check`.

Allowed `confidence` values: `high`, `medium`, `low`.

Allowed `mappingKind` values: `exact-line`, `semantic-confirmed`,
`generated-source`, `external-reference`, `block-fallback`.

Schema invariants:

- Every mapping must represent exactly one source block in V1. `source.blockIds`
  must contain one block ID, and `source.lineIds` must contain the physical lines
  in that block that the mapping accounts for.
- Every mapping must have a non-empty `summary`, `action`, `reason`, `status`,
  `confidence`, `justification`, and `mapping[]`.
- Every `mapping[]` row must have a `sourceId` from `source.lineIds` and a `dest`
  array. `dest` may be empty only when the row is intentionally removed or
  missing and the parent mapping explains why in `justification`.
- Every non-formatting source line must be accounted for by exactly one
  block-scoped mapping object and at least one `mapping[]` row. Terminal statuses
  are `covered`, `partially-covered`, `missing`, `intentionally-removed`, and
  `needs-source-check`; they are terminal because the audit explicitly accounts
  for the line instead of omitting it.
- Formatting-only source lines are blank lines, fence delimiter-only lines,
  table separator lines, frontmatter delimiter-only lines, MDX wrapper-only
  open/close lines, and list/table continuation lines with no material prose,
  command, field, link, or value. Formatting-only lines may remain unmapped.
- `covered` line mappings must have at least one destination entry unless the
  source line is formatting-only.
- `partially-covered` and `missing` mappings must explain the gap in
  `justification`.
- `intentionally-removed` mappings require no destination only for `obsolete`,
  `unsupported`, `duplicate-linking`, or `nav-only`.
- `redundant` and `generated-source` removals require a surviving destination
  entry.
- `block-fallback` destination entries are never sufficient as the only
  destination for a material `covered` source line; validation must report an
  error.
- `validate` must emit an `unmapped-source-line` error when a non-formatting
  source line has no `mapping[]` row.

Mapping patch JSON:

```json
{
  "schemaVersion": 1,
  "status": "draft",
  "mappings": [
    {
      "id": "M001",
      "summary": "Preserve the selected slot force-enable rule.",
      "source": {
        "docId": "S1",
        "blockIds": ["S1.B012"],
        "lineIds": ["S1.B012.L001", "S1.B012.L002", "S1.B012.L003"]
      },
      "action": "paraphrase",
      "reason": "same-scope",
      "status": "covered",
      "confidence": "high",
      "justification": "The destination explicitly states that slot selection force-enables the selected plugin while preserving deny and disabled-entry blockers.",
      "mapping": [
        {
          "sourceId": "S1.B012.L003",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B004"],
              "lineIds": ["D1.B004.L002", "D1.B004.L003"],
              "range": {
                "path": "docs/dest.md",
                "startLine": 42,
                "endLine": 43
              },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "These destination lines preserve the force-enable behavior and blocker exceptions."
            }
          ]
        }
      ]
    }
  ],
  "acceptedWarnings": []
}
```

Patch merge rules:

- `map` matches mappings by `id`.
- Patch `status` is `draft` or `final`. `draft` patches may be incomplete and
  are useful during refactor editing. `final` patches must pass validation with
  no errors before they can be handed off.
- A patch mapping with a new `id` is appended to `mappings[]`.
- A patch mapping with an existing `id` replaces that mapping atomically after
  validation.
- Duplicate mapping IDs, unknown source IDs, unknown destination IDs, duplicate
  `mapping[].sourceId` rows inside one mapping, and destination entries that
  point outside known destination docs are errors.
- Patch `acceptedWarnings[]` entries match validation findings by `code`,
  `sourceIds`, `destinationIds`, and `ranges`. Each accepted warning must include
  an `acceptedJustification`.
- V1 patches do not delete mappings. A later command can add explicit deletion
  if reviewers need it.
- File renames and newly created destination pages are represented by adding the
  current destination path to `destDocs[]` with `add-dest`; mapping destination
  entries should then reference the new `D{n}` IDs. The CLI does not infer
  renames from git history in V1.
- Split destinations are represented with multiple `dest[]` entries for the
  relevant `mapping[].sourceId` rows when child lines move to different pages.
- Generated destinations must cite both the generated page destination and
  generator file/range when the generator range is available.
- V1 does not model claim IDs. If one physical source line has several important
  facts, its `mapping[].dest[]` justifications must explain which destination
  lines preserve each fact or why a fact was intentionally removed.

### Existing Contract Snapshot

| Surface | Current owner / source of truth | Current fields, states, or shape | Current consumers |
| --- | --- | --- | --- |
| Public skill creation | [../../../active/sc/SKILL.md](../../../active/sc/SKILL.md) | Skill folder under `active/<name>` with `SKILL.md`, optional `scripts/`, `references/`, and `assets/` | Agents creating or packaging public skills |
| Existing public audit trigger | [../../../active/audit/SKILL.md](../../../active/audit/SKILL.md) | Code-quality repository audit skill | Agents choosing whether `audit` or `docs-audit-v2` applies |
| Local OpenClaw audit viewer | OpenClaw local `openclaw-docs-audit` skill | One script, static viewer template, JSON generated from detailed report tables | OpenClaw plugin-docs migration review |
| Skills repo script validation rule | [../../../AGENTS.md](../../../AGENTS.md) | New or modified scripts need nearby automated tests and passing test runs | Any implementation touching `scripts/` |

### Destination Decision Table

| Input facts / state | Destination output | Notes |
| --- | --- | --- |
| Source doc line has equivalent destination text in one changed destination file | Block mapping with a `mapping[]` row for the source line, exact destination line IDs, `status: covered`, and high-confidence justification | Viewer renders a diff against the changed destination |
| Source doc line maps to an unchanged reference page | Mapping remains valid but destination renders as related reference, not a diff | Prevents misleading diffs for unchanged files |
| Source line contains multiple independent facts | The source line has one `mapping[]` row whose destination entries and justification enumerate the preserved facts | Prevents a broad covered line from hiding a missing fact without adding claim IDs in V1 |
| Source block maps broadly but no exact line destination exists | Error for `covered`; warning for non-final, partial, or needs-review states | Broad fallback cannot be final proof for covered material facts |
| Source content was removed as obsolete or unsupported | Mapping has `action: removed`, `status: intentionally-removed`, and justification; no destination required for removed source rows | Removal is explicit and reviewable |
| Source content was removed as redundant or generated-source | Mapping has preserved destination or generator destination entry | Equivalent surviving content is required |
| Destination range line numbers drift after edits | `validate` emits stale destination findings with suggested current range when possible | Avoids stale JSON after doc edits |
| Generated destination owns preserved content | Mapping cites generated page and generator file/range when available | Avoids hand-editing generated docs |

### Minimal Model Check
- New fields/types/states:
  - `sourceDocs[]`, `destDocs[]`, `blocks[]`, `lines[]`, `mappings[]`,
    `mapping[].dest[]`, `validation.errors[]`, `validation.warnings[]`,
    `validation.acceptedWarnings[]`.
  - Stable IDs: `S{n}.B{nnn}`, `S{n}.B{nnn}.L{nnn}`, `D{n}.B{nnn}`,
    `D{n}.B{nnn}.L{nnn}`.
  - Mapping fields: `action`, `reason`, `status`, `confidence`,
    `justification`, `mapping[]`.
  - Line-level destination fields: `docId`, `blockIds`, `lineIds`, `range`,
    `mappingKind`, `changedSinceBase`, `justification`.
- Existing fields/types reused:
  - Existing action/reason/status values from the current OpenClaw audit
    workflow are reused exactly as enumerated in this spec.
- Derived values intentionally not stored:
  - Rendered Markdown and HTML output are generated artifacts, not canonical
    data.
  - Diff hunks are render-time output derived from source and destination lines.
- Consumers for each new field/type/state:
  - CLI validation consumes mappings, line IDs, destination entries, status,
    confidence, and
    justification.
  - Markdown report renderer consumes source docs, mappings, statuses, and
    justifications.
  - HTML viewer consumes docs, blocks, lines, mappings, line-level destinations,
    changed flags, and validation findings.
- Simpler alternative considered:
  - A Markdown-table-first report was rejected because it made line mappings too
    fragile.

---

## Acceptance Criteria

- [ ] `docs-audit-v2` exists as a public skill under `active/docs-audit-v2`
  with a lean `SKILL.md`, bundled references, script assets, and tests.
- [ ] The CLI can scaffold source and destination Markdown inventories into
  canonical JSON with stable doc, block, and line IDs.
- [ ] The schema supports one stable mapping ID per source block plus
  line-level `mapping[]` rows from source lines to destination entries, with
  required `justification` for final mappings.
- [ ] The schema supports accepted warnings with required justification while
  preserving errors as non-acceptable blockers.
- [ ] The CLI validates required coverage, stale ranges, missing
  justifications, generated-source destinations, weak broad fallbacks, and
  changed-file/reference rendering metadata.
- [ ] `validate --out` persists the same validation findings that `render`
  consumes, so reports and viewers never scrape terminal output.
- [ ] The CLI can append new destination docs with stable IDs after scaffold
  without renumbering existing audit data.
- [ ] The CLI renders a detailed Markdown report and a self-contained HTML
  viewer from the same JSON without parsing Markdown reports as the canonical
  input.
- [ ] The HTML viewer supports page selection, block mode, doc mode, URL
  fragment persistence, copyable text, horizontal scrolling, wrap toggle,
  source/destination search, diff view, related-reference mode, uncovered-line
  highlighting, and mapping/action/status badges.
- [ ] Tests cover the CLI schema, inventory parsing, validation rules, and
  renderer behavior enough to prevent the known OpenClaw audit regressions.
- [ ] `references/refactor-integration.md` defines when a refactor skill should
  invoke the audit pipeline, how it authors mapping patches, and what artifacts
  it must hand off.
- [ ] Public skill index/docs are updated according to repo conventions.

---

## Phases and Dependencies

### Phase 1: Lock the V2 data model
- [ ] Implement the `schemaVersion: 1` schema defined in this spec, independent
  of the OpenClaw local schema numbering.
- [ ] Write `references/schema.md` with source/destination doc, block, line,
  block mapping, line-level destination, validation, and viewer metadata
  contracts, using the schema contract above as the source of truth.
- [ ] Define JSON fixtures that exercise every allowed action, reason, status,
  confidence, and mapping-kind value.
- [ ] Define generated destination and external-only destination representation.
- [ ] Define stale-line and changed-file metadata semantics.
- [ ] Define accepted-warning semantics and the finding codes that can never be
  accepted.

### Phase 2: Scaffold the skill and CLI shell
- [ ] Use `active/sc/scripts/init_skill.py docs-audit-v2 --path active` to
  create the skill skeleton.
- [ ] Trim generated placeholders and add only needed `references/`, `scripts/`,
  `scripts/tests/`, and `assets/`.
- [ ] Add CLI command parsing for `scaffold`, `add-dest`, `map`, `hydrate`,
  `validate`, and `render`.
- [ ] Add root README/index entry for the new skill.
- [ ] Write `references/refactor-integration.md` with concrete invocation
  criteria, artifact paths, patch states, command sequence, and handoff
  checklist.

### Phase 3: Implement inventory, hydration, and validation
- [ ] Parse Markdown files into block inventories with line spans and stable
  IDs.
- [ ] Hydrate line text and destination metadata from current files.
- [ ] Implement schema validation and audit validation findings.
- [ ] Implement changed-file detection and stale-destination detection.
- [ ] Implement `add-dest` with append-only destination doc IDs.
- [ ] Implement `validate --out` so validation findings are persisted into the
  audit JSON without mutating mapping or inventory IDs.
- [ ] Add automated tests for block/line inventory, mapping validation,
  line-level coverage, stale refs, generated destinations, and broad fallback
  warnings.
- [ ] Add automated tests for accepted warnings, including blocked attempts to
  accept error-class preservation gaps.

### Phase 4: Implement report and viewer rendering
- [ ] Render a normalized detailed Markdown report from JSON.
- [ ] Build the static HTML viewer template around the V2 schema.
- [ ] Support block mode, doc mode, diff/reference rendering, pane search, wrap,
  scroll, URL fragments, and uncovered-line highlights.
- [ ] Render accepted warnings separately from active warnings so reviewers can
  see what was acknowledged.
- [ ] Add renderer tests that inspect generated output for required embedded
  data and UI controls.

### Phase 5: Package and validate the skill
- [ ] Run CLI tests.
- [ ] Run the skill packaging validator for `active/docs-audit-v2`.
- [ ] Package the skill into `dist/` if validation passes.
- [ ] Run a small manual fixture audit end to end: scaffold, add a new
  destination, map sample lines, hydrate, validate, render Markdown, render
  HTML, and open the viewer.

### Phase Dependencies
- Phase 2 depends on Phase 1 schema decisions.
- Phase 3 depends on the CLI shell from Phase 2.
- Phase 4 depends on stable JSON shape from Phase 1 and hydrated data from
  Phase 3.
- Phase 5 depends on Phases 2 through 4.

---

## Validation Plan

Integration tests:
- Scaffold a fixture source doc and destination doc; verify doc/block/line IDs
  are stable and line ranges match physical Markdown lines.
- Append a destination doc with `add-dest`; verify existing destination IDs are
  unchanged and the new doc receives the next stable `D{n}` ID.
- Validate a covered source line with no destination entries fails.
- Validate an unmapped material source line fails with an
  `unmapped-source-line` error.
- Validate formatting-only source lines may remain unmapped.
- Validate a destination entry without `justification` fails.
- Validate a source line with several important facts cannot be fully covered by
  a broad block fallback alone; the line-level mapping justification must account
  for the preserved facts.
- Validate `generated-source` and `redundant` removals require destination or
  generator destinations.
- Validate `obsolete`, `unsupported`, `duplicate-linking`, and `nav-only`
  removals can be intentionally removed without destination entries.
- Validate broad block fallback produces a warning or error when used as the
  only proof for a non-covered material line, and an error when used as the only
  proof for a material covered line.
- Validate changed and unchanged destination files are represented differently
  for viewer rendering.
- Validate stale destination ranges are reported after inserting lines above a
  destination.
- Validate stale destination ranges are errors, not warnings.
- Validate accepted warnings render separately and cannot suppress validation
  errors.
- Render Markdown and HTML from a fixture JSON and assert expected units,
  statuses, badges, search controls, wrap controls, and embedded JSON.
- Validate `--json` output and persisted validation findings use the shared
  finding object shape with `severity`, `code`, `message`, `sourceIds`,
  `destinationIds`, `ranges`, and optional `suggestion`.
- Validate `--out` persists the same findings later consumed by `render`.

Manual validation:
- Run a small end-to-end audit against two local Markdown fixture docs.
- Open the generated HTML viewer and verify block mode, doc mode, diff
  rendering, related reference rendering, URL fragments, horizontal scrolling,
  wrap toggle, and pane search.
- Package the skill with `active/sc/scripts/package_skill.py` and confirm the
  package includes the intended scripts, references, and assets.

Proof commands:

```bash
rm -rf /tmp/docs-audit-v2
mkdir -p /tmp/docs-audit-v2
node active/docs-audit-v2/scripts/tests/run-tests.mjs
node active/docs-audit-v2/scripts/docs-audit-v2.mjs scaffold \
  --source active/docs-audit-v2/scripts/tests/fixtures/source.md \
  --dest active/docs-audit-v2/scripts/tests/fixtures/dest.md \
  --out /tmp/docs-audit-v2/audit.json \
  --force
node active/docs-audit-v2/scripts/docs-audit-v2.mjs add-dest \
  --data /tmp/docs-audit-v2/audit.json \
  --dest active/docs-audit-v2/scripts/tests/fixtures/extra-dest.md \
  --out /tmp/docs-audit-v2/audit.with-extra-dest.json \
  --force
node active/docs-audit-v2/scripts/docs-audit-v2.mjs map \
  --data /tmp/docs-audit-v2/audit.with-extra-dest.json \
  --patch active/docs-audit-v2/scripts/tests/fixtures/mapping-patch.json \
  --out /tmp/docs-audit-v2/audit.mapped.json \
  --force
node active/docs-audit-v2/scripts/docs-audit-v2.mjs hydrate \
  --data /tmp/docs-audit-v2/audit.mapped.json \
  --out /tmp/docs-audit-v2/audit.hydrated.json \
  --force
node active/docs-audit-v2/scripts/docs-audit-v2.mjs validate \
  --data /tmp/docs-audit-v2/audit.hydrated.json \
  --out /tmp/docs-audit-v2/audit.validated.json \
  --force
node active/docs-audit-v2/scripts/docs-audit-v2.mjs render \
  --data /tmp/docs-audit-v2/audit.validated.json \
  --md-out /tmp/docs-audit-v2/audit.md \
  --html-out /tmp/docs-audit-v2/audit.html \
  --force
python3 active/sc/scripts/package_skill.py active/docs-audit-v2 dist
git diff --check -- active/docs-audit-v2 README.md docs/specs/active/2026-05-13-docs-audit-v2-skill-cli.md
```

---

## Done Criteria

- [ ] The public skill, CLI, references, assets, tests, and README/index updates
  are complete.
- [ ] The refactor integration reference gives repo-specific refactor skills a
  concrete way to generate JSON mapping patches and hand off to audit validation.
- [ ] Validation results are reviewed and any remaining warnings are documented
  or fixed.
- [ ] The skill packages successfully and the generated package lands in the
  expected `dist/` location.
- [ ] The spec is updated with any implementation decisions that differ from
  this plan.

---

## Open Items and Risks

### Open Items
- [ ] Decide whether `map` should later add JSON Patch support. V1 should start
  with a purpose-built mapping patch format that mirrors `mappings[]`.
- [ ] Decide whether a machine-readable JSON Schema file is needed in addition
  to `references/schema.md`. The V1 implementation can start with validator
  code plus documented schema examples.

### Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
| --- | --- | --- | --- |
| The new schema becomes too large for agents to author reliably | High | Med | Keep `SKILL.md` lean, put schema examples in `references/schema.md`, and provide `scaffold`/`map` helpers |
| Line-level mappings become too repetitive for long blocks | Med | Med | Keep one mapping ID per block, but make `mapping[]` rows compact and allow shared destination ranges when several source lines map to the same destination |
| Broad block mappings are again treated as proof | High | Med | Make broad fallback a validation warning/error, not a covered mapping strategy |
| Markdown parser loses exact physical line ranges | High | Med | Test headings, paragraphs, lists, tables, code fences, frontmatter, MDX/admonitions, and link blocks |
| Viewer drifts from JSON schema | Med | Med | Add renderer tests that assert required controls and consume fixture JSON |
| Public skill overlaps with existing `audit` skill | Med | Low | Name and describe `docs-audit-v2` specifically as documentation rewrite coverage auditing |

### Simplifications and Assumptions
- The first implementation can support Markdown and MDX-like blocks without
  needing a full MDX AST.
- The first version can use local files and git refs; external-only
  destinations are represented as metadata and not fetched.
- Semantic equivalence remains auditor-authored through required
  justifications; deterministic automation only validates structure and obvious
  stale/weak mappings.
- The first version does not include `serve`; generated HTML is opened directly
  or served by an existing generic file server outside the skill.

---

## Appendix: Pipeline Example

This example shows how the same tiny rewrite moves through `scaffold`, `map`,
`hydrate`, `validate`, and `render`.

### Input files

`source.md` before the rewrite:

```markdown
# Widget setup
Install the widget package.
Run `widget login`.

## Troubleshooting
If login fails, refresh the token.
Then run `widget doctor`.
```

`dest.md` after the rewrite:

```markdown
# Configure widgets
Install the widget package and run `widget login`.

## Fix login failures
Refresh the token.
Run `widget doctor`.
```

The source has two blocks with three physical lines each:

- Block 1: title plus two setup lines.
- Block 2: troubleshooting heading plus two recovery lines.

### Step 1: scaffold

`scaffold` only inventories source and destination structure. It does not know
coverage yet.

```bash
node active/docs-audit-v2/scripts/docs-audit-v2.mjs scaffold \
  --source source.md \
  --dest dest.md \
  --out audit.json
```

Draft JSON after scaffold, shortened:

```json
{
  "schemaVersion": 1,
  "sourceDocs": [
    {
      "id": "S1",
      "path": "source.md",
      "blocks": [
        {
          "id": "S1.B001",
          "kind": "paragraph",
          "startLine": 1,
          "endLine": 3,
          "lines": [
            { "id": "S1.B001.L001", "line": 1, "text": "# Widget setup" },
            { "id": "S1.B001.L002", "line": 2, "text": "Install the widget package." },
            { "id": "S1.B001.L003", "line": 3, "text": "Run `widget login`." }
          ]
        },
        {
          "id": "S1.B002",
          "kind": "paragraph",
          "startLine": 5,
          "endLine": 7,
          "lines": [
            { "id": "S1.B002.L001", "line": 5, "text": "## Troubleshooting" },
            { "id": "S1.B002.L002", "line": 6, "text": "If login fails, refresh the token." },
            { "id": "S1.B002.L003", "line": 7, "text": "Then run `widget doctor`." }
          ]
        }
      ]
    }
  ],
  "destDocs": [
    {
      "id": "D1",
      "path": "dest.md",
      "blocks": [
        {
          "id": "D1.B001",
          "startLine": 1,
          "endLine": 2,
          "lines": [
            { "id": "D1.B001.L001", "line": 1, "text": "# Configure widgets" },
            { "id": "D1.B001.L002", "line": 2, "text": "Install the widget package and run `widget login`." }
          ]
        },
        {
          "id": "D1.B002",
          "startLine": 4,
          "endLine": 6,
          "lines": [
            { "id": "D1.B002.L001", "line": 4, "text": "## Fix login failures" },
            { "id": "D1.B002.L002", "line": 5, "text": "Refresh the token." },
            { "id": "D1.B002.L003", "line": 6, "text": "Run `widget doctor`." }
          ]
        }
      ]
    }
  ],
  "mappings": []
}
```

### Step 2: map

`map` merges auditor-authored coverage decisions. In this example, the setup
block is merged into one destination paragraph and the troubleshooting block is
paraphrased into a shorter troubleshooting section.

```json
{
  "schemaVersion": 1,
  "mappings": [
    {
      "id": "M001",
      "summary": "Setup title and commands were merged into the new setup intro.",
      "source": {
        "docId": "S1",
        "blockIds": ["S1.B001"],
        "lineIds": ["S1.B001.L001", "S1.B001.L002", "S1.B001.L003"]
      },
      "action": "merged",
      "reason": "same-scope",
      "status": "covered",
      "confidence": "high",
      "justification": "The destination keeps the widget setup topic, package install instruction, and login command in a shorter intro.",
      "mapping": [
        {
          "sourceId": "S1.B001.L001",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B001"],
              "lineIds": ["D1.B001.L001", "D1.B001.L002"],
              "range": { "path": "dest.md", "startLine": 1, "endLine": 2 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "Line 1 preserves the setup topic in the new intro."
            }
          ]
        },
        {
          "sourceId": "S1.B001.L002",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B001"],
              "lineIds": ["D1.B001.L002"],
              "range": { "path": "dest.md", "startLine": 2, "endLine": 2 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "Line 2 combines the package install command into the setup sentence."
            }
          ]
        },
        {
          "sourceId": "S1.B001.L003",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B001"],
              "lineIds": ["D1.B001.L002"],
              "range": { "path": "dest.md", "startLine": 2, "endLine": 2 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "Line 2 combines the login command into the same setup sentence."
            }
          ]
        }
      ]
    },
    {
      "id": "M002",
      "summary": "Troubleshooting recovery steps moved to a narrower login-failure section.",
      "source": {
        "docId": "S1",
        "blockIds": ["S1.B002"],
        "lineIds": ["S1.B002.L001", "S1.B002.L002", "S1.B002.L003"]
      },
      "action": "paraphrase",
      "reason": "same-scope",
      "status": "covered",
      "confidence": "high",
      "justification": "The destination keeps the login-failure symptom, token refresh fix, and doctor command.",
      "mapping": [
        {
          "sourceId": "S1.B002.L001",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B002"],
              "lineIds": ["D1.B002.L001"],
              "range": { "path": "dest.md", "startLine": 4, "endLine": 4 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "The destination heading keeps the troubleshooting scope."
            }
          ]
        },
        {
          "sourceId": "S1.B002.L002",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B002"],
              "lineIds": ["D1.B002.L002"],
              "range": { "path": "dest.md", "startLine": 5, "endLine": 5 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "The token refresh fix is preserved."
            }
          ]
        },
        {
          "sourceId": "S1.B002.L003",
          "dest": [
            {
              "docId": "D1",
              "blockIds": ["D1.B002"],
              "lineIds": ["D1.B002.L003"],
              "range": { "path": "dest.md", "startLine": 6, "endLine": 6 },
              "mappingKind": "semantic-confirmed",
              "changedSinceBase": true,
              "justification": "The doctor command is preserved."
            }
          ]
        }
      ]
    }
  ]
}
```

After `map`, the audit has coverage decisions but may still have stale line
text if files changed after scaffolding.

### Step 3: hydrate

`hydrate` refreshes the stored source and destination line text from the correct
places:

- source lines from the source base ref when present
- destination lines from current files
- `changedSinceBase` metadata from the current diff

If `dest.md` line 2 changed from:

```markdown
Install the widget package and run `widget login`.
```

to:

```markdown
Install the widget package, then run `widget login`.
```

`hydrate` updates `D1.B001.L002.text` and destination line text without changing
IDs:

```json
{
  "id": "D1.B001.L002",
  "line": 2,
  "text": "Install the widget package, then run `widget login`."
}
```

### Step 4: validate

`validate` checks that every material source line is accounted for, that each
covered mapping has real proof, and that refreshed findings can be written back
to the canonical audit artifact when `--out` is provided.

For the mapped example, validation succeeds:

```json
{
  "validation": {
    "errors": [],
    "warnings": [],
    "acceptedWarnings": []
  }
}
```

If `M002` were missing, validation would fail because lines
`S1.B002.L001` through `S1.B002.L003` are material and unmapped:

```json
{
  "errors": [
    {
      "severity": "error",
      "code": "unmapped-source-line",
      "message": "S1.B002.L002 is material source content but is not mapped.",
      "sourceIds": ["S1.B002.L002"],
      "destinationIds": [],
      "ranges": [{ "path": "source.md", "startLine": 6, "endLine": 6 }],
      "suggestion": "Add a line-level mapping entry or mark the content intentionally removed."
    }
  ],
  "warnings": []
}
```

### Step 5: render

`render` does not change the canonical audit data. It creates review artifacts
from the validated JSON.

Markdown report excerpt:

```markdown
| ID | Source | Summary | Action | Reason | Destination | Status | Justification |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M001 | `source.md:1-3` | Setup title and commands were merged into the new setup intro. | merged | same-scope | `dest.md:1-2` | covered | The destination keeps the widget setup topic, package install instruction, and login command in a shorter intro. |
| M002 | `source.md:5-7` | Troubleshooting recovery steps moved to a narrower login-failure section. | paraphrase | same-scope | `dest.md:4-6` | covered | The destination keeps the login-failure symptom, token refresh fix, and doctor command. |
```

HTML viewer behavior:

- Sidebar shows source page `source.md` with `M001` and `M002`.
- Block mode lists the two mappings as cards.
- Doc mode renders the original source lines and lets the reviewer click either
  source block.
- The right pane shows source lines on the left and destination diff/reference
  content on the right.
- The validation panel shows no gaps for this example.

---

## Outputs

- PR created from this spec: Pending.

## Manual Notes

[keep this for the user to add notes. do not change between edits]

## Changelog
- 2026-05-13: Revised the audit schema to use one mapping ID per source block with line-level `mapping[]` destination payloads and deferred claim IDs to a future schema. (019e2266-dbd2-7e52-a7b1-21ee8bd043f0 - 26abb3b)
- 2026-05-13: Tightened refactor-skill handoff workflow with `add-dest`, `validate --out`, accepted-warning semantics, validation severity rules, and a refactor integration reference. (019e2266-dbd2-7e52-a7b1-21ee8bd043f0 - 26abb3b)
- 2026-05-13: Added appendix explaining the JSON audit pipeline with a tiny two-block Markdown example. (019e2266-dbd2-7e52-a7b1-21ee8bd043f0 - 26abb3b)
- 2026-05-13: Created feature spec for the public `docs-audit-v2` skill and CLI. (019e2266-dbd2-7e52-a7b1-21ee8bd043f0 - 26abb3b)
