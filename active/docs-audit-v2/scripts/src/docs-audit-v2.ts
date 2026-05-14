#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  actions,
  confidences,
  mappingKinds,
  reasons,
  schemaVersion,
  statuses,
  type AuditData,
  type AuditDocument,
  type AuditLine,
  type BlockMapping,
  type DestinationEntry,
  type GeneratedDestination,
  type LocalDestination,
  type MappingPatch,
  type MappingRow,
  type Range,
  type ValidationFinding,
} from "./types.js";
import { allDocumentLines, getBlockById, getLineById, parseDocument } from "./parser.js";

type ParsedArgs = Record<string, string | boolean>;

const usage = `docs-audit-v2 <command> [options]

Commands:
  scaffold      Create an audit JSON inventory from explicit source and destination docs.
  add-dest      Append destination docs to an existing audit without renumbering.
  reindex-dest  Refresh destination inventories and mark drifted destination entries stale.
  map           Merge authored mapping patch JSON into the audit.
  hydrate       Refresh source inventories and changed-file metadata.
  validate      Validate coverage, stale ranges, and schema invariants.
  render        Render Markdown and/or HTML review artifacts from audit JSON.
`;

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "--help" || command === "-h") {
    process.stdout.write(usage);
    return;
  }

  const args = parseArgs(rest);
  switch (command) {
    case "scaffold":
      await scaffold(args);
      return;
    case "add-dest":
      await addDest(args);
      return;
    case "reindex-dest":
      await reindexDest(args);
      return;
    case "map":
      await mapPatch(args);
      return;
    case "hydrate":
      await hydrate(args);
      return;
    case "validate":
      await validateCommand(args);
      return;
    case "render":
      await render(args);
      return;
    default:
      throw new Error(`Unknown command: ${command}\n\n${usage}`);
  }
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected positional argument: ${token}`);
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }
    parsed[key] = next;
    index += 1;
  }
  return parsed;
}

function stringArg(args: ParsedArgs, name: string): string | undefined {
  const value = args[name];
  return typeof value === "string" ? value : undefined;
}

function requiredArg(args: ParsedArgs, name: string): string {
  const value = stringArg(args, name);
  if (!value) {
    throw new Error(`Missing required --${name}`);
  }
  return value;
}

function boolArg(args: ParsedArgs, name: string): boolean {
  return args[name] === true;
}

function splitPaths(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cwdFromArgs(args: ParsedArgs): string {
  return path.resolve(stringArg(args, "cwd") ?? process.cwd());
}

async function scaffold(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const sourcePaths = splitPaths(requiredArg(args, "source"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  const baseRef = stringArg(args, "base");
  await ensureWritable(out, boolArg(args, "force"));

  const sourceDocs = await Promise.all(
    sourcePaths.map(async (docPath, index) => {
      const content = baseRef
        ? readGitFile(cwd, baseRef, docPath)
        : await readText(cwd, docPath);
      return parseDocument({
        id: `S${index + 1}`,
        role: "source",
        path: docPath,
        content,
        baseRef,
        changedSinceBase: baseRef ? changedSinceBase(cwd, baseRef, docPath) : false,
      });
    }),
  );

  const destDocs = await Promise.all(
    destPaths.map(async (docPath, index) =>
      parseDocument({
        id: `D${index + 1}`,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: baseRef ? changedSinceBase(cwd, baseRef, docPath) : false,
      }),
    ),
  );

  const now = new Date().toISOString();
  const data: AuditData = {
    schemaVersion,
    audit: {
      id: inferAuditId(sourcePaths),
      title: "Docs Audit",
      baseRef,
      createdAt: now,
      updatedAt: now,
    },
    sourceDocs,
    destDocs,
    mappings: [],
    validation: { errors: [], warnings: [], acceptedWarnings: [] },
  };

  await writeJson(out, data);
  process.stdout.write(`wrote ${relative(cwd, out)}\n`);
}

async function addDest(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));

  const knownPaths = new Set(data.destDocs.map((doc) => doc.path));
  for (const docPath of destPaths) {
    if (knownPaths.has(docPath)) {
      throw new Error(`Destination already exists in audit: ${docPath}`);
    }
    knownPaths.add(docPath);
  }

  let next = nextDocNumber(data.destDocs, "D");
  for (const docPath of destPaths) {
    data.destDocs.push(
      parseDocument({
        id: `D${next}`,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: data.audit.baseRef
          ? changedSinceBase(cwd, data.audit.baseRef, docPath)
          : false,
      }),
    );
    next += 1;
  }

  touch(data);
  await writeJson(out, data);
  process.stdout.write(`added ${destPaths.length} destination doc(s)\n`);
}

async function reindexDest(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const destPaths = splitPaths(requiredArg(args, "dest"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));

  const oldDocsByPath = new Map(data.destDocs.map((doc) => [doc.path, doc]));
  const newDocsByPath = new Map<string, AuditDocument>();

  for (const docPath of destPaths) {
    const oldDoc = oldDocsByPath.get(docPath);
    if (!oldDoc) {
      throw new Error(`Unknown destination doc: ${docPath}`);
    }
    newDocsByPath.set(
      docPath,
      parseDocument({
        id: oldDoc.id,
        role: "destination",
        path: docPath,
        content: await readText(cwd, docPath),
        changedSinceBase: data.audit.baseRef
          ? changedSinceBase(cwd, data.audit.baseRef, docPath)
          : oldDoc.changedSinceBase,
      }),
    );
  }

  const checkedAt = new Date().toISOString();
  for (const mapping of data.mappings) {
    for (const row of mapping.mapping) {
      row.dest = row.dest.map((entry) =>
        refreshDestinationEntry(entry, oldDocsByPath, newDocsByPath, checkedAt),
      );
    }
  }

  data.destDocs = data.destDocs.map((doc) => newDocsByPath.get(doc.path) ?? doc);
  touch(data);
  await writeJson(out, data);
  process.stdout.write(`reindexed ${destPaths.length} destination doc(s)\n`);
}

async function mapPatch(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const patch = await readJsonFile<MappingPatch>(cwd, requiredArg(args, "patch"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  await ensureWritable(out, boolArg(args, "force"));

  if (patch.schemaVersion !== schemaVersion) {
    throw new Error(`Unsupported mapping patch schemaVersion: ${String(patch.schemaVersion)}`);
  }
  if (!Array.isArray(patch.mappings)) {
    throw new Error("Mapping patch must contain mappings[]");
  }

  const patchIds = new Set<string>();
  for (const mapping of patch.mappings) {
    if (patchIds.has(mapping.id)) {
      throw new Error(`Duplicate mapping id ${mapping.id} in mapping patch.`);
    }
    patchIds.add(mapping.id);
  }

  const byId = new Map(data.mappings.map((mapping) => [mapping.id, mapping]));
  for (const mapping of patch.mappings) {
    byId.set(mapping.id, mapping);
  }
  data.mappings = [...byId.values()].sort((left, right) =>
    left.id.localeCompare(right.id, undefined, { numeric: true }),
  );
  if (patch.acceptedWarnings) {
    data.validation.acceptedWarnings = patch.acceptedWarnings;
  }

  const structural = await validateAudit(data, cwd, { coverage: false });
  if (structural.errors.length > 0) {
    throw new Error(
      `Mapping patch failed structural validation:\n${structural.errors
        .map((error) => `- ${error.code}: ${error.message}`)
        .join("\n")}`,
    );
  }

  touch(data);
  await writeJson(out, data);
  process.stdout.write(`merged ${patch.mappings.length} mapping(s)\n`);
}

async function hydrate(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const out = resolveOut(cwd, requiredArg(args, "out"));
  const overrideBase = stringArg(args, "base");
  await ensureWritable(out, boolArg(args, "force"));

  const staleSourceFindings: ValidationFinding[] = [];
  data.sourceDocs = await Promise.all(
    data.sourceDocs.map(async (doc) => {
      const sourceBase = overrideBase ?? doc.baseRef ?? data.audit.baseRef;
      const content = sourceBase
        ? readGitFile(cwd, sourceBase, doc.path)
        : await readText(cwd, doc.path);
      const staleFindings = sourceRangeFindingsForContent(doc, content);
      if (staleFindings.length > 0) {
        staleSourceFindings.push(...staleFindings);
        return {
          ...doc,
          changedSinceBase: sourceBase ? changedSinceBase(cwd, sourceBase, doc.path) : doc.changedSinceBase,
        };
      }
      return parseDocument({
        id: doc.id,
        role: "source",
        path: doc.path,
        content,
        baseRef: doc.baseRef,
        changedSinceBase: sourceBase ? changedSinceBase(cwd, sourceBase, doc.path) : false,
      });
    }),
  );

  data.destDocs = data.destDocs.map((doc) => ({
    ...doc,
    changedSinceBase: data.audit.baseRef
      ? changedSinceBase(cwd, data.audit.baseRef, doc.path)
      : doc.changedSinceBase,
  }));

  if (staleSourceFindings.length > 0) {
    data.validation.errors = [
      ...data.validation.errors.filter((error) => error.code !== "stale-source-range"),
      ...staleSourceFindings,
    ];
  }

  touch(data);
  await writeJson(out, data);
  process.stdout.write(`hydrated ${data.sourceDocs.length} source doc(s)\n`);
}

async function validateCommand(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const findings = await validateAudit(data, cwd, {
    coverage: true,
    changedOnly: boolArg(args, "changed-only"),
    diffBase: stringArg(args, "diff-base"),
  });
  data.validation.errors = findings.errors;
  data.validation.warnings = findings.warnings;

  const out = stringArg(args, "out");
  if (out) {
    const outPath = resolveOut(cwd, out);
    await ensureWritable(outPath, boolArg(args, "force"));
    touch(data);
    await writeJson(outPath, data);
  }

  if (boolArg(args, "json")) {
    process.stdout.write(`${JSON.stringify(data.validation, null, 2)}\n`);
  } else {
    process.stdout.write(
      `validation: ${findings.errors.length} error(s), ${findings.warnings.length} warning(s)\n`,
    );
    for (const finding of [...findings.errors, ...findings.warnings]) {
      process.stdout.write(`- ${finding.severity} ${finding.code}: ${finding.message}\n`);
    }
  }

  if (findings.errors.length > 0) {
    process.exitCode = 1;
  }
}

async function render(args: ParsedArgs): Promise<void> {
  const cwd = cwdFromArgs(args);
  const data = await readAudit(cwd, requiredArg(args, "data"));
  const mdOut = stringArg(args, "md-out");
  const htmlOut = stringArg(args, "html-out");
  if (!mdOut && !htmlOut) {
    throw new Error("render requires --md-out and/or --html-out");
  }

  if (mdOut) {
    const output = resolveOut(cwd, mdOut);
    await ensureWritable(output, boolArg(args, "force"));
    await writeTextFile(output, renderMarkdown(data));
    process.stdout.write(`wrote ${relative(cwd, output)}\n`);
  }
  if (htmlOut) {
    const output = resolveOut(cwd, htmlOut);
    await ensureWritable(output, boolArg(args, "force"));
    await writeTextFile(output, await renderHtml(data));
    process.stdout.write(`wrote ${relative(cwd, output)}\n`);
  }
}

async function validateAudit(
  data: AuditData,
  cwd: string,
  options: { coverage: boolean; changedOnly?: boolean; diffBase?: string },
): Promise<{ errors: ValidationFinding[]; warnings: ValidationFinding[] }> {
  const errors: ValidationFinding[] = [];
  const warnings: ValidationFinding[] = [];
  const sourceDocsById = new Map(data.sourceDocs.map((doc) => [doc.id, doc]));
  const sourceBlockIds = new Set(data.sourceDocs.flatMap((doc) => doc.blocks.map((block) => block.id)));
  const destinationEntryIds = new Set<string>();
  const rowSourceCounts = new Map<string, number>();

  errors.push(...(await validateSourceRanges(data, cwd, options.diffBase)));

  for (const accepted of data.validation.acceptedWarnings ?? []) {
    if (accepted.severity !== "warning") {
      errors.push(finding("error", "unknown-id", "Accepted warnings must have severity warning.", accepted.sourceIds ?? [], accepted.destinationIds ?? [], accepted.ranges ?? []));
    }
    if (!accepted.acceptedJustification?.trim()) {
      errors.push(finding("error", "missing-justification", "Accepted warning is missing acceptedJustification.", accepted.sourceIds ?? [], accepted.destinationIds ?? [], accepted.ranges ?? []));
    }
  }

  const mappingIds = new Set<string>();
  for (const mapping of data.mappings) {
    if (mappingIds.has(mapping.id)) {
      errors.push(finding("error", "unknown-id", `Duplicate mapping id ${mapping.id}.`, [], [], []));
    }
    mappingIds.add(mapping.id);
    validateMappingFields(mapping, errors);

    if (mapping.source.blockIds.length !== 1) {
      errors.push(finding("error", "unknown-id", `${mapping.id} must reference exactly one source block.`, mapping.source.lineIds, [], []));
    }
    const sourceDoc = sourceDocsById.get(mapping.source.docId);
    if (!sourceDoc) {
      errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source doc ${mapping.source.docId}.`, [], [], []));
    }
    const mappedBlockId = mapping.source.blockIds[0];
    const mappedBlock = sourceDoc ? getBlockById(sourceDoc, mappedBlockId) : undefined;
    if (mappedBlockId && !mappedBlock) {
      if (!sourceBlockIds.has(mappedBlockId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source block ${mappedBlockId}.`, [], [], []));
      } else {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${mapping.id} source block ${mappedBlockId} does not belong to ${mapping.source.docId}.`,
            mapping.source.lineIds,
            [],
            [],
          ),
        );
      }
    }
    for (const lineId of mapping.source.lineIds) {
      const sourceLine = sourceDoc ? getLineById(sourceDoc, lineId) : undefined;
      if (!sourceLine) {
        errors.push(finding("error", "unknown-id", `${mapping.id} references unknown source line ${lineId}.`, [lineId], [], []));
      } else if (mappedBlock && !mappedBlock.lines.some((line) => line.id === lineId)) {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${mapping.id} source line ${lineId} does not belong to ${mappedBlock.id}.`,
            [lineId],
            [],
            [],
          ),
        );
      }
    }

    const seenRows = new Set<string>();
    for (const row of mapping.mapping) {
      validateRowFields(mapping.id, row, errors);
      rowSourceCounts.set(row.sourceId, (rowSourceCounts.get(row.sourceId) ?? 0) + 1);
      if (seenRows.has(row.sourceId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} has duplicate row for ${row.sourceId}.`, [row.sourceId], [], []));
      }
      seenRows.add(row.sourceId);
      if (!mapping.source.lineIds.includes(row.sourceId)) {
        errors.push(finding("error", "unknown-id", `${mapping.id} row references source line outside mapping source: ${row.sourceId}.`, [row.sourceId], [], []));
      }

      const sourceLine = findSourceLine(data, row.sourceId);
      const material = sourceLine ? !isFormattingOnly(sourceLine, data) : true;
      await validateDestinations(data, cwd, row, destinationEntryIds, errors, warnings);
      validateRowCoverage(row, material, errors, warnings);
    }
  }

  if (options.coverage) {
    for (const doc of data.sourceDocs) {
      for (const block of doc.blocks) {
        for (const line of block.lines) {
          if (options.changedOnly && !sourceDocChangedForValidation(cwd, data, doc, options.diffBase)) {
            continue;
          }
          if (isFormattingOnly(line, data)) {
            continue;
          }
          const count = rowSourceCounts.get(line.id) ?? 0;
          if (count === 0) {
            errors.push(
              finding(
                "error",
                "unmapped-source-line",
                `${line.id} is material source content but is not mapped.`,
                [line.id],
                [],
                [lineRange(line)],
                "Add a line-level mapping entry or mark the content intentionally removed.",
              ),
            );
          } else if (count > 1) {
            errors.push(
              finding(
                "error",
                "unknown-id",
                `${line.id} is mapped by ${count} rows; each material source line must be accounted for exactly once.`,
                [line.id],
                [],
                [lineRange(line)],
              ),
            );
          }
        }
      }
    }
  }

  const accepted = data.validation.acceptedWarnings ?? [];
  const activeWarnings = warnings.filter((warning) => !accepted.some((item) => sameFinding(item, warning)));
  return { errors, warnings: activeWarnings };
}

