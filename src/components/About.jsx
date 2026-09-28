import { about } from "../data/site.js";
import Section from "./Section.jsx";

export default function About() {
  return (
    <Section id="about" index="01" kicker="About" title={about.heading}>
      <div className="about">
        <div className="about__copy prose" data-reveal>
          {about.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <dl className="about__facts" data-reveal style={{ "--reveal-delay": "120ms" }}>
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt className="mono">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
