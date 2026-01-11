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
  printf "Usage: %s <target_dir> [copier args] [--skip-followup]\n" "$0" >&2
  exit 1
fi

FOLLOWUP=1
DEST_DIR=""
COPIER_ARGS=()

for arg in "$@"; do
  case "$arg" in
    --skip-followup|--no-followup)
      FOLLOWUP=0
      ;;
    --followup)
      FOLLOWUP=1
      ;;
    *)
      if [ -z "$DEST_DIR" ]; then
        DEST_DIR="$arg"
      else
        COPIER_ARGS+=("$arg")
      fi
      ;;
  esac
done

if [ -z "$DEST_DIR" ]; then
  printf "Error: missing target_dir.\n" >&2
  printf "Usage: %s <target_dir> [copier args] [--skip-followup]\n" "$0" >&2
  exit 1
fi

copier copy --trust "$TEMPLATE_DIR" "$DEST_DIR" "${COPIER_ARGS[@]}"

if [ "$FOLLOWUP" -eq 1 ]; then
  if ! command -v pnpm >/dev/null 2>&1; then
    printf "Error: pnpm is not installed.\n" >&2
    printf "Install with: corepack enable pnpm\n" >&2
    exit 1
  fi
  if [ ! -d "$DEST_DIR" ]; then
    printf "Error: target_dir not found at %s\n" "$DEST_DIR" >&2
    exit 1
  fi
  (
    cd "$DEST_DIR"
    pnpm install
    pnpm test
    if [ ! -d ".git" ]; then
      if ! command -v git >/dev/null 2>&1; then
        printf "Error: git is not installed.\n" >&2
        exit 1
      fi
      git init
      pnpm prepare
    fi
  )
fi
