#!/usr/bin/env python3
"""Tests for fin's default-branch authorization gate."""

from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "check_default_branch.py"


class CheckDefaultBranchTests(unittest.TestCase):
    def invoke(
        self,
        *,
        context: str = "gh",
        repository_default_branch: str = "master",
        target_base_ref: str = "master",
    ) -> tuple[subprocess.CompletedProcess[str], dict[str, object]]:
        result = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--context",
                context,
                "--repository-default-branch",
                repository_default_branch,
                "--target-base-ref",
                target_base_ref,
            ],
            text=True,
            capture_output=True,
            check=False,
        )
        try:
            payload = json.loads(result.stdout)
        except json.JSONDecodeError as exc:
            raise AssertionError(
                f"script did not emit JSON\nstdout={result.stdout}\nstderr={result.stderr}"
            ) from exc
        return result, payload

    def test_exact_match_authorizes_every_finishing_action(self) -> None:
        result, payload = self.invoke()

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(payload["status"], "pass")
        self.assertTrue(payload["matches"])
        self.assertEqual(
            payload["allow"],
            {
                "archive": True,
                "cleanup": True,
                "full_finalization": True,
                "merge": True,
            },
        )

    def test_stacked_pr_base_blocks_every_finishing_action(self) -> None:
        result, payload = self.invoke(
            target_base_ref="dev/kevinlin/parent-feature"
        )

        self.assertEqual(result.returncode, 2)
        self.assertEqual(payload["status"], "blocked")
        self.assertFalse(payload["matches"])
        self.assertFalse(any(payload["allow"].values()))
        self.assertIn("Retarget it or create a PR against master", payload["reason"])

    def test_comparison_is_case_sensitive(self) -> None:
        result, payload = self.invoke(target_base_ref="Master")

        self.assertEqual(result.returncode, 2)
        self.assertFalse(payload["matches"])

    def test_blank_or_untrimmed_branch_name_is_invalid(self) -> None:
        for repository_default_branch, target_base_ref in (
            ("", "master"),
            ("master", ""),
            (" master", "master"),
            ("master", "master "),
        ):
            with self.subTest(
                repository_default_branch=repository_default_branch,
                target_base_ref=target_base_ref,
            ):
                result, payload = self.invoke(
                    repository_default_branch=repository_default_branch,
                    target_base_ref=target_base_ref,
                )
                self.assertEqual(result.returncode, 2)
                self.assertEqual(payload["status"], "blocked")
                self.assertFalse(payload["matches"])

    def test_invalid_context_is_blocked(self) -> None:
        result, payload = self.invoke(context="remote")

        self.assertEqual(result.returncode, 2)
        self.assertEqual(payload["status"], "blocked")
        self.assertEqual(payload["reason"], "context must be exactly 'gh' or 'local'")

    def test_missing_inputs_fail_closed_with_json_output(self) -> None:
        result = subprocess.run(
            [sys.executable, str(SCRIPT)],
            text=True,
            capture_output=True,
            check=False,
        )
        payload = json.loads(result.stdout)

        self.assertEqual(result.returncode, 2)
        self.assertEqual(payload["status"], "blocked")
        self.assertFalse(payload["matches"])
        self.assertFalse(any(payload["allow"].values()))


if __name__ == "__main__":
    unittest.main()
