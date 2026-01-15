# Research Brief: Codex CLI Session Handoffs & Context Management (with Claude Code comparison)

**Last Updated**: 2026-01-15

**Status**: Complete

**Related**:

- `active/dev.llm-session/SKILL.md` (Codex session IDs + resume patterns)
- `active/dev.shortcuts/SKILL.md` (shortcut index; note: `new-research-brief` shortcut is referenced but not present)

* * *

## Executive Summary

When a Codex CLI chat is getting “full” (context window pressure), the practical options are:

1. **Compress what’s already in the thread** using `/compact` so you can keep going without losing critical constraints and decisions.
2. **Start a fresh conversation** using `/new` and paste a concise handoff summary (ideally pointing to repo artifacts instead of re-pasting large blobs).
3. **Exit and restart** (`/exit` or Ctrl+C) if you want to end the interactive process entirely, then start a new run (optionally resuming prior state via `codex resume` / `codex exec --resume ...`).

The best “agent handoff” pattern is less about the tool and more about the artifact: a short, structured **handoff note** (goal, current state, decisions, open questions, next steps, commands/tests run, and pointers to files/PRs) that can be pasted into a new session or used by another agent/human. Codex CLI’s `/diff`, `/fork`, `/status`, `/compact`, and `/new` make it easier to keep chats small and create clean breakpoints.

Claude Code (Anthropic) supports a very similar workflow: `/compact` to summarize, `/clear` to reset the thread, `/context` to view context usage, `/export` to write/share a transcript, plus session resume flags (`-c`, `-r`) and `/resume` in-REPL. The overlap suggests a shared “best practice” set: compact early, checkpoint often, keep state in repo artifacts, and treat chat as a UI—not the source of truth.

**Research Questions**:

1. What is the most reliable way to end/reset a Codex CLI conversation when context is full?
2. What persistent artifacts enable clean handoffs between Codex CLI sessions (or between agents)?
3. What proven patterns from Claude Code usage translate to Codex CLI?

* * *

## Research Methodology

### Approach

- Read official docs for Codex CLI and Claude Code (commands, session controls, transcripts).
- Identify “context pressure” tools (compact/reset/new/fork/resume) and where state is stored.
- Derive handoff/checkpoint patterns that minimize re-explaining work in a new session.

### Sources

- Official documentation (OpenAI Codex CLI; Anthropic Claude Code).
- Community discussion (selected GitHub issue thread for Claude Code).

* * *

## Research Findings

### 1. Codex CLI: Ending a session vs starting fresh vs reducing context

#### 1.1 Exit the interactive session (`/exit` or Ctrl+C)

**Status**: Complete

**Details**:

- Codex CLI supports exiting an interactive session via **Ctrl+C** or **`/exit`**.
- Exiting is a process-level action: you stop the current interactive run, then you can start a new `codex` process later.

**Assessment**: Best when you’re done for now or want a clean restart; not the most efficient way to handle context pressure mid-task.

**References**:

- OpenAI Codex CLI docs (features + exiting sessions): https://developers.openai.com/codex/cli/

* * *

#### 1.2 Start a new conversation inside Codex (`/new`)

**Status**: Complete

**Details**:

- Codex CLI supports **`/new`** to start a *new conversation* (i.e., reset the thread) without needing to quit the CLI entirely.
- Practical use: treat `/new` as a “hard context reset”, then paste a handoff summary and continue.

**Assessment**: The best default when context is full and you want to keep working in the same terminal session.

**References**:

- OpenAI Codex CLI docs (slash commands): https://developers.openai.com/codex/cli/#slash-commands

* * *

#### 1.3 Compact the conversation (`/compact`) before you reset

**Status**: Complete

**Details**:

- Codex CLI supports **`/compact`** to summarize the visible conversation and free up context.
- You can supply compaction instructions (e.g., “keep decisions, constraints, current branch, remaining TODOs, and test commands”).

**Assessment**: High ROI if used proactively (before you hit limits). Still helpful as an immediate “space recovery” move.

**References**:

- OpenAI Codex CLI docs (slash commands): https://developers.openai.com/codex/cli/#slash-commands

* * *

#### 1.4 Observe context usage (`/status`)

**Status**: Complete

**Details**:

- Codex CLI supports **`/status`** to view configuration and token usage; useful to decide whether to `/compact` or `/new`.

**Assessment**: Use as a quick “should I reset yet?” check.

**References**:

- OpenAI Codex CLI docs (slash commands): https://developers.openai.com/codex/cli/#slash-commands

* * *

