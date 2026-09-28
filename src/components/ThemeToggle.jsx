import { useEffect, useState } from "react";
import { getTheme, toggleTheme } from "../lib/theme.js";
import { Sun, Moon } from "./Icons.jsx";

/* Reads the theme the inline script already applied, so the button's first
   paint matches the page rather than flipping after hydration. */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={() => setTheme(toggleTheme())}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <Sun />
        <Moon />
      </span>
    </button>
  );
}
