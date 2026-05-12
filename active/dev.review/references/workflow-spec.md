# Spec Review Workflow

Use this workflow to review a product, implementation, or test spec for
implementation readiness. The review should prove whether another agent can
execute the spec without rediscovering major contracts or making unsafe
assumptions.

## Core Rubric

Review against these criteria:

- Correct: grounded in the current codebase, docs, runtime behavior, upstream
  contracts, or the user's stated goal.
- Complete within scope: covers the happy path, important variants, failure
  modes, ownership, rollout, and validation implied by the goal.
- Executable: names concrete files, APIs, commands, artifacts, state changes,
  and acceptance checks.
- Simple: uses the smallest sufficient model, milestone plan, and data contract.
- Verifiable: includes focused automated checks and, when needed, live or
  integration proof that exercises the real behavior.

Correctness is a hard gate. A spec that is detailed but based on stale source,
wrong contracts, or invented behavior is not ready.

## Steps

1. Establish evidence and scope.
   - Identify the stated goal, non-goals, target users/operators, and affected
     surfaces.
   - Verify source-backed claims against the current implementation, docs,
     schemas, generated types, command output, tests, or upstream contracts when
     available.
   - Flag hidden scope, vague outcomes, missing success criteria, and unverified
     claims presented as facts.
2. Check target behavior.
   - Require clear before/after behavior, state transitions, permissions,
     prompts, error handling, edge cases, and user-visible output.
   - For migrations or repair flows, require source state, target state,
     idempotency, skipped/ineligible cases, and fail-closed behavior.
3. Check data, API, and ownership contracts.
   - Review request/response shapes, persisted data, config, schemas, enums,
     reason codes, compatibility, observability, and ownership boundaries.
   - Identify duplicated facts, parallel status fields, semantic sentinels, and
     new abstractions that do not have a single canonical owner.
   - If the spec changes data/API/CLI/config/migration output, require an
     existing-contract snapshot or equivalent source-backed explanation before
     approving new output fields or types.
   - For dependency-backed behavior, require the spec to name the dependency
     contract being relied on instead of guessing defaults or errors.
4. Check execution plan.
   - Confirm the implementation touchpoints are concrete and ordered.
   - For every new command, script, trigger, cache, background job, or generated
     artifact, require who invokes it, when, from what working directory or
     runtime, what it reads/writes, and how failure is surfaced.
   - Call out plans that require broad rewrites, unrelated refactors, or
     ownership changes not justified by the goal.
5. Check validation and rollout.
   - Require focused unit/integration tests at the behavior boundary, plus
     broader changed-surface checks when shared contracts change.
   - Verify the acceptance criteria are observable and map to the target
     behavior, not only internal helper shapes.
   - Review feature flags, backfills, monitoring, rollback, data repair,
     migration safety, and proof artifacts when relevant.
6. Look for simplification.
   - Propose narrower milestones, smaller contracts, deletion of unnecessary
     concepts, and use of existing seams before adding new framework code.
   - Prefer one canonical machine-readable field for a fact; derive display,
     reports, and warnings at the boundary that emits them.
   - For specs that add fields, types, statuses, reasons, or config, require a
     consumer for each new durable concept. Treat a new model with no named
     consumer, or a model that stores derived status already available from raw
     facts, as a major finding unless the spec explains why it is needed.

## Contract and Complexity Gate

Apply this gate when the spec proposes new data shape, API output, CLI output,
config, migration output, persistence, enums, statuses, reasons, or state
machines.

- Existing contract: does the spec name the current owner/source of truth,
  shape, and consumers before proposing changes?
- Decision table: if multiple facts drive behavior, does the spec map input
  facts to target outputs without inventing intermediate states?
- Canonical field: is the machine-readable outcome represented in one place?
- Raw facts vs derived values: does the spec avoid storing derived status unless
  a named consumer needs it?
- Success state: is success represented once, rather than as both a boolean and
  a separate status?
- Investigation handoff: if the spec came from an investigation, did it translate
  evidence into an implementation contract instead of copying diagnostic
  vocabulary into the design?

Do not demand these sections for small specs that do not change contracts. For
small changes, a sentence that names the reused contract is enough.

## Severity Guidance

- `blocker`: the spec cannot be implemented safely because core behavior,
  source truth, ownership, or execution contracts are missing or wrong.
- `major`: important edge cases, failure handling, validation, rollout,
  compatibility, or data/API contracts are incomplete.
- `minor`: the spec is implementable but includes avoidable ambiguity,
  unnecessary complexity, weak proof mapping, or maintainability risk.
- `nit`: local wording or structure issues with no meaningful execution risk.

Treat missing execution contracts, validation plans, rollback paths, or
source-backed evidence as major findings unless the scope is explicitly
exploratory.

## Output

- Lead with findings ordered by severity.
- For each finding, cite the exact section or line when possible, name the
  failed rubric criterion, explain the implementation risk, and give the
  smallest concrete fix.
- Include a short "Ready State" verdict after findings: ready, ready after
  minor edits, or not ready.
- Include a short "Verification Reviewed" note naming the code, docs, commands,
  tests, or runtime evidence checked and what remains unverified.
- If there are no findings, say so clearly and still name any residual proof
  gaps.
