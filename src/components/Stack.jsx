import { stack } from "../data/site.js";
import Section from "./Section.jsx";
import TechIcon from "./TechIcon.jsx";

export default function Stack() {
  return (
    <Section
      id="stack"
      index="04"
      kicker="Stack"
      title="Technologies I actually work with."
      sub="Organised by what they do, not by how impressive the list looks."
    >
      <div className="stack">
        {stack.map((group, i) => (
          <div
            className="stack__group"
            key={group.group}
            data-reveal
            style={{ "--reveal-delay": `${i * 50}ms` }}
          >
            <h3 className="stack__label mono">{group.group}</h3>
            <ul className="stack__items">
              {group.items.map((item) => (
                <li key={item.name} className="stack__item">
                  <TechIcon name={item.icon} className="stack__icon" />
                  <span>
                    {item.name}
                    {item.note && (
                      <span className="stack__note"> ({item.note})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
