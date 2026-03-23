# Feature Spec: Add Deterministic Codex Transcript Sync and Automation-First Workflow to ag-ledger

**Date:** 2026-03-16
**Status:** In Progress

---

## Goal and Scope

### Goal
Replace `ag-ledger`'s per-conversation AGENTS injection workflow with a deterministic `sync` command that derives ledger entries from Codex rollout transcripts, so the recommended operating model becomes "run a recurring automation" instead of "log every conversation manually."

### In Scope
- Add a `sync` CLI subcommand to `ag-ledger`.
- Scan Codex rollout files from the last `X` minutes, defaulting to 24 hours.
- Persist sync state so unchanged rollout files are skipped and changed rollout files are re-checked without duplicating ledger entries.
- Derive ledger entries from transcript structure in a deterministic way, without model summarization.
- Update the skill instructions and packaged agent metadata to describe the automation-first workflow.
- Adjust `init` behavior so `ag-ledger` no longer installs the old "append-current in every conversation" AGENTS block.
- Define the recommended automation invocation contract that drives `sync`.
- Add integration tests for sync behavior and the updated CLI contract.

### Out of Scope
- Changing Codex transcript generation or storage format.
- Creating or mutating user-local automation TOML files directly from the skill repo.
- Migrating or deleting existing AGENTS blocks that were previously injected.
- Rewriting historical ledger entries that already exist.

---

## Context and Constraints

### Background
`ag-ledger` currently assumes every Codex conversation should carry instructions that tell the agent to append start, notable-change, and end entries manually. That creates prompt bloat in every conversation and relies on agent compliance instead of replayable state. The requested replacement is an automation-driven workflow: periodically scan recent Codex conversations and derive the ledger from transcript facts.

### Current State
- [`scripts/ag-ledger`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/ag-ledger) currently supports `append`, `append-current`, `session-id`, `filter`, and `init`.
- `init` injects a managed `ag-ledger` block into `AGENTS.md` that instructs every session to log start/notable/end manually.
- Ledger entries are appended with the local current time and written into `ledger-YYYY-MM-DD.md` under `~/.llm/ag-ledger/data`.
- Integration coverage in [`test_ag_ledger_integration.py`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/tests/test_ag_ledger_integration.py) covers manual append/filter/init flows only.
- Codex rollout transcripts under `~/.codex/sessions/**/rollout-*.jsonl` expose enough structure for deterministic replay:
  - `session_meta` gives session id and workspace.
  - `response_item` messages carry `role`, `phase`, text payload, and line-local timestamps.
  - Assistant commentary and final messages already act as concise milestone summaries.
  - Early user messages often include AGENTS instructions and inline skill bodies that should not be treated as task starts.

### Required Pre-Read
- [`scripts/ag-ledger`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/ag-ledger)
- [`test_ag_ledger_integration.py`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/tests/test_ag_ledger_integration.py)
- [`SKILL.md`](/Users/kevinlin/code/skills-public/active/ag-ledger/SKILL.md)
- [`openai.yaml`](/Users/kevinlin/code/skills-public/active/ag-ledger/agents/openai.yaml)
- [`2026-01-15-research-codex-cli-session-handoff.md`](/Users/kevinlin/code/skills-public/docs/project/research/2026-01-15-research-codex-cli-session-handoff.md)

### Constraints
- Sync behavior must be deterministic and local-only. No model calls or internet access for transcript summarization.
- Re-running sync on the same unchanged transcripts must be idempotent.
- Updated sync entries must use transcript event timestamps, not sync execution time, so cross-day sessions land in the correct ledger day file.
- Manual `append` and `append-current` workflows should continue to work for explicit ad hoc logging.
- The implementation should stay in the existing single-file Python CLI unless a clear extraction is needed.
- The new recommended workflow should be compatible with a recurring Codex desktop automation.

### Non-obvious Dependencies or Access
- Sync depends on local Codex transcript availability under `~/.codex/sessions` or `$CODEX_HOME/sessions`.
- Transcript parsing must tolerate large AGENTS payloads and skill bodies without treating them as meaningful user work summaries.

---

## Approach and Touchpoints

### Proposed Approach
Add a `sync` subcommand that scans recent rollout files by file modification time, parses transcript messages into deterministic task-turn events, and appends derived ledger entries with source metadata.

CLI contract:
- `ag-ledger sync`
  - defaults:
    - `--lookback-minutes 1440`
    - `--session-root $CODEX_HOME/sessions` when `CODEX_HOME` is set, otherwise `~/.codex/sessions`
    - `--state-file $META_LEDGER_ROOT/state/sync-state.json`
