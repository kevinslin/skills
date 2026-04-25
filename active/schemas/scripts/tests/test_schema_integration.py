#!/usr/bin/env python3
"""Integration tests for the schemas CLI."""

from __future__ import annotations

import shutil
import stat
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


TEST_DIR = Path(__file__).resolve().parent
SCRIPT_PATH = TEST_DIR.parents[0] / "schema"
REAL_SKILL_DIR = SCRIPT_PATH.parents[1]


class SchemaScriptIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.skill_dir = self.root / "schemas"
        self.references_dir = self.skill_dir / "references"
        self.script = self.skill_dir / "scripts" / "schema"
        self.script.parent.mkdir(parents=True)
        shutil.copyfile(SCRIPT_PATH, self.script)
        self.script.chmod(self.script.stat().st_mode | stat.S_IXUSR)

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def write_schema(self, name: str, schema_yaml: str, templates: dict[str, str]) -> None:
        schema_dir = self.references_dir / name
        schema_dir.mkdir(parents=True)
        (schema_dir / "schema.yaml").write_text(textwrap.dedent(schema_yaml).strip() + "\n", encoding="utf-8")
        for template_name, template in templates.items():
            (schema_dir / template_name).write_text(textwrap.dedent(template).strip() + "\n", encoding="utf-8")

    def install_prod_schema(self, name: str) -> None:
        shutil.copytree(REAL_SKILL_DIR / "references" / name, self.references_dir / name)

    def install_fixture_schema(self, name: str) -> None:
        shutil.copytree(TEST_DIR / "fixtures" / name, self.references_dir / name)

    def run_schema(self, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [str(self.script), *args],
            text=True,
            capture_output=True,
            check=False,
        )

    def test_children_from_uses_explicit_vars_and_child_defaults_without_parent_inheritance(self) -> None:
        self.write_schema(
            "parent",
            """
            version: 1.0
            output:
              path_style: directory
              file_extension: md
            variables:
              name: ["*"]
              child_value: ["*"]
            schema:
              "{{name}}":
                template: parent
                children_from:
                  - schema: child
                    vars:
                      child_name: "{{ child_value }}"
            """,
            {"parent.md.jinja": "parent={{ name }}"},
        )
        self.write_schema(
            "child",
            """
            version: 1.0
            variables:
              name: ["*"]
              child_name: ["*"]
              child_default:
                values: ["*"]
                default: defaulted
            schema:
              child:
                template: child
            """,
            {
                "child.md.jinja": "\n".join(
                    [
                        "child_name={{ child_name }}",
                        "parent_name_defined={{ name is defined }}",
                        "child_default={{ child_default }}",
                    ]
                )
            },
        )

        out = self.root / "out"
        result = self.run_schema(
            "materialize",
            "parent",
            "--out",
            str(out),
            "--var",
            "name=parent-name",
            "--var",
            "child_value=mapped-child",
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual((out / "parent-name.md").read_text(encoding="utf-8").strip(), "parent=parent-name")
        self.assertEqual(
            (out / "parent-name" / "child.md").read_text(encoding="utf-8").strip(),
            "\n".join(
                [
                    "child_name=mapped-child",
                    "parent_name_defined=False",
                    "child_default=defaulted",
                ]
            ),
        )

    def test_children_from_does_not_inherit_same_named_parent_vars_by_default(self) -> None:
        self.write_schema(
            "parent",
            """
            version: 1.0
            output:
              path_style: directory
              file_extension: md
            variables:
              name: ["*"]
            schema:
              "{{name}}":
                materialize: false
                children_from:
                  - schema: child
            """,
            {},
        )
        self.write_schema(
            "child",
            """
            version: 1.0
            variables:
              name: ["*"]
            schema:
              "{{name}}":
                template: child
            """,
            {"child.md.jinja": "child={{ name }}"},
        )

        result = self.run_schema(
            "materialize",
            "parent",
            "--out",
            str(self.root / "out"),
            "--var",
            "name=parent-name",
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing variable(s) for path segment '{{name}}': name", result.stderr)

    def test_children_from_can_explicitly_plumb_same_named_vars(self) -> None:
        self.write_schema(
            "parent",
            """
            version: 1.0
            output:
              path_style: directory
              file_extension: md
            variables:
              name: ["*"]
            schema:
              "{{name}}":
                materialize: false
                children_from:
                  - schema: child
                    vars:
                      name: "{{ name }}-child"
            """,
            {},
        )
        self.write_schema(
            "child",
            """
            version: 1.0
            variables:
              name: ["*"]
            schema:
              "{{name}}":
                template: child
            """,
            {"child.md.jinja": "child={{ name }}"},
        )

        out = self.root / "out"
        result = self.run_schema(
            "materialize",
            "parent",
            "--out",
            str(out),
            "--var",
            "name=parent-name",
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(
            (out / "parent-name" / "parent-name-child.md").read_text(encoding="utf-8").strip(),
            "child=parent-name-child",
        )

    def test_parent_explicit_child_wins_over_mounted_child_conflict(self) -> None:
        self.write_schema(
            "parent",
            """
            version: 1.0
            output:
              path_style: directory
              file_extension: md
            schema:
              root:
                materialize: false
                children:
                  shared:
                    template: parent-shared
                children_from:
                  - schema: child
            """,
            {"parent-shared.md.jinja": "parent shared"},
        )
        self.write_schema(
            "child",
            """
            version: 1.0
            schema:
              shared:
                template: child-shared
              child-only:
                template: child-only
            """,
            {
                "child-shared.md.jinja": "child shared",
                "child-only.md.jinja": "child only",
            },
        )

        out = self.root / "out"
        result = self.run_schema("materialize", "parent", "--out", str(out))

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual((out / "root" / "shared.md").read_text(encoding="utf-8").strip(), "parent shared")
        self.assertEqual((out / "root" / "child-only.md").read_text(encoding="utf-8").strip(), "child only")

    def test_children_from_path_resolves_relative_to_parent_schema_dir(self) -> None:
        self.write_schema(
            "parent",
            """
            version: 1.0
            output:
              path_style: directory
              file_extension: md
            schema:
              root:
                materialize: false
                children_from:
                  - path: ../child/schema.yaml
            """,
            {},
        )
        self.write_schema(
            "child",
            """
            version: 1.0
            schema:
              child:
                template: child
            """,
            {"child.md.jinja": "child from path"},
        )

        out = self.root / "out"
        result = self.run_schema("materialize", "parent", "--out", str(out))

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual((out / "root" / "child.md").read_text(encoding="utf-8").strip(), "child from path")

    def test_show_fixture_schema_expands_code_core_children_with_parent_description(self) -> None:
        self.install_prod_schema("code-core")
        self.install_fixture_schema("foo")

        result = self.run_schema("show", "foo")

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("pkg [path-only]", result.stdout)
        self.assertIn("{{name}} [path-only children_from=1]", result.stdout)
        self.assertIn("dev [template=default] - this is the foo test", result.stdout)
        self.assertIn("qa [template=qa] - testing", result.stdout)
        self.assertIn("obs [template=obs] - observability", result.stdout)
        self.assertIn("api [path-only] - api reference", result.stdout)
        self.assertIn("{{api_name}} [template=api] - api reference", result.stdout)

    def test_fixture_schema_materializes_code_core_qa_template(self) -> None:
        self.install_prod_schema("code-core")
        self.install_fixture_schema("foo")

        out = self.root / "out"
        result = self.run_schema(
            "materialize",
            "foo",
            "--out",
            str(out),
            "--var",
            "name=bar",
            "--include",
            "pkg/bar/dev/qa",
            "--skip-existing",
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertEqual(
            (out / "pkg" / "bar" / "dev" / "qa.md").read_text(encoding="utf-8").strip(),
            "\n".join(["## Setup", "", "## Unit Tests", "", "## Integration Tests"]),
        )


if __name__ == "__main__":
    unittest.main()