function validateMappingFields(mapping: BlockMapping, errors: ValidationFinding[]): void {
  const required: [string, unknown][] = [
    ["id", mapping.id],
    ["summary", mapping.summary],
    ["action", mapping.action],
    ["reason", mapping.reason],
    ["status", mapping.status],
    ["confidence", mapping.confidence],
    ["justification", mapping.justification],
  ];
  for (const [field, value] of required) {
    if (typeof value !== "string" || !value.trim()) {
      errors.push(finding("error", "missing-justification", `${mapping.id} is missing ${field}.`, mapping.source?.lineIds ?? [], [], []));
    }
  }
  if (!actions.includes(mapping.action)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown action ${String(mapping.action)}.`, mapping.source.lineIds, [], []));
  }
  if (!reasons.includes(mapping.reason)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown reason ${String(mapping.reason)}.`, mapping.source.lineIds, [], []));
  }
  if (!statuses.includes(mapping.status)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown status ${String(mapping.status)}.`, mapping.source.lineIds, [], []));
  }
  if (!confidences.includes(mapping.confidence)) {
    errors.push(finding("error", "unknown-id", `${mapping.id} uses unknown confidence ${String(mapping.confidence)}.`, mapping.source.lineIds, [], []));
  }
  if (!Array.isArray(mapping.mapping) || mapping.mapping.length === 0) {
    errors.push(finding("error", "unmapped-source-line", `${mapping.id} has no line-level mapping rows.`, mapping.source.lineIds, [], []));
  }
}

function validateRowFields(mappingId: string, row: MappingRow, errors: ValidationFinding[]): void {
  if (!row.justification?.trim()) {
    errors.push(finding("error", "missing-justification", `${mappingId} row ${row.sourceId} is missing justification.`, [row.sourceId], [], []));
  }
  if (!actions.includes(row.action)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown action.`, [row.sourceId], [], []));
  }
  if (!reasons.includes(row.reason)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown reason.`, [row.sourceId], [], []));
  }
  if (!statuses.includes(row.status)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown status.`, [row.sourceId], [], []));
  }
  if (!confidences.includes(row.confidence)) {
    errors.push(finding("error", "unknown-id", `${mappingId} row ${row.sourceId} uses unknown confidence.`, [row.sourceId], [], []));
  }
  if (!Array.isArray(row.dest)) {
    errors.push(finding("error", "missing-destination", `${mappingId} row ${row.sourceId} dest must be an array.`, [row.sourceId], [], []));
  }
}

