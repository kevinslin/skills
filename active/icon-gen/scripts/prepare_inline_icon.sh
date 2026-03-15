#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "usage: $0 INPUT_PNG OUTPUT_PNG" >&2
  exit 1
fi

input_png=$1
output_png=$2

if [[ ! -f "$input_png" ]]; then
  echo "input file not found: $input_png" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required to prepare inline icons" >&2
  exit 1
fi

bbox_output=$(ffmpeg -i "$input_png" -vf bbox -f null - 2>&1)
crop_spec=$(printf '%s\n' "$bbox_output" | sed -n 's/.*crop=\([0-9:]*\).*/\1/p' | tail -n 1)

if [[ -z "$crop_spec" ]]; then
  echo "could not detect visible bounds for: $input_png" >&2
  exit 1
fi

mkdir -p "$(dirname "$output_png")"
ffmpeg -y -i "$input_png" -vf "crop=${crop_spec}" -frames:v 1 "$output_png" >/dev/null 2>&1
