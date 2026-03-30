---
name: sw-ctrl
description: Manager-orchestrator skill for driving tasks to completion by breaking work into scoped subagent tasks, monitoring progress, unblocking stalled agents, and integrating results. Use when the user wants a supervising agent to coordinate docs, implementation, and learnings across multiple threads instead of doing all work in one rollout.
dependencies:
- specy
- dev.loop
- ag-learn
---

# sw-ctrl

## Overview

Use this skill when the user wants you to act as a manager agent: keep momentum, delegate concrete work to subagents, monitor for stalls or pathological behavior, and make sure the overall task actually lands.

This skill is most useful when the work naturally splits into multiple tracks, such as:

- multiple docs or flow docs for separate components
- implementation plus parallel review or CI watching
- code work plus follow-up learnings
- broad tasks where one agent would otherwise get overloaded

## Core Responsibilities

Your job is to:

1. classify the task and identify the critical path
2. decide what should stay local versus what should be delegated
3. spawn subagents with clear scope, ownership, and expected output
4. monitor progress and detect stalls, thrashing, or low-signal behavior early
5. intervene when agents get stuck
6. integrate results, verify the outcome, and close unused agents

## Skill Routing

Route work to the most relevant skill instead of solving every task from scratch:

- Docs, research artifacts, flow docs, design specs: use `$specy`
- End-to-end implementation work: use `$dev.loop`
- Retrospectives and reusable improvements: use `$ag-learn`

Mixed tasks should be split by surface area. For example:

- create missing flow docs with `$specy` while implementation planning continues elsewhere
- run `$dev.loop` for the main code path and queue `$ag-learn` after the task lands

## Manager Workflow

### 1. Intake

- Restate the goal in one sentence.
- Extract constraints, deliverables, and the actual completion condition.
- Identify whether the task is primarily `docs`, `implementation`, `learning`, or `mixed`.

### 2. Decompose

Break the task into:

- `critical path`: work that blocks the next important step
- `sidecars`: useful but non-blocking work that can run in parallel

Keep immediate blockers local when your next action depends on them right now. Delegate sidecars aggressively when they are concrete and independent.

### 3. Delegate

Each subagent task must be:

- concrete and bounded
- owned by one agent
- non-overlapping with other agents' write scope
- explicit about the deliverable you expect back

When delegating code changes, assign file or module ownership and remind the subagent that it is not alone in the codebase and must avoid reverting others' work.

Good delegation examples:

- one agent per flow doc or component when docs are independent
- one agent to draft a spec with `$specy` while another gathers codebase context
- one agent to watch CI while another performs review after a push

Bad delegation patterns:

- broad prompts like "figure this whole thing out"
- sending two agents after the same unresolved question
- delegating the urgent blocker that you need immediately for your own next step

### 4. Monitor

Do not just wait. Track whether each agent is producing meaningful signals such as:

- changed files
- citations to code paths or docs
- test output
- concrete findings
- a scoped recommendation or patch

Intervene early if you see:

- repeated status messages with no new artifact
- generic summaries that avoid specifics
- repeated retries on the same failed step
- scope drift beyond the assigned task
- duplicate work across agents
- long waits on a result that is now blocking the critical path

### 5. Recover From Stalls

Use this recovery order:

1. tighten the prompt and restate the exact deliverable
2. provide missing context or file ownership
3. split the task into smaller pieces
4. take the blocker locally if it is now on the critical path
5. close the stuck agent and respawn a fresh one with narrower scope

Treat these as pathological patterns and correct them quickly:

- thrashing on the same command or hypothesis
- silent waiting without artifact production
- speculative answers with weak evidence
- overlapping ownership that creates merge risk
- redoing work another agent already completed

### 6. Integrate

- Review returned work before trusting it.
- Merge only the useful parts.
- Resolve conflicts in direction, assumptions, or scope.
- Keep the user updated on progress, blockers, and any reroutes you make.

### 7. Finish

Before handoff, confirm:

- the critical path is complete
- sidecar results were integrated or intentionally discarded
- no required agent is still running
- stale or unnecessary agents were closed
- verification appropriate to the task was completed

## Parallelization Rules

Parallelize when all of the following are true:

1. the tasks are independent
2. the result is not needed for your immediate next local action
3. write scopes are disjoint or read-only
4. you can clearly evaluate the returned work

Good parallel examples:

- multiple `$specy` flow docs for separate components
- implementation plus read-only codebase exploration
- CI monitoring plus review after a branch is pushed

Do not parallelize tightly coupled implementation edits that will collide in the same files unless you have very clear ownership boundaries.

## Output Expectations

As the manager agent, your updates should make these things clear:

- what is being handled locally
- what was delegated
- which agents are blocked, healthy, or finished
- what changed in the plan because of new information

The final result should reflect managed execution, not just delegation. You are responsible for the overall outcome, even when subagents did most of the work.
