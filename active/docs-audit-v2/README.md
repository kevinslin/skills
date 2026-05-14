# docs-audit-v2

`docs-audit-v2` audits documentation rewrites with JSON-first,
block-scoped, line-level coverage mappings. Use it when a docs refactor moves,
shortens, merges, splits, generates, or intentionally removes source content and
you need reviewable proof that the original facts were accounted for.

The skill is designed for preservation audits, migration maps, moved-section
checklists, and reviewer-facing coverage reports. It is not a general docs
style checker and it does not judge prose quality by itself.

## What It Produces

The canonical output is a JSON audit document. Rendered Markdown and HTML are
derived artifacts.

Typical outputs:

- `audit.json`: inventory-only scaffold of source and destination docs.
- `mapping-patch.json`: authored semantic mappings.
- `audit.mapped.json`: scaffold plus merged mappings.
- `audit.hydrated.json`: mapped audit with refreshed source text and metadata.
- `audit.validated.json`: hydrated audit with persisted validation findings.
- `audit-report.md`: detailed Markdown report for code review.
- `audit-viewer.html`: self-contained interactive viewer.

## Audit Files And Schema

The JSON files represent different stages of the same audit pipeline. Only
validated JSON should be used as final report/viewer input.

| File | Owner | Purpose |
| --- | --- | --- |
| `audit.json` | `scaffold` | Initial inventory. Contains source docs, destination docs, parsed blocks, parsed lines, and empty `mappings`. It is not semantic proof. |
| `mapping-patch.json` | agent or reviewer | Authored semantic mapping patch. Contains one mapping per source block and one row per material source line. |
| `audit.mapped.json` | `map` | Audit JSON after merging the mapping patch. This is the first artifact that contains semantic source-to-destination coverage data. |
| `audit.hydrated.json` | `hydrate` | Mapped audit with refreshed source text and source metadata from the configured source ref. |
| `audit.validated.json` | `validate` | Hydrated audit with persisted validation findings. Use this as the canonical final JSON for reports and the viewer. |
| `audit-report.md` | `render` | Human-readable Markdown report derived from validated JSON. Do not parse this back into audit data. |
| `audit-viewer.html` | `render` | Self-contained HTML viewer derived from validated JSON. Do not edit this by hand as source of truth. |

### Top-Level Audit JSON

All canonical audit JSON files use `schemaVersion: 1`.

```json
{
  "schemaVersion": 1,
  "audit": {
    "id": "plugin-docs",
    "title": "Plugin docs audit",
    "baseRef": "HEAD~1",
    "createdAt": "2026-05-13T00:00:00.000Z",
    "updatedAt": "2026-05-13T00:00:00.000Z"
  },
  "sourceDocs": [],
  "destDocs": [],
  "mappings": [],
  "validation": {
    "errors": [],
    "warnings": [],
    "acceptedWarnings": []
  }
}
```

Top-level fields:

- `schemaVersion`: schema version. Current value is `1`.
- `audit`: audit metadata such as local id, title, base ref, and timestamps.
- `sourceDocs`: source document inventories from the pre-rewrite ref.
- `destDocs`: destination document inventories from current post-rewrite files.
- `mappings`: semantic mappings from source blocks and lines to destination
evidence.
- `validation`: persisted validation findings consumed by reports and the
viewer.

### Document Schema

`sourceDocs[]` and `destDocs[]` use the same document shape.

```json
{
  "id": "S1",
  "role": "source",
  "path": "docs/tools/plugin.md",
  "baseRef": "HEAD~1",
  "changedSinceBase": true,
  "blocks": []
}
```

Fields:

- `id`: stable document id. Source docs use `S1`, `S2`, and destination docs
use `D1`, `D2`.
- `role`: `source` or `destination`.
- `path`: repo-relative file path.
- `baseRef`: source ref used to read pre-rewrite content. Usually present on
source docs.
- `changedSinceBase`: whether the current destination file changed relative to
the audit base.
- `blocks`: parsed Markdown/MDX block inventory in physical source order.

### Block Schema

Blocks are top-level Markdown/MDX elements with physical line ranges.

```json
{
  "id": "S1.B008",
  "kind": "paragraph",
  "path": "docs/tools/plugin.md",
  "startLine": 95,
  "endLine": 97,
  "lines": []
}
```

