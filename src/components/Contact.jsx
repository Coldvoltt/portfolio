import { site, contact } from "../data/site.js";
import { Mail, GitHub, LinkedIn, Download } from "./Icons.jsx";

export default function Contact() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(contact.subject)}`;
  // The GitHub section (07) only renders when a profile URL is configured,
  // so the contact section takes its number when it is absent.
  const index = site.links.github ? "08" : "07";

  return (
    <section id="contact" className="section contact">
      <div className="wrap contact__inner">
        <div className="contact__lead" data-reveal>
          <span className="section-index">{index} / Contact</span>
          <h2 className="contact__heading h2">{contact.heading}</h2>
          <p className="contact__body lede">{contact.body}</p>

          <div className="contact__actions">
            <a href={mailto} className="btn btn--accent">
              <Mail />
              Get in Touch
            </a>
            <a
              href={site.links.resume}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download />
              Download Resume
            </a>
          </div>
        </div>

        <ul className="contact__channels" data-reveal style={{ "--reveal-delay": "100ms" }}>
          <li>
            <a href={mailto}>
              <span className="mono">Email</span>
              <span className="contact__value">{site.email}</span>
              <Mail />
            </a>
          </li>
          {site.links.linkedin && (
            <li>
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="mono">LinkedIn</span>
                <span className="contact__value">
                  {site.links.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <LinkedIn />
              </a>
            </li>
          )}
          {site.links.github && (
            <li>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                <span className="mono">GitHub</span>
                <span className="contact__value">
                  {site.githubHandle
                    ? `@${site.githubHandle}`
                    : site.links.github.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <GitHub />
              </a>
            </li>
          )}
          <li>
            <span className="contact__static">
              <span className="mono">Location</span>
              <span className="contact__value">
                {site.location} · {site.timezone}
              </span>
            </span>
          </li>
          <li>
            <span className="contact__static contact__static--open">
              <span className="mono">Availability</span>
              <span className="contact__value">
                <span className="dot" aria-hidden="true" />
                {site.availability}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
