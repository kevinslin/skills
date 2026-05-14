# Schema

The canonical artifact is JSON with `schemaVersion: 1`. Rendered Markdown and
HTML are derived outputs.

## Top-Level Shape

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
  "validation": {
    "errors": [],
    "warnings": [],
    "acceptedWarnings": []
  }
}
```

`hydrate` reads source docs from `sourceDocs[].baseRef`, then `audit.baseRef`,
then current files only when no base ref exists. Destination inventories are
refreshed only by `scaffold`, `add-dest`, and `reindex-dest`.

## Stable IDs

- Source docs: `S1`, `S2`, in the exact order passed to `--source`.
- Destination docs: `D1`, `D2`, in the exact order passed to `--dest`.
- Blocks: `S1.B001`, `S1.B002`, `D1.B001`, in physical source order.
- Lines: `S1.B001.L001`, in physical line order inside a block.
- Mappings: `M001`, `M002`, in source block traversal order.
- Destination entries: recommended form
  `<mapping-id>:<source-line-id>:D<nnn>`.

`add-dest`, `hydrate`, `map`, `validate`, and `render` preserve existing IDs.
`reindex-dest` preserves source IDs, mapping IDs, destination doc IDs, and
destination-entry IDs; it may refresh destination block and line IDs.

## Document, Block, and Line Objects

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

Blank separators do not create blocks in V1.

## Markdown Block Classification

Build audit blocks from top-level mdast nodes and their `position` ranges. Slice
the original file text by physical line number to preserve exact source lines.
Never serialize mdast back to Markdown to recover audit text.

Normalize top-level mdast node types as follows:

| mdast type | Audit kind |
| --- | --- |
| `yaml` | `frontmatter` |
| `toml` | `frontmatter` |
| `heading` | `heading` |
| `paragraph` | `paragraph` |
| `list` | `list` |
| `table` | `table` |
| `code` | `code` |
| `blockquote` | `blockquote` |
| `html` | `html` |
| `definition` | `link-block` |
| `footnoteDefinition` | `link-block` |
| `thematicBreak` | `thematic-break` |
| `mdxjsEsm` | `mdx` |
| `mdxFlowExpression` | `mdx` |
| `mdxJsxFlowElement` | `mdx` |

Unknown positioned top-level nodes must become auditable blocks based on their
position and original text. Do not drop them.

Formatting-only source lines include blank lines, fence delimiter-only lines,
table separator lines, frontmatter delimiter-only lines, MDX wrapper-only
open/close lines, and continuation lines with no material prose, command,
field, link, or value. Formatting-only lines may remain unmapped.

## Mapping Objects

Every mapping represents exactly one source block in V1.

```json
{
  "id": "M002",
  "summary": "Setup commands were merged into one destination sentence.",
  "source": {
    "docId": "S1",
    "blockIds": ["S1.B002"],
    "lineIds": ["S1.B002.L001", "S1.B002.L002"]
  },
  "action": "merged",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination keeps the install instruction and login command in a shorter paragraph.",
  "mapping": []
}
```

Parent mapping fields are reviewer UI rollups. Validation uses row-level fields
for line-level coverage.

Each `mapping[]` row must include `sourceId`, `action`, `reason`, `status`,
`confidence`, `justification`, and `dest`.

`dest` may be empty only when the row is `missing` or intentionally removed and
the row explains why.

## Destination Entries

Local destination:

```json
{
  "id": "M001:S1.B001.L001:D001",
  "kind": "local",
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

Generated destination:

```json
{
  "id": "M001:S1.B001.L001:D001",
  "kind": "generated",
  "docId": "D1",
  "blockIds": ["D1.B003"],
  "lineIds": ["D1.B003.L001"],
  "range": {
    "path": "docs/generated.md",
    "startLine": 20,
    "endLine": 20
  },
  "mappingKind": "generated-source",
  "changedSinceBase": true,
  "justification": "The generated page preserves the field description.",
  "generator": {
    "path": "./scripts/generate-docs.mjs",
    "startLine": 40,
    "endLine": 55
  }
}
```

External destination:

```json
{
  "id": "M001:S1.B001.L001:D001",
  "kind": "external",
  "label": "external source; no repo line",
  "url": "https://example.com/reference",
  "justification": "The preserved content is owned by the external reference."
}
```

Block fallback uses `mappingKind: "block-fallback"`, an empty `lineIds` array,
non-empty `blockIds`, and a range spanning the referenced destination block or
blocks. It is not sufficient final proof for a material `covered` source line.

Stale local or generated destination entry:

```json
{
  "stale": {
    "reason": "ambiguous-match",
    "message": "Two destination ranges matched the previous text; reselect the destination.",
    "previousRange": {
      "path": "docs/dest.md",
      "startLine": 20,
      "endLine": 21
    },
    "previousLineIds": ["D1.B003.L001"],
    "checkedAt": "2026-05-13T00:00:00.000Z"
  }
}
```

`stale.reason` values are `missing-range`, `text-mismatch`, and
`ambiguous-match`. Only `reindex-dest` writes or clears destination-entry
`stale` metadata.

## Enums

Allowed `action` values: `retained`, `paraphrase`, `moved`, `split`, `merged`,
and `removed`.

Allowed `reason` values: `same-scope`, `redundant`, `verbose`,
`mis-categorized`, `generated-source`, `obsolete`, `unsupported`,
`duplicate-linking`, and `nav-only`.

Allowed `status` values: `covered`, `partially-covered`, `missing`,
`intentionally-removed`, and `needs-source-check`.

Allowed `confidence` values: `high`, `medium`, and `low`.

Allowed `mappingKind` values: `exact-line`, `semantic-confirmed`,
`generated-source`, `external-reference`, and `block-fallback`.

Allowed destination `kind` values are `local`, `generated`, and `external`.

Generated destinations with `generator.path` but no generator line range produce
a warning so reviewers know the generated owner was cited without a precise
generator span.

## Validation Findings

Finding objects use one shape in persisted JSON and `validate --json` output:

```json
{
  "severity": "error",
  "code": "unmapped-source-line",
  "message": "S1.B002.L002 is material source content but is not mapped.",
  "sourceIds": ["S1.B002.L002"],
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

Accepted warning objects use the same shape plus
`acceptedJustification`. Accepted warnings may only contain warnings.

Validation codes:

| Code | Severity | Meaning |
| --- | --- | --- |
| `unmapped-source-line` | error | A non-formatting source line has no line mapping row and no explicit removal decision. |
| `unknown-id` | error | A mapping, destination entry, or accepted warning references an unknown ID. |
| `missing-justification` | error | A mapping, destination entry, removal, or accepted warning lacks justification. |
| `stale-source-range` | error | A stored source line or range no longer matches the source ref. |
| `stale-destination-entry` | error | A destination entry has stale metadata and cannot count as proof. |
| `stale-destination-range` | error | A mapped destination range no longer matches current destination text. |
| `missing-destination` | error | A covered-style row has no required destination. |
| `covered-block-fallback-only` | error | A material covered row uses only broad block fallback. |
| `weak-block-fallback` | warning | A draft or non-covered row uses broad block fallback and needs review. |
| `unchanged-reference-destination` | warning | A mapping references an unchanged destination page; render as related reference. |
| `low-confidence-mapping` | warning | A mapping is semantically weak but structurally valid. |

## Invariants

- Every mapping has exactly one source block.
- Every non-formatting source line is accounted for by exactly one block-scoped
  mapping object and at least one `mapping[]` row.
- Every parent mapping and row has non-empty `action`, `reason`, `status`,
  `confidence`, and `justification`.
- Destination entry IDs are unique within the audit.
- Local and generated entries require non-empty `lineIds` unless
  `mappingKind` is `block-fallback`.
- Destination entries with `stale` metadata cannot satisfy coverage.
- `covered` rows need at least one local, generated, or external destination
  unless the source line is formatting-only.
- `partially-covered` and `missing` rows must explain the gap.
- `intentionally-removed` rows need no destination only for `obsolete`,
  `unsupported`, `duplicate-linking`, or `nav-only`.
- `redundant` and `generated-source` removals require surviving destination
  evidence.

## Mapping Patch Contract

Mapping patches are authored by agents or reviewers and merged with `map`.

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
        "lineIds": ["S1.B012.L001"]
      },
      "action": "paraphrase",
      "reason": "same-scope",
      "status": "covered",
      "confidence": "high",
      "justification": "The destination preserves the force-enable behavior.",
      "mapping": [
        {
          "sourceId": "S1.B012.L001",
          "action": "paraphrase",
          "reason": "same-scope",
          "status": "covered",
          "confidence": "high",
          "justification": "The selected slot rule is preserved by the destination.",
          "dest": []
        }
      ]
    }
  ],
  "acceptedWarnings": []
}
```

Patch status is `draft` or `final`. Draft patches may be incomplete during a
rewrite. Final patches must validate with no errors before handoff.

Merge rules:

- `map` matches mappings by `id`.
- New mapping IDs are appended.
- Existing mapping IDs are replaced atomically after structural validation.
- Duplicate mapping IDs, duplicate row source IDs, duplicate destination-entry
  IDs, unknown source IDs, unknown destination IDs, and local/generated entries
  outside known destination docs are errors.
- Split destinations use multiple `dest[]` entries for the affected source row.
- Generated destinations cite the generated page destination and `generator`
  ownership. Include generator line ranges when available.
- Authored patches should normally fix stale destination entries. They may carry
  forward existing stale entries only to keep a known blocker visible.
- Accepted warnings match findings by `code`, `sourceIds`, `destinationIds`, and
  `ranges`; every accepted warning needs `acceptedJustification`.
