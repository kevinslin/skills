#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "report_state.py"


class ReportStateTests(unittest.TestCase):
    def run_report_state(self, *args: str, docs_root: Path, state_root: Path):
        env = os.environ.copy()
        env.update(
            {
                "DOCS_ROOT": str(docs_root),
                "STATE_ROOT": str(state_root),
                "INITIAL_LOOKBACK_HOURS": "6",
            }
        )
        result = subprocess.run(
            [sys.executable, str(SCRIPT), *args],
            check=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
        )
        output = result.stdout.strip()
        try:
            return json.loads(output)
        except json.JSONDecodeError:
            return output

    def test_window_uses_initial_lookback_without_watermark(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            payload = self.run_report_state(
                "window",
                "--title",
                "Codex Report",
                "--now",
                "2026-05-18T12:00:00Z",
                docs_root=root / "docs",
                state_root=root / "state",
            )

            self.assertEqual(payload["source"], "last_24h")
            self.assertEqual(payload["start_iso"], "2026-05-18T06:00:00Z")
            self.assertEqual(payload["end_iso"], "2026-05-18T12:00:00Z")
            self.assertEqual(payload["state_file"], str(root / "state" / "codex-report_last_updated"))

    def test_write_then_window_uses_watermark(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            written_path = self.run_report_state(
                "write",
                "--title",
                "Codex Report",
                "--timestamp",
                "2026-05-18T11:30:00Z",
                docs_root=root / "docs",
                state_root=root / "state",
            )
            self.assertEqual(written_path, str(root / "state" / "codex-report_last_updated"))

            payload = self.run_report_state(
                "window",
                "--title",
                "Codex Report",
                "--now",
                "2026-05-18T12:00:00Z",
                docs_root=root / "docs",
                state_root=root / "state",
            )
            self.assertEqual(payload["source"], "watermark")
            self.assertEqual(payload["start_iso"], "2026-05-18T11:30:00Z")

    def test_report_path_uses_slug_and_docs_root(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            payload = self.run_report_state(
                "report-path",
                "--title",
                "Codex Report!",
                "--now",
                "2026-05-18T12:00:00Z",
                docs_root=root / "docs",
                state_root=root / "state",
            )

            self.assertEqual(payload["title_slug"], "codex-report")
            self.assertEqual(payload["docs_root"], str(root / "docs"))
            self.assertEqual(payload["report_root"], str(root / "docs" / "report"))
            self.assertEqual(payload["report_dir"], str(root / "docs" / "report" / "codex-report"))
            self.assertEqual(payload["report_path"], str(root / "docs" / "report" / "codex-report" / "2026-05-18.md"))
            self.assertEqual(payload["gdoc_state_file"], str(root / "state" / "codex-report_gdoc_url"))

    def test_write_and_read_gdoc_url(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            state_root = root / "state"
            url = "https://docs.example.com/example"

            written_path = self.run_report_state(
                "write-gdoc-url",
                "--title",
                "Codex Report",
                "--url",
                url,
                docs_root=root / "docs",
                state_root=state_root,
            )
            self.assertEqual(written_path, str(state_root / "codex-report_gdoc_url"))

            payload = self.run_report_state(
                "gdoc-url",
                "--title",
                "Codex Report",
                docs_root=root / "docs",
                state_root=state_root,
            )
            self.assertEqual(payload["url"], url)


if __name__ == "__main__":
    unittest.main()
