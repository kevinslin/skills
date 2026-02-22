#!/usr/bin/env python3
"""Integration tests for the meta.summarize helper script."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "summarize_from_ledger.py"


class SummarizeFromLedgerIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.tmp = Path(self._tmp.name)
        self.events_file = self.tmp / "events.jsonl"
        self.ag_ledger_stub = self.tmp / "ag-ledger-stub"
        self._write_stub()
        self.write_events([])

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def _write_stub(self) -> None:
        self.ag_ledger_stub.write_text(
            """#!/usr/bin/env python3
import os
import sys
from pathlib import Path

def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1] != "filter":
        print("expected filter command", file=sys.stderr)
        return 2

    events_path = os.environ.get("META_SUMMARIZE_TEST_EVENTS")
    if not events_path:
        return 0

    path = Path(events_path)
    if not path.exists():
        return 0

    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            print(line)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
""",
            encoding="utf-8",
        )
        self.ag_ledger_stub.chmod(0o755)

    def write_events(self, events: list[dict[str, str]]) -> None:
        content = "".join(json.dumps(event, ensure_ascii=True) + "\n" for event in events)
        self.events_file.write_text(content, encoding="utf-8")

    def run_cli(self, *args: str) -> subprocess.CompletedProcess[str]:
        env = os.environ.copy()
        env["META_SUMMARIZE_TEST_EVENTS"] = str(self.events_file)
        command = [
            sys.executable,
            str(SCRIPT_PATH),
            *args,
            "--ag-ledger-bin",
            str(self.ag_ledger_stub),
        ]
        return subprocess.run(
            command,
            text=True,
            capture_output=True,
            check=False,
            env=env,
        )

    @staticmethod
    def sample_events() -> list[dict[str, str]]:
        return [
            {
                "time": "2026-02-22 10:00",
                "workspace": "/tmp/ws-a",
                "session": "sess-a",
                "msg": "session start: alpha",
            },
            {
                "time": "2026-02-22 10:10",
                "workspace": "/tmp/ws-b",
                "session": "sess-b",
                "msg": "session start: beta",
            },
            {
                "time": "2026-02-22 10:20",
                "workspace": "/tmp/ws-a",
                "session": "sess-a",
                "msg": "notable change: worked on alpha",
            },
            {
                "time": "2026-02-22 10:30",
                "workspace": "/tmp/ws-b",
                "session": "sess-b",
                "msg": "session end: beta done",
            },
        ]

    def test_all_scope_defaults_to_no_grouping(self) -> None:
        self.write_events(self.sample_events())

        result = self.run_cli("all", "day")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("- session: 2 sessions (sess-a, sess-b)", result.stdout)
        self.assertIn("Grouped by: none", result.stdout)
        self.assertIn(
            "- [2026-02-22 10:00] (sess-a @ /tmp/ws-a) session start: alpha",
            result.stdout,
        )
        self.assertIn(
            "- [2026-02-22 10:10] (sess-b @ /tmp/ws-b) session start: beta",
            result.stdout,
        )
        self.assertNotIn("- workspace: /tmp/ws-a", result.stdout)

    def test_all_scope_groupby_workspace(self) -> None:
        self.write_events(self.sample_events())

        result = self.run_cli("all", "day", "workspace")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("Grouped by workspace:", result.stdout)
        self.assertIn("- workspace: /tmp/ws-a", result.stdout)
        self.assertIn("- workspace: /tmp/ws-b", result.stdout)
        self.assertIn("- [2026-02-22 10:00] (sess-a) session start: alpha", result.stdout)

    def test_all_scope_groupby_session(self) -> None:
        self.write_events(self.sample_events())

        result = self.run_cli("all", "day", "session")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("Grouped by session:", result.stdout)
        self.assertIn("- session: sess-a", result.stdout)
        self.assertIn("- session: sess-b", result.stdout)
        self.assertIn("- [2026-02-22 10:20] (/tmp/ws-a) notable change: worked on alpha", result.stdout)

    def test_all_scope_reports_no_events(self) -> None:
        self.write_events([])

        result = self.run_cli("all", "week")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("- session: none", result.stdout)
        self.assertIn(
            "No ag-ledger events were found for the selected lookup window.",
            result.stdout,
        )


if __name__ == "__main__":
    unittest.main()
