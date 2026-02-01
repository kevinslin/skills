# dev.watch usage

dev_watch.py watches GitHub Projects v2 and emits Todo transitions for issues.
It works by polling project items via the GitHub GraphQL API and comparing them to a local state file.

## Quick start

1. Set a GitHub token in the env var referenced by your config (default: `GITHUB_TOKEN`).
2. Create a config file (see `references/config.md`).
3. Run a single poll:

```bash
python scripts/dev_watch.py --config ~/.llm/skills/dev.watch/dev.watch.json --once
```

## Command

### `python scripts/dev_watch.py`

Poll project items and emit Todo transitions.

Options:

- `--config`: Path to the config JSON file.
- `--once`: Run a single poll and exit (default when no mode is provided).
- `--watch`: Poll continuously.
- `--interval`: Override poll interval in seconds.
- `--emit-on-first-run`: Emit Todo transitions even without existing state.
- `--force`: Ignore the state file when determining eligibility.

Examples:

```bash
# Single poll
python scripts/dev_watch.py --config ~/.llm/skills/dev.watch/dev.watch.json --once

# Continuous watch
python scripts/dev_watch.py --config ~/.llm/skills/dev.watch/dev.watch.json --watch --interval 60

# Emit all current Todos regardless of prior state
python scripts/dev_watch.py --config ~/.llm/skills/dev.watch/dev.watch.json --once --force
```

## Notes

- `--force` ignores the state file when deciding whether an item is eligible and emits any item currently in Todo.
- The state file is still updated after a run, so subsequent non-forced runs only emit transitions.
