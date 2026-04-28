#!/usr/bin/env python3
"""Load and validate a .mem.yaml configuration.

The script prints normalized JSON to stdout and validation errors to stderr.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover - environment issue
    yaml = None


def fail(message: str) -> None:
    print(f"error: {message}", file=sys.stderr)
    raise SystemExit(1)


def non_empty_string(value: Any, field: str) -> str:
    if not isinstance(value, str) or not value.strip():
        fail(f"{field} must be a non-empty string")
    return value.strip()


def find_config(cwd: Path, home: Path) -> Path:
    candidates = [
        cwd / ".mem.yaml",
        cwd / ".mem" / ".mem.yaml",
        home / ".mem.yaml",
        home / ".mem" / ".mem.yaml",
    ]
    for candidate in candidates:
        if candidate.is_file():
            return candidate
    expected = ", ".join(str(candidate) for candidate in candidates)
    fail(f"missing config: expected one of: {expected}")


def resolve_root(raw_root: str, config_dir: Path) -> Path:
    expanded = os.path.expandvars(os.path.expanduser(raw_root))
    path = Path(expanded)
    if not path.is_absolute():
        path = config_dir / path
    return path.resolve(strict=False)


def load_yaml(path: Path) -> Any:
    if yaml is None:
        fail("PyYAML is required to parse .mem.yaml")
    try:
        with path.open("r", encoding="utf-8") as handle:
            return yaml.safe_load(handle)
    except yaml.YAMLError as exc:
        fail(f"invalid YAML in {path}: {exc}")
    except OSError as exc:
        fail(f"could not read {path}: {exc}")


def normalize_config(path: Path, require_roots: bool) -> dict[str, Any]:
    data = load_yaml(path)
    if not isinstance(data, dict):
        fail("config must be a YAML mapping")
    if data.get("version") != 1:
        fail("version must be 1")

    bases = data.get("bases")
    if not isinstance(bases, list) or not bases:
        fail("bases must be a non-empty list")

    normalized_bases: list[dict[str, Any]] = []
    seen_names: set[str] = set()
    for index, base in enumerate(bases):
        label = f"bases[{index}]"
        if not isinstance(base, dict):
            fail(f"{label} must be a mapping")
        if "schema" in base:
            fail(f"{label}.schema is not supported; use {label}.schemas")

        name = non_empty_string(base.get("name"), f"{label}.name")
        if name in seen_names:
            fail(f"duplicate base name: {name}")
        seen_names.add(name)

        raw_root = non_empty_string(base.get("root"), f"{label}.root")
        root = resolve_root(raw_root, path.parent)
        if require_roots and not root.is_dir():
            fail(f"{label}.root does not exist or is not a directory: {root}")

        schemas = base.get("schemas")
        if not isinstance(schemas, list) or not schemas:
            fail(f"{label}.schemas must be a non-empty list")
        normalized_schemas = [
            non_empty_string(schema, f"{label}.schemas[{schema_index}]")
            for schema_index, schema in enumerate(schemas)
        ]

        normalized: dict[str, Any] = {
            "name": name,
            "root": str(root),
            "schemas": normalized_schemas,
        }
        if "skill" in base:
            normalized["skill"] = non_empty_string(base.get("skill"), f"{label}.skill")
        normalized_bases.append(normalized)

    return {
        "config_path": str(path),
        "version": 1,
        "bases": normalized_bases,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--config",
        type=Path,
        help="Use a specific .mem.yaml instead of searching cwd then home.",
    )
    parser.add_argument("--cwd", type=Path, default=Path.cwd(), help="Current directory to search.")
    parser.add_argument("--home", type=Path, default=Path.home(), help="Home directory to search.")
    parser.add_argument(
        "--allow-missing-roots",
        action="store_true",
        help="Parse and normalize config without requiring base roots to exist.",
    )
    parser.add_argument("--pretty", action="store_true", help="Pretty-print JSON output.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    config = args.config.resolve(strict=False) if args.config else find_config(args.cwd, args.home)
    if not config.is_file():
        fail(f"config does not exist: {config}")
    normalized = normalize_config(config, require_roots=not args.allow_missing_roots)
    json.dump(normalized, sys.stdout, indent=2 if args.pretty else None)
    print()


if __name__ == "__main__":
    main()
