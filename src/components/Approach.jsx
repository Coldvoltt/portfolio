import { approach } from "../data/site.js";
import Section from "./Section.jsx";

export default function Approach() {
  return (
    <Section
      id="approach"
      index="05"
      kicker="Approach"
      title={approach.heading}
      sub={approach.sub}
      className="section--approach"
    >
      <ol className="approach">
        {approach.steps.map((step, i) => (
          <li
            className="approach__step"
            key={step.n}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` }}
          >
            <span className="approach__n mono">{step.n}</span>
            <h3 className="approach__title">{step.title}</h3>
            <p className="approach__body">{step.body}</p>
            <span className="approach__rule" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </Section>
  );
}
