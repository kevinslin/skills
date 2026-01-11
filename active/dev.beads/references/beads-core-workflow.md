# Beads Core Workflow (Speculate)

## Day-to-day usage

1. Check beads health and ready work:
   - `bd status`
   - `bd ready`
   - `bd blocked`

2. Claim a task before working:
   - `bd update <id> --status in_progress`

3. Inspect details as needed:
   - `bd show <id>`

4. Create new work and link it:
   - `bd create "Short, specific title" -p <priority> --deps "discovered-from:<parent-id>"`
   - Dependency formats: `type:id` or `id` (example `discovered-from:bd-20,blocks:bd-15`)

5. Close finished work:
   - `bd close <id>` (or multiple ids: `bd close <id1> <id2>`)

6. Sync before ending a session:
   - `bd sync --from-main`

## Issue types

- bug
- feature
- task
- epic
- chore
- merge-request

## Priority rules

- Use `0-4` or `P0-P4` only.
- Do not use "high/medium/low".

## Core rules

- Use bd for all task tracking; do not use markdown TODOs.
- Link discovered work via `discovered-from` dependencies.
- Check `bd ready` before asking what to work on.
- Run `bd sync --from-main` at session end.
- Use `--json` for programmatic use.
- Do not use external issue trackers.
- Store AI planning docs in `history/` if the repo provides it.

## Session close protocol

Before saying "done", sync beads and follow the repo's commit workflow. A typical
sequence looks like:

```bash
git status
git add <files>
bd sync --from-main
git commit -m "..."
```

## Useful commands

- `bd ready` - Show issues ready to work (no blockers)
- `bd blocked` - Show blocked issues
- `bd show <id>` - Detailed issue view with dependencies
- `bd doctor` - Check and fix beads installation health
- `bd quickstart` - Quick start guide
- `bd prime` - Get workflow context (auto-called by hooks)
- `bd <command> --help` - See all flags for any command
