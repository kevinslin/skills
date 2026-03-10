#!/usr/bin/env python3
"""
Validate flow-doc structure and sudocode coverage for specy workflows.

Checks:
- Required section headings
- Ordered call path step coverage
- Legacy sudocode subsection coverage for preservation-first revisions
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


CODE_BLOCK_RE = re.compile(r"```[A-Za-z0-9_-]*\n.*?```", re.S)


@dataclass
class ValidationResult:
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def _has_h2(text: str, heading: str) -> bool:
    pattern = re.compile(rf"(?im)^##\s+{re.escape(heading)}\s*$")
    return pattern.search(text) is not None


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


def _section_contains_sudocode_heading(section: str) -> bool:
    return re.search(r"(?im)^####\s+.*sudocode.*$", section) is not None


def _extract_labeled_block(section: str, label: str, next_patterns: list[str]) -> str | None:
    start_re = re.compile(rf"(?im)^{re.escape(label)}\s*$")
    match = start_re.search(section)
    if not match:
        return None

    start = match.end()
    next_indices = [
        next_match.start()
        for pattern in next_patterns
        if (next_match := re.compile(pattern, re.I | re.M).search(section, start))
    ]
    end = min(next_indices) if next_indices else len(section)
    return section[start:end]


def _validate_legacy_sudocode_sections(scope: str, section: str, result: ValidationResult) -> None:
    sudocode_sections = _extract_segments_by_heading(section, r"^####\s+.*sudocode.*$")
    for heading, segment in sudocode_sections:
        if CODE_BLOCK_RE.search(segment) is None:
            result.errors.append(f"{scope} has no fenced code block in legacy sudocode section: {heading.strip()}")
        if re.search(r"(?im)\bsource\b\s*:", segment) is None:
            result.warnings.append(
                f"{scope} has no explicit source annotation ('Source:') in legacy sudocode section: {heading.strip()}"
            )


def _validate_ordered_call_path(scope: str, section: str, result: ValidationResult) -> None:
    ordered_call_path = _extract_labeled_block(
        section,
        "Ordered call path:",
        [
            r"^State transitions / outputs:\s*$",
            r"^Branch points:\s*$",
            r"^External boundaries:\s*$",
            r"^###\s+Phase\b.*$",
            r"^##\s+",
        ],
    )
    if ordered_call_path is None:
        result.errors.append(f"{scope} is missing an 'Ordered call path:' block.")
        return

    step_segments = _extract_segments_by_heading(ordered_call_path, r"^\d+\.\s+.+$")
    if not step_segments:
        if _section_contains_sudocode_heading(section):
            result.warnings.append(
                f"{scope} uses legacy separate sudocode subsections; prefer numbered Ordered call path steps with embedded code blocks."
            )
            _validate_legacy_sudocode_sections(scope, section, result)
            return
        result.errors.append(f"{scope} must use numbered steps under 'Ordered call path:'.")
        return

    steps_with_code = 0
    for heading, segment in step_segments:
        if CODE_BLOCK_RE.search(segment) is None:
            result.errors.append(f"{scope} ordered step has no fenced code block: {heading.strip()}")
            continue
        steps_with_code += 1
        if re.search(r"(?im)\bsource\b\s*:", segment) is None:
            result.warnings.append(
                f"{scope} ordered step has no explicit source annotation ('Source:'): {heading.strip()}"
            )

    if steps_with_code == 0 and _section_contains_sudocode_heading(section):
        result.warnings.append(
            f"{scope} uses legacy separate sudocode subsections; prefer numbered Ordered call path steps with embedded code blocks."
        )
        _validate_legacy_sudocode_sections(scope, section, result)


def _validate_normal_flow_doc(text: str, result: ValidationResult) -> None:
    required_h2 = [
        "Purpose / Question Answered",
        "Entry points",
        "Call path",
        "State, config, and gates",
        "Sequence diagram",
    ]
    for heading in required_h2:
        if not _has_h2(text, heading):
            result.errors.append(f"Missing required section: '## {heading}'")

    call_path = _extract_h2_section(text, "Call path")
    if call_path is None:
        return

    phase_segments = _extract_segments_by_heading(call_path, r"^###\s+Phase\b.*$")
    if not phase_segments:
        result.warnings.append(
            "Call path does not use explicit '### Phase ...' headings; phase/ordered-step alignment cannot be fully validated."
        )
        _validate_ordered_call_path("Call path", call_path, result)
        return

    for heading, segment in phase_segments:
        _validate_ordered_call_path(heading.strip(), segment, result)


def _validate_end2end_flow_doc(text: str, result: ValidationResult) -> None:
    required_h2 = [
        "Overview",
        "Lifecycle Boundaries",
        "Config",
        "Full Logic Inventory",
        "Detailed Flow sudocode",
    ]
    for heading in required_h2:
        if not _has_h2(text, heading):
            result.errors.append(f"Missing required section: '## {heading}'")

    logic_inventory = _extract_h2_section(text, "Full Logic Inventory")
    if logic_inventory is not None and re.search(r"(?im)^###\s+E2E-\d+\b", logic_inventory) is None:
        result.errors.append(
            "Full Logic Inventory must include stable step headings (expected '### E2E-### - ...')."
        )

    sudocode_section = _extract_h2_section(text, "Detailed Flow sudocode")
    if sudocode_section is None:
        return

    if CODE_BLOCK_RE.search(sudocode_section) is None:
        result.errors.append("Detailed Flow sudocode must include at least one fenced code block.")
        return

    stage_segments = _extract_segments_by_heading(sudocode_section, r"^###\s+.+$")
    if not stage_segments:
        result.warnings.append(
            "Detailed Flow sudocode has no stage subsections (expected '### Entry ...', etc.)."
        )
    else:
        for heading, segment in stage_segments:
            if CODE_BLOCK_RE.search(segment) is None:
                result.errors.append(
                    f"Detailed sudocode stage has no fenced code block: {heading.strip()}"
                )
            if re.search(r"(?im)\bsource\b\s*:|`[^`\n/]+/[^`\n]+`", segment) is None:
                result.warnings.append(
                    f"Detailed sudocode stage lacks explicit source citation: {heading.strip()}"
                )


def _auto_kind(text: str) -> str:
    if _has_h2(text, "Full Logic Inventory") or re.search(r"(?im)^#\s+.*end2end.*flow", text):
        return "end2end"
    return "normal"


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate flow-doc structure and sudocode coverage.")
    parser.add_argument(
        "--kind",
        choices=["auto", "normal", "end2end"],
        default="auto",
        help="Flow doc type. Default: auto-detect.",
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
    kind = _auto_kind(text) if args.kind == "auto" else args.kind

    result = ValidationResult()
    if kind == "normal":
        _validate_normal_flow_doc(text, result)
    else:
        _validate_end2end_flow_doc(text, result)

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
