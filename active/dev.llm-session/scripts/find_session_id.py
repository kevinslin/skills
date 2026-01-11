#!/usr/bin/env python3
"""Find Codex session IDs from ~/.codex/history.jsonl."""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from typing import Iterable


def iter_history(path: str) -> Iterable[dict]:
    with open(path, "r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


def format_timestamp(ts: int | float | None) -> str:
    if ts is None:
        return "unknown"
    try:
        value = float(ts)
    except (TypeError, ValueError):
        return "unknown"
    dt = datetime.fromtimestamp(value, tz=timezone.utc)
    return dt.isoformat()


def normalize_text(text: str) -> str:
    return " ".join(text.split())


def truncate_text(text: str, limit: int) -> str:
    if len(text) <= limit:
        return text
    return f"{text[: max(0, limit - 3)]}..."


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Search ~/.codex/history.jsonl for matching prompts and return session IDs."
    )
    parser.add_argument(
        "--history",
        default=os.path.expanduser("~/.codex/history.jsonl"),
        help="Path to Codex history.jsonl",
    )
    parser.add_argument("--query", help="Substring to match in prompt text")
    parser.add_argument("--limit", type=int, default=10, help="Max rows to return")
    parser.add_argument("--last", action="store_true", help="Return only the most recent entry")
    parser.add_argument(
        "--full",
        action="store_true",
        help="Do not truncate prompt text",
    )
    args = parser.parse_args()

    history_path = args.history
    if not os.path.exists(history_path):
        print(f"history file not found: {history_path}", file=sys.stderr)
        return 1

    query = args.query.lower() if args.query else None
    matches: list[tuple[str, int | float | None, str]] = []

    for entry in iter_history(history_path):
        session_id = entry.get("session_id") or entry.get("sessionId")
        text = entry.get("text") or entry.get("command")
        if not session_id or not text:
            continue
        if query and query not in text.lower():
            continue
        matches.append((session_id, entry.get("ts"), text))

    if not matches:
        print("no matching sessions found", file=sys.stderr)
        return 1

    matches.sort(key=lambda item: (item[1] or 0))

    if args.last:
        matches = [matches[-1]]

    limit = max(1, args.limit)
    output = matches[-limit:]

    for session_id, ts, text in output:
        cleaned = normalize_text(text)
        if not args.full:
            cleaned = truncate_text(cleaned, 140)
        iso_ts = format_timestamp(ts)
        print(f"{session_id}\t{iso_ts}\t{cleaned}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
