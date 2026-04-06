# `slop`

Use this reference when the user asks to audit a codebase for AI slop, generated-looking code, unnecessary abstraction, or similar heuristic quality problems.

## When To Lead With This Command

- Use it when the user asks for a slop audit, LLM-code audit, code smell pass focused on generated code, or a review for code that feels locally plausible but globally incoherent.
- Use it when the user wants concrete findings with file references and improvement advice, not vague commentary.

## Inputs

- Required: repo or workspace path when the target is not the current workspace.
- Optional: scope paths, languages/frameworks to prioritize, whether to propose cleanup patches, and whether to inspect only changed files or the broader codebase.

## Workflow

1. Build local context before judging quality.
   - Identify the repo root and inspect local guidance such as `AGENTS.md`, `README`, package metadata, or representative files.
   - Infer the repo's existing conventions before calling something slop. Judge against the codebase, not generic tutorial style.
2. Find candidate areas with targeted exploration.
   - Prefer `rg` and small file reads over broad claims.
   - Start with files that show suspicious signals: redundant wrappers, vague helper names, duplicated types, noisy comments, shallow tests, generic error handling, or newly added glue code that does not match surrounding patterns.
3. Evaluate each candidate against concrete slop heuristics.
   - Call out only issues with evidence in the code.
   - Common heuristics:
     - locally plausible code that does not fit the repo's architecture or naming patterns
     - extra abstraction layers, managers, or helpers that do not reduce real complexity
     - cargo-culted patterns copied from tutorials instead of matching local conventions
     - dead artifacts such as unused params, duplicate types, abandoned helpers, or half-wired config
     - comments that restate the obvious while hiding unclear design
     - tests that mirror implementation structure instead of proving behavior
     - broad `try/catch`, generic fallback values, or logging with no real recovery plan
4. Report findings in priority order.
   - For each finding, include the location, what slop characteristic is present, why it is harmful in this repo, and how to simplify or improve it.
   - Offer a small cleanup direction, not just criticism.
5. Close clearly.
   - If no concrete slop findings remain after sampling, say so explicitly.
   - Mention residual risk or sampling limits when the audit was partial.

## Guardrails

- Do not label vendored code, generated fixtures, snapshots, or deliberate boilerplate as slop unless the user explicitly wants those audited.
- Do not turn a style preference into a finding. Every finding should have a maintainability, clarity, correctness, or test-value cost.
- Do not make repo-wide claims from one suspicious file. Sample enough surrounding context to show the problem is real.
- Do not call code slop solely because it is verbose or recently generated. The issue is unnecessary or misleading structure, not authorship.

## Output

Return findings first, ordered by severity. For each finding, include:

- `file:line` reference
- short title
- what makes it slop
- why it hurts this codebase
- concrete improvement advice

Then include:

- open questions or assumptions
- a brief overall assessment of slop risk in the audited scope
