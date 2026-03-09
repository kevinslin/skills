---
name: ag-ledger
description: Record and query append-only agent activity ledger entries using local
  JSONL daily files under META_LEDGER_ROOT (default ~/.llm/ag-ledger). Use when agents
  should log session start, notable changes, or session end, and when reviewing activity
  by session, workspace, or time range.
dependencies: []
---

# AG Ledger

## Overview

Track agent activity as append-only JSON lines and query prior entries without
editing historical records. Use the bundled CLI in `scripts/ag-ledger`.

## Required Workflow

1. Run `ag-ledger init` once per workspace to install/update AGENTS.md guidance, including the PATH export for the bundled CLI.
2. At session start, run:
```bash
ag-ledger append-current "session start: <what you plan to do>"
```
If a specific skill workflow is active, add structured metadata:
```bash
ag-ledger append-current --invoked-skill ag-learn --mode review "session start: review last 24 hours"
```
3. After each notable change (scope shift, major implementation step, blocker,
or handoff checkpoint), run:
```bash
ag-ledger append-current "<notable change summary>"
```
4. At session end, run:
```bash
ag-ledger append-current "session end: <result and next step>"
```

For manual/non-Codex usage, use `ag-ledger append <session-id> "<message>"`.

## Data Layout

- Root directory: `$META_LEDGER_ROOT` (default `~/.llm/ag-ledger`)
- Data directory: `$META_LEDGER_ROOT/data`
- Daily file: `ledger-YYYY-MM-DD.md`
- Format: append-only JSONL, local timestamp at minute precision
```json
{"time":"YYYY-MM-DD HH:MM","workspace":"/abs/path","session":"session-id","msg":"task summary"}
```
- Optional structured fields:
  - `invoked_skill`: canonical skill name when the entry is part of a specific skill workflow
  - `mode`: execution mode such as `review`, `code`, or `apply`
  - `parent_session_id`: parent/fork/root session id for subagent lineage

## CLI Commands

Run from the skill directory or place `scripts/` on `PATH`.

```bash
# append entry (manual session id)
ag-ledger append <session-id> "<message>"
ag-ledger apppend <session-id> "<message>"
ag-ledger append <session-id> --invoked-skill ag-learn --mode review --parent-session-id <parent-session-id> "<message>"

# append entry using current Codex thread (CODEX_THREAD_ID)
ag-ledger append-current "<message>"
ag-ledger appendc "<message>"
ag-ledger append-current --invoked-skill ag-learn --mode review "<message>"

# print current Codex session id (CODEX_THREAD_ID)
ag-ledger session-id

# filter entries
ag-ledger filter --session <session-id>
ag-ledger filter --workspace <workspace-abs-path>
ag-ledger filter --invoked-skill ag-learn
ag-ledger filter --mode review
ag-ledger filter --parent-session-id <parent-session-id>
ag-ledger filter --from YYYY-MM-DD
ag-ledger filter --from "YYYY-MM-DD HH:MM"
ag-ledger filter --from "YYYY-MM-DD HH:MM" --to "YYYY-MM-DD HH:MM"

# install or update AGENTS.md block
ag-ledger init
```

## Notes

- `ag-ledger init` searches upward from the current directory for `AGENTS.md`;
  if none is found, it creates one in the current directory and adds a PATH export
  for the bundled CLI.
- `ag-ledger filter --from YYYY-MM-DD` starts at local `00:00`.
- `ag-ledger filter --to YYYY-MM-DD` ends at local `23:59`.
- In Codex, `ag-ledger append-current` reads the session id from `CODEX_THREAD_ID`.
- Prefer structured fields whenever a skill workflow is active so later review jobs can distinguish real invocations from catalog mentions in `AGENTS.md` or other static docs.
