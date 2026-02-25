---
name: ag-project
description: Define and maintain an Agent Project Directory (AGD) with clear durable docs, canonical status ownership, and isolated runtime artifacts.
dependencies: [ag-ledger, dev.research]
---

# AG Project Directory (AGD)

Use this skill when creating, auditing, or updating a durable agent project directory (AGD) for one task.

## Core Concept

```text
├── AGENTS.md
├── design.md
├── memory.md
├── config.md
├── progress.md
├── specs
│   ├── spec-01-<name>.md
│   └── spec-02-<name>.md
└── .agents
    ├── ledger
    │   └── ledger-{YYYY}-{MM}-{DD}.jsonl
    └── local.env
```

Durable project docs stay at the root. Runtime and local-only artifacts stay under `.agents/`.

## File Contracts

- `memory.md`: Relevant memory for this project only. Keep stable facts, decisions, and known constraints.
- `config.md`: Non-secret config schema/defaults and env var names. Do not store secret values.
- `design.md`: The project-level design document (from `$dev.research` design-doc workflows).
- `progress.md`: Single global status board with milestones, blockers, and next actions.
- `specs/*.md`: Feature specs (from `$dev.research` feature-spec workflows). Each spec must include `## Status` and `## Learnings`.
- `.agents/ledger/ledger-*.jsonl`: Append-only runtime activity files in JSONL format. If `$ag-ledger` emits `ledger-*.md`, treat it as JSONL content for compatibility.
- `.agents/local.env`: Local runtime values/secrets (gitignored).

## Operating Rules

1. Use a single source of truth for status:
   - project-level status in `progress.md`
   - per-spec status and learnings inside each `specs/spec-*.md`
2. Do not create `spec-*-progress.md` or `spec-*-learnings.md`; keep that data in spec files.
3. Keep `memory.md` concise and durable; remove stale hypotheses once resolved.
4. Keep `config.md` secret-free; use `.agents/local.env` for local runtime values.
5. Keep spec numbering stable (`spec-01`, `spec-02`, ...). Avoid renaming active specs.
6. Keep ledger files append-only; never rewrite historical entries.
7. Keep top-level files limited to durable docs; isolate runtime churn under `.agents/`.

## Recommended Workflow

1. Create the AGD skeleton.
2. Draft `design.md`.
3. Add one or more feature specs in `specs/`.
4. Implement each spec while updating `## Status` and `## Learnings` in that spec file.
5. Roll key outcomes and cross-spec updates into `progress.md`.
6. Append runtime events to `.agents/ledger/ledger-*.jsonl`.
