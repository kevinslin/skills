---
name: dev.exec-plan
description: This skill should be used for development tasks that require detailed technical planning with persistent documentation. Use when the task involves architectural decisions, multi-phase implementation, external dependencies, or when the user explicitly requests an execution plan.
version: 2.0.0
---

# Execution Plan Skill

This skill creates structured, file-based execution plans for complex development tasks that benefit from persistent documentation and detailed technical planning.

## When to Use This Skill

Use this skill when:
- The task involves architectural or design decisions that should be documented
- Multiple implementation phases or milestones need tracking over extended periods
- External dependencies, APIs, or integrations require research and documentation
- The user explicitly requests a documented execution plan or project plan
- The task complexity warrants detailed technical specifications and decision rationale

**Do not use** for simple tasks better suited to TodoWrite (quick 3-5 step tasks without complex dependencies).

## Root Directory

All filepaths mentioned is relative to the $ROOT_DIR. Unless overridden elsewhere, the $ROOT_DIR is `./docs` (relative to the project root directorey)

## Creating the Execution Plan

### 1. Determine Plan Location

By default, the output of a plan should be in `$ROOT_DIR/specs/active`

### 2. Create Plan File and optionally, checkout a new branch

Create the plan using the template from `assets/plan-template.md` in the following location:
```
{plan-directory}/{YYYY-MM-DD}-{title-in-kebab-case}.md
```

Checkout a new branch with the following name: `dev/{YYYY-MM-DD}-{title-in-kebab-case}`. 

If user is asking for a worktree - checkout the branch in a worktree. Only do this if user explicitly asks for a new worktree. 

Example:
- plan: 2025-12-01-create-new-foo.md
- branch-name: `dev/2025-12-01-create-new-foo`

### 3. Populate the Plan

Use the template structure to create a comprehensive plan that includes:

For detailed guidance on creating effective plans, consult `references/effective-planning.md`.

**Goal** - Clear objective statement describing what will be accomplished

**Context** - Background information, constraints, and requirements
- Why this task is needed
- Current system state
- Key constraints or limitations

**Technical Approach** - High-level architectural or implementation strategy
- Design patterns or methodologies
- Integration points
- Important Context

**Steps** - Detailed implementation phases in logical order
- Break down into milestones or phases
- Include research, implementation, testing, and deployment steps
- Note dependencies between steps

**IMPORTANT**: Always specify tests. We prefer integration tests over unit tests whenever possible. 

**Important Context**

**Dependencies** - External resources, APIs, libraries, or tools needed
- Third-party services or integrations
- Required access or credentials
- Documentation references
- Additional context needed

**Risks & Mitigations** - Potential blockers and how to address them
- Technical risks
- Resource constraints
- Mitigation strategies

**Questions** - Open questions requiring clarification or research
- Unresolved technical decisions
- Areas needing user input
- Research tasks

### 4. Simplify

After creating the plan, think about whether you could simplify it further. Consult `DESIGN.md` file if it exists as well as last 5 commits to understand recent changes for context. If you identify ways that the plan can be made simpler, do the simplification. Add any simplifications done in the `# Notes` section of the execution plan.

### 5. Fill in gaps

For important context needed for this project - kick off scoped research tasks to fetch the context and fill it in under `Technical Approach` under `Important Context`

### 6. Review and Confirm

After creating the plan:
1. Present a summary of the plan to the user
2. Highlight any questions or decisions that need input
3. Wait for user confirmation before proceeding with implementation
4. Update the plan as new information emerges during execution

Note: if there are followup questions, check if user has answered it in the execution plan itself before re-prompting the user.

**IMPORTANT**: If the user asks you to implement without asking for input, then answer any outstanding questions yourself to the best of your judgement. Only ask the user for input if you are really stuck but otherwise, proceed with impementation.

### 7. User revision (optional)

If the user asks for additional details - write your response into the existing execution plan instead of responding in the conversation. 

### 8. Proceeding with the plan

When the user asks you to proceed with the plan, re-read it to check if anything has changed. Also make sure that all questions that were asked are answered by the user (user will have checked off the question box and added an answer as a bullet point below). If not, prompt the user for answers before proceeding.


## Best Practices

- Keep plans focused and actionable - avoid unnecessary verbosity
- Update the plan as decisions are made or scope changes
- Use the plan as a living document throughout the development process
- Reference specific sections when discussing progress or blockers
- For very complex plans, consider breaking into multiple related plan documents