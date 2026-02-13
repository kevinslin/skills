---
name: dev.debug
description: "Diagnose runtime issues in the OpenAI monorepo with three workflows: temporary local instrumentation, clean-log process management, and Tilt log investigation. Use when a user asks to debug behavior, add temporary `bondy` log statements, clean ANSI-filled logs from `/tmp/service-name.log`, or inspect cleaned log output."
---

# dev.debug

## Workflow Decision

1. Run `add-log-statements` when the user needs instrumentation added to code.
2. Run `clean-logs` when the user asks to clean logs or manage clean-log tailing jobs.
3. Run `investigate-logs` when the user already has logs to inspect.
4. Ask one short clarifying question if the requested workflow is unclear.

## add-log-statements

1. Identify the service and failing path from the user's description.
2. Use `$monorepo-navigator` to locate the relevant navfile and flow docs unless the user already provided a flow doc/spec/asset.
3. Add temporary logs that always start with `bondy`.
4. Instrument branch points so behavior is easy to trace:
   - Log condition inputs before each branch.
   - Log which branch is taken.
   - Log stable IDs (request, user, object) needed to correlate events.
5. Keep these changes local:
   - Do not push instrumentation-only changes.
   - Do not include instrumentation in PR commits.
6. Return a concise handoff:
   - Files changed.
   - `rg "bondy"` command(s) to locate logs quickly.
   - Repro steps used.

## investigate-logs

This workflow is intentionally incomplete and should be filled in later.

1. Read only service logs in `/tmp` that match `/tmp/<service-name>.log`.
2. Ignore unrelated files in `/tmp` and avoid broad globs over all files.
3. Prefer the clean log when available: `/tmp/<service-name>.clean.log`.
4. If the clean log is missing:
   - Run `clean-logs.sh <service-name>` (or the `clean-logs` workflow).
   - If that utility is unavailable, run `scripts/make_clean_log.sh <service-name>` as fallback.
5. Start analysis with targeted filters:
   - `rg "bondy" "/tmp/<service-name>.clean.log"`
   - `rg "ERROR|Exception|Traceback|panic|FATAL" "/tmp/<service-name>.clean.log"`

## clean-logs

Use this workflow when logs contain ANSI escape characters and the user asks to clean, restart, or cancel clean-log jobs.

### Utility behavior

The shared utility is:

```bash
# Copy everything in the source log to /tmp/<service>.clean.log
clean-logs.sh <service>

# Tail and continuously write to /tmp/<service>.clean.log
clean-logs.sh <service> --method tail
```

### Required behavior

1. If the user asks to clean logs, gather the target service names and run clean-log jobs for each service in a background shell.
2. If service names are missing, ask for service names before starting.
3. If the user asks to restart clean logs, cancel existing background clean-log jobs, then start them again.
4. If the user asks to cancel clean logs, cancel existing background clean-log jobs only.
5. Use `scripts/manage_clean_logs.sh` to enforce consistent process handling.

### Commands

```bash
# Start background clean-log jobs (default method is copy)
scripts/manage_clean_logs.sh start <service-a> <service-b>

# Start background tail jobs
scripts/manage_clean_logs.sh start <service-a> <service-b> --method tail

# Restart background jobs (cancel + start)
scripts/manage_clean_logs.sh restart <service-a> <service-b> --method tail

# Cancel background jobs
scripts/manage_clean_logs.sh cancel

# Check currently tracked jobs
scripts/manage_clean_logs.sh status
```

## References

- `references/investigate-logs.todo.md` for TODO items that will define the full log investigation workflow later.
