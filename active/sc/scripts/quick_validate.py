#!/usr/bin/env python3
"""
Quick validation script for skills - minimal version
"""

import sys
import yaml
from pathlib import Path

from dependency_tools import (
    FRONTMATTER_RE,
    is_valid_skill_name,
    normalize_dependencies,
)

def validate_skill(skill_path):
    """Basic validation of a skill"""
    skill_path = Path(skill_path)

    # Check SKILL.md exists
    skill_md = skill_path / 'SKILL.md'
    if not skill_md.exists():
        return False, "SKILL.md not found"

    # Read and validate frontmatter
    content = skill_md.read_text()
    if not content.startswith('---'):
        return False, "No YAML frontmatter found"

    # Extract frontmatter
    match = FRONTMATTER_RE.match(content)
    if not match:
        return False, "Invalid frontmatter format"

    frontmatter_text = match.group(1)
    body = content[match.end() :]

    # Parse YAML frontmatter
    try:
        frontmatter = yaml.safe_load(frontmatter_text)
        if not isinstance(frontmatter, dict):
            return False, "Frontmatter must be a YAML dictionary"
    except yaml.YAMLError as e:
        return False, f"Invalid YAML in frontmatter: {e}"

    # Define allowed properties
    ALLOWED_PROPERTIES = {
        'name',
        'description',
        'dependencies',
        'version',
        'license',
        'allowed-tools',
        'metadata',
    }

    # Check for unexpected properties (excluding nested keys under metadata)
    unexpected_keys = set(frontmatter.keys()) - ALLOWED_PROPERTIES
    if unexpected_keys:
        return False, (
            f"Unexpected key(s) in SKILL.md frontmatter: {', '.join(sorted(unexpected_keys))}. "
            f"Allowed properties are: {', '.join(sorted(ALLOWED_PROPERTIES))}"
        )

    # Check required fields
    if 'name' not in frontmatter:
        return False, "Missing 'name' in frontmatter"
    if 'description' not in frontmatter:
        return False, "Missing 'description' in frontmatter"

    # Extract name for validation
    name = frontmatter.get('name', '')
    if not isinstance(name, str):
        return False, f"Name must be a string, got {type(name).__name__}"
    name = name.strip()
    if name:
        # Check naming convention (lowercase with hyphens and optional dots)
        if not is_valid_skill_name(name):
            return False, (
                f"Name '{name}' should use lowercase letters, digits, hyphens, and dots only, "
                "without consecutive separators."
            )
        # Check name length (max 64 characters per spec)
        if len(name) > 64:
            return False, f"Name is too long ({len(name)} characters). Maximum is 64 characters."

    # Validate dependencies metadata (optional, but must be valid when present)
    dependencies = frontmatter.get('dependencies')
    if dependencies is not None:
        if not isinstance(dependencies, list):
            return False, "dependencies must be a YAML list of skill names"

        seen = set()
        for dep in dependencies:
            if not isinstance(dep, str):
                return False, "dependencies must contain only strings"
            dep = dep.strip()
            if not dep:
                return False, "dependencies cannot contain empty skill names"
            if not is_valid_skill_name(dep):
                return False, f"Invalid dependency name '{dep}'"
            if dep == name:
                return False, "A skill cannot list itself in dependencies"
            if dep in seen:
                return False, f"Duplicate dependency '{dep}'"
            seen.add(dep)

    # Ensure dependency inference utility can parse and normalize this file.
    # This catches invalid dependency field types early with a clear message.
    try:
        normalize_dependencies(frontmatter, body, ensure_field=False)
    except ValueError as exc:
        return False, str(exc)

    # Extract and validate description
    description = frontmatter.get('description', '')
    if not isinstance(description, str):
        return False, f"Description must be a string, got {type(description).__name__}"
    description = description.strip()
    if description:
        # Check for angle brackets
        if '<' in description or '>' in description:
            return False, "Description cannot contain angle brackets (< or >)"
        # Check description length (max 1024 characters per spec)
        if len(description) > 1024:
            return False, f"Description is too long ({len(description)} characters). Maximum is 1024 characters."

    return True, "Skill is valid!"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python quick_validate.py <skill_directory>")
        sys.exit(1)
    
    valid, message = validate_skill(sys.argv[1])
    print(message)
    sys.exit(0 if valid else 1)
