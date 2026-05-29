---
name: claw-integ
description: Run live OpenClaw integration proof against a named claw gateway profile with showboat-v2.
dependencies:
  - mem
  - showboat-v2
---

# claw-integ

Use this skill when the user invokes `$claw-integ` to prove OpenClaw behavior against a live claw gateway profile.

Usage:

```text
$claw-integ [profile] "test it"
```

`profile` is optional. Default to `dev` when omitted.

## Contract

Run a live integration proof through the requested claw gateway profile and capture the evidence with `../showboat-v2/SKILL.md`.

Do not use Showboat to wrap existing unit tests. The proof must exercise the expected behavior through the live gateway/TUI or the closest repo-supported live gateway client path.

When testing exec or plugin approvals, read `./references/approvals.md` before starting the live run.

When testing Signal channel delivery or Signal-backed approvals, read `./references/signal.md` before starting the live run.

When testing iMessage or SMS-backed approvals, read `./references/imessage.md` before starting the live run.

## Approval Proof Matrix

When the live run tests exec or plugin approval delivery, create a row-by-row proof matrix before triggering requests. The proof is incomplete until every user-requested row is either observed with artifacts or recorded with a specific blocker.

Include rows for the relevant approval family and channel states:

- delivery enabled: request is delivered to the expected channel surface.
- reaction or native action: the requested decision resolves as expected.
- manual `/approve`: `allow-always` or any requested slash-command fallback works when applicable.
- delivery disabled: no approval request is delivered to that channel and fallback is not suppressed.
- unauthorized actor: the attempted reaction/action does not resolve the approval.
- negative reaction/input: unsupported reactions or stale inputs do not resolve the approval when the user asked for that case.

For each row, record the exact command or live action, expected result, observed result, raw artifact path, and screenshot/photo path when the user asks for visual proof. Do not summarize the approval suite as complete from unit tests alone.

## Profile Selection

1. Resolve the OpenClaw repo root.
   - Prefer the current git root when it is the OpenClaw repo.
   - Otherwise use `/Users/kevinlin/code/openclaw` unless the user gives another path.
2. Resolve the profile name.
   - If the user passes no profile, use `dev`.
   - If the user passes `dev`, use the dev profile as-is.
   - If the user passes another profile, check whether that profile already exists.
   - If it exists, use it as-is.
   - If it does not exist, create it by copying values from `dev`.
3. Never overwrite an existing non-dev profile unless the user explicitly asks.
4. Do not print secrets, auth tokens, refresh tokens, or provider credentials.

OpenClaw profile state is conventionally resolved as:

```text
dev: ~/.openclaw-dev
prod: ~/.openclaw
<profile>: ~/.openclaw-<profile>
```

Profile existence is a local state check: the profile exists when the matching state directory exists and contains an `openclaw.json`. Prefer profile-aware CLI commands for operation, but use these paths for existence checks and redacted summaries.

## Gateway Setup

Use the selected profile's claw gateway. Prefer repo-local or documented profile-aware commands over ad hoc global state changes.

Before running the proof:

1. Confirm the gateway profile config points at the intended profile.
2. Confirm the gateway is running or start/restart it with the repo-supported command.
3. Record a redacted config summary in the proof, including:
   - profile name
   - gateway URL or port
   - enabled OpenClaw plugin/extension relevant to the test
   - destructive-action or approval settings relevant to the test
4. If the test needs a specific app/plugin setup, use the product migration or setup command that the profile would use in production. Do not manually symlink plugin/cache/auth files unless the user explicitly asks.

For `dev`, use the dev profile and dev gateway/TUI path:

```sh
pnpm gateway:dev
pnpm tui:dev
```

For a non-dev profile, use profile-scoped commands from the repo root:

```sh
OPENCLAW_PROFILE=<profile> pnpm openclaw gateway status --deep --require-rpc
OPENCLAW_PROFILE=<profile> pnpm openclaw gateway restart
OPENCLAW_PROFILE=<profile> pnpm openclaw tui
```

If the test needs Codex plugins, ensure the selected profile has the required `allow_destructive_actions` or equivalent policy before the live invocation, and record the redacted setting in the proof.

## Existing App Approval Runs

When testing approvals through an existing channel app such as WhatsApp, Signal, iMessage, SMS, or a browser-backed sender, do this preflight before sending the first live message:

