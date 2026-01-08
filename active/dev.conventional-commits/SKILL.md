---
name: dev.conventional-commits
description: Explain and apply the Conventional Commits specification for commit messages, including required format, types/scopes, breaking change notation, and examples. Use when asked to draft, validate, or review commit messages or when a repo wants Conventional Commits adoption.
---

# Conventional Commits Guide

## Core format

Use this structure:

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- **type**: required; categorize the change.
- **scope**: optional; parenthesized area of the codebase.
- **!**: optional; mark a breaking change in the header.
- **description**: required; short, imperative summary.
- **body**: optional; longer explanation, wrap at ~72 chars.
- **footer**: optional; metadata and breaking-change notes.

## Types

Use `feat` and `fix` at minimum:

- `feat`: new feature (minor version bump)
- `fix`: bug fix (patch version bump)

Common additional types (only use if the repo allows):

- `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`

## Breaking changes

Mark breaking changes in one of two ways:

1. Add `!` after type/scope:
   - `feat!: drop Node 16 support`
2. Add a footer:
   - `BREAKING CHANGE: remove legacy auth endpoints`

Breaking changes imply a major version bump.

## Reverts

Use the conventional format:

```
revert: <summary of reverted commit>

This reverts commit <hash>.
```

## Examples

```
feat(parser): add support for markdown tables
```

```
fix: handle empty config file
```

```
feat!: replace legacy auth flow

BREAKING CHANGE: legacy auth endpoints removed
```

```
docs(readme): add migration notes
```

## Usage checklist

1. Identify the change intent (feature, fix, docs, refactor, etc.).
2. Decide whether a scope adds clarity; omit if it does not.
3. Write a concise, imperative description.
4. Add a body if you need rationale, tradeoffs, or migration notes.
5. Add `!` or `BREAKING CHANGE:` when the change is breaking.
