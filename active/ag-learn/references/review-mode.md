# Review Mode

Use this reference when the user asks to review a time interval, such as `review past 24 hours /path`.

## Workflow

1. Convert the requested interval into an exact date/time window and report it in absolute terms.
2. Discover candidate sessions in this order:
   - `ag-ledger` entries in the requested window
   - persisted learn files in `LEARN_ROOT`, including legacy `meta-learn-*` files
   - `dev.llm-session` or transcript inspection to fill gaps
3. If a path is provided, filter to sessions whose working directory is within that absolute path.
4. Classify evidence before counting skill invocations:
   - Direct invocation evidence: `ag-ledger` `invoked_skill`, explicit `$skill` or named-skill requests, transcript/tool output showing the skill workflow was used, or durable artifacts produced by that skill.
   - Catalog evidence: `AGENTS.md` catalogs, skill inventories, dependency metadata, and static skill lists.
   - Count a skill invocation only with direct evidence. Keep catalog-only sessions in coverage counts but exclude them from skill-frequency analysis.
5. Report coverage before analysis:
   - exact review window
   - candidate count by source
   - matched session ids
   - direct-invocation count
   - weak/catalog-only count
6. Prioritize inspection before opening transcripts deeply:
   - Group materially identical no-op runs.
   - Use ledger summaries for repetitive no-op clusters unless an anomaly appears.
   - Prefer existing learn files as primary evidence when they still match the durable evidence.
7. Produce grouped findings when sessions repeat the same pattern. Break out anomalies separately.
8. Finish with a rollup containing:
   - exact review window
   - matched session list
   - coverage split between direct and catalog-only evidence
   - recurring patterns with frequency counts
   - top 3-5 recommendations
   - skill opportunities grouped into `create new` and `optimize existing`
   - likely apply targets

If no sessions match, state that explicitly.

## Output Files

Write one note per reviewed session only when needed. For repetitive clusters, one grouped note is enough. Always write one rollup file for the review run when persistence is requested.
