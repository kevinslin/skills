# Code Mode

Use this reference when the user asks to learn from a coding session or merged PR.

## Workflow

1. Resolve the current session and relevant parent/forked sessions using `./session-forensics.md`.
2. If a PR was submitted or merged, inspect the final changed files and any review comments that were addressed.
3. Read each changed file in its current state plus the smallest relevant test, log, or review artifacts.
4. Reflect with hindsight on what would make the next implementation simpler and more maintainable.
5. Route each finding to an existing skill, proposed skill, repo docs, workflow, or `none`.

## What To Look For

- Repeated manual steps that a skill should encode
- Source-of-truth lookups that were missed or discovered late
- Validation or proof steps that should have been required earlier
- Duplicated implementation patterns that should be documented
- Abstractions that became too complex or too shallow
- API, state, naming, or edge-case issues discovered during review

Keep only findings that would likely improve a future coding session.
