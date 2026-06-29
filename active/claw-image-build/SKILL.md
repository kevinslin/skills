---
name: claw-image-build
description: Build, publish, and verify OpenClaw Docker/GHCR images. Use when the user asks to build an OpenClaw image, publish or republish GHCR tags, bundle official plugins such as @openclaw/codex, @openclaw/slack, or @openclaw/diagnostics-otel, make or verify multi-arch linux/amd64 and linux/arm64 images, check GHCR visibility, secret-scan an image, enforce Codex image contract gates, or prove a published OpenClaw Docker image works.
dependencies: []
---

# Claw Image Build

Use this skill for OpenClaw container image work from source checkout to published GHCR proof.

## Contract

1. Work from the current OpenClaw checkout unless the user explicitly asks for another worktree.
2. Respect the repo `AGENTS.md`: do not switch worktrees for git mutations, do not print secrets, do not print Docker auth configuration, and verify live sources when requested.
3. Pull or checkout exactly what the user asked for before building. If the worktree is dirty, stop before `git pull` and report the dirty state. If the user asks for a new worktree, create it from the latest upstream default branch and preserve unrelated local changes.
4. Read `docs/install/docker.md` and the relevant package manifests before choosing build args or plugin install strategy. Unless the user explicitly narrows or changes the plugin set, require `@openclaw/codex`, `@openclaw/slack`, and `@openclaw/diagnostics-otel`.
5. Resolve "latest" from the repository's actual upstream default branch. If a prompt says `origin/master` but the default branch is different, fetch the default branch, record the exact commit, and state the branch name used.
6. Build multi-arch images when requested; include `linux/amd64` explicitly for x86_64/amd64 proof unless the user says otherwise.
7. Prefer `ghcr.io/kevinslin/openclaw` for Kevin's registry unless the user explicitly provides a different owner. Verify namespace and visibility with `gh api`.
8. Do not claim success from a local image only. Pull the published tag back from GHCR and verify the requested platforms.
9. Always run an image secret-hygiene pass before closeout when publishing or when the user asks about secrets.
10. Never deploy, restart, or modify any live gateway, devbox, or service while building or verifying images. Do not modify the OpenAI monorepo or its Applied spec as part of OpenClaw image work.
11. For Codex images or source/base-image updates affecting Codex, treat the built image itself as the artifact under test. Run the Codex image contract gate in `./references/workflow.md` before publishing or reporting success.

## Build Strategy

Use the repo Dockerfile and repository-native build pipeline when it can build the requested image directly. Do not rebase onto an unrelated runtime image and do not modify built plugin contents after the final packaging stage.

For self-contained source-bundled images, build OpenClaw and bundled plugins from the same source revision whenever the repository supports it. Do not combine a newer OpenClaw source build with older published plugin packages. The default required plugin set is `@openclaw/codex`, `@openclaw/slack`, and `@openclaw/diagnostics-otel`; use the repository's standard bundled-extension packaging location and build args, for example `OPENCLAW_EXTENSIONS=diagnostics-otel,codex,slack`, unless the user explicitly mentions a different plugin set. Preserve manifests, runtime dependencies, source maps, assets, and generated output required for plugin discovery and runtime loading.

`diagnostics-otel` is a first-class packaged plugin for these images. It must not require `openclaw plugins install`, npm installation, network access, or filesystem mutation at container startup. Do not add runtime installation scripts for it; remove or replace manual diagnostics installation logic with packaged plugin coverage.

If native Docker source compile fails under cross-arch emulation but the local source build passes, use the proven runtime-image assembly pattern from `./references/workflow.md`: build `dist` locally, then assemble per-platform runtime images with BuildKit `--build-context built_dist=./dist`. Use that fallback only when the repo Dockerfile cannot complete the requested source build.

For `@openclaw/codex` image work, build from an immutable OpenClaw commit with an OCI revision label, verify packaging and base-image digests inside the artifact, and run the #96872 thread/start behavioral contract from a validation stage or external harness. Do not rely on source Vitest running inside the production image.

For source-bundled plugins, "available" means:

- source package manifest exists under `extensions/<id>/package.json`;
- packaged manifest and entrypoint exist under `/app/dist/extensions/<id>/`;
- runtime dependencies needed by the plugin are present in the final image;
- `node openclaw.mjs plugins inspect <id> --runtime --json` succeeds from the pulled published image;
- startup logs contain no plugin install, npm install, module-resolution, or missing-dependency errors.

For external npm plugin images, "available" means:

- installed in the OpenClaw plugin store under `/home/node/.openclaw/npm/projects/.../node_modules/<package>/package.json`;
- enabled in config;
- `node openclaw.mjs plugins inspect <id> --json` reports `status: "loaded"` from the pulled published image.

Do not rely on `require.resolve("@openclaw/<plugin>/package.json")` from `/app` unless the image intentionally bundles that package as a root/runtime dependency. External official plugins may be plugin-store installs rather than root app dependencies.

## Workflow

1. Establish source and tags:
   - `git status -sb`
   - if clean and user asked for latest: fetch/pull the upstream default branch with the repo-required workflow
   - record `git rev-parse HEAD`, `git rev-parse --short=10 HEAD`, and `node -p "require('./package.json').version"`
   - determine and reuse the repository's existing snapshot/release tag convention; do not invent one.
2. Inspect docs and plugin packages:
   - `docs/install/docker.md`
   - `Dockerfile`
   - `extensions/<plugin>/package.json`
   - for source-bundled plugin images, verify OpenClaw and each default/requested plugin package report the same intended version from the same checkout.
   - use `npm view @openclaw/<plugin> version dist.tarball --json` only for images that intentionally install external npm plugin packages.
3. Build and push arch-specific tags first:
   - `<baseTag>-amd64`
   - `<baseTag>-arm64`
4. Create multi-arch tags with `docker buildx imagetools create`.
5. Verify GHCR:
   - manifest digest and platforms;
   - package visibility;
   - expected tag set.
6. Pull-run verify each requested platform:
   - OpenClaw version;
   - default/requested plugin discovery and runtime inspect output;
   - package manifests in plugin store when external npm plugins are requested;
   - packaged manifests, entrypoints, and runtime dependencies when source-bundled plugins are requested;
   - `/healthz` returns HTTP 200;
   - offline `--network none` startup succeeds after the image has been pulled.
7. Secret-scan:
   - container environment names only, never values;
   - `docker history --no-trunc` keyword count.
8. Run focused package, Docker, typecheck, and integration tests that cover changed packaging behavior, including packaged inventory, manifests, entrypoints, runtime dependencies, version metadata, no manual diagnostics install, and offline plugin discovery. Do not hide unrelated failures; distinguish pre-existing failures from regressions.
9. Report source branch and exact commit, chosen version, plugin versions, changed files, bundling mechanism, Docker build command, registry destination, pushed tag and immutable digest, local/remote digest comparison, exact verification and test commands with results, offline-start proof, caveats, secret-scan result, and worktree status.

## References

Read `./references/workflow.md` before building or republishing an image. It contains command templates for the runtime assembly fallback, manifest creation, plugin verification, and secret checks.
