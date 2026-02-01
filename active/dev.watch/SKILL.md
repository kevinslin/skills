---
name: dev.watch
description: Monitor GitHub Projects for issues moved to a Todo status and kick off dev.do intake. Use when asked to watch or subscribe to GitHub project board changes, triage issues moved into Todo, or automate task intake from project URLs.
---

# dev.watch

## Overview

Watch GitHub Projects v2 for issues that transition into Todo and hand them off to dev.do, with stateful dedupe.

## Workflow

### 1) Configure watch targets

- Create a config JSON file (see `references/config.md`).
- Ensure the GitHub token env var is set (default: `GITHUB_TOKEN`).

### 2) Run the watcher

- Single poll:

```
python scripts/dev_watch.py --config dev.watch.json --once
```

- Continuous watch:

```
python scripts/dev_watch.py --config dev.watch.json --watch --interval 60
```

### 3) Trigger dev.do via loops.sh

- `dev_watch.py` now invokes `scripts/loops.sh` for each new Todo event.
- The task string includes repo, title, and URL, and the Codex prompt instructs `dev.do`.
- Default behavior is synchronous (blocks the watch loop). Set `"loops_parallel": true` in config to fork Codex.

### 4) Ask questions in-issue

- If dev.do needs clarification, post concise questions as a comment on the original issue.
- Pause further work and wait for the issue author to respond before proceeding.
- Use the helper script to post a comment:

```
python scripts/post_issue_comment.py --issue-url "<issue-url>" --message "Questions here"
```

## Notes

- Only GitHub Projects v2 URLs are supported.
- The watcher outputs JSON with an `events` list; treat each event as a new Todo intake.

## Resources

- `scripts/dev_watch.py`
- `scripts/post_issue_comment.py`
- `references/config.md`