#### 1.5 Resume / continue work later (`codex resume`, `codex exec --resume ...`)

**Status**: Complete

**Details**:

- Codex stores session transcripts locally under `~/.codex/sessions/`.
- You can resume the last (or a specific) session using `codex resume --last` or `codex resume <SESSION_ID>`.
- You can also run non-interactively while resuming context using `codex exec --resume <SESSION_ID> "..."` or `codex exec --resume --last "..."`.

**Assessment**: Strong for long-running work; pairs well with handoff notes when context is large or tasks are paused mid-stream.

**References**:

- OpenAI Codex CLI docs (features + transcripts + resume): https://developers.openai.com/codex/cli/
- OpenAI Codex CLI docs (command-line options; `codex resume`): https://developers.openai.com/codex/cli/#command-line-options

* * *

### 2. Codex CLI: Useful handoff primitives

#### 2.1 Branch a conversation (`/fork`) to keep threads clean

**Status**: Complete

**Details**:

- Codex CLI supports **`/fork`** to create a new conversation based on the current one.
- Practical use: fork for “experimental” paths, keep the main thread minimal, and avoid contaminating the primary context with dead ends.

**Assessment**: A good alternative to “let’s keep talking in one giant thread” that leads to context bloat.

**References**:

- OpenAI Codex CLI docs (slash commands): https://developers.openai.com/codex/cli/#slash-commands

* * *

#### 2.2 Capture/transfer state via repo artifacts (recommended)

**Status**: Complete

**Details**:

Codex CLI can store transcripts, but the most reliable handoff is an explicit artifact you control (in-repo or in your tracker). Recommended minimum contents:

- **Goal / success criteria**
- **Current state** (what’s implemented, what’s failing, what’s unknown)
- **Key decisions** + rationale (esp. tradeoffs)
- **Constraints** (perf, security, style, “don’t touch X”)
- **Pointers** to artifacts: branch name, commit hash, file paths, issue/PR links
- **How to run/verify**: commands executed and expected outputs
- **Next steps** (ordered TODO list)
- **Open questions** (what needs clarification)

**Assessment**: This is the core “handoff pattern” regardless of agent/tool; it minimizes rework when starting a new session.

* * *

### 3. Claude Code: Similar session controls and explicit export for handoffs

#### 3.1 Reset vs summarize (`/clear`, `/compact`) and monitor context (`/context`)

**Status**: Complete

**Details**:

- Claude Code provides:
  - **`/compact`** to condense conversation (optionally with focus instructions).
  - **`/clear`** to reset the conversation.
  - **`/context`** to visualize current context usage.
  - **`/exit`** to exit the REPL.

**Assessment**: Very similar to Codex’s `/compact` + `/new` + `/status` pattern; “compact early, reset when needed” is shared best practice.

**References**:

- Anthropic Claude Code docs (slash commands): https://docs.anthropic.com/en/docs/claude-code/slash-commands

* * *

#### 3.2 Export a transcript as a handoff artifact (`/export`)

**Status**: Complete

**Details**:

- Claude Code includes **`/export`** to save the current conversation (e.g., to Markdown) or copy it to the clipboard.

**Assessment**: Export is a strong complement to a structured handoff note; it’s useful when another agent/human needs deeper history, but should not replace concise state.

**References**:

- Anthropic Claude Code docs (slash commands): https://docs.anthropic.com/en/docs/claude-code/slash-commands

* * *

#### 3.3 Resume conversations (`-c`, `-r`, `/resume`)

**Status**: Complete

**Details**:

- Claude Code CLI supports:
  - `-c` to continue the most recent conversation.
  - `-r <SESSION_ID>` to resume a specific session.
- In interactive mode, `/resume` is also available.

**Assessment**: Similar ergonomic goal to `codex resume`; stable handoffs still benefit from an explicit summary artifact rather than relying on replaying all history.

**References**:

- Anthropic Claude Code docs (CLI reference): https://docs.anthropic.com/en/docs/claude-code/cli-reference
- Anthropic Claude Code docs (slash commands): https://docs.anthropic.com/en/docs/claude-code/slash-commands

* * *

#### 3.4 Community usage signal: `/clear` demand

**Status**: Complete

**Details**:

- A public GitHub issue requests a `/clear` command specifically to reset a long-running REPL conversation, indicating that “context bloat” is a common operational pain.

**Assessment**: Supports the idea that “reset + paste handoff note” is a common real-world workaround across agent CLIs.

**References**:

- GitHub issue: https://github.com/anthropics/claude-code/issues/134