- caller:
  - intended for a recurring Codex desktop automation running from [`active/ag-ledger`](/Users/kevinlin/code/skills-public/active/ag-ledger) or any workspace that can execute the script by absolute path
- failure surface:
  - print a concise per-file failure summary to stderr
  - return non-zero when any file fails
  - do not advance persisted state for a file that failed to process fully

Per rollout file:
- Read `session_meta` for session id and workspace.
- Walk `response_item` messages in order.
- Ignore developer messages and user context payloads that match the injected AGENTS / `<skill>` patterns.
- Treat each meaningful user message as the start of a new task turn.
- For each task turn:
  - Use the first assistant `commentary` message as the preferred start summary.
  - Fallback to the user message when no assistant commentary exists yet.
  - Treat later assistant `commentary` messages in the same turn as `notable change` entries.
  - Treat assistant `final_answer` or `final` messages in the same turn as `session end` entries.
- Record a deterministic source key per derived entry using the rollout path plus source line number and derived kind.

Persist sync state in a JSON file under the ledger root so the CLI can:
- skip unchanged rollout files via file fingerprint (`size` + `mtime_ns`),
- remember which derived source keys have already been emitted,
- re-check files whose fingerprint changed and append only newly discovered entries.
- write state atomically after each successfully processed file so partial sync failures do not mark incomplete files as current.

### Integration Points / Touchpoints
- [`scripts/ag-ledger`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/ag-ledger)
  - add transcript scanning, source-key generation, state persistence, and `sync` parser wiring.
- [`test_ag_ledger_integration.py`](/Users/kevinlin/code/skills-public/active/ag-ledger/scripts/tests/test_ag_ledger_integration.py)
  - add sync fixtures/assertions and update `init` expectations.
- [`SKILL.md`](/Users/kevinlin/code/skills-public/active/ag-ledger/SKILL.md)
  - change the recommended workflow from AGENTS injection to automation-driven sync.
- [`openai.yaml`](/Users/kevinlin/code/skills-public/active/ag-ledger/agents/openai.yaml)
  - update the default prompt to describe sync/automation instead of manual append-current logging.
- [`docs/specs/active/2026-03-16-ag-ledger-sync-automation.md`](/Users/kevinlin/code/skills-public/docs/specs/active/2026-03-16-ag-ledger-sync-automation.md)
  - keep implementation decisions and any follow-up assumptions here.

### Resolved Ambiguities / Decisions
- Start entries should prefer the first assistant commentary message, because it is usually the cleanest deterministic summary of the task after the noisy AGENTS/skill preamble.
- Sync should operate at the task-turn level inside a rollout file, not as a single start/end pair per file, because one Codex conversation can contain multiple user asks over time.
- Unchanged files should be skipped by fingerprint, while changed files should be reparsed and deduplicated by stored source keys.
- Sync-created entries should carry extra source metadata in the JSON entry so operators can trace a ledger row back to a rollout file and transcript line.
- `init` should become a non-mutating compatibility command that prints a deprecation note directing users to the automation-first `sync` workflow instead of modifying `AGENTS.md`.
- The recommended automation cadence should be hourly, while `sync` itself still defaults to a 24-hour lookback so missed runs can self-heal.

### Important Implementation Notes
- Event timestamps come from the transcript JSONL line timestamp and should be converted to the local timezone before formatting the ledger `time` field.
- File selection for sync should use file modification time, so active older conversations that changed recently are still reconsidered.
- Message normalization should collapse whitespace and truncate long text deterministically for the ledger `msg`, while source metadata preserves the lookup path back to the full transcript.
- Sync-created ledger entries should include at least `entry_kind`, `source_path`, `source_line`, `source_phase`, and `source_turn_index` fields.
- State should be keyed by absolute rollout path and store the last known fingerprint plus emitted source keys for that file.

---

## Acceptance Criteria

- [ ] `ag-ledger sync` exists, defaults to scanning the last 1440 minutes, and supports a caller-specified lookback window.
- [ ] Sync writes derived start/notable-change/end ledger entries from Codex rollout transcripts without using non-deterministic summarization.
- [ ] Re-running sync on unchanged rollout files produces no duplicate entries, and changed rollout files append only newly discovered derived entries.
- [ ] Sync-created entries use transcript event timestamps and land in the correct daily ledger file for that event date.
- [ ] The skill documentation and packaged metadata no longer recommend injecting per-conversation manual logging instructions into `AGENTS.md`.
- [ ] `ag-ledger init` no longer edits `AGENTS.md` and instead points callers to the sync automation workflow.
- [ ] Manual append/filter/session-id workflows continue to function after the sync work lands.

---

## Phases and Dependencies

