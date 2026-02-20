---
name: ag-ledger
description: Record and query append-only agent activity ledger entries using local JSONL daily files under META_LEDGER_ROOT (default ~/.llm/ag-ledger). Use when agents should log session start, notable changes, or session end, and when reviewing activity by session, workspace, or time range.
---

# AG Ledger

## Overview

Track agent activity as append-only JSON lines and query prior entries without
editing historical records. Use the bundled CLI in `scripts/ag-ledger`.

## Required Workflow

1. Run `ag-ledger init` once per workspace to install/update AGENTS.md guidance.
2. At session start, run:
```bash
ag-ledger append <session-id> "session start: <what you plan to do>"
```
3. After each notable change (scope shift, major implementation step, blocker,
or handoff checkpoint), run:
```bash
ag-ledger append <session-id> "<notable change summary>"
```
4. At session end, run:
```bash
ag-ledger append <session-id> "session end: <result and next step>"
```

## Data Layout

- Root directory: `$META_LEDGER_ROOT` (default `~/.llm/ag-ledger`)
- Data directory: `$META_LEDGER_ROOT/data`
- Daily file: `ledger-YYYY-MM-DD.md`
- Format: append-only JSONL, local timestamp at minute precision
```json
{"time":"YYYY-MM-DD HH:MM","workspace":"/abs/path","session":"session-id","msg":"task summary"}
```

## CLI Commands

Run from the skill directory or place `scripts/` on `PATH`.

```bash
# append entry (supports both append and apppend alias)
ag-ledger append <session-id> "<message>"
ag-ledger apppend <session-id> "<message>"

# filter entries
ag-ledger filter --session <session-id>
ag-ledger filter --workspace <workspace-abs-path>
ag-ledger filter --from YYYY-MM-DD
ag-ledger filter --from "YYYY-MM-DD HH:MM"
ag-ledger filter --from "YYYY-MM-DD HH:MM" --to "YYYY-MM-DD HH:MM"

# install or update AGENTS.md block
ag-ledger init
```

## Notes

- `ag-ledger init` searches upward from the current directory for `AGENTS.md`;
  if none is found, it creates one in the current directory.
- `ag-ledger filter --from YYYY-MM-DD` starts at local `00:00`.
- `ag-ledger filter --to YYYY-MM-DD` ends at local `23:59`.
