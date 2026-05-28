# iMessage Approval Integration Tests

Read this reference before using `claw-integ` for iMessage, SMS-backed iMessage, Google Voice to iMessage, or iMessage-backed approval behavior.

## Hard Safety Rule

Never use a remembered or hardcoded phone number for iMessage/SMS tests.

Before any live send, ask the user for the exact approved recipient number for this run. Require
E.164 format, for example `<target-e164>`, and use only numbers the user provides in the current
task or explicitly confirms for the current run.

Before every send, inspect the visible sender/from account and the visible destination in Google Voice or Messages. If the destination is not exactly one of the user-provided targets for the current run, stop. Do not create a new recipient thread, do not send to an autofilled contact, and do not test in unrelated group chats.

## Required Inputs

iMessage approval tests need explicit routing up front:

- claw profile, for example `prod` or `dev`
- sender surface, usually Google Voice in a browser
- target number, provided by the user for this run in E.164 format
- any alternate target number, also provided by the user for this run in E.164 format
- whether the test is exec approval, plugin approval, reaction approval, or local exec duplicate-suppression
- the exact prompt to send

For local exec duplicate-suppression proof, do not use only `claw-debug send-approval`. That path can prove native approval delivery, but it does not exercise the model-to-bash-tool `approval-pending` result that caused duplicate iMessage replies. Use a real inbound message such as:

```text
Touch /tmp/foo
```

or:

```text
Run the shell command exactly: touch /tmp/foo
```

## Route That Worked

The reliable live path was:

1. Start the selected OpenClaw gateway profile from `/Users/kevinlin/code/openclaw`.
2. Use Google Voice in the browser to send the prompt to the approved direct SMS thread.
3. Watch the macOS Messages app for the OpenClaw/iMessage response.
4. React to the approval prompt in Messages, not in logs or a simulated CLI.

If using Google Voice, ask the user for the exact target number and construct the direct thread URL
from that value. URL-encode the leading `+` as `%2B`:

```text
https://voice.google.com/u/0/messages?itemId=t.%2B<target-digits-without-plus>
```

The direct SMS thread was the path that worked when group iMessage routing produced delivery failures. If Messages shows `Not Delivered`, verify that the test is in the direct allowed-number thread rather than a group thread or stale iMessage route.

## Preflight

Confirm the profile, gateway, channel readiness, approval config, and active build before sending the live message.

Launch the gateway from iTerm for iMessage approval tests. This avoids the common macOS Full Disk
Access / Automation mismatch where a background shell, service runner, or different terminal app
cannot read `~/Library/Messages/chat.db` or drive the `imsg` bridge even though iTerm can.

Prefer reusing the existing dedicated iMessage test iTerm tab/window when it is clearly idle or
already running the intended gateway/log command from the correct checkout and profile. Before
typing into it, verify:

- the visible shell is in `/Users/kevinlin/code/openclaw`;
- the active profile is the intended `OPENCLAW_PROFILE`;
- the foreground process is idle, or it is the intended gateway/log process for this proof; and
- the tab is not attached to an older worktree, stale gateway, or unrelated manual task.

Open a new iTerm tab/window only when the existing tab state is ambiguous, busy, or tied to the
wrong checkout/profile. A new tab is for isolation, not a technical requirement.

Before debugging channel code, verify iTerm has Full Disk Access and the gateway process was
started from that iTerm session.

```sh
cd /Users/kevinlin/code/openclaw
OPENCLAW_PROFILE=<profile> pnpm openclaw gateway status --deep --require-rpc
OPENCLAW_PROFILE=<profile> pnpm openclaw channels status --channel imessage --probe
```

When testing a worktree code change, build from the same repo checkout before restarting the gateway. Stale gateway builds were a recurring cause of old approval text, missing reaction hints, and missing suppression behavior.

```sh
cd /Users/kevinlin/code/openclaw
pnpm build
OPENCLAW_PROFILE=<profile> pnpm openclaw gateway restart
```

If restarting through the CLI leaves the gateway owned by an older background process, stop it and
start the gateway directly in iTerm from the repo checkout instead. Keep that iTerm window open for
the whole proof run.

If a second gateway is already advertising the same local service, stop the duplicate before testing. Logs like this usually mean there are competing gateway processes, not an approval bug:

```text
failed probing with reason: Error: Can't probe for a service which is announced already
```

## Required Channel Configuration

For the Google Voice to Messages direct-SMS approval test, the selected profile's `openclaw.json` must have an iMessage channel block equivalent to this. Keep unrelated provider/model/agent settings unchanged.

