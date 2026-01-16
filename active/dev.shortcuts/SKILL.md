---
name: dev.shortcuts
description: Mandatory shortcut trigger and usage guidance. ALWAYS check if shortcut applies before responding to ANY coding or development request. 
---

Shortcuts are a small self contained workflow that can be triggered when the user explicitly asks to use a shortcut. 

# Shortcut Triggers and Usage

Shortcut files for this skill live in `references/`. Any `@shortcut:...` or `trigger:[shortcut]` reference resolves to the file with the same name in `references/`.

## Mandatory Check Protocol

1. Scan shortcuts in `references/` for applicable workflows
2. If a shortcut matches -> Announce: "Using [shortcut name]"
3. Follow the shortcut exactly

## Agent-Specific References

Additional shortcut or skill guidance may live in agent-specific references at the
repo root: `references/<agent>.md`.

- **Codex agent:** See `references/codex.md` for extra shortcut guidance and where
  to find custom prompt shortcuts.

## Inlining Shortcuts into Other Skills

When the user explicitly asks to inline a shortcut into another skill, inline the
shortcut logic directly into the target skill they name.

Steps:
1. Add a **Shortcuts** section to the target skill's `SKILL.md` with the following
   text (verbatim):
   ```
   ## Shortcuts
   Shortcuts are a small self contained workflow that can be triggered when the user explicitly asks to use a shortcut. 
   You have access to shortcuts mentioned in `./references/shortcuts`
   ```
2. Copy the shortcut file(s) being inlined into the target skill's
   `./references/shortcuts` directory (create it if missing).
3. Ensure the inlined shortcuts live with the target skill (do not rely on
   `dev.shortcuts` references for those inlined workflows).

## This is NOT Optional

If a shortcut exists for your task, you must use it.
Do not rationalize skipping it.
Common rationalizations to avoid:

- "This is simple, I don't need a shortcut" -> WRONG. Use the shortcut.
- "I know how to do this" -> WRONG. The shortcut may have steps you'll forget.
- "The user didn't ask for a shortcut" -> WRONG. Shortcuts are mandatory when applicable.
- "The shortcut is overkill" -> WRONG. Shortcuts ensure consistency and quality.

## Shortcut Chaining

Some workflows require multiple shortcuts in sequence:
Always complete the full chain when applicable.