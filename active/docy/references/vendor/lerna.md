## Lerna Best Practices

- Treat modern Lerna as a workspace-aware task runner and release layer, not a dependency installation or linking tool.
- Read `lerna.json`, `nx.json`, and the package manager workspace config before choosing commands.
- Check the repository's Lerna major version before assuming command availability or Node support.
- Prefer narrow graph-aware runs such as `--scope`, `--since`, `--include-dependencies`, and `--include-dependents` over repo-wide execution.
- Let task-pipeline config define ordering; do not manually reconstruct build or test order when `nx` target configuration already exists.
- Use project-graph inspection when scope is unclear instead of inferring dependencies from folder layout alone.
- Treat cache configuration as a correctness contract: cache only side-effect-free targets and define outputs accurately.
- Escalate before `version` or `publish` unless the repository's release mode and registry auth path are already explicit.
- For `pnpm` workspaces, use `pnpm-workspace.yaml` and manage dependencies with `pnpm`, not legacy Lerna commands.
- After major Lerna upgrades, run `lerna repair` to remove stale config and align with current supported options.
