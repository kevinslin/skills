export const schemaVersion = 1 as const;

export const actions = [
  "retained",
  "paraphrase",
  "moved",
  "split",
  "merged",
  "removed",
] as const;

export const reasons = [
  "same-scope",
  "redundant",
  "verbose",
  "mis-categorized",
  "generated-source",
  "obsolete",
  "unsupported",
  "duplicate-linking",
  "nav-only",
] as const;

export const statuses = [
  "covered",
  "partially-covered",
  "missing",
  "intentionally-removed",
  "needs-source-check",
] as const;

export const confidences = ["high", "medium", "low"] as const;

export const mappingKinds = [
  "exact-line",
  "semantic-confirmed",
  "generated-source",
  "external-reference",
  "block-fallback",
] as const;

export const blockKinds = [
  "frontmatter",
  "heading",
  "paragraph",
  "list",
  "table",
  "code",
  "blockquote",
  "mdx",
  "html",
  "link-block",
  "thematic-break",
] as const;

export type Action = (typeof actions)[number];
export type Reason = (typeof reasons)[number];
export type Status = (typeof statuses)[number];
export type Confidence = (typeof confidences)[number];
export type MappingKind = (typeof mappingKinds)[number];
export type BlockKind = (typeof blockKinds)[number];

export interface Range {
  path: string;
  startLine: number;
  endLine: number;
}

export interface AuditLine {
  id: string;
  path: string;
  line: number;
  columnStart: number;
  columnEnd: number;
  text: string;
}

export interface AuditBlock {
  id: string;
  kind: BlockKind;
  path: string;
  startLine: number;
  endLine: number;
  lines: AuditLine[];
}

export interface AuditDocument {
  id: string;
  role: "source" | "destination";
  path: string;
  baseRef?: string;
  changedSinceBase: boolean;
  blocks: AuditBlock[];
}

export interface StaleDestination {
  reason: "missing-range" | "text-mismatch" | "ambiguous-match";
  message: string;
  previousRange: Range;
  previousLineIds: string[];
  checkedAt: string;
}

interface DestinationBase {
  id: string;
  kind: "local" | "generated" | "external";
  justification: string;
}

export interface LocalDestination extends DestinationBase {
  kind: "local";
  docId: string;
  blockIds: string[];
  lineIds: string[];
  range: Range;
  mappingKind: MappingKind;
  changedSinceBase: boolean;
  stale?: StaleDestination;
}

export interface GeneratedDestination extends Omit<LocalDestination, "kind"> {
  kind: "generated";
  generator: { path: string; startLine?: number; endLine?: number };
}

export interface ExternalDestination extends DestinationBase {
  kind: "external";
  label: string;
  url?: string;
}

export type DestinationEntry =
  | LocalDestination
  | GeneratedDestination
  | ExternalDestination;

export interface MappingRow {
  sourceId: string;
  action: Action;
  reason: Reason;
  status: Status;
  confidence: Confidence;
  justification: string;
  dest: DestinationEntry[];
}

export interface BlockMapping {
  id: string;
  summary: string;
  source: {
    docId: string;
    blockIds: string[];
    lineIds: string[];
  };
  action: Action;
  reason: Reason;
  status: Status;
  confidence: Confidence;
  justification: string;
  mapping: MappingRow[];
}

export interface ValidationFinding {
  severity: "error" | "warning";
  code: string;
  message: string;
  sourceIds: string[];
  destinationIds: string[];
  ranges: Range[];
  suggestion?: string;
}

export interface AcceptedWarning extends ValidationFinding {
  severity: "warning";
  acceptedJustification: string;
}

export interface AuditData {
  schemaVersion: 1;
  audit: {
    id: string;
    title: string;
    baseRef?: string;
    createdAt: string;
    updatedAt: string;
  };
  sourceDocs: AuditDocument[];
  destDocs: AuditDocument[];
  mappings: BlockMapping[];
  validation: {
    errors: ValidationFinding[];
    warnings: ValidationFinding[];
    acceptedWarnings: AcceptedWarning[];
  };
}

export interface MappingPatch {
  schemaVersion: 1;
  status?: "draft" | "final";
  mappings: BlockMapping[];
  acceptedWarnings?: AcceptedWarning[];
}