Fields:

- `id`: stable block id under its document, such as `S1.B008`.
- `kind`: normalized block kind.
- `path`: repo-relative file path.
- `startLine`: first physical line in the block.
- `endLine`: last physical line in the block.
- `lines`: physical line inventory inside the block.

Allowed block kinds:

- `frontmatter`
- `heading`
- `paragraph`
- `list`
- `table`
- `code`
- `blockquote`
- `mdx`
- `html`
- `link-block`
- `thematic-break`

### Line Schema

Lines preserve exact physical source text and line numbers.

```json
{
  "id": "S1.B008.L001",
  "path": "docs/tools/plugin.md",
  "line": 95,
  "columnStart": 1,
  "columnEnd": 78,
  "text": "The install path uses the same resolver as the CLI: local path/archive, explicit"
}
```

Fields:

- `id`: stable line id under its block.
- `path`: repo-relative file path.
- `line`: physical line number.
- `columnStart`: first source column for the captured line.
- `columnEnd`: last source column for the captured line.
- `text`: exact line text.

Blank separators do not create blocks. Formatting-only lines can remain
unmapped when they carry no durable prose, command, field, link, or value.

### Mapping Patch Schema

`mapping-patch.json` has the same mapping object shape as final audit JSON, but
it contains only authored mappings and optional accepted warnings.

```json
{
  "schemaVersion": 1,
  "status": "draft",
  "mappings": [],
  "acceptedWarnings": []
}
```

Fields:

- `schemaVersion`: current value is `1`.
- `status`: optional `draft` or `final`.
- `mappings`: authored block mappings.
- `acceptedWarnings`: reviewer-accepted warnings with justifications.

### Block Mapping Schema

Every V1 mapping represents one source block.

```json
{
  "id": "M008",
  "summary": "Install resolver source choices moved to quick start and CLI install reference.",
  "source": {
    "docId": "S1",
    "blockIds": ["S1.B008"],
    "lineIds": ["S1.B008.L001", "S1.B008.L002", "S1.B008.L003"]
  },
  "action": "split",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination preserves the install resolver source choices.",
  "mapping": []
}
```

Fields:

- `id`: stable mapping id, usually `M001`, `M002`, in source block order.
- `summary`: short reviewer-facing description.
- `source.docId`: source document id.
- `source.blockIds`: source block ids. V1 expects exactly one source block.
- `source.lineIds`: material line ids covered by this mapping.
- `action`: high-level action for the block.
- `reason`: high-level reason for the action.
- `status`: overall coverage status for the block.
- `confidence`: `high`, `medium`, or `low`.
- `justification`: reviewer-facing explanation of why the mapping is valid.
- `mapping`: line-level mapping rows.

Parent mapping fields are UI rollups. Validation relies on row-level fields for
line-level coverage.

### Mapping Row Schema

Each `mapping[]` row accounts for one source line.

```json
{
  "sourceId": "S1.B008.L001",
  "action": "split",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination preserves local path and archive install sources.",
  "dest": []
}
```

Fields:

- `sourceId`: source line id.
- `action`: action for this source line.
- `reason`: reason for that action.
- `status`: coverage status for this source line.
- `confidence`: confidence in the row mapping.
- `justification`: row-specific preservation or removal explanation.
- `dest`: destination entries that prove coverage. May be empty only for
`missing` or valid intentionally removed rows.

### Destination Entry Schema

Destination entries are the evidence attached to a mapping row.

Local destination:

```json
{
  "id": "M008:S1.B008.L001:D001",
  "kind": "local",
  "docId": "D7",
  "blockIds": ["D7.B010"],
  "lineIds": ["D7.B010.L001", "D7.B010.L002"],
  "range": {
    "path": "docs/cli/plugins.md",
    "startLine": 80,
    "endLine": 81
  },
  "mappingKind": "semantic-confirmed",
  "changedSinceBase": true,
  "justification": "The cited lines name local path and archive install forms."
}
```

Generated destination:

```json
{
  "id": "M012:S1.B012.L001:D001",
  "kind": "generated",
  "docId": "D4",
  "blockIds": ["D4.B003"],
  "lineIds": ["D4.B003.L001"],
  "range": {
    "path": "docs/plugins/plugin-inventory.md",
    "startLine": 42,
    "endLine": 42
  },
  "mappingKind": "generated-source",
  "changedSinceBase": true,
  "justification": "The generated inventory preserves the plugin field.",
  "generator": {
    "path": "scripts/generate-plugin-inventory-doc.mjs",
    "startLine": 20,
    "endLine": 55
  }
}
```

