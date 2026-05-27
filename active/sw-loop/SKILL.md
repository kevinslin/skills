---
name: sw-loop
description: Run explicitly requested swarm workflows for feature delivery.
dependencies:
- dev.loop
- dev.review
- dev.shortcuts
- mem
- schemas
- specy
- sw-ctrl
---

# Sw Loop

## Overview

Use this skill to run multi-agent feature work as a controlled swarm. Keep orchestration
disciplined: define the critical path, delegate bounded sidecars, integrate results
centrally, and do not let review or verification turn into unowned follow-up.

Treat the active milestone stack as sticky session context. Once a thread has an approved
bundle, keep that bundle in the thread state and only restate it when the stack or phase
changes.

## Entry Gate

1. Restate the goal, required deliverable, and completion condition.
2. Confirm whether the user wants full execution or only planning/review.
3. Stop after the spec-and-review phase when either of these is true:
   - ambiguity remains that affects implementation shape
   - the user asked to review the plan before coding
4. Prefer `$dev.loop` alone for simple single-threaded work. Use this skill only
   when multiple agents materially help.

## Checklist Gate

- Create a swarm checklist before starting the loop.
- Before writing any durable spec, checklist, flow doc, proof, review artifact, runbook, or long-lived project note, invoke `$mem` to resolve the intended base, root, schemas, and file rules. Do this by artifact intent, not by path shape: `$mem` roots may be anywhere and may not contain `.mem`.
- Store the checklist in the active spec folder when using `schemas` `ag-dir-v2`.
- Store the checklist in a temporary folder for all other workflows.
- Include every required gate: spec, spec review, implementation, review swarm,
  review fixes, verification, PR push, and any user-requested stopping condition.
- Translate explicit user completion requirements into checklist rows before starting.
  If the user names a live proof suite, negative cases, inline screenshots, CI green,
  a PR push, or a "do not stop until" condition, those are required rows, not optional
  follow-up notes.
- Check off items one by one as each gate is actually complete. Do not bulk-check
  items at the end.
- Do not consider the loop done until every checklist item is checked off.

## Swarm Layout

- Manager track: use `$sw-ctrl spec` to own intake, decomposition, delegation, monitoring,
  and integration.
- Spec track: use `$specy` to create a feature spec with milestones, risks, and
  explicit verification targets.
- Pre-implementation review: use `$dev.review` to critique the spec and apply straightforward
  spec improvements before coding.
- Implementation track: use the `cody` subagent (if available) for writing code, with `$dev.loop`
  owning the approved plan, phase gates, and integration.
- Post-implementation review swarm in parallel: trigger:loop `$dev.review` passes for
  code review, slop, documentation review, and dead code cleanup
- Verification track: run the verify phase of `$dev.loop` in a separate subagent
  after review fixes land.
- PR push track: after verification succeeds, run `trigger:push-pr` as the final
  delivery step unless the user explicitly said not to push.

## Workflow

### 1. Orchestrate

- Adopt the `$sw-ctrl` manager role immediately.
- Identify the critical path and keep the immediate blocker local.
- Delegate only sidecar work that is concrete, bounded, and non-overlapping.
- Keep a short session header for the current milestone: goal, active skill bundle,
  current phase, and unresolved blockers. Reuse it across turns instead of re-announcing
  the full bundle each time.

### 2. Plan and Gate

- Use `$specy` to create a feature spec first unless one already exists. If the spec is durable project memory, route the artifact root through `$mem` before creating or updating the spec folder.
- Run trigger:loop `$dev.review` against the spec
- Stop and return the spec to the user when ambiguity remains or the user asked
  to review the plan before implementation.

### 3. Implement

- Use the `cody` subagent for code-writing work. Give it the approved plan,
  explicit file/module ownership, expected tests, and the relevant `$dev.loop`
  phase context.
- Keep `$dev.loop` as the implementation workflow owner for plan execution,
  integration, verification planning, cleanup, and delivery gates.
- Keep ownership clear when delegating code changes. Assign files or modules and
  remind subagents they are not alone in the codebase.
- Integrate changes centrally instead of letting multiple agents edit the same surface
  opportunistically.
- If the approved bundle has not changed, continue from the existing session context
  rather than re-describing the same orchestration stack.

### 4. Review Swarm

trigger:loop `$dev.review` subagents with disjoint scopes:

1. Regular code review: find correctness issues, regressions, missing tests, and risky abstractions.
2. Documentation review: find README, flow docs, design docs, specs, or other docs that should change because of the implementation.
3. Dead code review: find obsolete code paths, compatibility shims, stale state, unused functions, or docs that can now be deleted.

Require each reviewer to return concrete findings with file references and proposed actions.

If a proposed fix is straightforward and does not require user input, apply it in
the subagent or integrate it locally. If the fix changes product direction, policy,
or unclear ownership, bubble it up for human review instead of guessing.

### 5. Verify

- After review fixes land, spawn a separate subagent to run only the verify phase
  of `$dev.loop`.
- Require that verification covers the plan tests plus any checks added because of
  review findings.
- For live approval/channel suites, require the verifier to report each requested
  scenario row separately as passed, blocked, or not run, with the artifact or
  screenshot path for that row when visual proof was requested.
- Do not summarize a multi-row suite as complete from one positive scenario, unit
  tests, or synthetic debug helpers when the user requested live end-to-end proof.
- Do not treat verification as implicit. It is a dedicated track with its own owner.

### 6. Push PR

- After verification succeeds and review fixes are committed, run `trigger:push-pr`.
- Treat PR push as required for full execution unless the user explicitly requested
  planning/review only or explicitly said not to push.
- Include the PR URL in the final handoff. If push or PR creation fails, report
  the exact failure and treat the swarm run as incomplete.
- Write a flow doc for the implementation. Store it in the `$mem`-resolved active spec folder when using `schemas` `ag-dir-v2`, and report the selected base plus concrete path in the handoff.
- Kick of $babysit-pr after the PR is pushed
- Create a flow doc that goes over the primary logic path that this pr exercises using $specy skill
- $slack-notify me with alert once pr is green

## Manager Rules

- Do not send multiple agents after the same unresolved question.
- Do not wait idly when a sidecar can run in parallel with local work.
- Do not trust raw review output without integration and judgment.
- Close stale agents after their results are integrated or discarded.
- Keep user updates focused on what is local, what is delegated, and what is blocking.

## Completion

Only finish when the spec, implementation, review follow-up, verify track, and
PR push are all resolved, or when the ambiguity/plan-review gate explicitly
requires stopping for user input.
