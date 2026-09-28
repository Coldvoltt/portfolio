import { capabilities } from "../data/site.js";
import Section from "./Section.jsx";
import { ArrowRight } from "./Icons.jsx";

export default function Capabilities() {
  return (
    <Section
      id="capabilities"
      index="02"
      kicker="Capabilities"
      title="What I can build for you."
      sub="Five areas that cover an AI system end to end: the model, the service around it, the automation that triggers it, and the infrastructure it runs on."
    >
      <ul className="caps">
        {capabilities.map((cap, i) => (
          <li
            className="cap"
            key={cap.id}
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` }}
          >
            <div className="cap__head">
              <span className="cap__n mono">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="cap__title h3">{cap.title}</h3>
            </div>
            <p className="cap__summary">{cap.summary}</p>
            <ul className="cap__items">
              {cap.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}

        {/* Fills the sixth grid cell and gives the section somewhere to go. */}
        <li
          className="cap cap--cta"
          data-reveal
          style={{ "--reveal-delay": `${capabilities.length * 70}ms` }}
        >
          <p>Most projects need three or four of these at once.</p>
          <span>
            That combination of the model, the service, the automation and
            the deployment is the work I do.
          </span>
          <a href="#contact" className="btn btn--ghost btn--sm">
            Let&rsquo;s Work Together
            <ArrowRight />
          </a>
        </li>
      </ul>
    </Section>
  );
}
