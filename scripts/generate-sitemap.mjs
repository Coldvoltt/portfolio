/**
 * Writes dist/sitemap.xml from the committed project list, so every case
 * study is discoverable. Runs automatically after `npm run build`.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const load = (rel) => import(pathToFileURL(resolve(root, rel)).href);

const { site } = await load("src/data/site.js");
const { seedProjects } = await load("src/data/projects.js");

const base = (site.url || "").replace(/\/$/, "");

if (!base || base.includes("YOUR-DOMAIN")) {
  console.warn(
    "\n[sitemap] site.url is still a placeholder — set it in src/data/site.js " +
      "(and in index.html / public/robots.txt) before deploying.\n"
  );
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  ...seedProjects.map((p) => ({
    loc: `/projects/${p.slug}`,
    priority: "0.8",
    changefreq: "yearly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = resolve(root, "dist");
if (!existsSync(out)) mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "sitemap.xml"), xml, "utf8");
console.log(`[sitemap] ${urls.length} URLs written to dist/sitemap.xml`);
