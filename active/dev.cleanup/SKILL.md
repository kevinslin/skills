---
name: dev.cleanup
description: Finalize development tasks by ensuring changes from the current session are captured in project documentation. Use at the end of coding work, before handoff/commit/PR, especially when downstream AGENTS.md files provide additional cleanup or documentation instructions.
---

# Dev Cleanup

## Workflow

1. Gather session changes
- Review changed files in the current worktree.
- Identify behavior changes, CLI/API changes, config changes, and workflow changes that need documentation.

2. Update core docs
- Update `README.md` so relevant behavior changes are documented.
- If `DESIGN.md` exists, update sections affected by the implementation.

3. Validate coverage
- Confirm each meaningful change is reflected in docs.
- Keep edits specific and accurate; avoid generic filler updates.

4. Report
- List documentation files updated.
- If no doc changes were required, state why.
- If `DESIGN.md` is missing, note that it was checked and not present.

5. Learn
- Use $meta.learn in code mode to learn from this session and what could be done better 
