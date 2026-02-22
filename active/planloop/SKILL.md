---
name: planloop
description: Run a four-stage design workflow (`design` to `refine design` to `specs` to `refine spec`) for technical projects that need a design doc plus milestone execution specs under a user-provided `%DOCS_ROOT`. Use when a user asks to create/refine migration or architecture docs and wants concrete implementation plans via `$dev.research`, `$dev.review`, and `$dev.research`.
---

# Planloop

## Required Inputs

- Require `goal`.
- Require `%DOCS_ROOT` (ask once if missing).
- Capture optional initial steps, constraints, non-goals, milestones, and rollout expectations.
- Derive `design-title` from user intent; confirm only if ambiguous.
- Use `$dev.research` as the research dependency (if user says `dev.reseearch`, treat it as a typo).

## Stage 1: Design

1. Ask clarifying questions until scope and success criteria are concrete.
2. Use `$dev.research` to read relevant existing docs and flows.
3. Capture critical state lifecycle assumptions for key values (`init -> snapshot -> consume`) and note where each boundary occurs.
4. Create initial design doc at `%DOCS_ROOT/specs/{design-title}/design.md` using `$dev.research`.
5. Include at minimum:
   - problem/context
   - goals and non-goals
   - proposed architecture and control/config model
   - rollout plan and verification signals
   - risks and open questions
   - milestone breakdown
6. Move directly to Stage 2.

## Stage 2: Refine Design

1. Critically review the design doc with `$dev.review`.
2. List issues by severity (ambiguity, risk, missing behavior, missing verification).
3. Resolve issues directly in `design.md`.
4. Investigate unclear items using repository evidence; remove avoidable ambiguity.
5. Verify or eliminate Stage 1 lifecycle assumptions with repository evidence before finalizing design/spec decomposition.
6. Pause here and ask user for input before proceeding

## Stage 3: Specs

1. For each milestone, use $dev.research to create a feature spec
2. Save each spec to `%DOCS_ROOT/specs/{design-title}/spec-{num}-{milestone}.md`.
3. Ensure each milestone ships significant, verifiable functionality.
4. Require each spec to cover:
   - objective and scope
   - implementation plan
   - validation and rollout
   - dependencies and risks

## Stage 4: Refine Specs

1. Refine each spec for execution readiness.
2. Add a `Required Pre-Read` section linking related design/flow/spec docs and key code entrypoints.
3. Investigate and resolve ambiguity/risk before finalizing each spec.
4. Create new flow docs using $dev.research for complex behavior when existing docs are insufficient, then link them from specs.
5. Keep naming, toggles, and acceptance criteria consistent across all specs.

## Output Contract

- Design doc path: `%DOCS_ROOT/specs/{design-title}/design.md`
- Spec path pattern: `%DOCS_ROOT/specs/{design-title}/spec-{num}-{milestone}.md`
- Use kebab-case for `{milestone}` in filenames.
