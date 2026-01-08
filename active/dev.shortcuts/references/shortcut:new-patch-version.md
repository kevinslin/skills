Shortcut: New Patch Version

Instructions:

Create a to-do list with the following items then perform all of them:

1. Run `pnpm run publish:patch` from the repo root to build and package the extension.

2. Locate the generated `.vsix` file in `packages/plugin` (e.g. `packages/plugin/dendron-lite-<version>.vsix`).

3. Use the `dev.code-extension` skill to install the `.vsix` into Cursor and Cursor Nightly, following its install and verification commands.
