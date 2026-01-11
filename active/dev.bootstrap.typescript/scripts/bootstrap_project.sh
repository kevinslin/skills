#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_DIR="/Users/kevinlin/code/copier-typescript-codex"

if ! command -v copier >/dev/null 2>&1; then
  printf "Error: copier is not installed.\n" >&2
  printf "Install with: pipx install copier\n" >&2
  exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
  printf "Error: template not found at %s\n" "$TEMPLATE_DIR" >&2
  exit 1
fi

if [ $# -lt 1 ]; then
  printf "Usage: %s <target_dir> [copier args]\n" "$0" >&2
  exit 1
fi

DEST_DIR="$1"
shift

copier copy --trust "$TEMPLATE_DIR" "$DEST_DIR" "$@"
