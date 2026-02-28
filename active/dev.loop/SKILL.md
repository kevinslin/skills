---
name: dev.loop
description: Drive a development task end-to-end from a user-stated goal through planning, context gathering, execution, verification. Use when the user asks to run a devloop, drive a task to completion, or wants a plan-gather-execute-verify workflow with phased commits and CI verification. Also use if user asks to invoke any individual phase of the devloop
dependencies: [dev.shortcuts, dev.research]
---

# Dev Loop

## Setup
Do this only once per repo.
Ensure the `.agents/` folder is ignored in the repo (for example, add `.agents/` to `.gitignore`)

## Usage
User will ask you to run dev.loop. This is usually with either an existing design spec or a stated goal.  

If user gives you an existing spec - go straight to step 2 (Gather Context). Otherwise, start at step 1 (Plan).

In addition to running the whole dev.loop, users can also invoke an individual phase of the dev.loop by referring to it (eg. re-run the "verify" phase)

## Workflow Phases

### 1. Plan
- Use $dev.research to create a feature spec 
- Bias toward answering plan questions yourself; only ask the user when blocked or when user tells you to check with them.
- Ensure the plan includes explicit tests (prefer integration tests).
- Capture the plan prefix from the plan filename: `{YYYY-MM-DD}-{title-in-kebab-case}`.
- use $dev.research to create validation spec against the feature spec

### 2. Gather Context
- Given the spec/plan, identify remaining ambiguities, gaps, and unresolved assumptions.
- Explicitly answer:
  - What ambiguities or gaps are still left?
  - Are there missing flow docs that, once created, would resolve those ambiguities?
- If there are questions for the user, ask them before continuing.
- If flow docs are missing, propose which flow docs should be generated (title, scope, and why each one resolves a specific gap).
- Summarize this phase in three sections:
  - `Ambiguities/Gaps`
  - `Questions for User`
  - `Proposed Flow Docs`

### 3. Execute
- Create a new branch for implementation unless given explicit instructions not to. If user explicitly asks for worktree, create worktree. If a plan branch exists, branch off it to keep the plan commit(s).
- Follow the plan steps in order and check off each task as it is completed in the plan file.
- Use red/green TDD.
- For each phase or milestone, run `@shortcut:precommit-process.md` then `@shortcut:commit-code.md` to commit that phase separately.
- **Always commit after each phase** (do not wait for user prompting). If precommit fails, fix issues and re-run before committing. If no precommit script exists, run the plan’s tests then commit.
- Maintain progress artifacts under `%ROOT_DIR/.agents/progress` (create the folder if it does not exist):
  - `%ROOT_DIR/.agents/progress/{prefix}-progress.md` for status updates, decisions, and blockers.
  - `%ROOT_DIR/.agents/progress/{prefix}-learnings.md` for mistakes, lessons, and adjustments.

### 4. Polish
- If there is user facing documentation like README.md, ARCHITECTURE.md or the like, make sure to update it

### 5. Verify
- Run the tests specified in the plan and ensure they pass.
- Check features against validation plan and ensure existing tests pass
- After tests pass, always push at this stage by default unless overwritten elsewhere.
- Default push behavior: `trigger:push-pr`
- Assume `trigger:push-pr` will commit staged code before pushing.
- If `trigger:push-pr` creates or updates a PR, make sure the PR body includes manual testing steps that need to be done with checkboxes.
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