1. Confirm the requested harness and runtime path.
   - If the user asks for Pi harness, verify the profile config is not pointing at the Codex app server.
   - If the user asks for Codex harness, verify the app-server path intentionally points at Codex.
   - Record the redacted harness/app-server summary before changing anything.
2. Confirm the selected profile's concrete state path.
   - `prod` resolves to `~/.openclaw`, not `~/.openclaw-prod`.
   - Use user-provided profile instructions as runtime input; do not bake profile-specific paths into scenario docs.
3. Confirm the requested launch surface.
   - If the user asks for iTerm or another visible app launch, use that surface for the live run.
   - Do not switch to LaunchAgent, tmux, or a background service for an existing-app proof unless the user explicitly asks.
4. Confirm the target channel and plugin are active in the selected profile.
   - Record the enabled channel/plugin ids, relevant approval config, and any installed local plugin path in redacted form.
   - For plugin approval tests, confirm the plugin is installed and enabled before sending a message that asks the model to call it.
5. Use one nonce per row and carry it through the outbound message, logs, screenshots, and proof matrix.

Split every approval row into two gates:

- request-created gate: prove the approval request exists before attempting to approve or deny it.
- decision gate: only after the request exists, prove accept and deny resolve the expected pending request.

For plugin approvals, the request-created gate must include evidence that the plugin call actually reached the approval path, such as `plugin.approval.waitDecision`, a pending item from `plugin.approval.list`, or the equivalent channel/runtime artifact. If the model sends a normal reply without calling the plugin, record that as a plugin-invocation blocker rather than testing accept or deny.

For exec approvals, similarly prove the exec approval request exists before acting on it. Do not infer plugin approval health from exec approval success; they use different approval namespaces and may fail independently.

Keep log collection narrow. Search by nonce, channel session id, request id, or the selected profile's known log/session files. Avoid broad recursive scans of the entire profile directory when it can include caches, `node_modules`, or old session artifacts.

## Video Proof

Capture video proof with `ffmpeg` for every live `$claw-integ` run when feasible.

Store video artifacts under `<proof-root>/raw/`:

- `<scenario-slug>.mp4`: the proof video
- `<scenario-slug>.ffprobe.txt`: `ffprobe` metadata for the MP4
- `<scenario-slug>.video-notes.md`: capture method, command, duration, and any cropping/redaction notes

Start recording before the live action and stop only after the expected result is visible. Include the video and `ffprobe` files in the Showboat raw artifact index and scenario result.

For terminal, prompt, menu, or TUI behavior, prefer privacy-safe tmux-pane video over full desktop capture:

1. Drive the interaction through `tmux`.
2. Capture pane snapshots during the run into `raw/<scenario-slug>.frames/` or an equivalent temporary frame directory.
3. Render those snapshots to images if needed.
4. Encode the frames with `ffmpeg`:

```sh
ffmpeg -hide_banner -y -framerate 1 \
  -i "<frames-dir>/frame_%04d.png" \
  -c:v libx264 -pix_fmt yuv420p -r 30 -movflags +faststart \
  "<proof-root>/raw/<scenario-slug>.mp4"
```

For browser or graphical UI behavior that cannot be proven from tmux output, use `ffmpeg` screen capture with the narrowest feasible capture area. Avoid recording unrelated private windows. On macOS, first list devices:

```sh
ffmpeg -hide_banner -f avfoundation -list_devices true -i ""
```

Then capture the intended screen only, adding crop filters when needed:

```sh
ffmpeg -hide_banner -y -f avfoundation -framerate 30 \
  -i "<screen-index>:none" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  "<proof-root>/raw/<scenario-slug>.mp4"
```

Verify every produced video:

```sh
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,width,height,duration,nb_frames \
  -of default=noprint_wrappers=1 \
  "<proof-root>/raw/<scenario-slug>.mp4" \
  > "<proof-root>/raw/<scenario-slug>.ffprobe.txt"
```

If `ffmpeg` is unavailable, screen-recording permission is blocked, or recording would expose unrelated private content, save blocker evidence under `raw/`, keep the non-video Showboat proof intact, and report the gap directly.

## Inline Screenshot Proof

For live integration proof, the conversation itself must include image proof, not only a path, PR link, video, or Showboat artifact.

Capture at least one still screenshot of the actual channel surface being tested and store it under `<proof-root>/raw/`:

- TUI or terminal proof: capture the tmux pane or terminal window showing the tested prompt/result.
- WhatsApp, Telegram, Slack, Discord, Matrix, browser, or app proof: capture the real channel/app surface showing the tested message, approval, reaction, reply, or resolved state.
- Approval proof: include both the approval request and the visible resolved/denied/allowed state when feasible.

