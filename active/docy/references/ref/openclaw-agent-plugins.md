# OpenClaw Agent Plugin Authoring

Use before creating a new OpenClaw plugin or expanding an existing plugin's
surface area.

## Core model

- Treat a plugin as an ownership boundary for a company or a feature, not as a
  grab bag of unrelated integrations.
- Prefer one cohesive plugin that owns related capabilities together. For
  example, a vendor plugin can own text inference, speech, media understanding,
  and image generation in one place.
- For new plugins, prefer explicit capability registration
  (`registerProvider`, `registerChannel`, `registerSpeechProvider`, and similar)
  over new hook-only designs.
- Hook-only plugins remain supported for compatibility, but for new behavior
  prefer typed hooks such as `before_model_resolve` for model/provider override
  work and `before_prompt_build` for prompt mutation.
- Let core own shared contracts and registries. Let plugins own vendor-specific
  or feature-specific behavior. Channels and feature plugins should consume
  shared `api.runtime.*` helpers instead of reaching into vendor plugin code.

## Manifest-first design

- Put discovery-time and validation-time facts in `openclaw.plugin.json`.
  OpenClaw should be able to discover the plugin, validate config, and explain
  enablement or disablement without executing plugin runtime code.
- Keep runtime behavior in the plugin entry's `register(api)` path.
- Use `definePluginEntry` for non-channel plugins.
- Use `defineChannelPluginEntry` for messaging channels so registration-mode
  handling stays consistent.
- Add `setup-entry.ts` with `defineSetupPluginEntry` when a disabled or optional
  channel still needs setup-time surfaces before the full runtime loads.

## Registration guidance

- Register each capability explicitly through the plugin API. Capability
  registration is the public native-plugin model in OpenClaw.
- Multi-capability plugins are fine when the surface is cohesive. Split plugins
  by ownership boundary, not by incidental helper file layout.
- Keep plugin CLI discovery lazy when possible. For root commands, prefer
  `registerCli(..., { descriptors: [...] })`; channel plugins should keep
  parse-time root command descriptors in `registerCliMetadata(...)`.
- Keep heavy SDK bootstraps, long-lived services, and runtime-only work in full
  registration mode. Setup-only or CLI-metadata paths should stay lightweight.
- Use `openclaw plugins inspect <id>` to verify the resulting plugin shape and
  registered capability breakdown.

## Boundaries and seams

- External plugins should import only public `openclaw/plugin-sdk/*` subpaths.
- Do not import another plugin package's `src/*`, whether from core or from
  another extension.
- Within a bundled plugin, keep provider-specific or channel-specific helpers on
  local `api.ts` or `runtime-api.ts` barrels unless the helper is genuinely
  generic and belongs in the shared SDK.
- Prefer new generic SDK seams over new channel-branded or provider-branded
  shared seams. If only one bundled plugin needs a helper, keep it local.
- For channel plugins, keep action execution runtimes in the plugin's own
  modules. Core should not own Slack-, Discord-, Telegram-, or similar
  channel-specific runtimes.

## Plugin SDK import paths

Use focused `openclaw/plugin-sdk/<subpath>` imports instead of the monolithic
`openclaw/plugin-sdk` barrel.

- `openclaw/plugin-sdk/plugin-entry`
  Use for non-channel plugin entry files, `definePluginEntry`, and plugin
  registration primitives such as `OpenClawPluginDefinition`.
- `openclaw/plugin-sdk/channel-core`
  Use for channel entry files, `defineChannelPluginEntry`, and
  `defineSetupPluginEntry`.
- `openclaw/plugin-sdk/core`
  Use for generic shared plugin-facing contract types or helpers when there is
  no narrower stable subpath.
- `openclaw/plugin-sdk/config-schema`
  Use when a plugin needs the root `openclaw.json` Zod schema export
  (`OpenClawSchema`).
- `openclaw/plugin-sdk/channel-setup`
  Use for optional-install channel setup surfaces and install-aware setup
  adapters or wizards.
- `openclaw/plugin-sdk/setup-runtime`
  Use for runtime-safe setup helpers that must work before the full plugin
  runtime loads.
- `openclaw/plugin-sdk/setup-adapter-runtime`
  Use for env-aware account-setup adapter seams.
- `openclaw/plugin-sdk/setup-tools`
  Use for setup/install CLI, archive, and docs helpers such as command
  formatting or archive extraction.
- Capability-specific subpaths such as
  `openclaw/plugin-sdk/media-understanding`,
  `openclaw/plugin-sdk/speech`,
  `openclaw/plugin-sdk/realtime-transcription`,
  `openclaw/plugin-sdk/realtime-voice`,
  `openclaw/plugin-sdk/image-generation`,
  `openclaw/plugin-sdk/music-generation`, and
  `openclaw/plugin-sdk/video-generation`
  Use when implementing provider-owned capability contracts or reusing shared
  helpers that belong to those contracts.
- Runtime and config helper subpaths such as
  `openclaw/plugin-sdk/runtime-store`,
  `openclaw/plugin-sdk/routing`,
  `openclaw/plugin-sdk/reply-history`,
  `openclaw/plugin-sdk/status-helpers`,
  `openclaw/plugin-sdk/text-runtime`,
  `openclaw/plugin-sdk/command-auth`,
  `openclaw/plugin-sdk/secret-input`, and
  `openclaw/plugin-sdk/webhook-ingress`
  Use when the helper is already a generic shared runtime/config concern. Do
  not recreate local variants first.
- Avoid `openclaw/plugin-sdk` root imports in new code.
- Avoid `openclaw/plugin-sdk/channel-runtime` in new code; it is a deprecated
  compatibility shim.
- Treat bundled-plugin seams such as `openclaw/plugin-sdk/feishu-setup` or
  `openclaw/plugin-sdk/zalo-setup` as reserved compatibility surfaces, not as
  the default pattern for new external plugins.

## Routes, commands, and services

- Keep custom gateway RPC methods on a plugin-specific prefix. Reserved core
  admin namespaces such as `config.*`, `exec.approvals.*`, `wizard.*`, and
  `update.*` stay core-owned.
- Plugin HTTP routes must declare `auth` explicitly.
- Use `auth: "plugin"` for plugin-managed webhooks or signature verification,
  not for privileged gateway helper calls.
- Use `auth: "gateway"` only when the route truly participates in gateway
  runtime auth, and document any required identity-bearing auth mode or
  explicit scope/header contract.
- For channels, let the shared `message` tool remain core-owned while the plugin
  owns channel-specific action discovery, schema fragments, and final execution.

## Verification checklist

- `openclaw.plugin.json` exists and matches the entry-point `id`.
- The plugin entry uses the correct helper (`definePluginEntry`,
  `defineChannelPluginEntry`, or `defineSetupPluginEntry`).
- Imports use focused `plugin-sdk/<subpath>` paths.
- Internal imports use local modules or local plugin barrels, not SDK self-imports.
- Capability ownership is explicit and cohesive.
- Tests cover the registered surface, and `openclaw plugins inspect <id>`
  matches the intended shape.
