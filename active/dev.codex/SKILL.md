---
name: dev.codex
description: “Codex runtime/config management (MCP servers, config.toml, session setup) plus session analysis/summaries. Use only for Codex self‑configuration. Do not use for creating or updating skills or SKILL.md content; use skill‑creator for that.”
---

# dev.codex

## Overview
Use this skill to manage Codex's own configuration and runtime setup. Start with MCP
server management; expand with new capabilities as needed.

## Core capabilities

### 1. MCP management
- Use when asked to add, remove, or update MCP servers or edit Codex MCP settings.
- Read `references/mcp-management.md` for CLI syntax and config options from the docs.
- Prefer the CLI for adding servers; edit `~/.codex/config.toml` for fine-grained config.
- Remove a server by deleting its `[mcp_servers.<server-name>]` table or set
  `enabled = false` to disable.
- Confirm the active set via `/mcp` in the Codex TUI or by inspecting the config file.

### 2. Session summaries (by session id)
- Use when the user provides a Codex session id and asks for a summary of that session.
- If the user needs help finding or mapping session ids, use the `dev.llm-session` skill.
- Locate the session data under `~/.codex/sessions/` (preferred) or
  `~/.codex/history.jsonl` and load only the relevant session.
- Summarize with: time range, primary goals, key actions/commands, decisions,
  errors/blocks, and concrete next steps.
- Redact or avoid sensitive data; include short code paths/filenames only when they
  are essential to the summary.
