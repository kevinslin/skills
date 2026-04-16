#!/usr/bin/env python3
# /// script
# dependencies = [
#   "copier>=9.0.0",
#   "jinja2>=3.1.0",
#   "pydantic>=2.0.0",
#   "pyyaml>=6.0.0",
# ]
# ///
from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal

import yaml
from jinja2 import Environment, StrictUndefined
from pydantic import BaseModel, ConfigDict, Field, model_validator


SKILL_DIR = Path(__file__).resolve().parents[1]
REFERENCES_DIR = SKILL_DIR / "references"
DEFAULT_TEMPLATE = "default"
PLACEHOLDER_RE = re.compile(r"{{\s*([A-Za-z_][A-Za-z0-9_]*)\s*}}")


class VariableSpec(BaseModel):
    model_config = ConfigDict(extra="forbid")

    values: list[str] = Field(default_factory=lambda: ["*"])
    default: str | None = None
    description: str | None = None

    @model_validator(mode="before")
    @classmethod
    def coerce_shorthand(cls, value: Any) -> Any:
        if isinstance(value, list):
            return {"values": value}
        if isinstance(value, str):
            return {"values": [value]}
        return value


class OutputConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    path_style: Literal["directory", "dotted"] = "directory"
    file_extension: str | None = None


class SchemaNode(BaseModel):
    model_config = ConfigDict(extra="forbid")

    description: str | None = None
    template: str | None = None
    children: dict[str, "SchemaNode"] = Field(default_factory=dict)
    required: bool = True
    materialize: bool = True
    dynamic_child: bool = False


class SchemaDocument(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)

    version: str | float
    output: OutputConfig = Field(default_factory=OutputConfig)
    variables: dict[str, VariableSpec] = Field(default_factory=dict)
    tree: dict[str, SchemaNode] = Field(alias="schema")

    @model_validator(mode="before")
    @classmethod
    def coerce_variables(cls, value: dict[str, Any]) -> dict[str, Any]:
        variables = value.get("variables", {})
        if isinstance(variables, list):
            merged: dict[str, Any] = {}
            for item in variables:
                if not isinstance(item, dict):
                    raise TypeError("variables list entries must be mappings")
                merged.update(item)
            value["variables"] = merged
        return value


SchemaNode.model_rebuild()


@dataclass(frozen=True)
class MaterializedFile:
    relative_path: Path
    template_path: Path
    context: dict[str, Any]


def load_schema(schema_name: str) -> tuple[Path, SchemaDocument]:
    schema_dir = REFERENCES_DIR / schema_name
    schema_path = schema_dir / "schema.yaml"
    if not schema_path.exists():
        raise FileNotFoundError(f"schema not found: {schema_path}")
    data = yaml.safe_load(schema_path.read_text()) or {}
    return schema_dir, SchemaDocument.model_validate(data)


def parse_assignments(assignments: list[str]) -> dict[str, str]:
    parsed: dict[str, str] = {}
    for assignment in assignments:
        if "=" not in assignment:
            raise ValueError(f"--var must use key=value form: {assignment}")
        key, value = assignment.split("=", 1)
        key = key.strip()
        if not key:
            raise ValueError(f"--var has an empty key: {assignment}")
        parsed[key] = value
    return parsed


def parse_include_paths(includes: list[str]) -> list[tuple[str, ...]]:
    paths: list[tuple[str, ...]] = []
    for include in includes:
        normalized = include.strip()
        if "/" in normalized:
            parts = tuple(part for part in normalized.split("/") if part)
        else:
            parts = tuple(part for part in normalized.split(".") if part)
        if not parts:
            raise ValueError(f"--include has an empty path: {include}")
        paths.append(parts)
    return paths


def include_state(segments: tuple[str, ...], include_paths: list[tuple[str, ...]]) -> tuple[bool, bool]:
    exact = False
    descendant = False
    for include_path in include_paths:
        if include_path == segments:
            exact = True
        elif len(include_path) > len(segments) and include_path[: len(segments)] == segments:
            descendant = True
    return exact, descendant


def validate_variables(document: SchemaDocument, values: dict[str, str]) -> dict[str, Any]:
    context: dict[str, Any] = {}
    for name, spec in document.variables.items():
        if name in values:
            value = values[name]
        elif spec.default is not None:
            value = spec.default
        else:
            continue

        if "*" not in spec.values and value not in spec.values:
            allowed = ", ".join(spec.values)
            raise ValueError(f"{name}={value!r} is not allowed; expected one of: {allowed}")
        context[name] = value

    for name, value in values.items():
        context.setdefault(name, value)

    now = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    context.setdefault("last_refreshed", now)
    context.setdefault("last_refreshed_by", "codex/schemas")
    return context


