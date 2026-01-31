---
name: dev.beads
description: Use when a repo relies on bd (beads) for task tracking or when asked to create, update, close, or sync beads; covers core task management, dependency linking, and using beads to retain work context and memory across sessions.
---

# Dev Beads

## Overview

Use bd (beads) as the single source of truth for tasks and work memory in repos that
require it. This skill provides a core workflow for checking ready work, updating
status, creating linked beads, and syncing changes.

## Project Instructions

Before using beads in a repo, check for
`skills/.config/dev.beads.instructions.md` at the project root. If present, read and
follow it for project-specific rules (including shortcut-specific guidance).
When instructions conflict, prefer the project file.

## Core Workflow (Summary)

1. Check beads health and ready work:
   - `bd status`
   - `bd ready`
   - `bd blocked`

2. Claim a task before working:
   - `bd update <id> --status in_progress`

3. Create linked work when new tasks appear:
   - `bd create "Short, specific title" -p <priority> --deps "discovered-from:<parent-id>"`

4. Close finished work:
   - `bd close <id>`

5. Sync beads before ending a session:
   - `bd sync --from-main`

## Beads for Memory

- Use clear, specific titles that preserve context for the next session or agent.
- When work is spec-driven, create a top-level bead titled `Spec: <spec name>` and
  link sub-beads as dependencies.
- Prefer dependencies (`discovered-from`, `blocks`) over ad-hoc notes for
  relationships.

## Priority Rules

- Use `0-4` or `P0-P4` only; do not use "high/medium/low".

## If Beads Is Not Ready

If `bd status` fails or you see "no beads database found", follow
`references/beads-setup.md` for setup and troubleshooting.

## References

- `references/beads-core-workflow.md` for full commands, dependencies, and rules.
- `references/beads-context.md` for rationale and memory-oriented guidance.
