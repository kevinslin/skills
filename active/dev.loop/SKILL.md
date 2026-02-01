---
name: dev.loop
description: Drive a development task end-to-end from a user-stated goal through planning, execution, verification, and cleanup. Use when the user asks to run a devloop,  drive a task to completion, or wants a plan-execute-verify workflow with phased commits and CI verification. Also use if user asks to invoke any individual phase of the devloop (eg. cleanup)
dependencies: [dev.shortcuts, dev.exec-plan]
---

# Dev Loop

## Setup
Do this only once per repo.
Ensure that *-progress.md and *-learnings.md are added to gitignore in repo

## Usage
User will ask you to run dev.loop. Go through each phase under Workflow phases.

## Workflow Phases

### 1. Goal
- Require the user to state the goal

### 2. Plan
- Invoke the `dev.exec-plan` skill to create the execution plan.
- Bias toward answering plan questions yourself; only ask the user when blocked.
- Ensure the plan includes explicit tests (prefer integration tests).
- Capture the plan prefix from the plan filename: `{YYYY-MM-DD}-{title-in-kebab-case}`.

### 3. Execute
- Create a new branch for implementation. If user explicitly asks for worktree, create worktree. If a plan branch exists, branch off it to keep the plan commit(s).
- Follow the plan steps in order and check off each task as it is completed in the plan file.
- For each phase or milestone, run `@shortcut:precommit-process.md` then `@shortcut:commit-code.md` to commit that phase separately.
- **Always commit after each phase** (do not wait for user prompting). If precommit fails, fix issues and re-run before committing. If no precommit script exists, run the plan’s tests then commit.
- Maintain progress artifacts next to the plan:
  - `{prefix}-progress.md` for status updates, decisions, and blockers.
  - `{prefix}-learnings.md` for mistakes, lessons, and adjustments.

### 4. Polish
- If there is user facing documentation like README.md, ARCHITECTURE.md or the like, make sure to update it

### 5. Verify
- Run the tests specified in the plan and ensure they pass.
- After tests pass, make sure everything is commited. `trigger:push-pr`
- Verify CI for the pushed branch is green. `trigger:check-ci`
- Address review feedback from coding agents; apply fixes, re-run tests, push, and re-check CI.
- Notify the user when the work is ready.

### 6. Cleanup (user-requested only)
invoke:cleanup

## Usage
Users can invoke all steps of the workflow by asking for "devloop" (eg. use devloop to do X...)
In addition, users can also invoke each individual phase of a devloop by referring to it (eg. re-run the "verify" phase)

## Phase Overrides
Users can substitute any phase in the dev loop by mentioning they would like to override a particular phase with another set of instrctions. 

Example:
```
## Dev Loop Overrides
Override the following phases of the devloop

### Goal
Use dev.prd to create the goal

### Verify
Make sure that the acceptance criteria from dev.prd have been carried out
```