def render_segment(segment: str, context: dict[str, Any], *, optional: bool) -> str | None:
    missing = [name for name in PLACEHOLDER_RE.findall(segment) if name not in context]
    if missing:
        if optional:
            return None
        joined = ", ".join(missing)
        raise ValueError(f"missing variable(s) for path segment {segment!r}: {joined}")
    env = Environment(undefined=StrictUndefined, autoescape=False)
    return env.from_string(segment).render(**context)


def find_template(schema_dir: Path, template_name: str) -> Path:
    candidates: list[Path] = []
    if template_name.endswith(".jinja"):
        candidates.append(schema_dir / template_name)
    else:
        candidates.append(schema_dir / f"{template_name}.jinja")
        candidates.extend(sorted(schema_dir.glob(f"{template_name}.*.jinja")))

    for candidate in candidates:
        if candidate.exists():
            return candidate
    searched = ", ".join(str(path.name) for path in candidates)
    raise FileNotFoundError(f"template {template_name!r} not found in {schema_dir}; searched: {searched}")


def output_extension(document: SchemaDocument, template_path: Path) -> str:
    if document.output.file_extension:
        extension = document.output.file_extension
        return extension if extension.startswith(".") else f".{extension}"

    basename = template_path.name.removesuffix(".jinja")
    suffix = Path(basename).suffix
    return suffix


def title_for(segments: list[str]) -> str:
    last = segments[-1]
    if last.lower() in {"api", "cli"}:
        return last.upper()
    return last.replace("-", " ").replace("_", " ").title()


def relative_output_path(document: SchemaDocument, segments: list[str], template_path: Path) -> Path:
    extension = output_extension(document, template_path)
    if document.output.path_style == "dotted":
        return Path(".".join(segments) + extension)
    return Path(*segments[:-1], segments[-1] + extension)


def collect_files(
    schema_dir: Path,
    document: SchemaDocument,
    nodes: dict[str, SchemaNode],
    context: dict[str, Any],
    *,
    raw_path: tuple[str, ...] = (),
    rendered_segments: tuple[str, ...] = (),
    optional_parent: bool = False,
    include_paths: list[tuple[str, ...]] | None = None,
) -> list[MaterializedFile]:
    files: list[MaterializedFile] = []
    include_paths = include_paths or []

    for raw_segment, node in nodes.items():
        optional = optional_parent or not node.required
        rendered_segment = render_segment(raw_segment, context, optional=optional)
        if rendered_segment is None:
            continue

        next_raw_path = raw_path + (raw_segment,)
        next_segments = rendered_segments + (rendered_segment,)
        include_exact, include_descendant = include_state(next_segments, include_paths)
        if optional and not include_exact and not include_descendant:
            continue

        if node.materialize and ((node.required and not optional_parent) or include_exact):
            template_name = node.template or DEFAULT_TEMPLATE
            template_path = find_template(schema_dir, template_name)
            file_context = dict(context)
            file_context.update(
                {
                    "description": node.description or "",
                    "dotted_path": ".".join(next_segments),
                    "path_segments": list(next_segments),
                    "raw_path_segments": list(next_raw_path),
                    "template": template_name,
                    "title": title_for(list(next_segments)),
                }
            )
            files.append(
                MaterializedFile(
                    relative_path=relative_output_path(document, list(next_segments), template_path),
                    template_path=template_path,
                    context=file_context,
                )
            )

        files.extend(
            collect_files(
                schema_dir,
                document,
                node.children,
                context,
                raw_path=next_raw_path,
                rendered_segments=next_segments,
                optional_parent=optional,
                include_paths=include_paths,
            )
        )

    return files


def run_copier_copy(source: Path, destination: Path, data: dict[str, Any], overwrite: bool) -> None:
    try:
        from copier import run_copy
    except ImportError as exc:
        raise RuntimeError("copier is required; run this script with `uv run` to install script dependencies") from exc

    try:
        run_copy(
            str(source),
            str(destination),
            data=data,
            defaults=True,
            overwrite=overwrite,
            unsafe=True,
            quiet=True,
        )
    except TypeError:
        run_copy(
            src_path=str(source),
            dst_path=str(destination),
            data=data,
            defaults=True,
            overwrite=overwrite,
            unsafe=True,
            quiet=True,
        )


