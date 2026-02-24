---
name: dev.research
description: Create structured research documentation for codebase exploration and feature investigation. Enables agents to produce docs that capture findings, methodologies, and recommendations. Covers architecture docs, research briefs, flow docs, state docs, service design docs, feature design docs, feature specs (execution plans), investigation specs, validation specs, recipes, vendor docs, and frequently asked questions (FAQ).
version: 1.10.0
dependencies: [dev.llm-session]
---

# Research Documentation

This skill creates structured research artifacts for codebase exploration and feature investigation.

## When to Use This Skill

Use this skill when:

- Creating or updating any of the avilable document types
- Creating or updating system architecture docs for services or platforms
- Investigating a new technology, library, or approach before implementation
- Exploring unfamiliar parts of a codebase
- Comparing multiple solutions or approaches
- Documenting findings for future reference
- Creating formal research artifacts that can be shared with the team
- Documenting the lifecycle of a behavior or request flow in the codebase
- Drafting staff-level service design docs for new systems or services
- Drafting implementation-focused feature design docs for new capabilities or migrations
- Capturing reproducible change recipes from a current conversation or PR

## Root Directory

All filepaths in this skill are relative to `$DOCS_ROOT` unless noted otherwise.
Default `$DOCS_ROOT` is `./docs` (relative to the project root directory).

## Available Document Types

Document types are listed here. Read each document type workflow for details, requirements, template location, and output path.

- Architecture Docs: System-level architecture docs covering boundaries, components, interfaces, and key decisions. Workflow: `@references/architecture/workflow.md`
- Research Briefs: Structured technology/approach research with comparisons and recommendations. Workflow: `@references/research-brief/workflow.md`
- Flow Docs (Normal): Focused execution-flow documentation for bootstrap/runtime/request lifecycle understanding. Workflow: `@references/flow-doc/workflow.md`
- Flow Docs (End2End): Exhaustive lifecycle tracing across branches, retries, failures, and side effects. Workflow: `@references/flow-doc-end2end/workflow.md`
- State Docs: Terminal-output mapping with predicates, required state, and derivation paths. Workflow: `@references/state-doc/workflow.md`
- Service Design Docs: Staff-level service/system proposals covering architecture, APIs, reliability, and risks. Workflow: `@references/service-design-doc/workflow.md`
- Feature Design Docs: Implementation-ready feature or migration designs with rollout/rollback planning. Workflow: `@references/feature-design-doc/workflow.md`
- Feature Specs (Execution Plans): Milestone-based implementation plans with dependencies, risks, and verification. Workflow: `@references/feature-spec/workflow.md`
- Investigation Specs: Structured debugging plans for competing root-cause hypotheses and evidence capture. Workflow: `@references/investigation-spec/workflow.md`
- Validation Specs: Validation coverage docs for automated and manual checks tied to specs. Workflow: `@references/validation-spec/workflow.md`
- Recipes: Reproducible step-by-step change instructions derived from conversation or PR context. Workflow: `@references/recipe/workflow.md`
- Frequently Asked Questions (FAQ): Reusable Q&A docs with concise answers and source citations. Workflow: `@references/faq-doc/workflow.md`
- Vendor Docs: Project-focused third-party library documentation summaries and topic references. Workflow: `@references/vendor-doc/workflow.md`

## Common Instructions (All Doc Types)

1. Find the requested doc type workflow at `@references/[doc-type]/workflow.md`.
2. Follow the `Instructions` header in that workflow to do the implementation.
3. Copy `@references/[doc-type]/template.md` to the requested output location before filling in content.

## Context Triage Gate (Required Before Drafting)

Before drafting any research artifact, run a short temporal-context check:

1. Identify 3-7 critical state values or flags for the behavior being documented.
2. For each value, capture:
   - source of truth
   - representation (for example id vs name)
   - initialization point
   - snapshot/capture point
   - first consumer
3. Answer: "Is the value initialized before the consuming context is captured?"
4. If any answer is `no` or `unknown`, investigate ordering first before expanding downstream analysis.

### Flow Docs in Isolated Scope (Bootstrap vs Runtime)

Flow docs in this skill are often intentionally isolated (for example `apitool-bootstrap` vs `apitool-runtime`).
Do not force all phases into one document. Instead, each isolated flow doc must include boundary contracts:

1. Entry assumptions: what state/context already exists at flow entry.
2. Snapshot points: where state is copied/frozen inside this flow.
3. Exit/handoff: what this flow produces for the next flow.
4. Adjacent flow links: explicit references to related phase docs.

## Shared References

- Whenever you need to write sudocode, use the [$sudocode](/Users/kevinlin/code/skills/active/sudocode/SKILL.md) skill.


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

### new-architecture-doc

- Follow `@references/architecture/workflow.md` section `Instructions`.

### new-research-brief

- Follow `@references/research-brief/workflow.md` section `Instructions`.

### new-flow-doc-normal

- Follow `@references/flow-doc/workflow.md` section `Instructions`.

### new-end2end-flow-doc

- Follow `@references/flow-doc-end2end/workflow.md` section `Instructions`.

### new-state-doc

- Follow `@references/state-doc/workflow.md` section `Instructions`.

