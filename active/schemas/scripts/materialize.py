#!/usr/bin/env -S uv run --script
# /// script
# dependencies = []
# ///
from __future__ import annotations

import os
import sys
from pathlib import Path


def main() -> None:
    schema = Path(__file__).with_name("schema")
    os.execvp("uv", ["uv", "run", "--script", str(schema), *sys.argv[1:]])


if __name__ == "__main__":
    main()
