---
name: docs-refactor-v2
description: Refactor an existing OpenClaw docs page with source-audited preservation,
  restructuring, and verification.
dependencies:
- docs-audit-v2
- docy
---

# OpenClaw Refactor Docs

## Overview

Use this skill when the user gives a target OpenClaw docs page and asks to
rewrite, refactor, reorganize, split, shorten, or improve it.

This skill builds on docy's `ref/developer-docs` and `ref/openclaw-docs`
references for style, page types, structure, examples, discoverability, and
verification. This skill adds the rewrite workflow needed to avoid losing
accurate behavior during a major docs refactor.

For major rewrites, moved-section audits, migration maps, or line-by-line
preservation requests, invoke `$docs-audit-v2` as the audit engine and load its
`refactor-integration` reference. This skill owns the rewrite and semantic
mapping decisions; `$docs-audit-v2` owns the schema, CLI implementation,
hydration, validation, report rendering, and viewer.

## Inputs

Required:

- A target docs page path, such as `docs/plugins/codex-harness.md`.

Optional:

- Desired page type, such as topic page, guide, reference, or troubleshooting.
- Specific goals, such as shorter main page, move details to reference pages, or
  align with current CLI behavior.
- Related source files, schemas, commands, tests, specs, or PRs.

If the target page is missing or ambiguous, ask one concise question before
editing. Otherwise, proceed.

## Working Contract

Refactor the target page to be more useful, concise, and comprehensive within
its stated scope.

Do not treat a rewrite as permission to discard behavior facts. Preserve,
verify, move, or explicitly retire existing material. Incorrect docs are worse
than verbose docs.

Before rewriting, lock the page's reader contract in one sentence:

- Who is this page for?
- What should the reader be able to do after reading it?
- Which adjacent audiences or workflows are explicitly out of scope?

Use that contract to reject scope creep. Maintainer-only architecture,
implementation details, rare debugging, and exhaustive references do not belong
in a happy-path guide unless the reader needs them to complete the page's stated
workflow.

Prefer this split:

- Topic or guide pages cover the 80/20 path, decisions readers must make, safe
  setup, smallest reliable verification, common failures, and links onward.
- Reference pages cover exhaustive fields, defaults, enums, limits, precedence
  rules, API contracts, narrow internals, and rare debugging details.
- Troubleshooting pages start from observable symptoms and map to checks,
  causes, and fixes.

## End-to-End Refactor Loop

Use this loop for major doc rewrites, moved-section refactors, and any request
that asks for audit-grade preservation:

1. Capture the directive.
   Record the target docs, source docs, desired page type, rewrite goals,
   non-negotiable constraints, related reference/troubleshooting destinations,
   whether details may move out of the target page, and the one-sentence reader
   contract that defines the page's audience, outcome, and out-of-scope
   workflows. Run `pnpm docs:list` when available so the target and related
   pages are discoverable.
2. Start the refactor and audit together.
   Load docy's `ref/developer-docs` and `ref/openclaw-docs`, then use
   `$docs-audit-v2` to scaffold the source and destination set. Record the audit
   artifact paths, source base ref, source doc order, destination doc order, and
   `mapping-patch.json` location before rewriting.
3. Rewrite while maintaining mappings.
   Edit the docs according to the refactor plan and update
   `mapping-patch.json` as material moves, merges, or becomes intentionally
   removed. Do not wait until the end to reconstruct preservation from memory.
4. Run the initial audit.
   Run the audit CLI through `map`, `hydrate`, `validate`, and `render`. Inspect
   the Markdown report and viewer, not just the command exit status.
5. Fix the initial audit issues.
   For each issue, decide whether it needs a docs edit, a destination add, a
   destination reindex, a mapping fix, an intentional-removal row, or source
   evidence proving the old line obsolete. Rerun `map`, `hydrate`, `validate`,
   and `render` until the mechanical audit is clean.
6. Run line-by-line semantic review with subagents.
   For each source page, assign one subagent to account for every source line
   against the current destination docs and hydrated audit. The subagent must
   report whether each source line is preserved, moved, redundant, obsolete, or
   still missing, with exact destination evidence or a concrete justification.
7. Loop on subagent findings.
   Integrate every actionable finding into the docs, mappings, or intentional
   removal rationale. Reindex changed destinations, rerun the audit CLI, and
   repeat the per-source-page semantic review until no subagent reports
   remaining preservation, structure, or clarity issues.
8. Finalize with verification and a preservation report.
   Run the smallest reliable docs checks, record the final audit artifacts, list
   moved or intentionally removed material, and report any behavior-sensitive
   claims that could not be verified.

Do not treat the first clean validation result as final semantic signoff. For a
major rewrite, the workflow is complete only after the audit validates and the
per-source-page line review has no actionable findings.

## Workflow

### 1. Load the doc standard

