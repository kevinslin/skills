---
name: ag-dir
description: Define and maintain an Agent Project Directory (AGD) with clear durable
  docs, canonical status ownership, and isolated runtime artifacts. Use when creating
  a new AGD, auditing an existing AGD against the canonical layout, or materializing
  missing AGD notes into an existing project directory.
dependencies:
- ag-ledger
- dev.shortcuts
- schemas
- specy
---

# AG Directory (AGD)

Use this skill when creating, auditing, or updating a durable AG directory (AGD) for one task.

## Canonical Layout

Use `$schemas` and the bundled `ag-dir` schema as the source of truth for the current
layout and boilerplate. Inspect the schema before creating or auditing an AGD:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py show ag-dir
```

The current shape is:

```text
├── AGENTS.md
├── design.md
├── memory.md
├── config.md
├── progress.md
├── docs/
│   ├── spec-01-<name>.md
│   ├── spec-02-<name>.md
│   └── .archive/
│       └── spec-00-<completed-name>.md
└── .agents/
    └── runs/
        └── spec-{num}/
            ├── progress.md
            ├── learnings.md
            └── handoff.md
```

Durable project docs stay at the root, with feature specs grouped under `docs/`. Runtime and
local-only artifacts stay under `.agents/`. When the schema and an old copied example disagree,
prefer the schema and update the stale example rather than inventing a third layout.

## Materialization

Use `$schemas` to create missing AGD notes instead of hand-writing boilerplate.

Create or backfill the AGD skeleton:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize ag-dir \
  --out "$ROOT_DIR" \
  --var project_title="Example Project" \
  --var spec_num=01 \
  --var spec_name=bootstrap \
  --skip-existing
```

Add a new active spec plus matching run notes to an existing AGD:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize ag-dir \
  --out "$ROOT_DIR" \
  --var project_title="Example Project" \
  --var spec_num=02 \
  --var spec_name=workflow-cleanup \
  --skip-existing
```

That will create any missing required files for the new spec, including:
- `docs/spec-02-workflow-cleanup.md`
- `.agents/runs/spec-02/progress.md`
- `.agents/runs/spec-02/learnings.md`
- `.agents/runs/spec-02/handoff.md`

Materialize an archived spec note only when you explicitly need the optional archive branch:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize ag-dir \
  --out "$ROOT_DIR" \
  --var project_title="Example Project" \
  --var spec_num=02 \
  --var spec_name=workflow-cleanup \
  --var archived_spec_num=00 \
  --var archived_spec_name=landed-work \
  --include docs/.archive/spec-00-landed-work \
  --skip-existing
```

## File Contracts

- `memory.md`: Relevant memory for this project only. Keep stable facts, decisions, and known constraints.
- `config.md`: Non-secret config schema/defaults and env var names. Do not store secret values.
- `design.md`: The project-level design document (from `$specy` design-doc workflows).
- `progress.md`: Single global status board with milestones, blockers, and next actions.
- `docs/spec-*.md`: Active feature specs (from `$specy` feature-spec workflows).
- `docs/.archive/spec-*.md`: Completed specs kept for reference after landing.
- `.agents/runs/spec-*/progress.md`: Per-spec progress log.
- `.agents/runs/spec-*/learnings.md`: Per-spec learnings and retrospective notes.
- `.agents/runs/spec-*/handoff.md`: Baton-pass context for the next agent or resumed session.

## Operating Rules

1. Keep project-level status in `progress.md`
2. Use `$schemas` with the `ag-dir` schema to inspect layout or materialize missing notes before creating new boilerplate by hand.
3. Create spec-specific runtime notes under `.agents/runs/spec-{num}/`.
4. Keep `memory.md` concise and durable; remove stale hypotheses once resolved.
5. Keep active spec numbering stable (`spec-01`, `spec-02`, ...). Avoid renaming active specs.
6. Move completed specs into `docs/.archive/` instead of deleting them.
7. Keep top-level files limited to durable docs; isolate runtime churn under `.agents/`.

## Recommended Workflow

1. Inspect `ag-dir` with `$schemas` to confirm the current layout.
2. Materialize the AGD skeleton into the target directory with `--skip-existing`.
3. Draft `design.md`.
4. Add one or more active feature specs in `docs/`.
5. Add spec-specific runtime notes under `.agents/runs/spec-{num}/`.
6. Roll key outcomes and cross-spec updates into `progress.md`.
7. When a spec is complete, move it to `docs/.archive/` and leave a current `handoff.md` when another agent needs to resume.

## Shortcuts

Shortcuts are self-contained workflows triggered only when the user explicitly asks to use one.
When invoked, follow the mapped workflow section exactly.
Invoke them through `$dev.shortcuts` with `trigger:<shortcut>`, for example `trigger:handoff spec14`.

### handoff [spec]

Write or refresh `.agents/runs/spec-{num}/handoff.md` for the requested spec.

1. Normalize `[spec]` from forms like `spec14`, `spec-14`, or `14` to the folder name `spec-14`.
2. Locate the matching active spec file under `docs/` using `docs/spec-{num}-*.md`.
3. If `.agents/runs/spec-{num}/` or `handoff.md` is missing, materialize the missing run notes with `$schemas`. Reuse the slug from the matching `docs/spec-{num}-<name>.md` file as `spec_name`.
4. Read the current spec, relevant run notes, and recent workspace changes before writing.
5. Write the handoff doc at `.agents/runs/spec-{num}/handoff.md` using the existing handoff template sections:
   - `## Current Progress`
   - `## What Worked`
   - `## What Didn't Work`
   - `## Next Steps`
6. Replace placeholders with concrete current-state information; do not leave the handoff note as boilerplate.

### progress [spec]

Write or refresh `.agents/runs/spec-{num}/progress.md` for the requested spec.

1. Normalize `[spec]` to `spec-{num}`.
2. Ensure the run-note directory exists; if not, materialize it with `$schemas` using the matching `docs/spec-{num}-*.md` slug.
3. Read the active spec plus recent work artifacts.
4. Update `.agents/runs/spec-{num}/progress.md` with the current state, next steps, and any spec-local notes.

### learnings [spec]

Write or refresh `.agents/runs/spec-{num}/learnings.md` for the requested spec.

1. Normalize `[spec]` to `spec-{num}`.
2. Ensure the run-note directory exists; if not, materialize it with `$schemas` using the matching `docs/spec-{num}-*.md` slug.
3. Read the active spec plus the latest implementation or investigation evidence.
4. Update `.agents/runs/spec-{num}/learnings.md` with concrete takeaways under:
   - `## What Worked`
   - `## What Did Not`
   - `## Follow-Ups`
