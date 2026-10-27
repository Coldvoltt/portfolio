import { Link } from "react-router-dom";
import { ArrowRight } from "./Icons.jsx";

export default function BlogCard({ blog, featured = false }) {
  const {
    slug,
    title,
    subtitle,
    formattedDate,
    readTime,
    category,
    tags = [],
  } = blog;

  return (
    <article
      className={`blog-card${featured ? " blog-card--featured" : ""}`}
      data-reveal
    >
      <div className="blog-card__meta">
        <span className="blog-card__category">{category}</span>
        <span className="blog-card__dot" aria-hidden="true">
          •
        </span>
        <time dateTime={blog.date}>{formattedDate}</time>
        <span className="blog-card__dot" aria-hidden="true">
          •
        </span>
        <span>{readTime}</span>
      </div>

      <h3 className="blog-card__title">
        <Link to={`/blog/${slug}`}>{title}</Link>
      </h3>

      <p className="blog-card__tagline">{subtitle}</p>

      {tags.length > 0 && (
        <div className="blog-card__tags" aria-label="Topic tags">
          {tags.slice(0, 4).map((tag) => (
            <span key={tag} className="blog-card__tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="blog-card__foot">
        <Link
          to={`/blog/${slug}`}
          className="blog-card__link"
          aria-label={`Read paper: ${title}`}
        >
          Read Technical Deep-Dive
          <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
