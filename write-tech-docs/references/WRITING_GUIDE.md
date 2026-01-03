# Writing Guide

This guide documents the editorial philosophy and style decisions for Skillz documentation, derived from the README revision analysis.

## Core Principles

### 1. Lead with Value, Not Implementation

**Bad:**

> Skillz is a TypeScript-powered command line tool that scans local and global skill directories, renders them through configurable templates, and keeps downstream instruction files in sync.

**Good:**

> Skillz is a CLI that enables skills across any LLM powered tool in a matter of seconds.

**Why:** Readers care about what they can achieve, not how the software achieves it. Lead with benefits and outcomes. Implementation details belong in architecture docs, not marketing copy.

### 2. Benefits Over Features

**Bad:**

> Discover skills from project-local `.claude/skills/` and user-level `~/.claude/skills/` folders.

**Good:**

> Enable skills to be automatically synced from well known paths (eg. `.claude/skills`) as well as the ability to customize additional paths

**Why:** Frame features as user capabilities ("Enable", "Manage", "Control") rather than system capabilities ("Discovers", "Scans", "Processes"). This shifts the focus from what the tool does to what the user can do with it.

### 3. Ruthlessly Cut Redundancy

**Remove These Types of Statements:**

- Obvious instructions: "You can edit `skillz.json` manually."
- Repetitive examples showing the same concept multiple ways
- Meta-commentary explaining what examples show: "The section starts with a configurable heading..."
- Future-tense hedging: "Once published to npm you will be able to..."

**Why:** Trust your reader's intelligence. If something is self-explanatory from context, don't explain it. Every sentence should add new information or value.

### 4. Show the Best Path, Not All Paths

**Bad:**

```bash
skillz create --interactive
# or
skillz create -i
```

**Good:**

```bash
skillz create -i
```

**Why:** Multiple options create decision paralysis. Show the recommended approach. If there are alternatives, mention them in an options section, not inline.

### 5. Consolidate Examples

**Bad:**

```bash
# Step 1: Initialize
skillz init --preset agentsmd
```

```bash
# Step 2: Sync skills
skillz sync
```

**Good:**

```sh
cd <your-workspace>
# this automatically detects your environment
skillz init

# your skills are now automatically synced
skillz sync
```

**Why:** Single, consolidated code blocks are easier to scan and copy-paste. Inline comments provide context without breaking flow.

## Style Rules

### Terminology

- **"Quickstart"** not "Quick Start" - compound terms should be single words
- **"CLI"** not "command line tool" - use the established abbreviation
- **"LLM"** not "AI" - be precise when precision matters
- Use **active voice**: "The CLI stores" not "Settings are stored"

### Code Examples

1. **Show real, runnable examples** - no pseudocode or placeholders unless necessary
2. **Use comments sparingly** - only when adding genuine context
3. **Prefer `sh` or `bash` for shell blocks** - be explicit about the language
4. **One conceptual unit per code block** - don't mix bash commands with JSON config examples

### Formatting

1. **Use whitespace for hierarchy:**
   - Add blank lines before numbered/bulleted lists
   - Separate major sections with clear visual breaks

2. **List structure:**
   - Start list items with action verbs when describing capabilities
   - Keep items parallel in structure
   - Use em dashes (—) or colons for inline definitions

