# code-core Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show code-core
```

```text
code-core [version=1.0 output=directory extension=md]
|-- readme [template=default] - general overview of code
|-- concepts [template=default] - index of various concepts
|-- dev [template=dev] - how to setup for development
|   |-- qa [template=qa] - testing
|   `-- obs [template=obs] - observability
|-- flow [path-only] - execution-flow documentation
|   `-- {{flow}} [template=flow-doc dynamic] - flow doc for a specific execution path
|-- arch [path-only] - architecture documentation for a named system, subsystem, workflow, or service boundary
|   `-- {{arch}} [template=architecture dynamic] - architecture doc for a specific system, subsystem, workflow, or service boundary
|-- pr [path-only] - PR code-change flow docs. Use `pr/{{num}}-{{slug}}.md`, where `num` is the pull request number and `slug` is the lowercase hyphenated PR title; the document should describe the execution or behavior flow changed by the PR, not the pull request lifecycle.
|   `-- {{num}}-{{slug}} [template=flow-doc dynamic] - flow doc for the code changes in a specific pull request
`-- api [path-only] - api reference
    `-- {{api_name}} [template=api dynamic] - api reference
```
