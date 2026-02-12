---
name: dev.loop
description: Drive a development task end-to-end from a user-stated goal through planning, execution, verification. Use when the user asks to run a devloop,  drive a task to completion, or wants a plan-execute-verify workflow with phased commits and CI verification. Also use if user asks to invoke any individual phase of the devloop
dependencies: [dev.shortcuts, dev.research]
---

# Dev Loop

## Setup
Do this only once per repo.
Ensure that *-progress.md and *-learnings.md are added to gitignore in repo

## Usage
User will ask you to run dev.loop. This is usually with either an existing design spec or a stated goal. 
Go through each phase under Workflow phases.
In addition to running the whole dev.loop, users can also invoke an individual phase of the dev.loop by referring to it (eg. re-run the "verify" phase)

## Workflow Phases

### 1. Plan
- Invoke the `dev.research` skill and use the `Feature Spec` document type to create the execution plan.
- Bias toward answering plan questions yourself; only ask the user when blocked or when user tells you to check with them.
- Ensure the plan includes explicit tests (prefer integration tests).
- Capture the plan prefix from the plan filename: `{YYYY-MM-DD}-{title-in-kebab-case}`.
- use $dev.research to create a validation spec based on the features

### 2. Execute
- Create a new branch for implementation unless given explicit instructions not to. If user explicitly asks for worktree, create worktree. If a plan branch exists, branch off it to keep the plan commit(s).
- Follow the plan steps in order and check off each task as it is completed in the plan file.
- For each phase or milestone, run `@shortcut:precommit-process.md` then `@shortcut:commit-code.md` to commit that phase separately.
- **Always commit after each phase** (do not wait for user prompting). If precommit fails, fix issues and re-run before committing. If no precommit script exists, run the plan’s tests then commit.
- Maintain progress artifacts next to the plan:
  - `{prefix}-progress.md` for status updates, decisions, and blockers.
  - `{prefix}-learnings.md` for mistakes, lessons, and adjustments.

### 3. Polish
- If there is user facing documentation like README.md, ARCHITECTURE.md or the like, make sure to update it

### 4. Verify
- Run the tests specified in the plan and ensure they pass.
- Check features against validation plan and ensure existing tests pass
- After tests pass, make sure everything is committed. `trigger:push-pr` - in PR body, make sure to add manual testing steps that need to be done with checkboxes
- Verify CI for the pushed branch is green. `trigger:check-ci`
- Use $dev.review skill to do a critical code review of changes. Add findings as comments to the PR
- Address review feedback from coding agents and humans; apply fixes, re-run tests, push, and re-check CI.
- Notify the user when the work is ready.

## Important Reminders
- unless you require user input, don't stop until you finish EVERY phase of the dev.loop

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
