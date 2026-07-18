#!/usr/bin/env python3
"""Integration tests for deterministic memory-base routing."""

from __future__ import annotations

import json
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


TEST_DIR = Path(__file__).resolve().parent
SCRIPT_PATH = TEST_DIR.parents[0] / "route.py"


class RouteTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.config = self.root / ".mem.yaml"
        self.main_base = self.root / "main"
        self.clawcmd_base = self.root / "clawcmd"
        self.main_base.mkdir()
        self.clawcmd_base.mkdir()
        self.config.write_text(
            textwrap.dedent(
                f"""
                version: 1
                bases:
                  - name: oai/main
                    description: OpenAI project specifications and references.
                    root: {self.main_base}
                    match:
                      artifact_kinds: [guide, runbook]
                    schemas:
                      - name: global-core
                  - name: oai/clawcmd
                    description: OpenAI Claw Command knowledge base.
                    aliases: [clawcommand, claw-command]
                    root: {self.clawcmd_base}
                    match:
                      topics: [ClawConfig, Enterprise Claw]
                      artifact_kinds: [guide, runbook]
                      source_globs: ["codex/claw-command/**"]
                    schemas:
                      - name: global-core
                """
            ).strip()
            + "\n",
            encoding="utf-8",
        )

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def run_router(self, query: str, *args: str) -> dict[str, object]:
        result = subprocess.run(
            [
                "python3",
                str(SCRIPT_PATH),
                "--config",
                str(self.config),
                "--query",
                query,
                *args,
            ],
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        return json.loads(result.stdout)

    def test_alias_and_artifact_select_claw_command(self) -> None:
        result = self.run_router("Record the clawcommand CLI commands as a reusable runbook.")

        self.assertEqual(result["status"], "selected")
        self.assertEqual(result["selected"]["name"], "oai/clawcmd")
        self.assertIn("name-or-alias:clawcommand", result["selected"]["reasons"])

    def test_explicit_target_wins(self) -> None:
        result = self.run_router("Save a guide.", "--target", "oai/clawcmd")

        self.assertEqual(result["status"], "selected")
        self.assertEqual(result["selected"]["name"], "oai/clawcmd")
        self.assertEqual(result["selected"]["reasons"], ["explicit base name"])

    def test_source_glob_selects_claw_command(self) -> None:
        result = self.run_router(
            "Capture this configuration workflow.",
            "--source",
            "codex/claw-command/src/manage_claw_config.py",
        )

        self.assertEqual(result["status"], "selected")
        self.assertEqual(result["selected"]["name"], "oai/clawcmd")
        self.assertIn(
            "source:codex/claw-command/**",
            result["selected"]["reasons"],
        )

    def test_specific_description_beats_cwd_fallback_without_aliases(self) -> None:
        self.config.write_text(
            self.config.read_text(encoding="utf-8").replace(
                "    aliases: [clawcommand, claw-command]\n",
                "",
            ),
            encoding="utf-8",
        )

        result = self.run_router(
            "Record the clawcommand configuration commands as a reusable guide.",
            "--cwd",
            str(self.main_base),
        )

        self.assertEqual(result["status"], "selected")
        self.assertEqual(result["selected"]["name"], "oai/clawcmd")
        self.assertIn("description:claw command", result["selected"]["reasons"])

    def test_weak_signal_is_ambiguous(self) -> None:
        result = self.run_router("Save this for later.")

        self.assertEqual(result["status"], "ambiguous")
        self.assertIsNone(result["selected"])


if __name__ == "__main__":
    unittest.main()
