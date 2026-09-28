import Section from "./Section.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { useProjects } from "../lib/hooks.js";
import { dataWork } from "../data/projects.js";
import { projectsNote } from "../data/site.js";

export default function Projects() {
  const projects = useProjects().filter((p) => p.featured);

  return (
    <Section
      id="projects"
      index="03"
      kicker="Projects"
      title="Systems I've built and shipped."
      sub="Each one demonstrates a specific engineering capability: agent orchestration, retrieval architecture, tool calling, automation. Open any card for the full case study."
      aside={<p className="section-note">{projectsNote}</p>}
    >
      {projects.length === 0 ? (
        <p className="empty">
          No projects are published yet. Add one from the admin page.
        </p>
      ) : (
        <div className="projects">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Data & ML — deliberately secondary to the AI engineering work. */}
      <div className="datawork" data-reveal>
        <div className="datawork__head">
          <h3 className="datawork__title">Data &amp; ML foundation</h3>
          <p>
            A statistics degree and years of modelling work underneath the AI
            engineering, kept here as supporting evidence rather than the
            headline.
          </p>
        </div>
        <ul className="datawork__list">
          {dataWork.map((d) => (
            <li key={d.title}>
              <span className="datawork__name">{d.title}</span>
              <span className="datawork__detail">{d.detail}</span>
              <span className="datawork__tech mono">{d.tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
