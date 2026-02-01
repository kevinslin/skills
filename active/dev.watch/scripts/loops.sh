#!/bin/bash
# Run Codex for a single dev.watch task.

set -euo pipefail

PARALLEL="false"
REPO_NAME=""
TASK_ARGS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --parallel)
      PARALLEL="true"
      shift
      ;;
    --repo)
      if [[ -z "${2:-}" ]]; then
        echo "Error: --repo requires a value." >&2
        exit 2
      fi
      REPO_NAME="$2"
      shift 2
      ;;
    --repo=*)
      REPO_NAME="${1#*=}"
      shift
      ;;
    --help|-h)
      echo "Usage: loops.sh [--parallel] [--repo <repo-name>] <task-string>" >&2
      exit 0
      ;;
    --)
      shift
      TASK_ARGS+=("$@")
      break
      ;;
    *)
      TASK_ARGS+=("$1")
      shift
      ;;
  esac
done

TASK="${TASK_ARGS[*]}"
if [[ -z "$TASK" ]]; then
  echo "Error: missing task string." >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
PROMPT_FILE="${CODEX_PROMPT_FILE:-$REPO_ROOT/references/codex.md}"
CODEX_CMD="${CODEX_CMD:-codex exec --yolo}"

if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "Error: prompt file not found: $PROMPT_FILE" >&2
  exit 2
fi

if [[ -z "$REPO_NAME" ]]; then
  if [[ "$TASK" =~ github.com/[^/]+/([^/]+)/ ]]; then
    REPO_NAME="${BASH_REMATCH[1]}"
  fi
fi

if [[ -n "$REPO_NAME" ]]; then
  TARGET_DIR="$HOME/code/$REPO_NAME"
  if [[ -d "$TARGET_DIR" ]]; then
    cd "$TARGET_DIR"
  else
    echo "Warning: repo directory not found: $TARGET_DIR" >&2
  fi
fi

TASK_PROMPT="use dev.do to accomplish task in $TASK"

read -r -a CODEX_CMD_ARR <<< "$CODEX_CMD"

run_codex() {
  {
    cat "$PROMPT_FILE"
    echo ""
    if [[ -n "$REPO_NAME" ]]; then
      echo "Repo name: $REPO_NAME"
      echo "Working directory: $HOME/code/$REPO_NAME"
    fi
    echo "$TASK_PROMPT"
  } | "${CODEX_CMD_ARR[@]}"
}

if [[ "$PARALLEL" == "true" ]]; then
  run_codex &
  disown
  echo "Codex started in background (parallel mode)." >&2
else
  run_codex
fi
