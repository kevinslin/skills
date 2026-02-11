# Feature Design Workflow

## Use When

- Proposing or migrating a user-facing feature within an existing system
- Defining concrete implementation tasks across multiple codepaths
- Capturing feature-gate and toggle behavior changes
- Planning rollout, rollback, and verification before implementation starts

## Template

- `@references/feature-design-doc/template.md`

## Output Location

- `$ROOT_DIR/specs/{YYYY-MM}-{feature-slug}/design.md`

## Instructions

1. Review existing docs under `$ROOT_DIR/specs/` and related flow docs under `$ROOT_DIR/flows/` to align with local conventions and known behavior.
2. Create the project folder at `$ROOT_DIR/specs/{YYYY-MM}-{feature-slug}/` if it does not exist.
3. Copy `@references/feature-design-doc/template.md` to `$ROOT_DIR/specs/{YYYY-MM}-{feature-slug}/design.md`.
4. Fill in the doc using source-backed details from code and docs (not guesses).
5. If migration/parity is involved, add a dedicated parity audit section with explicit file-level follow-ups.

## Required for Implementation Handoff

- Include a `Requirements -> Design Mapping` table with one row per requirement.
- Include a `Detailed File Plan` listing concrete files and expected changes.
- Include `Planning & Milestones` where tasks are grouped by milestone.
- Each milestone must ship a significant and verifiable unit of functionality.
- Each milestone must include `Shipped functionality`, `Tasks`, and `Verification`.
- Include `Rollout Plan` with progressive phases and explicit `Rollback`.
- Include `Testing Plan` that covers unit, integration, and manual validation.
