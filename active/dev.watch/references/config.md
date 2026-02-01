# dev.watch config

## JSON format

Create a JSON file (default: `dev.watch.json`) with the following structure:

```
{
  "github_token_env": "GITHUB_TOKEN",
  "poll_interval_seconds": 60,
  "state_file": "~/.dev-watch/state.json",
  "emit_on_first_run": false,
  "loops_parallel": false,
  "projects": [
    {
      "url": "https://github.com/orgs/ORG/projects/1",
      "status_field": "Status",
      "todo_status": "Todo"
    }
  ]
}
```

## Notes

- Only GitHub Projects v2 URLs are supported: `https://github.com/orgs/<org>/projects/<number>` or `https://github.com/users/<user>/projects/<number>`.
- `status_field` and `todo_status` comparisons are case-insensitive.
- `state_file` supports `~` and environment variable expansion.
- `loops_parallel` runs `loops.sh` with `--parallel` (forks Codex instead of blocking the watch loop).
- Use a token with Projects + Issues read access. Private repos need appropriate repo scopes.
- The comment helper script also uses `github_token_env` (override with `--token-env`).
