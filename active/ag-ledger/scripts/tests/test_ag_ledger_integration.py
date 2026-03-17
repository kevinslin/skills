#!/usr/bin/env python3
"""Integration tests for the ag-ledger CLI."""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from datetime import datetime
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "ag-ledger"


class AgLedgerIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._root_tmp = tempfile.TemporaryDirectory()
        self._workspace_tmp = tempfile.TemporaryDirectory()
        self._session_tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._root_tmp.name)
        self.workspace = Path(self._workspace_tmp.name)
        self.session_root = Path(self._session_tmp.name)

    def tearDown(self) -> None:
        self._session_tmp.cleanup()
        self._workspace_tmp.cleanup()
        self._root_tmp.cleanup()

    def run_cli(
        self,
        *args: str,
        cwd: Path | None = None,
        env_overrides: dict[str, str | None] | None = None,
    ) -> subprocess.CompletedProcess[str]:
        command = [
            sys.executable,
            str(SCRIPT_PATH),
            "--root",
            str(self.root),
            *args,
        ]
        env = os.environ.copy()
        if env_overrides:
            for key, value in env_overrides.items():
                if value is None:
                    env.pop(key, None)
                else:
                    env[key] = value
        return subprocess.run(
            command,
            cwd=str(cwd or self.workspace),
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )

    def write_rollout(self, relative_path: str, entries: list[dict]) -> Path:
        path = self.session_root / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            "\n".join(json.dumps(entry, ensure_ascii=True) for entry in entries) + "\n",
            encoding="utf-8",
        )
        return path

    def append_rollout_entries(self, path: Path, entries: list[dict]) -> None:
        with path.open("a", encoding="utf-8") as handle:
            for entry in entries:
                handle.write(json.dumps(entry, ensure_ascii=True) + "\n")

    def make_session_meta(
        self,
        timestamp: str,
        *,
        session_id: str = "sess-rollout",
        cwd: Path | None = None,
    ) -> dict:
        return {
            "timestamp": timestamp,
            "type": "session_meta",
            "payload": {
                "id": session_id,
                "timestamp": timestamp,
                "cwd": str((cwd or self.workspace).resolve()),
            },
        }

    def make_message(
        self,
        timestamp: str,
        *,
        role: str,
        text: str,
        phase: str | None = None,
    ) -> dict:
        payload = {
            "type": "message",
            "role": role,
            "content": [
                {
                    "type": "input_text" if role in {"user", "developer"} else "output_text",
                    "text": text,
                }
            ],
        }
        if phase is not None:
            payload["phase"] = phase
        return {
            "timestamp": timestamp,
            "type": "response_item",
            "payload": payload,
        }

    def read_ledger_entries(self, date_str: str) -> list[dict]:
        ledger_path = self.root / "data" / f"ledger-{date_str}.md"
        lines = ledger_path.read_text(encoding="utf-8").splitlines()
        return [json.loads(line) for line in lines if line.strip()]

    def local_date_str(self, timestamp: str) -> str:
        return datetime.fromisoformat(timestamp.replace("Z", "+00:00")).astimezone().strftime(
            "%Y-%m-%d"
        )

    def test_append_creates_daily_file_and_entry(self) -> None:
        result = self.run_cli("append", "sess-append", "implement", "feature")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        entry = json.loads(result.stdout.strip())

        self.assertEqual(entry["session"], "sess-append")
        self.assertEqual(entry["msg"], "implement feature")
        self.assertNotIn("invoked_skill", entry)
        self.assertNotIn("mode", entry)
        self.assertNotIn("parent_session_id", entry)
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

    def test_append_current_uses_codex_thread_id(self) -> None:
        codex_thread_id = "019c87f5-6475-76b1-9963-2d6b7336edcf"
        result = self.run_cli(
            "append-current",
            "--invoked-skill",
            "ag-learn",
            "--mode",
            "review",
            "--parent-session-id",
            "sess-parent",
            "session",
            "start:",
            "test",
            env_overrides={"CODEX_THREAD_ID": codex_thread_id},
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        entry = json.loads(result.stdout.strip())
        self.assertEqual(entry["session"], codex_thread_id)
        self.assertEqual(entry["msg"], "session start: test")
        self.assertEqual(entry["invoked_skill"], "ag-learn")
        self.assertEqual(entry["mode"], "review")
        self.assertEqual(entry["parent_session_id"], "sess-parent")

    def test_append_current_errors_without_codex_thread_id(self) -> None:
        result = self.run_cli(
            "append-current",
            "session",
            "start:",
            "test",
            env_overrides={"CODEX_THREAD_ID": None},
        )
        self.assertEqual(result.returncode, 2)
        self.assertIn("CODEX_THREAD_ID", result.stderr)

    def test_session_id_prints_codex_thread_id(self) -> None:
        codex_thread_id = "019c87f5-6475-76b1-9963-2d6b7336edcf"
        result = self.run_cli(
            "session-id",
            env_overrides={"CODEX_THREAD_ID": codex_thread_id},
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(result.stdout.strip(), codex_thread_id)

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

    def test_filter_supports_structured_skill_metadata(self) -> None:
        data_dir = self.root / "data"
        data_dir.mkdir(parents=True, exist_ok=True)
        entries = [
            {
                "time": "2026-01-02 10:00",
                "workspace": str(self.workspace),
                "session": "sess-review",
                "msg": "session start: review sessions",
                "invoked_skill": "ag-learn",
                "mode": "review",
                "parent_session_id": "sess-root",
            },
            {
                "time": "2026-01-02 10:05",
                "workspace": str(self.workspace),
                "session": "sess-code",
                "msg": "session start: implement telemetry",
                "invoked_skill": "ag-ledger",
                "mode": "code",
            },
        ]
        (data_dir / "ledger-2026-01-02.md").write_text(
            "\n".join(json.dumps(entry, ensure_ascii=True) for entry in entries) + "\n",
            encoding="utf-8",
        )

        by_skill = self.run_cli("filter", "--invoked-skill", "ag-learn")
        self.assertEqual(by_skill.returncode, 0, msg=by_skill.stderr)
        skill_lines = [json.loads(line) for line in by_skill.stdout.splitlines() if line.strip()]
        self.assertEqual(len(skill_lines), 1)
        self.assertEqual(skill_lines[0]["session"], "sess-review")

        by_mode = self.run_cli("filter", "--mode", "review")
        self.assertEqual(by_mode.returncode, 0, msg=by_mode.stderr)
        mode_lines = [json.loads(line) for line in by_mode.stdout.splitlines() if line.strip()]
        self.assertEqual(len(mode_lines), 1)
        self.assertEqual(mode_lines[0]["invoked_skill"], "ag-learn")

        by_parent = self.run_cli("filter", "--parent-session-id", "sess-root")
        self.assertEqual(by_parent.returncode, 0, msg=by_parent.stderr)
        parent_lines = [json.loads(line) for line in by_parent.stdout.splitlines() if line.strip()]
        self.assertEqual(len(parent_lines), 1)
        self.assertEqual(parent_lines[0]["mode"], "review")

    def test_init_prints_deprecation_and_leaves_agents_unchanged(self) -> None:
        agents_file = self.workspace / "AGENTS.md"
        original = "# Workspace Instructions\n"
        agents_file.write_text(original, encoding="utf-8")

        result = self.run_cli("init")
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("deprecated", result.stdout.lower())
        self.assertIn("ag-ledger sync", result.stdout)
        self.assertEqual(agents_file.read_text(encoding="utf-8"), original)

    def test_sync_derives_entries_is_idempotent_and_recovers_from_stale_state(self) -> None:
        rollout_path = self.write_rollout(
            "2026/01/02/rollout-2026-01-02T10-00-00-sess-rollout.jsonl",
            [
                self.make_session_meta("2026-01-02T10:00:00Z"),
                self.make_message(
                    "2026-01-02T10:00:01Z",
                    role="user",
                    text="# AGENTS.md instructions for /Users/kevinlin/agents/skills\n\n<INSTRUCTIONS>...</INSTRUCTIONS>",
                ),
                self.make_message(
                    "2026-01-02T10:00:02Z",
                    role="user",
                    text="Implement the sync command for ag-ledger.",
                ),
                self.make_message(
                    "2026-01-02T10:00:03Z",
                    role="user",
                    text="<skill>\n<name>sc</name>\n...</skill>",
                ),
                self.make_message(
                    "2026-01-02T10:00:04Z",
                    role="assistant",
                    phase="commentary",
                    text="Resolve the canonical ag-ledger path and inspect the CLI surface.",
                ),
                self.make_message(
                    "2026-01-02T10:00:05Z",
                    role="assistant",
                    phase="commentary",
                    text="Draft the spec and identify the deterministic sync model.",
                ),
                self.make_message(
                    "2026-01-02T10:00:06Z",
                    role="assistant",
                    phase="final_answer",
                    text="Added the spec and implementation plan.",
                ),
                self.make_message(
                    "2026-01-02T10:00:07Z",
                    role="user",
                    text="Commit the changes.",
                ),
                self.make_message(
                    "2026-01-02T10:00:08Z",
                    role="assistant",
                    phase="commentary",
                    text="Checking the diff and staging only the ag-ledger files.",
                ),
                self.make_message(
                    "2026-01-02T10:00:09Z",
                    role="assistant",
                    phase="final_answer",
                    text="Committed the ag-ledger changes.",
                ),
            ],
        )

        first = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(first.returncode, 0, msg=first.stderr)
        first_summary = json.loads(first.stdout.strip())
        self.assertEqual(first_summary["files_considered"], 1)
        self.assertEqual(first_summary["files_processed"], 1)
        self.assertEqual(first_summary["entries_appended"], 5)
        self.assertEqual(first_summary["entries_already_present"], 0)

        ledger_entries = self.read_ledger_entries(self.local_date_str("2026-01-02T10:00:04Z"))
        self.assertEqual(len(ledger_entries), 5)
        self.assertEqual(
            [entry["entry_kind"] for entry in ledger_entries],
            [
                "session_start",
                "notable_change",
                "session_end",
                "session_start",
                "session_end",
            ],
        )
        self.assertTrue(
            ledger_entries[0]["msg"].startswith(
                "session start: Resolve the canonical ag-ledger path"
            )
        )
        self.assertTrue(
            ledger_entries[1]["msg"].startswith(
                "notable change: Draft the spec and identify"
            )
        )
        self.assertTrue(
            ledger_entries[2]["msg"].startswith(
                "session end: Added the spec and implementation plan."
            )
        )
        self.assertFalse(any("AGENTS.md instructions" in entry["msg"] for entry in ledger_entries))
        self.assertFalse(any("<skill>" in entry["msg"] for entry in ledger_entries))

        second = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(second.returncode, 0, msg=second.stderr)
        second_summary = json.loads(second.stdout.strip())
        self.assertEqual(second_summary["entries_appended"], 0)
        self.assertEqual(second_summary["files_skipped_unchanged"], 1)
        self.assertEqual(
            len(self.read_ledger_entries(self.local_date_str("2026-01-02T10:00:04Z"))),
            5,
        )

        state_path = self.root / "state" / "sync-state.json"
        state = json.loads(state_path.read_text(encoding="utf-8"))
        state["files"] = {}
        state_path.write_text(json.dumps(state, ensure_ascii=True), encoding="utf-8")

        stale = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(stale.returncode, 0, msg=stale.stderr)
        stale_summary = json.loads(stale.stdout.strip())
        self.assertEqual(stale_summary["entries_appended"], 0)
        self.assertEqual(stale_summary["entries_already_present"], 5)
        self.assertEqual(
            len(self.read_ledger_entries(self.local_date_str("2026-01-02T10:00:04Z"))),
            5,
        )

        self.append_rollout_entries(
            rollout_path,
            [
                self.make_message(
                    "2026-01-02T10:00:10Z",
                    role="user",
                    text="Push the branch.",
                ),
                self.make_message(
                    "2026-01-02T10:00:11Z",
                    role="assistant",
                    phase="commentary",
                    text="Pushing the branch to origin.",
                ),
                self.make_message(
                    "2026-01-02T10:00:12Z",
                    role="assistant",
                    phase="final_answer",
                    text="Pushed the branch successfully.",
                ),
            ],
        )

        updated = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(updated.returncode, 0, msg=updated.stderr)
        updated_summary = json.loads(updated.stdout.strip())
        self.assertEqual(updated_summary["entries_appended"], 2)

        updated_entries = self.read_ledger_entries(self.local_date_str("2026-01-02T10:00:04Z"))
        self.assertEqual(len(updated_entries), 7)
        self.assertEqual(updated_entries[-2]["entry_kind"], "session_start")
        self.assertEqual(updated_entries[-1]["entry_kind"], "session_end")

        updated_state = json.loads(state_path.read_text(encoding="utf-8"))
        self.assertIn(str(rollout_path.resolve()), updated_state["files"])
        self.assertEqual(
            len(updated_state["files"][str(rollout_path.resolve())]["emitted_source_keys"]),
            7,
        )

    def test_sync_uses_transcript_timestamp_for_ledger_day(self) -> None:
        self.write_rollout(
            "2026/01/03/rollout-2026-01-03T07-58-00-sess-time.jsonl",
            [
                self.make_session_meta(
                    "2026-01-03T07:58:00Z",
                    session_id="sess-time",
                ),
                self.make_message(
                    "2026-01-03T07:58:30Z",
                    role="user",
                    text="Summarize the work.",
                ),
                self.make_message(
                    "2026-01-03T07:59:00Z",
                    role="assistant",
                    phase="commentary",
                    text="Summarizing the work completed so far.",
                ),
                self.make_message(
                    "2026-01-03T07:59:30Z",
                    role="assistant",
                    phase="final_answer",
                    text="Summarized the work.",
                ),
            ],
        )

        result = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        expected_date = self.local_date_str("2026-01-03T07:59:00Z")
        expected_ledger_path = self.root / "data" / f"ledger-{expected_date}.md"
        self.assertTrue(expected_ledger_path.exists())

        today_ledger_path = self.root / "data" / f"ledger-{datetime.now().astimezone().strftime('%Y-%m-%d')}.md"
        if today_ledger_path != expected_ledger_path:
            self.assertFalse(today_ledger_path.exists())

        ledger_entries = self.read_ledger_entries(expected_date)
        self.assertEqual(len(ledger_entries), 2)
        self.assertTrue(ledger_entries[0]["msg"].startswith("session start: Summarizing"))
        self.assertTrue(ledger_entries[1]["msg"].startswith("session end: Summarized"))


if __name__ == "__main__":
    unittest.main()
