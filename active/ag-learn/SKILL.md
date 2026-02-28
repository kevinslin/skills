---
name: ag-learn
description: learn from the current session, run a time-bounded review across sessions,
  or reflect on a merged PR to identify simplicity and maintainability improvements.
  Use when asked to "learn", "review sessions", or "learn from PR"
dependencies:
- ag-ledger
- dev.llm-session
version: 0.0.0
---

# Learn

Learn from the current session, or run a multi-session review over a time interval.

## Capabilities

- consolidate learnings from conversation and persist it in learnings log
- identify mistakes or uncertainty points in the current conversation
- identify areas of optimization that could improve the speed or quality of this task in the future
- identify desires you have to make things better next time
- synthesize recurring patterns across multiple sessions
- route learnings toward skills, AGENTS.md, repo docs, or personal workflow updates

## Constants

- %%LEARN_ROOT: $HOME/.llm/skills/learn/
- %%LEARN_ARCHIVE: %%LEARN_ROOT/.archive
- %%SKILL_TOKEN: `ag-learn`

## General Rules

1. Evidence first. Before writing learnings, inspect the smallest durable artifact set that explains what happened. Good defaults are progress files, logs, generated docs, diffs, test failures, and command output.
2. Resolve the active session id in this order:
   - `ag-ledger session-id`
   - `$CODEX_THREAD_ID`
   - `dev.llm-session` as fallback
3. Use the literal `ag-learn` token in output filenames. 
4. Prefer 2-3 high-signal items. Do not pad with weak learnings.

## Workflow
### Default (current session)
1. Resolve the current session id using the canonical lookup order above.
2. Review the full conversation and inspect the smallest durable artifact set for the task.
3. List the points where you made a mistake, were uncertain, or found a reusable optimization opportunity.
4. For each item, write a short analysis using the required template.
5. If there are no mistakes or uncertainties, state that explicitly.

### Review mode: `review [time interval] [path]`
Use this mode when the user asks to "review [time interval] [path]".
1. Convert the requested interval into an exact date/time window and report it back in absolute terms.
2. Discover candidate sessions in this order:
   - `ag-ledger` entries in the requested window
   - persisted learn files in `%%LEARN_ROOT` (including legacy `meta-learn-*` files)
   - `dev.llm-session` / transcript inspection to fill gaps
3. Report coverage before analysis: how many candidates came from each source and which exact sessions matched.
4. If `[path]` is provided, filter to sessions whose working directory is within that path (prefix match on absolute paths). If the interval or path is ambiguous, ask a clarifying question before proceeding.
5. Prioritize inspection order before opening transcripts in depth.
   - Group repetitive sessions by workflow or workspace when the ledger shows they are materially identical no-op runs.
   - Use ledger summaries as sufficient evidence for repetitive no-op clusters unless a run shows an anomaly such as an error, a missing ledger counterpart, a surprising artifact change, or a large token outlier.
   - If a matched session already has a persisted learn file and it still matches the durable evidence, treat that learn file as primary evidence instead of re-deriving the same learning.
6. For each matching session or cluster, inspect the relevant artifacts and repeat the Default workflow. Produce a separate output file per session when needed. For repetitive clusters, one grouped note is acceptable if anomalies are broken out separately.
7. After the per-session notes, write one rollup file for the current review session that includes:
   - the exact review window
   - the matched session list
   - recurring patterns with frequency counts
   - the top 3-5 recommendations across sessions
   - likely targets for follow-up changes
8. If no sessions match, state that explicitly.

### Code mode: `code`
Use this mode when the user asks to learn from the current coding session
1. Resolve the current session id using the canonical lookup order above.
2. Review the current coding session, and if a PR was submitted, any review comments that were addressed.
3. Read each changed file in the current codebase (post-merge state), plus the smallest relevant test/log/review artifacts.
4. For each file, reflect with hindsight: knowing the full implementation now, what would you do differently to make the code simpler and more maintainable? Consider:
   - Duplicated patterns that could be consolidated
   - Abstractions that are too complex or too shallow
   - State management issues (stale state, missing resets, race conditions)
   - API surface problems (leaky internals, unnecessary casts, inconsistent naming)
   - Redundant logic (duplicate checks, dead code paths)
   - Missing edge cases discovered during or after implementation
5. For each finding, write an analysis using the Required Output Template.

### Archive Learning
A learning is archived when it has already been used. When the user archives a learning, move it to %%LEARN_ARCHIVE 

## Required Output Template

Use this exact structure for each item to create a numbered list:

```
## [number] Improvement Opportunity

[describe the mistake or optimization opportunity]

### Why
[describe why]

### Learning
[what you learned]

### Recommendations
[what to remember to not make this mistake again]

### Routing
- target: [skill|AGENTS.md|repo docs|workflow|none]
- scope: [local|repo|cross-session]
- promote: [yes|no]
```

Write learnings to %%LEARN_ROOT/%%SKILL_TOKEN-{YYYY-MM-DD}-[agent-session-id]-[kebab-description-of-task].md.

- Use `ag-ledger session-id` or `$CODEX_THREAD_ID` for the active session when possible; use `dev.llm-session` only as fallback.
- If `$HOME/.llm/skills/learn` does not exist, create it.
- In review mode, write one file per reviewed session when needed, plus one rollup file for the current review session.
