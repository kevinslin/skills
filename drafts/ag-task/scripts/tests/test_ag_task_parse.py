#!/usr/bin/env python3
import builtins
import importlib.machinery
import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "ag-task-parse"


class AgTaskParseTests(unittest.TestCase):
    def parse(self, markdown: str) -> dict:
        with tempfile.NamedTemporaryFile("w", suffix=".md", encoding="utf-8", delete=False) as handle:
            handle.write(markdown)
            temp_path = Path(handle.name)
        try:
            result = subprocess.run(
                [str(SCRIPT), str(temp_path)],
                check=True,
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            return json.loads(result.stdout)
        finally:
            temp_path.unlink(missing_ok=True)

    def load_parser_module(self):
        loader = importlib.machinery.SourceFileLoader("ag_task_parse_for_tests", str(SCRIPT))
        spec = importlib.util.spec_from_loader(loader.name, loader)
        self.assertIsNotNone(spec)
        module = importlib.util.module_from_spec(spec)
        loader.exec_module(module)
        return module

    def test_ignores_headings_inside_fenced_code(self):
        data = self.parse(
            """---
owner: test
---
Preamble

## this is a task

add another level to the following header

```
## this is not a task
### nor is this a follow-on
```

### follow on

run after the first task
"""
        )

        self.assertEqual(data["frontmatter"], {"owner": "test"})
        self.assertEqual(data["task_count"], 1)
        self.assertEqual(data["tasks"][0]["title"], "this is a task")
        self.assertIn("## this is not a task", data["tasks"][0]["initial_instruction"])
        self.assertEqual(len(data["tasks"][0]["followons"]), 1)
        self.assertEqual(data["tasks"][0]["followons"][0]["title"], "follow on")

    def test_splits_multiple_level_two_tasks(self):
        data = self.parse(
            """## first
do first

### then
follow first

## second
do second
"""
        )

        self.assertEqual(data["task_count"], 2)
        self.assertEqual(data["tasks"][0]["initial_instruction"].strip(), "do first")
        self.assertEqual(data["tasks"][0]["followons"][0]["body"].strip(), "follow first")
        self.assertEqual(data["tasks"][1]["title"], "second")
        self.assertEqual(data["tasks"][1]["followons"], [])

    def test_ignores_indented_code_headings(self):
        data = self.parse(
            """## real task
body

    ## indented code, not a task
    ### indented code, not a follow-on

### real follow-on
do more
"""
        )

        self.assertEqual(data["task_count"], 1)
        self.assertIn("## indented code, not a task", data["tasks"][0]["initial_instruction"])
        self.assertEqual(len(data["tasks"][0]["followons"]), 1)
        self.assertEqual(data["tasks"][0]["followons"][0]["title"], "real follow-on")

    def test_frontmatter_parses_without_pyyaml(self):
        module = self.load_parser_module()
        original_import = builtins.__import__

        def import_without_yaml(name, *args, **kwargs):
            if name == "yaml":
                raise ImportError("blocked for test")
            return original_import(name, *args, **kwargs)

        builtins.__import__ = import_without_yaml
        try:
            data = module.parse_markdown_task_text(
                """---
cwd: /tmp/example
max_agents: 2
serial: false
tags: [one, two]
owners:
  - agent-a
  - agent-b
---
## task
do it
"""
            )
        finally:
            builtins.__import__ = original_import

        self.assertEqual(data["frontmatter"]["cwd"], "/tmp/example")
        self.assertEqual(data["frontmatter"]["max_agents"], 2)
        self.assertIs(data["frontmatter"]["serial"], False)
        self.assertEqual(data["frontmatter"]["tags"], ["one", "two"])
        self.assertEqual(data["frontmatter"]["owners"], ["agent-a", "agent-b"])

    def test_preserves_multiple_followons_in_order(self):
        data = self.parse(
            """## task
initial

### first follow-on
first body

### second follow-on
second body
"""
        )

        followons = data["tasks"][0]["followons"]
        self.assertEqual([item["title"] for item in followons], ["first follow-on", "second follow-on"])
        self.assertEqual(followons[0]["body"].strip(), "first body")
        self.assertEqual(followons[1]["body"].strip(), "second body")

    def test_ignores_level_three_before_first_level_two(self):
        data = self.parse(
            """### not a follow-on
context only

## task
do it
"""
        )

        self.assertEqual(data["task_count"], 1)
        self.assertIn("### not a follow-on", data["preamble"])
        self.assertEqual(data["tasks"][0]["title"], "task")
        self.assertEqual(data["tasks"][0]["followons"], [])

    def test_no_level_two_tasks(self):
        data = self.parse(
            """# title

### not enough
body
"""
        )

        self.assertEqual(data["task_count"], 0)
        self.assertEqual(data["tasks"], [])
        self.assertIn("### not enough", data["preamble"])

    def test_empty_initial_body_before_followon(self):
        data = self.parse(
            """## task
### first follow-on
body
"""
        )

        self.assertEqual(data["tasks"][0]["initial_instruction"], "")
        self.assertEqual(data["tasks"][0]["followons"][0]["title"], "first follow-on")


if __name__ == "__main__":
    unittest.main()
