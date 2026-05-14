import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const scriptsRoot = path.resolve(testDir, "..");
const repoRoot = path.resolve(testDir, "../../../..");
const cli = path.join(scriptsRoot, "dist/docs-audit-v2.mjs");
const fixtures = "active/docs-audit-v2/scripts/tests/fixtures";

function tmp() {
  return mkdtempSync(path.join(tmpdir(), "docs-audit-v2-"));
}

function run(args, options = {}) {
  return execFileSync("node", [cli, ...args], {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
  });
}

function runMaybe(args, options = {}) {
  return spawnSync("node", [cli, ...args], {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
  });
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

test("scaffold inventories Markdown blocks and stable physical source lines", () => {
  const dir = tmp();
  const auditPath = path.join(dir, "audit.json");
  run([
    "scaffold",
    "--source",
    `${fixtures}/source.md`,
    "--dest",
    `${fixtures}/dest.md`,
    "--out",
    auditPath,
    "--force",
  ]);
  const audit = readJson(auditPath);
  assert.equal(audit.schemaVersion, 1);
  assert.deepEqual(
    audit.sourceDocs[0].blocks.map((block) => block.kind),
    ["heading", "paragraph", "heading", "paragraph"],
  );
  assert.equal(audit.sourceDocs[0].blocks[1].id, "S1.B002");
  assert.equal(audit.sourceDocs[0].blocks[1].lines[1].id, "S1.B002.L002");
  assert.equal(audit.sourceDocs[0].blocks[1].lines[1].text, "Run `widget login`.");
});

test("parser normalizes frontmatter, GFM, MDX, code, blockquote, and link blocks", () => {
  const dir = tmp();
  const mdxAudit = path.join(dir, "parser.json");
  run([
    "scaffold",
    "--source",
    `${fixtures}/parser-fixture.mdx`,
    "--dest",
    `${fixtures}/dest.md`,
    "--out",
    mdxAudit,
    "--force",
  ]);
  const kinds = readJson(mdxAudit).sourceDocs[0].blocks.map((block) => block.kind);
  for (const expected of [
    "frontmatter",
    "mdx",
    "heading",
    "paragraph",
    "list",
    "table",
    "code",
    "blockquote",
    "link-block",
  ]) {
    assert.ok(kinds.includes(expected), `expected parser fixture to include ${expected}`);
  }

  const tomlAudit = path.join(dir, "toml.json");
  run([
    "scaffold",
    "--source",
    `${fixtures}/toml-frontmatter.md`,
    "--dest",
    `${fixtures}/dest.md`,
    "--out",
    tomlAudit,
    "--force",
  ]);
  assert.equal(readJson(tomlAudit).sourceDocs[0].blocks[0].kind, "frontmatter");
});

test("end-to-end JSON pipeline validates and renders report artifacts", () => {
  const dir = tmp();
  const audit = path.join(dir, "audit.json");
  const withExtra = path.join(dir, "audit.with-extra.json");
  const reindexed = path.join(dir, "audit.reindexed.json");
  const mapped = path.join(dir, "audit.mapped.json");
  const hydrated = path.join(dir, "audit.hydrated.json");
  const validated = path.join(dir, "audit.validated.json");
  const mdOut = path.join(dir, "audit.md");
  const htmlOut = path.join(dir, "audit.html");

  run(["scaffold", "--source", `${fixtures}/source.md`, "--dest", `${fixtures}/dest.md`, "--out", audit, "--force"]);
  run(["add-dest", "--data", audit, "--dest", `${fixtures}/extra-dest.md`, "--out", withExtra, "--force"]);
  const withExtraJson = readJson(withExtra);
  assert.equal(withExtraJson.destDocs[0].id, "D1");
  assert.equal(withExtraJson.destDocs[1].id, "D2");

  run([
    "reindex-dest",
    "--data",
    withExtra,
    "--dest",
    `${fixtures}/dest.md,${fixtures}/extra-dest.md`,
    "--out",
    reindexed,
    "--force",
  ]);
  run(["map", "--data", reindexed, "--patch", `${fixtures}/mapping-patch.json`, "--out", mapped, "--force"]);
  run(["hydrate", "--data", mapped, "--out", hydrated, "--force"]);
  run(["validate", "--data", hydrated, "--out", validated, "--json", "--force"]);
  const validation = readJson(validated).validation;
  assert.deepEqual(validation.errors, []);

  run(["render", "--data", validated, "--md-out", mdOut, "--html-out", htmlOut, "--force"]);
  const md = readFileSync(mdOut, "utf8");
  assert.match(md, /Mapping Summary/);
  assert.match(md, /Line Mapping Details/);
  assert.match(md, /S1\.B002\.L001/);
  assert.match(md, /mappingKind=semantic-confirmed/);
  assert.match(md, /changedSinceBase=true/);
  const html = readFileSync(htmlOut, "utf8");
  assert.match(html, /Docs Audit V2/);
  assert.match(html, /Block mode/);
  assert.match(html, /Doc mode/);
  assert.match(html, /window.__AUDIT_DATA__/);
});

test("validate reports missing line coverage and covered block fallback errors", () => {
  const dir = tmp();
  const audit = path.join(dir, "audit.json");
  run(["scaffold", "--source", `${fixtures}/source.md`, "--dest", `${fixtures}/dest.md`, "--out", audit, "--force"]);
  const missing = runMaybe(["validate", "--data", audit, "--json"]);
  assert.equal(missing.status, 1);
  assert.match(missing.stdout, /unmapped-source-line/);

  const mapped = path.join(dir, "mapped.json");
  run(["map", "--data", audit, "--patch", `${fixtures}/mapping-patch.json`, "--out", mapped, "--force"]);
  const fallback = readJson(mapped);
  fallback.mappings[1].mapping[0].dest[0].mappingKind = "block-fallback";
  fallback.mappings[1].mapping[0].dest[0].lineIds = [];
  fallback.mappings[1].mapping[0].dest[0].range = {
    path: `${fixtures}/dest.md`,
    startLine: 2,
    endLine: 2,
  };
  const fallbackPath = path.join(dir, "fallback.json");
  writeFileSync(fallbackPath, `${JSON.stringify(fallback, null, 2)}\n`);
  const result = runMaybe(["validate", "--data", fallbackPath, "--json"]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /covered-block-fallback-only/);
});

test("map rejects duplicate mapping ids in the patch before overwriting", () => {
  const dir = tmp();
  const audit = path.join(dir, "audit.json");
  const duplicatePatch = path.join(dir, "duplicate-patch.json");
  run(["scaffold", "--source", `${fixtures}/source.md`, "--dest", `${fixtures}/dest.md`, "--out", audit, "--force"]);
  const patch = readJson(path.resolve(repoRoot, fixtures, "mapping-patch.json"));
  patch.mappings = [patch.mappings[0], patch.mappings[0]];
  writeFileSync(duplicatePatch, `${JSON.stringify(patch, null, 2)}\n`);
  const result = runMaybe(["map", "--data", audit, "--patch", duplicatePatch, "--out", path.join(dir, "mapped.json"), "--force"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Duplicate mapping id M001 in mapping patch/);
});

test("reindex-dest preserves destination entry ids and marks changed text stale", () => {
  const dir = tmp();
  writeFileSync(path.join(dir, "source.md"), "# Source\nKeep this fact.\n");
  writeFileSync(path.join(dir, "dest.md"), "# Dest\nKeep this fact.\n");
  const patchPath = path.join(dir, "patch.json");
  writeFileSync(
    patchPath,
    JSON.stringify(
      {
        schemaVersion: 1,
        status: "final",
        mappings: [
          {
            id: "M001",
            summary: "Heading retitled.",
            source: { docId: "S1", blockIds: ["S1.B001"], lineIds: ["S1.B001.L001"] },
            action: "paraphrase",
            reason: "same-scope",
            status: "covered",
            confidence: "high",
            justification: "The destination heading keeps the topic.",
            mapping: [
              {
                sourceId: "S1.B001.L001",
                action: "paraphrase",
                reason: "same-scope",
                status: "covered",
                confidence: "high",
                justification: "The heading remains.",
                dest: [
                  {
                    id: "M001:S1.B001.L001:D001",
                    kind: "local",
                    docId: "D1",
                    blockIds: ["D1.B001"],
                    lineIds: ["D1.B001.L001"],
                    range: { path: "dest.md", startLine: 1, endLine: 1 },
                    mappingKind: "semantic-confirmed",
                    changedSinceBase: true,
                    justification: "The heading remains."
                  }
                ]
              }
            ]
          },
          {
            id: "M002",
            summary: "Fact retained.",
            source: { docId: "S1", blockIds: ["S1.B002"], lineIds: ["S1.B002.L001"] },
            action: "retained",
            reason: "same-scope",
            status: "covered",
            confidence: "high",
            justification: "The destination line used to preserve the fact.",
            mapping: [
              {
                sourceId: "S1.B002.L001",
                action: "retained",
                reason: "same-scope",
                status: "covered",
                confidence: "high",
                justification: "The destination line used to preserve the fact.",
                dest: [
                  {
                    id: "M002:S1.B002.L001:D001",
                    kind: "local",
                    docId: "D1",
                    blockIds: ["D1.B002"],
                    lineIds: ["D1.B002.L001"],
                    range: { path: "dest.md", startLine: 2, endLine: 2 },
                    mappingKind: "semantic-confirmed",
                    changedSinceBase: true,
                    justification: "The destination line used to preserve the fact."
                  }
                ]
              }
            ]
          }
        ]
      },
      null,
      2,
    ),
  );

  run(["scaffold", "--source", "source.md", "--dest", "dest.md", "--out", "audit.json", "--force"], { cwd: dir });
  run(["map", "--data", "audit.json", "--patch", "patch.json", "--out", "mapped.json", "--force"], { cwd: dir });
  writeFileSync(path.join(dir, "dest.md"), "# Dest\nChanged destination fact.\n");
  run(["reindex-dest", "--data", "mapped.json", "--dest", "dest.md", "--out", "reindexed.json", "--force"], { cwd: dir });
  const reindexed = readJson(path.join(dir, "reindexed.json"));
  const stale = reindexed.mappings[1].mapping[0].dest[0];
  assert.equal(stale.id, "M002:S1.B002.L001:D001");
  assert.equal(stale.stale.reason, "text-mismatch");
  const validation = runMaybe(["validate", "--data", "reindexed.json", "--json"], { cwd: dir });
  assert.equal(validation.status, 1);
  assert.match(validation.stdout, /stale-destination-entry/);
});

test("validate rejects mismatched source and destination parentage", () => {
  const dir = tmp();
  const audit = path.join(dir, "audit.json");
  const withExtra = path.join(dir, "with-extra.json");
  const mapped = path.join(dir, "mapped.json");
  run(["scaffold", "--source", `${fixtures}/source.md`, "--dest", `${fixtures}/dest.md`, "--out", audit, "--force"]);
  run(["add-dest", "--data", audit, "--dest", `${fixtures}/extra-dest.md`, "--out", withExtra, "--force"]);
  run(["map", "--data", withExtra, "--patch", `${fixtures}/mapping-patch.json`, "--out", mapped, "--force"]);
  const invalid = readJson(mapped);
  invalid.mappings[0].source.lineIds = ["S1.B002.L001"];
  invalid.mappings[0].mapping[0].sourceId = "S1.B002.L001";
  invalid.mappings[0].mapping[0].dest[0].blockIds = ["D2.B001"];
  const invalidPath = path.join(dir, "invalid-parentage.json");
  writeFileSync(invalidPath, `${JSON.stringify(invalid, null, 2)}\n`);
  const result = runMaybe(["validate", "--data", invalidPath, "--json"]);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /does not belong to S1\.B001/);
  assert.match(result.stdout, /does not belong to its destination blockIds/);
});

test("validate reports stale source ranges instead of silently reindexing source ids", () => {
  const dir = tmp();
  writeFileSync(path.join(dir, "source.md"), "# Source\nOriginal fact.\n");
  writeFileSync(path.join(dir, "dest.md"), "# Dest\nOriginal fact.\n");
  run(["scaffold", "--source", "source.md", "--dest", "dest.md", "--out", "audit.json", "--force"], { cwd: dir });
  writeFileSync(path.join(dir, "source.md"), "# Source\nChanged fact.\n");
  const result = runMaybe(["validate", "--data", "audit.json", "--json"], { cwd: dir });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /stale-source-range/);
});
