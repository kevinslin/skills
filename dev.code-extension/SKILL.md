---
name: dev.code-extension
description: Install VS Code/Cursor extensions from a local .vsix via CLI (code, code-insiders, cursor, cursor-nightly). Use whenever asked to install an extension programmatically.
version: 1.0.0
---

# dev.code-extension

Use this skill when the user asks to install a VS Code-compatible extension into **VS Code** or **Cursor** (stable or nightly).

## Input contract

- Expect a **local filesystem path** to a `.vsix` file.
- If the user provides a Marketplace ID instead of a path, ask for the `.vsix` path (unless they explicitly want Marketplace install).

## Install commands (local `.vsix`)

### VS Code (stable)

```bash
code --install-extension "/path/to/extension.vsix" --force
code --list-extensions --show-versions
```

### VS Code Insiders

```bash
code-insiders --install-extension "/path/to/extension.vsix" --force
code-insiders --list-extensions --show-versions
```

### Cursor (stable)

```bash
cursor --install-extension "/path/to/extension.vsix" --force
cursor --list-extensions --show-versions
```

### Cursor Nightly

Prefer `cursor-nightly` if it’s on PATH. If not (macOS default), call it from the app bundle:

```bash
"/Applications/Cursor Nightly.app/Contents/Resources/app/bin/cursor-nightly" --install-extension "/path/to/extension.vsix" --force
"/Applications/Cursor Nightly.app/Contents/Resources/app/bin/cursor-nightly" --list-extensions --show-versions
```

## Verification

- After install, verify by grepping the extension list:
  - `cursor --list-extensions --show-versions | rg -n "<publisher>\\.<name>|<name>"`

## Automation/CI option (avoid touching a developer profile)

If the user wants isolated installs (recommended for scripts/CI), add:

- `--user-data-dir <dir>`
- `--extensions-dir <dir>`

Example:

```bash
cursor --user-data-dir /tmp/cursor-user --extensions-dir /tmp/cursor-ext --install-extension "/path/to/extension.vsix" --force
```

## Sandbox note (Codex CLI)

Installing extensions writes to user/application support directories (outside the repo).
In sandboxed runs, request escalated permissions for these commands.