async function validateDestinations(
  data: AuditData,
  cwd: string,
  row: MappingRow,
  destinationEntryIds: Set<string>,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): Promise<void> {
  const destDocsById = new Map(data.destDocs.map((doc) => [doc.id, doc]));

  for (const entry of row.dest) {
    if (!entry.id?.trim()) {
      errors.push(finding("error", "unknown-id", `Destination entry for ${row.sourceId} is missing id.`, [row.sourceId], [], []));
      continue;
    }
    if (destinationEntryIds.has(entry.id)) {
      errors.push(finding("error", "unknown-id", `Duplicate destination entry id ${entry.id}.`, [row.sourceId], [entry.id], []));
    }
    destinationEntryIds.add(entry.id);
    if (!entry.justification?.trim()) {
      errors.push(finding("error", "missing-justification", `${entry.id} is missing justification.`, [row.sourceId], [entry.id], []));
    }

    if (entry.kind === "external") {
      if (!entry.label?.trim()) {
        errors.push(finding("error", "missing-destination", `${entry.id} external destination is missing label.`, [row.sourceId], [entry.id], []));
      }
      continue;
    }

    const localEntry = entry;
    const doc = destDocsById.get(localEntry.docId);
    if (!doc) {
      errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination doc ${localEntry.docId}.`, [row.sourceId], [entry.id], []));
      continue;
    }
    if (localEntry.range.path !== doc.path) {
      errors.push(
        finding(
          "error",
          "unknown-id",
          `${entry.id} range path ${localEntry.range.path} does not match destination doc ${doc.path}.`,
          [row.sourceId],
          [entry.id],
          [localEntry.range],
        ),
      );
    }
    const docBlockIds = new Set(doc.blocks.map((block) => block.id));
    if (!Array.isArray(localEntry.blockIds) || localEntry.blockIds.length === 0) {
      errors.push(finding("error", "missing-destination", `${entry.id} is missing destination blockIds.`, [row.sourceId], [entry.id], []));
    } else {
      for (const blockId of localEntry.blockIds) {
        if (!docBlockIds.has(blockId)) {
          errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination block ${blockId}.`, [row.sourceId], [entry.id], []));
        }
      }
    }
    const selectedBlocks = localEntry.blockIds
      .map((blockId) => getBlockById(doc, blockId))
      .filter((block): block is NonNullable<ReturnType<typeof getBlockById>> => Boolean(block));
    const selectedBlockLineIds = new Set(
      selectedBlocks.flatMap((block) => block.lines.map((line) => line.id)),
    );
    if (!mappingKinds.includes(localEntry.mappingKind)) {
      errors.push(finding("error", "unknown-id", `${entry.id} uses unknown mappingKind ${String(localEntry.mappingKind)}.`, [row.sourceId], [entry.id], []));
    }
    if (localEntry.mappingKind === "block-fallback") {
      if (localEntry.lineIds.length !== 0) {
        errors.push(finding("error", "unknown-id", `${entry.id} block-fallback must have empty lineIds.`, [row.sourceId], [entry.id], []));
      }
    } else if (!Array.isArray(localEntry.lineIds) || localEntry.lineIds.length === 0) {
      errors.push(finding("error", "missing-destination", `${entry.id} needs exact destination lineIds.`, [row.sourceId], [entry.id], []));
    }
    for (const lineId of localEntry.lineIds) {
      const line = getLineById(doc, lineId);
      if (!line) {
        errors.push(finding("error", "unknown-id", `${entry.id} references unknown destination line ${lineId}.`, [row.sourceId], [entry.id], []));
      } else if (!selectedBlockLineIds.has(lineId)) {
        errors.push(
          finding(
            "error",
            "unknown-id",
            `${entry.id} destination line ${lineId} does not belong to its destination blockIds.`,
            [row.sourceId],
            [entry.id],
            [lineRange(line)],
          ),
        );
      }
    }
    validateDestinationRangeSpan(entry.id, row.sourceId, localEntry, selectedBlocks, doc, errors);
    if (localEntry.stale) {
      errors.push(
        finding(
          "error",
          "stale-destination-entry",
          `${entry.id} is stale: ${localEntry.stale.message}`,
          [row.sourceId],
          [entry.id],
          [localEntry.stale.previousRange],
          "Run reindex-dest and update the mapping justification or destination range.",
        ),
      );
    } else {
      await validateCurrentDestinationText(cwd, doc, localEntry, row.sourceId, errors);
    }
    if (!localEntry.changedSinceBase) {
      warnings.push(
        finding(
          "warning",
          "unchanged-reference-destination",
          `${entry.id} references an unchanged destination page; render as related reference instead of a diff.`,
          [row.sourceId],
          [entry.id],
          [localEntry.range],
        ),
      );
    }
    if (entry.kind === "generated") {
      const generated = entry;
      if (!generated.generator?.path) {
        errors.push(finding("error", "missing-destination", `${entry.id} generated destination is missing generator.path.`, [row.sourceId], [entry.id], [localEntry.range]));
      } else if (!generated.generator.startLine || !generated.generator.endLine) {
        warnings.push(
          finding(
            "warning",
            "low-confidence-mapping",
            `${entry.id} generated destination has no generator line range.`,
            [row.sourceId],
            [entry.id],
            [localEntry.range],
          ),
        );
      }
    }
  }
}