External destination:

```json
{
  "id": "M020:S1.B020.L001:D001",
  "kind": "external",
  "label": "external source; no repo line",
  "url": "https://example.com/reference",
  "justification": "The preserved information is owned by the external reference."
}
```

Shared destination fields:

- `id`: unique destination-entry id. Recommended form is
`<mapping-id>:<source-line-id>:D<nnn>`.
- `kind`: `local`, `generated`, or `external`.
- `justification`: why this destination proves coverage for the source line.

Local and generated fields:

- `docId`: destination document id.
- `blockIds`: destination block ids.
- `lineIds`: destination line ids. Use exact lines whenever possible.
- `range`: repo-relative path and line range.
- `mappingKind`: evidence type.
- `changedSinceBase`: whether this destination changed in the refactor diff.

Generated-only field:

- `generator`: generator file and optional line range that owns the generated
destination.

External-only fields:

- `label`: human-readable external reference label.
- `url`: optional external URL.

### Stale Destination Metadata

`reindex-dest` may mark a local or generated destination entry as stale when it
can no longer prove coverage.

```json
{
  "stale": {
    "reason": "text-mismatch",
    "message": "The mapped destination text changed.",
    "previousRange": {
      "path": "docs/cli/plugins.md",
      "startLine": 80,
      "endLine": 81
    },
    "previousLineIds": ["D7.B010.L001"],
    "checkedAt": "2026-05-13T00:00:00.000Z"
  }
}
```

Stale entries cannot satisfy coverage. Fix them by reselecting destination
lines, updating the mapping patch, and rerunning `map`, `hydrate`, and
`validate`.

### Validation Finding Schema

Persisted findings live under `validation.errors`, `validation.warnings`, and
`validation.acceptedWarnings`.

```json
{
  "severity": "warning",
  "code": "unchanged-reference-destination",
  "message": "M005:S1.B005.L001:D002 references an unchanged destination page; render as related reference instead of a diff.",
  "sourceIds": ["S1.B005.L001"],
  "destinationIds": ["M005:S1.B005.L001:D002"],
  "ranges": [
    {
      "path": "docs/cli/plugins.md",
      "startLine": 74,
      "endLine": 90
    }
  ],
  "suggestion": "Review this as related-reference evidence."
}
```

Accepted warnings use the same shape and add `acceptedJustification`.

### Enum Values

Allowed `action` values:

- `retained`
- `paraphrase`
- `moved`
- `split`
- `merged`
- `removed`

Allowed `reason` values:

- `same-scope`
- `redundant`
- `verbose`
- `mis-categorized`
- `generated-source`
- `obsolete`
- `unsupported`
- `duplicate-linking`
- `nav-only`

Allowed `status` values:

- `covered`
- `partially-covered`
- `missing`
- `intentionally-removed`
- `needs-source-check`

Allowed `confidence` values:

- `high`
- `medium`
- `low`

Allowed `mappingKind` values:

- `exact-line`
- `semantic-confirmed`
- `generated-source`
- `external-reference`
- `block-fallback`

## Core Concepts

Source doc:
: The pre-rewrite Markdown or MDX file being audited.

Destination doc:
: A post-rewrite file that preserves, moves, paraphrases, generates, or replaces
source content.

Block:
: A top-level Markdown/MDX element such as frontmatter, heading, paragraph,
list, table, code block, blockquote, MDX element, HTML block, or link block.

Line:
: A physical source line inside a block. Line IDs are nested under block IDs,
for example `S1.B008.L001`.

Mapping:
: A reviewer-authored JSON object that explains how one source block was
handled. V1 uses one mapping per source block and one row per material source
line.

Destination entry:
: Evidence for a mapped source line. It can point to exact local lines,
generated lines plus generator ownership, an external source, or a broad block
fallback.

## When To Use This Skill

Use this skill when:

- A docs page is shortened, split, merged, or moved.
- Source content moves across several pages.
- Generated docs now own part of the information.
- The source doc contains commands, config fields, defaults, safety rules,
permissions, lifecycle behavior, troubleshooting steps, or other strong facts.
- A reviewer needs proof that dropped sections are either covered elsewhere or
intentionally removed.

