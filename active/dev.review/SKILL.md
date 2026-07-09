---
name: dev.review
description: Review code, docs, specs, architecture, UX, or design docs.
dependencies:
- dev.shortcuts
- sc
- specy
---

# dev.review

## Workflow

1. Identify the review type from the user's request and artifact.
   - Examples: code, docs, design-doc, spec, architecture, ux, skills, integrator, deslop, dead-code.
   - If ambiguous, ask one clarifying question before reviewing.
2. Load the matching workflow from `./references/workflow-[review-type].md`.
   - If the workflow file does not exist, ask the user for the prompt to add and pause the review.
   - For skills reviews, use the sibling dependency at `../sc/SKILL.md` for the local skill-authoring contract.
   - For docs reviews, use `./references/workflow-docs.md`; when reviewing OpenClaw docs and `$openclaw-docs` is available, apply its guidance as domain-specific context.
   - For `integrator`, default input artifacts are outputs from `ag-learn` and adjacent retrospectives.
   - For code reviews that require flow docs, use the sibling dependency at `../specy/SKILL.md`.
3. Route every top-level review request through the `trigger:loop` shortcut from `dev.shortcuts`.
   - If the user request already contains `trigger:...`, resolve it through `dev.shortcuts`.
   - If no shortcut trigger is present, invoke `trigger:loop` with the resolved review instruction, for example `trigger:loop review the current diff with $dev.review`.
   - Give the loop reviewer the review type, workflow file, artifact paths, current diff, and review scope.
   - When this skill is already running inside a `trigger:loop` reviewer pass, apply the workflow directly to the material and produce the review instead of nesting another loop.
4. For PR or CI-backed review loops, keep going until the remote exit condition is met.
   - Completion is remote-state based, not patch based: current head SHA is known, relevant CI is green, unresolved non-outdated review threads are zero, and actionable comments are addressed or explicitly routed to the user.
   - Before saying the loop is finished, run a final PR gate query and report head SHA, failing/pending check count, unresolved thread count, and actionable comment count.
   - If any required check is failed/pending or any actionable review item remains, the loop is not finished; continue fixing or report the exact blocker.

## Output

- Lead with findings ordered by severity (blocker/major/minor) or by impact if severity is unclear.
- Prefer concrete, actionable feedback over generic commentary.
- Call out assumptions, risks, and unclear ownership/abstractions.
- Propose simplifications when possible.
- Keep the review concise; avoid restating large sections of the input.

## Workflows

- `./references/workflow-code.md` for code review.
- `./references/workflow-docs.md` for developer documentation, user guides, API references, CLI references, quickstarts, READMEs, and troubleshooting docs.
- `./references/workflow-design-doc.md` for design doc review.
- `./references/workflow-spec.md` for product, implementation, or test spec review.
- `./references/workflow-architecture.md` for architecture and system-boundary review.
- `./references/workflow-ux.md` for UX review.
- `./references/workflow-skills.md` for reviewing `SKILL.md` files and bundled skill resources.
- `./references/workflow-integrator.md` for integrating learnings into skill/code/project changes.
- `./references/workflow-deslop.md` for anti-slop code review focused on excess complexity, patch size, and unnecessary helper extraction.
- `./references/workflow-dead-code.md` for dead-code review that accounts for every new class, function, method, variable, constant, option, config field, and other named artifact introduced by a PR.
