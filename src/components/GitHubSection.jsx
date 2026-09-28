import { site, githubSection } from "../data/site.js";
import Section from "./Section.jsx";
import { useProjects } from "../lib/hooks.js";
import { GitHub, ArrowUpRight } from "./Icons.jsx";

/**
 * Renders only when site.links.github is set — an empty GitHub section reads
 * worse than no section at all. No repository statistics are shown unless a
 * real link exists; nothing here is fabricated.
 */
export default function GitHubSection() {
  const repos = useProjects().filter((p) => p.links.github);

  if (!site.links.github) return null;

  return (
    <Section
      id="github"
      index="07"
      kicker="GitHub"
      title={githubSection.heading}
      sub={githubSection.body}
      className="section--github"
    >
      <div className="gh" data-reveal>
        <a
          className="gh__profile"
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="gh__profile-icon">
            <GitHub />
          </span>
          <span className="gh__profile-text">
            <span className="gh__profile-label mono">GitHub profile</span>
            <span className="gh__profile-handle">
              {site.githubHandle ? `@${site.githubHandle}` : site.links.github.replace(/^https?:\/\//, "")}
            </span>
          </span>
          <ArrowUpRight />
        </a>

        {repos.length > 0 && (
          <ul className="gh__repos">
            {repos.map((p) => (
              <li key={p.slug}>
                <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                  <span className="gh__repo-name">{p.name}</span>
                  <span className="gh__repo-desc">{p.tagline}</span>
                  <span className="tag-row">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        )}

      </div>
    </Section>
  );
}
