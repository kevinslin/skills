---
name: dev.bootstrap.typescript
description: Bootstrap or augment TypeScript projects. Use when asked to scaffold a new TypeScript project using the Copier template at /Users/kevinlin/code/copier-typescript-codex, or when asked to add a pre-commit hook that runs formatting and linting in an existing project.
---

# Dev.bootstrap.typescript

## Overview

Bootstrap new TypeScript projects from a local Copier template or add a pre-commit hook that runs linting and formatting for an existing project.

## Workflow

### 1. Pick the path

- New project: run `scripts/bootstrap_project.sh`
- Existing project: run `scripts/add_precommit.sh`

### 2. Bootstrap a new project

- Ensure `copier` is installed and `/Users/kevinlin/code/copier-typescript-codex` exists.
- Run `scripts/bootstrap_project.sh <target_dir> [copier args]`.
- Use `--data` to avoid interactive prompts when needed.

### 3. Post-bootstrap follow-up (new project)

- By default, `scripts/bootstrap_project.sh` runs these steps; pass `--skip-followup` (or `--no-followup`) to skip.
- If you ran Copier directly, from `target_dir` run `pnpm install` and `pnpm test`.
- If no `.git` directory exists, run `git init` then `pnpm prepare` to activate Husky hooks.

### 4. Add pre-commit hook (augment)

- Ensure `package.json` exists and defines `lint` and `format` scripts.
- Run `scripts/add_precommit.sh [project_root]`.
- If `.husky/_/husky.sh` is missing, run your package manager install (or `npx husky install`) to activate hooks.