function validateRowCoverage(
  row: MappingRow,
  material: boolean,
  errors: ValidationFinding[],
  warnings: ValidationFinding[],
): void {
  const hasDest = row.dest.length > 0;
  const allBlockFallback =
    hasDest &&
    row.dest.every(
      (entry) => entry.kind !== "external" && entry.mappingKind === "block-fallback",
    );

  if (row.confidence === "low") {
    warnings.push(
      finding("warning", "low-confidence-mapping", `${row.sourceId} has low mapping confidence.`, [row.sourceId], row.dest.map((entry) => entry.id), []),
    );
  }

  if (!material) {
    return;
  }

  if ((row.status === "covered" || row.status === "partially-covered") && !hasDest) {
    errors.push(
      finding(
        "error",
        "missing-destination",
        `${row.sourceId} is ${row.status} but has no destination proof.`,
        [row.sourceId],
        [],
        [],
      ),
    );
  }
  if (row.status === "covered" && allBlockFallback) {
    errors.push(
      finding(
        "error",
        "covered-block-fallback-only",
        `${row.sourceId} is covered only by broad block fallback.`,
        [row.sourceId],
        row.dest.map((entry) => entry.id),
        [],
        "Select exact destination lines or mark the row as partially-covered/needs-source-check.",
      ),
    );
  }
  if (
    allBlockFallback &&
    (row.status === "partially-covered" || row.status === "needs-source-check" || row.status === "missing")
  ) {
    warnings.push(
      finding(
        "warning",
        "weak-block-fallback",
        `${row.sourceId} uses only broad block fallback.`,
        [row.sourceId],
        row.dest.map((entry) => entry.id),
        [],
      ),
    );
  }
  if (row.status === "intentionally-removed" && !hasDest) {
    const removalWithoutDestination = ["obsolete", "unsupported", "duplicate-linking", "nav-only"].includes(row.reason);
    if (!removalWithoutDestination) {
      errors.push(
        finding(
          "error",
          "missing-destination",
          `${row.sourceId} is intentionally removed for ${row.reason} but requires a surviving destination.`,
          [row.sourceId],
          [],
          [],
        ),
      );
    }
  }
  if ((row.reason === "redundant" || row.reason === "generated-source") && !hasDest) {
    errors.push(
      finding(
        "error",
        "missing-destination",
        `${row.sourceId} uses ${row.reason} but has no surviving destination.`,
        [row.sourceId],
        [],
        [],
      ),
    );
  }
}

