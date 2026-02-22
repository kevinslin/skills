# Research Brief: Can a Running Codex Session ID Be Mapped to a Process ID?

**Last Updated**: 2026-02-22

**Status**: Complete

**Related**:

- `docs/research/2026-02-22-research-tmux-process-metadata-mapping.md`
- `active/dev.llm-session/SKILL.md`

* * *

## Executive Summary

Short answer: **yes, but conditionally**.

For running Codex sessions launched via `resume <session-id>` or `fork <session-id>`, mapping session ID -> PID is direct because the session ID appears in the live process command line. In this environment, session `019c869d-8094-75a1-af3b-9ca4600a97fc` mapped to running PIDs `84277` and `84278`.

For generic running Codex processes started without an explicit session ID in argv (for example `codex --profile xxhigh`), there is no single authoritative direct mapping from session ID to PID using currently observed local artifacts. In that case, only heuristic matching is possible (cwd, tty, start time, parent chain).

**Research Questions**:

1. Is there a deterministic mapping from Codex session ID to live process PID?
2. Which local artifacts expose session ID vs process ID?
3. What fallback strategy works when deterministic mapping is unavailable?

* * *

## Research Methodology

### Approach

Inspected local Codex runtime and metadata files:

- running process list and argv via `ps`
- session lookup via `~/.codex/history.jsonl`
- session metadata files under `~/.codex/sessions/.../rollout-*.jsonl`
- optional cwd/tty correlation via `lsof` and `ps`

### Sources

- Local process table (`ps`, `pgrep`)
- Local Codex history file (`~/.codex/history.jsonl`)
- Local Codex session files (`~/.codex/sessions/...`)
- Local filesystem/process inspection (`lsof`)

### Context Triage Gate

| Value | Source of Truth | Representation | Initialization Point | Snapshot Point | First Consumer | Initialized Before Consumption? |
| --- | --- | --- | --- | --- | --- | --- |
| Codex session ID | Codex history/session files | UUID-like string | Session creation | `history.jsonl` / `session_meta` | Mapper | Yes |
| Running PID | OS process table | Integer | Process spawn | `ps` | Mapper | Yes |
| Command argv | OS process table | Full command string | Process spawn | `ps -o command` | Direct mapper | Yes |
| Session metadata (cwd/time) | `rollout-*.jsonl` first line payload | `cwd`, timestamps, id | Session creation | `session_meta` read | Heuristic mapper | Yes |
| Process cwd | OS runtime | absolute path | Process runtime | `lsof -a -p <pid> -d cwd` | Heuristic mapper | Yes |
| Process tty/start time | OS process table | tty + timestamp | Process spawn | `ps -o tty,lstart` | Heuristic mapper | Yes |

* * *

## Research Findings

### Deterministic Mapping Cases

#### `resume`/`fork` argv contains session ID

**Status**: Complete

**Details**:

- Running commands observed:
  - `node .../codex --profile xxhigh resume 019c869d-8094-75a1-af3b-9ca4600a97fc --yolo`
  - `.../vendor/.../codex/codex --profile xxhigh resume 019c869d-8094-75a1-af3b-9ca4600a97fc --yolo`
- Session ID string appears directly in process argv.
- Direct query by session ID produced running candidates:
  - `84277`
  - `84278`

**Assessment**: Deterministic and reliable while process is alive and argv includes session ID.

* * *

#### Multiple PIDs can map to one session

**Status**: Complete

**Details**:

- Codex runtime often appears as a wrapper process + child binary.
- For the same session ID, two PIDs were live simultaneously (`84277`, `84278`) with parent/child relationship.
- Choosing “the” PID requires policy:
  - wrapper PID (Node launcher) vs
  - native binary child PID.

**Assessment**: Mapping is one-to-many at process level; define canonical PID selection rule.

* * *

### Non-Deterministic Cases

#### Session files/history do not expose live PID

**Status**: Complete

**Details**:

- Matching session file:
  - `~/.codex/sessions/2026/02/22/rollout-2026-02-22T10-29-54-019c869d-8094-75a1-af3b-9ca4600a97fc.jsonl`
- `session_meta.payload` keys include:
  - `id`, `cwd`, `timestamp`, `cli_version`, etc.
- No `pid` field found in inspected session content.
- `~/.codex/history.jsonl` contains `{session_id, ts, text}` without PID.

**Assessment**: Local persisted metadata cannot directly answer session->PID by itself.

* * *

#### Heuristic mapping can be ambiguous

