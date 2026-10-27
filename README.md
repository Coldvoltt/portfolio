# Paul Otulaja — AI Engineer Portfolio

A dark-editorial portfolio built to `specifications.md`. React + Vite, three
runtime dependencies, no CSS framework, no animation library.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/ (also writes dist/sitemap.xml)
npm run preview  # serve the production build
npm test         # exercises the project store (18 checks)
```

---

## Before you deploy — 3 things to fill in

Everything else is done. These are the only values that were not in the
resume, so they were left as explicit placeholders rather than invented.

| What | Where |
|---|---|
| GitHub profile URL | `src/data/site.js` → `links.github` (and `githubHandle`) |
| LinkedIn profile URL | `src/data/site.js` → `links.linkedin` |
| Your live domain | `src/data/site.js` → `url`, then find/replace `YOUR-DOMAIN.com` in `index.html` and `public/robots.txt` |

Empty link values are simply **not rendered** — no dead icons, no broken
links. The whole GitHub section stays hidden until `links.github` is set, and
the Contact section renumbers itself (`07`) to keep the section sequence
correct in the meantime.

---

## Where the content lives

| File | Holds |
|---|---|
| `src/data/site.js` | Identity, links, nav, hero copy, about, capabilities, tech stack, engineering approach, experience, education, contact copy |
| `src/data/projects.js` | The six featured projects (full case studies) and the secondary Data & ML list |
| `public/Paul-Otulaja-AI-Engineer-Resume.pdf` | The resume served by every "Download Resume" button |
| `public/paul-otulaja*.{jpg,webp}` | Headshot — square (the hero frame is a circle), 1x and 2x, WebP with a JPEG fallback. Derived from `Paul.jpeg` in the repo root; re-crop from that master if you swap the photo |
| `src/data/brandPaths.js` | Technology brand marks, inlined (see **Skills icons**) |
| `src/data/customIcons.js` | Hand-drawn glyphs for the techniques that have no logo |

**No em-dashes in site copy.** Every user-visible string avoids `—`; colons,
full stops, parentheses and "to" do the work instead. Keep that convention
when you edit copy or add projects, including through `/admin`. (Code comments
and this README still use them.)

**Nothing in either file is invented.** Every employer, project, technology and
number traces to the resume. Where the resume states a *design target* rather
than a measured outcome (Dara's "80% screening reduction / 500+ interviews
monthly"), the site labels it as a design target. The one hard metric on the
site — 97% inference accuracy — is stated as achieved on the resume.

n8n is listed under Automation because your spec says you use it; the
automation *project* shown is the OpenClaw pipeline, which the resume backs.

### ScanLedger

Not on the resume, so its card was written from what you confirmed plus what
its own public docs at `scanledgerr.com/docs/ai-chat` state: an AI-powered
business data platform covering documents, inventory, sales and finances, with
an AI chat that answers plain-English questions over a dataset by grounding
them in the dataset's schema, precomputed statistics and sample records. Your
two parts are scoped explicitly in the `contribution` field rather than
implying you built all of it.

Two things are still generic because you have not said:

| Field | What to add |
|---|---|
| `tech` | The actual OCR engine (Tesseract, Google Vision, Azure DI, a vision model…) and the actual database, in place of the generic `"OCR"` and `"Analytics"` |
| `year` | `2025` was inferred, so correct it if wrong |

---

## The `/admin` route

`/admin` adds, edits, reorders-by-deletion, and exports projects. Every field
of the case-study format is editable, with a live preview of the card as it
will appear.

### How persistence works

This is a static site, so there is no server to write to. Edits are saved to
**`localStorage` in your browser** and the site renders them immediately — you
can add a project and see it live on `/` in the same session. To publish it to
everyone:

```
/admin → Download projects.js   (or "Copy JSON")
      → replace src/data/projects.js
      → commit + redeploy
