# Execution Plan: Trigger loops.sh on task detection

**Date:** 2026-02-01
**Status:** Completed

---

## Goal

Automatically run Codex via `loops.sh` when dev.watch finds new Todo tasks, using a custom Codex prompt that preserves Ralph-style progress logging and sets the correct repo working directory.

---

## Context

### Background
The watcher currently emits JSON for Todo transitions but does not kick off any automated handling. We want to run Codex when a task appears, using a custom prompt and logging progress similar to the Ralph workflow.

### Current State
- `active/dev.watch/scripts/dev_watch.py` only prints JSON payloads for events.
- There is no `loops.sh` script in the dev.watch toolchain.
- `references/codex.md` is documentation about Codex prompts, not an executable prompt template.

### Constraints
- `loops.sh` should execute Codex similarly to `ralph.sh`, but without PRD handling or custom exit conditions.
- Custom prompt must preserve progress logging instructions from `/Users/kevinlin/code/ralph/CODEX.md` and ignore everything else.
- Prompt must include instructions for the repo working directory: `$HOME/code/<repo-name>`.
- `loops.sh` should prompt Codex with: “use dev.do to accomplish task in $task”.
- Avoid breaking the JSON output contract of `dev_watch.py`.

---

## Technical Approach

### Architecture/Design
- Add `active/dev.watch/scripts/loops.sh` to construct a Codex prompt from `references/codex.md` plus a dynamic task line.
- Parse the GitHub issue URL to derive `repo-name` for the working directory instruction.
- Update `dev_watch.py` to invoke `loops.sh` when events are detected, passing the task value (include title/repo/url).
- Support `--parallel` in `loops.sh` to fork Codex when requested; default to synchronous.
- Update `references/codex.md` to become the custom Codex prompt template with Ralph progress logging guidance.
- Update dev.watch documentation to describe the new automation behavior and expectations.

### Technology Stack
- Bash (`loops.sh`)
- Python (`dev_watch.py`)
- Codex CLI (`codex exec`)

### Integration Points
- `active/dev.watch/scripts/dev_watch.py`
- `active/dev.watch/scripts/loops.sh`
- `references/codex.md`
- `active/dev.watch/SKILL.md` (documentation update)

### Design Patterns
- Follow the Codex invocation pattern from `ralph.sh` (array-safe command execution, prompt piped via stdin).
- Keep `dev_watch.py` JSON output stable by isolating `loops.sh` output.

### Important Context
- Progress logging should follow the “Progress Report Format” and “Consolidate Patterns” sections from `/Users/kevinlin/code/ralph/CODEX.md`.
- Task input will include issue title, repo, and URL; repo name is derived from the URL for the working directory instruction.

---

## Steps

### Phase 1: Plan & Setup
- [x] Verify `docs/specs/active/*-progress.md` + `*-learnings.md` gitignore patterns (add if missing).
- [x] Create progress and learnings artifacts next to this plan.

### Phase 2: Codex Prompt Template
- [x] Replace `references/codex.md` with the custom prompt template.
- [x] Include only Ralph progress logging instructions and working-directory guidance.

### Phase 3: loops.sh Implementation
- [x] Create `active/dev.watch/scripts/loops.sh`.
- [x] Accept a task (issue title/repo/url) argument and derive repo name for the cwd instruction.
- [x] Build a temporary prompt by combining `references/codex.md` with the task line.
- [x] Run Codex via `codex exec --full-auto` (configurable via env) using stdin.
- [x] Add a `--parallel` flag to fork the Codex invocation.

### Phase 4: dev_watch Integration
- [x] Invoke `loops.sh` when events are found (per event).
- [x] Ensure `dev_watch.py` JSON output remains valid (redirect or capture script output).

### Phase 5: Documentation
- [x] Update `active/dev.watch/SKILL.md` (and/or `references/config.md`) to document the new loops behavior.

### Phase 6: Verification
- [x] `python -m py_compile active/dev.watch/scripts/dev_watch.py`
- [x] `bash -n active/dev.watch/scripts/loops.sh`

**Dependencies between phases:**
- Phase 3 depends on Phase 2.
- Phase 4 depends on Phase 3.
- Phase 5 depends on Phase 4.

---

## Testing

- `python -m py_compile active/dev.watch/scripts/dev_watch.py`
- `bash -n active/dev.watch/scripts/loops.sh`

---

## Dependencies

### External Services/APIs
- GitHub GraphQL API (already used by `dev_watch.py`).

### Libraries/Packages
- None.

### Tools/Infrastructure
- Codex CLI available on PATH.

### Access Required
- [ ] GitHub token for dev.watch (existing requirement).

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| loops.sh output breaks JSON parsing for dev.watch consumers | Medium | Medium | Redirect loops output to stderr or a log file. |
| Repo path mismatch (`$HOME/code/<repo-name>` not present) | Medium | Medium | Warn and ask for guidance if the directory is missing. |
| Codex CLI missing or misconfigured | Medium | Low | Provide a clear error and exit early. |
| Long-running Codex blocks watch loop | Medium | Medium | Support `--parallel` to fork when desired; document default sync behavior. |

---

## Questions

### Technical Decisions Needed
- [x] Should `loops.sh` run synchronously (blocking the watch loop) or be spawned in the background?
  - Answer: Run synchronously by default; add `--parallel` to fork.
- [x] Should `dev_watch.py` pass only the issue URL, or include additional context (title/repo) in the task string?
  - Answer: Include title/repo (and URL) in the task string.

### Clarifications Required
- [x] Confirm the working directory format: `$HOME/code/<repo-name>` vs the requested `$HONE/code/<repo-name>`.
  - Answer: `$HOME/code/<repo-name>`.
- [x] Confirm that it is acceptable to replace `references/codex.md` with the custom prompt template.
  - Answer: Yes.

### Research Tasks
- [ ] None.

---

## Success Criteria

- [ ] `dev_watch.py` launches `loops.sh` whenever Todo events are detected.
- [ ] `loops.sh` runs Codex using the custom prompt + task line.
- [ ] `references/codex.md` contains the new prompt template with progress logging guidance.
- [ ] JSON output from `dev_watch.py` remains valid and unchanged in structure.
- [ ] Documentation reflects the new automation behavior.

---

## Notes

- No DESIGN.md found; last 5 commits reviewed for context.
- Plan kept minimal; no further simplification identified.
