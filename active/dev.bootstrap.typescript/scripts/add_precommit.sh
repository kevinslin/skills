#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
PACKAGE_JSON="$ROOT/package.json"

if [ ! -f "$PACKAGE_JSON" ]; then
  printf "Error: package.json not found at %s\n" "$PACKAGE_JSON" >&2
  exit 1
fi

python - "$PACKAGE_JSON" <<'PY'
import json
import sys

path = sys.argv[1]
with open(path, "r", encoding="utf-8") as handle:
    data = json.load(handle)

scripts = data.get("scripts", {})
missing = [name for name in ("lint", "format") if name not in scripts]
if missing:
    print(
        "Error: missing scripts in package.json: " + ", ".join(missing),
        file=sys.stderr,
    )
    sys.exit(1)
PY

if [ -f "$ROOT/pnpm-lock.yaml" ]; then
  RUN_CMD="pnpm"
  INSTALL_CMD="pnpm install"
elif [ -f "$ROOT/yarn.lock" ]; then
  RUN_CMD="yarn"
  INSTALL_CMD="yarn install"
elif [ -f "$ROOT/bun.lockb" ]; then
  RUN_CMD="bun run"
  INSTALL_CMD="bun install"
elif [ -f "$ROOT/package-lock.json" ]; then
  RUN_CMD="npm run"
  INSTALL_CMD="npm install"
else
  RUN_CMD="npm run"
  INSTALL_CMD="npm install"
fi

HUSKY_DIR="$ROOT/.husky"
mkdir -p "$HUSKY_DIR"

PRECOMMIT="$HUSKY_DIR/pre-commit"
cat > "$PRECOMMIT" <<EOF
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

$RUN_CMD lint
$RUN_CMD format
EOF

chmod +x "$PRECOMMIT"

if [ ! -f "$HUSKY_DIR/_/husky.sh" ]; then
  printf "Note: husky is not installed. Run \"%s\" or \"npx husky install\" to enable hooks.\n" "$INSTALL_CMD" >&2
fi
