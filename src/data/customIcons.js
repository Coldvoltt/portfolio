/* ==========================================================================
   Glyphs for the things that have no brand mark.

   RAG, tool calling, OCR, webhooks, CI/CD and friends are techniques, not
   products — and AWS, Oracle Cloud, OpenAI, Groq and Whisper have no icon in
   Simple Icons. These are drawn to sit at the same optical weight as the
   brand paths in brandPaths.js: solid shapes on a 24x24 grid, currentColor.

   Deliberately geometric — no sparkles, no robots.
   ========================================================================== */

const EVENODD = "evenodd";

export const CUSTOM_ICONS = {
  /* A stored dataset: the classic cylinder. */
  database: [
    "M12 2.2c4.53 0 8.2 1.4 8.2 3.1S16.53 8.4 12 8.4 3.8 7 3.8 5.3 7.47 2.2 12 2.2Z",
    "M20.2 8.5v3.3c0 1.7-3.67 3.1-8.2 3.1s-8.2-1.4-8.2-3.1V8.5c1.78 1.36 4.84 2.15 8.2 2.15s6.42-.79 8.2-2.15Z",
    "M20.2 14.9v3.3c0 1.7-3.67 3.1-8.2 3.1s-8.2-1.4-8.2-3.1v-3.3c1.78 1.36 4.84 2.15 8.2 2.15s6.42-.79 8.2-2.15Z",
  ],

  /* A table: header band over rows. */
  sql: [
    "M2.6 3.8h18.8v3.6H2.6z",
    "M2.6 9.4h7.8v4.2H2.6z",
    "M13.6 9.4h7.8v4.2h-7.8z",
    "M2.6 15.6h7.8v4.2H2.6z",
    "M13.6 15.6h7.8v4.2h-7.8z",
  ],

  /* A model: hexagonal shell around a core. */
  llmapi: [
    {
      d: "M12 2L20.66 7V17L12 22L3.34 17V7L12 2ZM12 5L5.94 8.5V15.5L12 19L18.06 15.5V8.5L12 5Z",
      rule: EVENODD,
    },
    "M12 8.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4Z",
  ],

  /* Low latency. */
  groq: ["M13.8 2 5.2 13.4h5.1L9.4 22 18.8 10.2h-5.3L13.8 2Z"],

  /* Speech: a waveform. */
  whisper: [
    "M2.6 10.2h2.4v3.6H2.6z",
    "M7 7.4h2.4v9.2H7z",
    "M11.4 4.2h2.4v15.6h-2.4z",
    "M15.8 7.4h2.4v9.2h-2.4z",
    "M20.2 10.2h2.4v3.6h-2.4z",
  ],

  /* A page inside scan registration marks. */
  ocr: [
    "M2.8 2.8h6.4V5H5v4.2H2.8V2.8Z",
    "M14.8 2.8h6.4v6.4H19V5h-4.2V2.8Z",
    "M2.8 14.8H5V19h4.2v2.2H2.8v-6.4Z",
    "M19 14.8h2.2v6.4h-6.4V19H19v-4.2Z",
    "M7.2 9.6h9.6v1.9H7.2z",
    "M7.2 12.9h6.4v1.9H7.2z",
  ],

  /* An index: stacked, searchable layers. */
  rag: [
    "M12 2.2 22 7l-10 4.8L2 7l10-4.8Z",
    "M22 11.6 12 16.4 2 11.6l2.6-1.25L12 13.9l7.4-3.55L22 11.6Z",
    "M22 16.2 12 21 2 16.2l2.6-1.25L12 18.5l7.4-3.55L22 16.2Z",
  ],

  /* A call: angle brackets. */
  toolcalling: [
    "M9.2 4.6 2.2 12l7 7.4 1.9-1.8L5.9 12l5.2-5.6-1.9-1.8Z",
    "M14.8 4.6l-1.9 1.8L18.1 12l-5.2 5.6 1.9 1.8L21.8 12l-7-7.4Z",
  ],

  /* A payload: braces. */
  rest: [
    "M10.2 2.6v2.3c-1.8 0-2.5.6-2.5 2.1v2.5c0 1.4-.8 2.2-2 2.5 1.2.3 2 1.1 2 2.5v2.5c0 1.5.7 2.1 2.5 2.1v2.3c-3.3 0-4.8-1.3-4.8-4v-2.3c0-1.1-.5-1.6-1.6-1.6h-.6v-2.8h.6c1.1 0 1.6-.5 1.6-1.6V6.6c0-2.7 1.5-4 4.8-4Z",
    "M13.8 2.6v2.3c1.8 0 2.5.6 2.5 2.1v2.5c0 1.4.8 2.2 2 2.5-1.2.3-2 1.1-2 2.5v2.5c0 1.5-.7 2.1-2.5 2.1v2.3c3.3 0 4.8-1.3 4.8-4v-2.3c0-1.1.5-1.6 1.6-1.6h.6v-2.8h-.6c-1.1 0-1.6-.5-1.6-1.6V6.6c0-2.7-1.5-4-4.8-4Z",
  ],

  /* Stages passing data along. */
  pipelines: [
    "M4.4 8.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Z",
    "M12 9.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z",
    "M19.6 8.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Z",
    "M8.2 11h1.4v2H8.2z",
    "M14.6 11h1.4v2h-1.4z",
  ],

  /* One event fanning out to several channels. */
  openclaw: [
    "M3.4 9.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z",
    "M5.8 11.4h7.6v1.2H5.8z",
    "M12.2 4h1.2v16h-1.2z",
    "M13.4 4h3.4v1.2h-3.4z",
    "M13.4 11.4h3.4v1.2h-3.4z",
    "M13.4 18.8h3.4v1.2h-3.4z",
    "M19.2 2.2a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z",
    "M19.2 9.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z",
    "M19.2 17a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z",
  ],

  /* An inbound call hitting an endpoint. */
  webhooks: [
    "M2.6 10.9h8.4v2.2H2.6z",
    "M10.4 7.2 16.2 12l-5.8 4.8V7.2Z",
    "M18.4 3.6h3v16.8h-3v-2.2h.8V5.8h-.8V3.6Z",
  ],

  /* Two systems overlapping. */
  apiintegrations: [
    { d: "M2.6 2.6h11v11h-11V2.6Zm2.3 2.3v6.4h6.4V4.9H4.9Z", rule: EVENODD },
    {
      d: "M10.4 10.4h11v11h-11V10.4Zm2.3 2.3v6.4h6.4v-6.4h-6.4Z",
      rule: EVENODD,
    },
  ],

  /* Generic cloud — AWS has no mark in Simple Icons. */
  aws: [
    "M7.4 19.6a5.2 5.2 0 0 1 0-10.4c.36 0 .71.04 1.05.11A6.2 6.2 0 0 1 20 11.3a4.15 4.15 0 0 1-.55 8.3H7.4Z",
  ],

  /* Generic rack — Oracle Cloud likewise. */
  oci: [
    { d: "M2.8 3.8h18.4v5H2.8V3.8Zm2 1.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z", rule: EVENODD },
    { d: "M2.8 9.5h18.4v5H2.8V9.5Zm2 1.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z", rule: EVENODD },
    { d: "M2.8 15.2h18.4v5H2.8v-5Zm2 1.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3Z", rule: EVENODD },
  ],

  /* A loop that keeps going round. */
  cicd: [
    {
      d: "M12 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Zm0 2.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8Z",
      rule: EVENODD,
    },
    "M10 0.6 16.2 4.3 10 8V0.6Z",
    "M14 23.4 7.8 19.7 14 16v7.4Z",
  ],

  /* Plotted output. */
  chart: [
    "M2.8 19.4h18.4v2.2H2.8z",
    "M4.6 12.4H8v6.2H4.6z",
    "M10.3 6.8h3.4v11.8h-3.4z",
    "M16 9.6h3.4v9H16z",
  ],
};
