/* Extracts the brand paths we actually use from simple-icons and writes a
   self-contained icon module, so the package itself is not a dependency. */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const require = createRequire(import.meta.url);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Paths live on the exported icon objects, not in icons.json (metadata only).
const si = require("simple-icons");
const bySlug = new Map(
  Object.values(si)
    .filter((i) => i && typeof i === "object" && i.slug && i.path)
    .map((i) => [i.slug, i])
);

// key in the stack data -> simple-icons slug
const BRAND = {
  python: "python",
  r: "r",
  javascript: "javascript",
  ollama: "ollama",
  huggingface: "huggingface",
  langchain: "langchain",
  crewai: "crewai",
  mcp: "modelcontextprotocol",
  llama: "meta",
  fastapi: "fastapi",
  postgresql: "postgresql",
  mongodb: "mongodb",
  redis: "redis",
  n8n: "n8n",
  docker: "docker",
  linux: "linux",
  gcp: "googlecloud",
  githubactions: "githubactions",
  pandas: "pandas",
  numpy: "numpy",
  tensorflow: "tensorflow",
  keras: "keras",
  pytorch: "pytorch",
};

const out = {};
const missing = [];
for (const [key, slug] of Object.entries(BRAND)) {
  const icon = bySlug.get(slug);
  if (!icon) {
    missing.push(`${key} -> ${slug}`);
    continue;
  }
  out[key] = icon.path;
}

if (missing.length) {
  console.error("MISSING:", missing.join(", "));
  process.exit(1);
}

const lines = Object.entries(out)
  .map(([k, d]) => `  ${k}: "${d}",`)
  .join("\n");

const file = `/* ==========================================================================
   Brand marks.

   Generated from Simple Icons (https://simpleicons.org, CC0 1.0). Only the
   marks this site actually uses are inlined here, so the package is not a
   runtime or build dependency. Every path is a single 24x24 shape drawn with
   currentColor, which is why they sit correctly in the site's palette.

   Logos remain the trademarks of their respective owners and are used here
   nominatively, to label technologies used.

   Regenerate: npm i -D simple-icons && node scripts/gen-brand-icons.mjs
   ========================================================================== */

export const BRAND_PATHS = {
${lines}
};
`;

writeFileSync(resolve(ROOT, "src/data/brandPaths.js"), file, "utf8");
console.log(`wrote ${Object.keys(out).length} brand paths`);
