---
name: dev.research
description: Create structured research documentation for codebase exploration and feature investigation. Enables agents to produce docs that capture findings, methodologies, and recommendations.
version: 1.0.0
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

## Available Document Types

### Research Briefs

Research briefs are comprehensive documents for technical investigations. Use them when you need to:

- Research a specific technology or approach
- Compare multiple options with structured analysis
- Document findings with methodology and sources
- Provide recommendations based on research

**Template**: `@references/research-brief.md`

**Output location**: `docs/project/research/{YYYY-MM-DD}-research-{topic}.md`

## Shortcuts

### New Research Brief

Create a to-do list with the following items then perform all of them:

1. Review `docs/project/research/` to see the list of recent research briefs

2. Copy `@references/research-brief.md` to `docs/project/research/{YYYY-MM-DD}-research-{topic-slug}.md`
   - Use kebab-case for the topic slug (e.g., `2025-01-15-research-auth-strategies.md`)

3. Begin to fill in the new research brief based on the user's instructions, stopping and asking for clarifications as soon as you need them

### Sections to Fill

When creating a research brief, fill in these sections:

- **Executive Summary** (write last, after research is complete)
- **Research Questions** (what you're trying to answer)
- **Methodology** (how you conducted the research)
- **Findings** (organized by category)
- **Comparative Analysis** (if comparing options)
- **Recommendations** (based on findings)
- **References** (sources consulted)

### Status Tracking

Update the status field as you progress:

- `Draft` - Initial creation
- `In Progress` - Actively researching
- `Complete` - Research finished

### Best Practices

- **Start with clear questions**: Define what you're trying to learn before diving in
- **Document as you go**: Capture findings during research, not after
- **Include sources**: Link to documentation, articles, and code examples
- **Be objective**: Present pros and cons fairly in comparative analysis
- **Summarize actionably**: Recommendations should be clear and implementable

## Directory Structure

Research documentation lives in the project's docs folder:

```
docs/
  project/
    research/
      current/           # Active research briefs
        research-{topic}.md
      archive/           # Completed/outdated research
        research-{topic}.md
```

## Integration with Other Skills

- **dev.speculate**: Research briefs inform specs and implementation planning
- **dev.exec-plan**: Research findings can drive execution plan creation

## Path Convention

Throughout this skill, paths prefixed with `@` indicate paths from the skill root:

- `@references/research-brief.md` -> `dev.research/references/research-brief.md`

When you see `@docs/project/` referenced, resolve them relative to the project root directory.
