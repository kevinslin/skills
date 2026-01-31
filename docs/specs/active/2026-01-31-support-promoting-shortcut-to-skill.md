# Execution Plan: Support Promoting Shortcut to Skill

**Date:** 2026-01-31
**Status:** Completed

---

## Goal

Add a dev.shortcuts workflow for promoting an existing shortcut into a skill via skill-creator, and define the follow-up step to replace shortcut invocations with the new skill in existing skills.

---

## Context

### Background
The skills repo currently uses dev.shortcuts to document shortcut workflows, but there is no documented workflow for converting a shortcut into a full skill.

### Current State
- Shortcut workflows live under `active/dev.shortcuts/shortcuts` with references in `active/dev.shortcuts/SKILL.md` and `active/dev.shortcuts/TMP.md`.
- Existing skills reference shortcuts via `@shortcut:` and `trigger:` tokens.

### Constraints
- Keep changes within the `skills` repo and follow existing conventions.
- Use `skill-creator` to generate the new skill when a promotion is requested.

---

## Technical Approach

### Architecture/Design
Add a new shortcut workflow file (e.g., `promote-shortcut-to-skill.md`) that documents the promotion steps, then surface it in dev.shortcuts docs.

### Technology Stack
- Markdown skill files in `active/`

### Integration Points
- `active/dev.shortcuts/SKILL.md`
- `active/dev.shortcuts/TMP.md`
- `active/dev.shortcuts/shortcuts/`

### Design Patterns
- Follow existing shortcut file structure and wording style.

### Important Context
The promotion workflow should explicitly instruct updating existing skill references from `@shortcut:`/`trigger:` to `use skill [new-skillname]` for the promoted shortcut.

---

## Steps

### Phase 1: Plan the workflow
- [x] Review current dev.shortcuts docs and shortcut files for naming/style conventions.
- [x] Decide on the new shortcut filename and wording.

### Phase 2: Implement workflow and documentation
- [x] Add the promote-shortcut workflow file under `active/dev.shortcuts/shortcuts/`.
- [x] Update `active/dev.shortcuts/SKILL.md` to mention the promotion workflow.
- [x] Update `active/dev.shortcuts/TMP.md` to include the new workflow in the trigger table.

### Phase 3: Validate
- [x] Review changes for consistency and clarity.

**Dependencies between phases:**
- Phase 2 depends on Phase 1.
- Phase 3 depends on Phase 2.

---

## Testing

- No automated tests (docs-only change).

---

## Dependencies

### External Services/APIs
- None

### Libraries/Packages
- None

### Tools/Infrastructure
- `skill-creator` skill (for workflow instructions)

### Access Required
- [ ] None

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Workflow unclear or incomplete | Med | Med | Mirror existing shortcut style and spell out steps explicitly. |
| Missing update locations | Low | Med | Call out `@shortcut:` and `trigger:` search step in workflow. |

---

## Questions

### Technical Decisions Needed
- [ ] None

### Clarifications Required
- [ ] None

### Research Tasks
- [ ] None

---

## Success Criteria

- [x] New dev.shortcuts workflow exists for promoting a shortcut to a skill.
- [x] dev.shortcuts docs mention the new workflow and how to update references.
- [x] No unintended changes to unrelated shortcuts or skills.

---

## Notes

- Reviewed recent commits for context; no additional design doc present.
