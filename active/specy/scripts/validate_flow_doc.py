#!/usr/bin/env python3
"""
Validate flow-doc structure for specy workflows.

Checks:
- Flow-doc heading and trace structure
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


CODE_BLOCK_RE = re.compile(r"```[A-Za-z0-9_-]*\n.*?```", re.S)
LOCAL_ABSOLUTE_MARKDOWN_LINK_RE = re.compile(
    r"\[[^\]]+\]\(((?:/Users/|/home/)[^)]+)\)"
)
ENTRY_POINTER_RE = re.compile(r"(?m)^\s*-\s+`?[^`\n]+?\.[A-Za-z0-9]+:[^`\n]+`?\s*$")


@dataclass
class ValidationResult:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def _has_h2(text: str, heading: str) -> bool:
    pattern = re.compile(rf"(?im)^##\s+{re.escape(heading)}\s*$")
    return pattern.search(text) is not None


def _h2_position(text: str, heading: str) -> int | None:
    pattern = re.compile(rf"(?im)^##\s+{re.escape(heading)}\s*$")
    match = pattern.search(text)
    return match.start() if match else None


def _extract_h2_section(text: str, heading: str) -> str | None:
    start_re = re.compile(rf"(?im)^##\s+{re.escape(heading)}\s*$")
    match = start_re.search(text)
    if not match:
        return None
    start = match.end()
    next_h2 = re.compile(r"(?im)^##\s+").search(text, start)
    end = next_h2.start() if next_h2 else len(text)
    return text[start:end]


def _extract_segments_by_heading(section: str, heading_pattern: str) -> list[tuple[str, str]]:
    """
    Returns list of (heading_text, segment_body_including_heading_to_before_next_same_level_or_h2).
    """
    matches = list(re.finditer(heading_pattern, section, flags=re.I | re.M))
    segments: list[tuple[str, str]] = []
    for idx, match in enumerate(matches):
        start = match.start()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(section)
        segments.append((match.group(0), section[start:end]))
    return segments


def _validate_required_h2(text: str, required_h2: list[str], result: ValidationResult) -> None:
    for heading in required_h2:
        if not _has_h2(text, heading):
            result.errors.append(f"Missing required section: '## {heading}'")


def _validate_frontmatter(text: str, result: ValidationResult) -> None:
    if not text.startswith("---\n"):
        result.errors.append("Missing YAML frontmatter block")
        return

    end = text.find("\n---\n", 4)
    if end == -1:
        result.errors.append("YAML frontmatter block is not closed")
        return

    frontmatter = text[4:end]
    for key in ("created", "updated", "last_updated_session"):
        if not re.search(rf"(?m)^{key}:\s*\S+", frontmatter):
            result.errors.append(f"Missing required frontmatter key: '{key}'")


def _validate_entry_points(text: str, result: ValidationResult) -> None:
    entry_points = _extract_h2_section(text, "Entry Points")
    if entry_points is None:
        return

    pointer_count = len(ENTRY_POINTER_RE.findall(entry_points))
    if pointer_count < 1:
        result.errors.append("Entry Points must include at least one code pointer")
    if pointer_count > 3:
        result.errors.append("Entry Points must include at most three code pointers")


def _validate_execution_trace(text: str, result: ValidationResult) -> None:
    trace = _extract_h2_section(text, "Execution Trace")
    if trace is None:
        return

    phase_segments = _extract_segments_by_heading(trace, r"^###\s+\d+\.\s+.+$")
    if not phase_segments:
        result.errors.append("Execution Trace must use numbered phase headings like '### 1. Phase Name'")
        return

    for phase_heading, phase_segment in phase_segments:
        if "[add additional phases as necessary]" in phase_heading:
            continue
        step_segments = _extract_segments_by_heading(phase_segment, r"^####\s+\d+\.\d+\s+.+$")
        if not step_segments:
            result.warnings.append(
                f"{phase_heading.strip()} has no numbered step headings like '#### 1.1 Step Name'"
            )
            continue

        for step_heading, step_segment in step_segments:
            if re.search(r"(?m)^\s*-\s+`?[^`\n]+:[^`\n]+`?\s*$", step_segment) is None:
                result.errors.append(
                    f"{step_heading.strip()} must include a file/function pointer bullet"
                )
            if CODE_BLOCK_RE.search(step_segment) is None:
                result.errors.append(f"{step_heading.strip()} must include a fenced sudocode block")


def _validate_manual_notes_and_changelog_order(text: str, result: ValidationResult) -> None:
    manual_pos = _h2_position(text, "Manual Notes")
    changelog_pos = _h2_position(text, "Changelog")
    if manual_pos is None or changelog_pos is None:
        return
    if manual_pos > changelog_pos:
        result.errors.append("Section order must place '## Manual Notes' before '## Changelog'")


def _validate_flow_doc(text: str, result: ValidationResult) -> None:
    required_h2 = [
        "Overview",
        "Entry Points",
        "Sequence Diagram",
        "Execution Trace",
        "Notes",
        "Observability",
        "Related docs",
        "Manual Notes",
        "Changelog",
    ]
    _validate_frontmatter(text, result)
    _validate_required_h2(text, required_h2, result)

    sequence_pos = _h2_position(text, "Sequence Diagram")
    trace_pos = _h2_position(text, "Execution Trace")
    if sequence_pos is not None and trace_pos is not None and sequence_pos > trace_pos:
        result.errors.append("Section order must place '## Sequence Diagram' before '## Execution Trace'")

    _validate_entry_points(text, result)
    _validate_execution_trace(text, result)
    _validate_manual_notes_and_changelog_order(text, result)


def _validate_portable_repo_links(text: str, result: ValidationResult) -> None:
    scrubbed = CODE_BLOCK_RE.sub("", text)
    for match in LOCAL_ABSOLUTE_MARKDOWN_LINK_RE.finditer(scrubbed):
        result.errors.append(
            "Markdown links must not use machine-local absolute paths; "
            f"use a repo-relative target instead: {match.group(1)}"
        )


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate flow-doc structure.")
    parser.add_argument(
        "--kind",
        choices=["flow-doc"],
        default="flow-doc",
        help="Flow doc type. Only flow-doc is supported.",
    )
    parser.add_argument("--doc", required=True, help="Path to flow doc markdown file.")
    args = parser.parse_args()

    doc_path = Path(args.doc).expanduser()
    if not doc_path.exists():
        print(f"ERROR: file not found: {doc_path}", file=sys.stderr)
        return 2
    if not doc_path.is_file():
        print(f"ERROR: not a file: {doc_path}", file=sys.stderr)
        return 2

    text = doc_path.read_text(encoding="utf-8")
    kind = args.kind

    result = ValidationResult()
    _validate_flow_doc(text, result)
    _validate_portable_repo_links(text, result)

    if result.errors:
        print(f"FAIL [{kind}] {doc_path}")
        for idx, err in enumerate(result.errors, 1):
            print(f"  {idx}. ERROR: {err}")
        for idx, warning in enumerate(result.warnings, 1):
            print(f"  {idx}. WARN: {warning}")
        return 1

    print(f"PASS [{kind}] {doc_path}")
    for idx, warning in enumerate(result.warnings, 1):
        print(f"  {idx}. WARN: {warning}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
