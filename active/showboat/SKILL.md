---
name: showboat
description: Create executable demo documents with Showboat that prove a workflow, feature, CLI, or test actually works. Use when asked to produce a reproducible demo, `demo.md`, proof-of-work document, captured command transcript, or verification artifact that should be replayable with `showboat verify`.
dependencies: []
---

# Showboat

## Overview

Use `uvx showboat` to build Markdown documents that mix short notes, executable commands, and captured output. Reach for it when the deliverable should both explain and prove behavior.

## Workflow

1. Confirm the CLI is available with `uvx showboat --help`.
2. Pick the document path. Default to `demo.md` in the current workspace unless the user specifies another file.
3. Initialize the document with `uvx showboat init <file> <title>`.
4. Add short context blocks with `uvx showboat note <file> ...`.
5. Record proof steps with `uvx showboat exec <file> <lang> <code>`.
6. Prefer commands that prove the real behavior, such as tests, generated artifacts, or verification commands.
7. If screenshots matter, add them with `uvx showboat image <file> ...`.
8. If a step was wrong or too noisy, remove it with `uvx showboat pop <file>`.
9. Finish by running `uvx showboat verify <file>`.

## Stable Proof Requirements

- Use Showboat to prove functionality works, not just to describe the plan.
- If the raw output is nondeterministic, do not capture it verbatim when the document should later pass `showboat verify`.
- Common unstable fields to sanitize or summarize:
  - timestamps
  - temp directories
  - thread ids
  - duration lines
  - stochastic model text
- Prefer writing raw artifacts separately, then use `showboat exec` with a deterministic summary command over those artifacts.
- For test output, redact only the unstable fields and preserve the pass/fail substance.

## Good Fits

- Creating a reproducible `demo.md` for a feature or CLI workflow
- Proving that tests, smoke checks, or integration flows pass
- Capturing a bug reproduction plus the command that fixes or validates it
- Handing off a workflow another agent can replay with `showboat verify`

## Avoid

- Using Showboat when a plain response is enough and no proof artifact is needed
- Capturing secrets, credentials, or private tokens in output blocks
- Leaving known-unstable output unsanitized when later verification matters
