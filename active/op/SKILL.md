---
name: op
description: Use 1Password CLI (`op`) safely from agent workflows. Use when a task involves retrieving, injecting, configuring, troubleshooting, or documenting secrets with 1Password CLI; using `op read`, `op run`, `op item`, secret references, service accounts, or `OP_SERVICE_ACCOUNT_TOKEN`; or giving Codex/agents/tools access to credentials stored in 1Password.
dependencies: []
---

# 1Password CLI

Use this skill to operate 1Password CLI with least privilege and low transcript exposure.

## Default Stance

- Prefer `op run` with secret references over reading plaintext secret values.
- Prefer a scoped 1Password service account for unattended agent or automation work.
- Prefer app-integrated interactive sign-in for local, human-present workflows.
- Never print, summarize, paste, commit, or store secret values in chat, logs, notes, diffs, shell history, screenshots, or generated docs.
- Treat anything that reaches the transcript as exposed. If a secret was printed, tell the user to rotate it.

## Preflight

Before touching secrets, establish what is needed:

1. Identify the command or tool that needs the credential.
2. Identify the smallest set of fields it needs.
3. Decide whether the task can use secret references instead of plaintext.
4. Check whether `op` is installed and authenticated without exposing secrets:

```bash
command -v op
op --version
op whoami
```

If auth is missing, ask the user to unlock or sign in to 1Password. Do not ask the user to paste account passwords, Secret Keys, recovery codes, or service account tokens into chat.

## Access Patterns

### Run a command with secrets

Use this when a subprocess needs credentials:

```bash
op run --env-file .env.op -- your-command
```

The `.env.op` file should contain secret references, not secret values:

```dotenv
API_KEY=op://Vault/Item/api-key
TOKEN=op://Vault/Item/token
```

Keep secret-reference env files local and uncommitted unless the project explicitly wants shared references. If creating a local env file, set restrictive permissions:

```bash
chmod 600 .env.op
```

### Read a value only when necessary

Use plaintext reads only when no safer injection path exists. Prefer command substitution that passes the value directly to the consumer, and avoid echoing:

```bash
TOKEN="$(op read 'op://Vault/Item/token')" your-command
```

Avoid these patterns:

```bash
op read 'op://Vault/Item/token'
echo "$(op read 'op://Vault/Item/token')"
set -x
env
printenv
```

### Get secret references

When a user gives an item name but not a reference, inspect item metadata carefully and avoid revealing field values. Do not print raw `op item get --format json` output; filter it before it reaches the transcript:

```bash
op item get "Item Name" --vault "Vault Name" --format json \
  | jq '.fields[] | {label, id, type, purpose, reference}'
```

When the desired field is known, extract only the reference:

```bash
op item get "Item Name" --vault "Vault Name" --format json \
  | jq -r '.fields[] | select(.label == "Field Name") | .reference'
```

Do not include secret field values in the final answer. If a command output includes values, redact them before quoting or summarizing.

### Unattended agents and automations

Use a dedicated service account with access only to the needed vault/items. Keep the service account token out of repos and transcripts:

```bash
export OP_SERVICE_ACCOUNT_TOKEN="..."
op whoami
```

In Codex or other agent runtimes, inject `OP_SERVICE_ACCOUNT_TOKEN` through the runtime's approved secret mechanism or a local secrets file sourced by the launching shell. Do not write it into project config unless that config is explicitly secret-managed and excluded from version control.

## Decision Tree

- Need to run tests/build/deploy with secrets: use `op run --env-file`.
- Need to configure an app: write secret references to local config, then run the app under `op run`.
- Need to inspect whether an item exists: use `op item get` and report metadata only.
- Need a raw secret value: pause and confirm the value must be exposed to a process; use `op read` without printing it.
- Need long-running or headless access: use a scoped service account, not a human's broad interactive session.
- Need to troubleshoot auth: use `op whoami`, `op account list`, and non-secret error text.

## Transcript And Log Hygiene

- Before running commands, consider whether stdout/stderr may contain secrets.
- Disable shell tracing around `op` commands.
- Do not run broad environment dumps after injecting secrets.
- Do not pipe secret-bearing output into log files.
- When sharing output, redact tokens, passwords, session identifiers, account IDs if sensitive, and item values.
- If a tool insists on verbose debug logs, prefer passing a dummy credential first to validate shape, then run the real command only when needed.

## Git Hygiene

Before finishing any task that created or changed files:

```bash
git status --short
git diff -- . ':!*.lock'
```

Confirm no plaintext secrets were added. If a secret appears in a tracked file or diff, stop, remove it, and tell the user to rotate the credential if it may have been persisted.

## User-Facing Guidance

When explaining setup to a user:

- Recommend `op run` and secret references first.
- Explain the tradeoff between app-integrated local sign-in and service accounts.
- Tell the user where to put references, not secret values.
- Include exact commands, but use placeholder vault/item names.
- Avoid implying Codex needs unrestricted access to all of 1Password.

## Failure Handling

- If `op` is missing, ask the user to install 1Password CLI.
- If `op whoami` fails, ask the user to unlock/sign in or provide a runtime-approved secret injection path.
- If a vault/item/field is missing, ask for the vault, item, and field names or IDs.
- If permissions are denied, recommend narrowing or correcting vault access rather than broadening to all vaults.
- If a secret was exposed, report that plainly and recommend rotation.
