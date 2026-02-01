# Execution Plan: Support Vendor Docs in dev.research

**Date:** 2026-02-01
**Status:** Completed

---

## Goal

Extend the `dev.research` skill to support creating local vendor documentation (stored under `docs/vendor/{library}`) with required sections, input workflow, and file placement rules from issue #4.

---

## Context

### Background
Issue #4 requests that the `dev.research` skill support creation of vendor docs (e.g., local vendor docs in `docs/vendor`). The workflow takes a docs URL endpoint and a library name (infer if missing), summarizes official docs with limited direct quotes, and requires sections for installation, quickstart, gotchas, concepts, topics, and API reference with specific file placement rules.

### Current State
The `dev.research` skill currently supports research briefs, flow docs, and FAQs with associated templates. There is no guidance or template for vendor docs or `docs/vendor` structure.

### Constraints
- Must follow the issue #4 requirements for structure and content.
- Keep changes confined to skill documentation/templates (no runtime code changes).

---

## Technical Approach

### Architecture/Design
Add a new “Vendor Docs” document type to `active/dev.research/SKILL.md`, including input workflow (docs URL + library name), DOC_ROOT/LIB_ROOT definitions, required sections, and file placement rules. Introduce a new template under `active/dev.research/references/` to standardize vendor docs. Update directory structure and path convention sections accordingly.

### Technology Stack
- Markdown documentation only.

### Integration Points
- `active/dev.research/SKILL.md`
- `active/dev.research/references/`

### Design Patterns
- Follow existing skill structure: document type section + template + shortcut.

### Important Context
- Issue #4 requirements: store docs under `docs/vendor/{library}`, include Quickstart/Core Concepts/API Reference/Topics, and split API reference and topics into `reference/` and `topics/` subfolders.

---

## Steps

### Phase 1: Plan & Setup
- [x] Add gitignore patterns for `*-progress.md` and `*-learnings.md` in `docs/specs/active/` if missing.
- [x] Create progress and learnings artifacts next to this plan.

### Phase 2: Update dev.research Skill Docs
- [x] Add “Vendor Docs” to Available Document Types with requirements and output paths.
- [x] Add a “New Vendor Docs” shortcut workflow aligned with other shortcuts.
- [x] Update Directory Structure and Path Convention sections to include vendor docs and template path.

### Phase 3: Add Vendor Docs Template
- [x] Create `active/dev.research/references/vendor-doc.md` with README/reference/topics skeletons and required ending sections.

### Phase 4: Verification
- [x] Review modified docs for clarity and consistency with issue #4 requirements.

**Dependencies between phases:**
- Phase 2 depends on Phase 1.
- Phase 3 depends on Phase 2.

---

## Testing

- No automated tests (documentation-only change). Perform manual review for correctness and consistency.

---

## Dependencies

### External Services/APIs
- None.

### Libraries/Packages
- None.

### Tools/Infrastructure
- None.

### Access Required
- [ ] None.

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Vendor doc structure is ambiguous | Medium | Medium | Mirror issue text verbatim for directory and file placement rules. |
| Template conflicts with required ending sections | Low | Medium | Include required ending sections in vendor docs template to stay consistent with skill rules. |

---

## Questions

### Technical Decisions Needed
- [ ] Should vendor docs be exempt from required ending sections? (Default: include per skill rule.)

### Clarifications Required
- [ ] None.

### Research Tasks
- [ ] None.

---

## Success Criteria

- [ ] `dev.research` skill includes vendor docs guidance and output structure.
- [ ] New vendor docs template added under references.
- [ ] Skill shortcuts include a workflow for creating vendor docs.
- [ ] Documentation changes align with issue #4 requirements.

---

## Notes

- Plan created per dev.exec-plan. Will proceed without user confirmation per instruction to implement.
