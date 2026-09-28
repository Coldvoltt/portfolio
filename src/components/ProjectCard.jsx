import { Link } from "react-router-dom";
import FlowDiagram from "./FlowDiagram.jsx";
import { ArrowRight, ArrowUpRight, GitHub } from "./Icons.jsx";

/* ==========================================================================
   Project tile.

   Deliberately a tile, not a dossier. Problem, solution, highlights,
   challenges and lessons all live on the case-study page; the homepage answers
   "what is it, what did I build it with, what shape is it" and gets you to the
   case study. Six of these in two columns read in a glance; six full dossiers
   were 41% of the page.

   The title's link stretches over the whole card via ::after, so the tile is
   one click target with one accessible name. External links sit above it.
   ========================================================================== */

export default function ProjectCard({ project, index, reveal = true }) {
  const {
    slug,
    name,
    tagline,
    capability,
    status,
    context,
    year,
    contribution,
    architecture,
    tech,
    links,
  } = project;

  const isLive = status === "Production";
  const external = [
    links.github && { href: links.github, label: "Code", icon: <GitHub /> },
    links.demo && { href: links.demo, label: "Live site" },
    links.docs && { href: links.docs, label: "Docs" },
    links.writeup && { href: links.writeup, label: "Write-up" },
  ].filter(Boolean);

  return (
    <article
      className="pcard"
      data-reveal={reveal ? "" : undefined}
      style={{ "--reveal-delay": `${(index % 2) * 90}ms` }}
    >
      <header className="pcard__head">
        <p className="pcard__kicker">
          <span className="pcard__n mono">{String(index + 1).padStart(2, "0")}</span>
          <span className={`badge${isLive ? " badge--live" : ""}`}>{status}</span>
          {capability && <span className="badge badge--accent">{capability}</span>}
        </p>

        <h3 className="pcard__title">
          <Link to={`/projects/${slug}`}>{name}</Link>
        </h3>

        <p className="pcard__tagline">{tagline}</p>
      </header>

      <div className="pcard__body">
        {contribution && (
          <p className="pcard__contribution">
            <span className="mono">My part</span>
            {contribution}
          </p>
        )}

        {architecture.length > 0 && (
          <FlowDiagram stages={architecture} label="Architecture" inline />
        )}
      </div>

      <footer className="pcard__foot">
        <p className="pcard__context mono">
          {[context, year].filter(Boolean).join(" · ")}
        </p>

        {tech.length > 0 && (
          <ul className="tag-row pcard__tech">
            {tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="pcard__links">
          {external.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="pcard__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.icon}
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
          <span className="pcard__cta" aria-hidden="true">
            Case study <ArrowRight />
          </span>
        </div>
      </footer>
    </article>
  );
}
