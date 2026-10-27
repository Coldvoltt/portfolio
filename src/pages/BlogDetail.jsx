import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { useReveal, useDocumentMeta } from "../lib/hooks.js";
import { ArrowRight, ArrowUpRight, Copy, Check, Mail, GitHub } from "../components/Icons.jsx";

export default function BlogDetail() {
  const { slug } = useParams();
  const root = useReveal([slug]);
  const [copiedCode, setCopiedCode] = useState(null);

  const blog = useMemo(() => blogs.find((b) => b.slug === slug), [slug]);

  const siblings = useMemo(() => {
    const i = blogs.findIndex((b) => b.slug === slug);
    if (i === -1) return { prev: null, next: null };
    return {
      prev: blogs[i - 1] || null,
      next: blogs[i + 1] || null,
    };
  }, [slug]);

  useDocumentMeta({
    title: blog
      ? `${blog.title} | ${site.name}`
      : `Article Not Found | ${site.name}`,
    description: blog?.subtitle || site.seo.description,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) return <Navigate to="/404" replace />;

  const {
    title,
    subtitle,
    category,
    formattedDate,
    date,
    readTime,
    author,
    scholarlyAbstract,
    keyTakeaways = [],
    sections = [],
    citations = [],
  } = blog;

  const handleCopy = (codeText, id) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main id="main" className="page article-page" ref={root}>
      {/* ---- Header ---- */}
      <header className="article-header">
        <div className="wrap">
          <nav className="article-header__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">Articles</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{category}</span>
          </nav>

          <div className="article-header__meta">
            <span className="badge badge--accent">{category}</span>
            <time dateTime={date}>{formattedDate}</time>
            <span aria-hidden="true">•</span>
            <span>{readTime}</span>
          </div>

          <h1 className="article-header__title">{title}</h1>
          <p className="article-header__subtitle">{subtitle}</p>

          <div className="article-author-strip">
            <img
              src={author.avatar}
              alt={author.name}
              className="article-author-strip__avatar"
              width="44"
              height="44"
            />
            <div className="article-author-strip__info">
              <span className="article-author-strip__name">{author.name}</span>
              <span className="article-author-strip__role">
                {author.role} · {author.handle}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Main Layout: TOC + Body ---- */}
      <div className="wrap article-layout">
        {/* Sticky Table of Contents */}
        <aside className="article-toc" aria-label="Table of contents">
          <div className="article-toc__heading">Contents</div>
          <ol>
            {scholarlyAbstract && (
              <li>
                <a href="#abstract">Abstract</a>
              </li>
            )}
            {keyTakeaways.length > 0 && (
              <li>
                <a href="#takeaways">Key Takeaways</a>
              </li>
            )}
            {sections.map((sec, i) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`}>
                  <span className="mono" style={{ marginRight: "0.4rem", opacity: 0.65 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {sec.title.replace(/^\d+\.\s*/, "")}
                </a>
              </li>
            ))}
            {citations.length > 0 && (
              <li>
                <a href="#references">
                  <span className="mono" style={{ marginRight: "0.4rem", opacity: 0.65 }}>
                    Ref
                  </span>
                  Literature &amp; Citations
                </a>
              </li>
            )}
          </ol>
        </aside>

        {/* Article Body */}
        <div className="article-body">
          {/* Abstract Box */}
          {scholarlyAbstract && (
            <div id="abstract" className="article-abstract" data-reveal>
              <div className="article-abstract__label">Scientific Abstract</div>
              <p className="article-abstract__text">{scholarlyAbstract}</p>
            </div>
          )}

          {/* Key Takeaways Box */}
          {keyTakeaways.length > 0 && (
            <div id="takeaways" className="article-takeaways" data-reveal>
              <div className="article-takeaways__label">
                <span>Executive Synthesis &amp; Takeaways</span>
              </div>
              <ul className="article-takeaways__list">
                {keyTakeaways.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sections */}
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="article-section"
              data-reveal
            >
              {sec.kicker && (
                <span className="article-section__kicker">{sec.kicker}</span>
              )}
              <h2 className="article-section__title">{sec.title}</h2>

              {/* Leading Paragraphs */}
              {sec.paragraphs && sec.paragraphs.length > 0 && (
                <div className="article-prose">
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="article-bullets">
                  {sec.bullets.map((b, idx) => {
                    const parts = b.split(":");
                    return (
                      <li key={idx}>
                        {parts.length > 1 ? (
                          <>
                            <strong>{parts[0]}:</strong>
                            {parts.slice(1).join(":")}
                          </>
                        ) : (
                          b
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Math Formula Callout */}
              {sec.mathNote && (
                <div className="article-math">
                  <div className="article-math__title">{sec.mathNote.title}</div>
                  <pre className="article-math__formula">{sec.mathNote.formula}</pre>
                  {sec.mathNote.explanation && (
                    <p className="article-math__explanation">
                      {sec.mathNote.explanation}
                    </p>
                  )}
                </div>
              )}

              {/* Trailing Paragraphs */}
              {sec.paragraphsAfter && sec.paragraphsAfter.length > 0 && (
                <div className="article-prose" style={{ marginTop: "1rem" }}>
                  {sec.paragraphsAfter.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Code Snippet */}
              {sec.codeSnippet && (
                <div className="article-code">
                  <div className="article-code__head">
                    <span className="article-code__title">
                      {sec.codeSnippet.title || "Implementation"}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span className="article-code__lang">
                        {sec.codeSnippet.language}
                      </span>
                      <button
                        type="button"
                        className="btn btn--sm btn--ghost"
                        style={{ padding: "0.2rem 0.5rem", height: "auto" }}
                        onClick={() =>
                          handleCopy(sec.codeSnippet.code, sec.id)
                        }
                        aria-label="Copy code snippet"
                      >
                        {copiedCode === sec.id ? <Check /> : <Copy />}
                        <span>{copiedCode === sec.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                  <pre>
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Callout */}
              {sec.callout && (
                <div className="article-callout">
                  <div className="article-callout__title">
                    {sec.callout.title}
                  </div>
                  <p className="article-callout__body">{sec.callout.body}</p>
                </div>
              )}

              {/* Comparison Table */}
              {sec.table && (
                <div className="article-table-wrap">
                  <table className="article-table">
                    <thead>
                      <tr>
                        {sec.table.headers.map((h, idx) => (
                          <th key={idx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* ---- Scholarly References & Citations ---- */}
          {citations.length > 0 && (
            <section id="references" className="article-citations" data-reveal>
              <h2 className="article-citations__heading">
                Scholarly Literature &amp; References
              </h2>
              <p className="article-citations__sub">
                Foundational academic papers and peer-reviewed conference
                publications cited across this research article.
              </p>

              <ol className="citations-list">
                {citations.map((c) => (
                  <li key={c.id} className="citation-card">
                    <div className="citation-card__top">
                      <span className="citation-card__key">{c.citationKey}</span>
                      <span className="citation-card__year">({c.year})</span>
                    </div>

                    <div className="citation-card__title">
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open peer-reviewed publication or preprint"
                        >
                          {c.title} <ArrowUpRight />
                        </a>
                      ) : (
                        c.title
                      )}
                    </div>

                    <div className="citation-card__authors">{c.authors}</div>
                    <div className="citation-card__venue">{c.venue}</div>

                    {c.annotation && (
                      <div className="citation-card__annotation">
                        <strong>Significance: </strong>
                        {c.annotation}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Author CTA Card */}
          <div className="card" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }} data-reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", alignItems: "center" }}>
              <img
                src={author.avatar}
                alt={author.name}
                width="64"
                height="64"
                style={{ borderRadius: "50%", border: "2px solid var(--accent)" }}
              />
              <div style={{ flex: 1, minWidth: "240px" }}>
                <h3 style={{ fontSize: "var(--step-0)", fontWeight: "600" }}>
                  Engineering Production AI &amp; Risk Systems?
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "var(--step--1)", marginTop: "0.25rem" }}>
                  I build, deploy, and scale machine learning and agentic AI systems
                  for global organizations and startups.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <a href={`mailto:${site.email}`} className="btn btn--primary btn--sm">
                  <Mail /> Contact Paul
                </a>
                <a
                  href={site.links.github}
                  className="btn btn--ghost btn--sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Article Pager */}
          <div className="article-pager">
            {siblings.prev ? (
              <Link
                to={`/blog/${siblings.prev.slug}`}
                className="article-pager-card"
              >
                <span className="article-pager-card__label">← Previous Article</span>
                <span className="article-pager-card__title">
                  {siblings.prev.title}
                </span>
              </Link>
            ) : <div />}

            {siblings.next && (
              <Link
                to={`/blog/${siblings.next.slug}`}
                className="article-pager-card article-pager-card--next"
              >
                <span className="article-pager-card__label">Next Article →</span>
                <span className="article-pager-card__title">
                  {siblings.next.title}
                </span>
              </Link>
            )}
          </div>

          {/* Return link */}
          <Link to="/blog" className="article-back-link">
            ← Return to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
