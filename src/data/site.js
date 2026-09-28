/* ==========================================================================
   Site content — single source of truth for identity, links and copy.

   ⚠ ONE THING LEFT BEFORE DEPLOY (marked TODO):
     - url (your live domain; also find/replace YOUR-DOMAIN.com in
       index.html and public/robots.txt)

   Anything left as an empty string is simply not rendered. Nothing here is
   invented: every claim traces back to the resume in /public.
   ========================================================================== */

export const site = {
  name: "Paul Otulaja",
  role: "AI Engineer",
  location: "Lagos, Nigeria",
  timezone: "WAT (UTC+1)",
  availability: "Open to remote roles & contracts",
  // Stated on the resume as "6+ years" — not computed, so it never drifts
  // past what the resume claims.
  experienceYears: "6+",

  email: "paulotulaja@gmail.com",

  // TODO: your live domain. Empty values elsewhere are hidden site-wide.
  url: "https://YOUR-DOMAIN.com",
  links: {
    github: "https://github.com/Coldvoltt",
    linkedin: "https://www.linkedin.com/in/paul-otulaja/",
    resume: "/Paul-Otulaja-AI-Engineer-Resume.pdf",
  },

  githubHandle: "Coldvoltt",

  seo: {
    title: "AI Engineer | LLM Applications, Agentic AI & Automation",
    description:
      "AI Engineer building and deploying LLM applications, agentic AI systems, intelligent automation, and Python-based backend systems.",
  },
};

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "AI Engineer",
  headline: ["Building AI systems that move", "from ideas to production."],
  lede: "I build and deploy LLM-powered applications, agentic AI systems, and intelligent automation using Python, FastAPI, modern AI APIs, databases, and cloud infrastructure.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Contact Me", href: "#contact" },
};

/* Trust / capability strip — compact, not a skills wall. */
export const capabilityStrip = [
  "Python",
  "FastAPI",
  "LLM APIs",
  "Agentic AI",
  "RAG",
  "Tool Calling",
  "MCP",
  "PostgreSQL",
  "Docker",
  "AWS",
];

/* --------------------------------------------------------------------------
   About
   -------------------------------------------------------------------------- */

export const about = {
  heading: "Building useful AI, not just impressive demos.",
  body: [
    "I'm an AI Engineer focused on building practical AI systems that solve real operational problems. My work spans LLM-powered applications, agentic AI, intelligent automation, backend engineering, and production deployment.",
    "I primarily work with Python, FastAPI, LLM APIs, RAG, AI agents, databases, Docker, Linux, and cloud infrastructure, and I'm comfortable taking a system from idea through architecture, implementation, integration, and deployment.",
    "My background also includes a statistics degree and years of data science and machine learning work, which gives me a strong foundation for data-intensive AI applications and for judging when a model's output can actually be trusted.",
  ],
  facts: [
    { label: "Based in", value: "Lagos, Nigeria" },
    { label: "Working", value: "Remote-first" },
    { label: "Education", value: "B.Tech Statistics, FUTA" },
    { label: "Focus", value: "LLM systems & agents" },
  ],
};

/* --------------------------------------------------------------------------
   Core capabilities (spec §13)
   -------------------------------------------------------------------------- */

export const capabilities = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    summary:
      "Designing the system around the model, not just the prompt that goes into it.",
    items: [
      "LLM applications",
      "AI agents & agentic workflows",
      "RAG & retrieval pipelines",
      "Tool / function calling",
      "Multi-agent orchestration",
      "MCP client & server integration",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineering",
    summary:
      "The API layer that makes an AI system usable by other software and other teams.",
    items: [
      "Python",
      "FastAPI",
      "REST API design",
      "Request validation",
      "Database systems",
      "Third-party API integration",
    ],
  },
  {
    id: "automation",
    title: "AI Automation",
    summary:
      "Turning a manual, repeated process into a workflow that runs itself and reports back.",
    items: [
      "Workflow automation",
      "AI-powered workflows",
      "OpenClaw · n8n",
      "Webhooks & triggers",
      "API orchestration",
      "Multi-channel delivery",
    ],
  },
  {
    id: "infrastructure",
    title: "AI Infrastructure",
    summary:
      "Containerised, deployable systems: the part that separates a demo from a product.",
    items: [
      "Docker",
      "Linux",
      "AWS · GCP · OCI",
      "GitHub Actions & CI/CD",
      "Production APIs",
      "Git / GitHub",
    ],
  },
  {
    id: "data-ml",
    title: "Data & ML",
    summary:
      "A statistics degree and years of modelling work underneath the AI engineering.",
    items: [
      "Pandas · NumPy",
      "TensorFlow · Keras · PyTorch",
      "Predictive modelling",
      "Statistical analysis",
      "Data pipelines",
      "Model evaluation",
    ],
  },
];

