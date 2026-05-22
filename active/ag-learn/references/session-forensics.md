# Session Forensics

Use this reference when the evidence is not already present in the current context, when the user names a session, or when a formal learn note needs an auditable evidence trail.

## Session Lookup

Resolve the active session id in this order:

1. `$CODEX_THREAD_ID`
2. `ag-ledger session-id`
3. `../ag-ledger/scripts/ag-ledger session-id`, resolved relative to this `SKILL.md` directory
4. `dev.llm-session`

Use an allowlisted lookup for environment-derived ids:

```bash
printf '%s\n' "$CODEX_THREAD_ID"
```

Do not run broad environment dumps such as `env`, `printenv`, or prefix greps for `OPENAI`, `SESSION`, or `TOKEN`; they can expose provider keys or other secrets in tool output.

Use the sibling `ag-ledger` script fallback when `ag-ledger` is not on `PATH`.

## Parent And Forked Sessions

If the active session was forked or delegated, include the parent evidence when it could explain the mistake.

Parent signals:

- `ag-ledger` `parent_session_id`
- `session_meta.payload.forked_from_id` in `~/.codex/sessions/**/rollout-*.jsonl`
- `source.subagent.thread_spawn.parent_thread_id` in rollout JSONL

Label parent-derived findings clearly.

## Evidence Scan

For default/current-session learning, always scan the active rollout JSONL before narrowing to a specific learning. The current user complaint is a seed for search terms, not a boundary.

Use a two-pass scan for default and formal session-specific learning:

1. Read or search the active rollout JSONL and any parent/forked rollout JSONL. Identify mistakes, uncertainty, repeated friction, user corrections, explicit skill invocations, interruptions, and time sinks.
2. Inspect only the extra artifacts needed to explain the selected findings, such as progress files, logs, diffs, tests, PR comments, generated docs, or command output.

Do not rely only on the current context window when writing learn notes. If a first pass finds only the most recent friction, run a quick keyword sweep over the same rollout for adjacent skill names, user corrections, and prior "why"/"not working"/"wrong" messages before finalizing.

## Skill And Shortcut Evidence

When the session includes an explicit `$skill` mention, named skill request, or `trigger:<shortcut>`, read the controlling source before judging compliance.

For bundled shortcuts:

1. Resolve the shortcut through `../dev.shortcuts/SKILL.md`.
2. Read the matching file under that skill's `./references/shortcuts/` directory.
3. Compare the shortcut contract and the wrapped skill contract together.
