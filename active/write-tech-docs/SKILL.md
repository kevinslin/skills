---
name: tech-doc-writer
description: This skill should be used when writing or reviewing technical documentation such as READMEs, API documentation, quickstart guides, or any user-facing documentation. Apply editorial principles focused on leading with value, cutting redundancy, and creating scannable, actionable content. Use when the user requests help writing docs, improving existing documentation, or creating user guides.
---

# Tech Doc Writer

## Overview

Apply proven editorial principles to create clear, concise, and effective technical documentation. This skill emphasizes leading with user value, ruthlessly cutting redundancy, and creating scannable content that respects reader intelligence.

## Core Editorial Principles

Apply these five foundational principles when writing or reviewing documentation:

### 1. Lead with Value, Not Implementation

Begin with what users can achieve, not how the software achieves it. Implementation details belong in architecture docs, not in overview sections.

**Pattern:**
- Bad: "TypeScript-powered tool that scans directories and renders templates"
- Good: "CLI that enables skills across any LLM powered tool in seconds"

### 2. Frame Features as User Benefits

Use "Enable", "Manage", "Control" instead of "Discovers", "Scans", "Processes". Shift focus from what the tool does to what users can do with it.

**Pattern:**
- Bad: "Discover skills from `.claude/skills/` folders"
- Good: "Enable skills to be automatically synced from well known paths"

### 3. Ruthlessly Cut Redundancy

Remove:
- Obvious instructions
- Repetitive examples showing the same concept
- Meta-commentary explaining what examples show
- Future-tense hedging ("Once published you will be able to...")

Trust reader intelligence. Every sentence must add new information.

### 4. Show the Best Path, Not All Paths

Present the recommended approach. Listing multiple options creates decision paralysis. If alternatives exist, mention them in an options section, not inline.

**Pattern:**
- Bad: Show both `--interactive` and `-i` flags
- Good: Show only `-i` (the recommended short form)

### 5. Consolidate Examples

Use single, consolidated code blocks with inline comments instead of multiple scattered examples. This improves scannability and copy-paste usability.

## Documentation Structure Patterns

Choose the appropriate structure based on content type:

**README.md** - Apply strict adherence to principles:
- One-sentence value proposition
- Benefits-focused feature lists
- Consolidated code examples
- No hedging or implementation details in overview

**API Documentation** - Precision over brevity:
- List all options comprehensively
- Show return types and error conditions
- Technical details are appropriate

**Troubleshooting Guides** - Hand-holding is acceptable:
- Show multiple approaches when debugging
- Explain the obvious (users are frustrated)
- Hedging is okay: "This might be caused by..."

## Writing Style Requirements

### Terminology
- Use compound terms as single words: "Quickstart" not "Quick Start"
- Use established abbreviations: "CLI" not "command line tool"
- Be precise: "LLM" not "AI" when precision matters
- Use active voice: "The CLI stores" not "Settings are stored"

### Code Examples
- Show real, runnable examples (no pseudocode unless necessary)
- Use comments sparingly (only when adding genuine context)
- Specify language explicitly (`sh`, `bash`, `python`)
- One conceptual unit per code block

### Formatting
- Add blank lines before lists for visual hierarchy
- Start list items with action verbs for capabilities
- Keep items parallel in structure
- Use sentence case for headers: "Quick start" not "Quick Start"
- Be specific: "Editor Selection Priority" not "How Editors Work"

## Command Documentation Pattern

Follow this structure for documenting commands:

```markdown
### `command-name`

[Purpose statement in one sentence]

Options:

- `--flag`: Description of what flag does.
- `--another`: Description of another flag.

Examples:

```bash
command-name
command-name --flag
command-name --flag --another --verbose
```
```

Order examples from simple to complex.

## Opening Section Pattern

Structure opening sections as:
1. One-sentence value proposition
2. One-sentence mechanism explanation

Example:
```markdown
Skillz is a CLI that enables skills across any LLM powered tool in a matter of seconds.
It works by injecting skill instructions in the `AGENTS.md` instruction file.
```

## Feature List Pattern

Use this pattern: Action verb + benefit + (optional technical detail)

Example:
```markdown
- Enable skill usage by automatically detecting tool environment
- Enable skills to be automatically synced from well known paths
- Manage and edit skills directly from the CLI
```

## Voice and Tone

Maintain these characteristics:
- **Confident:** Definitive statements, no hedging
- **Concise:** Every word earns its place
- **Practical:** Examples over explanations
- **Respectful:** Trust reader intelligence

Avoid:
- Academic or overly formal language
- Marketing-speak or hype
- Apologetic or uncertain phrasing
- Condescending or over-explanatory tone

## Editorial Review Process

Before finalizing documentation, verify:

- [ ] Opening paragraph answers "what can I do with this?"
- [ ] All obvious statements removed
- [ ] Code examples consolidated and copy-pasteable
- [ ] Shows recommended approach (not all approaches)
- [ ] Hedging and future-tense language removed
- [ ] Every sentence adds new information
- [ ] Lists parallel in structure
- [ ] Whitespace improves scannability
- [ ] Configuration examples realistic, not exhaustive
- [ ] Document flows from simple to complex

## Detailed Writing Guide

For comprehensive coverage of all principles, examples, and edge cases, consult the complete writing guide:

**Load when needed:** `references/WRITING_GUIDE.md`

This reference contains:
- Extended examples for each principle
- Section-by-section patterns
- Configuration example guidelines
- When to break the rules
- Detailed voice and tone guidance

Use grep to search for specific topics:
- Grep for "bad:" or "good:" to find before/after examples
- Grep for "why:" to understand reasoning
- Grep for specific sections: "Opening Sections", "Command Documentation", etc.

## Application Workflow

When writing or reviewing documentation:

1. **Identify document type** - README, API docs, troubleshooting, etc.
2. **Apply appropriate pattern** - Strict principles for READMEs, flexibility for technical docs
3. **Structure content** - Use recommended patterns for openings, features, commands
4. **Review against checklist** - Verify all editorial requirements met
5. **Consult reference guide** - Load `references/WRITING_GUIDE.md` for detailed guidance when needed

The goal: Create documentation that gets users productive quickly while respecting their time and intelligence.
