# Codex custom prompts (additional shortcuts)

Custom prompts let you add local, reusable slash commands. For the Codex agent, these
are the extra shortcuts beyond the repo skills.

## Where they live

- Stored in `~/.codex/prompts/` as top-level `.md` files.
- Local to your machine; they are not shared through the repo. Use skills for shared
  or implicit behavior.

## How to create

1. `mkdir -p ~/.codex/prompts`
2. Create a Markdown file with YAML front matter:
   - `description`
   - `argument-hint`
3. Restart Codex (or start a new session) so it picks up the new prompt.

## Invocation and arguments

- Invoke with `/prompts:<name>` in the Codex CLI or IDE extension.
- Arguments supported:
  - Positional: `$1`..`$9` and `$ARGUMENTS`
  - Named: `$FOO` with `FOO=value` (quote values with spaces)
  - Literal `$` with `$$`

## Manage prompts

- Edit or delete files in `~/.codex/prompts/`.
- Codex scans only top-level Markdown files (no subdirectories).

## Relationship to dev.shortcuts

- If a workflow is Codex-only or personal, implement it as a custom prompt and treat
  it as an additional shortcut.
- If the workflow should be shared or invoked implicitly, add a skill instead.