# Research Brief: Mapping a Current Process to tmux Session/Window/Pane Metadata

**Last Updated**: 2026-02-22

**Status**: Complete

**Related**:

- `docs/research/2026-02-22-research-good-architecture-docs.md`

* * *

## Executive Summary

This brief inspects practical methods for mapping a running process to tmux metadata (session, "tab" = window, and pane). The most direct mapping for a process running inside tmux is environment-based (`TMUX_PANE` and `TMUX`) combined with tmux format expansion (`tmux display-message -p ...`).

For arbitrary PIDs, the most reliable general method is a TTY join: process `tty` from `ps` matched against `#{pane_tty}` from `tmux list-panes -a -F ...`. In this workspace, mapping the parent Codex process (`pid=84278`, `tty=ttys024`) resolves cleanly to `pane=%60` in `session=1`, `window=1:skills`.

Recommendation: use a layered strategy. Prefer `TMUX_PANE` when available, fall back to PID->TTY->pane join, and include validation against tmux-reported metadata (`session_name`, `window_index`, `window_name`, `pane_id`) before using the result operationally.

**Research Questions**:

1. What metadata fields uniquely map a process to tmux session/window/pane?

2. What is the best mapping method for "current process" vs arbitrary PID?

3. What edge cases break or degrade mapping accuracy?

* * *

## Research Methodology

### Approach

Local command-line inspection on macOS with tmux 3.6a. Collected runtime metadata from process tables (`ps`), environment (`TMUX`, `TMUX_PANE`), and tmux format outputs (`display-message`, `display -a`, `list-panes`, `list-clients`, `list-windows`). Compared methods and validated output consistency.

### Sources

- Local tmux CLI output (runtime evidence in this workspace)
- Local process metadata via `ps`
- tmux built-in format fields (`#{...}`) surfaced by `tmux display -a`

### Context Triage Gate

| Value | Source of Truth | Representation | Initialization Point | Snapshot Point | First Consumer | Initialized Before Consumption? |
| --- | --- | --- | --- | --- | --- | --- |
| Process PID | OS process table | Integer (`pid`) | Process spawn | `ps -p <pid>` | Mapper logic | Yes |
| Process TTY | OS process table | `tty` (`ttys024`) | Process attached to terminal | `ps -o tty=` | TTY join mapper | Yes (if process has controlling TTY) |
| `TMUX_PANE` | Process env | Pane id (`%60`) | Shell startup inside pane | `echo $TMUX_PANE` / `ps eww` | Direct mapper | Yes (inside tmux) |
| `TMUX` | Process env | `socket,server_pid,session_hint` | Shell startup inside pane | `echo $TMUX` | Context mapper | Yes (inside tmux) |
| `pane_tty` | tmux server | `/dev/ttysNNN` | Pane creation | `tmux list-panes -a -F ...` | TTY join mapper | Yes |
| Session/window/pane labels | tmux server | `session_name`, `window_index`, `window_name`, `pane_id` | tmux runtime | `tmux display-message -p` | Final output | Yes |

* * *

## Research Findings

### Direct Mapping (Inside tmux)

#### Use environment metadata first

**Status**: Complete

**Details**:

- Current shell environment includes:
  - `TMUX=/private/tmp/tmux-501/default,22453,1`
  - `TMUX_PANE=%60`
- `TMUX_PANE` gives a direct pane identity for the shell process context.
- `TMUX` includes socket path and server pid; third field (`1`) aligns with session hint in this environment.

**Assessment**: Fastest and most accurate for "current process" when process inherits tmux shell environment.

* * *

#### Resolve full metadata from tmux formats

**Status**: Complete

**Details**:

- `tmux display-message -p 'session=#{session_name} window=#{window_index}:#{window_name} pane=#{pane_id} tty=#{pane_tty} pid=#{pane_pid} client_tty=#{client_tty}'`
- `tmux display -a` confirms available format fields:
  - `session_name`, `session_id`, `window_index`, `window_name`, `pane_id`, `pane_tty`, `pane_pid`, `client_tty`, `socket_path`, `pid`.

**Assessment**: Best method to project pane identity into user-friendly metadata after pane selection.

* * *

### PID-Based Mapping (Arbitrary Process)

#### PID -> TTY -> tmux pane join works reliably

**Status**: Complete

**Details**:

- For parent Codex process:
  - `target_pid=84278`
  - `target_tty=ttys024`
- Join query:
  - `tmux list-panes -a -F '#{pane_tty} session=#{session_name} window=#{window_index}:#{window_name} pane=#{pane_id} pane_pid=#{pane_pid}' | awk -v tty="/dev/ttys024" '$1==tty {print}'`
- Result:
  - `/dev/ttys024 session=1 window=1:skills pane=%60 pane_pid=95819`

**Assessment**: Strong general fallback when direct env access to target process is unavailable.

* * *

#### Client and "tab" mapping

**Status**: Complete

**Details**:

- tmux uses "window" where users often say "tab".
- `tmux list-windows -a -F 'session=#{session_name} window=#{window_index}:#{window_name} window_id=#{window_id}'` gives tab-equivalent mapping.
- `tmux list-clients -F 'client_tty=#{client_tty} session=#{session_name} pid=#{client_pid}'` links attached client terminals to sessions.

