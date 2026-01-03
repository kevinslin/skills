---
name: dev.speculate
description: Always use this skill to provide context on the codebase. Automatically initializes and references the Speculate documentation framework (coding rules, shortcuts, templates, and project specs) to ensure agents understand project structure, development workflows, and coding standards. Use for every task to maintain context and code quality.
---

# Project Understanding (Speculate Framework)

This skill provides comprehensive project context through the Speculate documentation framework. It ensures agents always have access to coding rules, development workflows, and project structure.

## Automatic Initialization

**IMPORTANT**: Before working on any task, check if the Speculate docs are initialized.
Look for `docs/docs-overview.md` in the current project.
If it doesn't exist, initialize now using the install script

```bash
node ~/.claude/skills/dev.speculate/scripts/install.js
```

This copies the complete Speculate documentation structure to `docs/`:
- `docs/docs-overview.md` - Overview of all documentation
- `docs/development.md` - Project development workflows (you'll need to customize this)
- `docs/general/` - Cross-project rules, shortcuts, templates
- `docs/project/` - Project-specific specs, architecture, research

## Reading Project Context

**Always read `docs/docs-overview.md` first** before starting any task.

The docs-overview provides:
- Navigation to all coding rules (TypeScript, Python, testing, etc.)
- Available shortcuts for common workflows
- Project structure and documentation layout
- Links to project-specific specs and architecture

### Path Convention

**IMPORTANT**: Throughout the Speculate documentation, paths prefixed with `@` indicate paths from the project root.

For example:
- `@docs/general/agent-rules/python-rules.md` → `docs/general/agent-rules/python-rules.md`
- `@shortcut:implement-spec.md` → `docs/general/agent-shortcuts/shortcut:implement-spec.md`

When you see these `@docs/...` or `@shortcut:...` references in the documentation, resolve them relative to the project root directory.

### Reading Strategy

1. **Start with overview**: Read `docs/docs-overview.md` to understand available documentation
2. **Check development setup**: Read `docs/development.md` for build/test/lint workflows
3. **Load relevant rules**: Based on the task, read specific rules from `docs/general/agent-rules/`
4. **Check active specs**: Look in `docs/project/specs/active/` for related work
5. **Use shortcuts**: Reference shortcuts from `docs/general/agent-shortcuts/` for structured workflows

## Key Documentation Files

After initialization, these files are available:

**Essential Docs:**
- `docs/docs-overview.md` - Start here! Overview of all documentation
- `docs/development.md` - Project setup, build, test, lint workflows

**General Rules** (in `docs/general/agent-rules/`):
- `general-coding-rules.md` - Universal coding standards
- `general-testing-rules.md` - Testing best practices
- `typescript-rules.md` - TypeScript-specific rules
- `python-rules.md` - Python-specific rules
- `convex-rules.md` - Convex database rules
- And more language/framework specific rules

**Shortcuts** (in `docs/general/agent-shortcuts/`):
- `shortcut:new-plan-spec.md` - Create feature planning document
- `shortcut:implement-spec.md` - Implement from specification
- `shortcut:commit-code.md` - Pre-commit validation workflow
- `shortcut:create-pr-*.md` - Pull request workflows
- And more task-specific shortcuts

**Project Docs** (in `docs/project/`):
- `specs/active/` - Current feature specifications
- `specs/done/` - Completed specs (historical reference)
- `architecture/` - System design documentation
- `flows/` - System flows documentation
- `research/` - Technical research notes

A note on flows. A flow is a like a mini architecture doc that describes the lifecycle of a behavior in the code base. For example, bootstraping a system could be a flow. The lifecylce of a particular API request could be another. Flows are meant to help llms and humans quickly recapture context on a particular part of the code. 

## Updating Documentation

To sync with the latest Speculate documentation:

```bash
node ~/.claude/skills/dev.speculate/scripts/update.js
```

This updates the `docs/general/` folder while preserving:
- Your `docs/development.md`
- Your project-specific docs in `docs/project/`
- Any local customizations

## Workflow Integration

### Before Every Task

1. Check if docs are initialized (run install.js if needed)
2. Read `docs/docs-overview.md` for context
3. Read `docs/development.md` for build/test workflows
4. Identify relevant rules and shortcuts for the task

### During Development

- Follow coding rules from `docs/general/agent-rules/`
- Use shortcuts for structured workflows (planning, implementation, commits, PRs)
- Create specs in `docs/project/specs/active/` for new features
- Document architecture decisions in `docs/project/architecture/`
- Document new flows in `docs/project/flows/`

### For Spec-Driven Development

Use the structured workflow:
1. **Plan**: Use `@shortcut:new-plan-spec.md` to create a feature plan
2. **Design**: Use `@shortcut:new-implementation-spec.md` for implementation details
3. **Implement**: Follow `@shortcut:implement-spec.md` with TDD approach
4. **Validate**: Use `@shortcut:precommit-process.md` before committing
5. **Commit**: Use `@shortcut:commit-code.md` for structured commits
6. **PR**: Use `@shortcut:create-pr-*.md` for pull requests

## Customizing for Your Project

After initialization:

1. **Edit `docs/development.md`**: Update with your project's specific:
   - Build commands
   - Test commands
   - Lint/format commands
   - Deployment workflows

2. **Add project specs**: Create specifications in `docs/project/specs/active/`

3. **Document architecture**: Add design docs to `docs/project/architecture/`

4. **Research notes**: Store technical investigations in `docs/project/research/`

## Benefits

This framework ensures:
- **Consistent quality** - Agents follow defined coding standards
- **Structured workflows** - Clear processes for planning, implementing, validating
- **Project context** - Agents understand your codebase and workflows
- **Sustainable code** - Avoid "slop code" through spec-driven development
- **Knowledge retention** - Specs and architecture docs preserve decisions

## Notes

- The install/update scripts preserve your customizations in `docs/development.md` and `docs/project/`
- If you don't have a `docs/development.md`, create one from the sample template
- The `docs/general/` folder gets updated when you run update.js
