import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Capabilities from "../components/Capabilities.jsx";
import Projects from "../components/Projects.jsx";
import Stack from "../components/Stack.jsx";
import Approach from "../components/Approach.jsx";
import Experience from "../components/Experience.jsx";
import GitHubSection from "../components/GitHubSection.jsx";
import Contact from "../components/Contact.jsx";
import { site } from "../data/site.js";
import { useProjects, useReveal, useDocumentMeta } from "../lib/hooks.js";

export default function Home() {
  const { hash } = useLocation();
  const projects = useProjects();
  const root = useReveal([projects.length]);

  useDocumentMeta({
    title: `${site.seo.title} · ${site.name}`,
    description: site.seo.description,
  });

  /* Arriving from another route with #anchor — scroll once mounted. */
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "auto", block: "start" })
      );
    }
  }, [hash]);

  return (
    <main id="main" className="page" ref={root}>
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Stack />
      <Approach />
      <Experience />
      <GitHubSection />
      <Contact />
    </main>
  );
}
