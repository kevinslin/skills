---
name: Inline Shortcut
description: inline a shortcut into a file
---

Steps:
1. Add a **Shortcuts** section to the target skill's `SKILL.md` with the following text (verbatim):
   ```
   ## Shortcuts
   Shortcuts are a small self contained workflow that can be triggered when the user explicitly asks to use a shortcut. 
   You have access to shortcuts mentioned in `./references/shortcuts`
   ```
2. Copy the shortcut file(s) being inlined into the target skill's
   `./references/shortcuts` directory (create it if missing).
3. Ensure the inlined shortcuts live with the target skill (do not rely on `dev.shortcuts` references for those inlined workflows).