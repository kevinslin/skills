# Signal Integration Tests

Read this reference before using `claw-integ` for Signal channel delivery, Signal replies, or Signal-backed approvals.

## Required Inputs

Signal integration tests need explicit routing up front:

- claw profile, for example `dev` or `prod`
- Signal bot account configured in OpenClaw, written as `<bot-e164>`
- Signal sender account used by the test CLI, written as `<sender-e164>`
- test message text, unless the user asks for a specific prompt

Do not guess production phone numbers. Do not commit real phone numbers, message bodies, screenshots, or logs unless the user explicitly asks for local-only debugging detail.

## Preflight

Confirm the selected profile has Signal configured and the gateway is running.

```sh
OPENCLAW_PROFILE=<profile> pnpm openclaw channels status --probe
```

If OpenClaw owns the Signal daemon for `<bot-e164>`, do not run a second `signal-cli -a <bot-e164> receive`; it can fight the daemon account lock or miss events already consumed by OpenClaw.

If sender-to-bot delivery fails with `InvalidMessageException`, `invalid PreKey message`, `decryption failed`, or an unregistered/stale recipient symptom, refresh the sender account's recipient metadata before retrying:

```sh
signal-cli -a <sender-e164> getUserStatus <bot-e164>
```

Then retry the send. Record this repair command in the proof if it was needed.

## Signal-Only Log Filter

Start a Signal-only log stream before sending the message. Use raw-input `jq` so CLI banners or non-JSON lines do not crash parsing.

```sh
OPENCLAW_PROFILE=<profile> pnpm openclaw logs --follow --json --limit 0 2>/dev/null \
  | jq --unbuffered -Rrc '
      fromjson?
      | select(.type=="log")
      | (.raw | try fromjson catch {}) as $raw
      | (try (((($raw._meta.name? // "{}") | tostring) | fromjson).subsystem) catch "") as $subsystem
      | select($subsystem == "channels/signal" or (($subsystem | type) == "string" and ($subsystem | startswith("signal/"))))
      | {time:.time, subsystem:$subsystem, message:($raw.message // .message // "")}
    '
```

For local ad hoc proof when profile scoping is already set by the shell, `openclaw logs ...` is acceptable. In durable proof, prefer the explicit `OPENCLAW_PROFILE=<profile> pnpm openclaw ...` form and record it.

Expected proof signal: the filtered stream shows a Signal subsystem event such as `delivered reply to <sender-e164>` after the test send.

## Send The Test Message

Send from the test sender account to the OpenClaw Signal bot account:

```sh
signal-cli -a <sender-e164> send -m "hi" <bot-e164>
```

Save the returned timestamp under `raw/`. Treat the timestamp as nondeterministic evidence; summarize it in the scenario instead of embedding it into stable Showboat checks.

## Check The Bot Reply

Read replies on the sender account, not the bot account. This verifies the user-visible response while avoiding contention with OpenClaw's daemon.

```sh
signal-cli -a <sender-e164> -o json receive -t 8 --max-messages 10 \
  --ignore-attachments --ignore-stories --ignore-avatars --ignore-stickers \
  | jq -rc '
      select(.envelope.source == "<bot-e164>" and (.envelope.dataMessage.message? != null))
      | {
          source:.envelope.source,
          timestamp:.envelope.timestamp,
          body_len:(.envelope.dataMessage.message | length),
          preview:(.envelope.dataMessage.message | gsub("\n"; " ") | .[0:120])
        }
    '
```

For proofs that need raw message content, save the full receive JSON under `raw/` and redact or summarize in `scenario/<scenario-slug>.md`.

## Daemon SSE Caveat

The Signal daemon exposes `/api/v1/events`, but OpenClaw may already be the active consumer. Do not rely on that endpoint as the only proof path while the gateway is running.

If a direct daemon observation is still useful, scope it by account and strip Server-Sent Events framing before JSON parsing:

```sh
curl -Ns 'http://127.0.0.1:<port>/api/v1/events?account=<url-encoded-bot-e164>' \
  | awk '/^data:/ { sub(/^data:[[:space:]]*/, ""); print; fflush() }' \
  | jq --unbuffered -rc '
      select(.method=="receive")
      | {
          account:.params.account,
          source:(.params.envelope.sourceNumber // .params.envelope.source),
          timestamp:.params.envelope.timestamp,
          body_len:(.params.envelope.dataMessage.message // "" | length)
        }
    '
```

Use this only as supplemental evidence. The required live proof is the send timestamp, Signal-only OpenClaw log output, and sender-side receive output.

## Proof Requirements

Signal delivery proof is complete only when all of these are true:

- the requested profile and configured Signal bot account were used
- the sender account sent a real `signal-cli` message to the bot account
- the OpenClaw Signal log filter observed the gateway handling or delivering the result
- the sender-side `signal-cli receive` observed a bot reply or recorded a precise blocker
- any recipient-metadata repair command was recorded if used
- raw send, log, and receive artifacts were saved under `raw/`
- screenshots or video proof required by the main skill were captured from the real Signal surface or recorded as a blocker

For Signal approval tests, also read `./references/approvals.md` and include the approval proof matrix required by the main skill.