def materialize(
    schema_name: str,
    destination: Path,
    values: dict[str, str],
    *,
    overwrite: bool,
    skip_existing: bool,
    include_paths: list[tuple[str, ...]],
) -> list[Path]:
    schema_dir, document = load_schema(schema_name)
    context = validate_variables(document, values)
    files = collect_files(schema_dir, document, document.tree, context, include_paths=include_paths)
    if not files:
        raise ValueError(f"schema {schema_name!r} produced no files")

    written: list[Path] = []
    destination.mkdir(parents=True, exist_ok=True)

    for item in files:
        target = destination / item.relative_path
        if target.exists() and skip_existing:
            continue
        if target.exists() and not overwrite:
            raise FileExistsError(f"refusing to overwrite existing file: {target}")

        with tempfile.TemporaryDirectory(prefix="schemas-copier-") as tmp:
            source = Path(tmp) / "template"
            source.mkdir()
            (source / "copier.yml").write_text("_answers_file: .copier-answers.yml\n")
            template_target = source / (str(item.relative_path) + ".jinja")
            template_target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(item.template_path, template_target)
            run_copier_copy(source, destination, item.context, overwrite=overwrite)

        answers_file = destination / ".copier-answers.yml"
        if answers_file.exists():
            answers_file.unlink()
        written.append(target)

    return written


def list_schemas() -> int:
    for schema_path in sorted(REFERENCES_DIR.glob("*/schema.yaml")):
        schema_name = schema_path.parent.name
        try:
            _, document = load_schema(schema_name)
            roots = ", ".join(document.tree.keys())
            print(f"{schema_name}\troot: {roots}")
        except Exception as exc:
            print(f"{schema_name}\tinvalid: {exc}")
    return 0


def print_tree(nodes: dict[str, SchemaNode], *, indent: int = 0) -> None:
    prefix = "  " * indent
    for segment, node in nodes.items():
        template = node.template or DEFAULT_TEMPLATE
        flags = []
        if not node.required:
            flags.append("optional")
        if node.dynamic_child:
            flags.append("dynamic")
        if not node.materialize:
            flags.append("path-only")
        flag_text = f" [{' '.join(flags)}]" if flags else ""
        description = f" - {node.description}" if node.description else ""
        print(f"{prefix}- {segment} (template: {template}){flag_text}{description}")
        print_tree(node.children, indent=indent + 1)


def show_schema(schema_name: str) -> int:
    _, document = load_schema(schema_name)
    print(f"schema: {schema_name}")
    print(f"version: {document.version}")
    print(f"output: {document.output.path_style}, extension={document.output.file_extension or '<template>'}")
    if document.variables:
        print("variables:")
        for name, spec in document.variables.items():
            default = f", default={spec.default}" if spec.default else ""
            print(f"  - {name}: {', '.join(spec.values)}{default}")
    print("tree:")
    print_tree(document.tree)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Materialize files from bundled schemas.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("list", help="List available schemas.")

    show = subparsers.add_parser("show", help="Show a schema tree.")
    show.add_argument("schema")

    materialize_parser = subparsers.add_parser("materialize", help="Materialize a schema into an output directory.")
    materialize_parser.add_argument("schema")
    materialize_parser.add_argument("--out", required=True, type=Path, help="Output directory.")
    materialize_parser.add_argument("--var", action="append", default=[], help="Template variable in key=value form.")
    materialize_parser.add_argument(
        "--include",
        action="append",
        default=[],
        help="Optional full rendered path to materialize. Use dotted paths for dotted schemas and slash paths for directory schemas.",
    )
    materialize_parser.add_argument("--overwrite", action="store_true", help="Overwrite existing generated files.")
    materialize_parser.add_argument("--skip-existing", action="store_true", help="Leave existing files untouched.")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    try:
        if args.command == "list":
            return list_schemas()
        if args.command == "show":
            return show_schema(args.schema)
        if args.command == "materialize":
            if args.overwrite and args.skip_existing:
                raise ValueError("use either --overwrite or --skip-existing, not both")
            values = parse_assignments(args.var)
            include_paths = parse_include_paths(args.include)
            written = materialize(
                args.schema,
                args.out.resolve(),
                values,
                overwrite=args.overwrite,
                skip_existing=args.skip_existing,
                include_paths=include_paths,
            )
            for path in written:
                print(path)
            return 0
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    parser.error(f"unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
