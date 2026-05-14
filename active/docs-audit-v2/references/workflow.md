# Workflow

This workflow keeps JSON as the canonical audit artifact. Markdown reports and
HTML viewers are render outputs.

## Inputs

- Source ref: the commit, branch, or current files that represent the
  pre-rewrite source content.
- Source docs: explicit Markdown/MDX files in audit scope.
- Destination docs: explicit files expected to retain, move, paraphrase, or
  generate source content. Do not infer this list from every changed Markdown
  file.
- Audit slug: a short identifier used for local artifacts.

## Artifacts

Use caller-provided paths when available. Otherwise use:

- Draft audit JSON: `.audit/<slug>/audit.json`
- Mapping patch while editing: `.audit/<slug>/mapping-patch.json`
- Hydrated audit JSON: `.audit/<slug>/audit.hydrated.json`
- Validated audit JSON: `.audit/<slug>/audit.validated.json`
- Detailed Markdown report: `.audit/<slug>/audit.md`
- HTML viewer: `.audit/<slug>/audit.html`

## Command Sequence

Start from explicit file lists:

```bash
node ./scripts/dist/docs-audit-v2.mjs scaffold \
  --source docs/source.md,docs/other-source.md \
  --dest docs/dest.md,docs/other-dest.md \
  --base HEAD~1 \
  --out .audit/example/audit.json
```

When a planned destination did not exist during scaffold:

```bash
node ./scripts/dist/docs-audit-v2.mjs add-dest \
  --data .audit/example/audit.json \
  --dest docs/new-dest.md \
  --out .audit/example/audit.with-new-dest.json
```

After editing destination docs during the audit loop:

```bash
node ./scripts/dist/docs-audit-v2.mjs reindex-dest \
  --data .audit/example/audit.with-new-dest.json \
  --dest docs/dest.md,docs/new-dest.md \
  --out .audit/example/audit.reindexed.json
```

Merge authored mappings:

```bash
node ./scripts/dist/docs-audit-v2.mjs map \
  --data .audit/example/audit.reindexed.json \
  --patch .audit/example/mapping-patch.json \
  --out .audit/example/audit.mapped.json
```

Hydrate source text and metadata without rewriting destination inventories:

```bash
node ./scripts/dist/docs-audit-v2.mjs hydrate \
  --data .audit/example/audit.mapped.json \
  --out .audit/example/audit.hydrated.json
```

Validate and persist the findings consumed by render:

```bash
node ./scripts/dist/docs-audit-v2.mjs validate \
  --data .audit/example/audit.hydrated.json \
  --out .audit/example/audit.validated.json
```

Render review artifacts:

```bash
node ./scripts/dist/docs-audit-v2.mjs render \
  --data .audit/example/audit.validated.json \
  --md-out .audit/example/audit.md \
  --html-out .audit/example/audit.html
```

## Command Rules

- Default `--cwd` is the current working directory.
- Relative input and output paths resolve against `--cwd`.
- Commands write machine-readable progress summaries to stdout and actionable
  errors to stderr.
- Commands that write files create missing parent directories.
- Commands fail before overwriting existing files unless `--force` is set.
- Commands are idempotent for identical inputs.
- `add-dest`, `hydrate`, `validate`, and `render` must not renumber existing
  doc, block, line, mapping, or destination-entry IDs.
- `reindex-dest` may replace destination block and line IDs inside refreshed
  destination docs, but must preserve destination doc IDs and destination-entry
  IDs.
- `validate --out` writes only validation findings and audit update metadata.

## CLI Reference

| Command | Required args | Optional args | Writes | Exit behavior |
| --- | --- | --- | --- | --- |
| `scaffold` | `--source`, `--dest`, `--out` | `--base`, `--cwd`, `--force` | New audit JSON | `0` on write; non-zero for missing inputs, invalid refs, or overwrite without `--force` |
| `add-dest` | `--data`, `--dest`, `--out` | `--cwd`, `--force` | Audit JSON with appended `D{n}` docs | `0` when all docs append; non-zero for missing, duplicate, or overwrite errors |
| `reindex-dest` | `--data`, `--dest`, `--out` | `--cwd`, `--force` | Audit JSON with refreshed destination inventories and stale destination metadata | `0` when docs reindex; non-zero for missing/unknown docs or overwrite errors |
| `map` | `--data`, `--patch`, `--out` | `--cwd`, `--force` | Audit JSON with merged mappings and accepted warnings | `0` when structural validation passes; non-zero for unknown IDs, missing required fields, or overwrite errors |
| `hydrate` | `--data`, `--out` | `--base`, `--cwd`, `--force` | Audit JSON with refreshed source metadata and stale source findings | `0` on write; non-zero for unreadable source files/refs or overwrite errors |
| `validate` | `--data` | `--cwd`, `--changed-only`, `--diff-base`, `--json`, `--out`, `--force` | Stdout summary/JSON; optional JSON with persisted findings | `0` with no errors; `1` when errors exist |
| `render` | `--data` | `--md-out`, `--html-out`, `--force` | Markdown and/or HTML outputs | `0` on render; non-zero for invalid JSON, missing template, no outputs, or overwrite errors |

`validate --changed-only` limits source-line coverage scanning to source docs
changed since `--diff-base` when provided, otherwise since the audit base.
Structural mapping checks still run across all mappings.

## Mapping Loop

1. Keep `mapping-patch.json` in `draft` state while rewriting.
2. Add one mapping object per source block.
3. Add one `mapping[]` row for every non-formatting source line in that block.
4. Choose exact destination line IDs when possible.
5. Use block fallback only as temporary draft evidence or for
   `partially-covered` and `needs-source-check` rows that explain the risk.
6. Re-run `reindex-dest` after destination edits that may shift line numbers.
7. Re-run `map`, `hydrate`, and `validate`.
8. Fix every validation error before final handoff.

## Inventory-Only Audits

`scaffold`, `add-dest`, and `reindex-dest` produce doc, block, and line
inventories. They do not infer semantic coverage and they do not create
`mappings[]`.

Before rendering a final preservation report or viewer, inspect the JSON:

```bash
node -e 'const a=require("./.audit/example/audit.validated.json"); console.log(a.mappings.length)'
```

If the count is `0`, the artifact is still an inventory or validation draft.
Author `mapping-patch.json`, run `map`, then `hydrate`, `validate`, and `render`.
Do not treat manual comparison notes, grading notes, or previous-session report
tables as mapped audit data unless they have been converted into JSON mappings.

## Warning Policy

Warnings alone do not fail validation. They still need review.

Accepted warnings must include an accepted warning code, affected source IDs,
destination IDs when applicable, ranges when applicable, and
`acceptedJustification`.

Do not accept warnings for:

- Unmapped source material.
- Stale source ranges.
- Stale destination entries or ranges.
- Missing justifications.
- Covered source lines without exact destination proof.

## Final Handoff

List:

- Hydrated JSON path.
- Validated JSON path.
- Markdown report path.
- HTML viewer path.
- Exact validation command and output.
- Unresolved warnings.
- Accepted warnings with reviewer-facing justification.
