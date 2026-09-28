/* ==========================================================================
   Project store

   Projects live in two places:

     1. src/data/projects.js  — the committed seed list (source of truth)
     2. localStorage          — edits and additions made in /admin

   The store resolves both into one list at runtime, so anything added in
   /admin appears on the live site immediately in that browser. Because this
   is a static site, those edits are local to the browser until you export
   them from /admin and paste the JSON back into src/data/projects.js.

   Storage shape:
     {
       version: 1,
       edits:  Project[]   // new projects, or full replacements of a seed
       hidden: string[]    // seed slugs to hide
     }
   ========================================================================== */

import { seedProjects } from "../data/projects.js";

const KEY = "portfolio.projects.v1";
const EVENT = "portfolio:projects-changed";

const EMPTY = { version: 1, edits: [], hidden: [] };

/* -------------------------------------------------------------------------
   Shape helpers
   ------------------------------------------------------------------------- */

const arr = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);
const str = (v) => (typeof v === "string" ? v : "");

export function slugify(value) {
  return str(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/** Guarantees every field exists with the right type. */
export function normalizeProject(raw = {}) {
  return {
    slug: slugify(raw.slug || raw.name),
    name: str(raw.name).trim(),
    tagline: str(raw.tagline).trim(),
    capability: str(raw.capability).trim(),
    status: str(raw.status).trim() || "Portfolio Project",
    context: str(raw.context).trim(),
    year: str(raw.year).trim(),
    featured: raw.featured !== false,
    contribution: str(raw.contribution).trim(),
    problem: str(raw.problem).trim(),
    solution: str(raw.solution).trim(),
    architecture: arr(raw.architecture).map((s) => str(s).trim()).filter(Boolean),
    highlights: arr(raw.highlights).map((s) => str(s).trim()).filter(Boolean),
    tech: arr(raw.tech).map((s) => str(s).trim()).filter(Boolean),
    challenges: arr(raw.challenges)
      .map((c) =>
        typeof c === "string"
          ? { title: c.trim(), body: "" }
          : { title: str(c?.title).trim(), body: str(c?.body).trim() }
      )
      .filter((c) => c.title || c.body),
    result: arr(raw.result).map((s) => str(s).trim()).filter(Boolean),
    lessons: arr(raw.lessons).map((s) => str(s).trim()).filter(Boolean),
    links: {
      github: str(raw.links?.github).trim(),
      demo: str(raw.links?.demo).trim(),
      docs: str(raw.links?.docs).trim(),
      writeup: str(raw.links?.writeup).trim(),
    },
    custom: raw.custom === true,
  };
}

/** Minimum bar for a project to be shown. */
export function validateProject(p) {
  const errors = {};
  if (!p.name.trim()) errors.name = "A project name is required.";
  if (!p.slug) errors.slug = "A URL slug is required.";
  else if (!/^[a-z0-9-]+$/.test(p.slug))
    errors.slug = "Use lowercase letters, numbers and hyphens only.";
  if (!p.tagline.trim()) errors.tagline = "A one-line description is required.";
  if (!p.problem.trim()) errors.problem = "Describe the problem this solves.";
  if (!p.solution.trim()) errors.solution = "Describe how the system solves it.";
  if (!p.tech.length) errors.tech = "List at least one technology.";
  return errors;
}

/* -------------------------------------------------------------------------
   Read / write
   ------------------------------------------------------------------------- */

let cache = null;
let cachedResolved = null;

function readRaw() {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null");
    cache =
      parsed && typeof parsed === "object"
        ? {
            version: 1,
            edits: arr(parsed.edits).map(normalizeProject),
            hidden: arr(parsed.hidden).map(str),
          }
        : { ...EMPTY };
  } catch {
    // Private mode, disabled storage, or corrupt JSON — fall back to seeds.
    cache = { ...EMPTY };
  }
  return cache;
}

function writeRaw(next) {
  cache = next;
  cachedResolved = null;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — changes stay in memory for this session */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

/* -------------------------------------------------------------------------
   Resolution: seeds + edits − hidden
   ------------------------------------------------------------------------- */

export function getProjects() {
  if (cachedResolved) return cachedResolved;

  const { edits, hidden } = readRaw();
  const editBySlug = new Map(edits.map((p) => [p.slug, p]));
  const hiddenSet = new Set(hidden);

  const resolved = [];

  for (const seed of seedProjects) {
    if (hiddenSet.has(seed.slug)) continue;
    const override = editBySlug.get(seed.slug);
    resolved.push(override ? { ...override, custom: false } : normalizeProject(seed));
    editBySlug.delete(seed.slug);
  }

  for (const extra of editBySlug.values()) {
    if (hiddenSet.has(extra.slug)) continue;
    resolved.push({ ...extra, custom: true });
  }

  cachedResolved = resolved;
  return resolved;
}

export function getFeaturedProjects() {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug) {
  return getProjects().find((p) => p.slug === slug) || null;
}

/** Seed projects the admin has hidden — shown in /admin so they can be restored. */
export function getHiddenSeeds() {
  const { hidden } = readRaw();
  const hiddenSet = new Set(hidden);
  return seedProjects.filter((s) => hiddenSet.has(s.slug)).map(normalizeProject);
}

/** True when this slug exists only in localStorage. */
export function isSeed(slug) {
  return seedProjects.some((s) => s.slug === slug);
}

/* -------------------------------------------------------------------------
   Mutations
   ------------------------------------------------------------------------- */

export function saveProject(project, originalSlug = null) {
  const next = normalizeProject(project);
  const state = readRaw();
  const edits = state.edits.filter(
    (p) => p.slug !== next.slug && p.slug !== originalSlug
  );

  // Renaming a seed's slug means the original seed still needs hiding.
  const hidden = new Set(state.hidden);
  if (originalSlug && originalSlug !== next.slug && isSeed(originalSlug)) {
    hidden.add(originalSlug);
  }
  hidden.delete(next.slug);

  writeRaw({ version: 1, edits: [...edits, next], hidden: [...hidden] });
  return next;
}

export function deleteProject(slug) {
  const state = readRaw();
  const edits = state.edits.filter((p) => p.slug !== slug);
  const hidden = new Set(state.hidden);
  // A seed can't be removed from the committed file at runtime — hide it.
  if (isSeed(slug)) hidden.add(slug);
  writeRaw({ version: 1, edits, hidden: [...hidden] });
}

export function restoreSeed(slug) {
  const state = readRaw();
  const hidden = state.hidden.filter((s) => s !== slug);
  const edits = state.edits.filter((p) => p.slug !== slug);
  writeRaw({ version: 1, edits, hidden });
}

/** Drops every local edit; the site returns to exactly what is in the repo. */
export function resetAll() {
  writeRaw({ ...EMPTY, edits: [], hidden: [] });
}

/** Replaces the entire local set — used by Import. */
export function importProjects(list) {
  if (!Array.isArray(list)) throw new Error("Expected a JSON array of projects.");
  const edits = list.map(normalizeProject).filter((p) => p.slug && p.name);
  if (!edits.length) throw new Error("No valid projects found in that JSON.");
  const seedSlugs = new Set(seedProjects.map((s) => s.slug));
  const keptSlugs = new Set(edits.map((p) => p.slug));
  // Seeds absent from the imported file are hidden, so the import is exact.
  const hidden = [...seedSlugs].filter((s) => !keptSlugs.has(s));
  writeRaw({ version: 1, edits, hidden });
  return edits.length;
}

/* -------------------------------------------------------------------------
   Export — produces the array to paste into src/data/projects.js
   ------------------------------------------------------------------------- */

export function exportJSON() {
  const clean = getProjects().map(({ custom, ...rest }) => rest);
  return JSON.stringify(clean, null, 2);
}

export function exportModule() {
  return `/* Generated from /admin on ${new Date().toISOString().slice(0, 10)} */\n\nexport const seedProjects = ${exportJSON()};\n`;
}

/* -------------------------------------------------------------------------
   Subscription (useSyncExternalStore)
   ------------------------------------------------------------------------- */

export function subscribe(listener) {
  const onChange = () => {
    cache = null;
    cachedResolved = null;
    listener();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getSnapshot() {
  return getProjects();
}

/** Stable empty snapshot for SSR / non-browser environments. */
const SERVER_SNAPSHOT = seedProjects.map(normalizeProject);
export function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function hasLocalEdits() {
  const s = readRaw();
  return s.edits.length > 0 || s.hidden.length > 0;
}
