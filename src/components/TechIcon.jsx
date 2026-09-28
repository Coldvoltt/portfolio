import { BRAND_PATHS } from "../data/brandPaths.js";
import { CUSTOM_ICONS } from "../data/customIcons.js";

/* Renders a technology mark by key. Brand marks come from brandPaths.js,
   everything else from customIcons.js. Always decorative — the technology's
   name is always rendered as text beside it. */
export default function TechIcon({ name, className = "" }) {
  const brand = BRAND_PATHS[name];
  const shapes = brand ? [brand] : CUSTOM_ICONS[name];

  if (!shapes) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`tech-icon ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map((shape, i) => {
        const d = typeof shape === "string" ? shape : shape.d;
        const rule = typeof shape === "string" ? undefined : shape.rule;
        return <path key={i} d={d} fillRule={rule} clipRule={rule} />;
      })}
    </svg>
  );
}