**Status**: Complete

**Details**:

- Many Codex processes may share similar profiles and even same cwd.
- Cwd-based matching (`lsof -p <pid> -d cwd`) narrows candidates but is not unique.
- TTY + start-time + parent-chain can improve confidence but remain heuristic when argv omits session ID.

**Assessment**: Heuristics are useful fallback, not guaranteed identity mapping.

* * *

## Comparative Analysis

| Criteria | Option A: Match Session ID in argv | Option B: Session file/history + heuristics | Option C: Cwd-only matching |
| --- | --- | --- | --- |
| Determinism | High | Medium-Low | Low |
| Requires process running | Yes | Yes | Yes |
| Works when argv lacks session ID | No | Yes | Yes |
| False positive risk | Low | Medium | High |
| Implementation complexity | Low | Medium | Low |

**Strengths/Weaknesses Summary**:

- **Option A**: Best and simplest when session ID appears in `resume`/`fork` argv.
- **Option B**: Best fallback when argv lacks session ID, but confidence-based only.
- **Option C**: Easy but weak in multi-session/multi-pane environments.

* * *

## Best Practices

1. **Use argv match first**: Search running `codex` commands for the exact session ID string.
2. **Handle one-to-many results**: Expect wrapper + child PIDs; document canonical PID choice.
3. **Use session files for context, not PID**: Pull `cwd`/timestamp from `session_meta` only for fallback ranking.
4. **Add confidence scoring in fallback mode**: combine cwd, tty, start time, and parent chain.
5. **Return mapping mode**: include `mode=deterministic|heuristic` in tool output.
6. **Fail explicitly when confidence is low**: avoid claiming exact mapping without direct evidence.

* * *

## Open Research Questions

1. **Can Codex expose PID in session metadata natively?**: Would remove heuristic ambiguity.
2. **What canonical PID should downstream tools use?**: wrapper vs child affects signal handling and lifecycle operations.
3. **How stable are argv patterns across Codex versions?**: session-in-argv behavior may change.

* * *

## Recommendations

### Summary

Yes, you can map a running Codex session ID to PID **when the session ID is present in process argv** (common for `resume`/`fork`). Otherwise, only heuristic matching is available.

### Recommended Approach

Use a two-stage resolver:

1. Deterministic stage:
   - find running `codex` processes with command containing the exact session ID.
2. Heuristic stage (only if stage 1 yields none):
   - load session `cwd` + timestamp from `session_meta`,
   - rank running codex processes by cwd/tty/start-time proximity and parent chain.

Return:
- candidate PIDs,
- chosen canonical PID (with policy),
- confidence score,
- mapping mode (`deterministic` or `heuristic`).

**Rationale**:

- Prioritizes correctness where direct evidence exists.
- Preserves utility when direct evidence does not exist.
- Makes uncertainty explicit for automation safety.

### Alternative Approaches

Maintain an external runtime registry (session_id -> pid) at process start to avoid heuristics entirely. This requires additional instrumentation around Codex process launch.

* * *

## References

- `~/.codex/history.jsonl` (session IDs + timestamps + prompts)
- `~/.codex/sessions/2026/02/22/rollout-2026-02-22T10-29-54-019c869d-8094-75a1-af3b-9ca4600a97fc.jsonl` (session metadata, no PID observed)
- Process evidence from:
  - `ps -axo pid,ppid,tty,lstart,command`
  - `python` filtering of `ps` output for session ID in argv
  - `lsof -a -p <pid> -d cwd`

* * *

## Appendices

### Appendix A: Deterministic Lookup Recipe

```bash
sid='019c869d-8094-75a1-af3b-9ca4600a97fc'
python3 - <<'PY'
import subprocess
sid='019c869d-8094-75a1-af3b-9ca4600a97fc'
out=subprocess.check_output(['ps','-axo','pid=,ppid=,tty=,command='],text=True)
for line in out.splitlines():
    if sid in line and 'codex' in line:
        print(line.strip())
PY
```

### Appendix B: Fallback Heuristic Inputs

- Session metadata:
  - `id`, `cwd`, `timestamp` from `session_meta.payload`
- Runtime candidates:
  - codex PID list from `ps`
  - cwd from `lsof -a -p <pid> -d cwd`
  - tty/start time from `ps -o tty,lstart`

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- 2026-02-22: Created initial research brief on session-id to running PID mapping for Codex (019c869d-8094-75a1-af3b-9ca4600a97fc)
