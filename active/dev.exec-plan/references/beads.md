# Beads Usage with Execution Plans

Use beads to track each phase of the execution plan so progress and dependencies are
durable across sessions.

## Read project instructions first

If `skills/.config/dev.beads.instructions.md` exists at the project root, read it and
follow its rules. Use it for project-specific naming, shortcut rules, and sync policy.

## Map plan phases to beads

1. Create a top-level bead for the plan. Include the plan title and link to the plan
   doc in the bead description.
2. Create a bead for each phase in the plan's Steps section.
3. Add dependencies between phase beads to match the plan order.

Example:

```bash
bd create "Plan: add cache layer" -p 2
bd create "Phase 1: research" -p 2 --deps "blocks:bd-123"
bd create "Phase 2: implementation" -p 2 --deps "blocks:bd-124"
bd create "Phase 3: testing and rollout" -p 2 --deps "blocks:bd-125"
```

## Use beads for each phase

For every phase:

- Set the phase bead to in progress before starting:
  `bd update <id> --status in_progress`
- If new work is discovered, create a linked bead:
  `bd create "Follow-up: <title>" -p <priority> --deps "discovered-from:<id>"`
- Close the phase bead when complete:
  `bd close <id>`

At the end of a session, sync beads:

```bash
bd sync --from-main
```

## Default rules (if project file is missing)

- Use bd for all task tracking; do not use markdown TODOs.
- Use priorities 0-4 or P0-P4.
- Link discovered work with `discovered-from` dependencies.
- Run `bd sync --from-main` before ending a session.
