# Find Links Workflow Guide

This document describes the recommended workflow for using the find-links skill.

## Step-by-Step Workflow

### 1. Initial Scan

**Action:** Read the target file and identify all TODO links

**Tools to use:**
- Read tool to view the file
- Grep tool if searching across multiple files

**Output:** Create a todo list with all links to fill

**Example:**
```
Found 5 TODO links:
1. [Ada Lovelace]({TODO}) - line 12
2. [object-oriented programming]({LINK}) - line 12
3. [Git]({TODO - version control system}) - line 18
4. [Linus Torvalds]({TODO}) - line 18
5. [AI coding assistants]({LINK to documentation}) - line 23
```

### 2. Research Each Link

**Action:** For each TODO link, search for appropriate sources

**Tools to use:**
- WebSearch tool with specific queries
- Consider context around the link

**Best practices:**
- Search with specific terms
- Include context in search (e.g., "Ada Lovelace computer programming")
- Look for official sources first

**Example search queries:**
- For `[Ada Lovelace]({TODO})` → "Ada Lovelace computer science"
- For `[Git]({TODO - version control system})` → "Git version control official"
- For `[AI coding assistants]({LINK to documentation})` → "AI coding assistant documentation"

### 3. Validate Sources

**Action:** Check that found links are appropriate and reputable

**Criteria:**
- Is it from a reputable source?
- Is it the official documentation (if applicable)?
- Is it stable (not likely to disappear)?
- Does it match the context?

**Source ranking:**
1. Official documentation
2. Wikipedia
3. Official product sites
4. Reputable publications

### 4. Fill Links

**Action:** Replace TODO placeholders with actual URLs

**Tools to use:**
- Edit tool to replace placeholders
- TodoWrite to track progress

**Best practices:**
- Fill one link at a time
- Mark each as completed in todo list
- Verify the Edit worked correctly
- Include line numbers in your summary

**Example:**
```markdown
# Before
[Ada Lovelace]({TODO})

# After
[Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace)
```

### 5. Summary and Report

**Action:** Provide summary of changes

**Include:**
- Number of links filled
- List of changes with line numbers
- Any links that couldn't be filled
- Reasons for source selection

**Example summary:**
```
Filled 5 TODO links in the document:

1. Line 12: Ada Lovelace → Wikipedia (notable historical figure)
2. Line 12: Object-oriented programming → Wikipedia (general concept)
3. Line 18: Git → Official Git website (software tool)
4. Line 18: Linus Torvalds → Wikipedia (notable person)
5. Line 23: AI coding assistants → Wikipedia (general concept)

All links verified and working.
```

## Handling Special Cases

### Multiple Valid Sources

If multiple good sources exist:

1. **Official docs > Wikipedia > Other sources**
2. If both are equally valid, choose the more comprehensive
3. If unsure, ask the user

**Example:**
- For "React", both react.dev and Wikipedia exist
- Choose react.dev (official documentation)

### Ambiguous Context

If the context is unclear:

1. Read surrounding paragraphs
2. Look for clues in parentheses or hints
3. If still unclear, use AskUserQuestion

**Example:**
- `[Python]({TODO})` - Could be the language or the snake
- Check context: if discussing programming, it's the language
- Link to https://www.python.org/

### No Good Source Found

If you can't find an appropriate link:

1. Note this in your summary
2. Explain why (too obscure, no authoritative source, etc.)
3. Ask user for guidance
4. Skip that link and continue with others

**Example:**
- Internal company tools may not have public documentation
- Proprietary systems might not have public info
- Very new technologies might not have stable links yet

### Link Already Partially Filled

Sometimes links have temporary or placeholder URLs:

```markdown
[docs](http://example.com) <!-- TODO: update -->
```

**Action:**
1. Recognize this as a link that needs updating
2. Research the correct URL
3. Replace with the proper link
4. Remove the TODO comment

## Todo List Management

Use TodoWrite effectively:

### Initial State
```
- Scan file for TODO links (pending)
- Fill link: Ada Lovelace (pending)
- Fill link: Git (pending)
- Fill link: AI coding assistants (pending)
- Provide summary (pending)
```

### During Work
```
- Scan file for TODO links (completed)
- Fill link: Ada Lovelace (in_progress)
- Fill link: Git (pending)
- Fill link: AI coding assistants (pending)
- Provide summary (pending)
```

### After Completion
```
- Scan file for TODO links (completed)
- Fill link: Ada Lovelace (completed)
- Fill link: Git (completed)
- Fill link: AI coding assistants (completed)
- Provide summary (completed)
```

## Common Patterns and Solutions

### Pattern: Technical Concept
**Example:** `[REST API]({TODO})`
**Solution:** Wikipedia for general concept
**Link:** https://en.wikipedia.org/wiki/Representational_state_transfer

### Pattern: Programming Language
**Example:** `[Python]({TODO})`
**Solution:** Official language website
**Link:** https://www.python.org/

### Pattern: Framework/Library
**Example:** `[React]({TODO})`
**Solution:** Official documentation
**Link:** https://react.dev/

### Pattern: Historical Figure
**Example:** `[Alan Turing]({TODO})`
**Solution:** Wikipedia
**Link:** https://en.wikipedia.org/wiki/Alan_Turing

### Pattern: Movie/Book
**Example:** `[The Matrix]({LINK})`
**Solution:** Wikipedia
**Link:** https://en.wikipedia.org/wiki/The_Matrix

### Pattern: Company/Organization
**Example:** `[OpenAI]({TODO})`
**Solution:** Official website
**Link:** https://openai.com/

### Pattern: Protocol/Standard
**Example:** `[HTTP]({TODO})`
**Solution:** Official spec or MDN
**Link:** https://developer.mozilla.org/en-US/docs/Web/HTTP

## Quality Checklist

Before completing the task, verify:

- [ ] All TODO patterns identified
- [ ] Research conducted for each link
- [ ] Sources are reputable and appropriate
- [ ] Links are stable and unlikely to break
- [ ] Edits preserve original formatting
- [ ] Todo list reflects actual progress
- [ ] Summary includes line numbers
- [ ] Any issues or skipped links are documented
