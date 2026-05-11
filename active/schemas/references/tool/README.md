# tool Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show tool
```

```text
tool [version=1.0 output=dotted extension=md]
|-- variables
|   |-- prefix: pkg, vpkg
|   `-- name: *
`-- tree
    `-- {{prefix}} [path-only]
        `-- {{name}} [template=root children_from=1] - general description
            |-- concepts [template=concepts] - main concepts
            |-- cli [template=cli] - command-line usage guidance
            |-- dev [template=dev] - development setup, tests, and debugging
            |   |-- qa [template=default] - how to test changes
            |   `-- obs [template=obs] - observability
            |-- t [path-only] - domain-specific topic namespace
            |   `-- {{topic}} [template=topic dynamic] - domain-specific topic note
            |-- ref [path-only] - self-contained functionality references
            |   `-- {{reference}} [template=default dynamic] - self-contained functionality reference
            |-- api [path-only] - public module API namespace
            |   |-- {{api}} [template=default dynamic] - public interfaces for a module
            |   `-- {{api_name}} [template=api dynamic] - api reference
            |-- readme [template=default] - general overview of code
            |-- flow [path-only] - execution-flow documentation
            |   `-- {{flow}} [template=flow-doc dynamic] - flow doc for a specific execution path
            |-- arch [path-only] - architecture documentation for a named system, subsystem, workflow, or service boundary
            |   `-- {{arch}} [template=architecture dynamic] - architecture doc for a specific system, subsystem, workflow, or service boundary
            `-- pr [path-only] - PR code-change flow docs. Use `pr/{{num}}-{{slug}}.md`, where `num` is the pull request number and `slug` is the lowercase hyphenated PR title; the document should describe the execution or behavior flow changed by the PR, not the pull request lifecycle.
                `-- {{num}}-{{slug}} [template=flow-doc dynamic] - flow doc for the code changes in a specific pull request
```