/* --------------------------------------------------------------------------
   Technical stack (spec §21) — only technologies actually used.
   -------------------------------------------------------------------------- */

export const stack = [
  {
    group: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "R", icon: "r" },
      { name: "SQL", icon: "sql" },
      { name: "JavaScript", icon: "javascript", note: "familiar" },
    ],
  },
  {
    group: "AI & LLM",
    items: [
      { name: "OpenAI API", icon: "llmapi" },
      { name: "Groq", icon: "groq" },
      { name: "Ollama", icon: "ollama" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "LangChain", icon: "langchain" },
      { name: "CrewAI", icon: "crewai" },
      { name: "RAG", icon: "rag" },
      { name: "Tool calling", icon: "toolcalling" },
      { name: "MCP", icon: "mcp" },
      { name: "Whisper", icon: "whisper" },
      { name: "LLaMA", icon: "llama" },
      { name: "OCR", icon: "ocr" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "REST APIs", icon: "rest" },
      { name: "Data pipelines", icon: "pipelines" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "database" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    group: "Automation",
    items: [
      { name: "OpenClaw", icon: "openclaw" },
      { name: "n8n", icon: "n8n" },
      { name: "Webhooks", icon: "webhooks" },
      { name: "API integrations", icon: "apiintegrations" },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "AWS", icon: "aws" },
      { name: "GCP", icon: "gcp" },
      { name: "OCI", icon: "oci" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD", icon: "cicd" },
    ],
  },
  {
    group: "Data & ML",
    items: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Keras", icon: "keras" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Shiny · ggplot2", icon: "chart" },
    ],
  },
];

/* --------------------------------------------------------------------------
   Engineering approach (spec §23)
   -------------------------------------------------------------------------- */

export const approach = {
  heading: "From idea to production.",
  sub: "The same five steps, whether it's an agent, a retrieval system, or a backend service.",
  steps: [
    {
      n: "01",
      title: "Understand",
      body: "Establish the actual business or technical problem, the constraints around it, and what a correct result looks like.",
    },
    {
      n: "02",
      title: "Architect",
      body: "Design the system: data flow, API surface, model interactions, tool boundaries, storage, and infrastructure.",
    },
    {
      n: "03",
      title: "Build",
      body: "Develop the backend, AI components, retrieval, agent logic, and the workflows that connect them.",
    },
    {
      n: "04",
      title: "Integrate",
      body: "Wire in databases, external APIs, tools, agents, and automation, then handle what happens when they fail.",
    },
    {
      n: "05",
      title: "Deploy",
      body: "Containerise, deploy, test against real inputs, and iterate on what the system actually does in production.",
    },
  ],
};

/* --------------------------------------------------------------------------
   Experience (spec §22) — achievement-oriented, resume-accurate.
   -------------------------------------------------------------------------- */