* * *

## Comparative Analysis

| Criteria | Codex CLI | Claude Code |
| --- | --- | --- |
| Summarize/compact a growing thread | `/compact` | `/compact` |
| Reset/start fresh thread | `/new` | `/clear` |
| Monitor context usage | `/status` (token usage) | `/context` |
| Quit interactive session | `/exit` or Ctrl+C | `/exit` |
| Branch/fork conversation | `/fork` | (No direct equivalent in CLI docs; SDK supports sessions) |
| Resume prior work | `codex resume ...`, `codex exec --resume ...` | `-c`, `-r`, `/resume` |
| Export transcript | (Transcripts stored under `~/.codex/sessions/`; `codex resume --json` exists) | `/export` |

**Strengths/Weaknesses Summary**:

- **Codex CLI**: Strong built-in thread management (`/fork`, `/new`, `/diff`) and explicit local transcript storage; “new thread + handoff note” is straightforward.
- **Claude Code**: Strong ergonomics around explicit export and context visualization; similar compact/reset story; session flags make resuming convenient.

* * *

## Best Practices

1. **Compact early, not at the limit**: Use `/compact` regularly; don’t wait for the context to be “full”.
2. **Reset with intent**: When you `/new` (Codex) or `/clear` (Claude), immediately paste a structured handoff note so the agent has “just enough” context.
3. **Keep the source of truth outside chat**: Persist requirements, constraints, decisions, and state in repo artifacts (docs, issues, PRs, commits), not only in the conversation.
4. **Checkpoint with diffs/commits**: Use `git diff`/commits (and Codex `/diff`) so the new session can quickly understand what changed.
5. **Prefer pointers to files over pasting**: Link or reference file paths and line numbers rather than re-pasting large logs/code.
6. **Fork for experiments**: Use Codex `/fork` to isolate exploratory work from the main thread; keep the “canonical” thread minimal.
7. **Use explicit “handoff blocks”**: A consistent template reduces cognitive load when switching sessions/agents.

* * *

## Open Research Questions

1. **Codex transcript portability**: What is the best way to export/share Codex transcripts between machines/users (beyond `~/.codex/sessions/`)?
2. **Automation hooks**: Should a “handoff” slash command (Codex or Claude) be standardized as a custom command that emits a handoff template populated from repo state?

* * *

## Recommendations

### Summary

For “context full” situations in Codex CLI, prefer **`/compact` → `/new` (if needed)**. Use **`/exit`** only when you want to end the interactive process; otherwise, `/new` is the faster reset. For durable handoffs, create a **handoff note** in your repo or task system and treat chat as ephemeral.

### Recommended Approach

1. In Codex CLI, run **`/status`** to confirm token pressure.
2. Run **`/compact`** with instructions tailored for handoff (decisions, constraints, current state, next steps, commands run).
3. If you still want a clean slate, run **`/new`** and paste your handoff note at the top of the new conversation.
4. If you are done for now, **`/exit`** and later use `codex resume --last` (or `codex resume <ID>`) to continue, plus your handoff note to avoid re-deriving intent.

**Rationale**:

- `/compact` preserves continuity without losing decisions.
- `/new` prevents compaction artifacts from accumulating and keeps the next phase focused.
- Repo artifacts enable reliable handoff even when transcript state is unavailable/untrusted.

### Alternative Approaches

- **Fork-first workflow**: `/fork` for exploration; only merge the final conclusion into the primary thread (then `/compact`).
- **Non-interactive micro-ops**: Use `codex exec` for single, well-scoped tasks to avoid inflating the interactive thread.

* * *

## References

- OpenAI Codex CLI docs: https://developers.openai.com/codex/cli/
- OpenAI Codex CLI slash commands: https://developers.openai.com/codex/cli/#slash-commands
- OpenAI Codex CLI command-line options: https://developers.openai.com/codex/cli/#command-line-options
- Anthropic Claude Code CLI reference: https://docs.anthropic.com/en/docs/claude-code/cli-reference
- Anthropic Claude Code slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- GitHub issue (Claude Code `/clear`): https://github.com/anthropics/claude-code/issues/134

* * *

## Appendices

### Appendix A: Suggested “Handoff Note” Template (paste into a new session)

```md
## Handoff

### Goal
- ...

### Current State
- ...

### Decisions / Constraints
- ...

### Repo State
- Branch: ...
- Commit: ...
- Key files: ...

### Commands Run / Verification
- `...`

### Next Steps
1. ...
2. ...

### Open Questions
- ...
```

