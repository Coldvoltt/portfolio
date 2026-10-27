import { Link } from "react-router-dom";
import Section from "./Section.jsx";
import BlogCard from "./BlogCard.jsx";
import { blogs } from "../data/blogs.js";
import { ArrowRight, BookOpen } from "./Icons.jsx";

export default function BlogSection() {
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <Section
      id="articles"
      index="04"
      kicker="Articles"
      title="In-depth machine learning & systems research."
      sub="Peer-reviewed scholarly literature syntheses, mathematical formulations, and high-throughput production engineering architectures."
      aside={
        <p className="section-note">
          Articles are written with academic citations and production code
          architectures based on real-world engineering constraints.
        </p>
      }
    >
      <div className="blog-grid">
        {displayedBlogs.map((blog) => (
          <BlogCard
            key={blog.slug}
            blog={blog}
            featured={blog.featured}
          />
        ))}
      </div>

      <div className="blog-section-cta" data-reveal>
        <Link to="/blog" className="btn btn--ghost">
          <BookOpen />
          View All Technical Articles ({blogs.length})
          <ArrowRight />
        </Link>
      </div>
    </Section>
  );
}
