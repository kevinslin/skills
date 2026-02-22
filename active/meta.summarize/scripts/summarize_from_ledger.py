#!/usr/bin/env python3
"""Render a conversation summary template from ag-ledger events."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys

FALLBACK_AG_LEDGER = "/Users/kevinlin/code/skills/active/ag-ledger/scripts/ag-ledger"
EVENT_PREFIXES = ("session start:", "notable change:", "session end:")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Render a session summary from ag-ledger events."
    )
    parser.add_argument("--session", required=True, help="Session id to summarize")
    parser.add_argument(
        "--ag-ledger-bin",
        default="ag-ledger",
        help="ag-ledger executable name or absolute path",
    )
    return parser.parse_args()


def clean_message(msg: str) -> str:
    text = msg.strip()
    lower = text.lower()
    for prefix in EVENT_PREFIXES:
        if lower.startswith(prefix):
            return text[len(prefix) :].strip()
    return text


def resolve_ag_ledger_bin(candidate: str) -> str:
    if shutil.which(candidate):
        return candidate
    if shutil.which(FALLBACK_AG_LEDGER):
        return FALLBACK_AG_LEDGER
    return candidate


def load_events(ag_ledger_bin: str, session_id: str) -> list[dict[str, str]]:
    cmd = [ag_ledger_bin, "filter", "--session", session_id]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=False)
    except FileNotFoundError:
        print(
            f"ag-ledger binary not found: {ag_ledger_bin}. "
            f"Tried fallback: {FALLBACK_AG_LEDGER}",
            file=sys.stderr,
        )
        sys.exit(1)

    if result.returncode != 0:
        stderr = result.stderr.strip()
        print(
            f"ag-ledger filter failed with exit code {result.returncode}: {stderr}",
            file=sys.stderr,
        )
        sys.exit(result.returncode or 1)

    events: list[dict[str, str]] = []
    for raw_line in result.stdout.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            continue
        events.append(
            {
                "time": str(record.get("time", "")).strip(),
                "msg": str(record.get("msg", "")).strip(),
            }
        )

    events.sort(key=lambda event: event["time"])
    return events


def short_title(events: list[dict[str, str]]) -> str:
    if not events:
        return "Conversation Summary"

    seed = clean_message(events[0]["msg"]) or "Conversation Summary"
    words = seed.split()
    if len(words) > 8:
        return " ".join(words[:8]) + "..."
    return seed


def summary(events: list[dict[str, str]], title: str) -> str:
    if not events:
        return "No ag-ledger events were found for this session."

    started = events[0]["time"]
    ended = events[-1]["time"]
    count = len(events)

    highlights: list[str] = []
    for event in events:
        msg = clean_message(event["msg"])
        if msg and msg not in highlights:
            highlights.append(msg)
        if len(highlights) == 2:
            break

    sentences = [
        f"This conversation focused on {title}.",
        f"It includes {count} ag-ledger events from {started} to {ended}.",
    ]
    if highlights:
        sentences.append(f"Key moments: {'; '.join(highlights)}.")
    return " ".join(sentences[:3])


def render(session_id: str, events: list[dict[str, str]]) -> str:
    title = short_title(events)
    started = events[0]["time"] if events else "unknown"
    body = summary(events, title)

    lines = [
        f"### {title}",
        f"- started: {started}",
        f"- session: {session_id}",
        "",
        "summary:",
        body,
        "",
        "timeline:",
    ]

    if not events:
        lines.append("- (no events)")
    else:
        for event in events:
            lines.append(f"- [{event['time']}] {event['msg']}")

    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    ag_ledger_bin = resolve_ag_ledger_bin(args.ag_ledger_bin)
    events = load_events(ag_ledger_bin, args.session)
    print(render(args.session, events))


if __name__ == "__main__":
    main()