async function validateCurrentDestinationText(
  cwd: string,
  doc: AuditDocument,
  entry: LocalDestination | GeneratedDestination,
  sourceId: string,
  errors: ValidationFinding[],
): Promise<void> {
  const selectedLineObjects = entry.lineIds.length
    ? entry.lineIds.map((lineId) => getLineById(doc, lineId)).filter(isAuditLine)
    : linesInRange(doc, entry.range);
  const selectedLines = selectedLineObjects.map((line) => line.text);
  if (selectedLines.length === 0) {
    return;
  }
  let currentText = "";
  try {
    currentText = await readText(cwd, entry.range.path);
  } catch {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entry.id} destination file is missing: ${entry.range.path}.`,
        [sourceId],
        [entry.id],
        [entry.range],
      ),
    );
    return;
  }
  const currentLines = currentText.split(/\r?\n/);
  const currentSelected = selectedLineObjects.map((line) => currentLines[line.line - 1] ?? "");
  if (currentSelected.join("\n") !== selectedLines.join("\n")) {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entry.id} destination range no longer matches current file text.`,
        [sourceId],
        [entry.id],
        [entry.range],
        "Run reindex-dest and refresh this mapping.",
      ),
    );
  }
}

async function validateSourceRanges(
  data: AuditData,
  cwd: string,
  diffBase?: string,
): Promise<ValidationFinding[]> {
  const findings: ValidationFinding[] = [];
  for (const doc of data.sourceDocs) {
    const ref = diffBase ?? doc.baseRef ?? data.audit.baseRef;
    try {
      const content = ref ? readGitFile(cwd, ref, doc.path) : await readText(cwd, doc.path);
      findings.push(...sourceRangeFindingsForContent(doc, content));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      findings.push(
        finding(
          "error",
          "stale-source-range",
          `${doc.path} could not be read for source validation: ${message}`,
          doc.blocks.flatMap((block) => block.lines.map((line) => line.id)),
          [],
          doc.blocks.map((block) => ({ path: block.path, startLine: block.startLine, endLine: block.endLine })),
        ),
      );
    }
  }
  return findings;
}

