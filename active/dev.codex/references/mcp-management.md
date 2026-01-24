# MCP management (Codex)

Source: https://developers.openai.com/codex/mcp/

## Configuration options
- CLI: `codex mcp` to add and manage servers.
- Config file: edit `~/.codex/config.toml`.

The CLI and IDE extension share `~/.codex/config.toml`.

## Add a server (CLI, stdio)
```bash
codex mcp add <server-name> --env VAR1=VALUE1 --env VAR2=VALUE2 -- <stdio server-command>
```

Example:
```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

## OAuth login
Run `codex mcp login <server-name>` for servers that support OAuth.

## TUI
In the Codex TUI, use `/mcp` to view active servers.

## config.toml structure
Add a `[mcp_servers.<server-name>]` table.

### STDIO servers
- `command` (required): command that starts the server.
- `args` (optional)
- `env` (optional)
- `env_vars` (optional)
- `cwd` (optional)

### Streamable HTTP servers
- `url` (required)
- `bearer_token_env_var` (optional)
- `http_headers` (optional)
- `env_http_headers` (optional)

### Other options
- `startup_timeout_sec` (optional) default `10`
- `tool_timeout_sec` (optional) default `60`
- `enabled` (optional) set false to disable
- `enabled_tools` (optional)
- `disabled_tools` (optional) applied after `enabled_tools`

If an OAuth provider requires a static callback URI, set the top-level
`mcp_oauth_callback_port` in `config.toml`.

## Remove or disable
- Remove a server by deleting its `[mcp_servers.<server-name>]` table.
- Disable without deleting by setting `enabled = false`.

## config.toml examples
```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]

[mcp_servers.context7.env]
MY_ENV_VAR = "MY_ENV_VALUE"

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
http_headers = { "X-Figma-Region" = "us-east-1" }

[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
disabled_tools = ["screenshot"] # applied after enabled_tools
startup_timeout_sec = 20
tool_timeout_sec = 45
enabled = true
```