```

The "Import JSON" button reads a previously exported file back in, so you can
move your working set between machines.

### What the buttons do

| Action | Effect |
|---|---|
| **New project** | Blank case-study form; the slug auto-derives from the name until you edit it by hand |
| **My contribution** | Optional field — use it when you built *part* of a larger system, so the card scopes the claim honestly |
| **Links** | Four kinds: **GitHub** (code), **Live site** (the running product), **Docs**, and **Write-up** (an article about it). Each renders its own labelled link; a project with none falls back to "Ask about this project" |
| **Edit** (pencil) | Edits a repo project *or* a local one. Editing a repo project overrides it in place — it never duplicates |
| **Remove** (trash) | Deletes a local project. For a repo project it *hides* it instead, and lists it under "Hidden from the repo list" so you can restore it |
| **Download projects.js** | A ready-to-commit `src/data/projects.js` |
| **Copy JSON / Show JSON** | The same data as a plain array |
| **Import JSON** | Replaces the whole local set with the file's contents |
| **Reset to repo version** | Drops every local edit; the site returns to exactly what is committed |

### Locking it

`/admin` is `noindex`, `Disallow`ed in `robots.txt`, and gets an
`X-Robots-Tag` header via `vercel.json`. For a soft lock, copy `.env.example`
to `.env` and set:

```
VITE_ADMIN_PASSCODE=something
```

**This is a convenience gate, not security.** Anything shipped to a browser is
readable in it. Since the data is per-browser and the site has no backend,
there is nothing to steal — but do not treat the passcode as protection. The
page tells you this when no passcode is set.

---

## Architecture

```
index.html                 SEO, Open Graph, JSON-LD Person schema, font preconnect
src/
  main.jsx                 Entry; mounts the router
  App.jsx                  Routes. ProjectDetail + Admin are lazy-loaded, so a
                           recruiter landing on / never downloads them
  data/site.js             All site copy and identity
  data/projects.js         Seed project data
  lib/projectStore.js      Seeds + localStorage resolution, validation, export
  lib/hooks.js             useProjects, useReveal, useActiveSection,
                           useScrollLock, useDocumentMeta
  components/              Section components + Icons, TechIcon, Portrait,
                           SystemBand, FlowDiagram
  pages/                   Home, ProjectDetail (case study), Admin, NotFound
  styles/tokens.css        The design system: colour, type scale, spacing, motion
  styles/global.css        Reset, typography primitives, buttons, layout
  styles/components.css    Section styles
  styles/admin.css         Admin styles
