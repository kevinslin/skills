---
name: dev.shortcuts
description: Mandatory shortcut trigger and usage guidance. ALWAYS check if shortcut applies before responding to ANY coding or development request. 
---

## Context
Shortcuts are a small self-contained workflow that can be triggered via the keywords `@shortcut:[shortcut]` or `trigger:[shortcut]` 

## Shortcut Location
Shortcuts can be in the following locations

1. Under the skill-bundled `references/shortcuts/` directory next to this `SKILL.md` (runtime mirror is typically `~/.codex/skills/dev.shortcuts/references/shortcuts/`).
2. Inlined in agent instructions under `## Shortcuts`. Shortcut is header text. Can be followed by a space with argument hints enclosed in `[arg_name]`
Examples
```
## Shortcuts

### Foo [arg1] [arg2]
Invokes a foo with [arg1] and [arg2]
```

## Shortcut Trigger and Usage
Any `@shortcut:[shortcut]` or `trigger:[shortcut]` invokes a shortcut and resolves in this order:

1. Exact file match in this skill's `./references/shortcuts/[shortcut].md`
2. Exact inlined match under `## Shortcuts` in active instructions

If the user asks to promote a shortcut to a skill, use `@shortcut:promote-shortcut-to-skill.md`.

If a shortcut doesn’t resolve, quickly scan the most relevant skill for similarly-named shortcuts before doing broader repo-wide searches.

## Shortcut Chaining
This involves using multiple shortcuts in sequence. Shortcut chaining is denoted by [shortcut1] -> [shortcut2]

Example:
`@shortcut:precommit-process.md -> @shortcut:create-pr.md`

## Mandatory Check Protocol

1. Scan this skill's `./references/shortcuts` directory first (canonical source).
2. If a shortcut matches -> Announce: "Using [shortcut name]"
3. Follow the shortcut exactly

## This is NOT Optional

If a shortcut exists for your task, you must use it.
Do not rationalize skipping it.
Common rationalizations to avoid:

- "This is simple, I don't need a shortcut" -> WRONG. Use the shortcut.
- "I know how to do this" -> WRONG. The shortcut may have steps you'll forget.
- "The user didn't ask for a shortcut" -> WRONG. Shortcuts are mandatory when applicable.
- "The shortcut is overkill" -> WRONG. Shortcuts ensure consistency and quality.
