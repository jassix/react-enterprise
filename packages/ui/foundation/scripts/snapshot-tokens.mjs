#!/usr/bin/env bun
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

const root = resolve(import.meta.dirname, "..");
const tokensPath = resolve(root, "styled-system/tokens/tokens.d.ts");
const snapshotPath = resolve(root, "tokens.snapshot.json");

if (!existsSync(tokensPath)) {
  console.error(`Token types not found at ${tokensPath}.`);
  console.error("Run `bun --filter @lume/foundation codegen` first.");
  process.exit(2);
}

const source = readFileSync(tokensPath, "utf8");
const tokens = [...source.matchAll(/"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((t) => t.includes("."))
  .toSorted();
const unique = [...new Set(tokens)];
const hash = createHash("sha256").update(unique.join("\n")).digest("hex").slice(0, 12);
const payload = { version: 1, count: unique.length, hash, tokens: unique };

const mode = process.argv.includes("--check") ? "check" : "write";

if (mode === "write") {
  writeFileSync(snapshotPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${unique.length} tokens (hash ${hash}) to tokens.snapshot.json`);
  process.exit(0);
}

if (!existsSync(snapshotPath)) {
  console.error("No tokens.snapshot.json found. Run without --check to create one.");
  process.exit(2);
}
const previous = JSON.parse(readFileSync(snapshotPath, "utf8"));
const prevSet = new Set(previous.tokens);
const nextSet = new Set(unique);
const removed = [...prevSet].filter((t) => !nextSet.has(t));
const added = [...nextSet].filter((t) => !prevSet.has(t));

if (removed.length === 0 && added.length === 0) {
  console.log(`Token snapshot OK (${unique.length} tokens, hash ${hash}).`);
  process.exit(0);
}

if (removed.length > 0) {
  console.error(`\n✗ Removed ${removed.length} token(s):`);
  for (const t of removed) console.error(`  - ${t}`);
  console.error("\nRemoved tokens are a breaking change for downstream consumers.");
  console.error("If intentional, run `bun --filter @lume/foundation tokens:snapshot` and commit.");
}
if (added.length > 0) {
  console.log(`\n+ Added ${added.length} token(s):`);
  for (const t of added) console.log(`  + ${t}`);
}

process.exit(removed.length > 0 ? 1 : 0);
