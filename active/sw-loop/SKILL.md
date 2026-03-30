---
name: sw-loop
description: Swarm-based feature delivery workflow that coordinates a manager agent,
  spec work, implementation, review, cleanup, and verification across multiple subagents.
  Use when the user explicitly wants a swarm of agents, parallelized feature work,
  or a managed loop that should delegate orchestration to `$sw-ctrl`, create a feature
  spec with `$specy`, stop after planning when ambiguity remains or the user wants
  plan review, implement with `$dev.loop`, run parallel `$dev.review` passes for code/docs/dead-code
  follow-up, and finish verification in a separate subagent.
dependencies:
- dev.loop
- dev.review
- specy
- sw-ctrl
---

# Sw Loop

## Overview

Use this skill to run multi-agent feature work as a controlled swarm. Keep orchestration
disciplined: define the critical path, delegate bounded sidecars, integrate results
centrally, and do not let review or verification turn into unowned follow-up.

## Entry Gate

1. Restate the goal, required deliverable, and completion condition.
2. Confirm whether the user wants full execution or only planning/review.
3. Stop after the spec-and-review phase when either of these is true:
   - ambiguity remains that affects implementation shape
   - the user asked to review the plan before coding
4. Prefer `$dev.loop` alone for simple single-threaded work. Use this skill only
   when multiple agents materially help.

## Swarm Layout

- Manager track: use `$sw-ctrl` to own intake, decomposition, delegation, monitoring,
  and integration.
- Spec track: use `$specy` to create a feature spec with milestones, risks, and
  explicit verification targets.
- Pre-implementation review: use `$dev.review` to critique the spec and apply straightforward
  spec improvements before coding.
- Implementation track: use `$dev.loop` to execute the approved plan.
- Post-implementation review swarm: run three parallel `$dev.review` passes for
  code review, documentation review, and dead code cleanup.
- Verification track: run the verify phase of `$dev.loop` in a separate subagent
  after review fixes land.

## Workflow

### 1. Orchestrate

- Adopt the `$sw-ctrl` manager role immediately.
- Identify the critical path and keep the immediate blocker local.
- Delegate only sidecar work that is concrete, bounded, and non-overlapping.

### 2. Plan and Gate

- Use `$specy` to create a feature spec first.
- Run one `$dev.review` pass against the spec and incorporate straightforward fixes.
- Stop and return the spec to the user when ambiguity remains or the user asked
  to review the plan before implementation.

### 3. Implement

- Use `$dev.loop` to implement the approved plan.
- Keep ownership clear when delegating code changes. Assign files or modules and
  remind subagents they are not alone in the codebase.
- Integrate changes centrally instead of letting multiple agents edit the same surface
  opportunistically.

### 4. Review Swarm

Spawn multiple `$dev.review` subagents with disjoint scopes:

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
- Do not treat verification as implicit. It is a dedicated track with its own owner.

## Manager Rules

- Do not send multiple agents after the same unresolved question.
- Do not wait idly when a sidecar can run in parallel with local work.
- Do not trust raw review output without integration and judgment.
- Close stale agents after their results are integrated or discarded.
- Keep user updates focused on what is local, what is delegated, and what is blocking.

## Completion

Only finish when the spec, implementation, review follow-up, and verify track are
all resolved, or when the ambiguity/plan-review gate explicitly requires stopping
for user input.
