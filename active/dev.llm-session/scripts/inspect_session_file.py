#!/usr/bin/env python3
"""Inspect a Codex session file (.json or .jsonl) and print metadata."""

from __future__ import annotations

import argparse
import json
import os
import sys
from typing import Any


def read_jsonl_meta(path: str) -> dict[str, Any] | None:
    with open(path, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                continue
            if payload.get("type") == "session_meta":
                return payload.get("payload", {})
            if payload.get("session"):
                return payload.get("session")
            return payload
    return None


def read_json_meta(path: str) -> dict[str, Any] | None:
    with open(path, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    if isinstance(data, dict):
        return data.get("session") or data
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description="Print Codex session metadata from a file")
    parser.add_argument("path", help="Path to a Codex session JSON or JSONL file")
    parser.add_argument("--id-only", action="store_true", help="Print only the session id")
    args = parser.parse_args()

    path = os.path.expanduser(args.path)
    if not os.path.exists(path):
        print(f"session file not found: {path}", file=sys.stderr)
        return 1

    if path.endswith(".jsonl"):
        meta = read_jsonl_meta(path)
    else:
        meta = read_json_meta(path)

    if not meta:
        print("no metadata found", file=sys.stderr)
        return 1

    session_id = meta.get("id") or meta.get("session_id") or meta.get("sessionId")
    if not session_id:
        print("session id not found", file=sys.stderr)
        return 1

    if args.id_only:
        print(session_id)
        return 0

    print(f"id: {session_id}")
    if meta.get("timestamp"):
        print(f"timestamp: {meta.get('timestamp')}")
    if meta.get("cwd"):
        print(f"cwd: {meta.get('cwd')}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
