#!/usr/bin/env python3
"""
Skill Initializer - Creates a new skill from template

Usage:
    init_skill.py <skill-name> --path <path> [--template <template>]

Examples:
    init_skill.py my-new-skill --path skills/public
    init_skill.py my-api-helper --path skills/private
    init_skill.py custom-skill --path /custom/location
    init_skill.py command-skill --path skills/public --template subcommands
"""

import argparse
import sys
from pathlib import Path


SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: Complete and informative explanation of what the skill does and when to use it. Include WHEN to use this skill - specific scenarios, file types, or tasks that trigger it.]
dependencies: []
---

# {skill_title}

## Overview

[TODO: 1-2 sentences explaining what this skill enables]

## Structuring This Skill

[TODO: Choose the structure that best fits this skill's purpose. Common patterns:

**1. Workflow-Based** (best for sequential processes)
- Works well when there are clear step-by-step procedures
- Example: DOCX skill with "Workflow Decision Tree" → "Reading" → "Creating" → "Editing"
- Structure: ## Overview → ## Workflow Decision Tree → ## Step 1 → ## Step 2...

**2. Task-Based** (best for tool collections)
- Works well when the skill offers different operations/capabilities
- Example: PDF skill with "Quick Start" → "Merge PDFs" → "Split PDFs" → "Extract Text"
- Structure: ## Overview → ## Quick Start → ## Task Category 1 → ## Task Category 2...

**3. Reference/Guidelines** (best for standards or specifications)
- Works well for brand guidelines, coding standards, or requirements
- Example: Brand styling with "Brand Guidelines" → "Colors" → "Typography" → "Features"
- Structure: ## Overview → ## Guidelines → ## Specifications → ## Usage...

**4. Capabilities-Based** (best for integrated systems)
- Works well when the skill provides multiple interrelated features
- Example: Product Management with "Core Capabilities" → numbered capability list
- Structure: ## Overview → ## Core Capabilities → ### 1. Feature → ### 2. Feature...

Patterns can be mixed and matched as needed. Most skills combine patterns (e.g., start with task-based, add workflow for complex operations).

Delete this entire "Structuring This Skill" section when done - it's just guidance.]

## [TODO: Replace with the first main section based on chosen structure]

[TODO: Add content here. See examples in existing skills:
- Code samples for technical skills
- Decision trees for complex workflows
- Concrete examples with realistic user requests
- References to scripts/templates/references as needed]

## Resources

This skill includes example resource directories that demonstrate how to organize different types of bundled resources:

### scripts/
Executable code (Python/Bash/etc.) that can be run directly to perform specific operations.

**Examples from other skills:**
- PDF skill: `fill_fillable_fields.py`, `extract_form_field_info.py` - utilities for PDF manipulation
- DOCX skill: `document.py`, `utilities.py` - Python modules for document processing

**Appropriate for:** Python scripts, shell scripts, or any executable code that performs automation, data processing, or specific operations.

**Note:** Scripts may be executed without loading into context, but can still be read by Claude for patching or environment adjustments.

### references/
Documentation and reference material intended to be loaded into context to inform Claude's process and thinking.

**Examples from other skills:**
- Product management: `communication.md`, `context_building.md` - detailed workflow guides
- BigQuery: API reference documentation and query examples
- Finance: Schema documentation, company policies

**Appropriate for:** In-depth documentation, API references, database schemas, comprehensive guides, or any detailed information that Claude should reference while working.

### assets/
Files not intended to be loaded into context, but rather used within the output Claude produces.

**Examples from other skills:**
- Brand styling: PowerPoint template files (.pptx), logo files
- Frontend builder: HTML/React boilerplate project directories
- Typography: Font files (.ttf, .woff2)

**Appropriate for:** Templates, boilerplate code, document templates, images, icons, fonts, or any files meant to be copied or used in the final output.

---

**Any unneeded directories can be deleted.** Not every skill requires all three types of resources.
"""

SUBCOMMANDS_SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: Describe what this skill does and when to use it. Mention that the skill routes requests to specific subcommands documented under ./references/*.md.]
dependencies: []
---

# {skill_title}

Keep this file lean. Use it only to route the agent to the right subcommand reference.

## Subcommands

When the user clearly asks for one of these flows, lead with that subcommand and read the matching reference before acting.

- `{command_one}`: [TODO: Add a one-line hint for when to use this subcommand.] See `./references/{command_one}.md`.
- `{command_two}`: [TODO: Add a one-line hint for when to use this subcommand.] See `./references/{command_two}.md`.

## Maintenance Rules

- Put the full workflow, guardrails, examples, and output requirements for each subcommand in `./references/{{command}}.md`.
- Add one reference file per subcommand and keep filenames identical to the subcommand name.
- Do not duplicate detailed command behavior in this file. Keep only routing guidance here.
"""

EXAMPLE_SCRIPT = '''#!/usr/bin/env python3
"""
Example helper script for {skill_name}

This is a placeholder script that can be executed directly.
Replace with actual implementation or delete if not needed.

Example real scripts from other skills:
- pdf/scripts/fill_fillable_fields.py - Fills PDF form fields
- pdf/scripts/convert_pdf_to_images.py - Converts PDF pages to images
"""

def main():
    print("This is an example script for {skill_name}")
    # TODO: Add actual script logic here
    # This could be data processing, file conversion, API calls, etc.

if __name__ == "__main__":
    main()
'''

EXAMPLE_REFERENCE = """# Reference Documentation for {skill_title}

This is a placeholder for detailed reference documentation.
Replace with actual reference content or delete if not needed.

Example real reference docs from other skills:
- product-management/references/communication.md - Comprehensive guide for status updates
- product-management/references/context_building.md - Deep-dive on gathering context
- bigquery/references/ - API references and query examples

## When Reference Docs Are Useful

Reference docs are ideal for:
- Comprehensive API documentation
- Detailed workflow guides
- Complex multi-step processes
- Information too lengthy for main SKILL.md
- Content that's only needed for specific use cases

## Structure Suggestions

### API Reference Example
- Overview
- Authentication
- Endpoints with examples
- Error codes
- Rate limits

### Workflow Guide Example
- Prerequisites
- Step-by-step instructions
- Common patterns
- Troubleshooting
- Best practices
"""

EXAMPLE_ASSET = """# Example Asset File

This placeholder represents where asset files would be stored.
Replace with actual asset files (templates, images, fonts, etc.) or delete if not needed.

Asset files are NOT intended to be loaded into context, but rather used within
the output Claude produces.

Example asset files from other skills:
- Brand guidelines: logo.png, slides_template.pptx
- Frontend builder: hello-world/ directory with HTML/React boilerplate
- Typography: custom-font.ttf, font-family.woff2
- Data: sample_data.csv, test_dataset.json

## Common Asset Types

- Templates: .pptx, .docx, boilerplate directories
- Images: .png, .jpg, .svg, .gif
- Fonts: .ttf, .otf, .woff, .woff2
- Boilerplate code: Project directories, starter files
- Icons: .ico, .svg
- Data files: .csv, .json, .xml, .yaml

Note: This is a text placeholder. Actual assets can be any file type.
"""

SUBCOMMAND_REFERENCE_TEMPLATE = """# `{command_name}`

Use this reference when the user asks for the `{command_name}` subcommand or when the main skill routes here.

## When To Lead With This Command

- [TODO: Describe the user requests or contexts that should trigger `{command_name}`.]

## Inputs

- [TODO: Required inputs]
- [TODO: Optional inputs]

## Workflow

1. [TODO: First step]
2. [TODO: Second step]
3. [TODO: Verification or close-out]

## Output

- [TODO: Describe the expected result or artifact]
"""

DEFAULT_TEMPLATE_NAME = "default"
SUBCOMMANDS_TEMPLATE_NAME = "subcommands"
SUBCOMMAND_PLACEHOLDERS = ("command-a", "command-b")


def title_case_skill_name(skill_name):
    """Convert hyphenated skill name to Title Case for display."""
    return ' '.join(word.capitalize() for word in skill_name.split('-'))


def render_default_template(skill_name):
    """Return files for the default skill scaffold."""
    skill_title = title_case_skill_name(skill_name)
    files = {
        "SKILL.md": SKILL_TEMPLATE.format(
            skill_name=skill_name,
            skill_title=skill_title,
        ),
        "scripts/example.py": EXAMPLE_SCRIPT.format(skill_name=skill_name),
        "references/api_reference.md": EXAMPLE_REFERENCE.format(skill_title=skill_title),
        "assets/example_asset.txt": EXAMPLE_ASSET,
    }
    executable_paths = {"scripts/example.py"}
    return files, executable_paths


def render_subcommands_template(skill_name):
    """Return files for a subcommand-oriented skill scaffold."""
    skill_title = title_case_skill_name(skill_name)
    command_one, command_two = SUBCOMMAND_PLACEHOLDERS
    files = {
        "SKILL.md": SUBCOMMANDS_SKILL_TEMPLATE.format(
            skill_name=skill_name,
            skill_title=skill_title,
            command_one=command_one,
            command_two=command_two,
        ),
    }
    for command_name in SUBCOMMAND_PLACEHOLDERS:
        files[f"references/{command_name}.md"] = SUBCOMMAND_REFERENCE_TEMPLATE.format(
            command_name=command_name,
        )
    return files, set()


TEMPLATE_RENDERERS = {
    DEFAULT_TEMPLATE_NAME: render_default_template,
    SUBCOMMANDS_TEMPLATE_NAME: render_subcommands_template,
}


def init_skill(skill_name, path, template=DEFAULT_TEMPLATE_NAME):
    """
    Initialize a new skill directory with template SKILL.md.

    Args:
        skill_name: Name of the skill
        path: Path where the skill directory should be created
        template: Template name to scaffold

    Returns:
        Path to created skill directory, or None if error
    """
    if template not in TEMPLATE_RENDERERS:
        print(f"❌ Error: Unknown template '{template}'. Available templates: {', '.join(sorted(TEMPLATE_RENDERERS))}")
        return None

    # Determine skill directory path
    skill_dir = Path(path).resolve() / skill_name

    # Check if directory already exists
    if skill_dir.exists():
        print(f"❌ Error: Skill directory already exists: {skill_dir}")
        return None

    # Create skill directory
    try:
        skill_dir.mkdir(parents=True, exist_ok=False)
        print(f"✅ Created skill directory: {skill_dir}")
    except Exception as e:
        print(f"❌ Error creating directory: {e}")
        return None

    files, executable_paths = TEMPLATE_RENDERERS[template](skill_name)
    try:
        for relative_path, content in files.items():
            file_path = skill_dir / relative_path
            file_path.parent.mkdir(parents=True, exist_ok=True)
            file_path.write_text(content)
            if relative_path in executable_paths:
                file_path.chmod(0o755)
            print(f"✅ Created {relative_path}")
    except Exception as e:
        print(f"❌ Error creating template files: {e}")
        return None

    # Print next steps
    print(f"\n✅ Skill '{skill_name}' initialized successfully at {skill_dir}")
    print(f"   Template: {template}")
    print("\nNext steps:")
    print("1. Edit SKILL.md to complete the TODO items and update the description")
    if template == SUBCOMMANDS_TEMPLATE_NAME:
        print("2. Replace the placeholder subcommand names with real command names and keep each command in references/<command>.md")
        print("3. Add dependency references in the body, then run scripts/sync_dependencies.py to auto-populate frontmatter dependencies")
    else:
        print("2. Add dependency references in the body, then run scripts/sync_dependencies.py to auto-populate frontmatter dependencies")
        print("3. Customize or delete the example files in scripts/, references/, and assets/")
    print("4. Run the validator when ready to check the skill structure")

    return skill_dir


def main():
    parser = argparse.ArgumentParser(
        description="Create a new skill scaffold.",
    )
    parser.add_argument("skill_name")
    parser.add_argument("--path", required=True)
    parser.add_argument(
        "--template",
        default=DEFAULT_TEMPLATE_NAME,
        choices=sorted(TEMPLATE_RENDERERS),
        help="Scaffold shape to use.",
    )
    args = parser.parse_args()

    skill_name = args.skill_name
    path = args.path
    template = args.template

    print(f"🚀 Initializing skill: {skill_name}")
    print(f"   Location: {path}")
    print(f"   Template: {template}")
    print()

    result = init_skill(skill_name, path, template=template)

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
