import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import type { Position } from "unist";
import type { AuditBlock, AuditDocument, AuditLine, BlockKind } from "./types.js";

interface PositionedNode {
  type: string;
  position?: Position;
}

export interface ParseDocumentOptions {
  id: string;
  role: "source" | "destination";
  path: string;
  content: string;
  baseRef?: string;
  changedSinceBase?: boolean;
}

export function createMarkdownProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter, ["yaml", "toml"]);
}

export function parseDocument(options: ParseDocumentOptions): AuditDocument {
  const tree = createMarkdownProcessor().parse(options.content) as {
    children?: PositionedNode[];
  };
  const physicalLines = options.content.split(/\r?\n/);
  const blocks: AuditBlock[] = [];
  const nodes = tree.children ?? [];

  for (const node of nodes) {
    if (!node.position?.start?.line || !node.position?.end?.line) {
      continue;
    }
    const kind = normalizeKind(node, physicalLines);
    const blockIndex = blocks.length + 1;
    const blockId = `${options.id}.B${String(blockIndex).padStart(3, "0")}`;
    const startLine = node.position.start.line;
    const endLine = node.position.end.line;
    const lines: AuditLine[] = [];

    for (let lineNumber = startLine; lineNumber <= endLine; lineNumber += 1) {
      const text = physicalLines[lineNumber - 1] ?? "";
      const lineIndex = lineNumber - startLine + 1;
      lines.push({
        id: `${blockId}.L${String(lineIndex).padStart(3, "0")}`,
        path: options.path,
        line: lineNumber,
        columnStart: lineNumber === startLine ? node.position.start.column : 1,
        columnEnd:
          lineNumber === endLine
            ? node.position.end.column
            : Math.max(text.length + 1, 1),
        text,
      });
    }

    blocks.push({
      id: blockId,
      kind,
      path: options.path,
      startLine,
      endLine,
      lines,
    });
  }

  return {
    id: options.id,
    role: options.role,
    path: options.path,
    baseRef: options.baseRef,
    changedSinceBase: options.changedSinceBase ?? false,
    blocks,
  };
}

function normalizeKind(node: PositionedNode, lines: string[]): BlockKind {
  switch (node.type) {
    case "yaml":
    case "toml":
      return "frontmatter";
    case "heading":
      return "heading";
    case "paragraph":
      return "paragraph";
    case "list":
      return "list";
    case "table":
      return "table";
    case "code":
      return "code";
    case "blockquote":
      return "blockquote";
    case "html":
      return "html";
    case "definition":
    case "footnoteDefinition":
      return "link-block";
    case "thematicBreak":
      return "thematic-break";
    case "mdxjsEsm":
    case "mdxFlowExpression":
    case "mdxJsxFlowElement":
      return "mdx";
    default:
      return looksLikeMdx(node, lines) ? "mdx" : "paragraph";
  }
}

function looksLikeMdx(node: PositionedNode, lines: string[]): boolean {
  if (node.type.startsWith("mdx")) {
    return true;
  }
  const startLine = node.position?.start?.line;
  if (!startLine) {
    return false;
  }
  const firstLine = lines[startLine - 1]?.trim() ?? "";
  return /^<\/?[A-Z][A-Za-z0-9_.:-]*(\s|>|\/>)/.test(firstLine);
}

export function getLineById(document: AuditDocument, lineId: string): AuditLine | undefined {
  for (const block of document.blocks) {
    const line = block.lines.find((candidate) => candidate.id === lineId);
    if (line) {
      return line;
    }
  }
  return undefined;
}

export function getBlockById(document: AuditDocument, blockId: string): AuditBlock | undefined {
  return document.blocks.find((block) => block.id === blockId);
}

export function allDocumentLines(document: AuditDocument): AuditLine[] {
  return document.blocks.flatMap((block) => block.lines);
}
