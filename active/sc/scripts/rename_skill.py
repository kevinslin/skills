#!/usr/bin/env python3
"""Rename a skill and propagate references across existing skills."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path

from dependency_tools import (
    is_valid_skill_name,
    parse_skill_markdown,
    render_skill_markdown,
)


@dataclass
class FileChange:
    path: Path
    renamed_frontmatter_name: bool
    updated_dependencies: bool
    updated_body: bool


def _dedupe_preserve_order(items: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        if item in seen:
            continue
        seen.add(item)
        result.append(item)
    return result


def _replace_body_references(body: str, old_name: str, new_name: str) -> tuple[str, int]:
    total = 0

    # Path and explicit syntax replacements first.
    replacements = [
        (f"/{old_name}/SKILL.md", f"/{new_name}/SKILL.md"),
        (f"/{old_name}/skill.md", f"/{new_name}/skill.md"),
        (f"[${old_name}]", f"[${new_name}]"),
        (f"`{old_name}`", f"`{new_name}`"),
    ]
    for old_token, new_token in replacements:
        body, count = re.subn(re.escape(old_token), new_token, body)
        total += count

    # $skill-name references.
    body, count = re.subn(
        rf"(?<![A-Za-z0-9.-])\${re.escape(old_name)}(?![A-Za-z0-9.-])",
        f"${new_name}",
        body,
    )
    total += count

    # "use skill [skill-name]" references.
    body, count = re.subn(
        rf"(?i)\buse skill\s+\[{re.escape(old_name)}\]",
        f"use skill [{new_name}]",
        body,
    )
    total += count

    # Fallback standalone token replacement for plain body references.
    body, count = re.subn(
        rf"(?<![A-Za-z0-9.-]){re.escape(old_name)}(?![A-Za-z0-9.-])",
        new_name,
        body,
    )
    total += count

    return body, total


def _update_skill_file(path: Path, old_name: str, new_name: str, dry_run: bool) -> FileChange | None:
    frontmatter, body = parse_skill_markdown(path)

    changed = False
    renamed_frontmatter_name = False
    updated_dependencies = False
    updated_body = False

    # Rename the skill's own frontmatter name when applicable.
    if frontmatter.get("name") == old_name:
        frontmatter = dict(frontmatter)
        frontmatter["name"] = new_name
        changed = True
        renamed_frontmatter_name = True

    # Update dependencies lists.
    dependencies = frontmatter.get("dependencies")
    if isinstance(dependencies, list):
        next_deps: list[str] = []
        dep_changed = False
        for dep in dependencies:
            if not isinstance(dep, str):
                next_deps.append(dep)
                continue
            dep_name = dep.strip()
            if dep_name == old_name:
                next_deps.append(new_name)
                dep_changed = True
            else:
                next_deps.append(dep_name)
        next_deps = _dedupe_preserve_order(next_deps)
        if dep_changed or next_deps != dependencies:
            frontmatter = dict(frontmatter)
            frontmatter["dependencies"] = next_deps
            changed = True
            updated_dependencies = True

    next_body, body_changes = _replace_body_references(body, old_name, new_name)
    if body_changes > 0:
        body = next_body
        changed = True
        updated_body = True

    if not changed:
        return None

    if not dry_run:
        path.write_text(render_skill_markdown(frontmatter, body), encoding="utf-8")

    return FileChange(
        path=path,
        renamed_frontmatter_name=renamed_frontmatter_name,
        updated_dependencies=updated_dependencies,
        updated_body=updated_body,
    )


def _collect_skill_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for child_root in ("active", "draft", "drafts", "skills"):
        base = root / child_root
        if not base.exists() or not base.is_dir():
            continue
        for path in base.rglob("*"):
            if not path.is_file():
                continue
            if path.name not in {"SKILL.md", "skill.md"}:
                continue
            files.append(path)
    return sorted(files)


def _rename_skill_directories(root: Path, old_name: str, new_name: str, dry_run: bool) -> list[tuple[Path, Path]]:
    renamed: list[tuple[Path, Path]] = []
    for child_root in ("active", "draft", "drafts", "skills"):
        base = root / child_root
        old_dir = base / old_name
        new_dir = base / new_name
        if not old_dir.exists():
            continue
        if new_dir.exists():
            raise FileExistsError(f"Target skill directory already exists: {new_dir}")
        renamed.append((old_dir, new_dir))
        if not dry_run:
            old_dir.rename(new_dir)
    return renamed


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Rename a skill and propagate the new name through dependencies and "
            "skill body references in existing skills."
        )
    )
    parser.add_argument("workspace_root", help="Workspace root containing active/ and draft/ skill directories")
    parser.add_argument("old_name", help="Current skill name")
    parser.add_argument("new_name", help="New skill name")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print planned changes without writing files",
    )
    args = parser.parse_args()

    root = Path(args.workspace_root).resolve()
    old_name = args.old_name.strip()
    new_name = args.new_name.strip()

    if not root.exists() or not root.is_dir():
        print(f"❌ Error: workspace root not found: {root}")
        return 1

    for label, value in (("old_name", old_name), ("new_name", new_name)):
        if not is_valid_skill_name(value):
            print(f"❌ Error: invalid {label}: {value}")
            return 1

    if old_name == new_name:
        print("❌ Error: old_name and new_name are identical")
        return 1

    try:
        renamed_dirs = _rename_skill_directories(root, old_name, new_name, args.dry_run)
    except Exception as exc:
        print(f"❌ Error renaming skill directories: {exc}")
        return 1

    files = _collect_skill_files(root)
    changes: list[FileChange] = []
    for path in files:
        try:
            change = _update_skill_file(path, old_name, new_name, args.dry_run)
        except Exception as exc:
            print(f"❌ Error updating {path}: {exc}")
            return 1
        if change is not None:
            changes.append(change)

    mode = "DRY RUN: " if args.dry_run else ""
    if renamed_dirs:
        print(f"{mode}Renamed skill directories:")
        for old_dir, new_dir in renamed_dirs:
            print(f"  - {old_dir} -> {new_dir}")
    else:
        print(f"{mode}No skill directory rename needed (directory may already be renamed).")

    if changes:
        print(f"\n{mode}Updated skill references in {len(changes)} file(s):")
        for change in changes:
            categories = []
            if change.renamed_frontmatter_name:
                categories.append("frontmatter.name")
            if change.updated_dependencies:
                categories.append("dependencies")
            if change.updated_body:
                categories.append("body")
            print(f"  - {change.path} ({', '.join(categories)})")
        print(
            "\nNOTICE: reference updates were applied. Notify the user that "
            "dependency and body references were changed."
        )
    else:
        print(f"\n{mode}No skill files required reference updates.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