scripts/generate-sitemap.mjs   Runs after build
scripts/gen-brand-icons.mjs    Regenerates src/data/brandPaths.js
scripts/test-store.mjs         npm test
```

### Themes

Dark is the default and the design's home; light is a warm-paper counterpart,
not an inversion. The system preference is **deliberately not consulted**, so a
visitor on a light OS still lands on the intended design. The toggle in the nav
persists the choice, and an inline script in `index.html` applies it before
first paint so there is never a flash of the wrong theme.

The switch is total because **no component sheet hardcodes a colour** — every
one is a token in `tokens.css`, including scrims, rings, shadows and the page
wash. Both palettes clear WCAG AA 4.5:1 for every text token on every surface
token, verified numerically and again against computed styles in the browser.

To add a colour, add a token to both blocks. Never inline one.

### Design system

Warm near-black canvas (`#0c0b0a`), warm off-white type (`#edeae3`), hairline
rules, and a **single** restrained accent (`#d9a441`). Inter for UI, JetBrains
Mono for technical labels, Instrument Serif for the two editorial moments (a
case study's opening line and its Lessons pull-quotes), and Caveat for the
signature logo in the nav and footer. Editorial character
comes from the layout — numbered sections, hairlines, asymmetric grids,
generous vertical rhythm — not from decoration.

The type scale is built on a **17px base**, and labels/meta sit at 13px rather
than the 11px that default scales tend to produce on dark grounds.

There are deliberately **no pills, chips, or outlined tags** anywhere on the
site. Status, capability, and technology lists are typographic runs — mono,
separated by middots — because boxed chips read as template furniture. The
only enclosing shapes on the page are the project cards themselves.

Every foreground/background pair in the palette clears **WCAG AA 4.5:1** on
all four surface tokens, verified numerically rather than by eye.

### Diagrams

No robots, brains, or circuit boards — and no SVG text. Every diagram is built
from HTML so its labels are real text at real CSS sizes, legible at any
viewport instead of scaling down into noise.

One shared visual language: a hairline axis with a node per stage. The hero's
system band (`SystemBand.jsx`) uses it to walk a request from ingress to
delivery; project architecture diagrams (`FlowDiagram.jsx`) use it for each
project's own pipeline. Both run horizontally when there is room and flip to a
vertical axis when there is not.

Project diagrams render straight from each project's `architecture` array, so
**a project you add in `/admin` gets a real diagram too** — just put one
pipeline stage per line.

### Why most projects have no repo link

The work is client software and commercial products in production, so the
source cannot be published. That is stated outright in two places rather than
left for a recruiter to infer as "no code exists": a note under the Projects
heading (`projectsNote` in `site.js`) and the GitHub section's own copy. Both
point at what *is* available instead — live systems, docs, write-ups, and the
case studies, which carry the architecture and the engineering decisions in
full.

If a project ever does get a public repo, add its URL in `/admin` and it will
appear both on the tile and in the GitHub section's repo list automatically.

### Why the project tiles are short

Spec §14 asks each project card to carry problem, solution, highlights and
architecture. Built that way, the projects section was **41% of the page
height and 1392 of its ~2650 words**: six near-identical dossiers stacked
vertically.

The homepage now shows tiles in two columns (name, capability, tagline, the
pipeline as an inline run, stack, links) and every dossier field lives on the
case-study page, which already had all of it in full. Projects went to 2362px
and 506 words, and the whole page from ~14,000px to ~10,500px. If you want
problem/solution back on the cards, they are still in `projects.js` and only
`ProjectCard.jsx` needs changing.

### The About panel

The nine-layer "system around the model" argument lives in
`SystemLayers.jsx`. It was a nine-row numbered table with right-aligned notes,
which read as data when the point is rhetorical. It is now grouped — three
above the model, the model, five beneath it — with the model's rail and type
in accent, so the claim ("one of these nine is the model") is visible before
you read a word. Same nine layers, same notes.

### Skills icons

Each technology carries a monochrome mark rendered in `currentColor`, so the
icons sit inside the palette instead of dragging a wall of brand colour into
it.

Brand marks come from [Simple Icons](https://simpleicons.org) (CC0), but the
package is **not** a dependency — `scripts/gen-brand-icons.mjs` extracts only
the ~23 paths this site uses into `src/data/brandPaths.js`. To add one:

```
npm i -D simple-icons
# add the key -> slug pair in scripts/gen-brand-icons.mjs
node scripts/gen-brand-icons.mjs
npm uninstall simple-icons
```

Techniques have no logo — RAG, tool calling, OCR, webhooks, CI/CD, REST — and
neither do AWS, Oracle Cloud, OpenAI, Groq or Whisper. Those are hand-drawn in
`src/data/customIcons.js` on the same 24x24 grid and at the same optical
weight, so the row reads as one set. A couple of brand marks were swapped for
glyphs on purpose: MySQL's mark is a wordmark and turns to mush at 19px.

Logos remain their owners' trademarks and are used nominatively, to label
technologies actually used.

---

## Performance

Initial load is ~256 KB of JS (≈89 KB gzipped) and 45 KB of CSS (≈9 KB
gzipped) — React, the router, the homepage, and the icon paths. The headshot
is served as WebP (28 KB at 1x, 82 KB at 2x) with a JPEG fallback and explicit
`width`/`height`, so it costs no layout shift. The case study and admin
pages are separate chunks. No framework CSS, no icon package, no animation
library; reveals use one `IntersectionObserver`, and all motion is disabled
under `prefers-reduced-motion`.

## Accessibility

Semantic landmarks, a skip link, one `h1` per page with no heading-level
jumps, visible focus rings, labelled controls, decorative SVGs hidden from
assistive tech, and tap targets ≥24px. Verified across 1440/1024/768/390 on
`/`, a case study, `/admin`, and the 404 — no horizontal overflow and no
console errors at any of them.

## Deploy

Static output in `dist/`. `vercel.json` (SPA rewrites, asset caching, admin
`noindex`) and `public/_redirects` (Netlify) are both included, so Vercel,
Netlify, Cloudflare Pages, or any static host will work. **Any host needs an
SPA fallback** — every unknown path must serve `index.html`, or
`/projects/<slug>` will 404 on a hard refresh.
