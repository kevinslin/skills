#!/usr/bin/env python3
"""Synchronize SKILL.md dependencies from explicit in-body skill references."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from dependency_tools import (
    normalize_dependencies,
    parse_skill_markdown,
    render_skill_markdown,
)


def sync_dependencies(skill_path: Path, *, ensure_field: bool = True) -> tuple[bool, list[str], list[str]]:
    """Sync dependencies for a single skill directory."""
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        raise FileNotFoundError(f"SKILL.md not found in {skill_path}")

    frontmatter, body = parse_skill_markdown(skill_md)
    updated_frontmatter, merged, added, changed = normalize_dependencies(
        frontmatter,
        body,
        ensure_field=ensure_field,
    )

    if changed:
        skill_md.write_text(
            render_skill_markdown(updated_frontmatter, body),
            encoding="utf-8",
        )
    return changed, merged, added


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Auto-populate SKILL.md frontmatter dependencies from explicit references "
            "in the skill body."
        )
    )
    parser.add_argument("skill_path", help="Path to a skill directory containing SKILL.md")
    parser.add_argument(
        "--no-ensure-field",
        action="store_true",
        help="Do not create dependencies field when there are no detected references",
    )
    args = parser.parse_args()

    skill_path = Path(args.skill_path).resolve()
    if not skill_path.exists() or not skill_path.is_dir():
        print(f"❌ Error: Skill directory not found: {skill_path}")
        return 1

    try:
        changed, merged, added = sync_dependencies(
            skill_path,
            ensure_field=not args.no_ensure_field,
        )
    except Exception as exc:
        print(f"❌ Error: {exc}")
        return 1

    if changed:
        print(f"✅ Updated dependencies in {skill_path / 'SKILL.md'}")
        if added:
            print(f"   Added: {', '.join(added)}")
        else:
            print("   No new dependencies were detected, but metadata was normalized.")
    else:
        print(f"✅ No dependency changes needed in {skill_path / 'SKILL.md'}")

    print(
        "Current dependencies: "
        + (", ".join(merged) if merged else "(none)")
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
