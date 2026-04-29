---
name: specy
description: Create structured docs and specs for codebase exploration and
  feature work 
version: 1.13.0
dependencies:
- dev.diagram
- dev.llm-session
- docy
- sudocode
---

# Specy

This skill creates structured research artifacts for codebase exploration and feature work.

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

## Hard Trigger Rule (Flow Docs)

If the request mentions any flow-doc intent (for example: `flow doc`, `flow docs`, `flowdoc`, `call path doc`, `execution flow doc`), you must run this skill and follow the flow-doc workflow before drafting or revising content.
If the request explicitly mentions `flow-doc-v2`, use the `flow-doc-v2` workflow instead of the legacy `flow-doc` workflow.

## Root Directory

All filepaths in this skill are relative to `$DOCS_ROOT` unless noted otherwise.
Default `$DOCS_ROOT` is `./docs` (relative to the project root directory).

## Available Document Types

Document types are listed here. Use the parenthesized doc-type key with the common workflow/template paths below.

- Architecture Docs (`architecture`): System-level architecture docs covering boundaries, components, interfaces, and key decisions.
- Research Briefs (`research-brief`): Structured technology/approach research with comparisons and recommendations.
- Flow Docs (`flow-doc`): Focused execution-flow documentation for core lifecycle, domain-specific behavior, and supporting reference flows.
- Flow Docs V2 (`flow-doc-v2`): Balanced flow documentation for specified code logic, combining a general-flow diagram, an execution trace, and targeted implementation details.
- State Docs (`state-doc`): Terminal-output mapping with predicates, required state, and derivation paths.
- Service Design Docs (`service-design-doc`): Staff-level service/system proposals covering architecture, APIs, reliability, and risks.
- Feature Design Docs (`design-spec`): Implementation-ready feature or migration designs with rollout/rollback planning.
- Feature Specs (Execution Plans) (`feature-spec`): Milestone-based implementation plans with dependencies, risks, and verification.
- Investigation Specs (`investigation-spec`): Structured debugging plans for competing root-cause hypotheses and evidence capture.
- Validation Specs (`validation-spec`): Validation coverage docs for automated and manual checks tied to specs.
- Recipes (`recipe`): Reproducible step-by-step change instructions derived from conversation or PR context.
- Frequently Asked Questions (FAQ) (`faq-doc`): Reusable Q&A docs with concise answers and source citations.
- FAQ Specs (`faq-spec`): In-place FAQ additions that append a focused Q&A to the most recent research document type mentioned in the conversation.
- Vendor Docs (`vendor-doc`): Project-focused third-party library documentation summaries and topic references.

## Common Instructions (All Doc Types)

1. Find the requested doc type workflow at `./references/[doc-type]/workflow.md`.
2. Follow the `Instructions` header in that workflow to do the implementation.
3. Copy `./references/[doc-type]/template.md` to the requested output location before filling in content.
4. For in-place doc types (currently FAQ Specs), use the template as an insertion snippet instead of creating a new file.
5. Before finalizing any created or revised document, resolve the current agent session id via `$dev.llm-session` and replace the changelog placeholder with the real session id.
6. For links that point to files inside the current repo, prefer repo-relative markdown targets instead of absolute local checkout or worktree paths. Do not emit `/Users/...` or similar machine-local link targets under `$DOCS_ROOT` unless the document is intentionally pointing outside the repo.

### Flow Docs in Isolated Scope (Core vs Topic vs Reference)

Flow docs in this skill are often intentionally isolated by lifecycle or domain (for example `core.init` vs `topic.orchestration` vs `ref.new-task-kickoff`).
Do not force all phases into one document. Instead, each isolated flow doc must include boundary contracts:

1. Entry assumptions: what state/context already exists at flow entry.
2. Snapshot points: where state is copied/frozen inside this flow.
3. Exit/handoff: what this flow produces for the next flow.
4. Adjacent flow links: explicit references to related phase docs.

### Flow Docs V2