```json5
{
  channels: {
    imessage: {
      enabled: true,
      cliPath: "imsg",
      dbPath: "~/Library/Messages/chat.db",

      // Force the direct phone-number route used by Google Voice tests.
      service: "sms",
      region: "US",

      // Direct-message access must allow only the user-provided test sender numbers.
      dmPolicy: "allowlist",
      allowFrom: ["sms:<target-e164>"],

      // This proof path is direct SMS only. Avoid accidentally testing a group.
      groupPolicy: "disabled",
      groupAllowFrom: [],
      groups: {},

      // Reaction approval proof depends on seeing tapbacks/reactions.
      actions: {
        reactions: true,
      },
      reactionNotifications: "own",

      // Keep replay noise out of approval proof runs.
      catchup: {
        enabled: false,
      },
    },
  },
}
```

If the profile uses named iMessage accounts, put the same route-specific settings on the account that owns the local Messages source, and point `defaultAccount` at it:

```json5
{
  channels: {
    imessage: {
      enabled: true,
      defaultAccount: "local-sms",
      accounts: {
        "local-sms": {
          enabled: true,
          cliPath: "imsg",
          dbPath: "~/Library/Messages/chat.db",
          service: "sms",
          region: "US",
          dmPolicy: "allowlist",
          allowFrom: ["sms:<target-e164>"],
          groupPolicy: "disabled",
          groupAllowFrom: [],
          groups: {},
          actions: {
            reactions: true,
          },
          reactionNotifications: "own",
          catchup: {
            enabled: false,
          },
        },
      },
    },
  },
}
```

For approval delivery, also enable the top-level approval route. iMessage intentionally does not have a `channels.imessage.execApprovals` block.

```json5
{
  approvals: {
    exec: {
      enabled: true,
      mode: "session",
      sessionFilter: ["imessage:"],
    },
    plugin: {
      enabled: true,
      mode: "session",
      sessionFilter: ["imessage:"],
    },
  },
}
```

Use `approvals.plugin.enabled: false` when the scenario is specifically proving "exec approvals to iMessage but plugin approvals disabled." Use `approvals.exec.enabled: false` only for the disabled-routing negative case; it disables approval forwarding/native delivery, not the underlying shell approval policy.

If the user provides multiple approved recipients for one run, include each one explicitly:

```json5
allowFrom: ["sms:<target-e164>", "sms:<alternate-target-e164>"]
```

Do not use `allowFrom: ["*"]` for this proof. Do not set `groupPolicy: "open"` or add unrelated group allowlists while testing the direct SMS route. If the profile has duplicate iMessage accounts pointed at the same `cliPath`/`dbPath`, make one account the owner and disable the unused duplicate before collecting proof.

## Config Gates

For exec approval to appear in-chat, all of these must line up:

- `channels.imessage.enabled` is true for the selected profile.
- The sender is allowed by the iMessage route, commonly through `channels.imessage.allowFrom`.
- Top-level `approvals.exec.enabled` is true.
- Top-level `approvals.exec.mode` includes session delivery. Omitted mode defaults should be treated as session-capable, but record the actual profile state in proof.
- The active harness/model actually invokes the bash exec tool.
- The effective exec policy requires approval for the command being tested.
- The iMessage native approval route is active for the same source conversation.

iMessage does not use a channel-specific `channels.imessage.execApprovals` block. Keep the test grounded in the top-level `approvals.exec` and `approvals.plugin` config.

If the message response says:

```text
I can’t run local system commands from an unverified sender.
```

fix the sender allowlist/config first. That is an authorization/config issue.

If the response says:

```text
[blocked] ... shell exec here requires approval that isn’t available in-chat.
```

native in-chat exec approval is not available for the active route. Check top-level `approvals.exec`, session delivery, profile selection, and iMessage channel readiness.

If no exec approval appears, verify the harness before debugging iMessage. In prior testing, switching to the intended Pi/direct-tools harness and setting exec policy to always require approval was necessary before `Touch /tmp/foo` exercised the approval path.

## Log Watch

Start a focused log stream before sending the prompt. Save the raw log output under the proof `raw/` directory.