Invoke `$docy`, then load the general documentation standard followed by the
OpenClaw overlay:

```bash
docy inject ref/developer-docs
docy inject ref/openclaw-docs
```

Apply their page-type, style, examples, navigation, and verification guidance
throughout the refactor.

Run `pnpm docs:list` when available, then read only the target page and the
likely entry points, references, or related pages needed for the refactor.

### 2. Classify the page

Before editing, decide the intended page type from the injected docy references.

If the current page mixes page types, choose the main page type and plan where
the other material belongs:

- Move exhaustive contracts to an existing or new reference page.
- Move symptom-driven material to an existing or new troubleshooting page.
- Move narrow setup workflows to a guide when they interrupt the main path.
- Keep concise routing, decision, and safety details in the main page when
  readers need them to complete the workflow.

### 3. Preserve and audit existing facts

Create a working inventory from the old page before rewriting. For major
refactors, materialize this inventory with `docs-audit-v2 scaffold` so it can
become `audit.json` and `mapping-patch.json`, not just informal notes. Include:

- Config fields, flags, commands, slash commands, env vars, defaults, enums,
  nullable values, and constraints.
- Precedence rules, fallback behavior, caps, limits, rate limits, timeouts,
  lifecycle states, queueing behavior, and compatibility rules.
- Auth, permission, approval, sandbox, safety, privacy, and destructive-action
  behavior.
- Setup requirements, supported versions, dependencies, operating systems,
  credentials, and account requirements.
- Error messages, troubleshooting symptoms, diagnostics, and recovery steps.
- Examples, expected output, command routing tables, and cross-links.
- Rationale, decision framing, and emphasized modal constraints such as
  **only**, **must**, and **not**.
- Structured source blocks such as tabs, card groups, checklists, numbered
  operational lists, comparison tables, and next-step sections.

For each fact, choose one outcome:

- Keep it in the refactored target page.
- Move it to a specific existing page.
- Move it to a specific new page.
- Delete it because current source proves it is obsolete or out of scope.

For each structured source block, choose one outcome:

- Preserve the structure and wording because it is already clear.
- Preserve the structure but update only the facts that source-of-truth checks
  require.
- Move the whole block to a specific destination page.
- Replace the structure only when the reader contract makes the old shape wrong,
  and record why.

Default to preserving useful source structure. Do not collapse numbered
operational lists into prose, split paired tabs, rewrite clear checklists, or
remove guided next-step cards unless there is a concrete reader benefit.

Do not infer defaults, permissions, policy, timeout behavior, or safety posture
from names or intent. Verify them.

### 4. Find source of truth

Use the nearest authoritative source for each behavior-sensitive claim:

- Public schema, plugin manifest, generated config docs, or exported types for
  config fields.
- CLI implementation, slash-command handlers, help text, and command tests for
  commands and flags.
- Runtime source and tests for lifecycle, queueing, permission, fallback,
  timeout, and provider behavior.
- Protocol docs, SDK facades, and contract tests for APIs and plugin surfaces.
- Existing docs only as secondary evidence unless the target is purely
  conceptual.

If a page promises a reference, compare its tables against the schema,
manifest, CLI help, generated docs, or exported types. Missing public fields,
defaults, precedence rules, caps, or side effects are correctness bugs.

### 5. Plan moved material

When moving detail out of the target page, record the destination before
editing:

- Existing page: name the page and section.
- New page: choose the page type, slug, title, frontmatter summary,
  `doc-schema-version: 1`, and `read_when` hints.
- Target page: keep a short summary and link from the point where readers need
  the deeper detail.

Avoid duplicate truth. If the same contract appears in multiple places, choose
one canonical page and link to it.

### 6. Preserve with docs-audit-v2 for major refactors

Use `docs-audit-v2` when the refactor needs audit-grade preservation proof.
This skill owns the refactor-side work:

1. Resolve the pre-refactor source ref.
2. Choose explicit source docs and destination docs from the refactor plan.
3. Run `scaffold` before rewriting when possible.
4. Maintain `mapping-patch.json` while editing.
5. Add one mapping object per source block.
6. Add one `mapping[]` row per material source line.
7. Use exact destination lines whenever possible.
8. Record intentional removals as rows, not omissions.
9. Run `add-dest` when destination pages are created after scaffold.
10. Run `reindex-dest` when destination pages are edited.
11. Run `map` to produce `audit.mapped.json`.

When continuing a mapped audit after rebasing, first verify that the audit base
still points at the pre-refactor source snapshot. Relative refs such as
`HEAD~3` can drift when commits are added, dropped, or squashed. If the base has
drifted, rerun `scaffold` with the corrected base before `reindex-dest`, keep
the original source and destination doc order so stable IDs still match
`mapping-patch.json`, then rerun `map`, `hydrate`, `validate`, and `render`.

