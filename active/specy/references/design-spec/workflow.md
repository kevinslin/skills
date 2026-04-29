# Feature Design Workflow

## Use When

- Proposing or migrating a user-facing feature within an existing system
- Defining concrete implementation tasks across multiple codepaths
- Capturing feature-gate and toggle behavior changes
- Planning rollout, rollback, and verification before implementation starts

## Template

- `./references/design-spec/template.md`

## Output Location

- `$DOCS_ROOT/specs/{YYYY-MM-DD}-{feature-slug}.md`

## Instructions

1. Review existing docs under `$DOCS_ROOT/specs/`, archived specs under `$DOCS_ROOT/specs/.archive/`, and related flow docs under `$DOCS_ROOT/flows/` to align with local conventions and known behavior.
2. Choose a `{feature-slug}` that stays within the `{YYYY-MM-DD}-{topic}.md` filename format and includes a qualifier like `-design` when needed to avoid collisions.
3. Copy `./references/design-spec/template.md` to `$DOCS_ROOT/specs/{YYYY-MM-DD}-{feature-slug}.md`.
4. Fill in the doc using source-backed details from code and docs (not guesses).
5. If migration/parity is involved, add a dedicated parity audit section with explicit file-level follow-ups.
6. Keep in-progress specs under `$DOCS_ROOT/specs/`. When the spec is complete, move it to `$DOCS_ROOT/specs/.archive/` without renaming it.
7. Resolve the current agent session id via `dev.llm-session` and include it in the `## Changelog` entry before handoff.

## Required for Implementation Handoff

- Include a `Requirements -> Design Mapping` table with one row per requirement.
- Include a `Detailed File Plan` listing concrete files and expected changes.
- Include `Planning & Milestones` where tasks are grouped by milestone.
- Each milestone must ship a significant and verifiable unit of functionality.
- Each milestone must include `Shipped functionality`, `Tasks`, and `Verification`.
- Include `Rollout Plan` with progressive phases and explicit `Rollback`.
- Include `Testing Plan` that covers unit, integration, and manual validation.
