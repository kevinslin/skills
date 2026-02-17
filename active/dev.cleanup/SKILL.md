---
name: dev.cleanup
description: Finalize development tasks by ensuring changes from the current session are captured in project documentation. Use at the end of coding work, before handoff/commit/PR, especially when downstream AGENTS.md files provide additional cleanup or documentation instructions.
dependencies: [dev.research]
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
- If flow docs exist, make sure relevant flow docs are updated with meaningful changes. This means any config changes and sudocode details if significant logic has changed.

4. Report
- List documentation files updated.
- If no doc changes were required, state why.