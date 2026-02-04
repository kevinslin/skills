---
name: dev.research
description: Create structured research documentation for codebase exploration and feature investigation. Enables agents to produce docs that capture findings, methodologies, and recommendations. Covers research briefs, flow docs, service design docs, and frequently asked questions (FAQ)
version: 1.2.0
dependencies: [dev.llm-session]
---

# Research Documentation

This skill enables agents to create structured research documentation for exploring codebases and investigating features. Research docs help capture findings, methodologies, and recommendations in a reusable format.

## When to Use This Skill

Use this skill when:

- Investigating a new technology, library, or approach before implementation
- Exploring unfamiliar parts of a codebase
- Comparing multiple solutions or approaches
- Documenting findings for future reference
- Creating formal research artifacts that can be shared with the team
- Documenting the lifecycle of a behavior or request flow in the codebase
- Drafting staff-level service design docs for new systems or services

## Root Directory

All filepaths mentioned is relative to the $ROOT_DIR. Unless overridden elsewhere, the $ROOT_DIR is `./docs` (relative to the project root directorey)

## Available Document Types

### Research Briefs

Research briefs are comprehensive documents for technical investigations. Use them when you need to:

- Research a specific technology or approach
- Compare multiple options with structured analysis
- Document findings with methodology and sources
- Provide recommendations based on research

**Template**: `@references/research-brief.md`

**Output location**: `$ROOT_DIR/research/{YYYY-MM-DD}-research-{topic}.md`

### Flow Docs

Flow docs are mini architecture documents that describe the lifecycle of a behavior in the codebase. Use them when you need to:

- Document how a system bootstraps or initializes
- Describe the lifecycle of an API request
- Capture the execution sequence of a feature
- Help LLMs and humans quickly recapture context on a particular part of the code

When describing flows, prefer TypeScript-like pseudocode to describe logic. Always include citations to files where logic occurs.
Any lines that have `// manual` at the end - keep the line consistent across updates of the flow doc.

**Template**: `@references/flow-doc.md`

**Output location**: `$ROOT_DIR/flows/{YYYY-MM-DD}-{topic}.md`

### Service Design Docs

Service design docs are staff-level design documents for a new system or service. Use them when you need to:

- Propose a new service or major system change
- Define scope, users, and use cases
- Document architecture, API surface, data, and reliability expectations
- Capture security, risks, and open questions

**Template**: `@references/design-doc.md`

**Output location**: `$ROOT_DIR/design/{YYYY-MM-DD}-design-{topic}.md`

### Validation Specs

Validation specs capture what testing has been completed and what validation still needs to be done for a spec. Use them when you need to:

- Pair with a plan/implementation spec to review test coverage
- Document remaining automated validation work
- Provide a clear, manual validation checklist for the user

Validation specs should always reference the plan and implementation specs being validated.

**Template**: `@references/validation-spec.md`

**Output location**: `$ROOT_DIR/project/specs/active/valid-{YYYY-MM-DD}-{topic}.md` (match the plan spec filename stem)

### Frequently Asked Questions (faq)

FAQ are focused questions on a particular part of logic. Use them when:
- the user asks to save the current conversation as a faq
- user explicitly mentions `@faq` "eg. @faq: how does X work"

When describing flows, prefer TypeScript-like pseudocode to describe logic. Always include citations to files where logic occurs.

**Template**: `@references/faq-doc.md`

**Output location**: `$ROOT_DIR/faq/{YYYY-MM-DD}-{topic}.md`

### Vendor Docs

Vendor docs are local summaries of third-party libraries used by the project. This workflow takes a docs URL endpoint and a library name (infer the name from the docs if not provided) to generate a concise, local reference. Use them when you need to:

- Capture only the parts of a vendor library that the project actually uses
- Summarize official documentation with limited direct quotes
- Provide a quick, local reference for the team

**Template**: `@references/vendor-doc.md`

**Output location**: `$DOC_ROOT/vendor/{library}/README.md`

**DOC_ROOT**: the root of where docs are stored (default to `$ROOT_DIR`, which is `./docs` unless overridden).

**Structure requirements**:

- Local bundles must include these sections: **Installation**, **Quickstart**, **Gotchas**, **Concepts**, **Topics**, **API Reference**.
- Files must live under `$DOC_ROOT/vendor/{library}` (aka `$LIB_ROOT`).
- API reference content goes in `$LIB_ROOT/reference/[docs].md`.
- Topic deep-dives go in `$LIB_ROOT/topics/[name].md`.
- Everything else goes in `$LIB_ROOT/README.md`.
- All vendor doc files must end with the required ending sections.

