# dev.beads

Use bd (beads) as the single task tracker and shared memory for agent work.
Configure project-specific rules in `skills/.config/dev.beads.instructions.md` and this
skill will load them before using beads.

## Project instructions file

`skills/.config/dev.beads.instructions.md` lives at the project root. Use it to define
how beads must be used in that repo, especially for shortcut workflows.

What to include:

- Require beads for specific workflows.
- Define bead naming conventions and dependency rules.
- Define when to sync beads and commit changes.

Example content:

```md
# Project beads instructions

## General rules
- Use bd for all task tracking; do not use markdown TODOs.
- Use priorities 0-4 or P0-P4.
- Link discovered work with `discovered-from` dependencies.
- Run `bd sync --from-main` before ending a session.

## Shortcut: implement-spec
- Track all work with beads.
- If bd is not set up, run setup before starting.
- Ensure spec beads exist; create them using the new implementation beads workflow.

## Shortcut: new-implementation-beads
- Confirm the plan spec before creating beads.
- Create a top-level bead that references the spec.
- Plan the implementation as sub-beads with explicit dependencies.
- Ask for review before starting implementation.

## Shortcut: implement-beads
- Implement highest-priority beads first.
- Link each bead to the relevant spec or umbrella bead.
- Follow the precommit workflow and sync beads after each bead.
- Report any bead you could not resolve.

## Shortcut: update-specs-status
- Create a top-level "Spec: <title>" bead for each active spec.
- Add sub-beads for phases without the "Spec:" prefix.
- Update bead status to match current progress, then sync.

## Shortcut: cleanup-all
- Create beads for each cleanup task with a "Cleanup: " prefix.
- Add a note to run the standard tests before closing.

## Shortcut: review-pr-and-fix-with-beads
- Create a bead for the PR review and sub-beads for each issue.
- Ensure specs and docs are in sync before fixing.
- Fix beads, run tests, and update the PR.

## Shortcut: review-pr
- If fixing issues, create beads for all review items before coding.

## Shortcut: create-pr-simple / create-pr-with-validation-plan
- Update and sync beads before completing the PR workflow.
```
