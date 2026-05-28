---
name: claw-score
description: Audit an OpenClaw maturity-scorecard surface into an evidence-backed component score report. Use when given a surface from an OpenClaw maturity-scorecard.md and asked to score coverage, quality, readiness, or generate a detailed surface report plus per-component subreports.
dependencies:
- mem
---

# claw-score

Use this skill to turn one row from an OpenClaw maturity scorecard into a
detailed, evidence-backed report for that surface and one subreport per major
component.

## Inputs

Required:

- Surface name: one surface from `reports/maturity-scorecard.md`, such as
  `Gateway runtime and WebSocket protocol`.

Optional:

- Scorecard path. If absent, find a nearby `reports/maturity-scorecard.md`.
- Output directory. If absent, write beside the scorecard.
- Existing surface report or component notes to update.

Default output names:

- Main report: `<surface-slug>-feature-matrix.md`.
- Component notes: `<surface-slug>-feature-matrix.<component-slug>.md`.
- If the user asks for a subfolder, place both the main report and notes inside
  `<surface-slug>/` and keep the same filenames.

Worked example shape: the Gateway audit used
`.mem/main/specs/25-lts-release-placeholder/reports/gateway-runtime-websocket-feature-matrix.md`
plus one note per feature family.

## Workflow

1. Resolve source and target.
   - If the user gives a scorecard path, use it.
   - Otherwise search from the current repo for `reports/maturity-scorecard.md`.
   - Read the scorecard and locate the requested surface. If multiple rows
     match, ask one concise question.
   - Derive a stable lowercase slug by replacing non-alphanumeric runs with
     `-`, trimming leading/trailing dashes, and keeping established local slug
     spelling if an existing report uses it.
   - Lock the canonical output root once. If the user later says a public docs
     or maintainer-docs copy is now the source of truth, copy the full artifact
     set there and make all subsequent edits against that new root only.

2. Build the component inventory.
   - Decompose the surface into significant user-facing or operator-facing
     feature families, not code-package names.
   - Prefer 6-15 components. Fewer can hide risk; many tiny components make
     scoring noisy.
   - For each component, record significant features, likely docs/source/test
     anchors, search anchors, and adjacent out-of-scope surfaces.
   - If an existing matrix exists, preserve useful component names and links
     unless the evidence shows the split is wrong.

3. Check archive freshness before scoring.
   - Always run `gitcrawl doctor --json`.
   - Always run `discrawl status --json`.
   - If either command is unavailable or exits non-zero, stop and report an
     error. Do not score from partial archive evidence.
   - Record the exact freshness result in every component note.
   - Absence of reports is neutral only when freshness checks succeeded and the
     component note records the exact feature-specific queries used.
   - If archive-backed quality evidence is stale, unavailable, or queried too
     narrowly, stop before aggregation and report the specific archive/query
     gap to repair. Do not treat silence as a positive signal.

4. Research each component in parallel.
   - Use one subagent per component.
   - Each component agent writes exactly one component note before aggregation.
   - Give every component agent the same score policy and component-note
     template. Explicitly forbid a Completeness score and forbid using test
     coverage, integration depth, or lack of tests as Quality inputs.
   - Require exact score lines so the aggregator does not need to infer intent:
     `- Score: \`<Label> (<N>%)\`` for both Coverage and Quality.
   - If parallel subagents are unavailable, stop and report that the skill
     cannot satisfy the audit contract in the current environment unless the
     user explicitly authorizes a serial fallback.
   - Read current OpenClaw docs, source, integration/e2e/live tests, unit tests,
     gitcrawl results, and discrawl results. Use `rg`/`rg --files` for local
     discovery.