Do not use it for simple typo fixes or small isolated docs edits where source
coverage is obvious from the diff.

## Repository Layout

```text
docs-audit-v2/
├── SKILL.md
├── README.md
├── flow.md
├── assets/
│   └── audit-viewer.html
├── references/
│   ├── refactor-integration.md
│   ├── schema.md
│   ├── viewer.md
│   └── workflow.md
└── scripts/
    ├── dist/docs-audit-v2.mjs
    ├── src/
    └── tests/
```

Important files:

- `SKILL.md`: concise agent-facing trigger and routing instructions.
- `references/schema.md`: JSON shape, enums, invariants, validation findings,
and mapping patch contract.
- `references/workflow.md`: CLI command sequence and handoff rules.
- `references/refactor-integration.md`: contract for a refactor skill that
authors mappings while rewriting docs.
- `references/viewer.md`: Markdown report and HTML viewer rendering contract.
- `assets/audit-viewer.html`: static viewer template used by `render`.
- `scripts/src/docs-audit-v2.ts`: CLI implementation.
- `scripts/src/parser.ts`: Markdown/MDX block and line inventory parser.
- `scripts/src/types.ts`: TypeScript data model.

## CLI Commands

Build the CLI after editing source:

```bash
npm --prefix ./scripts run build
```

Run commands with:

```bash
node ./scripts/dist/docs-audit-v2.mjs <command> [args]
```

Available commands:

| Command | Purpose |
| --- | --- |
| `scaffold` | Read source and destination docs, parse Markdown/MDX blocks, assign stable doc/block/line IDs, and write an inventory-only JSON audit. |
| `add-dest` | Add destination docs that were created after the initial scaffold. |
| `reindex-dest` | Refresh destination doc inventories after rewrite edits while preserving destination doc IDs and mapping entry IDs. |
| `map` | Merge an authored mapping patch into the audit JSON. |
| `hydrate` | Refresh source text and source metadata from the configured source ref. |
| `validate` | Enforce schema rules, coverage invariants, stale-range checks, and weak-mapping warnings. |
| `render` | Render a detailed Markdown report and self-contained HTML viewer from validated JSON. |

## Minimal Command Sequence

From the repository being audited:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs scaffold \
  --source docs/tools/plugin.md \
  --dest docs/tools/plugin.md,docs/plugins/manage-plugins.md,docs/cli/plugins.md \
  --base HEAD~1 \
  --out .audit/plugin-docs/audit.json
```

Author `.audit/plugin-docs/mapping-patch.json`, then merge it:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs map \
  --data .audit/plugin-docs/audit.json \
  --patch .audit/plugin-docs/mapping-patch.json \
  --out .audit/plugin-docs/audit.mapped.json
```

Hydrate, validate, and render:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs hydrate \
  --data .audit/plugin-docs/audit.mapped.json \
  --out .audit/plugin-docs/audit.hydrated.json

node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs validate \
  --data .audit/plugin-docs/audit.hydrated.json \
  --out .audit/plugin-docs/audit.validated.json

node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs render \
  --data .audit/plugin-docs/audit.validated.json \
  --md-out .audit/plugin-docs/audit-report.md \
  --html-out .audit/plugin-docs/audit-viewer.html