Use `flow-doc-v2` when the goal is to give a developer a balanced understanding
of specified code logic with pointers for deeper investigation. Flow docs v2 are
not line-by-line code descriptions. They combine:

1. A general-flow diagram drafted with $dev.diagram.
2. An execution trace shaped by $docy `ref/execution-trace`.
3. Additional notes, observability pointers, related docs, and code/log pointers.

Use `./references/flow-doc-v2/workflow.md` and
`./references/flow-doc-v2/template.md` for this doc type.

### Flow Overview Snippet

Every flow doc should place `## Sequence diagram` before `## Call path`, and `## Call path` should begin with a linear `### Overview` subsection. Use:

- `./references/flow-overview/workflow.md`
- `./references/flow-overview/template.md`

Treat `flow-overview` as a reusable subsection/snippet, not as a standalone document type. The overview should be one linear sudocode block across the major phases. Keep the main path readable top-to-bottom and move branch detail into the detailed phase sections below it.

## Shared References

- Whenever you need to write sudocode, use `$sudocode`.
- Use [$dev.diagram](../dev.diagram/SKILL.md) to draft or revise flow diagrams.
- Use [$docy](../docy/SKILL.md) `ref/execution-trace` before writing flow-doc-v2 execution traces.
- Source path for this workspace: [$sudocode](../sudocode/SKILL.md).

## Flow-Doc Quality Gate (Required)

Before finalizing any flow doc, run the validator from this skill root:

```bash
python3 ./scripts/validate_flow_doc.py --kind auto --doc "<flow-doc-path>"
```

Resolve validator errors before handoff. Do not skip this check.


## Required Ending Sections (All Docs)

Every document created or revised using this skill must end with the following sections,
verbatim and in this order, unless the doc-type template specifies a different
changelog shape. Keep the Manual Notes content unchanged across edits.

```
## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id] - (current git sha))
```

For the session id, use `dev.llm-session` to find the current conversation session id. Choose the lookup strategy that matches the active thread, and do not leave placeholder text such as `[agent session id]` or `[codex session id]` in a completed document.

## Shortcuts

Shortcuts are self-contained workflows triggered only when the user explicitly asks to use one.
When invoked, follow the mapped workflow section exactly.

### new-architecture-doc

- Follow `./references/architecture/workflow.md` section `Instructions`.

### new-research-brief

- Follow `./references/research-brief/workflow.md` section `Instructions`.

### new-flow-doc-normal

- Follow `./references/flow-doc/workflow.md` section `Instructions`.

### new-flow-doc-v2

- Follow `./references/flow-doc-v2/workflow.md` section `Instructions`.

### new-state-doc

- Follow `./references/state-doc/workflow.md` section `Instructions`.

### new-service-design-doc

- Follow `./references/service-design-doc/workflow.md` section `Instructions`.

### new-design-spec

- Follow `./references/design-spec/workflow.md` section `Instructions`.

### new-feature-spec

- Follow `./references/feature-spec/workflow.md` section `Instructions`.

### new-investigation-spec

- Follow `./references/investigation-spec/workflow.md` section `Instructions`.

### update-flow-doc

When updating existing flow docs, use a preservation-first revision style.

1. Preserve existing structure and detail by default; do not rewrite large sections unless required.
2. Prefer additive edits: add targeted clarifications, corrections, and cross-references.
3. If the user asked specific questions, answer them in focused subsections tied to concrete file citations.
4. Keep `## Manual Notes` and its content unchanged across revisions.
5. Before finalizing, run a scope check: if the diff removes unrelated detail or broadens beyond request, reduce to a minimal targeted patch.

- For more details, follow `./references/flow-doc/workflow.md` section `Instructions: Revise Flow Doc`.

### new-recipe

- Follow `./references/recipe/workflow.md` section `Instructions`.

### new-faq-spec

- Follow `./references/faq-spec/workflow.md` section `Instructions`.

### new-vendor-docs

- Follow `./references/vendor-doc/workflow.md` section `Instructions`.

## Best Practices

