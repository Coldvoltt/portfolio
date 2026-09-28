import { experience, education, site } from "../data/site.js";
import Section from "./Section.jsx";
import { Download } from "./Icons.jsx";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="06"
      kicker="Experience"
      title="What I've built, where."
      sub={`${site.experienceYears} years across AI engineering, backend development, and data work.`}
    >
      <ol className="exp">
        {experience.map((job, i) => (
          <li className="exp__item" key={`${job.company}-${job.start}`} data-reveal>
            <div className="exp__period">
              <span className="mono">
                {job.start} to {job.end}
              </span>
              {job.current && <span className="badge badge--live">Current</span>}
            </div>

            <div className="exp__main">
              <h3 className="exp__role">
                {job.role}
                <span className="exp__at"> · </span>
                <span className="exp__company">{job.company}</span>
                <span className="exp__mode mono">{job.mode}</span>
              </h3>

              <p className="exp__summary">{job.summary}</p>

              <ul className="exp__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <ul className="tag-row exp__tech">
                {job.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="exp__foot" data-reveal>
        <div className="exp__edu">
          <span className="mono">Education</span>
          <p>
            <strong>{education.degree}</strong>
            <br />
            {education.school}
            <br />
            <span className="exp__edu-period">{education.period}</span>
          </p>
        </div>
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
    </Section>
  );
}
