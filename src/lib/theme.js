/* ==========================================================================
   Theme.

   Dark is the default and stays the default: the system's `prefers-color-scheme`
   is deliberately not consulted, so a visitor on a light OS still lands on the
   design as intended. Light is opt-in, and the choice persists.

   The initial value is applied by an inline script in index.html before first
   paint, so there is never a flash of the wrong theme. This module only
   handles switching afterwards.
   ========================================================================== */

export const THEMES = ["dark", "light"];
const KEY = "portfolio.theme";
const DEFAULT = "dark";

/** Reads the theme already applied to <html>, falling back to the default. */
export function getTheme() {
  if (typeof document === "undefined") return DEFAULT;
  const attr = document.documentElement.getAttribute("data-theme");
  return THEMES.includes(attr) ? attr : DEFAULT;
}

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(KEY);
    return THEMES.includes(v) ? v : null;
  } catch {
    return null;
  }
}

/** Keeps the browser UI (address bar, form controls) in step with the page. */
function syncMeta(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "light" ? "#faf8f3" : "#0c0b0a");
  }
  const scheme = document.querySelector('meta[name="color-scheme"]');
  if (scheme) scheme.setAttribute("content", theme);
}

export function applyTheme(theme, { animate = false } = {}) {
  const next = THEMES.includes(theme) ? theme : DEFAULT;
  const root = document.documentElement;

  if (animate) {
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 320);
  }

  root.setAttribute("data-theme", next);
  syncMeta(next);

  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode; the choice just will not survive a reload */
  }

  return next;
}

export function toggleTheme() {
  return applyTheme(getTheme() === "dark" ? "light" : "dark", { animate: true });
}