3. **Headers:**
   - Use sentence case, not title case: "Quick start" not "Quick Start" (unless it's a proper noun/brand term like "Quickstart")
   - Be specific: "Editor Selection Priority" not "How Editors Work"

### Configuration Examples

**Show realistic defaults:**

- Don't show `ignore: ["*.test"]` if most users won't need ignore patterns
- Show `ignore: []` instead
- Prefer `vim` over `vi` for opinionated defaults
- Comment on what's important, not what's obvious

### Options and Flags

**Structure:**

1. Show the primary use case first (usually the simplest)
2. List options in a definition list format
3. Group examples by complexity: simple → complex

**Example:**

````markdown
Options:

- `--dry-run`: Show pending updates without touching the filesystem.
- `--force`: Ignore change detection and rewrite targets even if nothing changed.

Examples:

```bash
skillz sync
skillz sync --dry-run
skillz sync --only python-expert --verbose
```
````

````

## What to Avoid

### ❌ Hedging and Disclaimers

**Bad:**
> Skillz CLI is released under the MIT License. See `LICENSE` for details once the repository is published.

**Good:**
> Skillz CLI is released under the Apache License. See `LICENSE` for details.

**Why:** Be definitive about the current state. If something isn't ready, don't document it yet.

### ❌ Implementation Details in Overview

**Bad:**
> Skillz scans local and global skill directories, renders them through configurable templates, and keeps downstream instruction files in sync.

**Good:**
> Skillz enables skills across any LLM powered tool in a matter of seconds.

**Why:** Save implementation details for architecture sections. The overview should answer "why should I care?"

### ❌ Multiple Ways to Do the Same Thing

**Bad:**
```bash
# Skill names are case-insensitive and flexible
skillz edit PYTHON-EXPERT    # Same as python-expert
skillz edit python_expert    # Same as python-expert
````

**Good:**

```bash
skillz edit python-expert
```

**Why:** Demonstrating flexibility is good in one sentence ("case-insensitive, handles hyphens/underscores interchangeably"). Showing three identical examples wastes space and attention.

### ❌ Explaining the Obvious

**Bad:**

> You can edit `skillz.json` manually.

**Good:**

> (Omit entirely)

**Why:** If you've shown the JSON structure and it's a text file, readers will assume they can edit it.

## When to Break These Rules

1. **Technical Documentation vs Marketing Content:**
   - README.md: Apply these rules strictly
   - CLAUDE.md: Technical details are appropriate, implementation matters
   - Architecture docs: Deep dives are the point

2. **API Documentation:**
   - List all options, even if redundant
   - Show return types and error conditions
   - Precision matters more than brevity

3. **Troubleshooting Guides:**
   - Show multiple approaches when debugging
   - Explain the obvious (users are frustrated and need hand-holding)
   - Hedging is okay: "This might be caused by..."

## Editorial Review Checklist

Before publishing documentation, ask:

- [ ] Does the opening paragraph answer "what can I do with this?"
- [ ] Have I removed all obvious statements?
- [ ] Are code examples consolidated and copy-pasteable?
- [ ] Do I show the recommended approach (not all approaches)?
- [ ] Have I removed hedging and future-tense language?
- [ ] Is every sentence adding new information?
- [ ] Are lists parallel in structure?
- [ ] Have I used whitespace to improve scannability?
- [ ] Are configuration examples realistic, not exhaustive?
- [ ] Does the document flow from simple → complex?

## Voice and Tone

**Characteristics:**

- **Confident:** Definitive statements, no hedging
- **Concise:** Every word earns its place
- **Practical:** Examples over explanations
- **Respectful:** Trust the reader's intelligence

**Not:**

- Academic or overly formal
- Marketing-speak or hype
- Apologetic or uncertain
- Condescending or over-explanatory

## Examples in Practice

### Opening Sections

**Pattern:** One-sentence value proposition + one-sentence mechanism

```markdown
Skillz is a CLI that enables skills across any LLM powered tool in a matter of seconds.
It works by injecting skill instructions in the `AGENTS.md` (or tool equivalent) instruction file.
```

### Feature Lists

**Pattern:** Action verb + benefit + (optional technical detail)

```markdown
- Enable skill usage by automatically detecting tool environment and injecting skill usage instructions
- Enable skills to be automatically synced from well known paths (eg. `.claude/skills`)
- Various methods to manage and edit skills from the CLI
```

### Command Documentation

**Pattern:** Purpose statement → Primary use → Options → Examples (simple to complex)

````markdown
### `skillz sync`

Scan configured skill directories and update every target file with the latest skills.

Options:

- `--dry-run`: Show pending updates without touching the filesystem.
- `--force`: Ignore change detection and rewrite targets.

Examples:

```bash
skillz sync
skillz sync --dry-run --verbose
```
````

```

## Conclusion

Good documentation is invisible. It answers questions before they're asked, gets users productive quickly, and respects their time. When in doubt, cut rather than add. Show rather than tell. Lead with value rather than implementation.

The best documentation is the one that's no longer needed because the tool is self-explanatory.
```
