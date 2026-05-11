# ag-dir Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show ag-dir
```

```text
ag-dir [version=1.0 output=directory extension=md]
|-- variables
|   |-- project_title: *, default=Project
|   |-- spec_num: *, default=01
|   |-- spec_name: *, default=bootstrap
|   |-- archived_spec_num: *
|   `-- archived_spec_name: *
`-- tree
    |-- AGENTS [template=agents] - Project-local instructions for agents working in this directory.
    |-- design [template=design] - Project-level design document.
    |-- memory [template=memory] - Durable project facts, decisions, and constraints.
    |-- config [template=config] - Non-secret config schema, defaults, and environment variables.
    |-- progress [template=progress insertion-policy] - Global status board with milestones, blockers, and next actions.
    |-- docs [path-only] - Active feature specs grouped by spec number.
    |   |-- spec-{{spec_num}}-{{spec_name}} [template=spec] - Initial active feature spec.
    |   |-- .archive [path-only] - Archived specs kept for reference after landing.
    |   |   `-- spec-{{archived_spec_num}}-{{archived_spec_name}} [template=spec-archive] - Archived feature spec.
    |   `-- research [template=default] - Research briefs
    `-- .agents [path-only] - Runtime and local-only artifacts for this project.
        `-- runs [path-only] - Per-spec working notes and execution artifacts.
            `-- spec-{{spec_num}} [path-only] - Per-spec run directory.
                |-- progress [template=run-progress insertion-policy] - Per-spec progress log.
                |-- learnings [template=run-learnings insertion-policy] - Per-spec learnings and retrospective notes.
                `-- handoff [template=run-handoff insertion-policy] - Handoff note for the next agent/session.
```
