#!/usr/bin/env python3
"""Integration tests for ag-ledger transcript sync."""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from datetime import datetime
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "ag-ledger"
FIXTURES_DIR = Path(__file__).resolve().parent / "fixtures"


class AgLedgerSyncIntegrationTests(unittest.TestCase):
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

    def run_cli(self, *args: str) -> subprocess.CompletedProcess[str]:
        command = [
            sys.executable,
            str(SCRIPT_PATH),
            "--root",
            str(self.root),
            *args,
        ]
        return subprocess.run(
            command,
            cwd=str(self.workspace),
            env=os.environ.copy(),
            text=True,
            capture_output=True,
            check=False,
        )

    def install_fixture(self, fixture_name: str, relative_path: str) -> Path:
        source = FIXTURES_DIR / fixture_name
        destination = self.session_root / relative_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
        return destination

    def append_rollout_entries(self, path: Path, entries: list[dict]) -> None:
        with path.open("a", encoding="utf-8") as handle:
            for entry in entries:
                handle.write(json.dumps(entry, ensure_ascii=True) + "\n")

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
                    "type": "input_text" if role == "user" else "output_text",
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

    def local_date_str(self, timestamp: str) -> str:
        return datetime.fromisoformat(timestamp.replace("Z", "+00:00")).astimezone().strftime(
            "%Y-%m-%d"
        )

    def read_all_entries(self) -> list[dict]:
        entries: list[dict] = []
        data_dir = self.root / "data"
        for ledger_path in sorted(data_dir.glob("ledger-*.md")):
            lines = ledger_path.read_text(encoding="utf-8").splitlines()
            entries.extend(json.loads(line) for line in lines if line.strip())
        return entries

    def test_sync_captures_significant_events_from_hello_world_and_joke_fixtures(self) -> None:
        self.install_fixture(
            "hello_world_rollout.jsonl",
            "2026/01/02/rollout-2026-01-02T10-00-00-sess-hello-world.jsonl",
        )
        self.install_fixture(
            "punny_joke_rollout.jsonl",
            "2026/01/03/rollout-2026-01-03T11-00-00-sess-punny-joke.jsonl",
        )

        result = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)
        summary = json.loads(result.stdout.strip())
        self.assertEqual(summary["files_considered"], 2)
        self.assertEqual(summary["files_processed"], 2)
        self.assertEqual(summary["entries_appended"], 5)

        entries = self.read_all_entries()
        self.assertEqual(len(entries), 5)
        self.assertFalse(any("AGENTS.md instructions" in entry["msg"] for entry in entries))
        self.assertFalse(any("<skill>" in entry["msg"] for entry in entries))

        hello_entries = [entry for entry in entries if entry["session"] == "sess-hello-world"]
        self.assertEqual(
            [entry["entry_kind"] for entry in hello_entries],
            ["session_start", "notable_change", "session_end"],
        )
        self.assertIn("hello_world.py", hello_entries[0]["msg"])
        self.assertIn("Hello, world!", hello_entries[1]["msg"])
        self.assertIn("hello_world.py", hello_entries[2]["msg"])

        joke_entries = [entry for entry in entries if entry["session"] == "sess-punny-joke"]
        self.assertEqual(
            [entry["entry_kind"] for entry in joke_entries],
            ["session_start", "session_end"],
        )
        self.assertIn("punny programming joke", joke_entries[0]["msg"])
        self.assertIn("punny programming joke", joke_entries[1]["msg"])

    def test_sync_emits_structured_invocation_metadata_for_named_skills(self) -> None:
        rollout_path = self.install_fixture(
            "hello_world_rollout.jsonl",
            "2026/01/04/rollout-2026-01-04T12-00-00-sess-swarm.jsonl",
        )
        rollout_path.write_text(
            "\n".join(
                [
                    json.dumps(
                        {
                            "timestamp": "2026-01-04T12:00:00Z",
                            "type": "session_meta",
                            "payload": {
                                "id": "sess-swarm",
                                "timestamp": "2026-01-04T12:00:00Z",
                                "cwd": "/tmp/swarm-workspace",
                            },
                        },
                        ensure_ascii=True,
                    ),
                    json.dumps(
                        {
                            "timestamp": "2026-01-04T12:00:01Z",
                            "type": "response_item",
                            "payload": {
                                "type": "message",
                                "role": "user",
                                "content": [
                                    {
                                        "type": "input_text",
                                        "text": "Run the multi-agent feature loop.",
                                    }
                                ],
                            },
                        },
                        ensure_ascii=True,
                    ),
                    json.dumps(
                        {
                            "timestamp": "2026-01-04T12:00:02Z",
                            "type": "response_item",
                            "payload": {
                                "type": "message",
                                "role": "assistant",
                                "phase": "commentary",
                                "content": [
                                    {
                                        "type": "output_text",
                                        "text": "Using `sw-loop` with `specy` and `gen-notifier`.",
                                    }
                                ],
                            },
                        },
                        ensure_ascii=True,
                    ),
                    json.dumps(
                        {
                            "timestamp": "2026-01-04T12:00:03Z",
                            "type": "response_item",
                            "payload": {
                                "type": "message",
                                "role": "assistant",
                                "phase": "final_answer",
                                "content": [
                                    {
                                        "type": "output_text",
                                        "text": "Finished the loop.",
                                    }
                                ],
                            },
                        },
                        ensure_ascii=True,
                    ),
                ]
            )
            + "\n",
            encoding="utf-8",
        )

        result = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        entries = self.read_all_entries()
        swarm_entries = [entry for entry in entries if entry["session"] == "sess-swarm"]
        self.assertEqual([entry["entry_kind"] for entry in swarm_entries], ["session_start", "session_end"])

        start_entry = swarm_entries[0]
        self.assertEqual(start_entry["invoked_skill"], "sw-loop")
        self.assertEqual(start_entry["invoked_skills"], ["sw-loop", "specy", "gen-notifier"])
        self.assertEqual(start_entry["invocation_trigger"], "explicit")

        by_secondary_skill = self.run_cli("filter", "--invoked-skill", "specy")
        self.assertEqual(by_secondary_skill.returncode, 0, msg=by_secondary_skill.stderr)
        filtered = [json.loads(line) for line in by_secondary_skill.stdout.splitlines() if line.strip()]
        self.assertEqual(len(filtered), 1)
        self.assertEqual(filtered[0]["session"], "sess-swarm")

    def test_sync_is_idempotent_recovers_from_stale_state_and_rechecks_changed_rollout(self) -> None:
        rollout_path = self.install_fixture(
            "hello_world_rollout.jsonl",
            "2026/01/02/rollout-2026-01-02T10-00-00-sess-hello-world.jsonl",
        )

        first = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(first.returncode, 0, msg=first.stderr)
        self.assertEqual(json.loads(first.stdout.strip())["entries_appended"], 3)

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
        self.assertEqual(stale_summary["entries_already_present"], 3)

        self.append_rollout_entries(
            rollout_path,
            [
                self.make_message(
                    "2026-01-02T10:00:07Z",
                    role="user",
                    text="Make the script executable too.",
                ),
                self.make_message(
                    "2026-01-02T10:00:08Z",
                    role="assistant",
                    phase="commentary",
                    text="I'm updating hello_world.py so it can be run directly from the shell.",
                ),
                self.make_message(
                    "2026-01-02T10:00:09Z",
                    role="assistant",
                    phase="final_answer",
                    text="Updated hello_world.py so it can be run directly.",
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

        entries = self.read_all_entries()
        hello_entries = [entry for entry in entries if entry["session"] == "sess-hello-world"]
        self.assertEqual(len(hello_entries), 5)
        self.assertIn("run directly", hello_entries[-2]["msg"])
        self.assertIn("run directly", hello_entries[-1]["msg"])

    def test_sync_uses_fixture_timestamps_for_ledger_dates(self) -> None:
        self.install_fixture(
            "punny_joke_rollout.jsonl",
            "2026/01/03/rollout-2026-01-03T11-00-00-sess-punny-joke.jsonl",
        )

        result = self.run_cli(
            "sync",
            "--session-root",
            str(self.session_root),
            "--lookback-minutes",
            "1440",
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)

        expected_date = self.local_date_str("2026-01-03T11:00:02Z")
        expected_ledger_path = self.root / "data" / f"ledger-{expected_date}.md"
        self.assertTrue(expected_ledger_path.exists())

        today_ledger_path = self.root / "data" / f"ledger-{datetime.now().astimezone().strftime('%Y-%m-%d')}.md"
        if today_ledger_path != expected_ledger_path:
            self.assertFalse(today_ledger_path.exists())


if __name__ == "__main__":
    unittest.main()
