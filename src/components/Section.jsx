export default function Section({
  id,
  index,
  kicker,
  title,
  sub,
  children,
  className = "",
  aside = null,
}) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="section-index">
            {index}
            {kicker ? ` / ${kicker}` : ""}
          </span>
          <div>
            <h2 className="section-title">{title}</h2>
            {sub && <p className="section-sub">{sub}</p>}
            {aside}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
