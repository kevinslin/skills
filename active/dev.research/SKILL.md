---
name: dev.research
description: Create structured research documentation for codebase exploration and feature investigation. Enables agents to produce docs that capture findings, methodologies, and recommendations. Covers research briefs, flow docs, and frequently asked questions (FAQ)
version: 1.0.0
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

**Template**: `@references/flow-doc.md`

**Output location**: `$ROOT_DIR/flows/{YYYY-MM-DD}-{topic}.md`

### Frequently Asked Questions (faq)

FAQ are focused questions on a particular part of logic. Use them when:
- the user asks to save the current conversation as a faq
- user explicitly mentions `@faq` "eg. @faq: how does X work"

When describing flows, prefer TypeScript-like pseudocode to describe logic. Always include citations to files where logic occurs.

**Template**: `@references/faq-doc.md`

**Output location**: `$ROOT_DIR/faq/{YYYY-MM-DD}-{topic}.md`

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
  flows/             # Flow documentation
    {date}-flow-{topic}.md
```

## Integration with Other Skills

- **dev.speculate**: Research briefs inform specs and implementation planning
- **dev.exec-plan**: Research findings can drive execution plan creation

## Path Convention

Throughout this skill, paths prefixed with `@` indicate paths from the skill root:

- `@references/research-brief.md` -> `dev.research/references/research-brief.md`
- `@references/flow-doc.md` -> `dev.research/references/flow-doc.md`

When you see `$ROOT_DIR/` referenced, resolve them relative to the project root directory.