**Assessment**: Include both window identity and pane identity for complete user-facing mapping.

* * *

### Edge Cases and Failure Modes

#### Processes without controlling TTY

**Status**: Complete

**Details**:

- Non-interactive subprocesses may show `tty=?`, making direct TTY join impossible.
- In this session, some short-lived subprocesses report `??` for `tty`.
- Fallbacks: use parent process TTY, inspect inherited `TMUX_PANE`/`TMUX`, or process ancestry from known pane shell process.

**Assessment**: Mapper should explicitly handle `tty=?` and apply parent/ancestor fallback logic.

* * *

## Comparative Analysis

| Criteria | Option A: Env-based (`TMUX_PANE`) | Option B: PID->TTY->`pane_tty` Join | Option C: Process-tree / `pane_pid` Heuristics |
| --- | --- | --- | --- |
| Works for current interactive shell | High | High | Medium |
| Works for arbitrary PID | Low-Medium | High | Medium |
| Accuracy | High | High | Medium |
| Complexity | Low | Medium | High |
| Dependency on inherited env | High | Low | Low |
| Handles `tty=?` subprocesses | Medium | Low | Medium |

**Strengths/Weaknesses Summary**:

- **Option A**: Best for current shell context; fails when target process lacks inherited tmux env.
- **Option B**: Best general-purpose method for mapping external PIDs; depends on having a valid controlling TTY.
- **Option C**: Useful as fallback but more brittle and implementation-heavy.

* * *

## Best Practices

1. **Treat "tab" as tmux window**: Always return `window_index:window_name` for user-facing "tab" mapping.
2. **Use layered lookup**: `TMUX_PANE` first, then PID->TTY->`pane_tty`.
3. **Capture both identity and display fields**: Keep `pane_id` plus session/window names.
4. **Normalize TTY formats**: Convert `ttysNNN` from `ps` to `/dev/ttysNNN` before join.
5. **Handle non-interactive processes**: If `tty=?`, retry with parent PID or inherited env.
6. **Verify mapping before use**: Confirm pane still exists (`tmux list-panes`) before acting.
7. **Include server/socket context**: Store `socket_path` and tmux server PID for multi-server environments.

* * *

## Open Research Questions

1. **How to robustly map detached/background descendants?**: Needs a standardized ancestry strategy when no tty/env exists.
2. **Cross-platform parity (Linux vs macOS) for env introspection**: Access methods differ (`/proc/.../environ` vs `ps eww` visibility).
3. **Nested tmux scenarios**: Additional disambiguation may be needed when tmux is started inside tmux.

* * *

## Recommendations

### Summary

Adopt a two-step production mapper: direct env mapping for current process context, with PID->TTY->pane join fallback for arbitrary processes.

### Recommended Approach

Use this decision sequence:

1. If target process env has `TMUX_PANE`, map directly:
   - `pane_id = TMUX_PANE`
   - fetch session/window/pane metadata via `tmux display-message -p` or `tmux list-panes`.
2. Else, resolve `tty` from `ps` and join against `tmux list-panes -a` `pane_tty`.
3. If `tty` unavailable, walk parent PID chain until tty/env can be resolved.
4. Return normalized metadata payload:
   - `session_name`, `session_id`, `window_index`, `window_name`, `pane_id`, `pane_tty`, `pane_pid`, `client_tty`, `socket_path`.

**Rationale**:

- Uses the strongest identity signal first (`TMUX_PANE`).
- Provides robust fallback for non-shell PIDs.
- Keeps implementation understandable and debuggable.

### Alternative Approaches

Process-tree-only mapping can be used where tty/env access is restricted, but should be treated as lower-confidence and validated against live tmux pane metadata.

* * *

## References

- Local runtime command evidence (this session):
  - `tmux -V` (`tmux 3.6a`)
  - `tmux display-message -p ...`
  - `tmux display -a`
  - `tmux list-panes -a -F ...`
  - `tmux list-clients -F ...`
  - `tmux list-windows -a -F ...`
  - `ps -o pid,ppid,tty,command` and `ps eww`

* * *

## Appendices

### Appendix A: Command Recipes

```bash
# A) Direct (inside tmux/current shell)
echo "$TMUX" "$TMUX_PANE"
tmux display-message -p 'session=#{session_name} window=#{window_index}:#{window_name} pane=#{pane_id} tty=#{pane_tty}'

# B) Arbitrary PID -> pane mapping by tty
target_pid=<PID>
target_tty=$(ps -o tty= -p "$target_pid" | xargs)
tmux list-panes -a -F '#{pane_tty} session=#{session_name} window=#{window_index}:#{window_name} pane=#{pane_id} pane_pid=#{pane_pid}' \
  | awk -v tty="/dev/${target_tty}" '$1==tty {print}'
```

### Appendix B: Example Mapping (Observed)

- Target process: `pid=84278`, `tty=ttys024`
- Resolved pane: `/dev/ttys024 session=1 window=1:skills pane=%60 pane_pid=95819`
- Observed env: `TMUX=/private/tmp/tmux-501/default,22453,1` and `TMUX_PANE=%60`

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- 2026-02-22: Created initial research brief for tmux process-to-session/window/pane metadata mapping (019c869d-8094-75a1-af3b-9ca4600a97fc)
