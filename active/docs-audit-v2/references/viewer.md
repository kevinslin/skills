# Viewer and Report Contract

The viewer and Markdown report render from validated JSON. They do not parse a
Markdown report to reconstruct audit data.

## Markdown Report

The Markdown report should summarize:

- Audit title, source ref, generation time, and schema version.
- Source docs and destination docs.
- Validation errors, active warnings, and accepted warnings.
- Coverage by source doc and block in source order.
- For every mapping: source block, line rows, status, confidence,
  justification, destination entries, stale metadata, and generated ownership.

Reports should be table-oriented for scanability, but JSON remains canonical.

## HTML Viewer Data

The self-contained HTML viewer receives the same validated audit JSON used by
the report. Embed it as inert JSON data, then parse it at runtime.
When embedding JSON into an HTML template, insert the serialized payload
literally. In JavaScript, use a replacement callback such as
`template.replace("__AUDIT_JSON__", () => payload)` instead of passing `payload`
directly to `String.replace`, because audit text may contain replacement tokens
such as `$'`, `$&`, or `$1`.

After rendering, run a static parse check before opening the viewer:

```bash
node - <<'NODE'
const fs = require("fs");
const html = fs.readFileSync(".audit/example/audit.html", "utf8");
const start = html.indexOf("window.__AUDIT_DATA__ = ");
const end = html.indexOf("</script>", start);
new Function(html.slice(start, end));
NODE
```

Required data consumers:

- `sourceDocs[]`, `destDocs[]`, `blocks[]`, and `lines[]` for pane rendering.
- `mappings[]` and line-level `mapping[]` rows for coverage state.
- Destination entries for local, generated, and external references.
- `changedSinceBase` to choose diff mode versus related-reference mode.
- `validation.errors[]`, `validation.warnings[]`, and
  `validation.acceptedWarnings[]` for review badges and filters.

## Required Controls

The viewer must support:

- Source page selection.
- Block mode and doc mode.
- Mapping/action/status/confidence badges.
- URL fragment persistence for selected source block or mapping.
- Copyable source and destination text.
- Horizontal scrolling for long lines.
- Wrap toggle.
- Source and destination search.
- Diff view for changed destination pages.
- Related-reference mode for unchanged destination pages.
- Uncovered-line highlighting.
- Active errors, active warnings, and accepted warnings shown separately.

## Rendering Rules

- If `mappings[]` is empty, render an explicit inventory-only empty state with
  source/destination counts and validation findings. Do not leave panes blank.
- Source pane starts with the selected source block in block mode.
- Doc mode shows the whole source doc while preserving selected block context.
- Destination entries render in mapping order.
- Local and generated destinations with `changedSinceBase: true` render as
  changed destinations or diffs.
- Local and generated destinations with `changedSinceBase: false` render as
  related references, not misleading diffs.
- External destinations render label, URL when present, and justification.
- Stale destination entries render as blockers and cannot count as proof.
- Block fallback entries render as broad fallback, not exact proof.
- Changing the selected source block or mapping resets pane scroll.
- Search should include visible line text, paths, mapping summaries,
  justifications, statuses, and validation codes.

## Accessibility and Portability

- The viewer is a static HTML file; no local web server is required.
- It should work from a `file://` URL when browser policy allows inline script
  execution.
- Controls need visible labels or accessible names.
- Status should not rely on color alone.
- Long paths, line text, and code blocks must remain readable without layout
  overlap.
