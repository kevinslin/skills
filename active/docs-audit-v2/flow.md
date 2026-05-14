# End-to-End Audit Flow

This flow describes how to run a complete `docs-audit-v2` preservation audit
from a docs refactor through final reviewer handoff.

## 1. Define The Audit Scope

Start with explicit inputs. Do not infer audit scope from every changed docs
file.

Required decisions:

- Source ref: the commit, branch, tag, or base ref that contains the
pre-rewrite source content.
- Source docs: the specific source Markdown/MDX files being audited.
- Destination docs: the specific post-rewrite pages expected to preserve,
move, paraphrase, generate, or replace source content.
- Audit slug: a short local artifact name.

Example:

```text
source ref: HEAD~1
source docs: docs/tools/plugin.md
destination docs:
  docs/tools/plugin.md
  docs/plugins/manage-plugins.md
  docs/plugins/manifest.md
  docs/cli/plugins.md
audit slug: plugin-docs
```

Destination docs should include unchanged reference pages only when they are
real coverage evidence. Unchanged reference pages are useful, but they should
not be rendered as diffs.

## 2. Build The CLI

From the skill directory:

```bash
npm --prefix ./scripts run build
```

From another repository, invoke the built CLI by absolute or relative path:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs --help
```

## 3. Scaffold The Inventory

Run `scaffold` from the repository being audited.

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs scaffold \
  --source docs/tools/plugin.md \
  --dest docs/tools/plugin.md,docs/plugins/manage-plugins.md,docs/plugins/manifest.md,docs/cli/plugins.md \
  --base HEAD~1 \
  --out .audit/plugin-docs/audit.json
```

What this does:

- Reads source docs from `--base`.
- Reads destination docs from current files.
- Parses Markdown/MDX blocks.
- Assigns stable doc, block, and line IDs.
- Writes inventory JSON.

What this does not do:

- It does not infer semantic coverage.
- It does not create mappings.
- It does not prove that any removed source content was preserved.

Inspect the source IDs before authoring mappings:

```bash
node - <<'NODE'
const fs = require("fs");
const audit = JSON.parse(fs.readFileSync(".audit/plugin-docs/audit.json", "utf8"));
for (const doc of audit.sourceDocs) {
  console.log(doc.id, doc.path);
  for (const block of doc.blocks) {
    console.log(" ", block.id, block.kind, `${block.path}:${block.startLine}-${block.endLine}`);
  }
}
NODE
```

## 4. Add Or Reindex Destination Docs

If a destination page is created after scaffold, add it:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs add-dest \
  --data .audit/plugin-docs/audit.json \
  --dest docs/plugins/new-page.md \
  --out .audit/plugin-docs/audit.with-new-dest.json
```

If destination docs changed after mappings were started, reindex them:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs reindex-dest \
  --data .audit/plugin-docs/audit.with-new-dest.json \
  --dest docs/tools/plugin.md,docs/plugins/manage-plugins.md,docs/plugins/new-page.md \
  --out .audit/plugin-docs/audit.reindexed.json
```

`reindex-dest` refreshes destination block and line inventories. It preserves
destination doc IDs and mapping entry IDs so authored mappings can be repaired
instead of discarded.

## 5. Author The Mapping Patch

Create `.audit/plugin-docs/mapping-patch.json`.

Rules:

- Use one mapping object per source block.
- Include every material source line in the parent `source.lineIds`.
- Add one row in `mapping[]` for every material source line.
- Use exact destination `lineIds` whenever possible.
- Use multiple destination entries when the source line was split.
- Use `removed` only with a documented reason.
- Leave `dest: []` only for `missing` or valid intentionally removed rows.
- Do not use broad ranges as exact proof.

Good line-level mapping:

```json
{
  "sourceId": "S1.B008.L001",
  "action": "split",
  "reason": "same-scope",
  "status": "covered",
  "confidence": "high",
  "justification": "The destination preserves local path and archive install sources.",
  "dest": [
    {
      "id": "M008:S1.B008.L001:D001",
      "kind": "local",
      "docId": "D4",
      "blockIds": ["D4.B010"],
      "lineIds": ["D4.B010.L001", "D4.B010.L002"],
      "range": {
        "path": "docs/cli/plugins.md",
        "startLine": 80,
        "endLine": 81
      },
      "mappingKind": "semantic-confirmed",
      "changedSinceBase": true,
      "justification": "The cited lines list local path and archive install forms."
    }
  ]
}
```

Broad fallback mapping:

```json
{
  "sourceId": "S1.B008.L001",
  "action": "split",
  "reason": "same-scope",
  "status": "partially-covered",
  "confidence": "low",
  "justification": "The exact line still needs a tighter destination citation.",
  "dest": [
    {
      "id": "M008:S1.B008.L001:D001",
      "kind": "local",
      "docId": "D4",
      "blockIds": ["D4.B010"],
      "lineIds": [],
      "range": {
        "path": "docs/cli/plugins.md",
        "startLine": 74,
        "endLine": 235
      },
      "mappingKind": "block-fallback",
      "changedSinceBase": true,
      "justification": "The broad install section contains related resolver context, but exact lines must be selected before final coverage."
    }
  ]
}
```

