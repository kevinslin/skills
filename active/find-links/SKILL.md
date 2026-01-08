---
name: find-links
description: This skill should be used when the user wants to fill in TODO links, placeholder links, or missing links in markdown files. Invoke when the user mentions "fill links", "TODO links", "find links", or asks to add appropriate links to concepts in a document.
---

# Find Links Skill

## Overview

This skill helps identify and fill in TODO or placeholder links in markdown files with appropriate articles from reputable sources. It searches for relevant, authoritative content and replaces placeholder links with actual URLs.

## When to Use This Skill

Trigger this skill when the user:
- Asks to "fill in TODO links" or "fill links"
- Mentions placeholder links like `{TODO}`, `{LINK}`, or similar patterns
- Requests appropriate links for concepts in a document
- Wants to find authoritative sources for topics mentioned in their notes

## Supported Link Patterns

The skill recognizes these common placeholder patterns:
- `{TODO}` - Generic placeholder for missing link
- `{LINK}` - Generic link placeholder
- `{LINK to ...}` - Placeholder with hint about the target
- `[text]({TODO})` - Markdown link with TODO placeholder
- `[text]({LINK})` - Markdown link with LINK placeholder
- `[text]()` - Empty markdown link
- `TODO:` comments near links

## Process

### Phase 1: Scan and Identify

1. Read the target markdown file(s)
2. Identify all placeholder link patterns
3. Extract context around each placeholder:
   - The link text (if present)
   - The surrounding sentence or paragraph
   - Any hints in the placeholder (e.g., `{LINK to movie}`)
4. Create a list of all links that need to be filled

### Phase 2: Research and Find Appropriate Links

For each placeholder link:

1. **Understand the Context**
   - Read the surrounding text to understand what concept is being referenced
   - Note any specific details that help identify the target (movie names, technical terms, etc.)

2. **Search for Authoritative Sources**
   - Use WebSearch to find appropriate articles
   - Prioritize sources in this order:
     1. Wikipedia (for general concepts, people, movies, historical events)
     2. Official documentation (for tools, libraries, frameworks, protocols)
     3. Official project/organization websites (for specific products/services)
     4. Reputable tech blogs/publications (for emerging technologies)
     5. Academic or research sites (for scientific concepts)

3. **Validate the Link**
   - Ensure the link is directly relevant to the context
   - Verify it's from a reputable source
   - Prefer stable URLs (avoid blog posts that might disappear)
   - Check that the link works and goes to the intended content

### Phase 3: Fill in the Links

1. **Replace Placeholders**
   - Use the Edit tool to replace each placeholder with the appropriate URL
   - Maintain the existing markdown link format
   - Preserve the original link text

2. **Document Changes**
   - Keep track of all links filled using the TodoWrite tool
   - Mark each link as completed after filling

3. **Summary**
   - Provide a summary of all links that were filled
   - Include the line numbers where changes were made
   - Note any placeholders that couldn't be filled with explanation

## Source Priority Guide

### For Technical Concepts
- Official documentation (e.g., docs.python.org, developer.mozilla.org)
- Wikipedia for general overview
- Official blog announcements from the creators
- Reputable technical publications (e.g., ACM, IEEE)

### For Tools and Products
- Official product website
- Official GitHub repository (for open source)
- Official documentation site
- Wikipedia (if notable enough)

### For General Knowledge
- Wikipedia (primary source)
- Encyclopedias or educational sites
- Official organization websites

### For Movies, Books, and Media
- Wikipedia
- IMDb (for movies)
- Official publisher/studio sites

### For People
- Wikipedia
- Official personal/professional websites
- LinkedIn (for professionals)
- Official organization bio pages

### For Protocols and Standards
- Official specification sites (e.g., w3.org, ietf.org)
- Official announcement pages
- Wikipedia for overview

## Important Notes

### Quality Standards
- Always prefer Wikipedia for general concepts when available
- For technical topics, official documentation is always preferred
- Avoid linking to:
  - Paywalled content
  - Temporary blog posts or news articles
  - Social media posts
  - Sites with questionable reputation
  - Dead or broken links

### Handling Ambiguity
- If the context is unclear, use AskUserQuestion to clarify
- If multiple valid links exist, choose the most authoritative
- If no appropriate link can be found, note this and ask the user

### Best Practices
- Use the TodoWrite tool to track progress on multiple links
- Complete links one at a time, marking each as done
- Test each link pattern to ensure it matches correctly
- Preserve the original formatting and style of the document
- Include line numbers in your summary for easy reference

## Examples

### Example 1: Movie Reference
**Before:**
```markdown
Prior to skills, every new conversation with a LLM felt like a scene from [50 first dates]({LINK to movie}).
```

**Process:**
1. Identify: Movie title "50 first dates"
2. Search: WebSearch for "50 First Dates movie"
3. Find: Wikipedia article at https://en.wikipedia.org/wiki/50_First_Dates
4. Replace placeholder with Wikipedia link

**After:**
```markdown
Prior to skills, every new conversation with a LLM felt like a scene from [50 first dates](https://en.wikipedia.org/wiki/50_First_Dates).
```

### Example 2: Technical Standard
**Before:**
```markdown
Yes, we had standards like [MCPs]({TODO}) to help customize LLMs.
```

**Process:**
1. Identify: "MCPs" likely means Model Context Protocol
2. Context: Related to customizing LLMs
3. Search: WebSearch for "Model Context Protocol MCP Anthropic"
4. Find: Official Anthropic announcement
5. Replace with official source

**After:**
```markdown
Yes, we had standards like [MCPs](https://www.anthropic.com/news/model-context-protocol) to help customize LLMs.
```

### Example 3: Technical Concept
**Before:**
```markdown
Skills represent [object oriented programming]({TODO}).
```

**Process:**
1. Identify: General programming concept "object oriented programming"
2. Search: This is a well-established concept
3. Find: Wikipedia article (best for general concepts)
4. Replace with Wikipedia link

**After:**
```markdown
Skills represent [object oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming).
```

## Error Handling

If you encounter issues:
- **Context too vague**: Ask user for clarification
- **Multiple possible links**: Choose most authoritative or ask user
- **No good link found**: Note this and skip, asking user if they have a preference
- **Technical error**: Report the error and continue with remaining links
