# OpenClaw Image Build Workflow

Use these patterns after reading the repo's current `Dockerfile` and `docs/install/docker.md`. Adjust tags to the user request. Keep `@openclaw/codex`, `@openclaw/slack`, and `@openclaw/diagnostics-otel` as the default required plugin set unless the user explicitly narrows or changes it.

## Source Preflight

```bash
git status -sb
git remote show origin | sed -n 's/.*HEAD branch: //p'
git fetch --no-tags origin
# If clean and the default branch is main:
git pull --ff-only --no-tags origin main
source_sha="$(git rev-parse HEAD)"
short_sha="$(git rev-parse --short=10 HEAD)"
version="$(node -p "require('./package.json').version")"
docker buildx ls
```

If the worktree is dirty, do not pull. Report the dirty state and ask before syncing or changing worktrees. If the user asked for a new worktree, create it from the latest fetched upstream default branch and record the full source SHA. If the prompt says `origin/master` but the repo default is `main`, use the default branch and state that correction in the report.

## Package Preflight

For same-source bundled plugin images, inspect source manifests and confirm version alignment from the checkout. By default, include Codex, Slack, and diagnostics-otel:

```bash
node - <<'NODE'
const fs = require("fs");
for (const file of [
  "package.json",
  "extensions/codex/package.json",
  "extensions/slack/package.json",
  "extensions/diagnostics-otel/package.json",
]) {
  const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(`${file} ${pkg.name ?? "openclaw"} ${pkg.version}`);
}
NODE
```

Do not use older published npm plugin packages with a newer OpenClaw source build when the repository can build the plugins from source. Use `npm view @openclaw/<plugin> version dist.tarball --json` only when the user explicitly asks for an external npm-plugin image.

## Self-Contained Bundled Image

For the standard source-bundled Codex, Slack, and diagnostics image, build through the repo Dockerfile with the default required plugins in the Docker extension keep-list:

```bash
IMAGE="ghcr.io/kevinslin/openclaw"
OPENCLAW_SHA="$(git rev-parse HEAD)"
short_sha="$(git rev-parse --short=10 HEAD)"
version="$(node -p "require('./package.json').version")"
created="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

for platform in linux/amd64 linux/arm64; do
  arch="${platform#linux/}"
  docker buildx build \
    --progress=plain \
    --platform "$platform" \
    --push \
    --build-arg OPENCLAW_EXTENSIONS=diagnostics-otel,codex,slack \
    --label "org.opencontainers.image.revision=${OPENCLAW_SHA}" \
    --label "org.opencontainers.image.version=main" \
    --label "org.opencontainers.image.created=${created}" \
    -t "${IMAGE}:main-${short_sha}-${arch}" \
    -f Dockerfile \
    .
done
```

Use `--load` plus `docker push` for an architecture tag if BuildKit push hangs, then inspect the remote tag before manifest assembly. Do not modify or replace plugin contents after the final packaging stage.

The final runtime image must include:

- `/app/extensions/{codex,slack,diagnostics-otel}/package.json`
- `/app/dist/extensions/{codex,slack,diagnostics-otel}/openclaw.plugin.json`
- `/app/dist/extensions/{codex,slack,diagnostics-otel}/index.js`
- required runtime dependencies, including Codex, Slack, and OpenTelemetry packages.
- source maps, assets, and generated output required by discovery or runtime loading, unless the repository's standard production packaging intentionally prunes them.

There must be no Dockerfile, entrypoint, deployment, or helper path that manually installs `@openclaw/diagnostics-otel` at startup. Replace that with packaged plugin inventory coverage.

## Codex Image Contract Gate

Make the Codex image an artifact-level CI gate, not merely proof that the OpenClaw source build passed. Run this gate for every base-image update or OpenClaw-source update that can affect the Codex image.

Build reproducibly from an immutable OpenClaw commit:

```bash
OPENCLAW_SHA="$(git rev-parse HEAD)"
docker build \
  --pull \
  --build-arg OPENCLAW_EXTENSIONS=codex \
  --label org.opencontainers.image.revision="$OPENCLAW_SHA" \
  -t "openclaw-codex:${OPENCLAW_SHA}" \
  -f Dockerfile .
```

Fail the build if any packaging invariant regresses:

- `/app/extensions/codex/openclaw.plugin.json` exists.
- `/app/dist/extensions/codex/harness.js` exists.
- `@openclaw/codex` reports the expected version.
- `@openai/codex` and the correct Linux platform binary are installed.
- OCI revision label equals `$OPENCLAW_SHA`.
- OCI base digest equals the reviewed pinned base digest.

Run the #96872 behavioral contract against the built artifact:

