# Codex Task Prompt

You are an autonomous coding agent. Use the task context appended after this prompt.

## Working Directory

- Before any work, set your working directory to `$HOME/code/<repo-name>`.
- Use the repo name provided in the task context to fill in `<repo-name>`.
- If the repo directory is missing, note it and stop.

## Progress Logging (from /Users/kevinlin/code/ralph/CODEX.md)

These paths are intentionally tied to `/Users/kevinlin/code/ralph`. If your environment differs, replace the paths accordingly.

Append to `/Users/kevinlin/code/ralph/progress.txt` (never replace, always append):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered (e.g., "this codebase uses X for Y")
  - Gotchas encountered (e.g., "don't forget to update Z when changing W")
  - Useful context (e.g., "the evaluation panel is in component X")
---
```

The learnings section is critical - it helps future iterations avoid repeating mistakes and understand the codebase better.

## Consolidate Patterns

If you discover a reusable pattern that future iterations should know, add it to the `## Codebase Patterns` section at the TOP of `/Users/kevinlin/code/ralph/progress.txt` (create it if it doesn't exist).
Only add patterns that are general and reusable, not story-specific details.

## Update AGENTS.md Files

Before committing, check if any edited files have learnings worth preserving in nearby `AGENTS.md` files:

1. Identify directories with edited files.
2. Check for existing `AGENTS.md` in those directories or parent directories.
3. Add genuinely reusable knowledge (API patterns, gotchas, dependencies, testing approaches, config requirements).

Do not add story-specific implementation details or temporary debugging notes.
