# global-core Schema

Source: `schema.yaml`

Regenerate this view from this schema directory:

```bash
python3 ../../../scripts/mem.py schema show global-core
python3 ../../../scripts/mem.py schema describe global-core
```

```text
global-core [version=1.0 extension=md]
|-- variables
|   |-- cook: *, default=guide
|   |-- reference: *, default=reference
|   `-- topic: *, default=topic
|-- tree
    |-- cook
    |   `-- {{cook}}
    |-- ref
    |   `-- {{reference}}
    `-- t
        `-- {{topic}}
```

## Descriptions

- cook: Task-oriented guides for completing workflows.
- cook/{{cook}}: Guide for completing a specific workflow.
- ref: References for facts that might not fit within a topic or might fit across multiple topics.
- ref/{{reference}}: Reference for a fact that might not fit within a topic or might fit across multiple topics.
- t: Topics for domain entities in the domain entity model for a given subject.
- t/{{topic}}: Topic for a domain entity in the domain entity model for a given subject.
