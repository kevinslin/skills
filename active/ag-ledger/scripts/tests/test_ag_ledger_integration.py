#!/usr/bin/env python3
"""Integration tests for the ag-ledger CLI."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "ag-ledger"


class AgLedgerIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._root_tmp = tempfile.TemporaryDirectory()
        self._workspace_tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._root_tmp.name)
        self.workspace = Path(self._workspace_tmp.name)

    def tearDown(self) -> None:
        self._workspace_tmp.cleanup()
        self._root_tmp.cleanup()

    def run_cli(self, *args: str, cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
        command = [
            sys.executable,
            str(SCRIPT_PATH),
            "--root",
            str(self.root),
            *args,
        ]
        return subprocess.run(
            command,
            cwd=str(cwd or self.workspace),
            text=True,
            capture_output=True,
            check=False,
        )

    def test_append_creates_daily_file_and_entry(self) -> None:
        result = self.run_cli("append", "sess-append", "implement", "feature")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        entry = json.loads(result.stdout.strip())

        self.assertEqual(entry["session"], "sess-append")
        self.assertEqual(entry["msg"], "implement feature")
        self.assertEqual(
            Path(entry["workspace"]).resolve(),
            self.workspace.resolve(),
        )

        ledger_files = list((self.root / "data").glob("ledger-*.md"))
        self.assertEqual(len(ledger_files), 1)
        lines = ledger_files[0].read_text(encoding="utf-8").strip().splitlines()
        self.assertEqual(len(lines), 1)
        stored = json.loads(lines[0])
        self.assertEqual(stored["session"], "sess-append")
        self.assertEqual(stored["msg"], "implement feature")

    def test_apppend_alias_appends_entry(self) -> None:
        result = self.run_cli("apppend", "sess-alias", "notable", "change")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        entry = json.loads(result.stdout.strip())
        self.assertEqual(entry["session"], "sess-alias")
        self.assertEqual(entry["msg"], "notable change")

    def test_filter_supports_session_workspace_and_time(self) -> None:
        data_dir = self.root / "data"
        data_dir.mkdir(parents=True, exist_ok=True)
        entries = [
            {
                "time": "2026-01-01 08:00",
                "workspace": str(self.workspace),
                "session": "sess-a",
                "msg": "start",
            },
            {
                "time": "2026-01-02 10:00",
                "workspace": str(self.workspace),
                "session": "sess-b",
                "msg": "middle",
            },
            {
                "time": "2026-01-03 16:00",
                "workspace": "/tmp/other-workspace",
                "session": "sess-a",
                "msg": "end",
            },
        ]
        (data_dir / "ledger-2026-01-01.md").write_text(
            json.dumps(entries[0], ensure_ascii=True) + "\n",
            encoding="utf-8",
        )
        (data_dir / "ledger-2026-01-02.md").write_text(
            json.dumps(entries[1], ensure_ascii=True) + "\n",
            encoding="utf-8",
        )
        (data_dir / "ledger-2026-01-03.md").write_text(
            json.dumps(entries[2], ensure_ascii=True) + "\n",
            encoding="utf-8",
        )

        by_session = self.run_cli("filter", "--session", "sess-a")
        self.assertEqual(by_session.returncode, 0, msg=by_session.stderr)
        session_lines = [json.loads(line) for line in by_session.stdout.splitlines() if line.strip()]
        self.assertEqual(len(session_lines), 2)
        self.assertTrue(all(line["session"] == "sess-a" for line in session_lines))

        by_workspace = self.run_cli("filter", "--workspace", str(self.workspace))
        self.assertEqual(by_workspace.returncode, 0, msg=by_workspace.stderr)
        workspace_lines = [json.loads(line) for line in by_workspace.stdout.splitlines() if line.strip()]
        self.assertEqual(len(workspace_lines), 2)
        self.assertTrue(all(line["workspace"] == str(self.workspace) for line in workspace_lines))

        by_time = self.run_cli(
            "filter",
            "--from",
            "2026-01-02",
            "--to",
            "2026-01-02 11:00",
        )
        self.assertEqual(by_time.returncode, 0, msg=by_time.stderr)
        time_lines = [json.loads(line) for line in by_time.stdout.splitlines() if line.strip()]
        self.assertEqual(len(time_lines), 1)
        self.assertEqual(time_lines[0]["msg"], "middle")

    def test_init_writes_single_managed_agents_block(self) -> None:
        agents_file = self.workspace / "AGENTS.md"
        agents_file.write_text("# Workspace Instructions\n", encoding="utf-8")

        first = self.run_cli("init")
        self.assertEqual(first.returncode, 0, msg=first.stderr)
        self.assertIn(str(agents_file), first.stdout)

        first_content = agents_file.read_text(encoding="utf-8")
        self.assertIn("<!-- ag-ledger:begin -->", first_content)
        self.assertIn("<!-- ag-ledger:end -->", first_content)
        self.assertIn("ag-ledger append <session-id>", first_content)

        second = self.run_cli("init")
        self.assertEqual(second.returncode, 0, msg=second.stderr)

        second_content = agents_file.read_text(encoding="utf-8")
        self.assertEqual(first_content, second_content)
        self.assertEqual(second_content.count("<!-- ag-ledger:begin -->"), 1)


if __name__ == "__main__":
    unittest.main()
