/* ==========================================================================
   Architecture flow, rendered straight from a project's `architecture` array,
   so any project added in /admin gets a real diagram too.

   Two densities:
     axis   (default) a hairline with a node per stage. Used on case studies.
     inline (`inline`) a single wrapped run of stages. Used on project tiles,
            where a full axis would either squash or run off the card.

   Either way it is a real ordered list, so assistive tech reads the stages in
   order. Horizontal when there is room, vertical when there is not.
   ========================================================================== */

export default function FlowDiagram({
  stages = [],
  compact = false,
  stacked = false,
  inline = false,
  label,
}) {
  if (!stages.length) return null;

  const cls = [
    "flow",
    compact && "flow--compact",
    stacked && "flow--stacked",
    inline && "flow--inline",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={cls}>
      {label && <figcaption className="flow__cap mono">{label}</figcaption>}

      {inline ? (
        <ol className="flow__run">
          {stages.map((stage, i) => (
            <li key={`${stage}-${i}`}>{stage}</li>
          ))}
        </ol>
      ) : (
        <ol className="flow__axis" style={{ "--stages": stages.length }}>
          {stages.map((stage, i) => (
            <li className="flow__stage" key={`${stage}-${i}`}>
              <span className="flow__marker" aria-hidden="true" />
              <span className="flow__n mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flow__label">{stage}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  );
}
