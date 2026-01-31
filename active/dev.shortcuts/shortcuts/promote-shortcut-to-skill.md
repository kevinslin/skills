Shortcut: Promote Shortcut to Skill

Instructions:

Create a to-do list with the following items then perform all of them:

1. Identify the shortcut to promote. If the user did not provide a shortcut name or
   file, ask for it and confirm the target shortcut file.

2. Use the skill-creator skill to create a new skill from the shortcut:
   - Ask the user where the new skill should live (active, drafts, private, local).
   - Decide the new skill name (default to the shortcut name unless the user says
     otherwise).
   - Convert the shortcut workflow into the new skill's SKILL.md (and references if
     needed) following skill-creator rules.

3. Replace shortcut invocations with the new skill:
   - Search existing skills for `@shortcut:<shortcut-name>`, `@shortcuts:<shortcut-name>`,
     and `trigger:<shortcut-name>`.
   - Replace each reference with `use skill [new-skillname]` to accomplish the same task.

4. Remove or update the original shortcut entry:
   - If the shortcut is now fully replaced, delete the shortcut file.
   - Update any dev.shortcuts tables or docs that referenced the shortcut so they
     point to the new skill instead.

5. Verify cleanup by searching again for the shortcut tokens to ensure no references
   remain.