Do not map one source line to a broad destination section as
`semantic-confirmed`. If exact destination lines are not selected yet, use
`block-fallback` and keep the row non-final until tightened.

A preservation gap does not automatically belong back in the rewritten main
page. First check whether the fact is already preserved in a canonical
reference, troubleshooting, or generated page in the destination set. Prefer a
short retrieval link from the main page over duplicating exhaustive detail,
unless the fact is required for the 80/20 workflow on that page.

After `audit.mapped.json` exists, hand off to the audit phase:

- `hydrate` produces `audit.hydrated.json`.
- `validate --out` produces `audit.validated.json`.
- `render` produces the Markdown report and HTML viewer.

Do not claim the preservation audit is complete while `validate` reports
errors.

### 7. Rewrite

Rewrite in this order:

1. Make the first screen answer what the reader can do and why this page exists.
2. Put the recommended path before alternatives.
3. Apply the reader contract before adding or keeping material: keep only the
   audience, outcome, decisions, and common operational detail needed for this
   page.
4. Move maintainer-only architecture, implementation detail, exhaustive tables,
   and rare details to the planned reference pages.
5. Preserve source tabs, checklists, numbered operational lists, card groups,
   and next-step sections when they still serve the reader better than prose.
6. Preserve concise routing tables when they help readers choose commands,
   config paths, harnesses, plugins, providers, or references.
7. Add troubleshooting from observable symptoms, not internal guesses.
8. Link related concepts, guides, references, diagnostics, and adjacent tools.
9. Move product-limit, detect-only, and diagnostic caveats to troubleshooting or
   diagnostics unless they affect the setup step itself.
10. Replace dense tables with sections, accordions, or lists when rows need more
   than compact lookup text.
11. Preserve the source page's reason-for-existence and decision rationale when
    they help readers choose the right path.

Add `doc-schema-version: 1` to the YAML frontmatter of every docs page that the
refactor migrates, creates, or materially rewrites. Apply it only to docs page
files, not `docs.json`, glossary JSON, or other non-page metadata. If a
migrated page is generated, update the generator so regeneration preserves the
marker instead of hand-editing generated output.

Do not leave placeholders such as "TODO", "TBD", or "see docs" unless the user
explicitly asks for a draft.

### 8. Compare old and new

After editing, compare the old and new page:

- Confirm all behavior-sensitive facts were kept, moved, or intentionally
  deleted with source-backed reason.
- Check that the main page still covers the 80/20 scenario end to end.
- Check that the page still obeys the locked reader contract and has not pulled
  adjacent maintainer, architecture, reference, or rare-debugging workflows back
  into the main reader path.
- Check that source tabs, checklists, numbered operational lists, card groups,
  and next-step sections were preserved or have an explicit reason for changing.
- Check that reference pages remain exhaustive for the scope they claim.
- Check that links from the target page reach moved details.
- Check that headings are stable, searchable, and action-oriented.
- Check that troubleshooting did not grow beyond the source or common reader
  failures without a clear reason.
- Check that dense lookup material still has a readable shape; do not compress
  multi-paragraph explanations into table cells.

If the refactor deliberately removes relevant material, say where it went or why
it was removed in the final report.

### 9. Apply reviewer feedback

When reviewer feedback changes the rewrite, update the docs and audit together:

- Do not treat review edits as prose-only. Reindex, remap, and validate affected
  audit mappings.
- If feedback asks for less detail, classify removed source detail as redundant,
  intentionally moved, or intentionally removed instead of marking broad coverage.
- Keep troubleshooting item count the same or lower during slimming refactors
  unless source material or common reader failures require more.
- Preserve source rationale and important modal emphasis unless source evidence
  proves they are obsolete.
- Run an independent semantic audit after multiple feedback rounds on a major
  rewrite. A clean schema validation is not semantic signoff.

### 10. Verify

Run the smallest reliable docs checks for the touched surface:

- `pnpm docs:list`
- `git diff --check -- <touched-files>`
- Targeted `pnpm exec oxfmt --check --threads=1 <touched-files>`
- `pnpm docs:check-mdx`
- `pnpm docs:check-links`
- `pnpm docs:check-i18n-glossary` when link text, navigation, labels, or glossary
  surfaces changed
- Generated-doc checks when schemas, generated config docs, API docs, or
  generated baselines are touched

Run commands and examples from the page whenever feasible. If you cannot verify
a behavior-sensitive claim, either remove the claim, mark the uncertainty in the
work-in-progress report, or ask for the missing source.

## Final Report

Report:

- What changed in the target page.
- What details moved and their destination pages.
- For audit-grade refactors, the `mapping-patch.json` and `audit.mapped.json`
  artifacts produced by the refactor phase.
- What source-of-truth checks backed behavior-sensitive claims.
- What validation ran and what failed for unrelated reasons.

Do not include a long rewrite diary. Lead with remaining risks only if there are
any.
