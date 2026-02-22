---
name: meta.summarize
description: Summarize the current Codex conversation/session from ag-ledger events using a fixed markdown template (title, started time, session id, short summary, timeline). Use when asked to summarize this conversation so far, create a session recap, or produce a ledger-based timeline.
---

# Meta Summarize

## Overview

Generate a concise session summary from ag-ledger entries.

## Workflow

1. Resolve the target session id.
- Prefer `$CODEX_THREAD_ID`.
- If it is unavailable, ask the user for the session id.
2. Load session events from ag-ledger.
- Run `ag-ledger filter --session <session-id>`.
- If `ag-ledger` is not on `PATH`, run `/Users/kevinlin/code/skills/active/ag-ledger/scripts/ag-ledger filter --session <session-id>`.
3. Produce output using this exact template:

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

- Set `started` to the first event timestamp.
- Set `session` to the requested session id.
- Derive `short title` from the dominant task in the ledger messages.
- Write `summary` in 1-3 sentences based only on ledger events.
- Write `timeline` as chronological bullet points from the ledger.
- If no entries exist, state that no ag-ledger events were found for the session and ask for a different session id.

## Helper Script

Run `python3 scripts/summarize_from_ledger.py --session <session-id>` to render the template from ledger events.
