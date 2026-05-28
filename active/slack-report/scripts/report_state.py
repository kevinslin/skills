#!/usr/bin/env python3

import argparse
import json
import os
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

DEFAULT_STATE_ROOT = Path.home() / ".llm" / "skills" / "slack-report"
DEFAULT_DOCS_ROOT = Path.home() / "code" / "openai" / "0" / "notes"
DEFAULT_INITIAL_LOOKBACK_HOURS = 24
SCONFIG_PATH = Path(__file__).resolve().parent.parent / "references" / "sconfig.json"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9._-]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-") or "report"


def parse_timestamp(raw: str) -> datetime:
    raw = raw.strip()
    if not raw:
        raise ValueError("empty timestamp")
    if re.fullmatch(r"\d+(\.\d+)?", raw):
        return datetime.fromtimestamp(float(raw), tz=timezone.utc)
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    return datetime.fromisoformat(raw).astimezone(timezone.utc)


def isoformat_utc(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def slack_ts(dt: datetime) -> str:
    return f"{dt.timestamp():.6f}"


def load_sconfig() -> dict:
    if not SCONFIG_PATH.exists():
        return {}
    with SCONFIG_PATH.open(encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"{SCONFIG_PATH} must contain a top-level JSON object")
    return data


def config_value(name: str):
    env_value = os.environ.get(name)
    if env_value is not None:
        return env_value
    config = load_sconfig()
    return config.get(name)


def docs_root() -> Path:
    raw = config_value("DOCS_ROOT")
    return Path(raw).expanduser() if raw else DEFAULT_DOCS_ROOT


def state_root() -> Path:
    raw = config_value("STATE_ROOT")
    return Path(raw).expanduser() if raw else DEFAULT_STATE_ROOT


def initial_lookback_hours() -> int:
    raw = config_value("INITIAL_LOOKBACK_HOURS")
    if raw is None:
        return DEFAULT_INITIAL_LOOKBACK_HOURS
    return int(raw)


def local_timezone():
    return datetime.now().astimezone().tzinfo or timezone.utc


def state_path(title: str) -> Path:
    return state_root() / f"{slugify(title)}_last_updated"


def gdoc_state_path(title: str) -> Path:
    return state_root() / f"{slugify(title)}_gdoc_url"


def report_path(title: str, end_dt: datetime) -> tuple[Path, Path, Path, str]:
    title_slug = slugify(title)
    root = docs_root()
    report_root = root / "report"
    report_dir = report_root / title_slug
    report_date = end_dt.astimezone(local_timezone()).date().isoformat()
    return root, report_root, report_dir / f"{report_date}.md", report_date


def load_start(state_file: Path, end_dt: datetime) -> tuple[datetime, str]:
    if state_file.exists():
        return parse_timestamp(state_file.read_text(encoding="utf-8")), "watermark"
    return end_dt - timedelta(hours=initial_lookback_hours()), "last_24h"


def cmd_window(args: argparse.Namespace) -> int:
    end_dt = parse_timestamp(args.now) if args.now else datetime.now(timezone.utc)
    state_file = state_path(args.title)
    start_dt, source = load_start(state_file, end_dt)
    payload = {
        "title": args.title,
        "state_file": str(state_file),
        "source": source,
        "start_iso": isoformat_utc(start_dt),
        "end_iso": isoformat_utc(end_dt),
        "oldest_ts": slack_ts(start_dt),
        "latest_ts": slack_ts(end_dt),
    }
    print(json.dumps(payload))
    return 0


def cmd_report_path(args: argparse.Namespace) -> int:
    end_dt = parse_timestamp(args.now) if args.now else datetime.now(timezone.utc)
    root, report_root, path, report_date = report_path(args.title, end_dt)
    payload = {
        "title": args.title,
        "title_slug": slugify(args.title),
        "docs_root": str(root),
        "gdoc_state_file": str(gdoc_state_path(args.title)),
        "report_root": str(report_root),
        "report_dir": str(path.parent),
        "report_date": report_date,
        "report_path": str(path),
    }
    print(json.dumps(payload))
    return 0


def cmd_write(args: argparse.Namespace) -> int:
    target_dt = parse_timestamp(args.timestamp) if args.timestamp else datetime.now(timezone.utc)
    state_file = state_path(args.title)
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state_file.write_text(isoformat_utc(target_dt) + os.linesep, encoding="utf-8")
    print(str(state_file))
    return 0


def cmd_gdoc_url(args: argparse.Namespace) -> int:
    target = gdoc_state_path(args.title)
    payload = {
        "title": args.title,
        "gdoc_state_file": str(target),
        "url": target.read_text(encoding="utf-8").strip() if target.exists() else None,
    }
    print(json.dumps(payload))
    return 0


def cmd_write_gdoc_url(args: argparse.Namespace) -> int:
    target = gdoc_state_path(args.title)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(args.url.strip() + os.linesep, encoding="utf-8")
    print(str(target))
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Resolve and persist slack-report watermarks.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    window_parser = subparsers.add_parser("window", help="Print the effective scan window as JSON.")
    window_parser.add_argument("--title", required=True, help="Report title.")
    window_parser.add_argument("--now", help="Optional end timestamp in ISO-8601 or epoch seconds.")
    window_parser.set_defaults(func=cmd_window)

    report_path_parser = subparsers.add_parser("report-path", help="Print the resolved report file path as JSON.")
    report_path_parser.add_argument("--title", required=True, help="Report title.")
    report_path_parser.add_argument("--now", help="Optional timestamp in ISO-8601 or epoch seconds for local report-day resolution.")
    report_path_parser.set_defaults(func=cmd_report_path)

    write_parser = subparsers.add_parser("write", help="Persist the new watermark timestamp.")
    write_parser.add_argument("--title", required=True, help="Report title.")
    write_parser.add_argument("--timestamp", help="Timestamp in ISO-8601 or epoch seconds.")
    write_parser.set_defaults(func=cmd_write)

    gdoc_url_parser = subparsers.add_parser("gdoc-url", help="Print the persisted Google Doc URL as JSON.")
    gdoc_url_parser.add_argument("--title", required=True, help="Report title.")
    gdoc_url_parser.set_defaults(func=cmd_gdoc_url)

    write_gdoc_url_parser = subparsers.add_parser("write-gdoc-url", help="Persist the Google Doc URL for the report.")
    write_gdoc_url_parser.add_argument("--title", required=True, help="Report title.")
    write_gdoc_url_parser.add_argument("--url", required=True, help="Google Doc URL to persist.")
    write_gdoc_url_parser.set_defaults(func=cmd_write_gdoc_url)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
