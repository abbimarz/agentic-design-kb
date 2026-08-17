#!/usr/bin/env node
// Regenerates ../_last-updated.json — maps every content .md file to the
// date of its last git commit, so the site can show "Last updated" per
// page. Zero dependencies on purpose, same as generate-sidebar.js.
// Netlify runs this automatically on every deploy (see netlify.toml).
//
// Requires full git history to be present (not a shallow clone) — see the
// `git fetch --unshallow` step in netlify.toml's build command.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

const SKIP_DIRS = new Set([
  "_inbox",
  ".git",
  ".claude",
  "node_modules",
  "scripts",
  "Attachments",
  "images",
]);

const SKIP_FILES = new Set([
  "CLAUDE.md", // Claude-only instructions, not site content
]);

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
      walk(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.endsWith(".md") && !SKIP_FILES.has(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

function lastCommitDate(filePath) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cd", "--date=short", "--", filePath],
      { cwd: ROOT, encoding: "utf8" }
    ).trim();
    return out || null; // empty string = file not yet committed
  } catch {
    return null;
  }
}

const files = walk(ROOT, []);
const map = {};

for (const filePath of files) {
  const relPath = path.relative(ROOT, filePath).split(path.sep).join("/");
  const date = lastCommitDate(filePath);
  if (date) map[relPath] = date;
}

fs.writeFileSync(path.join(ROOT, "_last-updated.json"), JSON.stringify(map, null, 2) + "\n");
console.log(`Wrote _last-updated.json (${Object.keys(map).length} files)`);
