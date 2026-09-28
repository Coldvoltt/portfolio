import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  saveProject,
  deleteProject,
  restoreSeed,
  resetAll,
  importProjects,
  exportJSON,
  exportModule,
  getHiddenSeeds,
  isSeed,
  slugify,
  normalizeProject,
  validateProject,
  hasLocalEdits,
} from "../lib/projectStore.js";
import { STATUS_OPTIONS } from "../data/projects.js";
import { useProjects, useDocumentMeta } from "../lib/hooks.js";
import ProjectCard from "../components/ProjectCard.jsx";
import {
  Plus,
  Trash,
  Pencil,
  Copy,
  Check,
  Restore,
  Download,
  Upload,
  Lock,
  ArrowRight,
  Close,
} from "../components/Icons.jsx";

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || "";
const UNLOCK_KEY = "portfolio.admin.unlocked";

/* ==========================================================================
   Draft <-> project conversion
   ========================================================================== */

const linesToArray = (s) =>
  s
    .split("\n")
    .map((l) => l.replace(/^\s*[-\u2013\u2014•]\s*/, "").trim())
    .filter(Boolean);

const arrayToLines = (a) => (a || []).join("\n");

const EMPTY_DRAFT = {
  name: "",
  slug: "",
  tagline: "",
  capability: "",
  status: "Portfolio Project",
  context: "",
  year: "",
  featured: true,
  contribution: "",
  problem: "",
  solution: "",
  architectureText: "",
  highlightsText: "",
  techText: "",
  resultText: "",
  lessonsText: "",
  challenges: [],
  github: "",
  demo: "",
  docs: "",
  writeup: "",
};

function draftFromProject(p) {
  return {
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    capability: p.capability,
    status: p.status,
    context: p.context,
    year: p.year,
    featured: p.featured,
    contribution: p.contribution,
    problem: p.problem,
    solution: p.solution,
    architectureText: arrayToLines(p.architecture),
    highlightsText: arrayToLines(p.highlights),
    techText: (p.tech || []).join(", "),
    resultText: arrayToLines(p.result),
    lessonsText: arrayToLines(p.lessons),
    challenges: (p.challenges || []).map((c) => ({ ...c })),
    github: p.links?.github || "",
    demo: p.links?.demo || "",
    docs: p.links?.docs || "",
    writeup: p.links?.writeup || "",
  };
}

function projectFromDraft(d) {
  return normalizeProject({
    name: d.name,
    slug: d.slug || slugify(d.name),
    tagline: d.tagline,
    capability: d.capability,
    status: d.status,
    context: d.context,
    year: d.year,
    featured: d.featured,
    contribution: d.contribution,
    problem: d.problem,
    solution: d.solution,
    architecture: linesToArray(d.architectureText),
    highlights: linesToArray(d.highlightsText),
    tech: d.techText
      .split(/[,\n]/)
      .map((t) => t.trim())
      .filter(Boolean),
    result: linesToArray(d.resultText),
    lessons: linesToArray(d.lessonsText),
    challenges: d.challenges,
    links: { github: d.github, demo: d.demo, docs: d.docs, writeup: d.writeup },
  });
}

/* ==========================================================================
   Page
   ========================================================================== */

export default function Admin() {
  const projects = useProjects();
  const [unlocked, setUnlocked] = useState(
    () => !PASSCODE || sessionStorage.getItem(UNLOCK_KEY) === "1"
  );

  useDocumentMeta({
    title: "Admin · Manage projects",
    description: "Private project management for this portfolio.",
    noindex: true,
  });

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;

  return <AdminPanel projects={projects} />;
}

/* -------------------------------------------------------------------------
   Passcode gate
   ------------------------------------------------------------------------- */

function Gate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (value === PASSCODE) {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      onUnlock();
    } else {
      setError("Incorrect passcode.");
      setValue("");
    }
  };

  return (
    <main id="main" className="page admin-gate">
      <form className="gate" onSubmit={submit}>
        <span className="gate__icon">
          <Lock />
        </span>
        <h1 className="gate__title">Admin</h1>
        <p className="gate__body">
          Enter the passcode to manage projects.
        </p>
        <label className="field">
          <span className="sr-only">Passcode</span>
          <input
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            autoFocus
            autoComplete="current-password"
            aria-invalid={error ? "true" : undefined}
            placeholder="Passcode"
          />
        </label>
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--primary">
          Unlock <ArrowRight />
        </button>
        <Link to="/" className="gate__back">
          Back to site
        </Link>
      </form>
    </main>
  );
}

