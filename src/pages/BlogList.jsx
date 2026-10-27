import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import { blogs } from "../data/blogs.js";
import { site } from "../data/site.js";
import { useReveal, useDocumentMeta } from "../lib/hooks.js";
import { ArrowRight } from "../components/Icons.jsx";

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const root = useReveal([selectedCategory]);

  useDocumentMeta({
    title: `Articles & Research | ${site.name}, ${site.role}`,
    description:
      "Peer-reviewed academic research syntheses, mathematical formulations, and production engineering architectures by Paul Otulaja.",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") return blogs;
    return blogs.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main id="main" className="page blog-page" ref={root}>
      <header className="blog-page__header">
        <div className="wrap">
          <nav className="blog-page__crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Articles &amp; Research</span>
          </nav>

          <h1 className="blog-page__title">Technical Articles &amp; Research</h1>
          <p className="blog-page__lead lede">
            Rigorous explorations bridging peer-reviewed academic literature,
            mathematical economics, and low-latency production engineering.
          </p>

          <div className="blog-page__controls">
            <div
              className="blog-filters"
              role="tablist"
              aria-label="Filter articles by category"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`blog-filter-btn${isActive ? " is-active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span className="mono" style={{ color: "var(--text-3)", fontSize: "var(--step--2)" }}>
              Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            </span>
          </div>
        </div>
      </header>

      <div className="wrap" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
        {filteredBlogs.length === 0 ? (
          <p className="empty">No articles found in this category.</p>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                blog={blog}
                featured={blog.featured}
              />
            ))}
          </div>
        )}

        <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)", textAlign: "center" }}>
          <Link to="/#contact" className="btn btn--primary">
            Discuss a Research or Systems Engagement
            <ArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}
