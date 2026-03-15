---
name: ag-dir
description: Define and maintain an Agent Project Directory (AGD) with clear durable
  docs, canonical status ownership, and isolated runtime artifacts.
dependencies:
- ag-ledger
- specy
---

# AG Directory (AGD)

Use this skill when creating, auditing, or updating a durable AG directory (AGD) for one task.

## Core Concept

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
└── .agents
    └── runs/
        ├── spec-{num}-progress.md
        └── spec-{num}-learnings.md
```

Durable project docs stay at the root, with feature specs grouped under `docs/`. Runtime and local-only artifacts stay under `.agents/`.

## File Contracts

- `memory.md`: Relevant memory for this project only. Keep stable facts, decisions, and known constraints.
- `config.md`: Non-secret config schema/defaults and env var names. Do not store secret values.
- `design.md`: The project-level design document (from `$specy` design-doc workflows).
- `progress.md`: Single global status board with milestones, blockers, and next actions.
- `docs/spec-*.md`: Active feature specs (from `$specy` feature-spec workflows).
- `docs/.archive/spec-*.md`: Completed specs kept for reference after landing.

## Operating Rules

1. Keep project-level status in `progress.md`
2. Create `spec-*-progress.md` or `spec-*-learnings.md` under `.agents/runs/`.
3. Keep `memory.md` concise and durable; remove stale hypotheses once resolved.
4. Keep active spec numbering stable (`spec-01`, `spec-02`, ...). Avoid renaming active specs.
5. Move completed specs into `docs/.archive/` instead of deleting them.
6. Keep top-level files limited to durable docs; isolate runtime churn under `.agents/`.

## Recommended Workflow

1. Create the AGD skeleton.
2. Draft `design.md`.
3. Add one or more active feature specs in `docs/`.
4. Roll key outcomes and cross-spec updates into `progress.md`.
5. Add spec-specific progress under `.agents/runs/`.
6. When a spec is complete, move it to `docs/.archive/`.
