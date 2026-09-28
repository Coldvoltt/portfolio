import { site, hero, capabilityStrip } from "../data/site.js";
import Portrait from "./Portrait.jsx";
import { ArrowRight, ArrowUpRight, GitHub, Download } from "./Icons.jsx";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero__inner">
        {/* Headline runs the full measure; the columns start beneath it. */}
        <div className="hero__top">
          <p className="hero__eyebrow">
            <span className="hero__rule" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 className="hero__headline display">
            {hero.headline.map((line, i) => (
              <span className="hero__line" key={i} style={{ "--i": i }}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="hero__copy">
          <p className="hero__lede lede">{hero.lede}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              {hero.primaryCta.label}
              <ArrowRight />
            </a>
            <a href="#contact" className="btn btn--ghost">
              {hero.secondaryCta.label}
            </a>
            {site.links.github && (
              <a
                href={site.links.github}
                className="hero__sublink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
                GitHub
                <ArrowUpRight />
              </a>
            )}
            <a
              href={site.links.resume}
              className="hero__sublink"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download />
              Resume
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt className="mono">Experience</dt>
              <dd>{site.experienceYears} years</dd>
            </div>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt className="mono">Status</dt>
              <dd className="hero__status">
                <span className="dot" aria-hidden="true" />
                {site.availability}
              </dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <Portrait />
        </div>
      </div>

      {/* Trust / capability strip. The list is rendered twice so the marquee
          can loop seamlessly; the copy is hidden from assistive tech. */}
      <div className="strip">
        <div className="strip__viewport">
          <ul className="strip__track" aria-label="Core technologies">
            {capabilityStrip.map((item) => (
              <li className="strip__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <ul className="strip__track" aria-hidden="true">
            {capabilityStrip.map((item) => (
              <li className="strip__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
