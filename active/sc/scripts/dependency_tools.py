#!/usr/bin/env python3
"""Shared helpers for skill dependency metadata management."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml


SKILL_NAME_RE = re.compile(r"^[a-z0-9][a-z0-9.-]*$")
FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n?", re.DOTALL)

# Keep patterns conservative to avoid accidental placeholder dependencies.
DEPENDENCY_PATTERNS = [
    re.compile(r"/active/([a-z0-9][a-z0-9.-]*)/SKILL\.md"),
    re.compile(r"/draft/([a-z0-9][a-z0-9.-]*)/SKILL\.md"),
    re.compile(r"/drafts/([a-z0-9][a-z0-9.-]*)/SKILL\.md"),
    re.compile(r"\.\./([a-z0-9][a-z0-9.-]*)/SKILL\.md"),
    re.compile(r"\.\./([a-z0-9][a-z0-9.-]*)/skill\.md"),
]

NONRELATIVE_BUNDLED_FILE_PATTERNS = [
    re.compile(r"(?<![A-Za-z0-9._/-])scripts/[A-Za-z0-9][A-Za-z0-9._/-]*"),
    re.compile(r"(?<![A-Za-z0-9._/-])references/[A-Za-z0-9][A-Za-z0-9._/-]*"),
    re.compile(r"(?<![A-Za-z0-9._/-])assets/[A-Za-z0-9][A-Za-z0-9._/-]*"),
]

ABSOLUTE_SKILL_LINK_PATTERNS = [
    re.compile(r"/active/[a-z0-9][a-z0-9.-]*/SKILL\.md"),
    re.compile(r"/draft/[a-z0-9][a-z0-9.-]*/SKILL\.md"),
    re.compile(r"/drafts/[a-z0-9][a-z0-9.-]*/SKILL\.md"),
]


def is_valid_skill_name(name: str) -> bool:
    """Return True when the name matches the skill naming convention."""
    if not isinstance(name, str):
        return False
    if not SKILL_NAME_RE.match(name):
        return False
    if name.endswith(("-", ".")) or ".." in name or "--" in name:
        return False
    return True


def parse_skill_markdown(skill_md_path: Path) -> tuple[dict[str, Any], str]:
    """Parse SKILL.md into frontmatter and body."""
    content = skill_md_path.read_text(encoding="utf-8")
    if not content.startswith("---"):
        raise ValueError("No YAML frontmatter found")

    match = FRONTMATTER_RE.match(content)
    if not match:
        raise ValueError("Invalid frontmatter format")

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as exc:
        raise ValueError(f"Invalid YAML in frontmatter: {exc}") from exc

    if not isinstance(frontmatter, dict):
        raise ValueError("Frontmatter must be a YAML dictionary")

    body = content[match.end() :]
    return frontmatter, body


def render_skill_markdown(frontmatter: dict[str, Any], body: str) -> str:
    """Render SKILL.md content from frontmatter and body."""
    frontmatter_text = yaml.safe_dump(
        frontmatter,
        sort_keys=False,
        allow_unicode=True,
        default_flow_style=False,
    ).strip()
    return f"---\n{frontmatter_text}\n---\n{body}"


def extract_skill_dependencies_from_body(body: str) -> set[str]:
    """Extract explicitly referenced skills from SKILL.md body text."""
    deps: set[str] = set()
    for pattern in DEPENDENCY_PATTERNS:
        for match in pattern.findall(body):
            if isinstance(match, tuple):
                deps.update([m for m in match if m])
            else:
                deps.add(match)
    return deps


def find_nonrelative_skill_file_references(text: str) -> list[str]:
    """Return bundled-file references that are not rooted at the SKILL.md directory."""
    refs: set[str] = set()
    for pattern in NONRELATIVE_BUNDLED_FILE_PATTERNS:
        refs.update(match.group(0) for match in pattern.finditer(text))
    for pattern in ABSOLUTE_SKILL_LINK_PATTERNS:
        refs.update(match.group(0) for match in pattern.finditer(text))
    return sorted(refs)


def _dedupe_preserve_order(items: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        if item in seen:
            continue
        seen.add(item)
        result.append(item)
    return result


def _set_dependencies_key(
    frontmatter: dict[str, Any], dependencies: list[str]
) -> dict[str, Any]:
    if "dependencies" in frontmatter:
        updated = dict(frontmatter)
        updated["dependencies"] = dependencies
        return updated

    ordered: dict[str, Any] = {}
    for key in ("name", "description"):
        if key in frontmatter:
            ordered[key] = frontmatter[key]
    ordered["dependencies"] = dependencies
    for key, value in frontmatter.items():
        if key not in ordered:
            ordered[key] = value
    return ordered


def normalize_dependencies(
    frontmatter: dict[str, Any],
    body: str,
    *,
    ensure_field: bool = False,
) -> tuple[dict[str, Any], list[str], list[str], bool]:
    """
    Merge explicit body references into frontmatter dependencies.

    Returns:
      (updated_frontmatter, merged_dependencies, added_dependencies, changed)
    """
    name = str(frontmatter.get("name", "")).strip()
    existing_value = frontmatter.get("dependencies")

    existing: list[str] = []
    if existing_value is None:
        existing = []
    elif isinstance(existing_value, list):
        for dep in existing_value:
            if not isinstance(dep, str):
                raise ValueError(
                    "dependencies must be a list of skill names (strings)"
                )
            dep_name = dep.strip()
            if dep_name:
                existing.append(dep_name)
    else:
        raise ValueError("dependencies must be a list of skill names")

    detected = sorted(
        dep
        for dep in extract_skill_dependencies_from_body(body)
        if dep and dep != name
    )
    merged = sorted(set(_dedupe_preserve_order(existing)).union(detected))
    added = sorted(set(merged) - set(existing))

    should_set_field = ensure_field or existing_value is not None or bool(detected)
    if should_set_field:
        updated = _set_dependencies_key(frontmatter, merged)
    else:
        updated = dict(frontmatter)

    changed = updated != frontmatter
    return updated, merged, added, changed
