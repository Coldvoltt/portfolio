/* Inline icons — 16px grid, currentColor, no icon library dependency. */

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);

export const ArrowDown = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);

export const Mail = (p) => (
  <svg {...base} className="ico" {...p}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="m2.5 5 5.5 4 5.5-4" />
  </svg>
);

export const Download = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M8 2v8M4.5 7 8 10.5 11.5 7M2.5 13h11" />
  </svg>
);

export const GitHub = (p) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className="ico"
    {...p}
  >
    <path d="M8 .2a8 8 0 0 0-2.53 15.6c.4.07.55-.18.55-.39l-.01-1.37c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.08-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.14.46.55.38A8 8 0 0 0 8 .2Z" />
  </svg>
);

export const LinkedIn = (p) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className="ico"
    {...p}
  >
    <path d="M3.4 5.2H.9V15h2.5V5.2ZM2.15 1a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9ZM15.1 9.4c0-2.6-1.4-3.8-3.26-3.8-1.5 0-2.18.83-2.55 1.4V5.2H6.8V15h2.5V9.6c0-1.12.21-2.2 1.6-2.2 1.37 0 1.7 1.28 1.7 2.28V15h2.5V9.4Z" />
  </svg>
);

export const Menu = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </svg>
);

export const Close = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const Plus = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const Trash = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9.5h6.8L12 4" />
  </svg>
);

export const Pencil = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M11.5 2.5 13.5 4.5 5.5 12.5 2.5 13.5 3.5 10.5z" />
  </svg>
);

export const Copy = (p) => (
  <svg {...base} className="ico" {...p}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.3" />
    <path d="M10.5 3.5v-.3a1.2 1.2 0 0 0-1.2-1.2H3.7a1.2 1.2 0 0 0-1.2 1.2v5.6a1.2 1.2 0 0 0 1.2 1.2H4" />
  </svg>
);

export const Check = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="m3 8.5 3.2 3.2L13 5" />
  </svg>
);

export const Restore = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M2.8 8a5.2 5.2 0 1 0 1.6-3.75M2.5 2.5V5h2.5" />
  </svg>
);

export const Upload = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M8 10.5v-8M4.5 5.5 8 2l3.5 3.5M2.5 13h11" />
  </svg>
);

export const Sun = (p) => (
  <svg {...base} className="ico" {...p}>
    <circle cx="8" cy="8" r="3.1" />
    <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1" />
  </svg>
);

export const Moon = (p) => (
  <svg {...base} className="ico" {...p}>
    <path d="M13.5 9.6A5.9 5.9 0 0 1 6.4 2.5a5.9 5.9 0 1 0 7.1 7.1Z" />
  </svg>
);

export const Lock = (p) => (
  <svg {...base} className="ico" {...p}>
    <rect x="3" y="7" width="10" height="7" rx="1.4" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
);
