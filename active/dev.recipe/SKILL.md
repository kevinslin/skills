---
name: dev.recipe
description: This skill should be used when capturing or applying service-scoped change recipes stored under references/{service}/.
---

# dev.recipe

## Overview
Capture and apply repeatable change recipes tied to a specific service and code path. Store recipes as markdown files under `references/<service>/` with required frontmatter and actionable steps so another agent can reproduce the change.

## Triggers
Use this skill when the user:
- asks to capture or record a recipe from the current session or a recent change
- asks to use or apply a named recipe
- requests a change that clearly matches an existing recipe

## Root Directory
All filepaths mentioned is relative to the $ROOT_DIR. Unless overridden elsewhere, the $ROOT_DIR is `./docs` (relative to the project root directorey)

## Recipe format and location
- $RECIPES_ROOT:`$ROOT_DIR/recipes/<recipe-name>.md`
- Naming: kebab-case filenames ending in `.md` (example: `extract-connector-id.md`)
- Required frontmatter fields:
  - `commit`: current `HEAD` commit hash
  - `agent_session_id`: session id of the capturing agent
  - `updated`: ISO 8601 timestamp in UTC
  - `files`: list of files that the recipe changes

Example frontmatter:

```
---
commit: 0123456789abcdef0123456789abcdef01234567
agent_session_id: abc123
updated: 2026-01-10T00:00:00Z
files:
  - path/to/file.py
  - path/to/other_file.sql
---
```

## Workflow decision
1. Determine intent: capture vs use.
2. If capture, follow the capture workflow.
3. If use, follow the use workflow.
4. If service or recipe name is missing or ambiguous, ask for clarification before proceeding.

## Capture workflow
1. Parse the user request to extract:
   - service name
   - recipe name (or derive a kebab-case name from the request)
   - target code path(s)
2. Collect context from the current session and local changes:
   - locate the relevant files and logic referenced in the conversation
   - use `git diff` or file inspection to capture the actual changes
3. Gather required metadata:
   - `commit`: `git rev-parse HEAD`
   - `agent_session_id`: use $dev.llm-session skill to discover
   - `updated`: `date -u +%Y-%m-%dT%H:%M:%SZ`
   - `files`: list only the files the recipe modifies
4. Create the recipe file at `references/<service>/<recipe-name>.md`.
5. Write reproducible instructions:
   - State the goal and relevant context in 1-3 sentences.
   - List ordered steps with exact file paths and code snippets.
   - Include diffs when helpful to highlight changes.
   - Document verification steps (tests, commands, or manual checks).
   - Note assumptions, caveats, and rollback hints if needed.
6. If updating an existing recipe, refresh the frontmatter (`commit`, `agent_session_id`, `updated`, `files`) to match the new capture.

## Use workflow
1. Parse the user request to identify service, recipe name, and target file(s).
2. Locate and read `references/<service>/<recipe-name>.md`.
3. Follow the recipe steps exactly, adapting only when the current code differs.
4. If the user-specified target path differs from the recipe, map the steps to the new path and call out any assumptions.
5. Run verification steps from the recipe when possible; otherwise, state what could not be verified.
6. Do not modify the recipe unless the user asks to update it.

## Reference template
Use `references/recipe-template.md` as the default scaffold when capturing a new recipe.
