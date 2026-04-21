---
name: slack-notify
description: Send explicit Slack notifications through slack-post using credentials loaded by the secrets skill.
dependencies:
- secrets
---

# Slack Notify

Use this skill only when the user explicitly invokes `$slack-notify` or explicitly asks to send a Slack notification.

The command posts a plain-text message through `slack-post`. It loads credentials with the sibling [secrets skill](../secrets/SKILL.md), using `$secrets slack` semantics:

- Token: `SLACK_TOKEN` or `SLACK_BOT_TOKEN` from `~/.secrets/.env.slack`.
- Channel: `SLACK_CHANNEL` from `~/.secrets/.env.slack`.

Do not print token values, decrypted env values, or full environment dumps.

## Usage

```bash
./scripts/slack-notify "hello world"
./scripts/slack-notify "task is ready"
```

The public shorthand is:

```text
$slack-notify "hello world"
$slack-notify "task is ready"
```

For multi-line text:

```bash
printf 'line one\nline two\n' | ./scripts/slack-notify
```

## Workflow

1. Confirm the user explicitly asked to post a Slack notification.
2. Keep the message plaintext and exactly scoped to what the user requested.
3. Run the bundled helper:

```bash
./scripts/slack-notify "message"
```

The helper resolves `../secrets/scripts/secrets`, runs `secrets slack -- ...`, checks `SLACK_CHANNEL`, and calls:

```bash
slack-post --channel "$SLACK_CHANNEL" "message"
```

`slack-post` reads the token from `SLACK_TOKEN` or `SLACK_BOT_TOKEN` inside the secrets-loaded environment.

## Safety

- Do not send Slack posts for generic task completion unless the user explicitly asks for Slack notification.
- Do not echo `SLACK_BOT_TOKEN`, `SLACK_TOKEN`, `.env.slack`, `.env.keys`, or dotenvx decrypted output.
- If `slack-post` fails, report the non-secret error text only.
- If credentials are missing, ask the user to update them through `$secrets init slack` and `dotenvx set ... -f ~/.secrets/.env.slack`; do not ask them to paste secret values into chat.
- Use `terminal-notifier` or other non-Slack notification mechanisms separately when a workspace requires local completion notifications.

## Troubleshooting

- Missing `slack-post`: install or expose the `slack-post` tool on `PATH`.
- Missing channel: set `SLACK_CHANNEL` in `~/.secrets/.env.slack`.
- Missing token: set `SLACK_BOT_TOKEN` or `SLACK_TOKEN` in `~/.secrets/.env.slack`.
- Missing secrets helper: ensure the `secrets` skill is installed beside this skill, or set `SECRETS_CMD` to the helper path.