Before final handoff, show that screenshot inline in the thread using the chat surface's supported image mechanism. If a local path will not render inline, upload or attach the redacted screenshot through an approved artifact/image path and embed that image. The final answer must also name the saved raw screenshot path.

If screenshot capture or inline display is blocked, the integration proof is incomplete for user-facing purposes. Save blocker evidence under `raw/`, state the blocker directly, and do not imply that full proof was shown inline.

## Showboat Proof

Use `../showboat-v2/SKILL.md` for every `$claw-integ` run.

The proof directory is a durable artifact. Before choosing the proof path, invoke `../mem/SKILL.md` and resolve the OpenClaw memory base, root, schemas, and file rules. Do not infer the target from a cwd-relative `.mem` path; `$mem` may resolve to any configured folder. If `$mem` cannot resolve a suitable OpenClaw proof base, ask before falling back to a workspace-local proof directory.

Use these OpenClaw-specific values with `showboat-v2`:

- `<proofs-root>`: the concrete root/path resolved from `$mem claw/main proofs`, otherwise the explicitly approved fallback proof root.
- `<proof-slug>`: `demo-{num}-{profile}-{slug}`.
- `<proof-root>`: `<proofs-root>/<proof-slug>`.
- `<scenario-slug>`: a short behavior slug; use one scenario file per distinct behavior path.

Report the selected `$mem` base name, resolved root, and final `<proof-root>` in the handoff so wrong-root writes are auditable.

Follow `showboat-v2` to materialize `proof.md` and each `scenario/<scenario-slug>.md`, create `raw/` and `scripts/`, and capture the stable Showboat summary at:

```text
<proof-root>/raw/showboat-summary.md
```

The proof must include:

1. `proof.md` with the claim, expected behavior, target details, status, scenario results, and raw artifact index.
2. At least one `scenario/<scenario-slug>.md` describing the requested profile, test prompt, preconditions, relevant redacted config, live action, expected result, observed result, and raw artifact links.
3. The exact setup or migration command used for required live apps/plugins.
4. The live gateway/TUI invocation or gateway request that exercises the behavior.
5. A deterministic summary of the observed result.
6. Video proof and `ffprobe` metadata under `raw/`, or explicit blocker evidence if video capture was not feasible.
7. At least one still screenshot of the tested channel surface under `raw/`, plus inline display of that screenshot in the conversation before final handoff.
8. Raw nondeterministic output under `raw/`, not embedded directly in a way that breaks `showboat verify`.
9. A final `uvx showboat verify <proof-root>/raw/showboat-summary.md` pass.

When the output includes timestamps, temp paths, session ids, event ids, or stochastic model text, save raw output under `raw/` and capture a stable summary command in the verified Showboat summary.

## Profile Copy From dev

When a requested profile is not `dev` and does not exist:

1. Verify `dev` exists.
2. Create the requested profile by copying values from `dev`.
3. Prefer a repo-supported profile/config command if one exists.
4. If no command exists, copy the `dev` state directory to the requested profile state directory:

```sh
cp -R "$HOME/.openclaw-dev" "$HOME/.openclaw-<profile>"
```

This intentionally copies local state and credentials for a local integration profile. Do not print copied secret values, and never commit the copied state.
5. If only the config values are needed and full state copy would be excessive, copy `~/.openclaw-dev/openclaw.json` into a newly created `~/.openclaw-<profile>/openclaw.json`, then document that narrower fallback in the proof directory.
6. Re-read the new profile config after creation and record a redacted summary in the proof directory.
7. Stop if `dev` is missing or ambiguous; do not guess values.

## Completion Criteria

The run is complete only when:

- the requested profile was selected or created from `dev`
- the claw gateway for that profile was used
- the requested behavior was exercised live
- ffmpeg video proof was captured under `raw/`, or a video-capture blocker was saved there
- a still screenshot of the tested channel surface was saved under `raw/` and shown inline in the conversation, or a screenshot/inline-display blocker was saved and reported
- the `showboat-v2` proof directory was materialized and filled
- `uvx showboat verify <proof-root>/raw/showboat-summary.md` passed
- the final answer reports the proof directory, profile used, observed result, and any untested gaps

If any step is blocked, save the partial proof directory with the blocker evidence and report the blocker directly.
