import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/hooks.js";
import { ArrowRight } from "../components/Icons.jsx";

export default function NotFound() {
  useDocumentMeta({ title: "Page not found", noindex: true });

  return (
    <main id="main" className="page notfound">
      <div className="wrap notfound__inner">
        <p className="mono">404</p>
        <h1 className="notfound__title h2">This page doesn&rsquo;t exist.</h1>
        <p className="lede">
          The link may be out of date, or the project may have been renamed.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn--primary">
            Back to home <ArrowRight />
          </Link>
          <Link to="/#projects" className="btn btn--ghost">
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}