## Required Ending Sections (All Docs)

Every document created or revised using this skill must end with the following sections,
verbatim and in this order. Keep the Manual Notes content unchanged across edits.

```
## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
```

For the session id, use `dev.llm-session` skill to find session id of current conversation.

## Shortcuts

Shortcuts are self-contained workflows triggered when the user explicitly asks to use one. When a shortcut is invoked, follow the instructions exactly as written.

### New Research Brief

Create a to-do list with the following items then perform all of them:

1. Review `$ROOT_DIR/research/` to see the list of recent research briefs

2. Copy `@references/research-brief.md` to `$ROOT_DIR/research/{YYYY-MM-DD}-research-{topic-slug}.md`
   - Use kebab-case for the topic slug (e.g., `2025-01-15-research-auth-strategies.md`)

3. Begin to fill in the new research brief based on the user's instructions, stopping and asking for clarifications as soon as you need them

### New Flow Doc

Create a to-do list with the following items then perform all of them:

1. Review existing architecture documents and understand the relevant architectural patterns used in the project

2. Review existing flow documents in `$ROOT_DIR/flows/` and understand the relevant flows used in this project

3. Copy `@references/flow-doc.md` to `$ROOT_DIR/flows/{YYYY-MM-DD}-{topic-slug}.md`
   - Use kebab-case for the topic slug (e.g., `flows/2025-01-15-api-request-lifecycle.md`)

4. Begin to fill in the new flow document based on the user's instructions, stopping and asking for clarifications as soon as you need them

### Revise Flow Doc

Create a to-do list with the following items then perform all of them:

1. Read the given flow document

2. Read all code referenced in the document

3. Review all other related code to the topic, doing a systematic review to see what parts of the document are correct and current, identifying any gaps, inaccuracies, or areas that are out of date

4. Revise the document to ensure it is accurate and complete, reflecting the current state of the codebase and flow. Preserve the structure and style as closely as possible but revise all needed portions.

5. At the end include a "Future Considerations" section with the following subsections:
   - **Open Questions**: List any possible bugs, issues, or areas of uncertainty around the design
   - **Potential Improvements**: List any ideas for future improvements or enhancements to the architecture

### New Vendor Docs

Create a to-do list with the following items then perform all of them:

1. Collect the vendor docs URL endpoint and library name (infer the name from the docs if not provided).

2. Review `$DOC_ROOT/vendor/` to see existing vendor docs and naming conventions.

3. Identify which parts of the vendor library are actually used by the project (scan code, configs, and docs).

4. Create `$DOC_ROOT/vendor/{library}/` with `reference/` and `topics/` subfolders.

5. Copy `@references/vendor-doc.md` to `$DOC_ROOT/vendor/{library}/README.md`.

6. Populate `reference/` and `topics/` files per the template, summarizing official docs with limited direct quotes and ensuring required sections exist.

## Best Practices

### Research Briefs

- **Start with clear questions**: Define what you're trying to learn before diving in
- **Document as you go**: Capture findings during research, not after
- **Include sources**: Link to documentation, articles, and code examples
- **Be objective**: Present pros and cons fairly in comparative analysis
- **Summarize actionably**: Recommendations should be clear and implementable

### Flow Docs

- **Focus on lifecycle**: Emphasize execution sequence, not just static component structure
- **Link related docs**: Reference architecture docs, specs, or research notes when available
- **Keep it narrow**: One behavior or lifecycle per document
- **Use pseudocode**: TypeScript-like pseudocode makes logic clear
- **Cite files**: Always include file paths where logic occurs

## Directory Structure

Research documentation lives in the project's docs folder:

```
$ROOT_DIR/
  research/          # Research briefs
    {date}-research-{topic}.md
  design/            # Service design docs
    {date}-design-{topic}.md
  flows/             # Flow documentation
    {date}-flow-{topic}.md
  project/
    specs/
      active/
        valid-{date}-{topic}.md
  vendor/            # Vendor documentation
    {library}/
      README.md
      reference/
        {docs}.md
      topics/
        {name}.md
```

## Path Convention

Throughout this skill, paths prefixed with `@` indicate paths from the skill root:

- `@references/research-brief.md` -> `dev.research/references/research-brief.md`
- `@references/flow-doc.md` -> `dev.research/references/flow-doc.md`
- `@references/design-doc.md` -> `dev.research/references/design-doc.md`
- `@references/validation-spec.md` -> `dev.research/references/validation-spec.md`
- `@references/vendor-doc.md` -> `dev.research/references/vendor-doc.md`

When you see `$ROOT_DIR/` referenced, resolve them relative to the project root directory.