export const experience = [
  {
    company: "Divverse LLC",
    role: "AI Developer",
    mode: "Remote",
    start: "Dec 2023",
    end: "Present",
    current: true,
    summary:
      "Building and deploying agentic AI systems and the backend services around them.",
    bullets: [
      "Built an agentic system with CrewAI that automates client workflows and removes repeated manual steps from day-to-day operations.",
      "Developed a RAG-based chatbot for a med-tech institution, achieving 97% inference accuracy on its evaluation set.",
      "Engineered agentic workflows supporting both linear and dynamic orchestration, so the same runtime handles fixed pipelines and open-ended tasks.",
      "Integrated AI systems with MCP clients and servers to support structured multi-agent communication.",
      "Exposed AI and backend services through REST APIs and shipped them as containerised Docker deployments.",
      "Built a WhatsApp message-delivery workflow with OpenClaw to move operational communication out of manual hands.",
    ],
    tech: ["Python", "CrewAI", "RAG", "MCP", "FastAPI", "REST", "Docker", "OpenClaw"],
  },
  {
    company: "Loubby AI",
    role: "ML/AI Developer",
    mode: "Part-time",
    start: "Dec 2023",
    end: "Jul 2025",
    summary:
      "Shipped two user-facing AI products inside a recruitment platform.",
    bullets: [
      "Engineered Dara, an AI interviewer integrated into the Loubby AI platform to run automated HR assessments end to end.",
      "Collaborated on Jabari, an actionable AI assistant that improves platform navigation and user interaction.",
      "Contributed RAG functionality for better context retrieval across the platform's AI assistants.",
      "Developed multi-user memory systems and optimised assistant memory so context persists correctly per user.",
      "Implemented OpenAI tool calling to make agent actions dynamic, context-aware, and more deterministic.",
    ],
    tech: ["Python", "GPT-4o", "Whisper", "LangChain", "Groq", "RAG", "Tool calling"],
  },
  {
    company: "KnowledgeSquare Foresight",
    role: "Data Analyst",
    mode: "Lagos",
    start: "Jan 2021",
    end: "Oct 2023",
    summary:
      "Owned the data layer and the reporting built on top of it.",
    bullets: [
      "Maintained organisational databases for security, consistency, and reliable day-to-day data operations.",
      "Communicated analytical results to team members and leadership, contributing to a 30% productivity improvement.",
      "Connected MySQL databases to R for data manipulation, analysis, and visualisation.",
      "Developed a performance-monitoring dashboard using Shiny and ggplot2.",
      "Performed reconciliation of reports and payments for centres across 50+ countries.",
    ],
    tech: ["R", "MySQL", "Shiny", "ggplot2", "Data analysis"],
  },
  {
    company: "Fiverr",
    role: "Freelance Data Scientist",
    mode: "Remote",
    start: "Dec 2018",
    end: "Aug 2023",
    summary:
      "Client-facing modelling, analysis, and early LLM assistant work.",
    bullets: [
      "Built machine learning models for price prediction, with reported accuracy above 95%.",
      "Created data pipelines for cleaning and preprocessing client datasets.",
      "Debugged complex code to improve both functionality and statistical correctness.",
      "Conducted statistical analyses and produced research reports using Python and R.",
      "Built AI chatbots and task-oriented AI assistants using LangChain and LLaMA.",
    ],
    tech: ["Python", "R", "Scikit-learn", "LangChain", "LLaMA"],
  },
];

export const education = {
  degree: "B.Tech, Statistics",
  school: "Federal University of Technology, Akure",
  period: "Jan 2014 to Nov 2018",
};

/* --------------------------------------------------------------------------
   GitHub / contact
   -------------------------------------------------------------------------- */

/* Stated plainly on the projects section, because a recruiter who sees no
   repository links will otherwise draw the wrong conclusion. */
export const projectsNote =
  "Most of this work is client software and commercial products running in production, so the source cannot be made public. Where there is a live system, documentation, or a write-up, it is linked on the card, and the case studies go into the architecture and the engineering decisions in full.";

export const githubSection = {
  heading: "Code I can show you.",
  body: "The systems above are client and commercial work, so their repositories are private. GitHub holds independent work: experiments, models, and earlier projects.",
};

export const contact = {
  heading: "Have a problem worth solving?",
  body: "I'm open to AI engineering roles, remote opportunities, contract work, and technically challenging projects involving AI, automation, and software systems.",
  subject: "AI engineering opportunity",
};