```sh
OPENCLAW_PROFILE=<profile> pnpm openclaw logs --follow --json --limit 0 2>/dev/null \
  | jq --unbuffered -Rrc '
      fromjson?
      | select(.type=="log")
      | (.raw | try fromjson catch {}) as $raw
      | (try (((($raw._meta.name? // "{}") | tostring) | fromjson).subsystem) catch "") as $subsystem
      | select(
          ($subsystem | tostring | startswith("imessage"))
          or $subsystem == "gateway/exec-approvals"
          or ($subsystem | tostring | contains("approval"))
        )
      | {time:.time, subsystem:$subsystem, message:($raw.message // .message // "")}
    '
```

Useful evidence includes:

- `exec.approval.requested` or gateway exec approval request handling.
- iMessage approval delivery through `imessage/approvals`.
- one delivered approval prompt, not both a native prompt and a local `Approval required. Run:` source reply.
- reaction/tapback handling or poller resolution after the user reacts.

## Expected Exec Approval Proof

For an enabled exec approval route, the proof is complete only when the real Messages surface shows:

- exactly one approval prompt for the inbound command
- reaction instructions such as `React with:` for supported approval reactions
- manual `/approve <id> <decision>` fallback text
- no second local fallback message that starts with `Approval required. Run:`
- a visible resolved state after `👍` or `👎`

Run at least two fresh approval prompts when asked to prove both allow and deny:

- `👍` maps to `allow-once`.
- `👎` maps to `deny`.
- `♾️` maps to `allow-always` only when the iMessage bridge delivers it as a bindable reaction. If not, prove allow-always with `/approve <id> allow-always` instead.

For duplicate-suppression proof, screenshot the Messages app after the approval prompt is visible and again after resolution. The screenshot must show the real chat surface, not only terminal logs.

## Expected Plugin Approval Proof

Plugin approval proof may use `claw-debug send-approval --type plugin imessage ...` when the goal is native delivery and reaction handling. It does not prove the bash-tool local exec suppression path.

For a plugin approval, verify:

- the native iMessage approval request appears once
- the prompt includes the plugin/tool metadata
- `👍`, `👎`, and supported `♾️` reactions resolve the intended decision
- manual `/approve plugin:<id> <decision>` still works when needed
- unauthorized or stale reactions do not resolve the request

## Reaction Troubleshooting

If a visible tapback does nothing, check these before changing code:

- The reaction was added to the approval prompt message itself, not to the final resolved message.
- The approval prompt had a stable iMessage GUID. Reaction prompts must not be considered successful if they cannot be bound to a stable reacted-to message id.
- The actor is authorized by the iMessage approval config.
- The reaction is a supported approval reaction: `👍`, `👎`, or supported `♾️`.
- The approval has not already resolved or expired.
- The gateway was restarted after the worktree build that added the reaction poller/suppression changes.

iMessage may observe reactions from live watch events or from polling recent Messages history. Give the poller a short window before declaring a failure, but save logs that show whether polling ran.

## Common Failure Modes

`Not Delivered` in Messages:
Use the direct SMS thread for the approved number. Group routing was not reliable for this proof path.

Old approval text or no `React with:` hint:
The running gateway is likely stale or using the wrong checkout/profile. Rebuild from `/Users/kevinlin/code/openclaw` and restart the selected profile.

Two approval replies:
The native approval prompt was delivered, but the bash-tool local `approval-pending` source reply was not suppressed. Confirm the current iMessage channel has `shouldSuppressLocalPayloadPrompt`, the profile has top-level session exec approvals enabled, the native route is active, and the inbound route is direct/eligible.

`missing scope: operator.write`:
Treat this as a profile/operator scope problem first. iMessage reply/action delivery can require write-scoped Gateway access in addition to approval resolution. Check the active profile config and credentials before editing code.

No exec approval at all:
Check that the active harness uses tools that can call bash exec, and that the exec policy requires approval for the command. A harmless or auto-allowed command, wrong harness, wrong profile, or wrong gateway process can all bypass the intended approval proof.

`unverified sender`:
The sender is not allowed for the iMessage route. Update only the intended profile config, then restart and retest.

Duplicate Bonjour/probe errors:
There is probably another gateway instance advertising the same service. Stop or separate the duplicate gateway before collecting proof.

## Proof Requirements

iMessage approval proof is complete only when all of these are true:

- the selected profile and route were recorded
- the test message was sent only to an approved target
- the real Messages conversation shows the approval request
- the request appears exactly once for local exec suppression tests
- the decision was made from the Messages surface by reaction or typed `/approve`
- the gateway observed the expected approval result
- raw logs and screenshots were saved under the proof `raw/` directory
- at least one screenshot of the Messages surface was shown inline in the conversation before final handoff