function sourceRangeFindingsForContent(
  doc: AuditDocument,
  content: string,
): ValidationFinding[] {
  const currentLines = content.split(/\r?\n/);
  const findings: ValidationFinding[] = [];
  for (const block of doc.blocks) {
    for (const line of block.lines) {
      if ((currentLines[line.line - 1] ?? "") !== line.text) {
        findings.push(
          finding(
            "error",
            "stale-source-range",
            `${line.id} no longer matches the configured source text.`,
            [line.id],
            [],
            [lineRange(line)],
            "Restore the original source ref or create a new audit inventory.",
          ),
        );
      }
    }
  }
  return findings;
}

function sourceDocChangedForValidation(
  cwd: string,
  data: AuditData,
  doc: AuditDocument,
  diffBase?: string,
): boolean {
  const baseRef = diffBase ?? data.audit.baseRef ?? doc.baseRef;
  if (!baseRef) {
    return doc.changedSinceBase;
  }
  return changedSinceBase(cwd, baseRef, doc.path);
}

function validateDestinationRangeSpan(
  entryId: string,
  sourceId: string,
  entry: LocalDestination | GeneratedDestination,
  selectedBlocks: Array<NonNullable<ReturnType<typeof getBlockById>>>,
  doc: AuditDocument,
  errors: ValidationFinding[],
): void {
  const selectedLines = entry.lineIds.length
    ? entry.lineIds.map((lineId) => getLineById(doc, lineId)).filter(isAuditLine)
    : selectedBlocks.flatMap((block) => block.lines);
  if (selectedLines.length === 0) {
    return;
  }
  const startLine = Math.min(...selectedLines.map((line) => line.line));
  const endLine = Math.max(...selectedLines.map((line) => line.line));
  if (entry.range.startLine > startLine || entry.range.endLine < endLine) {
    errors.push(
      finding(
        "error",
        "stale-destination-range",
        `${entryId} range does not span the selected destination lines.`,
        [sourceId],
        [entryId],
        [entry.range],
        "Update the destination range to span the selected destination line IDs.",
      ),
    );
  }
}

function refreshDestinationEntry(
  entry: DestinationEntry,
  oldDocsByPath: Map<string, AuditDocument>,
  newDocsByPath: Map<string, AuditDocument>,
  checkedAt: string,
): DestinationEntry {
  if (entry.kind === "external") {
    return entry;
  }
  const targetPath = entry.range.path;
  const oldDoc = oldDocsByPath.get(targetPath);
  const newDoc = newDocsByPath.get(targetPath);
  if (!oldDoc || !newDoc) {
    return entry;
  }

  const previousLines = entry.lineIds.length
    ? entry.lineIds.map((lineId) => getLineById(oldDoc, lineId)).filter(isAuditLine)
    : linesInRange(oldDoc, entry.range);
  const previousText = previousLines.map((line) => line.text);
  const previousRange = entry.range;
  const previousLineIds = entry.lineIds;

  const matches = findContiguousMatches(newDoc, previousText);
  if (matches.length === 1) {
    const match = matches[0];
    const blockIds = [...new Set(match.lines.map((line) => parentBlockId(line.id)))];
    return {
      ...entry,
      blockIds,
      lineIds: entry.mappingKind === "block-fallback" ? [] : match.lines.map((line) => line.id),
      range: { path: targetPath, startLine: match.startLine, endLine: match.endLine },
      changedSinceBase: newDoc.changedSinceBase,
      stale: undefined,
    };
  }

  const reason =
    previousText.length === 0
      ? "missing-range"
      : matches.length > 1
        ? "ambiguous-match"
        : "text-mismatch";
  const message =
    reason === "ambiguous-match"
      ? "Several destination ranges matched the previous text; reselect the destination."
      : reason === "missing-range"
        ? "Previous destination range could not be read from the old inventory."
        : "Destination line text changed; reselect or rejustify this mapping.";

  return {
    ...entry,
    stale: { reason, message, previousRange, previousLineIds, checkedAt },
  };
}

