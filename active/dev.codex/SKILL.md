---
name: dev.codex
description: Codex self-management workflows. Use when Codex needs to modify its own configuration, skills, prompts, or runtime settings, including managing MCP servers (add/remove/disable, config.toml).
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
