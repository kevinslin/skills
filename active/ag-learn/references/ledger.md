# Ledger

Use this reference when logging or counting `ag-learn` activity with `ag-ledger`.

## Logging `ag-learn`

When logging an `ag-learn` run, set structured fields:

- `--invoked-skill ag-learn`
- `--mode default|review|code`
- `--parent-session-id <session-id>` when the learn run follows a parent, forked, or delegated session

## Evidence Classes

Use direct invocation evidence for skill-frequency counts:

- `ag-ledger` `invoked_skill`
- explicit `$skill` user request
- named-skill user request
- transcript or tool output showing the skill workflow was actually used
- durable artifacts produced by that skill

Use catalog evidence only for coverage:

- skill names listed in `AGENTS.md`
- skill inventories
- dependency metadata
- static instructions that enumerate available skills

Do not count catalog-only sessions as skill invocations.
