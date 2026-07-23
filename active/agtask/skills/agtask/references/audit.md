# Audit archived Codex tasks

Use this workflow when the user invokes `$agtask audit`. Preserve the ownership
boundary: the Codex app owns archive state and the CLI owns ledger state. Never
infer archive state from a missing list result, task age, title, or conversation
status.

1. Run `python3 ./scripts/agtask audit --json`. It returns every ledger row
   whose status is exactly `active` plus one lookup request per real
   `session_id`; it does not mutate.
2. Resolve every requested session through Codex app thread APIs. Prefer an
   exact per-session read so an archived thread can be distinguished from a
   missing session. Classify each request as `archived`, `not_archived`,
   `missing`, or `error`. Use `archived` only when the exact API result
   explicitly reports archived state; a successful exact read with any other
   state is `not_archived`, an explicit not-found result is `missing`, and
   unavailable hosts or all other failures are `error`. Preserve the exact
   failure diagnostic in `detail`; do not turn missing or failed lookups into
   `archived`.
3. Pass one version-1 observation document to
   `audit --observations-json '<json>' --json`:

   ```json
   {
     "schema_version": 1,
     "sessions": [
       {"session_id": "<codex-session-id>", "state": "archived"},
       {"session_id": "<codex-session-id>", "state": "not_archived"},
       {"session_id": "<codex-session-id>", "state": "missing"},
       {
         "session_id": "<codex-session-id>",
         "state": "error",
         "detail": "<exact lookup error>"
       }
     ]
   }
   ```

4. Show the returned `affected_tasks` and every `unresolved` lookup to the
   user. If there are affected tasks, ask for explicit confirmation to archive
   exactly that displayed set. Do not treat silence, unavailable confirmation,
   an earlier general instruction, or approval of a different set as consent.
5. If the user declines or confirmation is unavailable, stop. The planning
   command has made no ledger changes.
6. After explicit confirmation, repeat every Codex lookup and build a fresh
   observation document. Submit it with `--apply <plan_token> --json`. The CLI
   recomputes the token under its SQLite write lock. If Codex archive results,
   the active set, or an affected row changed, it fails closed or returns no
   candidates; show any new plan and ask again. Never reuse the
   pre-confirmation observations without refreshing them or substitute a token
   from another run.

The apply phase moves only still-active, positively observed archived sessions
to the ledger's existing terminal `done` state. It sets `closed`, appends
`status:active->done` and `archival:codex-thread-archived`, and does not run
close hooks or acquire a merge claim because Codex is already archived.
Repeated discovery and planning are read-only; repeating an applied audit is a
no-op once no matching active task remains. Logical `id` stays ledger-owned and
Codex lookups always use `session_id`.
