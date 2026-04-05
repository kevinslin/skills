#!/usr/bin/env python3
"""Integration tests for sc script tooling."""

from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parents[1]
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import dependency_tools
import init_skill
import package_skill
import quick_validate
import sync_dependencies


RENAME_SCRIPT = SCRIPT_DIR / "rename_skill.py"


def _write_skill(
    skill_dir: Path,
    *,
    name: str,
    description: str = "test skill",
    dependencies_line: str | None = "dependencies: []",
    body: str = "",
) -> None:
    skill_dir.mkdir(parents=True, exist_ok=True)
    lines = [
        "---",
        f"name: {name}",
        f"description: {description}",
    ]
    if dependencies_line is not None:
        lines.append(dependencies_line)
    lines.extend(["---", "", body])
    (skill_dir / "SKILL.md").write_text("\n".join(lines), encoding="utf-8")


class ScScriptsIntegrationTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def test_is_valid_skill_name_rules(self) -> None:
        self.assertTrue(dependency_tools.is_valid_skill_name("specy"))
        self.assertTrue(dependency_tools.is_valid_skill_name("dev.review"))
        self.assertTrue(dependency_tools.is_valid_skill_name("sc"))

        self.assertFalse(dependency_tools.is_valid_skill_name("Specy"))
        self.assertFalse(dependency_tools.is_valid_skill_name("sc--helper"))
        self.assertFalse(dependency_tools.is_valid_skill_name("sc..helper"))
        self.assertFalse(dependency_tools.is_valid_skill_name("sc-"))

    def test_normalize_dependencies_merges_detected_links(self) -> None:
        frontmatter = {
            "name": "consumer",
            "description": "test",
            "dependencies": ["dev.llm-session"],
        }
        body = (
            "Use /Users/kevinlin/code/skills/active/specy/SKILL.md and "
            "ignore self /Users/kevinlin/code/skills/active/consumer/SKILL.md."
        )

        updated, merged, added, changed = dependency_tools.normalize_dependencies(
            frontmatter,
            body,
            ensure_field=True,
        )

        self.assertTrue(changed)
        self.assertEqual(merged, ["dev.llm-session", "specy"])
        self.assertEqual(added, ["specy"])
        self.assertEqual(updated["dependencies"], ["dev.llm-session", "specy"])

    def test_sync_dependencies_updates_skill_file_from_body_links(self) -> None:
        skill_dir = self.root / "sync-skill"
        _write_skill(
            skill_dir,
            name="sync-skill",
            body="See /Users/kevinlin/code/skills/active/specy/SKILL.md.",
        )

        changed, merged, added = sync_dependencies.sync_dependencies(skill_dir, ensure_field=True)

        self.assertTrue(changed)
        self.assertEqual(merged, ["specy"])
        self.assertEqual(added, ["specy"])

        frontmatter, _ = dependency_tools.parse_skill_markdown(skill_dir / "SKILL.md")
        self.assertEqual(frontmatter["dependencies"], ["specy"])

    def test_sync_dependencies_respects_no_ensure_field(self) -> None:
        skill_dir = self.root / "no-ensure-skill"
        _write_skill(
            skill_dir,
            name="no-ensure-skill",
            dependencies_line=None,
            body="No explicit skill path links here.",
        )

        changed, merged, added = sync_dependencies.sync_dependencies(skill_dir, ensure_field=False)

        self.assertFalse(changed)
        self.assertEqual(merged, [])
        self.assertEqual(added, [])

        frontmatter, _ = dependency_tools.parse_skill_markdown(skill_dir / "SKILL.md")
        self.assertNotIn("dependencies", frontmatter)

    def test_quick_validate_rejects_duplicate_dependencies(self) -> None:
        skill_dir = self.root / "dup-deps-skill"
        _write_skill(
            skill_dir,
            name="dup-deps-skill",
            dependencies_line="dependencies: [specy, specy]",
        )

        valid, message = quick_validate.validate_skill(skill_dir)

        self.assertFalse(valid)
        self.assertIn("Duplicate dependency", message)

    def test_quick_validate_rejects_self_dependency(self) -> None:
        skill_dir = self.root / "self-dep-skill"
        _write_skill(
            skill_dir,
            name="self-dep-skill",
            dependencies_line="dependencies: [self-dep-skill]",
        )

        valid, message = quick_validate.validate_skill(skill_dir)

        self.assertFalse(valid)
        self.assertIn("cannot list itself", message)

    def test_init_skill_default_template_creates_example_resources(self) -> None:
        skill_dir = init_skill.init_skill("default-skill", self.root)

        self.assertIsNotNone(skill_dir)
        assert skill_dir is not None
        self.assertTrue((skill_dir / "SKILL.md").exists())
        self.assertTrue((skill_dir / "scripts" / "example.py").exists())
        self.assertTrue((skill_dir / "references" / "api_reference.md").exists())
        self.assertTrue((skill_dir / "assets" / "example_asset.txt").exists())

    def test_init_skill_subcommands_template_creates_router_and_references(self) -> None:
        skill_dir = init_skill.init_skill(
            "subcommand-skill",
            self.root,
            template=init_skill.SUBCOMMANDS_TEMPLATE_NAME,
        )

        self.assertIsNotNone(skill_dir)
        assert skill_dir is not None

        skill_body = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("Keep this file lean. Use it only to route the agent", skill_body)
        self.assertIn("`command-a`", skill_body)
        self.assertIn("./references/command-a.md", skill_body)
        self.assertIn("./references/command-b.md", skill_body)

        command_reference = (skill_dir / "references" / "command-a.md").read_text(encoding="utf-8")
        self.assertIn("When To Lead With This Command", command_reference)
        self.assertFalse((skill_dir / "scripts").exists())
        self.assertFalse((skill_dir / "assets").exists())

    def test_init_skill_cli_accepts_template_flag(self) -> None:
        init_script = SCRIPT_DIR / "init_skill.py"
        result = subprocess.run(
            [
                sys.executable,
                str(init_script),
                "cli-subcommands-skill",
                "--path",
                str(self.root),
                "--template",
                init_skill.SUBCOMMANDS_TEMPLATE_NAME,
            ],
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("Template: subcommands", result.stdout)
        self.assertTrue((self.root / "cli-subcommands-skill" / "references" / "command-a.md").exists())

    def test_rename_skill_cli_updates_dependencies_and_body(self) -> None:
        old_skill_dir = self.root / "active" / "old-skill"
        consumer_dir = self.root / "active" / "consumer"
        _write_skill(
            old_skill_dir,
            name="old-skill",
            dependencies_line="dependencies: [specy]",
            body="Use $old-skill and /active/old-skill/SKILL.md and `old-skill`.",
        )
        _write_skill(
            consumer_dir,
            name="consumer",
            dependencies_line="dependencies: [old-skill]",
            body="Reference old-skill and use skill [old-skill].",
        )

        result = subprocess.run(
            [sys.executable, str(RENAME_SCRIPT), str(self.root), "old-skill", "new-skill"],
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("NOTICE:", result.stdout)
        self.assertFalse((self.root / "active" / "old-skill").exists())
        self.assertTrue((self.root / "active" / "new-skill").exists())

        renamed_frontmatter, renamed_body = dependency_tools.parse_skill_markdown(
            self.root / "active" / "new-skill" / "SKILL.md"
        )
        self.assertEqual(renamed_frontmatter["name"], "new-skill")
        self.assertIn("$new-skill", renamed_body)
        self.assertIn("/active/new-skill/SKILL.md", renamed_body)

        consumer_frontmatter, consumer_body = dependency_tools.parse_skill_markdown(
            self.root / "active" / "consumer" / "SKILL.md"
        )
        self.assertEqual(consumer_frontmatter["dependencies"], ["new-skill"])
        self.assertIn("new-skill", consumer_body)
        self.assertNotIn("old-skill", consumer_body)

    def test_rename_skill_cli_dry_run_does_not_modify_files(self) -> None:
        old_skill_dir = self.root / "active" / "old-skill"
        consumer_dir = self.root / "active" / "consumer"
        _write_skill(old_skill_dir, name="old-skill", body="Use old-skill.")
        _write_skill(
            consumer_dir,
            name="consumer",
            dependencies_line="dependencies: [old-skill]",
            body="use skill [old-skill]",
        )

        result = subprocess.run(
            [
                sys.executable,
                str(RENAME_SCRIPT),
                str(self.root),
                "old-skill",
                "new-skill",
                "--dry-run",
            ],
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, msg=result.stderr)
        self.assertIn("DRY RUN", result.stdout)
        self.assertTrue((self.root / "active" / "old-skill").exists())
        self.assertFalse((self.root / "active" / "new-skill").exists())

        consumer_frontmatter, consumer_body = dependency_tools.parse_skill_markdown(
            self.root / "active" / "consumer" / "SKILL.md"
        )
        self.assertEqual(consumer_frontmatter["dependencies"], ["old-skill"])
        self.assertIn("old-skill", consumer_body)

    def test_package_skill_auto_syncs_dependencies_before_packaging(self) -> None:
        skill_dir = self.root / "pkg-skill"
        _write_skill(
            skill_dir,
            name="pkg-skill",
            body="Use /Users/kevinlin/code/skills/active/specy/SKILL.md.",
        )
        output_dir = self.root / "dist"

        packaged = package_skill.package_skill(skill_dir, output_dir)

        self.assertIsNotNone(packaged)
        assert packaged is not None
        self.assertTrue(packaged.exists())

        frontmatter, _ = dependency_tools.parse_skill_markdown(skill_dir / "SKILL.md")
        self.assertEqual(frontmatter["dependencies"], ["specy"])

        with zipfile.ZipFile(packaged, "r") as zipf:
            self.assertIn("pkg-skill/SKILL.md", zipf.namelist())


if __name__ == "__main__":
    unittest.main()
