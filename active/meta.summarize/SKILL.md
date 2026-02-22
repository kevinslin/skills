---
name: meta.summarize
description: Summarize Codex activity from ag-ledger using optional `scope`, `lookup`,
  and `groupby` arguments (`meta.summarize [scope] [lookup] [groupby]`). Use when
  asked to summarize the current conversation (`convo`), summarize sessions that started
  in the current workspace (`workspace`), or summarize all sessions across workspaces
  (`all`) over current day, last 24 hours, last week, or last month.
dependencies: []
---

# Meta Summarize

## Overview

Generate concise summaries from ag-ledger entries.

## Workflow

1. Parse optional arguments: `meta.summarize [scope] [lookup] [groupby]`.
- `scope`:
  - `convo` (default): summarize current conversation/session.
  - `workspace`: summarize all sessions whose first event starts in the current workspace.
  - `all`: summarize all sessions across all workspaces for the lookup window.
- `lookup`:
  - `current_day` (default): today from local `00:00` to now.
  - `day`: last 24 hours.
  - `week`: last 7 days.
  - `month`: last 30 days.
- `groupby`:
  - `none` (default): no grouping; keep chronological output.
  - `session`: group output by session id.
  - `workspace`: group output by workspace path.
2. Resolve query targets.
- For `convo`, use `$CODEX_THREAD_ID` as session id (or ask for a session id if unavailable).
- For `workspace`, use the current working directory as workspace root.
- For `all`, no scope filter is applied; include all workspaces.
3. Load events from ag-ledger using lookup time bounds.
- Run `ag-ledger filter --from ... --to ...` and apply `--session` when scope is `convo`.
- For `workspace`, include sessions that have a `session start:` entry in the lookup window and whose start workspace matches the workspace root.
- For `all`, include every event returned in the lookup window.
- If `ag-ledger` is not on `PATH`, run `/Users/kevinlin/code/skills/active/ag-ledger/scripts/ag-ledger`.
4. Produce output using this exact template:

```markdown
### [short title of conversation]
- started: [time]
- session: [session id]

summary:
[summary in 1-3 sentences]

timeline:
- ... [pull from ledger]
```

## Field Rules

- Set `started` to the first included event timestamp.
- For `convo`, set `session` to the conversation session id.
- For `workspace` and `all`, set `session` to a concise multi-session label (single id or session count with sample ids).
- Derive `short title` from the dominant task (for `convo`) or workspace activity (for `workspace`).
- For `workspace`, group `summary` by workspace path (one grouped line per workspace).
- For `workspace`, group `timeline` by workspace path, then list chronological events within each workspace group.
- For `all`, apply `groupby` to both `summary` and `timeline`:
  - `none`: chronological timeline across all events.
  - `session`: grouped by session id.
  - `workspace`: grouped by workspace path.
- For `convo`, write `summary` in 1-3 sentences based only on ledger events.
- For `convo`, write `timeline` as chronological bullet points from the ledger.
- If no entries exist in the selected scope/lookup window, state that explicitly.

## Helper Script

Run `python3 scripts/summarize_from_ledger.py [scope] [lookup] [groupby]` to render the template.

Optional flags:
- `--session <session-id>`: override session id for `convo`.
- `--workspace <path>`: override workspace root for `workspace`.