5. Score only Coverage and Quality.
   - Coverage and Quality both use `0-100` plus the maturity labels
     `Complete`, `Stable`, `Beta`, `Alpha`, or `Experimental`.
   - Both scores use maturity-scorecard thresholds:
     `Complete = 95-100`, `Stable = 80-95`, `Beta = 70-80`,
     `Alpha = 50-70`, and `Experimental = 0-50`. At shared boundaries,
     choose the higher maturity label.
   - Coverage measures integration, e2e, live, or real server/runtime flow
     evidence across the component. Unit tests help confidence but never make a
     feature covered by themselves.
   - Quality must not depend on unit, integration, e2e, live, or real runtime
     test coverage. Test proof belongs only to Coverage.
   - Quality is about implementation robustness, product/operational behavior,
     docs/source alignment, operator clarity, security posture, and lived
     bug/regression/confusion record.
   - More gitcrawl or discrawl bug reports, regressions, failures, or operator
     confusion lower Quality. Absence of reports is neutral after successful
     freshness checks and recorded queries.
   - Do not create a Completeness score. Missing behavior lowers Quality only
     when docs, source contracts, the matrix inventory, or concrete user or
     maintainer requests make that behavior expected for the current feature.

6. Write component notes.
   - Use `./references/component-note-template.md`.
   - Coverage and Quality score labels must be `Complete`, `Stable`, `Beta`,
     `Alpha`, or `Experimental`.
   - Always keep and populate `## Evidence` in every component note. When
     updating an existing note, preserve useful current evidence citations and
     archive queries unless they are stale or contradicted by the refreshed
     audit.
   - Structure evidence like the Gateway notes: `### Docs`, `### Source`,
     `### Integration tests`, `### Unit tests`, `### Gitcrawl queries`, and
     `### Discrawl queries`.

7. Aggregate after all component notes exist.
   - Read every component note.
   - Reject notes with missing concrete evidence, missing `## Evidence`,
     labels outside numeric bands, or quality rationales that use test coverage
     or lack of tests.
   - Reject notes whose `## Evidence` section lacks docs/source/test/archive
     query subsections or feature-specific archive queries.
   - Reject notes with Coverage or Quality labels outside the maturity-label
     set.
   - Reject notes whose score lines do not use the exact
     `- Score: \`<Label> (<N>%)\`` format.
   - Run a local text scan before aggregation for stale policy terms such as
     `Completeness Score`, `completeness score`, or quality rationales that cite
     test coverage as a reason to raise or lower Quality.
   - If any required archive-backed quality dimension is `unverified`, stop
     before updating rollups and list the notes and evidence that need repair.
   - Compute simple arithmetic means for Coverage and Quality.
   - Round percentages to the nearest whole number.
   - Link every matrix row to its component note.

8. Write the main surface report.
   - Use `./references/surface-report-template.md`.

   In `Detailed feature inventory`, include each component's significant
   features, primary docs, and major quality/completeness gaps. These gaps are
   evidence text, not a scored dimension.

   When updating an older report shape, migrate it in place:

   - Collapse any separate `## Scored matrix` into `## Matrix`.
   - Keep component-note links in the `Feature family` column.
   - Move row-level known gaps into each component's `Detailed feature
     inventory` entry.
   - Remove stale Completeness rollups, columns, and sections.

9. Verify.
   - Confirm the main report and every component note exist.
   - Confirm the main report links to every component note.
   - Confirm no Completeness score, rollup, or scored column remains.
   - Confirm Quality rationale excludes test coverage and integration depth.
   - Confirm every component note keeps `## Evidence` with docs/source/test,
     gitcrawl, and discrawl entries.
   - Confirm every score line uses `- Score: \`<Label> (<N>%)\``.
   - Confirm the chosen output root is the only artifact root modified after any
     source-of-truth switch.
   - Run `git diff --check` over the changed report files.

## Output Contract

- One main report for the selected surface.
- One component note per major component.
- Scores for Coverage and Quality only.
- Archive freshness and exact query records in every component note.
- `## Evidence` preserved and populated in every component note.
- Evidence-grounded known gaps folded into component notes and the main
  inventory.
