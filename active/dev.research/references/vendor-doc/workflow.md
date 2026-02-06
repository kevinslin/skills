# Vendor Docs Workflow

## Use When

- Creating local summaries for third-party libraries used by the project
- Capturing only the subset of vendor docs used by the codebase
- Producing concise references with limited direct quotes from official docs

## Template

- `@references/vendor-doc/template.md`

## Output Location

- `$DOC_ROOT/vendor/{library}/README.md`

## Variables

- `$DOC_ROOT` defaults to `$ROOT_DIR` (`./docs`) unless overridden.
- `$LIB_ROOT` is `$DOC_ROOT/vendor/{library}`.

## Structure Requirements

- Include sections: `Installation`, `Quickstart`, `Gotchas`, `Concepts`, `Topics`, `API Reference`.
- Place API reference content in `$LIB_ROOT/reference/[docs].md`.
- Place topic deep-dives in `$LIB_ROOT/topics/[name].md`.
- Place overview content in `$LIB_ROOT/README.md`.
- Ensure all vendor doc files end with required ending sections.

## Instructions

1. Collect docs URL endpoint and library name (infer name if omitted).
2. Review `$DOC_ROOT/vendor/` for existing naming conventions.
3. Identify the subset of vendor functionality actually used in the project.
4. Create `$DOC_ROOT/vendor/{library}/` with `reference/` and `topics/` folders.
5. Copy `@references/vendor-doc/template.md` to `$DOC_ROOT/vendor/{library}/README.md`.
6. Populate README, reference, and topic docs with project-relevant summaries.
