---
name: schemas
description: Materialize schema-defined file and directory hierarchies from bundled YAML schemas and Jinja templates. Use when asked to list or inspect available schemas, navigate a hierarchical schema, validate schema structure, or generate files from schemas such as Dendron note sets.
dependencies: []
---

# Schemas

Use this skill to understand and materialize hierarchical file schemas stored under `./references/<schema>/`.

## Available Schemas

- `tool`: Dendron note hierarchy for `pkg.<name>` and `vpkg.<name>` tool documentation. See `./references/tool/schema.yaml`.
- `ag-dir`: Agent Project Directory scaffold with durable root docs, active specs under `docs/`, and per-spec runtime artifacts under `.agents/runs/spec-{num}/`. See `./references/ag-dir/schema.yaml`.

## Schema Layout

Each schema lives in its own reference directory:

```text
references/
  <schema>/
    schema.yaml
    <template>.md.jinja
    <template>.py.jinja
    default.md.jinja
```

Use `schema.yaml` for structure and keep templates next to it. Template files may use any output extension before `.jinja`; for example, `root.md.jinja` creates Markdown content and `module.py.jinja` creates Python content. A node's `template` field selects the template basename. If `template` is omitted, use `default`.

## Schema Fields

Use this shape:

```yaml
version: 1.0
output:
  path_style: dotted
  file_extension: md
variables:
  prefix: [pkg, vpkg]
  name: ["*"]
schema:
  "{{prefix}}":
    "{{name}}":
      description: root file
      template: root
      children:
        cli:
          description: command usage
          insertion_policy:
            avoid_when:
              - the information is general project context rather than CLI-specific usage
          template: cli
```

- `variables`: Values accepted by path segments such as `{{name}}`. Use `["*"]` to allow any value.
- `output.path_style`: Use `dotted` for Dendron-style files such as `pkg.test.cli.md`; use `directory` for directory paths such as `pkg/test/cli.md`.
- `output.file_extension`: Append this extension to generated paths unless the caller overrides output behavior.
- `schema`: A tree of path segments. Segments can be literal strings or `{{variable}}` placeholders.
- `description`: Human-readable navigation help for a node. Prefer improving this before adding insertion policy.
- `insertion_policy`: Optional routing hints for deciding whether new information belongs in this node. Use it only when `description` is not enough, such as when two nodes are easy to confuse or a common wrong insertion should be avoided. Supported keys:
  - `use_when`: Short phrases describing evidence that belongs in this node.
  - `avoid_when`: Short phrases describing evidence that should go somewhere else.
- `template`: Template basename in the schema directory. Omit it to use `default`.
- `children`: Child nodes below the current path segment.
- `required`: Set to `false` for optional namespaces that should not materialize by default.
- `materialize`: Set to `false` for path-only namespace nodes that should not create a file.
- `dynamic_child`: Set to `true` when the node represents a namespace that can grow arbitrary named children.

## Commands

List bundled schemas:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py list
```

Show a schema tree before generating files:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py show tool
```

Materialize a schema:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize tool \
  --out /tmp/schema-output \
  --var prefix=pkg \
  --var name=test \
  --skip-existing
```

Materialize an optional branch by including the full rendered path:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize tool \
  --out /tmp/schema-output \
  --var prefix=pkg \
  --var name=test \
  --var topic=config \
  --include pkg.test.t.config \
  --skip-existing
```

For directory-style schemas, pass `--include` using slash-separated rendered paths so literal-dot directory names still work:

```bash
uv run /Users/kevinlin/code/skills-public/active/schemas/scripts/materialize.py materialize ag-dir \
  --out /tmp/ag-dir-output \
  --var project_title="Example Project" \
  --var archived_spec_num=00 \
  --var archived_spec_name=landed-work \
  --include docs/.archive/spec-00-landed-work \
  --skip-existing
```

The materializer validates `schema.yaml` with Pydantic, renders path placeholders with the provided variables, renders each selected Jinja template, and uses Copier to initialize the output files.

## Navigation Rules

- Read `schema.yaml` first when deciding which files are required.
- Use `description` as the primary guide for choosing where new information belongs.
- Use `insertion_policy` only as a tie-breaker or guardrail when the description alone is ambiguous. Do not duplicate section headings or restate the description; templates already define document sections.
- Materialize required nodes by default.
- Use `--skip-existing` when initializing into a directory that may already contain hand-edited files.
- Skip `required: false` nodes unless a task explicitly asks for that optional namespace; pass `--include <full.rendered.path>` for those branches.
- Treat `dynamic_child: true` as an instruction that more children may be added later; do not invent dynamic children without user intent.
- Keep template names stable and update the schema before adding new template files.
