#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "usage: $0 INPUT_PNG OUTPUT_PNG [TARGET_SIZE]" >&2
  exit 1
fi

input_png=$1
output_png=$2
target_size=${3:-256}

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
ffmpeg -y -i "$input_png" -vf "crop=${crop_spec},scale=${target_size}:${target_size}:force_original_aspect_ratio=decrease,pad=${target_size}:${target_size}:(ow-iw)/2:(oh-ih):color=black@0" -frames:v 1 "$output_png" >/dev/null 2>&1
