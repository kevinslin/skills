#!/usr/bin/env python3
"""Tests for the specy flow-doc validator."""

from __future__ import annotations

import importlib.util
import sys
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "validate_flow_doc.py"
SPEC = importlib.util.spec_from_file_location("validate_flow_doc", SCRIPT_PATH)
assert SPEC is not None
validate_flow_doc = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = validate_flow_doc
assert SPEC.loader is not None
SPEC.loader.exec_module(validate_flow_doc)


def build_doc(*, title: str = "[Feature] Flow", frontmatter_extra: str = "") -> str:
    return f"""---
created: 2026-05-08
updated: 2026-05-08
last_updated_session: codex/session-id
{frontmatter_extra}---

# {title}

## Overview

This flow covers the example behavior.

## Entry Points

- src/example.ts:exampleEntry

## Sequence Diagram

```mermaid
graph TD
  A["Start"] --> B["Done"]
```

## Execution Trace

### 1. Start

This phase starts the flow.

#### 1.1 Enter

The entrypoint delegates to the implementation.

- src/example.ts:exampleEntry

```ts
exampleEntry()
```

## Notes

None identified.

## Observability

None identified.

## Related docs

- docs/example.md

## Manual Notes

None.

## Changelog

- 2026-05-08: Created doc. (codex/session-id)
"""


class FlowDocValidatorTests(unittest.TestCase):
    def validate(self, text: str):
        result = validate_flow_doc.ValidationResult()
        validate_flow_doc._validate_flow_doc(text, result)
        validate_flow_doc._validate_portable_repo_links(text, result)
        return result

    def test_pr_flow_passes_with_title_prefix_and_frontmatter(self) -> None:
        result = self.validate(
            build_doc(
                title="PR 79160: Codex Plugin Migration Flow",
                frontmatter_extra="pr: 79160\n",
            )
        )

        self.assertEqual(result.errors, [])

    def test_pr_frontmatter_requires_pr_title_prefix(self) -> None:
        result = self.validate(build_doc(frontmatter_extra="pr: 79160\n"))

        self.assertIn(
            "PR-scoped flow docs must prefix the H1 with 'PR <number>:'",
            result.errors,
        )

    def test_pr_title_prefix_requires_pr_frontmatter(self) -> None:
        result = self.validate(build_doc(title="PR 79160: Codex Plugin Migration Flow"))

        self.assertIn(
            "PR-scoped flow docs must include non-empty frontmatter key: 'pr'",
            result.errors,
        )


if __name__ == "__main__":
    unittest.main()