function findContiguousMatches(
  doc: AuditDocument,
  expected: string[],
): Array<{ startLine: number; endLine: number; lines: AuditLine[] }> {
  if (expected.length === 0) {
    return [];
  }
  const lines = allDocumentLines(doc);
  const matches: Array<{ startLine: number; endLine: number; lines: AuditLine[] }> = [];
  for (let index = 0; index <= lines.length - expected.length; index += 1) {
    const slice = lines.slice(index, index + expected.length);
    if (slice.map((line) => line.text).join("\n") === expected.join("\n")) {
      matches.push({
        startLine: slice[0].line,
        endLine: slice[slice.length - 1].line,
        lines: slice,
      });
    }
  }
  return matches;
}

function renderMarkdown(data: AuditData): string {
  const lines: string[] = [];
  lines.push(`# ${data.audit.title}`);
  lines.push("");
  lines.push(`- Schema version: ${data.schemaVersion}`);
  lines.push(`- Source docs: ${data.sourceDocs.length}`);
  lines.push(`- Destination docs: ${data.destDocs.length}`);
  lines.push(`- Mappings: ${data.mappings.length}`);
  lines.push(`- Validation: ${data.validation.errors.length} error(s), ${data.validation.warnings.length} warning(s)`);
  lines.push("");
  lines.push("## Mapping Summary");
  lines.push("");
  lines.push("| ID | Source | Summary | Action | Reason | Destination | Status | Justification |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const mapping of data.mappings) {
    const sourceRange = sourceRangeLabel(data, mapping);
    const destination = destinationLabel(mapping);
    lines.push(
      `| ${mapping.id} | ${escapeTable(sourceRange)} | ${escapeTable(mapping.summary)} | ${mapping.action} | ${mapping.reason} | ${escapeTable(destination)} | ${mapping.status} | ${escapeTable(mapping.justification)} |`,
    );
  }
  lines.push("");
  lines.push("## Line Mapping Details");
  lines.push("");
  lines.push("| Mapping | Source line | Source text | Action | Reason | Status | Confidence | Destinations | Justification |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const mapping of data.mappings) {
    for (const row of mapping.mapping) {
      const sourceLine = findSourceLine(data, row.sourceId);
      const sourceLabel = sourceLine ? `${sourceLine.path}:${sourceLine.line}` : row.sourceId;
      const sourceText = sourceLine?.text ?? "";
      lines.push(
        `| ${mapping.id} | ${escapeTable(sourceLabel)} | ${escapeTable(sourceText)} | ${row.action} | ${row.reason} | ${row.status} | ${row.confidence} | ${escapeTable(rowDestinationDetails(row))} | ${escapeTable(row.justification)} |`,
      );
    }
  }
  if (data.validation.errors.length > 0) {
    lines.push("");
    lines.push("## Validation Errors");
    lines.push("");
    for (const error of data.validation.errors) {
      lines.push(`- ${error.code}: ${error.message}`);
    }
  }
  if (data.validation.warnings.length > 0) {
    lines.push("");
    lines.push("## Validation Warnings");
    lines.push("");
    for (const warning of data.validation.warnings) {
      lines.push(`- ${warning.code}: ${warning.message}`);
    }
  }
  if (data.validation.acceptedWarnings.length > 0) {
    lines.push("");
    lines.push("## Accepted Warnings");
    lines.push("");
    for (const warning of data.validation.acceptedWarnings) {
      lines.push(`- ${warning.code}: ${warning.message} (${warning.acceptedJustification})`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function renderHtml(data: AuditData): Promise<string> {
  const scriptPath = fileURLToPath(import.meta.url);
  const templatePath = path.resolve(path.dirname(scriptPath), "../../assets/audit-viewer.html");
  const template = await readFile(templatePath, "utf8");
  const payload = JSON.stringify(data).replace(/</g, "\\u003c");
  return template.replace("__AUDIT_JSON__", payload);
}

function destinationLabel(mapping: BlockMapping): string {
  const ranges = new Set<string>();
  for (const row of mapping.mapping) {
    for (const entry of row.dest) {
      if (entry.kind === "external") {
        ranges.add(entry.label);
      } else {
        ranges.add(`${entry.range.path}:${entry.range.startLine}-${entry.range.endLine}`);
      }
    }
  }
  return ranges.size > 0 ? [...ranges].join("<br />") : "none";
}

function rowDestinationDetails(row: MappingRow): string {
  if (row.dest.length === 0) {
    return "none";
  }
  return row.dest.map(destinationEntryDetails).join("<br />");
}

function destinationEntryDetails(entry: DestinationEntry): string {
  if (entry.kind === "external") {
    const parts = [`${entry.id} external`, entry.label];
    if (entry.url) {
      parts.push(entry.url);
    }
    parts.push(`justification=${entry.justification}`);
    return parts.join("; ");
  }

  const parts = [
    `${entry.id} ${entry.kind}`,
    `${entry.range.path}:${entry.range.startLine}-${entry.range.endLine}`,
    `mappingKind=${entry.mappingKind}`,
    `changedSinceBase=${String(entry.changedSinceBase)}`,
    `justification=${entry.justification}`,
  ];
  if (entry.kind === "generated") {
    const generatorRange =
      entry.generator.startLine && entry.generator.endLine
        ? `${entry.generator.path}:${entry.generator.startLine}-${entry.generator.endLine}`
        : entry.generator.path;
    parts.push(`generator=${generatorRange}`);
  }
  if (entry.stale) {
    parts.push(
      `stale=${entry.stale.reason}: ${entry.stale.message}; previous=${entry.stale.previousRange.path}:${entry.stale.previousRange.startLine}-${entry.stale.previousRange.endLine}`,
    );
  }
  return parts.join("; ");
}

function sourceRangeLabel(data: AuditData, mapping: BlockMapping): string {
  const lines = mapping.source.lineIds
    .map((lineId) => findSourceLine(data, lineId))
    .filter(isAuditLine);
  if (lines.length === 0) {
    return mapping.source.lineIds.join(", ");
  }
  return `${lines[0].path}:${lines[0].line}-${lines[lines.length - 1].line}`;
}

function escapeTable(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, "<br />");
}

async function readAudit(cwd: string, filePath: string): Promise<AuditData> {
  const data = await readJsonFile<AuditData>(cwd, filePath);
  if (data.schemaVersion !== schemaVersion) {
    throw new Error(`Unsupported audit schemaVersion: ${String(data.schemaVersion)}`);
  }
  return data;
}

async function readJsonFile<T>(cwd: string, filePath: string): Promise<T> {
  const absolutePath = path.resolve(cwd, filePath);
  const raw = await readFile(absolutePath, "utf8");
  return JSON.parse(raw) as T;
}

async function readText(cwd: string, filePath: string): Promise<string> {
  return readFile(path.resolve(cwd, filePath), "utf8");
}

function readGitFile(cwd: string, ref: string, filePath: string): string {
  const result = spawnSync("git", ["show", `${ref}:${filePath}`], {
    cwd,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(`Could not read ${filePath} at ${ref}: ${result.stderr.trim()}`);
  }
  return result.stdout;
}

function changedSinceBase(cwd: string, baseRef: string, filePath: string): boolean {
  const result = spawnSync("git", ["diff", "--quiet", baseRef, "--", filePath], {
    cwd,
    encoding: "utf8",
  });
  if (result.status === 0) {
    return false;
  }
  if (result.status === 1) {
    return true;
  }
  return false;
}

async function ensureWritable(filePath: string, force: boolean): Promise<void> {
  if (existsSync(filePath) && !force) {
    throw new Error(`Refusing to overwrite existing file without --force: ${filePath}`);
  }
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await writeTextFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function writeTextFile(filePath: string, content: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

function resolveOut(cwd: string, filePath: string): string {
  return path.resolve(cwd, filePath);
}

function relative(cwd: string, filePath: string): string {
  return path.relative(cwd, filePath) || ".";
}

function touch(data: AuditData): void {
  data.audit.updatedAt = new Date().toISOString();
}

function inferAuditId(paths: string[]): string {
  const first = paths[0]?.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return first ? `docs-audit-v2-${first}` : "docs-audit-v2";
}

function nextDocNumber(docs: AuditDocument[], prefix: "S" | "D"): number {
  let max = 0;
  for (const doc of docs) {
    if (doc.id.startsWith(prefix)) {
      const value = Number.parseInt(doc.id.slice(1), 10);
      if (Number.isFinite(value)) {
        max = Math.max(max, value);
      }
    }
  }
  return max + 1;
}

function findSourceLine(data: AuditData, sourceId: string): AuditLine | undefined {
  for (const doc of data.sourceDocs) {
    const line = getLineById(doc, sourceId);
    if (line) {
      return line;
    }
  }
  return undefined;
}

function isAuditLine(value: AuditLine | undefined): value is AuditLine {
  return Boolean(value);
}

function linesInRange(doc: AuditDocument, range: Range): AuditLine[] {
  return allDocumentLines(doc).filter(
    (line) => line.line >= range.startLine && line.line <= range.endLine,
  );
}

function parentBlockId(lineId: string): string {
  return lineId.replace(/\.L\d+$/, "");
}

function lineRange(line: AuditLine): Range {
  return { path: line.path, startLine: line.line, endLine: line.line };
}

function isFormattingOnly(line: AuditLine, data: AuditData): boolean {
  const block = findBlockForLine(data, line.id);
  const text = line.text.trim();
  if (!text) {
    return true;
  }
  if (block?.kind === "thematic-break") {
    return true;
  }
  if (block?.kind === "frontmatter" && (text === "---" || text === "+++")) {
    return true;
  }
  if (block?.kind === "code" && /^(```|~~~)/.test(text)) {
    return true;
  }
  if (block?.kind === "table" && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(text)) {
    return true;
  }
  if (block?.kind === "mdx" && /^<\/?[A-Z][A-Za-z0-9_.:-]*(\s[^>]*)?\/?>$/.test(text)) {
    return true;
  }
  return false;
}

function findBlockForLine(data: AuditData, lineId: string) {
  const blockId = parentBlockId(lineId);
  for (const doc of [...data.sourceDocs, ...data.destDocs]) {
    const block = getBlockById(doc, blockId);
    if (block) {
      return block;
    }
  }
  return undefined;
}

function finding(
  severity: "error" | "warning",
  code: string,
  message: string,
  sourceIds: string[],
  destinationIds: string[],
  ranges: Range[],
  suggestion?: string,
): ValidationFinding {
  return { severity, code, message, sourceIds, destinationIds, ranges, suggestion };
}

function sameFinding(left: ValidationFinding, right: ValidationFinding): boolean {
  return (
    left.code === right.code &&
    JSON.stringify(left.sourceIds ?? []) === JSON.stringify(right.sourceIds ?? []) &&
    JSON.stringify(left.destinationIds ?? []) === JSON.stringify(right.destinationIds ?? []) &&
    JSON.stringify(left.ranges ?? []) === JSON.stringify(right.ranges ?? [])
  );
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});

export { parseArgs, validateAudit, renderMarkdown };