```

Serve the HTML viewer when local browser review is easier than opening the file:

```bash
python3 -m http.server 8766 --directory .audit/plugin-docs
```

Open:

```text
http://127.0.0.1:8766/audit-viewer.html
```

## Mapping Patch Basics

Mapping patches are authored by an agent or reviewer. The CLI does not infer
semantic preservation for you.

Each mapping should cover one source block:

```json
{
  "id": "M001",
  "summary": "Install source choices moved to the install reference.",
  "source": {
    "docId": "S1",
    "blockIds": ["S1.B008"],
    "lineIds": ["S1.B008.L001", "S1.B008.L002", "S1.B008.L003"]
  },
  "action": "split",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination keeps every install source form in the quick start and CLI reference.",
  "mapping": [
    {
      "sourceId": "S1.B008.L001",
      "action": "split",
      "reason": "same-scope",
      "status": "covered",
      "confidence": "high",
      "justification": "The destination preserves local path and archive install sources.",
      "dest": [
        {
          "id": "M001:S1.B008.L001:D001",
          "kind": "local",
          "docId": "D2",
          "blockIds": ["D2.B003"],
          "lineIds": ["D2.B003.L001", "D2.B003.L002"],
          "range": {
            "path": "docs/cli/plugins.md",
            "startLine": 80,
            "endLine": 81
          },
          "mappingKind": "semantic-confirmed",
          "changedSinceBase": true,
          "justification": "The cited lines name local path and archive install forms."
        }
      ]
    }
  ]
}
```

Prefer exact line evidence. A broad destination range should be marked
`block-fallback` unless each included destination line is genuinely needed for
the source line. Broad `semantic-confirmed` ranges make the viewer noisy and can
overstate precision.

## Status, Action, and Reason

Common actions:

- `retained`: equivalent content stayed in the same source page or same-scope
page.
- `paraphrase`: equivalent content remains with changed wording.
- `moved`: content moved to a different page or section.
- `split`: one source unit maps to multiple destinations.
- `merged`: several source units collapsed into one destination.
- `removed`: content was intentionally removed.

Common statuses:

- `covered`: equivalent information is preserved.
- `partially-covered`: some information remains, but a gap or weaker fact is
documented.
- `missing`: required information is not preserved.
- `intentionally-removed`: information was removed for a documented reason.
- `needs-source-check`: mapping needs source verification before it can be
trusted.

See `references/schema.md` for the full enum contract.

## Validation Model

Validation is structural and coverage-oriented. It checks that:

- Every material source line has a mapping row.
- Covered rows have destination evidence.
- Destination IDs, block IDs, line IDs, and ranges exist.
- Stale destination entries do not count as proof.
- Broad block fallback is not final proof for a material covered line.
- Required justifications are present.

Warnings do not fail validation, but they still need review. For example,
`unchanged-reference-destination` means a destination page is useful coverage
evidence but did not change in the refactor. The viewer should render that
destination as a related reference, not as a diff.

## Viewer Behavior

The HTML viewer is a static single-page app. It embeds validated JSON and lets a
reviewer inspect mappings by source page, block, line, destination, status, and
validation finding.

Key features:

- Source page selector.
- Block mode and doc mode.
- URL fragment persistence for selected mappings.
- Copyable source and destination text.
- Wrap toggle for long lines.
- Search across mapped source and destination content.
- Diff view for changed destination pages.
- Related-reference view for unchanged destination pages.
- Highlighting for uncovered or problematic source lines.
- Independent pane scrolling with page height driven by mapped source ranges.

## Common Failure Modes

Empty viewer:
: The audit probably has `mappings: []` or the embedded JSON failed to parse.
Run `map`, then `hydrate`, `validate`, and `render`. Also run the static parse
check in `references/viewer.md`.

One source line maps to too many destination lines:
: The mapping patch used a broad destination range as exact evidence. Tighten
the destination `lineIds`, or mark the entry as `block-fallback` if it is only
broad supporting context.

`unchanged-reference-destination` warnings:
: The destination page did not change in the refactor. Keep it as related
reference evidence only if it truly preserves the source fact.

Stale destination errors:
: The destination file changed after mapping. Run `reindex-dest`, then update
the mapping patch if the cited lines moved or changed.

Generated docs:
: Cite both the generated destination line range and the generator file/range
when possible.

## Development Checks

After editing CLI TypeScript or the viewer template:

```bash
npm --prefix ./scripts run build
npm --prefix ./scripts test
```

For a quick rendered HTML parse check:

```bash
node - <<'NODE'
const fs = require("fs");
const html = fs.readFileSync(".audit/example/audit-viewer.html", "utf8");
const start = html.indexOf("window.__AUDIT_DATA__ = ");
const end = html.indexOf("</script>", start);
new Function(html.slice(start, end));
NODE
```

## Handoff Checklist

When completing an audit, report:

- Source ref.
- Source docs.
- Destination docs.
- Mapping patch path.
- Hydrated JSON path.
- Validated JSON path.
- Markdown report path.
- HTML viewer path.
- Exact validation command and output.
- Active validation errors.
- Active warnings and accepted warnings with justification.

Do not claim a preservation audit is complete while validation errors remain.
