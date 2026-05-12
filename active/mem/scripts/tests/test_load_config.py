#!/usr/bin/env python3
"""Integration tests for the mem config loader."""

from __future__ import annotations

import json
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


TEST_DIR = Path(__file__).resolve().parent
SCRIPT_PATH = TEST_DIR.parents[0] / "load_config.py"


class LoadConfigTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.config = self.root / ".mem.yaml"
        self.base = self.root / "kb"
        self.base.mkdir()

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def write_config(self, text: str) -> None:
        self.config.write_text(textwrap.dedent(text).strip() + "\n", encoding="utf-8")

    def run_loader(self) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["python3", str(SCRIPT_PATH), "--config", str(self.config)],
            text=True,
            capture_output=True,
            check=False,
        )

    def test_explicit_path_style_is_normalized(self) -> None:
        self.write_config(
            f"""
            version: 1
            bases:
              - name: docs
                description: Durable documentation notes.
                root: {self.base}
                path_style: dotted
                schemas: [tool]
            """
        )

        result = self.run_loader()

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["bases"][0]["description"], "Durable documentation notes.")
        self.assertEqual(data["bases"][0]["path_style"], "dotted")

    def test_missing_description_is_rejected(self) -> None:
        self.write_config(
            f"""
            version: 1
            bases:
              - name: docs
                root: {self.base}
                schemas: [tool]
            """
        )

        result = self.run_loader()

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("bases[0].description must be a non-empty string", result.stderr)

    def test_invalid_path_style_is_rejected(self) -> None:
        self.write_config(
            f"""
            version: 1
            bases:
              - name: docs
                description: Durable documentation notes.
                root: {self.base}
                path_style: flat
                schemas: [tool]
            """
        )

        result = self.run_loader()

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("bases[0].path_style must be one of: directory, dotted", result.stderr)

    def test_missing_path_style_infers_dotted_from_existing_base(self) -> None:
        (self.base / "pkg.example.md").write_text("# Example\n", encoding="utf-8")
        self.write_config(
            f"""
            version: 1
            bases:
              - name: docs
                description: Durable documentation notes.
                root: {self.base}
                schemas: [tool]
            """
        )

        result = self.run_loader()

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["bases"][0]["path_style"], "dotted")

    def test_missing_path_style_infers_directory_from_existing_base(self) -> None:
        nested = self.base / "dev" / "qa"
        nested.mkdir(parents=True)
        (nested / "crabbox.md").write_text("# Crabbox\n", encoding="utf-8")
        self.write_config(
            f"""
            version: 1
            bases:
              - name: docs
                description: Durable documentation notes.
                root: {self.base}
                schemas: [code]
            """
        )

        result = self.run_loader()

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        data = json.loads(result.stdout)
        self.assertEqual(data["bases"][0]["path_style"], "directory")


if __name__ == "__main__":
    unittest.main()
