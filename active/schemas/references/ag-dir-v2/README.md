# ag-dir-v2 Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show ag-dir-v2
```

```text
ag-dir-v2 [version=1.0 output=directory extension=md]
|-- variables
|   |-- spec_number: *, default=1
|   |-- spec_slug: *, default=bootstrap
|   |-- flow: *
|   |-- subspec: *, default=1.1
|   |-- subspec_slug: *
|   |-- report: *
|   |-- proof: *, default=proof
|   `-- scenario: *
`-- tree
    `-- specs [path-only] - Numbered specs, incrementing from 1.
        `-- {{spec_number}}-{{spec_slug}} [path-only dynamic] - One numbered spec directory.
            |-- spec [template=spec] - Main spec document.
            |-- flows [path-only] - Flow docs for this spec. Use concise kebab-case flow names, following the specy flow-doc naming contract.
            |   `-- {{flow}} [template=flow-doc dynamic insertion-policy] - Flow doc for a specific spec behavior or execution path.
            |-- milestones [path-only] - Optional milestone subspecs, numbered as 1.N where N increments from 1.
            |   `-- {{subspec}}-{{subspec_slug}} [template=milestone dynamic] - Milestone subspec document.
            |-- proofs [path-only children_from=1] - Integration behavior proofs for this spec.
            |   `-- {{proof}} [path-only] - Integration behavior proof directory.
            |       |-- proof [template=proof insertion-policy] - Root behavior proof for one claim, target, status, and scenario result summary.
            |       |-- scenario [path-only] - Live behavior scenarios with embedded config, observations, and raw artifact links.
            |       |   `-- {{scenario}} [template=scenario dynamic insertion-policy] - One live behavior scenario with purpose, preconditions, action, expectation, observation, related raw artifacts, and notes.
            |       |-- scripts [path-only dynamic insertion-policy] - Proof-local helper scripts for collecting, normalizing, summarizing, or validating proof artifacts.
            |       `-- raw [path-only dynamic insertion-policy] - Arbitrary raw proof artifacts, logs, transcripts, command outputs, screenshots, JSON, and generated files.
            `-- reports [path-only] - Optional custom reports relevant to this spec.
                `-- {{report}} [template=report dynamic] - Custom report relevant to this spec.
```
