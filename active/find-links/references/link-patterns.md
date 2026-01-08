# Common Link Patterns to Recognize

This document shows examples of placeholder link patterns that the find-links skill should recognize and fill.

## Pattern 1: TODO in braces
```markdown
[text]({TODO})
```
**Example:**
```markdown
We use [AGENTS.md]({TODO}) for configuration.
```

## Pattern 2: LINK in braces
```markdown
[text]({LINK})
```
**Example:**
```markdown
Check out [this article]({LINK}) for more details.
```

## Pattern 3: TODO with hint
```markdown
[text]({TODO - hint about target})
```
**Example:**
```markdown
Based on the movie [Inception]({TODO - movie}).
```

## Pattern 4: LINK with hint
```markdown
[text]({LINK to description})
```
**Example:**
```markdown
Similar to [50 first dates]({LINK to movie}).
```

## Pattern 5: Empty link
```markdown
[text]()
```
**Example:**
```markdown
Read about [object oriented programming]().
```

## Pattern 6: TODO comment
```markdown
[text](URL) <!-- TODO: update this link -->
```
**Example:**
```markdown
See [docs](http://old-url.com) <!-- TODO: update to new docs site -->
```

## Priority for Source Selection

### 1. Wikipedia
Best for:
- General concepts and terms
- Movies, books, media
- Historical events
- Notable people
- Scientific concepts
- Programming paradigms (when general overview is needed)

**Examples:**
- Object-oriented programming → https://en.wikipedia.org/wiki/Object-oriented_programming
- 50 First Dates → https://en.wikipedia.org/wiki/50_First_Dates
- Machine learning → https://en.wikipedia.org/wiki/Machine_learning

### 2. Official Documentation
Best for:
- Programming languages
- Frameworks and libraries
- Tools and software
- APIs and protocols
- Technical specifications

**Examples:**
- Python → https://docs.python.org/3/
- React → https://react.dev/
- Git → https://git-scm.com/doc
- HTTP → https://developer.mozilla.org/en-US/docs/Web/HTTP

### 3. Official Product/Project Sites
Best for:
- Specific products
- Open source projects
- Services and platforms
- Standards and protocols

**Examples:**
- Model Context Protocol → https://www.anthropic.com/news/model-context-protocol
- AI assistant → https://en.wikipedia.org/wiki/AI_assistant
- Docker → https://www.docker.com/

### 4. Official Announcements/Blogs
Best for:
- New features or products
- Technical announcements
- Standards adoption

**Examples:**
- New protocol announcements
- Product launches
- Major updates

### 5. Reputable Tech Publications
Best for:
- Industry analysis
- Comparisons
- Tutorials (when official docs don't exist)

**Examples:**
- Mozilla Developer Network
- CSS-Tricks
- Smashing Magazine

## Examples by Category

### Movies and Entertainment
- [Movie Title] → Wikipedia
- Example: [The Matrix](https://en.wikipedia.org/wiki/The_Matrix)

### Programming Concepts
- General concepts → Wikipedia
- Specific implementations → Official docs
- Example: [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer)

### Tools and Software
- Open source → GitHub + Official docs
- Commercial → Official website
- Example: [VS Code](https://code.visualstudio.com/)

### Protocols and Standards
- Official spec site first
- Wikipedia for overview
- Example: [HTTP/2](https://http2.github.io/)

### Organizations and Companies
- Official website
- Wikipedia for notable companies
- Example: [Anthropic](https://www.anthropic.com/)

### People
- Wikipedia for notable individuals
- Official websites/profiles
- Example: [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace)
