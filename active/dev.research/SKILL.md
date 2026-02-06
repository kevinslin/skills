---
name: dev.research
description: Create structured research documentation for codebase exploration and feature investigation. Enables agents to produce docs that capture findings, methodologies, and recommendations. Covers research briefs, flow docs, service design docs, recipes, and frequently asked questions (FAQ)
version: 1.5.0
dependencies: [dev.llm-session]
---

# Research Documentation

This skill creates structured research artifacts for codebase exploration and feature investigation.

## When to Use This Skill

Use this skill when:

- Investigating a new technology, library, or approach before implementation
- Exploring unfamiliar parts of a codebase
- Comparing multiple solutions or approaches
- Documenting findings for future reference
- Creating formal research artifacts that can be shared with the team
- Documenting the lifecycle of a behavior or request flow in the codebase
- Drafting staff-level service design docs for new systems or services
- Capturing reproducible change recipes from a current conversation or PR

## Root Directory

All filepaths in this skill are relative to `$ROOT_DIR` unless noted otherwise.
Default `$ROOT_DIR` is `./docs` (relative to the project root directory).

## Available Document Types

Document types are listed here. Read each document type workflow for details, requirements, template location, and output path.

- Research Briefs: `@references/research-brief/workflow.md`
- Flow Docs (Normal): `@references/flow-doc/workflow.md`
- Flow Docs (End2End): `@references/flow-doc-end2end/workflow.md`
- Service Design Docs: `@references/design-doc/workflow.md`
- Validation Specs: `@references/validation-spec/workflow.md`
- Recipes: `@references/recipe/workflow.md`
- Frequently Asked Questions (FAQ): `@references/faq-doc/workflow.md`
- Vendor Docs: `@references/vendor-doc/workflow.md`

## Common Instructions (All Doc Types)

1. Find the requested doc type workflow at `@references/[doc-type]/workflow.md`.
2. Follow the `Instructions` header in that workflow to do the implementation.
3. Copy `@references/[doc-type]/template.md` to the requested output location before filling in content.

## Shared References

- LLM pseudocode conventions: `@references/llm-pseudo-code.md`

## Required Ending Sections (All Docs)

Every document created or revised using this skill must end with the following sections,
verbatim and in this order. Keep the Manual Notes content unchanged across edits.

```
## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
```

For the session id, use `dev.llm-session` to find the current conversation session id.

## Shortcuts

Shortcuts are self-contained workflows triggered only when the user explicitly asks to use one.
When invoked, follow the mapped workflow section exactly.

### New Research Brief

- Follow `@references/research-brief/workflow.md` section `Instructions`.

### New Flow Doc (Normal)

- Follow `@references/flow-doc/workflow.md` section `Instructions`.

### New End2End Flow Doc

- Follow `@references/flow-doc-end2end/workflow.md` section `Instructions`.

### Revise Flow Doc

- Follow `@references/flow-doc/workflow.md` section `Instructions: Revise Flow Doc`.
- If the doc is end2end, also apply `@references/flow-doc-end2end/workflow.md` section `Revision Requirements`.

### New Recipe

- Follow `@references/recipe/workflow.md` section `Instructions`.

### New Vendor Docs

- Follow `@references/vendor-doc/workflow.md` section `Instructions`.

## Best Practices

- Read only the workflow(s) relevant to the document type requested.
- Preserve stable IDs and manually maintained sections when revising existing docs.
- Keep source citations explicit and actionable.

## Directory Structure

Research documentation lives in the project's docs folder:

```
$ROOT_DIR/
  research/          # Research briefs
    {date}-research-{topic}.md
  design/            # Service design docs
    {date}-design-{topic}.md
  flows/             # Flow documentation
    {date}-{topic}.md
    {date}-end2end-{topic}.md
  recipes/           # Change recipes
    {recipe-name}.md
  project/
    specs/
      active/
        valid-{date}-{topic}.md
  faq/
    {date}-{topic}.md
  vendor/            # Vendor documentation
    {library}/
      README.md
      reference/
        {docs}.md
      topics/
        {name}.md
```

## Path Convention

Throughout this skill, paths prefixed with `@` are relative to this skill root.

- `@references/research-brief/workflow.md` -> `dev.research/references/research-brief/workflow.md`
- `@references/research-brief/template.md` -> `dev.research/references/research-brief/template.md`
- `@references/flow-doc/workflow.md` -> `dev.research/references/flow-doc/workflow.md`
- `@references/flow-doc/template.md` -> `dev.research/references/flow-doc/template.md`
- `@references/flow-doc-end2end/workflow.md` -> `dev.research/references/flow-doc-end2end/workflow.md`
- `@references/flow-doc-end2end/template.md` -> `dev.research/references/flow-doc-end2end/template.md`
- `@references/design-doc/workflow.md` -> `dev.research/references/design-doc/workflow.md`
- `@references/design-doc/template.md` -> `dev.research/references/design-doc/template.md`
- `@references/validation-spec/workflow.md` -> `dev.research/references/validation-spec/workflow.md`
- `@references/validation-spec/template.md` -> `dev.research/references/validation-spec/template.md`
- `@references/recipe/workflow.md` -> `dev.research/references/recipe/workflow.md`
- `@references/recipe/template.md` -> `dev.research/references/recipe/template.md`
- `@references/faq-doc/workflow.md` -> `dev.research/references/faq-doc/workflow.md`
- `@references/faq-doc/template.md` -> `dev.research/references/faq-doc/template.md`
- `@references/vendor-doc/workflow.md` -> `dev.research/references/vendor-doc/workflow.md`
- `@references/vendor-doc/template.md` -> `dev.research/references/vendor-doc/template.md`

When you see `$ROOT_DIR/`, resolve paths relative to the project root directory.
