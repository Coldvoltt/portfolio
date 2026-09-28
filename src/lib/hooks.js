import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
} from "./projectStore.js";

/** Live list of resolved projects (seeds + local /admin edits). */
export function useProjects() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Adds `.is-in` to every [data-reveal] descendant as it enters the viewport.
 * One observer per mounted tree; no dependency, no layout thrash.
 */
export function useReveal(deps = []) {
  const root = useRef(null);

  useEffect(() => {
    const host = root.current || document;
    const nodes = host.querySelectorAll("[data-reveal]:not(.is-in)");
    if (!nodes.length) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return root;
}

/** Tracks which in-page section is currently in view, for nav highlighting. */
export function useActiveSection(ids, enabled = true) {
  const key = ids.join(",");
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;

    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const ratios = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let best = "";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActive((prev) => (best && best !== prev ? best : prev));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [key, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}

/** Locks body scroll while a mobile menu / modal is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = prevPad;
    };
  }, [locked]);
}

/** Per-route document title + meta description, for SPA route changes. */
export function useDocumentMeta({ title, description, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute(
      "content",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
  }, [title, description, noindex]);
}
