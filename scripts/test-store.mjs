/* Exercises the real projectStore against a stubbed browser environment. */
import assert from "node:assert/strict";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// --- minimal browser stubs --------------------------------------------------
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
const listeners = new Map();
globalThis.window = {
  addEventListener: (t, f) => listeners.set(t, [...(listeners.get(t) || []), f]),
  removeEventListener: (t, f) =>
    listeners.set(t, (listeners.get(t) || []).filter((x) => x !== f)),
  dispatchEvent: (e) => (listeners.get(e.type) || []).forEach((f) => f(e)),
};
globalThis.Event = class {
  constructor(type) {
    this.type = type;
  }
};

const S = await import(pathToFileURL(resolve(ROOT, "src/lib/projectStore.js")).href);

let pass = 0;
const ok = (name) => {
  pass++;
  console.log(`  ok  ${name}`);
};

// --- baseline ---------------------------------------------------------------
const seeds = S.getProjects();
const SEED_COUNT = seeds.length;
assert.ok(SEED_COUNT >= 5, `expected at least 5 seed projects, got ${SEED_COUNT}`);
assert.ok(seeds.every((p) => p.slug && p.name && p.tech.length));
ok(`${SEED_COUNT} seeds resolve with required fields`);

assert.equal(S.hasLocalEdits(), false);
ok("no local edits on a fresh store");

// --- slugify ----------------------------------------------------------------
assert.equal(S.slugify("Blox AI — Clinical Assistant!"), "blox-ai-clinical-assistant");
assert.equal(S.slugify("  Multi   Spaces  "), "multi-spaces");
assert.equal(S.slugify("it's fine"), "its-fine");
ok("slugify handles punctuation, spaces, apostrophes");

// --- validation -------------------------------------------------------------
const bad = S.validateProject(S.normalizeProject({}));
assert.ok(bad.name && bad.slug && bad.tagline && bad.problem && bad.solution && bad.tech);
ok("empty project fails every required check");

const badSlug = S.validateProject(S.normalizeProject({ name: "X", slug: "Not A Slug" }));
assert.equal(badSlug.slug, undefined, "slugify already normalised it");
ok("slug is normalised before validation");

// --- add a new project ------------------------------------------------------
const draft = {
  name: "Document Intelligence Pipeline",
  tagline: "Turns unstructured documents into validated structured data.",
  status: "Portfolio Project",
  problem: "Documents arrive as PDFs and images.",
  solution: "OCR, then LLM extraction against a schema, then validation.",
  architecture: ["PDF / image", "OCR", "LLM extraction", "Schema", "Database"],
  highlights: ["Schema-validated output"],
  tech: ["Python", "OCR", "FastAPI"],
  challenges: [{ title: "Bad scans", body: "Confidence thresholds." }],
  result: ["Structured records from unstructured input."],
  lessons: ["Validation belongs after extraction, not inside the prompt."],
  links: { github: "https://github.com/example/doc", demo: "", docs: "" },
};
const saved = S.saveProject(draft);
assert.equal(saved.slug, "document-intelligence-pipeline");
assert.equal(S.getProjects().length, SEED_COUNT + 1);
assert.equal(S.getProject("document-intelligence-pipeline").name, draft.name);
assert.equal(S.getProject("document-intelligence-pipeline").custom, true);
ok("new project is added, resolvable by slug, flagged custom");

assert.equal(S.hasLocalEdits(), true);
ok("hasLocalEdits flips after a save");

// --- edit a seed (override) -------------------------------------------------
const seed = seeds[1];
S.saveProject({ ...seed, tagline: "Edited tagline." }, seed.slug);
assert.equal(S.getProjects().length, SEED_COUNT + 1, "editing a seed does not duplicate it");
assert.equal(S.getProject(seeds[1].slug).tagline, "Edited tagline.");
assert.equal(S.getProject(seeds[1].slug).custom, false, "still a seed");
ok("editing a seed overrides in place without duplicating");

// --- seed order is preserved ------------------------------------------------
assert.deepEqual(
  S.getProjects().slice(0, SEED_COUNT).map((p) => p.slug),
  seeds.map((p) => p.slug),
  "seed order unchanged; custom project appended"
);
ok("seed ordering is stable, customs append");

