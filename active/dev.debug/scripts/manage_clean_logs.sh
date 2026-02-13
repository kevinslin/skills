#!/usr/bin/env bash
set -euo pipefail

PID_FILE="/tmp/dev-debug-clean-logs.pids"
STATE_FILE="/tmp/dev-debug-clean-logs.state"

usage() {
  cat <<'EOF'
Usage:
  manage_clean_logs.sh start <service...> [--method copy|tail]
  manage_clean_logs.sh restart <service...> [--method copy|tail]
  manage_clean_logs.sh cancel
  manage_clean_logs.sh status
EOF
}

is_pid_running() {
  local pid="$1"
  kill -0 "$pid" 2>/dev/null
}

has_tracked_running_jobs() {
  if [[ ! -f "$PID_FILE" ]]; then
    return 1
  fi

  while read -r pid _; do
    if [[ -n "${pid:-}" ]] && is_pid_running "$pid"; then
      return 0
    fi
  done <"$PID_FILE"

  return 1
}

cancel_jobs() {
  if [[ ! -f "$PID_FILE" ]]; then
    echo "No clean-log background jobs are tracked."
    return 0
  fi

  local canceled=0
  while read -r pid service; do
    if [[ -z "${pid:-}" ]]; then
      continue
    fi

    if is_pid_running "$pid"; then
      kill "$pid" 2>/dev/null || true
      canceled=$((canceled + 1))
      echo "Canceled clean-logs job for ${service:-unknown} (pid: $pid)"
    fi
  done <"$PID_FILE"

  rm -f "$PID_FILE" "$STATE_FILE"
  echo "Canceled $canceled clean-log background job(s)."
}

start_jobs() {
  local method="$1"
  shift

  if [[ "$method" != "copy" && "$method" != "tail" ]]; then
    echo "Invalid method '$method'. Expected 'copy' or 'tail'." >&2
    exit 1
  fi

  if [[ $# -eq 0 ]]; then
    echo "Provide at least one service name." >&2
    usage
    exit 1
  fi

  if has_tracked_running_jobs; then
    echo "Clean-log background jobs are already running. Use restart or cancel first." >&2
    exit 1
  fi

  rm -f "$PID_FILE" "$STATE_FILE"
  : >"$PID_FILE"

  local service
  for service in "$@"; do
    if [[ "$method" == "tail" ]]; then
      nohup bash -lc "clean-logs.sh \"$service\" --method tail" \
        >"/tmp/${service}.clean.runner.log" 2>&1 &
    else
      nohup bash -lc "clean-logs.sh \"$service\"" \
        >"/tmp/${service}.clean.runner.log" 2>&1 &
    fi

    local pid=$!
    printf '%s %s\n' "$pid" "$service" >>"$PID_FILE"
    echo "Started clean-logs for $service (pid: $pid, method: $method)"
  done

  {
    printf 'method=%s\n' "$method"
    printf 'services=%s\n' "$*"
    printf 'started_at=%s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
  } >"$STATE_FILE"
}

print_status() {
  if [[ ! -f "$PID_FILE" ]]; then
    echo "No clean-log background jobs are tracked."
    return 0
  fi

  if [[ -f "$STATE_FILE" ]]; then
    cat "$STATE_FILE"
  fi

  echo "jobs:"
  while read -r pid service; do
    if [[ -z "${pid:-}" ]]; then
      continue
    fi

    if is_pid_running "$pid"; then
      echo "  running pid=$pid service=${service:-unknown}"
    else
      echo "  exited pid=$pid service=${service:-unknown}"
    fi
  done <"$PID_FILE"
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

command="$1"
shift

method="copy"
services=()

if [[ "$command" == "start" || "$command" == "restart" ]]; then
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --method)
        shift
        if [[ $# -eq 0 ]]; then
          echo "--method requires a value." >&2
          exit 1
        fi
        method="$1"
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        services+=("$1")
        ;;
    esac
    shift
  done
fi

case "$command" in
  start)
    start_jobs "$method" "${services[@]}"
    ;;
  restart)
    cancel_jobs
    start_jobs "$method" "${services[@]}"
    ;;
  cancel)
    cancel_jobs
    ;;
  status)
    print_status
    ;;
  -h|--help)
    usage
    ;;
  *)
    echo "Unknown command: $command" >&2
    usage
    exit 1
    ;;
esac