/* -------------------------------------------------------------------------
   Panel
   ------------------------------------------------------------------------- */

function AdminPanel({ projects }) {
  const [editing, setEditing] = useState(null); // slug being edited, or "new"
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [confirmSlug, setConfirmSlug] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const hidden = getHiddenSeeds();
  const fileRef = useRef(null);
  const formRef = useRef(null);

  const preview = useMemo(() => projectFromDraft(draft), [draft]);
  const dirty = editing !== null;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  /* Warn before losing an in-progress edit. */
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (key) => (e) => {
    const value =
      e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value ?? e;
    setDraft((d) => {
      // Keep slug in sync with name until the slug is edited by hand.
      if (key === "name" && (!d.slug || d.slug === slugify(d.name))) {
        return { ...d, name: value, slug: slugify(value) };
      }
      return { ...d, [key]: value };
    });
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const startNew = () => {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setEditing("new");
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const startEdit = (project) => {
    setDraft(draftFromProject(project));
    setErrors({});
    setEditing(project.slug);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const cancel = () => {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setErrors({});
  };

  const submit = (e) => {
    e.preventDefault();
    const project = projectFromDraft(draft);
    const found = validateProject(project);

    // Slug collision with a different project.
    const clash = projects.find(
      (p) => p.slug === project.slug && p.slug !== editing
    );
    if (clash) found.slug = "Another project already uses this slug.";

    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      const firstKey = Object.keys(found).find((k) => found[k]);
      formRef.current
        ?.querySelector(`[name="${firstKey}"]`)
        ?.focus({ preventScroll: false });
      return;
    }

    saveProject(project, editing === "new" ? null : editing);
    setToast(`Saved “${project.name}”.`);
    cancel();
  };

  const remove = (slug) => {
    const name = projects.find((p) => p.slug === slug)?.name || slug;
    deleteProject(slug);
    setConfirmSlug(null);
    if (editing === slug) cancel();
    setToast(
      isSeed(slug) ? `Hid “${name}”. Restore it below.` : `Deleted “${name}”.`
    );
  };

  const onImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : parsed.seedProjects;
      const n = importProjects(list);
      setToast(`Imported ${n} project${n === 1 ? "" : "s"}.`);
    } catch (err) {
      setToast(`Import failed: ${err.message}`);
    } finally {
      e.target.value = "";
    }
  };

  const download = () => {
    const blob = new Blob([exportModule()], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setToast("Downloaded projects.js");
  };

  return (
    <main id="main" className="page admin">
      <header className="admin__head">
        <div className="wrap admin__head-inner">
          <div>
            <p className="mono">Admin</p>
            <h1 className="admin__title">Manage projects</h1>
            <p className="admin__sub">
              {projects.length} published · changes are saved to this browser and
              appear on the site immediately.{" "}
              <strong>Export and commit them</strong> to make them permanent.
            </p>
          </div>
          <div className="admin__head-actions">
            <button type="button" className="btn btn--primary" onClick={startNew}>
              <Plus /> New project
            </button>
            <Link to="/" className="btn btn--ghost">
              View site
            </Link>
          </div>
        </div>
      </header>

      <div className="wrap admin__body">
        {!PASSCODE && (
          <p className="notice notice--warn">
            <strong>No passcode set.</strong> This page is reachable by anyone who
            knows the URL. Set <code>VITE_ADMIN_PASSCODE</code> in{" "}
            <code>.env</code> to add a basic lock. It is a convenience gate, not
            real security: the data lives in your own browser either way.
          </p>
        )}

        {/* ---------------- Editor ---------------- */}
        <section className="admin__editor" ref={formRef}>
          {editing === null ? (
            <button type="button" className="admin__start" onClick={startNew}>
              <Plus />
              <span>
                <strong>Add a project</strong>
                <em>
                  Case-study fields: problem, solution, architecture, challenges.
                </em>
              </span>
              <ArrowRight />
            </button>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className="form__head">
                <h2 className="form__title">
                  {editing === "new" ? "New project" : `Editing “${draft.name}”`}
                </h2>
                <button type="button" className="icon-btn" onClick={cancel}>
                  <Close />
                  <span className="sr-only">Cancel</span>
                </button>
              </div>

              <div className="form__grid">
                <Field
                  label="Project name"
                  name="name"
                  value={draft.name}
                  onChange={set("name")}
                  error={errors.name}
                  required
                  placeholder="Agentic Workflow System"
                />
                <Field
                  label="URL slug"
                  name="slug"
                  value={draft.slug}
                  onChange={set("slug")}
                  error={errors.slug}
                  required
                  mono
                  hint={`/projects/${draft.slug || "…"}`}
                  placeholder="agentic-workflow-system"
                />
              </div>

              <Field
                label="One-line description"
                name="tagline"
                value={draft.tagline}
                onChange={set("tagline")}
                error={errors.tagline}
                required
                placeholder="What the system is, in one sentence."
              />

              <div className="form__grid form__grid--4">
                <Field
                  label="Capability"
                  name="capability"
                  value={draft.capability}
                  onChange={set("capability")}
                  hint="The engineering capability it proves"
                  placeholder="RAG · Retrieval"
                />
                <Select
                  label="Status"
                  name="status"
                  value={draft.status}
                  onChange={set("status")}
                  options={STATUS_OPTIONS}
                />
                <Field
                  label="Context"
                  name="context"
                  value={draft.context}
                  onChange={set("context")}
                  hint="Where it was built"
                  placeholder="Divverse LLC"
                />
                <Field
                  label="Year"
                  name="year"
                  value={draft.year}
                  onChange={set("year")}
                  placeholder="2024 to Present"
                />
              </div>

              <Field
                label="My contribution"
                name="contribution"
                value={draft.contribution}
                onChange={set("contribution")}
                hint="Only if you built part of a larger system. Which part was yours?"
              />

              <TextArea
                label="Problem"
                name="problem"
                value={draft.problem}
                onChange={set("problem")}
                error={errors.problem}
                required
                rows={4}
                hint="What was actually broken or manual before this existed."
              />

              <TextArea
                label="Solution"
                name="solution"
                value={draft.solution}
                onChange={set("solution")}
                error={errors.solution}
                required
                rows={4}
                hint="How the system solves it, at architecture level rather than a feature list."
              />

              <TextArea
                label="Architecture"
                name="architectureText"
                value={draft.architectureText}
                onChange={set("architectureText")}
                rows={6}
                hint="One pipeline stage per line, in order. Rendered as a flow diagram."
                mono
                placeholder={"Request\nAPI layer\nAgent runtime\nTools\nDatabase"}
              />

              <TextArea
                label="Key technical capabilities"
                name="highlightsText"
                value={draft.highlightsText}
                onChange={set("highlightsText")}
                rows={5}
                hint="One per line. The first four appear on the project card."
              />

              <Field
                label="Technologies"
                name="techText"
                value={draft.techText}
                onChange={set("techText")}
                error={errors.tech}
                required
                hint="Comma separated"
                placeholder="Python, FastAPI, Docker"
              />
              {draft.techText.trim() && (
                <ul className="tag-row form__tagpreview">
                  {preview.tech.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <ChallengeEditor
                value={draft.challenges}
                onChange={(challenges) => setDraft((d) => ({ ...d, challenges }))}
              />

              <div className="form__grid">
                <TextArea
                  label="Result"
                  name="resultText"
                  value={draft.resultText}
                  onChange={set("resultText")}
                  rows={4}
                  hint="One per line. Only what actually happened, with no invented metrics."
                />
                <TextArea
                  label="Lessons"
                  name="lessonsText"
                  value={draft.lessonsText}
                  onChange={set("lessonsText")}
                  rows={4}
                  hint="One per line."
                />
              </div>

              <fieldset className="form__fieldset">
                <legend className="mono">Links</legend>
                <div className="form__grid form__grid--4">
                  <Field
                    label="GitHub"
                    name="github"
                    type="url"
                    value={draft.github}
                    onChange={set("github")}
                    mono
                    placeholder="https://github.com/…"
                  />
                  <Field
                    label="Live site"
                    name="demo"
                    type="url"
                    value={draft.demo}
                    onChange={set("demo")}
                    mono
                    placeholder="https://…"
                  />
                  <Field
                    label="Docs"
                    name="docs"
                    type="url"
                    value={draft.docs}
                    onChange={set("docs")}
                    mono
                    placeholder="https://…"
                  />
                  <Field
                    label="Write-up"
                    name="writeup"
                    type="url"
                    value={draft.writeup}
                    onChange={set("writeup")}
                    mono
                    hint="An article about it"
                    placeholder="https://…"
                  />
                </div>
              </fieldset>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="featured"
                  checked={draft.featured}
                  onChange={set("featured")}
                />
                <span>
                  <strong>Show on the homepage</strong>
                  <em>
                    Unchecked projects still have a case-study page at their URL.
                  </em>
                </span>
              </label>

              <div className="form__actions">
                <button type="submit" className="btn btn--primary">
                  <Check />
                  {editing === "new" ? "Add project" : "Save changes"}
                </button>
                <button type="button" className="btn btn--ghost" onClick={cancel}>
                  Cancel
                </button>
              </div>

              {/* Live preview of the card as it will appear */}
              {draft.name && draft.tagline && (
                <div className="form__preview">
                  <p className="mono form__preview-label">Live preview</p>
                  <ProjectCard project={preview} index={projects.length} reveal={false} />
                </div>
              )}
            </form>
          )}
        </section>

        {/* ---------------- List ---------------- */}
        <section className="admin__list">
          <h2 className="admin__h2">
            Published <span className="mono">{projects.length}</span>
          </h2>

          <ul className="rows">
            {projects.map((p, i) => (
              <li key={p.slug} className="row">
                <span className="row__n mono">{String(i + 1).padStart(2, "0")}</span>
                <div className="row__main">
                  <p className="row__name">
                    {p.name}
                    {!p.featured && <span className="badge">Hidden on home</span>}
                    {p.custom && <span className="badge badge--accent">Local</span>}
                  </p>
                  <p className="row__tagline">{p.tagline}</p>
                  <p className="row__meta mono">
                    /projects/{p.slug} · {p.status}
                    {p.context ? ` · ${p.context}` : ""}
                  </p>
                </div>
                <div className="row__actions">
                  <Link to={`/projects/${p.slug}`} className="icon-btn" title="View">
                    <ArrowRight />
                    <span className="sr-only">View {p.name}</span>
                  </Link>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => startEdit(p)}
                    title="Edit"
                  >
                    <Pencil />
                    <span className="sr-only">Edit {p.name}</span>
                  </button>
                  {confirmSlug === p.slug ? (
                    <span className="row__confirm">
                      <button
                        type="button"
                        className="btn btn--sm btn--danger"
                        onClick={() => remove(p.slug)}
                      >
                        {isSeed(p.slug) ? "Hide" : "Delete"}
                      </button>
                      <button
                        type="button"
                        className="btn btn--sm btn--ghost"
                        onClick={() => setConfirmSlug(null)}
                      >
                        Keep
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      onClick={() => setConfirmSlug(p.slug)}
                      title="Remove"
                    >
                      <Trash />
                      <span className="sr-only">Remove {p.name}</span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {hidden.length > 0 && (
            <div className="admin__hidden">
              <h3 className="admin__h3 mono">Hidden from the repo list</h3>
              <ul className="rows rows--muted">
                {hidden.map((p) => (
                  <li key={p.slug} className="row">
                    <div className="row__main">
                      <p className="row__name">{p.name}</p>
                      <p className="row__meta mono">/projects/{p.slug}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn--sm btn--ghost"
                      onClick={() => {
                        restoreSeed(p.slug);
                        setToast(`Restored “${p.name}”.`);
                      }}
                    >
                      <Restore /> Restore
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ---------------- Export ---------------- */}
        <section className="admin__export">
          <h2 className="admin__h2">Make it permanent</h2>
          <p className="admin__sub">
            Everything above lives in this browser only. To publish it, export
            the data and replace <code>src/data/projects.js</code> in the repo,
            then redeploy.
          </p>

          <div className="admin__export-actions">
            <button type="button" className="btn btn--primary" onClick={download}>
              <Download /> Download projects.js
            </button>
            <CopyButton getText={exportJSON} label="Copy JSON" />
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowExport((v) => !v)}
              aria-expanded={showExport}
            >
              {showExport ? "Hide" : "Show"} JSON
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => fileRef.current?.click()}
            >
              <Upload /> Import JSON
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              onChange={onImport}
              className="sr-only"
            />
            {hasLocalEdits() && (
              <button
                type="button"
                className="btn btn--sm btn--danger"
                onClick={() => {
                  resetAll();
                  cancel();
                  setToast("Local changes cleared. Back to the repo version.");
                }}
              >
                Reset to repo version
              </button>
            )}
          </div>

          {showExport && (
            <pre className="admin__json" tabIndex={0}>
              <code>{exportJSON()}</code>
            </pre>
          )}
        </section>
      </div>

      {/* ---------------- Delete confirm is inline; toast only ---------------- */}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && <p className="toast">{toast}</p>}
      </div>
    </main>
  );
}

/* ==========================================================================
   Form primitives
   ========================================================================== */

function Field({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  required,
  mono,
  type = "text",
  placeholder,
}) {
  const id = `f-${name}`;
  return (
    <label className={`field${error ? " is-invalid" : ""}`} htmlFor={id}>
      <span className="field__label">
        {label}
        {required && <span className="field__req" aria-hidden="true"> *</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={mono ? "is-mono" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        required={required}
      />
      {error ? (
        <span className="field__error" id={`${id}-err`} role="alert">
          {error}
        </span>
      ) : (
        hint && (
          <span className="field__hint" id={`${id}-hint`}>
            {hint}
          </span>
        )
      )}
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  rows = 4,
  required,
  mono,
  placeholder,
}) {
  const id = `f-${name}`;
  return (
    <label className={`field${error ? " is-invalid" : ""}`} htmlFor={id}>
      <span className="field__label">
        {label}
        {required && <span className="field__req" aria-hidden="true"> *</span>}
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={mono ? "is-mono" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        required={required}
      />
      {error ? (
        <span className="field__error" id={`${id}-err`} role="alert">
          {error}
        </span>
      ) : (
        hint && (
          <span className="field__hint" id={`${id}-hint`}>
            {hint}
          </span>
        )
      )}
    </label>
  );
}

function Select({ label, name, value, onChange, options }) {
  const id = `f-${name}`;
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <select id={id} name={name} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ChallengeEditor({ value, onChange }) {
  const update = (i, key, v) => {
    const next = value.map((c, idx) => (idx === i ? { ...c, [key]: v } : c));
    onChange(next);
  };

  return (
    <fieldset className="form__fieldset">
      <legend className="mono">Engineering challenges</legend>
      <p className="field__hint field__hint--block">
        What was genuinely hard, and what you did about it. This is the section
        engineering managers read most closely.
      </p>

      {value.map((c, i) => (
        <div className="challenge" key={i}>
          <span className="challenge__n mono">{String(i + 1).padStart(2, "0")}</span>
          <div className="challenge__fields">
            <input
              type="text"
              value={c.title}
              placeholder="The challenge, in a few words"
              onChange={(e) => update(i, "title", e.target.value)}
              aria-label={`Challenge ${i + 1} title`}
            />
            <textarea
              rows={3}
              value={c.body}
              placeholder="What made it hard and how you resolved it."
              onChange={(e) => update(i, "body", e.target.value)}
              aria-label={`Challenge ${i + 1} detail`}
            />
          </div>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
          >
            <Trash />
            <span className="sr-only">Remove challenge {i + 1}</span>
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn--ghost btn--sm"
        onClick={() => onChange([...value, { title: "", body: "" }])}
      >
        <Plus /> Add challenge
      </button>
    </fieldset>
  );
}

function CopyButton({ getText, label }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API blocked (insecure context) — fall back to a selection.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing else to try */
      }
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <button type="button" className="btn btn--ghost" onClick={copy}>
      {done ? <Check /> : <Copy />}
      {done ? "Copied" : label}
    </button>
  );
}
