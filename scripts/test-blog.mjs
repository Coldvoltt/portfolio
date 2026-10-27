/* Automated validation test suite for Blog data, citations, and structure */
import assert from "node:assert/strict";
import { pathToFileURL, fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const { blogs } = await import(
  pathToFileURL(resolve(ROOT, "src/data/blogs.js")).href
);

let pass = 0;
const ok = (name) => {
  pass++;
  console.log(`  ok  ${name}`);
};

// 1. Articles exist and count
assert.ok(Array.isArray(blogs), "blogs must be an array");
assert.ok(blogs.length >= 3, `expected at least 3 articles, got ${blogs.length}`);
ok(`found ${blogs.length} articles`);

// 2. Unique slugs and required fields
const slugs = new Set();
for (const b of blogs) {
  assert.ok(b.slug, "article must have a slug");
  assert.ok(!slugs.has(b.slug), `duplicate slug: ${b.slug}`);
  slugs.add(b.slug);

  assert.ok(b.title && b.title.length > 5, `invalid title in ${b.slug}`);
  assert.ok(b.subtitle && b.subtitle.length > 10, `invalid subtitle in ${b.slug}`);
  assert.ok(b.date, `missing date in ${b.slug}`);
  assert.ok(b.readTime, `missing readTime in ${b.slug}`);
  assert.ok(b.category, `missing category in ${b.slug}`);
  assert.ok(b.author && b.author.name, `missing author in ${b.slug}`);
  assert.ok(b.scholarlyAbstract, `missing scholarlyAbstract in ${b.slug}`);
  assert.ok(Array.isArray(b.keyTakeaways) && b.keyTakeaways.length > 0, `missing key takeaways in ${b.slug}`);
  assert.ok(Array.isArray(b.sections) && b.sections.length > 0, `missing sections in ${b.slug}`);
}
ok("all articles contain required metadata, abstracts, and sections");

// 3. Fraud Detection Modeling deep check
const fraudBlog = blogs.find((b) => b.slug === "fraud-detection-modeling");
assert.ok(fraudBlog, "fraud-detection-modeling article must exist");
assert.ok(fraudBlog.title.includes("Fraud Detection"));
assert.ok(fraudBlog.sections.length >= 5, `fraud detection should have extensive sections, got ${fraudBlog.sections.length}`);
assert.ok(fraudBlog.citations.length >= 5, `fraud detection should cite multiple papers, got ${fraudBlog.citations.length}`);

// Verify seminal researchers are cited
const citationAuthors = fraudBlog.citations.map((c) => c.authors.toLowerCase()).join(" ");
assert.ok(citationAuthors.includes("dal pozzolo"), "Dal Pozzolo must be cited");
assert.ok(citationAuthors.includes("bahnsen"), "Bahnsen must be cited");
assert.ok(citationAuthors.includes("dou"), "Dou (CARE-GNN) must be cited");
assert.ok(citationAuthors.includes("wang"), "Wang (PC-GNN) must be cited");
assert.ok(citationAuthors.includes("lundberg"), "Lundberg (TreeSHAP) must be cited");
ok("fraud detection article cites Dal Pozzolo, Bahnsen, Dou, Wang, and Lundberg");

// 4. Citation structure validation
for (const c of fraudBlog.citations) {
  assert.ok(c.id, "citation must have an id");
  assert.ok(c.citationKey, "citation must have a citationKey");
  assert.ok(c.authors, "citation must have authors");
  assert.ok(c.year, "citation must have a year");
  assert.ok(c.title, "citation must have a title");
  assert.ok(c.venue, "citation must have a venue");
  assert.ok(c.url.startsWith("http"), `citation url must be http(s): ${c.url}`);
  assert.ok(c.annotation, "citation must have an annotation explaining significance");
}
ok("citations contain complete bibliographic details, venues, and annotations");

console.log(`\nAll ${pass} blog validation checks passed!`);
