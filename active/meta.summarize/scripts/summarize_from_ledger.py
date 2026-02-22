#!/usr/bin/env python3
"""Render a summary template from ag-ledger events."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

FALLBACK_AG_LEDGER = "/Users/kevinlin/code/skills/active/ag-ledger/scripts/ag-ledger"
EVENT_PREFIXES = ("session start:", "notable change:", "session end:")
LOOKUP_CHOICES = ("current_day", "day", "week", "month")
SCOPE_CHOICES = ("convo", "workspace", "all")
GROUPBY_CHOICES = ("session", "workspace", "none")
TS_FMT = "%Y-%m-%d %H:%M"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Render a session summary from ag-ledger events. "
            "Usage: summarize_from_ledger.py [scope] [lookup] [groupby]"
        )
    )
    parser.add_argument("scope", nargs="?", choices=SCOPE_CHOICES, default="convo")
    parser.add_argument("lookup", nargs="?", choices=LOOKUP_CHOICES, default="current_day")
    parser.add_argument("groupby", nargs="?", choices=GROUPBY_CHOICES, default="none")
    parser.add_argument(
        "--session",
        help="Session id override for convo scope. Defaults to CODEX_THREAD_ID.",
    )
    parser.add_argument(
        "--workspace",
        help="Workspace override for workspace scope. Defaults to current directory.",
    )
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


def format_ts(ts: datetime) -> str:
    return ts.strftime(TS_FMT)


def resolve_lookup_window(lookup: str) -> tuple[datetime, datetime]:
    now = datetime.now()
    if lookup == "current_day":
        start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    elif lookup == "day":
        start = now - timedelta(hours=24)
    elif lookup == "week":
        start = now - timedelta(days=7)
    else:
        start = now - timedelta(days=30)
    return start, now


def run_filter(
    ag_ledger_bin: str, start: datetime, end: datetime, extra_args: list[str] | None = None
) -> list[dict[str, str]]:
    cmd = [
        ag_ledger_bin,
        "filter",
        "--from",
        format_ts(start),
        "--to",
        format_ts(end),
    ]
    if extra_args:
        cmd.extend(extra_args)

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

        time_raw = str(record.get("time", "")).strip()
        session_raw = str(record.get("session", "")).strip()
        workspace_raw = str(record.get("workspace", "")).strip()
        msg_raw = str(record.get("msg", "")).strip()
        if not time_raw or not session_raw:
            continue

        events.append(
            {
                "time": time_raw,
                "session": session_raw,
                "workspace": workspace_raw,
                "msg": msg_raw,
            }
        )

    events.sort(key=lambda event: event["time"])
    return events


def shorten_title(seed: str, max_words: int = 8) -> str:
    words = seed.split()
    if len(words) > max_words:
        return " ".join(words[:max_words]) + "..."
    return seed


def convo_title(events: list[dict[str, str]]) -> str:
    if not events:
        return "Conversation Summary"
    seed = clean_message(events[0]["msg"]) or "Conversation Summary"
    return shorten_title(seed)


def collect_highlights(events: list[dict[str, str]], limit: int = 2) -> list[str]:
    highlights: list[str] = []
    for event in events:
        msg = clean_message(event["msg"])
        if msg and msg not in highlights:
            highlights.append(msg)
        if len(highlights) == limit:
            break
    return highlights


def render_template(title: str, started: str, session_label: str, body: str, timeline: list[str]) -> str:
    lines = [
        f"### {title}",
        f"- started: {started}",
        f"- session: {session_label}",
        "",
        "summary:",
        body,
        "",
        "timeline:",
    ]
    if not timeline:
        lines.append("- (no events)")
    else:
        lines.extend(timeline)
    return "\n".join(lines)


def format_session_label(session_ids: list[str]) -> str:
    if not session_ids:
        return "none"
    if len(session_ids) == 1:
        return session_ids[0]
    sample = ", ".join(session_ids[:3])
    suffix = "..." if len(session_ids) > 3 else ""
    return f"{len(session_ids)} sessions ({sample}{suffix})"


def normalize_workspace(workspace: str) -> str:
    value = workspace.strip()
    return value or "(unknown workspace)"


def group_events(
    events: list[dict[str, str]], groupby: str
) -> list[tuple[str, list[dict[str, str]]]]:
    if groupby == "none":
        return []

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for event in events:
        if groupby == "session":
            key = event["session"]
        else:
            key = normalize_workspace(event.get("workspace", ""))
        grouped[key].append(event)

    ordered_keys = sorted(
        grouped.keys(),
        key=lambda key: (min(item["time"] for item in grouped[key]), key),
    )
    ordered_groups: list[tuple[str, list[dict[str, str]]]] = []
    for key in ordered_keys:
        ordered_groups.append(
            (
                key,
                sorted(
                    grouped[key],
                    key=lambda item: (
                        item["time"],
                        item["session"],
                        normalize_workspace(item.get("workspace", "")),
                    ),
                ),
            )
        )
    return ordered_groups


def render_convo(session_id: str, events: list[dict[str, str]]) -> str:
    if not events:
        return render_template(
            title="Conversation Summary",
            started="unknown",
            session_label=session_id,
            body="No ag-ledger events were found for this session in the selected lookup window.",
            timeline=[],
        )

    title = convo_title(events)
    started = events[0]["time"]
    ended = events[-1]["time"]
    highlights = collect_highlights(events, limit=2)

    sentences = [
        f"This conversation focused on {title}.",
        f"It includes {len(events)} ag-ledger events from {started} to {ended}.",
    ]
    if highlights:
        sentences.append(f"Key moments: {'; '.join(highlights)}.")

    timeline = [f"- [{event['time']}] {event['msg']}" for event in events]
    return render_template(
        title=title,
        started=started,
        session_label=session_id,
        body=" ".join(sentences[:3]),
        timeline=timeline,
    )


def is_under_workspace(path: str, workspace_root: str) -> bool:
    if not path:
        return False
    try:
        common = os.path.commonpath([os.path.realpath(path), workspace_root])
    except ValueError:
        return False
    return common == workspace_root


def render_workspace(workspace_root: str, events: list[dict[str, str]]) -> str:
    by_session: dict[str, list[dict[str, str]]] = defaultdict(list)
    for event in events:
        by_session[event["session"]].append(event)

    selected_sessions: dict[str, list[dict[str, str]]] = {}
    session_start_workspace: dict[str, str] = {}
    for session_id, session_events in by_session.items():
        session_events.sort(key=lambda event: event["time"])
        start_event = next(
            (
                event
                for event in session_events
                if event.get("msg", "").strip().lower().startswith("session start:")
            ),
            None,
        )
        if not start_event:
            continue
        if is_under_workspace(start_event.get("workspace", ""), workspace_root):
            selected_sessions[session_id] = session_events
            start_workspace = start_event.get("workspace", "").strip()
            session_start_workspace[session_id] = start_workspace or "(unknown workspace)"

    if not selected_sessions:
        title = f"{Path(workspace_root).name} workspace activity"
        return render_template(
            title=title,
            started="unknown",
            session_label="none",
            body=(
                "No ag-ledger sessions were found that started in this workspace "
                "for the selected lookup window."
            ),
            timeline=[],
        )

    workspace_events: dict[str, list[dict[str, str]]] = defaultdict(list)
    workspace_sessions: dict[str, set[str]] = defaultdict(set)
    for session_id, session_events in selected_sessions.items():
        workspace = session_start_workspace.get(session_id, "(unknown workspace)")
        workspace_events[workspace].extend(session_events)
        workspace_sessions[workspace].add(session_id)

    workspace_order = sorted(
        workspace_events.keys(),
        key=lambda workspace: min(event["time"] for event in workspace_events[workspace]),
    )

    all_events: list[dict[str, str]] = []
    for workspace in workspace_order:
        workspace_events[workspace].sort(key=lambda event: (event["time"], event["session"]))
        all_events.extend(workspace_events[workspace])
    all_events.sort(key=lambda event: (event["time"], event["session"]))

    session_ids = sorted(selected_sessions.keys())
    started = all_events[0]["time"]
    ended = all_events[-1]["time"]
    title = f"{Path(workspace_root).name} workspace activity"

    session_label = format_session_label(session_ids)

    summary_lines = [
        f"This workspace summary covers {len(session_ids)} sessions that started in {workspace_root}.",
        f"It includes {len(all_events)} ag-ledger events from {started} to {ended}.",
        "Grouped by workspace:",
    ]

    for workspace in workspace_order:
        workspace_group_events = workspace_events[workspace]
        workspace_group_sessions = sorted(workspace_sessions[workspace])
        workspace_started = workspace_group_events[0]["time"]
        workspace_ended = workspace_group_events[-1]["time"]
        highlights = collect_highlights(workspace_group_events, limit=1)
        line = (
            f"- {workspace}: {len(workspace_group_sessions)} sessions, "
            f"{len(workspace_group_events)} events, {workspace_started} to {workspace_ended}"
        )
        if highlights:
            line += f"; highlight: {highlights[0]}"
        summary_lines.append(line)

    timeline: list[str] = []
    for workspace in workspace_order:
        timeline.append(f"- workspace: {workspace}")
        timeline.extend(
            [
                f"- [{event['time']}] ({event['session']}) {event['msg']}"
                for event in workspace_events[workspace]
            ]
        )

    return render_template(
        title=title,
        started=started,
        session_label=session_label,
        body="\n".join(summary_lines),
        timeline=timeline,
    )


def render_all(events: list[dict[str, str]], groupby: str) -> str:
    title = "all workspace activity"
    if not events:
        return render_template(
            title=title,
            started="unknown",
            session_label="none",
            body="No ag-ledger events were found for the selected lookup window.",
            timeline=[],
        )

    all_events = sorted(
        events,
        key=lambda event: (
            event["time"],
            event["session"],
            normalize_workspace(event.get("workspace", "")),
        ),
    )
    session_ids = sorted({event["session"] for event in all_events})
    workspace_ids = sorted({normalize_workspace(event.get("workspace", "")) for event in all_events})
    started = all_events[0]["time"]
    ended = all_events[-1]["time"]

    summary_lines = [
        f"This all-scope summary covers {len(session_ids)} sessions across {len(workspace_ids)} workspaces.",
        f"It includes {len(all_events)} ag-ledger events from {started} to {ended}.",
    ]

    timeline: list[str] = []
    grouped = group_events(all_events, groupby)
    if groupby == "none":
        summary_lines.append("Grouped by: none (chronological timeline across all sessions/workspaces).")
        timeline.extend(
            [
                (
                    f"- [{event['time']}] "
                    f"({event['session']} @ {normalize_workspace(event.get('workspace', ''))}) "
                    f"{event['msg']}"
                )
                for event in all_events
            ]
        )
    else:
        summary_lines.append(f"Grouped by {groupby}:")
        for group_name, group_items in grouped:
            group_started = group_items[0]["time"]
            group_ended = group_items[-1]["time"]
            group_sessions = len({event["session"] for event in group_items})
            group_workspaces = len({normalize_workspace(event.get("workspace", "")) for event in group_items})
            highlights = collect_highlights(group_items, limit=1)
            if groupby == "session":
                line = (
                    f"- {group_name}: {len(group_items)} events, "
                    f"{group_workspaces} workspaces, {group_started} to {group_ended}"
                )
            else:
                line = (
                    f"- {group_name}: {len(group_items)} events, "
                    f"{group_sessions} sessions, {group_started} to {group_ended}"
                )
            if highlights:
                line += f"; highlight: {highlights[0]}"
            summary_lines.append(line)

            timeline.append(f"- {groupby}: {group_name}")
            for event in group_items:
                if groupby == "session":
                    context = normalize_workspace(event.get("workspace", ""))
                else:
                    context = event["session"]
                timeline.append(f"- [{event['time']}] ({context}) {event['msg']}")

    return render_template(
        title=title,
        started=started,
        session_label=format_session_label(session_ids),
        body="\n".join(summary_lines),
        timeline=timeline,
    )


def main() -> None:
    args = parse_args()
    ag_ledger_bin = resolve_ag_ledger_bin(args.ag_ledger_bin)
    start, end = resolve_lookup_window(args.lookup)

    if args.scope == "convo":
        session_id = args.session or os.getenv("CODEX_THREAD_ID")
        if not session_id:
            print(
                "No session id available. Set CODEX_THREAD_ID or pass --session.",
                file=sys.stderr,
            )
            sys.exit(2)
        events = run_filter(
            ag_ledger_bin,
            start=start,
            end=end,
            extra_args=["--session", session_id],
        )
        print(render_convo(session_id, events))
        return

    if args.scope == "all":
        events = run_filter(ag_ledger_bin, start=start, end=end)
        print(render_all(events, args.groupby))
        return

    workspace_root = os.path.realpath(args.workspace or os.getcwd())
    events = run_filter(ag_ledger_bin, start=start, end=end)
    print(render_workspace(workspace_root, events))


if __name__ == "__main__":
    main()
