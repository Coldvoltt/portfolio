import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import { GitHub, LinkedIn, Mail } from "./Icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__id">
          <p className="footer__name">{site.name}</p>
          <p className="footer__loc">
            {site.location} · {site.timezone}
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href={`mailto:${site.email}`}>
            <Mail /> Email
          </a>
          {site.links.github && (
            <a href={site.links.github} target="_blank" rel="noopener noreferrer">
              <GitHub /> GitHub
            </a>
          )}
          {site.links.linkedin && (
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedIn /> LinkedIn
            </a>
          )}
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>

        <div className="footer__meta">
          <p>
            © {year} {site.name}
          </p>
          <p className="footer__built">
            Built with React · <Link to="/admin">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