### Phase 1: Lock the sync data model
- [ ] Define the derived entry schema, including source metadata and state-file shape.
- [ ] Define the deterministic rules for meaningful user turns, commentary milestones, and final responses.
- [ ] Document the non-mutating replacement behavior for `init` and the recommended automation invocation.

### Phase 2: Implement CLI sync and state persistence
- [ ] Add transcript discovery and recent-file filtering.
- [ ] Add transcript parsing, message normalization, source-key generation, and timestamp-aware ledger writes.
- [ ] Add sync-state read/write and changed-file detection.

### Phase 3: Update skill guidance
- [ ] Rewrite `SKILL.md` to describe automation-first usage and the new `sync` command.
- [ ] Update packaged agent metadata so the default prompt reflects sync instead of append-current instructions.
- [ ] Update any `init` help/output text to match the new workflow.

### Phase 4: Validate the behavior
- [ ] Add integration coverage for first sync, repeat sync, changed-file re-sync, context-message filtering, multi-turn rollouts, and transcript-time ledger dating.
- [ ] Run the integration suite.
- [ ] Manually sanity-check the CLI against a temporary transcript tree and state file.

### Phase Dependencies
- Phase 2 depends on Phase 1.
- Phase 3 depends on the final Phase 1 `init` decision and the surfaced CLI contract from Phase 2.
- Phase 4 depends on Phases 2 and 3.

---

## Validation Plan

Integration tests:
- Add a fixture rollout file with AGENTS and `<skill>` user payloads followed by a real task message; verify sync ignores the context payloads.
- Add a multi-turn fixture where one rollout contains two real user asks; verify sync emits distinct start/end cycles and commentary milestones in order.
- Verify a second sync run against the same unchanged fixture produces no additional ledger lines.
- Verify a changed rollout file appends only the newly added commentary/final derived entries.
- Verify sync-created entries with transcript timestamps near midnight land in the correct `ledger-YYYY-MM-DD.md` file.
- Verify a sync failure does not update the stored fingerprint/source-key state for the failing rollout file.
- Verify `append`, `append-current`, `session-id`, and `filter` still pass existing expectations after the shared append path changes.
- Verify the updated `init` behavior prints the deprecation/automation guidance and does not write `AGENTS.md`.

Unit tests (Optional):
- Add focused tests only if the transcript-parsing helpers become hard to reason about through integration coverage alone.

Manual validation:
- Run `ag-ledger sync --root <tmp-root> --session-root <tmp-sessions> --lookback-minutes 1440` against fixture transcripts and inspect the ledger/state outputs.
- Re-run the same command without changing fixtures and confirm no extra entries are appended.
- Append new transcript lines to an existing fixture, re-run sync, and confirm only the new derived entries appear.

---

## Done Criteria

- [ ] Implementation matches the accepted sync data model and automation-first workflow.
- [ ] Integration validation covers the new sync path and passes.
- [ ] `SKILL.md`, CLI help text, and packaged metadata describe the new workflow consistently.
- [ ] Any compatibility behavior for `init` is documented and tested.

---

## Open Items and Risks

### Open Items
- [ ] Decide whether sync-created entries need new filter flags immediately, or whether raw JSON fields are sufficient for the first version.
- [ ] Confirm whether `sync` should gain a dry-run mode in the first version or wait until operators ask for it.

### Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
| --- | --- | --- | --- |
| Context payloads are misclassified as real user turns, creating noisy ledger rows | High | Med | Add explicit filters for AGENTS and `<skill>` payload patterns, and cover them in integration tests |
| Source-key design is not stable enough, causing duplicate rows on re-sync | High | Med | Base source keys on rollout path plus transcript line number and derived kind, and persist them in state |
| Transcript event times are ignored and sync writes rows to the wrong ledger day | Med | Med | Refactor append logic to accept explicit event timestamps and test cross-day writes |
| `init` compatibility handling surprises existing users | Med | Med | Keep the command present, document the change clearly, and add a regression test for its new behavior |
| Large rollout files make sync too slow when rechecked | Low | Med | Filter candidates by file mtime first and skip unchanged files by fingerprint |

### Simplifications and Assumptions
- The first version can treat AGENTS and inline skill payloads as the only required context-noise patterns to ignore.
- The first version can keep sync state as a local JSON file under the ledger root rather than introducing SQLite or a more complex index.
- The user-facing automation setup can be delivered as a Codex automation suggestion rather than a repo-managed file.

---

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- 2026-03-16: Created execution plan for deterministic transcript sync and automation-first ag-ledger workflow (019cf97d-e94a-7bf0-89ad-56a29e6afaa1)