- Read only the workflow(s) relevant to the document type requested.
- Preserve stable IDs and manually maintained sections when revising existing docs.
- Keep source citations explicit and actionable.
- Keep repo-internal markdown links portable: use repo-relative targets under `$DOCS_ROOT` and avoid absolute local filesystem paths in generated docs.

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
  specs/             # Active and archived specs
    .archive/        # Completed specs moved here
    {NN}-{topic}.md
  flows/             # Flow documentation
    core.init.md
    core.exit.md
    topic.{name}.md
    ref.{name}.md
  state/             # State docs
    {state-name}.md
  recipes/           # Change recipes
    {recipe-name}.md
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

Active feature specs live directly under `$DOCS_ROOT/specs/` with a monotonic two-digit integer prefix starting at `01`; choose the next prefix by scanning active and archived specs and do not reuse gaps. When a spec is complete, move it to `$DOCS_ROOT/specs/.archive/` and keep the same filename.
If multiple spec types exist for the same topic, keep the filename format and distinguish them in the `{topic}` slug, for example `01-payments-design.md` or `02-payments-validation.md`.

FAQ Specs do not create standalone files. They update the target research document in place.

## Path Convention

Throughout this skill, bundled paths prefixed with `./` are relative to this skill root.

- `./references/architecture/workflow.md` -> `./references/architecture/workflow.md`
- `./references/architecture/template.md` -> `./references/architecture/template.md`
- `./references/research-brief/workflow.md` -> `./references/research-brief/workflow.md`
- `./references/research-brief/template.md` -> `./references/research-brief/template.md`
- `./references/flow-doc/workflow.md` -> `./references/flow-doc/workflow.md`
- `./references/flow-doc/template.md` -> `./references/flow-doc/template.md`
- `./references/flow-doc-v2/workflow.md` -> `./references/flow-doc-v2/workflow.md`
- `./references/flow-doc-v2/template.md` -> `./references/flow-doc-v2/template.md`
- `./references/flow-overview/workflow.md` -> `./references/flow-overview/workflow.md`
- `./references/flow-overview/template.md` -> `./references/flow-overview/template.md`
- `./references/state-doc/workflow.md` -> `./references/state-doc/workflow.md`
- `./references/state-doc/template.md` -> `./references/state-doc/template.md`
- `./references/service-design-doc/workflow.md` -> `./references/service-design-doc/workflow.md`
- `./references/service-design-doc/template.md` -> `./references/service-design-doc/template.md`
- `./references/design-spec/workflow.md` -> `./references/design-spec/workflow.md`
- `./references/design-spec/template.md` -> `./references/design-spec/template.md`
- `./references/feature-spec/workflow.md` -> `./references/feature-spec/workflow.md`
- `./references/feature-spec/template.md` -> `./references/feature-spec/template.md`
- `./references/feature-spec/effective-planning.md` -> `./references/feature-spec/effective-planning.md`
- `./references/feature-spec/beads.md` -> `./references/feature-spec/beads.md`
- `./references/investigation-spec/workflow.md` -> `./references/investigation-spec/workflow.md`
- `./references/investigation-spec/template.md` -> `./references/investigation-spec/template.md`
- `./references/validation-spec/workflow.md` -> `./references/validation-spec/workflow.md`
- `./references/validation-spec/template.md` -> `./references/validation-spec/template.md`
- `./references/recipe/workflow.md` -> `./references/recipe/workflow.md`
- `./references/recipe/template.md` -> `./references/recipe/template.md`
- `./references/faq-doc/workflow.md` -> `./references/faq-doc/workflow.md`
- `./references/faq-doc/template.md` -> `./references/faq-doc/template.md`
- `./references/faq-spec/workflow.md` -> `./references/faq-spec/workflow.md`
- `./references/faq-spec/template.md` -> `./references/faq-spec/template.md`
- `./references/vendor-doc/workflow.md` -> `./references/vendor-doc/workflow.md`
- `./references/vendor-doc/template.md` -> `./references/vendor-doc/template.md`

When you see `$DOCS_ROOT/`, resolve paths relative to the project root directory.
