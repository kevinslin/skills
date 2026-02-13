#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <service-name>" >&2
  exit 1
fi

service_name="$1"
input_log="/tmp/${service_name}.log"
output_log="/tmp/${service_name}.clean.log"

if [[ ! -f "$input_log" ]]; then
  echo "Input log not found: $input_log" >&2
  exit 1
fi

# Strip ANSI escape sequences and carriage returns produced by Tilt logs.
perl -pe 's/\e\[[0-9;?]*[ -\/]*[@-~]//g; s/\r//g' "$input_log" > "$output_log"

echo "Wrote clean log: $output_log"
