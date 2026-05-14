# Refactor Integration

This reference defines how docs refactor skills should call `docs-audit-v2`
while they rewrite documentation. The audit skill owns the generic data model,
CLI implementation, validation, report rendering, and viewer. The refactor
skill owns source selection, destination planning, docs edits, and semantic
mapping decisions.

## Invoke For

Use this audit workflow when any of these are true:

- The user asks for an audit, preservation proof, migration map,
  moved-section checklist, or line-by-line coverage.
- The rewrite removes, shortens, or reorganizes substantial sections.
- Content moves across multiple docs pages.
- New destination docs or generated docs are introduced.
- Source pages contain commands, config, defaults, lifecycle behavior,
  permissions, safety rules, or troubleshooting details.
- Manual comparison is likely to miss facts.

## Refactor Responsibilities

Before editing:

1. Resolve the source ref that represents the pre-refactor docs.
2. Identify source docs explicitly from the requested refactor scope.
3. Identify candidate destination docs from the plan. Include original pages
   that remain, moved-content pages, generated pages that own moved content,
   and new pages the refactor creates.
4. Run `scaffold` with explicit `--source` and `--dest` lists.
5. If a planned destination page does not exist yet, create a minimal stub
   before `scaffold` or add it later with `add-dest`.

During editing:

1. Maintain a mapping patch with one mapping object per source block.
2. Include one `mapping[]` row for every non-formatting source line.
3. Use explicit destination line references whenever a source line is retained,
   moved, paraphrased, split, merged, generated, or externally owned.
4. Record intentional removals as rows, not omissions.
5. Reconcile changed Markdown files against the explicit destination list after
   editing. Add a changed doc only when it plausibly contains moved or retained
   source content.
6. Do not map one source line to a broad destination section as
   `semantic-confirmed`. If exact destination lines are not selected yet, use
   `block-fallback` and keep the row non-final until tightened.
7. Run `reindex-dest` for edited destination docs before producing the mapped
   audit.

When a source fact is missing from the rewritten main page, first look for a
canonical destination in the explicit destination set. A reference,
troubleshooting, or generated page can be the correct preservation target. Only
restore the fact to the main page when readers need it for that page's primary
workflow or when the refactor loses the retrieval path to the canonical
destination.

Refactor-owned closeout:

1. Run `reindex-dest` for edited destination docs.
2. Run `map` to merge `mapping-patch.json` and produce `audit.mapped.json`.
3. Treat `mapping-patch.json` as the semantic source of mapping decisions.
4. Include the mapped audit artifact in the refactor handoff.

Audit-owned closeout:

1. Run `hydrate` to produce `audit.hydrated.json`.
2. Run `validate --out` to produce `audit.validated.json`.
3. Fix missing, stale, weak, and over-broad mappings until validation has no
   errors.
4. Resolve warnings or accept them with reviewer-facing justification when they
   are not preservation gaps.
5. Run `render` against the validated JSON.
6. Include validated audit artifacts and validation output in the audit handoff.

Validation success means the JSON contract is structurally clean. It does not
replace manual review of low-confidence, broad, disputed, or surprising
mappings.

## Mapping Patch States

Patch top-level `status` is `draft` or `final`.

- `draft`: may be incomplete during editing.
- `final`: every non-formatting source line has a row, every required
  justification is present, and validation has no errors.

V1 patches do not delete mappings. Replace existing mappings atomically by
matching the same `id`; append new IDs for new source-block mappings.

## Patch Merge Rules

`map` rejects:

- Duplicate mapping IDs.
- Unknown source IDs.
- Unknown destination IDs.
- Duplicate `mapping[].sourceId` rows inside one mapping.
- Duplicate destination-entry IDs.
- Local or generated destinations that point outside known destination docs.
- Accepted warnings without `acceptedJustification`.

File renames and newly created destination pages are represented by `add-dest`.
Do not infer renames from git history in V1.

## Handoff Checklist

Final refactor handoff must list:

- Draft audit JSON if useful for review.
- Mapping patch JSON.
- Mapped audit JSON.
- Hydrated audit JSON.
- Validated audit JSON.
- Detailed Markdown report.
- HTML viewer.
- Exact validation command output.
- Unresolved warnings.
- Accepted warnings with code, affected source IDs, destination IDs when
  applicable, ranges when applicable, and reviewer-facing justification.

Do not claim a docs preservation audit is complete while validation errors
remain.
