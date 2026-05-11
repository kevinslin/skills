# integ-proof Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show integ-proof
```

```text
integ-proof [version=1.0 output=directory extension=md]
|-- variables
|   |-- proof: *, default=proof
|   `-- scenario: *
`-- tree
    `-- {{proof}} [path-only] - Integration behavior proof directory.
        |-- proof [template=proof insertion-policy] - Root behavior proof for one claim, target, status, and scenario result summary.
        |-- scenario [path-only] - Live behavior scenarios with embedded config, observations, and raw artifact links.
        |   `-- {{scenario}} [template=scenario dynamic insertion-policy] - One live behavior scenario with purpose, preconditions, action, expectation, observation, related raw artifacts, and notes.
        |-- scripts [path-only dynamic insertion-policy] - Proof-local helper scripts for collecting, normalizing, summarizing, or validating proof artifacts.
        `-- raw [path-only dynamic insertion-policy] - Arbitrary raw proof artifacts, logs, transcripts, command outputs, screenshots, JSON, and generated files.
```
