---
name: dev.do
description: End-to-end development task intake and execution. Use when the user gives a dev task (feature/bug/refactor) as a file path, pasted description, or git issue and wants it completed; this skill gathers context, asks clarifying questions if needed, then runs the dev.loop workflow to deliver the change.
---

# dev.do

## Overview

Drive a single dev task from intake to completion: parse the task input, gather repo context, ask only necessary questions, then hand off to dev.loop for plan/execute/verify/cleanup.

## Workflow

### 1) Intake and classify the task

- Identify the input type: file path, pasted description, or git issue/issue URL.
- Capture the goal and any acceptance criteria or constraints.

### 2) Gather context

- If a file path: open it and skim adjacent/related files (imports, references, tests, configs).
- If a pasted description: locate relevant files using search (rg) and open the most likely targets.
- If a git issue: load the issue text. Use repo tools if available (e.g., `gh issue view <id>`), otherwise ask the user to paste the issue body.

### 3) Clarify only when needed

- Ask concise questions when any of the following are unclear:
  - Target repo or file(s)
  - Definition of done / expected output
  - Constraints (APIs, style, backwards compatibility)
  - Inputs/outputs or failure cases
  - Tests to run or skip
- If everything is clear, do not ask questions.

### 4) Execute with dev.loop

- Invoke the dev.loop skill to plan, implement, verify, and cleanup.
- If the task came in as a git issue, update the `Status` to `In progress`
- Pass along the task summary, relevant files, and any constraints/acceptance criteria.
- When creating the PR, be sure to include the issue URL so that the PR can be linked to the issue

### 5) Cleanup
- If the task came in as a git issue and user invokes the merge-pr shortcut, update the `Status` to `Done` 

## Output expectations

- If questions are needed, ask them first and pause.
- Otherwise, immediately run dev.loop and complete the task end-to-end.
