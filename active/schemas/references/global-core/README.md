# global-core Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show global-core
```

```text
global-core [version=1.0 output=directory extension=md]
|-- variables
|   |-- reference: *, default=reference
|   `-- topic: *, default=topic
`-- tree
    |-- ref [path-only] - References for facts that might not fit within a topic or might fit across multiple topics.
    |   `-- {{reference}} [template=ref dynamic] - Reference for a fact that might not fit within a topic or might fit across multiple topics.
    `-- t [path-only] - Topics for domain entities in the domain entity model for a given subject.
        `-- {{topic}} [template=topic dynamic] - Topic for a domain entity in the domain entity model for a given subject.
```