// --- rename a seed's slug ---------------------------------------------------
const renameTarget = seeds[SEED_COUNT - 1];
S.saveProject({ ...renameTarget, slug: "renamed-seed" }, renameTarget.slug);
assert.equal(S.getProject(renameTarget.slug), null, "old slug is gone");
assert.equal(S.getProject("renamed-seed").name, renameTarget.name);
assert.equal(S.getProjects().length, SEED_COUNT + 1, "rename does not duplicate");
ok("renaming a seed's slug hides the original");

// --- delete -----------------------------------------------------------------
S.deleteProject("document-intelligence-pipeline");
assert.equal(S.getProject("document-intelligence-pipeline"), null);
assert.equal(S.getProjects().length, SEED_COUNT);
ok("deleting a custom project removes it");

// Pick a seed by position rather than by name, so removing or renaming a
// project in projects.js never breaks the suite.
const victim = seeds[Math.min(2, SEED_COUNT - 1)];
S.deleteProject(victim.slug);
assert.equal(S.getProject(victim.slug), null);
assert.equal(S.getHiddenSeeds().map((p) => p.slug).includes(victim.slug), true);
ok("deleting a seed hides it and lists it as restorable");

S.restoreSeed(victim.slug);
assert.equal(S.getProject(victim.slug).name, victim.name);
ok("restoring a seed brings back the committed version");

// --- contribution field -----------------------------------------------------
assert.ok(
  S.getProject("scanledger").contribution.startsWith("Built the document scanning"),
  "ScanLedger carries a contribution note"
);
assert.equal(S.normalizeProject({}).contribution, "", "defaults to empty");
const withContrib = S.saveProject({ ...draft, slug: "c-test", contribution: "Built the OCR half." });
assert.equal(withContrib.contribution, "Built the OCR half.");
S.deleteProject("c-test");
ok("contribution survives normalise, save and read-back");

// --- links ------------------------------------------------------------------
const emptyLinks = S.normalizeProject({}).links;
assert.deepEqual(Object.keys(emptyLinks).sort(), ["demo", "docs", "github", "writeup"]);
assert.ok(Object.values(emptyLinks).every((v) => v === ""), "all default to empty");
const linked = S.saveProject({
  ...draft,
  slug: "l-test",
  links: { demo: "https://x.test/", writeup: "https://y.test/a", docs: "", github: "" },
});
assert.equal(linked.links.writeup, "https://y.test/a");
assert.equal(linked.links.demo, "https://x.test/");
S.deleteProject("l-test");
const withLinks = S.getProjects().filter((p) => Object.values(p.links).some(Boolean));
assert.ok(withLinks.length >= 4, `expected 4+ seeds to carry links, got ${withLinks.length}`);
ok(`links normalise to four fields; ${withLinks.length} seeds carry one`);

// --- export -----------------------------------------------------------------
const json = JSON.parse(S.exportJSON());
assert.ok(Array.isArray(json));
assert.equal(json.length, S.getProjects().length);
assert.ok(!("custom" in json[0]), "internal flag is stripped from the export");
assert.ok(S.exportModule().startsWith("/* Generated from /admin on "));
assert.ok(S.exportModule().includes("export const seedProjects = ["));
ok("export produces clean JSON and a pasteable module");

// --- import -----------------------------------------------------------------
const n = S.importProjects([draft]);
assert.equal(n, 1);
assert.equal(S.getProjects().length, 1, "import replaces the whole set exactly");
assert.equal(S.getProjects()[0].slug, "document-intelligence-pipeline");
ok("import replaces the set and hides absent seeds");

assert.throws(() => S.importProjects("nope"), /JSON array/);
assert.throws(() => S.importProjects([{}]), /No valid projects/);
ok("import rejects malformed input");

// --- reset ------------------------------------------------------------------
S.resetAll();
assert.equal(S.getProjects().length, SEED_COUNT);
assert.equal(S.hasLocalEdits(), false);
assert.equal(S.getProject(seeds[1].slug).tagline, seeds[1].tagline);
ok("reset returns the site to the committed repo version");

// --- corrupt storage --------------------------------------------------------
store.set("portfolio.projects.v1", "{not json");
listeners.get("portfolio:projects-changed")?.forEach((f) => f());
assert.equal(S.getProjects().length, SEED_COUNT, "falls back to seeds on corrupt JSON");
ok("corrupt localStorage degrades to the seed list");

console.log(`\n${pass} checks passed\n`);
