#!/usr/bin/env node
// Regenerates ../_sidebar.md from the current folder/file structure.
// Zero dependencies on purpose — run via `node scripts/generate-sidebar.js`.
// Netlify runs this automatically on every deploy (see netlify.toml), so
// the sidebar never needs to be hand-edited.

const fs = require("fs");
const path = require("path");

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
  "README.md", // handled explicitly as each folder's own link
  "CLAUDE.md", // Claude-only instructions, not site content
  "_sidebar.md", // this script's own output
]);

function humanize(name) {
  return name
    .replace(/\.md$/i, "")
    .replace(/^\d+-/, "") // drop leading "01-" style ordering prefixes
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function titleFor(filePath, fallbackName) {
  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/^#\s+(.+?)\s*$/m);
  return match ? match[1].trim() : humanize(fallbackName);
}

function encodeLink(relPath) {
  return relPath.split(path.sep).map(encodeURIComponent).join("/");
}

function walk(dir, indent) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const items = entries
    .filter((e) => {
      if (e.isFile()) return e.name.endsWith(".md") && !SKIP_FILES.has(e.name);
      if (e.isDirectory()) return !SKIP_DIRS.has(e.name) && !e.name.startsWith(".");
      return false;
    })
    .map((e) => ({ name: e.name, isDir: e.isDirectory() }))
    .sort((a, b) => a.name.localeCompare(b.name)); // keeps "01-", "02-" ordering intact

  const lines = [];

  for (const item of items) {
    const itemPath = path.join(dir, item.name);

    if (!item.isDir) {
      const relPath = encodeLink(path.relative(ROOT, itemPath));
      const title = titleFor(itemPath, item.name);
      lines.push(`${indent}- [${title}](${relPath})`);
      continue;
    }

    const readmePath = path.join(itemPath, "README.md");
    const hasReadme = fs.existsSync(readmePath);
    const childLines = walk(itemPath, indent + "  ");

    if (!hasReadme && childLines.length === 0) continue; // nothing to link to, skip

    const title = hasReadme ? titleFor(readmePath, item.name) : humanize(item.name);
    const link = hasReadme ? encodeLink(path.relative(ROOT, readmePath)) : null;

    lines.push(link ? `${indent}- [${title}](${link})` : `${indent}- **${title}**`);
    lines.push(...childLines);
  }

  return lines;
}

// Root-level nav order is fixed on purpose (not alphabetical) — these are
// the three top-level categories described in README.md's "how this stays
// scalable" section. Everything *inside* each one is still auto-derived by
// walk(), so adding new files within them requires no changes here.
const TOP_LEVEL_ORDER = ["foundations", "applications", "skills-catalog"];

// Flat, cross-domain files (not tied to one of the three categories above)
// nest under foundations/ in the sidebar for a single home-base menu,
// without moving the actual files out of the repo root.
const NEST_UNDER_FOUNDATIONS = ["glossary.md", "use-case-ideas.md"];

function emitTopLevelDir(dirName, indent) {
  const dirPath = path.join(ROOT, dirName);
  if (!fs.existsSync(dirPath)) return [];

  const readmePath = path.join(dirPath, "README.md");
  const hasReadme = fs.existsSync(readmePath);
  const title = hasReadme ? titleFor(readmePath, dirName) : humanize(dirName);
  const link = hasReadme ? encodeLink(path.relative(ROOT, readmePath)) : null;

  const lines = [link ? `${indent}- [${title}](${link})` : `${indent}- **${title}**`];
  lines.push(...walk(dirPath, indent + "  "));

  if (dirName === "foundations") {
    for (const fileName of NEST_UNDER_FOUNDATIONS) {
      const filePath = path.join(ROOT, fileName);
      if (!fs.existsSync(filePath)) continue;
      const relPath = encodeLink(path.relative(ROOT, filePath));
      lines.push(`${indent}  - [${titleFor(filePath, fileName)}](${relPath})`);
    }
  }

  return lines;
}

const rootReadme = path.join(ROOT, "README.md");
const homeTitle = titleFor(rootReadme, "README.md");

const topLevelLines = TOP_LEVEL_ORDER.flatMap((dirName) => emitTopLevelDir(dirName, ""));

// Anything else at the root (a future top-level .md file, or a new
// category folder not yet added to TOP_LEVEL_ORDER above) won't silently
// vanish from the sidebar — flag it instead of guessing where it belongs.
const handledDirs = new Set(TOP_LEVEL_ORDER);
const handledFiles = new Set(NEST_UNDER_FOUNDATIONS);
const leftovers = fs.readdirSync(ROOT, { withFileTypes: true }).filter((e) => {
  if (e.isDirectory()) return !handledDirs.has(e.name) && !SKIP_DIRS.has(e.name) && !e.name.startsWith(".");
  return e.name.endsWith(".md") && !SKIP_FILES.has(e.name) && !handledFiles.has(e.name);
});
if (leftovers.length) {
  console.warn(
    `generate-sidebar: found root item(s) not in TOP_LEVEL_ORDER or NEST_UNDER_FOUNDATIONS, ` +
      `not included in sidebar: ${leftovers.map((e) => e.name).join(", ")}`
  );
}

const body = [
  "<!-- Auto-generated by scripts/generate-sidebar.js — do not hand-edit. -->",
  `- [${homeTitle}](README.md)`,
  ...topLevelLines,
  "",
].join("\n");

fs.writeFileSync(path.join(ROOT, "_sidebar.md"), body);
console.log(`Wrote _sidebar.md (${body.split("\n").length - 1} lines)`);
