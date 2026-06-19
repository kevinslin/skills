---
name: ag-ledger
description: Record, sync, and query local agent activity ledger entries.
dependencies: []
---

# AG Ledger

## Overview

Track agent activity as append-only JSON lines and query prior entries without
editing historical records. Prefer the bundled `sync` workflow for Codex
conversations so activity tracking happens through a recurring automation rather
than per-conversation AGENTS injection.

## Recommended Workflow

1. Run a recurring automation with `execution_environment = "local"` that
   executes `ag-ledger sync` from the skill directory. Sync does not mutate the
   repository, so do not create a disposable Git worktree for each run.
2. Let `sync` scan recent Codex rollout transcripts, derive deterministic
   `session start`, `notable change`, and `session end` entries, and persist
   state so unchanged files are skipped on later runs.
3. Treat the returned `closeout_state` as terminal for that scheduled run:
   - `settled`: no missing entries and no failures.
   - `live_frontier`: entries were appended without failures. Stop and let the
     next scheduled run verify the moving frontier; do not loop until zero.
   - `blocked`: at least one file or state write failed. The second consecutive
     identical blocker fingerprint sets `stable_blocked=true`.
4. If a sandboxed run is blocked only by the shared-ledger write barrier,
   request one write-capable retry. Stop after that retry and report its state;
   do not create a multi-rerun convergence loop.
5. Use manual `append` or `append-current` only for explicit ad hoc entries or
   non-Codex workflows.

Recommended automation cadence:
- hourly

Recommended automation command:
```bash
./scripts/ag-ledger sync
```

## CLI Commands

Run from the skill directory or place `scripts/` on `PATH`.

```bash
# sync recent Codex conversations into the ledger
ag-ledger sync
ag-ledger sync --lookback-minutes 180
ag-ledger sync --session-root ~/.codex/sessions
ag-ledger sync --state-file ~/.llm/ag-ledger/state/sync-state.json

# inspect the last persisted closeout without scanning transcripts
ag-ledger status
ag-ledger status --state-file ~/.llm/ag-ledger/state/sync-state.json

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

# legacy compatibility command
ag-ledger init
```

`ag-ledger init` is deprecated. It no longer edits `AGENTS.md`; it prints a
migration note that points callers to the automation-first `sync` workflow.

## Data Layout

- Root directory: `$META_LEDGER_ROOT` (default `~/.llm/ag-ledger`)
- Ledger data directory: `$META_LEDGER_ROOT/data`
- Sync state file: `$META_LEDGER_ROOT/state/sync-state.json`
- Daily file: `ledger-YYYY-MM-DD.md`
- Format: append-only JSONL, local timestamp at minute precision

The sync state includes a closeout record:
```json
{
  "closeout": {
    "state": "blocked",
    "reason": "files_failed",
    "stable": true,
    "blocker_fingerprint": "sha256",
    "blocker_occurrences": 2
  }
}
```

Both `sync` and `status` print the flattened fields `closeout_state`,
`closeout_reason`, and `stable_blocked`. Blocked output also includes
`blocker_fingerprint` and `blocker_occurrences`.

Manual entries use the existing shape:
```json
{"time":"YYYY-MM-DD HH:MM","workspace":"/abs/path","session":"session-id","msg":"task summary"}
```

Sync-derived entries add source metadata so rows can be traced back to a rollout
file:
```json
{
  "time":"YYYY-MM-DD HH:MM",
  "workspace":"/abs/path",
  "session":"session-id",
  "msg":"session start: inspect current ag-ledger behavior",
  "entry_kind":"session_start",
  "source_key":"/abs/rollout.jsonl:42:session_start",
  "source_path":"/abs/rollout.jsonl",
  "source_line":42,
  "source_phase":"commentary",
  "source_role":"assistant",
  "source_turn_index":1
}
```

Optional structured fields supported on manual entries and sync-derived rows:
- `invoked_skill`: canonical skill name when the entry is part of a specific skill workflow
- `invoked_skills`: ordered list of skill names when a transcript turn names more than one
- `invocation_trigger`: heuristic classification such as `explicit`, `implicit`, `required-by-repo`, or `catalog-only`
- `mode`: execution mode such as `review`, `code`, or `apply`
- `parent_session_id`: parent/fork/root session id for subagent lineage

`sync` fills `invoked_skill` and `invoked_skills` when a transcript message
explicitly names known skills using backticks, `$skill`, a source path, JSON
metadata, or plain `using` / `running` language. It also sets
`invocation_trigger` so review tooling can filter structured data instead of
parsing prose. Sync and status summaries identify themselves with
`invoked_skill=ag-ledger`, `mode=sync|status`, and
`invocation_source=ag-ledger-cli`.

## Notes

- `sync` defaults to a 24-hour lookback window.
- `sync` reads rollout transcripts from `$CODEX_HOME/sessions` when `CODEX_HOME`
  is set, otherwise `~/.codex/sessions`.
- `sync` skips unchanged rollout files by file fingerprint and re-checks changed
  files without duplicating existing ledger rows.
- Sync uses transcript event timestamps, not sync execution time, when choosing
  the target daily ledger file.
- A successful append run is `live_frontier`, not `settled`. Settlement requires
  a later run with zero appended entries and zero failures.
- Stable blocker matching uses normalized failure kind, operation, and storage
  scope so changing rollout filenames do not hide a repeated write barrier.