Use fallback entries as temporary review evidence. Do not use them as final
proof for material `covered` lines.

## 6. Merge Mappings

Merge the patch into the inventory JSON:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs map \
  --data .audit/plugin-docs/audit.reindexed.json \
  --patch .audit/plugin-docs/mapping-patch.json \
  --out .audit/plugin-docs/audit.mapped.json
```

`map` rejects malformed mappings, duplicate IDs, unknown source IDs, unknown
destination IDs, duplicate destination-entry IDs, and accepted warnings without
justification.

## 7. Hydrate Source Metadata

Hydrate after mappings are merged:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs hydrate \
  --data .audit/plugin-docs/audit.mapped.json \
  --out .audit/plugin-docs/audit.hydrated.json
```

Hydration refreshes source text and source metadata. It does not reindex
destination docs. If destination docs changed, run `reindex-dest` first.

## 8. Validate

Run validation and persist findings:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs validate \
  --data .audit/plugin-docs/audit.hydrated.json \
  --out .audit/plugin-docs/audit.validated.json
```

Expected outcome for final handoff:

- `0` validation errors.
- Warnings reviewed and either resolved or accepted with justification.
- No stale destination entries.
- No material covered line relying only on block fallback.

Useful warning interpretation:

- `unchanged-reference-destination`: the destination did not change in this
refactor. It may be valid related-reference evidence, but it is not a diff.
- `low-confidence-mapping`: mapping is structurally valid but semantically weak.
- `weak-block-fallback`: broad fallback evidence needs review.

Do not accept warnings for unmapped source lines, stale ranges, missing
justifications, or broad fallback pretending to be exact coverage.

## 9. Fix Audit Gaps

Use the validation output and viewer to repair gaps.

Common fixes:

- Add missing line rows for `unmapped-source-line`.
- Tighten `lineIds` for broad destination ranges.
- Re-run `reindex-dest` after destination edits shift line IDs.
- Change `covered` to `partially-covered` when a destination preserves only part
of a source fact.
- Restore missing docs content when the source fact should have survived.
- Mark obsolete or unsupported source lines as intentionally removed with a
clear reason.

If docs content changes during this loop:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs reindex-dest \
  --data .audit/plugin-docs/audit.mapped.json \
  --dest docs/changed-page.md \
  --out .audit/plugin-docs/audit.reindexed.json

node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs map \
  --data .audit/plugin-docs/audit.reindexed.json \
  --patch .audit/plugin-docs/mapping-patch.json \
  --out .audit/plugin-docs/audit.mapped.json
```

Then hydrate and validate again.

## 10. Render Review Artifacts

Render from validated JSON:

```bash
node /path/to/docs-audit-v2/scripts/dist/docs-audit-v2.mjs render \
  --data .audit/plugin-docs/audit.validated.json \
  --md-out .audit/plugin-docs/audit-report.md \
  --html-out .audit/plugin-docs/audit-viewer.html
```

Run a quick static parse check:

```bash
node - <<'NODE'
const fs = require("fs");
const html = fs.readFileSync(".audit/plugin-docs/audit-viewer.html", "utf8");
const start = html.indexOf("window.__AUDIT_DATA__ = ");
const end = html.indexOf("</script>", start);
new Function(html.slice(start, end));
console.log("viewer payload parses");
NODE
```

Serve the viewer:

```bash
python3 -m http.server 8766 --directory .audit/plugin-docs
```

Open:

```text
http://127.0.0.1:8766/audit-viewer.html
```

## 11. Browser Review Loop

Use the viewer to spot mapping mistakes:

1. Select each source page.
2. Review block mode for one mapping per source block.
3. Switch to doc mode to inspect source order and uncovered highlights.
4. Search for strong facts such as config names, command flags, defaults, and
safety rules.
5. Check destination mode:
   - changed destination pages render as diffs;
   - unchanged destination pages render as related references;
   - external destinations show label, URL, and justification.
6. Tighten mappings when a source line points to an overly broad destination
range.
7. Re-render after JSON or docs edits.

The viewer is a review aid. The JSON remains canonical.

## 12. Final Handoff

A complete handoff includes:

- Source ref.
- Source docs.
- Destination docs.
- Mapping patch path.
- Hydrated JSON path.
- Validated JSON path.
- Markdown report path.
- HTML viewer path.
- Exact validation command and output.
- Active warnings and accepted warnings.
- Any known limitations, such as unchanged reference pages used as coverage
evidence.

Example:

```text
Validated JSON: .audit/plugin-docs/audit.validated.json
Report: .audit/plugin-docs/audit-report.md
Viewer: .audit/plugin-docs/audit-viewer.html
Validation: 0 errors, 12 warnings
Warnings: 12 unchanged-reference-destination warnings; all render as related references.
```

Never claim final coverage while validation errors remain.
