import { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import FlowDiagram from "../components/FlowDiagram.jsx";
import { site } from "../data/site.js";
import { useProjects, useReveal, useDocumentMeta } from "../lib/hooks.js";
import { ArrowRight, ArrowUpRight, GitHub, Mail } from "../components/Icons.jsx";

const CASE_SECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
  { key: "implementation", label: "Implementation" },
  { key: "challenges", label: "Challenges" },
  { key: "result", label: "Result" },
  { key: "lessons", label: "Lessons" },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const projects = useProjects();
  const root = useReveal([slug]);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [projects, slug]
  );

  const siblings = useMemo(() => {
    const i = projects.findIndex((p) => p.slug === slug);
    if (i === -1) return { prev: null, next: null };
    return {
      prev: projects[i - 1] || null,
      next: projects[i + 1] || null,
    };
  }, [projects, slug]);

  useDocumentMeta({
    title: project
      ? `${project.name} | ${site.name}, ${site.role}`
      : `Project not found | ${site.name}`,
    description: project?.tagline || site.seo.description,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/404" replace />;

  const {
    name,
    tagline,
    capability,
    status,
    context,
    year,
    contribution,
    problem,
    solution,
    architecture,
    highlights,
    tech,
    challenges,
    result,
    lessons,
    links,
  } = project;

  const isLive = status === "Production";
  const available = CASE_SECTIONS.filter((s) => {
    if (s.key === "architecture") return architecture.length > 0;
    if (s.key === "implementation") return highlights.length > 0 || tech.length > 0;
    if (s.key === "challenges") return challenges.length > 0;
    if (s.key === "result") return result.length > 0;
    if (s.key === "lessons") return lessons.length > 0;
    return true;
  });

  return (
    <main id="main" className="page case" ref={root}>
      {/* ---- Header ---- */}
      <header className="case__header">
        <div className="wrap">
          <nav className="case__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{name}</span>
          </nav>

          <div className="case__meta">
            <span className={`badge${isLive ? " badge--live" : ""}`}>{status}</span>
            {capability && <span className="badge badge--accent">{capability}</span>}
            {context && <span className="badge">{context}</span>}
            {year && <span className="badge">{year}</span>}
          </div>

          <h1 className="case__title">{name}</h1>
          <p className="case__tagline lede">{tagline}</p>

          <div className="case__actions">
            {links.demo && (
              <a
                href={links.demo}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live site <ArrowUpRight />
              </a>
            )}
            {links.github && (
              <a
                href={links.github}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub /> View code
              </a>
            )}
            {links.docs && (
              <a
                href={links.docs}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation <ArrowUpRight />
              </a>
            )}
            {links.writeup && (
              <a
                href={links.writeup}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the write-up <ArrowUpRight />
              </a>
            )}
            {!links.demo && !links.github && !links.docs && !links.writeup && (
              <a href={`mailto:${site.email}`} className="btn btn--ghost">
                <Mail /> Ask about this project
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="wrap case__layout">
        {/* ---- In-page nav ---- */}
        <aside className="case__toc" aria-label="On this page">
          <p className="mono case__toc-label">Case study</p>
          <ol>
            {available.map((s, i) => (
              <li key={s.key}>
                <a href={`#${s.key}`}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* ---- Body ---- */}
        <div className="case__body">
          <section id="overview" className="case__section" data-reveal>
            <h2 className="case__h2">Overview</h2>

            {contribution && (
              <p className="case__contribution">
                <span className="mono">My contribution</span>
                {contribution}
              </p>
            )}

            <dl className="case__facts case__facts--lead">
              <div>
                <dt className="mono">Status</dt>
                <dd>{status}</dd>
              </div>
              {context && (
                <div>
                  <dt className="mono">Built at</dt>
                  <dd>{context}</dd>
                </div>
              )}
              {year && (
                <div>
                  <dt className="mono">Period</dt>
                  <dd>{year}</dd>
                </div>
              )}
              {capability && (
                <div>
                  <dt className="mono">Capability</dt>
                  <dd>{capability}</dd>
                </div>
              )}
            </dl>
          </section>

          <section id="problem" className="case__section" data-reveal>
            <h2 className="case__h2">Problem</h2>
            <p className="prose">{problem}</p>
          </section>

          <section id="solution" className="case__section" data-reveal>
            <h2 className="case__h2">Solution</h2>
            <p className="prose">{solution}</p>
          </section>

          {architecture.length > 0 && (
            <section id="architecture" className="case__section" data-reveal>
              <h2 className="case__h2">Architecture</h2>
              <p className="prose case__note">
                How a single request moves through the system.
              </p>
              <FlowDiagram stages={architecture} stacked />
            </section>
          )}

          {(highlights.length > 0 || tech.length > 0) && (
            <section id="implementation" className="case__section" data-reveal>
              <h2 className="case__h2">Technical implementation</h2>
              {highlights.length > 0 && (
                <ul className="case__list">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {tech.length > 0 && (
                <>
                  <p className="mono case__sublabel">Stack</p>
                  <ul className="tag-row">
                    {tech.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {challenges.length > 0 && (
            <section id="challenges" className="case__section" data-reveal>
              <h2 className="case__h2">Engineering challenges</h2>
              <ol className="case__challenges">
                {challenges.map((c, i) => (
                  <li key={c.title || i}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="case__h3">{c.title}</h3>
                      {c.body && <p>{c.body}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {result.length > 0 && (
            <section id="result" className="case__section" data-reveal>
              <h2 className="case__h2">Result</h2>
              <ul className="case__list case__list--result">
                {result.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {lessons.length > 0 && (
            <section id="lessons" className="case__section" data-reveal>
              <h2 className="case__h2">Lessons</h2>
              <ul className="case__list case__list--lessons">
                {lessons.map((l) => (
                  <li key={l} className="serif">
                    {l}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ---- Next / prev ---- */}
          <nav className="case__pager" aria-label="More projects">
            {siblings.prev ? (
              <Link to={`/projects/${siblings.prev.slug}`} className="case__pager-link">
                <span className="mono">Previous</span>
                <span>{siblings.prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {siblings.next ? (
              <Link
                to={`/projects/${siblings.next.slug}`}
                className="case__pager-link case__pager-link--next"
              >
                <span className="mono">Next</span>
                <span>
                  {siblings.next.name}
                  <ArrowRight />
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="case__cta">
            <p className="serif">Working on something similar?</p>
            <a href={`mailto:${site.email}`} className="btn btn--accent">
              <Mail /> Get in touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
