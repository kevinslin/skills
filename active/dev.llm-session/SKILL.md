---
name: dev.llm-session
description: Derive Codex CLI session IDs and resume interactive sessions. Use when asked to resume Codex sessions, find or map session IDs, inspect ~/.codex/history.jsonl or ~/.codex/sessions, or troubleshoot Codex resume behavior.
---

# dev.llm-session

## Overview

Identify Codex session IDs from local history or session files and resume the
correct interactive session quickly.

## Workflow

### 1. Choose the lookup strategy

- **Most recent session**: Use `codex resume --last`.
- **Known prompt or keyword**: Search `~/.codex/history.jsonl`.
- **Known session file**: Inspect a JSON/JSONL file under `~/.codex/sessions`.
- **Different cwd than the original session**: Use `codex resume --all` or
  `codex resume --cd <DIR>` to avoid cwd filtering.

### 2. Derive the session ID

Use one of the scripts below (preferred) or inspect a session file directly.

**History search (preferred):**
```bash
python scripts/find_session_id.py --query "resume a session"
python scripts/find_session_id.py --last
```

**Session file inspection:**
```bash
python scripts/inspect_session_file.py ~/.codex/sessions/2025/09/27/rollout-*.jsonl --id-only
```

**Manual inspection (JSONL):**
```bash
head -n 1 ~/.codex/sessions/2025/09/27/rollout-*.jsonl
```
Look for `payload.id` in the `session_meta` line.

### 3. Resume the session

```bash
codex resume <SESSION_ID>
```

If the cwd has changed, prefer:
```bash
codex resume --all
codex resume --cd /path/to/original/workdir <SESSION_ID>
```

## Script Reference

### scripts/find_session_id.py

Search `~/.codex/history.jsonl` and print matching session IDs.

Options:
- `--query <text>` filter by substring match
- `--last` return only the most recent entry
- `--limit <n>` limit output rows (default: 10)
- `--full` disable truncation

### scripts/inspect_session_file.py

Read a JSON or JSONL session file and print metadata.

Options:
- `--id-only` print only the session id

## Data Locations

- `~/.codex/history.jsonl` contains `{ session_id, ts, text }` entries.
- `~/.codex/sessions/**/rollout-*.jsonl` includes `session_meta.payload.id`.
- `~/.codex/sessions/**/rollout-*.json` includes `session.id`.
