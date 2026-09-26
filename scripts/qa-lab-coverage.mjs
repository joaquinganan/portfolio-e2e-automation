#!/usr/bin/env node
/**
 * qa-lab-coverage.json is the single source of truth for the coverage the
 * portfolio's QA Lab shows (tests defined, cross-browser executions, per tag
 * and per browser project). It is derived from `playwright test --list`, so it
 * always describes the real suite:
 *
 *   npm run coverage:update   rewrite the file after adding or removing tests
 *   npm run coverage:check    fail (CI) when the committed file is out of date
 *
 * The QA Lab API reads this file from the commit of the run it displays, and
 * the homepage smoke test compares the page against it — so nothing hard-codes
 * these numbers any more.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(root, "qa-lab-coverage.json");
const TAG_ORDER = ["smoke", "regression", "responsive"];

function listSuite() {
  const tmp = path.join(os.tmpdir(), `qa-lab-list-${process.pid}.json`);
  try {
    // JSON goes to a file: the config's dotenv banner is printed on stdout.
    execFileSync(path.join(root, "node_modules", ".bin", "playwright"), ["test", "--list", "--reporter=json"], {
      cwd: root,
      env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_FILE: tmp, BASE_URL: process.env.BASE_URL || "http://localhost" },
      stdio: ["ignore", "ignore", "inherit"],
    });
    return JSON.parse(fs.readFileSync(tmp, "utf8"));
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

function collect(suite, out) {
  for (const spec of suite.specs || []) out.push(spec);
  for (const child of suite.suites || []) collect(child, out);
  return out;
}

export function buildCoverage(report) {
  const specs = report.suites.flatMap((suite) => collect(suite, []));
  const unique = new Map();                       // one entry per test, whatever the number of projects
  const perProject = new Map(report.config.projects.map((p) => [p.name, 0]));
  const tagDefined = new Map(), tagExecutions = new Map();
  for (const spec of specs) {
    // title included: tests generated in a loop share file:line:column but are distinct tests
    const key = `${spec.file}:${spec.line}:${spec.column}:${spec.title}`;
    const tags = spec.tags && spec.tags.length ? spec.tags : ["untagged"];
    if (!unique.has(key)) {
      unique.set(key, spec);
      for (const tag of tags) tagDefined.set(tag, (tagDefined.get(tag) || 0) + 1);
    }
    for (const run of spec.tests) {
      perProject.set(run.projectName, (perProject.get(run.projectName) || 0) + 1);
      for (const tag of tags) tagExecutions.set(tag, (tagExecutions.get(tag) || 0) + 1);
    }
  }
  const tags = [...tagDefined.keys()].sort((a, b) =>
    (TAG_ORDER.indexOf(a) + 1 || 99) - (TAG_ORDER.indexOf(b) + 1 || 99) || a.localeCompare(b));
  return {
    definedTests: unique.size,
    executions: [...perProject.values()].reduce((a, b) => a + b, 0),
    projects: report.config.projects.length,
    categories: tags.map((tag) => ({
      name: tag.charAt(0).toUpperCase() + tag.slice(1), defined: tagDefined.get(tag), executions: tagExecutions.get(tag) || 0,
    })),
    browsers: report.config.projects.map((p) => ({
      project: p.name, target: (p.metadata && p.metadata.target) || p.name, executions: perProject.get(p.name) || 0,
    })),
  };
}

const mode = process.argv[2];
if (mode === "--write" || mode === "--check") {
  const next = JSON.stringify(buildCoverage(listSuite()), null, 2) + "\n";
  if (mode === "--write") {
    fs.writeFileSync(OUT, next);
    console.log(`qa-lab-coverage.json updated: ${JSON.parse(next).definedTests} tests, ${JSON.parse(next).executions} executions`);
  } else {
    const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
    if (current !== next) {
      const c = current ? JSON.parse(current) : {}, n = JSON.parse(next);
      console.error(`qa-lab-coverage.json is out of date (file: ${c.definedTests} tests / ${c.executions} executions; ` +
        `suite: ${n.definedTests} / ${n.executions}). Run "npm run coverage:update" and commit the file.`);
      process.exit(1);
    }
    console.log(`qa-lab-coverage.json is current: ${JSON.parse(next).definedTests} tests, ${JSON.parse(next).executions} executions`);
  }
}
