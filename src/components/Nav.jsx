import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { site, nav as navItems } from "../data/site.js";
import { useActiveSection, useScrollLock } from "../lib/hooks.js";
import { Menu, Close, ArrowRight } from "./Icons.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const SECTION_IDS = navItems.map((n) => n.href.replace("#", ""));

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const active = useActiveSection(SECTION_IDS, isHome);

  useScrollLock(open);

  /* Scroll state plus a 0..1 progress value the nav renders as a rule.
     Coalesced into one rAF so a fast scroll cannot queue extra style writes. */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        max > 0 ? String(Math.min(1, window.scrollY / max)) : "0"
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* In-page anchors need a route change first when we're not on the home page. */
  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      document
        .getElementById(href.replace("#", ""))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    } else {
      navigate("/" + href);
    }
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav__inner wrap">
        <Link to="/" className="nav__brand" aria-label={`${site.name}, home`}>
          <span className="nav__name">{site.name}</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = isHome && active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={go(item.href)}
                    className={`nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav__cta">
          <ThemeToggle />
          <a href="#contact" onClick={go("#contact")} className="btn btn--primary btn--sm">
            Let's Work Together
            <ArrowRight />
          </a>
        </div>

        <ThemeToggle className="theme-toggle--mobile" />

        <button
          type="button"
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <Close /> : <Menu />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`nav__mobile${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.href} style={{ "--i": i }}>
                <a href={item.href} onClick={go(item.href)}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__mobile-foot">
          <a href="#contact" onClick={go("#contact")} className="btn btn--primary">
            Let's Work Together
            <ArrowRight />
          </a>
          <a
            href={site.links.resume}
            className="btn btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
