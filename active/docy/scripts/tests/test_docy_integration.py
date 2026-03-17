#!/usr/bin/env python3
"""Integration tests for the docy CLI."""

from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "docy"
SKILL_ROOT = SCRIPT_PATH.parents[1]
REFERENCE_PATH = SKILL_ROOT / "references" / "ref" / "no-back-compat.md"
VENDOR_REFERENCE_PATH = SKILL_ROOT / "references" / "vendor" / "lerna.md"


class DocyIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.workspace = Path(self._tmp.name)

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def run_cli(self, *args: str, cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(SCRIPT_PATH), *args],
            cwd=str(cwd or self.workspace),
            text=True,
            capture_output=True,
            check=False,
        )

    def test_inject_prints_doc_body(self) -> None:
        result = self.run_cli("inject", "ref/no-back-compat")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(result.stdout, REFERENCE_PATH.read_text(encoding="utf-8").rstrip() + "\n")

    def test_inject_accepts_alias(self) -> None:
        result = self.run_cli("inject", "ref/no-backward-compat")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("Hard-Cut Product Policy", result.stdout)
        self.assertIn("no external installed user base", result.stdout)

    def test_inject_vendor_doc(self) -> None:
        result = self.run_cli("inject", "vendor/lerna")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(
            result.stdout,
            VENDOR_REFERENCE_PATH.read_text(encoding="utf-8").rstrip() + "\n",
        )
        self.assertIn("workspace-aware task runner", result.stdout)

    def test_install_creates_agents_file_in_current_workspace(self) -> None:
        result = self.run_cli("install", "ref/no-backward-compat")
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        agents_file = self.workspace / "AGENTS.md"
        self.assertEqual(Path(result.stdout.strip()).resolve(), agents_file.resolve())
        content = agents_file.read_text(encoding="utf-8")
        self.assertIn("<!-- docy:ref__no-back-compat:begin -->", content)
        self.assertIn("Managed by `docy install`.", content)
        self.assertIn("## Hard-Cut Product Policy", content)
        self.assertIn("no external installed user base", content)
        self.assertIn("<!-- docy:ref__no-back-compat:end -->", content)

    def test_install_updates_existing_block_in_place(self) -> None:
        agents_file = self.workspace / "AGENTS.md"
        agents_file.write_text(
            "# Workspace Rules\n\n"
            "<!-- docy:ref__no-back-compat:begin -->\n"
            "stale\n"
            "<!-- docy:ref__no-back-compat:end -->\n",
            encoding="utf-8",
        )

        first = self.run_cli("install", "ref/no-back-compat")
        self.assertEqual(first.returncode, 0, msg=first.stderr)
        second = self.run_cli("install", "ref/no-back-compat")
        self.assertEqual(second.returncode, 0, msg=second.stderr)

        content = agents_file.read_text(encoding="utf-8")
        self.assertEqual(content.count("<!-- docy:ref__no-back-compat:begin -->"), 1)
        self.assertNotIn("stale", content)
        self.assertIn("compatibility bridges", content)

    def test_install_vendor_doc_creates_managed_block(self) -> None:
        result = self.run_cli("install", "vendor/lerna")
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        agents_file = self.workspace / "AGENTS.md"
        content = agents_file.read_text(encoding="utf-8")
        self.assertIn("<!-- docy:vendor__lerna:begin -->", content)
        self.assertIn("## docy: vendor/lerna", content)
        self.assertIn("Treat modern Lerna as a workspace-aware task runner", content)
        self.assertIn("<!-- docy:vendor__lerna:end -->", content)

    def test_install_finds_nearest_existing_agents_file(self) -> None:
        root = self.workspace / "repo"
        nested = root / "src" / "pkg"
        nested.mkdir(parents=True, exist_ok=True)
        agents_file = root / "AGENTS.md"
        agents_file.write_text("# Root Instructions\n", encoding="utf-8")

        result = self.run_cli("install", "ref/no-back-compat", cwd=nested)
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(Path(result.stdout.strip()).resolve(), agents_file.resolve())
        content = agents_file.read_text(encoding="utf-8")
        self.assertIn("Hard-Cut Product Policy", content)

    def test_unknown_doc_returns_error(self) -> None:
        result = self.run_cli("inject", "ref/unknown")
        self.assertEqual(result.returncode, 2)
        self.assertIn("Unknown doc", result.stderr)


if __name__ == "__main__":
    unittest.main()
