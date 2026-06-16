# ag-dir Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show ag-dir
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py describe ag-dir
```

```text
ag-dir [version=1.0 extension=md]
|-- variables
|   |-- project_title: *, default=Project
|   |-- spec_num: *, default=01
|   |-- spec_name: *, default=bootstrap
|   |-- archived_spec_num: *
|   `-- archived_spec_name: *
|-- tree
    |-- AGENTS
    |-- design
    |-- memory
    |-- config
    |-- progress
    |-- docs
    |   |-- spec-{{spec_num}}-{{spec_name}}
    |   |-- .archive
    |   |   `-- spec-{{archived_spec_num}}-{{archived_spec_name}}
    |   `-- research
    `-- .agents
        `-- runs
            `-- spec-{{spec_num}}
                |-- progress
                |-- learnings
                `-- handoff
```

## Descriptions

- AGENTS: Project-local instructions for agents working in this directory.
- design: Project-level design document.
- memory: Durable project facts, decisions, and constraints.
- config: Non-secret config schema, defaults, and environment variables.
- progress: Global status board with milestones, blockers, and next actions.
- docs: Active feature specs grouped by spec number.
- docs/spec-{{spec_num}}-{{spec_name}}: Initial active feature spec.
- docs/.archive: Archived specs kept for reference after landing.
- docs/.archive/spec-{{archived_spec_num}}-{{archived_spec_name}}: Archived feature spec.
- docs/research: Research briefs
- .agents: Runtime and local-only artifacts for this project.
- .agents/runs: Per-spec working notes and execution artifacts.
- .agents/runs/spec-{{spec_num}}: Per-spec run directory.
- .agents/runs/spec-{{spec_num}}/progress: Per-spec progress log.
- .agents/runs/spec-{{spec_num}}/learnings: Per-spec learnings and retrospective notes.
- .agents/runs/spec-{{spec_num}}/handoff: Handoff note for the next agent/session.