### new-service-design-doc

- Follow `@references/service-design-doc/workflow.md` section `Instructions`.

### new-feature-design-doc

- Follow `@references/feature-design-doc/workflow.md` section `Instructions`.

### new-feature-spec

- Follow `@references/feature-spec/workflow.md` section `Instructions`.

### new-investigation-spec

- Follow `@references/investigation-spec/workflow.md` section `Instructions`.

### update-flow-doc

When updating existing flow docs, use a preservation-first revision style.

1. Preserve existing structure and detail by default; do not rewrite large sections unless required.
2. Prefer additive edits: add targeted clarifications, corrections, and cross-references.
3. If the user asked specific questions, answer them in focused subsections tied to concrete file citations.
4. Keep `## Manual Notes` and its content unchanged across revisions.
5. Before finalizing, run a scope check: if the diff removes unrelated detail or broadens beyond request, reduce to a minimal targeted patch.

- For more details, follow `@references/flow-doc/workflow.md` section `Instructions: Revise Flow Doc`.
- If the doc is end2end, also apply `@references/flow-doc-end2end/workflow.md` section `Revision Requirements`.

### new-recipe

- Follow `@references/recipe/workflow.md` section `Instructions`.

### new-vendor-docs

- Follow `@references/vendor-doc/workflow.md` section `Instructions`.

## Best Practices

- Read only the workflow(s) relevant to the document type requested.
- Preserve stable IDs and manually maintained sections when revising existing docs.
- Keep source citations explicit and actionable.
- Prioritize temporal correctness before topology: verify ordering and snapshot semantics before deep downstream tracing.

## Directory Structure

Research documentation lives in the project's docs folder:

```
$DOCS_ROOT/
  architecture/      # System architecture docs
    {YYYY-MM-DD}-architecture-{system}.md
  research/          # Research briefs
    {date}-research-{topic}.md
  design/            # Service design docs
    {date}-design-{topic}.md
  specs/             # Feature design doc projects
    active/          # Feature specs 
      {YYYY-MM-DD}-{topic}.md
    investigation-{YYYY-MM-DD}-{topic}.md
    {YYYY-MM}-{feature-slug}/
      README.md
      design.md
  flows/             # Flow documentation
    {date}-{topic}.md
    {date}-end2end-{topic}.md
  state/             # State docs
    {state-name}.md
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

- `@references/architecture/workflow.md` -> `dev.research/references/architecture/workflow.md`
- `@references/architecture/template.md` -> `dev.research/references/architecture/template.md`
- `@references/research-brief/workflow.md` -> `dev.research/references/research-brief/workflow.md`
- `@references/research-brief/template.md` -> `dev.research/references/research-brief/template.md`
- `@references/flow-doc/workflow.md` -> `dev.research/references/flow-doc/workflow.md`
- `@references/flow-doc/template.md` -> `dev.research/references/flow-doc/template.md`
- `@references/flow-doc-end2end/workflow.md` -> `dev.research/references/flow-doc-end2end/workflow.md`
- `@references/flow-doc-end2end/template.md` -> `dev.research/references/flow-doc-end2end/template.md`
- `@references/state-doc/workflow.md` -> `dev.research/references/state-doc/workflow.md`
- `@references/state-doc/template.md` -> `dev.research/references/state-doc/template.md`
- `@references/service-design-doc/workflow.md` -> `dev.research/references/service-design-doc/workflow.md`
- `@references/service-design-doc/template.md` -> `dev.research/references/service-design-doc/template.md`
- `@references/feature-design-doc/workflow.md` -> `dev.research/references/feature-design-doc/workflow.md`
- `@references/feature-design-doc/template.md` -> `dev.research/references/feature-design-doc/template.md`
- `@references/feature-spec/workflow.md` -> `dev.research/references/feature-spec/workflow.md`
- `@references/feature-spec/template.md` -> `dev.research/references/feature-spec/template.md`
- `@references/feature-spec/effective-planning.md` -> `dev.research/references/feature-spec/effective-planning.md`
- `@references/feature-spec/beads.md` -> `dev.research/references/feature-spec/beads.md`
- `@references/investigation-spec/workflow.md` -> `dev.research/references/investigation-spec/workflow.md`
- `@references/investigation-spec/template.md` -> `dev.research/references/investigation-spec/template.md`
- `@references/validation-spec/workflow.md` -> `dev.research/references/validation-spec/workflow.md`
- `@references/validation-spec/template.md` -> `dev.research/references/validation-spec/template.md`
- `@references/recipe/workflow.md` -> `dev.research/references/recipe/workflow.md`
- `@references/recipe/template.md` -> `dev.research/references/recipe/template.md`
- `@references/faq-doc/workflow.md` -> `dev.research/references/faq-doc/workflow.md`
- `@references/faq-doc/template.md` -> `dev.research/references/faq-doc/template.md`
- `@references/vendor-doc/workflow.md` -> `dev.research/references/vendor-doc/workflow.md`
- `@references/vendor-doc/template.md` -> `dev.research/references/vendor-doc/template.md`

When you see `$DOCS_ROOT/`, resolve paths relative to the project root directory.