1. Stub `app/list` with `isAccessible: true` and `isEnabled: false`.
2. Configure the app's owning Codex plugin as enabled.
3. Start a thread through the image's compiled Codex harness.
4. Assert the outgoing `thread/start` payload contains:

```json
{
  "config": {
    "apps": {
      "google-calendar-app": {
        "enabled": true
      }
    }
  }
}
```

This assertion is the critical regression guard: per-thread OpenClaw policy must override the cached global disabled state for an accessible app.

Run the proof from a dedicated validation stage or external test harness. Do not depend on running source Vitest directly in the production image; the runtime image intentionally prunes some TypeScript build configuration.

Publish evidence with every Codex image build:

- OpenClaw source SHA.
- Exact build command.
- Image tag.
- Local image ID or pushed manifest digest.
- Base-image digest.
- Codex and `@openai/codex` versions.
- Behavioral-test result.

The preferred permanent lane is a small CI job named `codex-image-contract` that runs when `Dockerfile`, base-image digest pins, plugin pruning/build scripts, `extensions/codex/**`, or Codex dependency lock entries change. Static file checks catch packaging failures; the `thread/start` assertion catches the #96872 behavior regression.

## Local Dist Build

When assembling runtime images from a local build:

```bash
pnpm install --frozen-lockfile
perl -e 'alarm shift; exec @ARGV' 900 \
  env OPENCLAW_EXTENSIONS='diagnostics-otel,codex,slack' \
  OPENCLAW_TSDOWN_MAX_OLD_SPACE_MB=8192 \
  NODE_OPTIONS=--max-old-space-size=8192 \
  pnpm_config_verify_deps_before_run=false \
  pnpm build:docker
env OPENCLAW_PREFER_PNPM=1 pnpm_config_verify_deps_before_run=false pnpm ui:build
```

If the repo Dockerfile can build the desired image directly, prefer it. Use local-dist runtime assembly only to avoid known cross-arch source compile failures or to install official external plugins into the final image.

## Runtime Assembly Pattern

Build one platform at a time and push arch-specific tags. Use BuildKit named context because repo `.dockerignore` excludes `dist`.

Template choices:

- source context: current OpenClaw repo root;
- named context: `--build-context built_dist=./dist`;
- base tag: `ghcr.io/kevinslin/openclaw:main-<short_sha>`;
- arch tags: `<baseTag>-amd64`, `<baseTag>-arm64`;
- final tags: `main`, `main-<short_sha>`, `<version>-main-<short_sha>`, plus any user-specific tag such as `codex-<pluginVersion>-main-<short_sha>`.

In the final image stage, install official plugin packages as the non-root `node` user:

```dockerfile
USER node
RUN set -eux; \
    mkdir -p /home/node/.openclaw/npm-cache /home/node/.openclaw/tmp; \
    node openclaw.mjs plugins install npm:@openclaw/codex@2026.6.10; \
    node openclaw.mjs plugins install npm:@openclaw/slack@2026.6.10; \
    node openclaw.mjs plugins enable codex; \
    node openclaw.mjs plugins enable slack; \
    node openclaw.mjs plugins inspect codex --json >/tmp/openclaw-codex-inspect.json; \
    node openclaw.mjs plugins inspect slack --json >/tmp/openclaw-slack-inspect.json; \
    find /home/node/.openclaw/npm/projects -path '*/node_modules/@openclaw/codex/package.json' | grep -q .; \
    find /home/node/.openclaw/npm/projects -path '*/node_modules/@openclaw/slack/package.json' | grep -q .
```

Use this plugin-store installation pattern only for images that intentionally package external npm plugins. Do not use it for self-contained same-source bundled images, and do not add a runtime installation script for `diagnostics-otel`. Do not use `pnpm add -w` inside the runtime image to make official plugins root dependencies; the runtime workspace is intentionally pruned and can fail on missing workspace packages.

## Manifest Publish

```bash
docker buildx imagetools create \
  -t ghcr.io/kevinslin/openclaw:main \
  -t ghcr.io/kevinslin/openclaw:main-${short_sha} \
  -t ghcr.io/kevinslin/openclaw:${version}-main-${short_sha} \
  ghcr.io/kevinslin/openclaw:main-${short_sha}-amd64@sha256:<amd64-manifest-digest> \
  ghcr.io/kevinslin/openclaw:main-${short_sha}-arm64@sha256:<arm64-manifest-digest>
```

Include extra `-t` values requested by the user.

## Published Verification

Manifest and package visibility:

```bash
docker buildx imagetools inspect ghcr.io/kevinslin/openclaw:main-${short_sha}
docker buildx imagetools inspect ghcr.io/kevinslin/openclaw:main-${short_sha} --raw | shasum -a 256
gh api /users/kevinslin/packages/container/openclaw --jq '{name,visibility,updated_at}'
gh api '/users/kevinslin/packages/container/openclaw/versions?per_page=10' \
  --jq 'map({id,updated_at,tags:.metadata.container.tags}) | .[0:5]'
```

Fail closed if the pushed image cannot be resolved by immutable digest. Do not use mutable tags as the final source of truth.

Same-source bundled plugin availability from the pulled image:

```bash
IMAGE="ghcr.io/kevinslin/openclaw@sha256:<manifest-digest>"
docker run --rm --pull always --platform linux/amd64 --entrypoint sh "$IMAGE" -lc '
set -e
printf "version="; node openclaw.mjs --version
node openclaw.mjs plugins list --json --verbose >/tmp/plugins.json
for plugin in codex slack diagnostics-otel; do
  node openclaw.mjs plugins inspect "$plugin" --runtime --json >/tmp/${plugin}.json
done
node - <<'"'"'NODE'"'"'
const fs = require("fs");
const expectedVersion = JSON.parse(fs.readFileSync("/app/package.json", "utf8")).version;
for (const id of ["codex", "slack", "diagnostics-otel"]) {
  const pkgPath = `/app/extensions/${id}/package.json`;
  const manifestPath = `/app/dist/extensions/${id}/openclaw.plugin.json`;
  const entryPath = `/app/dist/extensions/${id}/index.js`;
  for (const file of [pkgPath, manifestPath, entryPath]) {
    if (!fs.existsSync(file)) throw new Error(`missing ${file}`);
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.version !== expectedVersion) throw new Error(`${id} version ${pkg.version} != ${expectedVersion}`);
  console.log(`${id} package=${pkg.version} manifest=present entrypoint=present`);
}
for (const dep of [
  "/app/node_modules/@openai/codex/package.json",
  "/app/node_modules/@slack/bolt/package.json",
  "/app/node_modules/@slack/web-api/package.json",
  "/app/node_modules/@opentelemetry/sdk-node/package.json",
]) {
  if (!fs.existsSync(dep)) throw new Error(`missing dependency ${dep}`);
}
NODE
'
```

Run the final pushed image as a server and prove `/healthz` returns HTTP 200. Then run it after pulling with `--network none` and prove `/healthz`, plugin discovery, and runtime inspect still succeed without outbound network access. Startup logs must not contain `plugins install`, `npm install`, `pnpm install`, `module not found`, `cannot find module`, or missing-dependency errors.

Repeat platform pull verification for `linux/amd64` and `linux/arm64`.

## Focused Regression Coverage

Add or update focused coverage when image packaging changes:

- `diagnostics-otel` is included in packaged extension inventory.
- Codex and Slack remain bundled when requested.
- Plugin manifests and entrypoints exist in the final image.
- Required runtime dependencies are included.
- Docker build logic does not manually install `@openclaw/diagnostics-otel`.
- OpenClaw and requested plugin package versions match the intended source version.
- Plugin discovery succeeds in an offline pulled container.
- Existing packaging tests continue to pass.

## Secret Hygiene

Scan names and metadata only. Never print env values, registry tokens, credentials, or Docker auth configuration.

```bash
for platform in linux/amd64 linux/arm64; do
  echo "platform=$platform"
  docker run --rm --pull always --platform "$platform" --entrypoint env \
    ghcr.io/kevinslin/openclaw:main-${short_sha} \
    | awk -F= 'BEGIN{IGNORECASE=1} $1 ~ /(^|_)(SECRET|TOKEN|PASSWORD|PRIVATE_KEY|API_KEY|ACCESS_KEY|AUTH|COOKIE|SESSION)($|_)/ {print $1}' \
    | sort -u
done

for tag in main-${short_sha}-amd64 main-${short_sha}-arm64; do
  count=$(docker history --no-trunc "ghcr.io/kevinslin/openclaw:$tag" \
    | awk 'BEGIN{IGNORECASE=1} /(^|[^A-Z0-9_])(SECRET|TOKEN|PASSWORD|PRIVATE_KEY|API_KEY|ACCESS_KEY|COOKIE|SESSION)([^A-Z0-9_]|$)/ {count++} END{print count+0}')
  echo "$tag history_sensitive_keyword_lines=$count"
done
```

## Live Smoke

If the user asks to verify a Slack channel/profile by doing a turn, treat that as mandatory acceptance. Start the published image with the requested profile/channel setup, send the turn through Slack, and verify delivery from the channel transcript. Do not replace this with local plugin inspection.
