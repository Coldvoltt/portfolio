/* ==========================================================================
   Featured projects.

   Every entry below is drawn from the resume in /public — no invented
   employers, clients, users, metrics, or production claims. Where the resume
   states a *design target* rather than a measured outcome, it is labelled as
   one.

   Projects added through /admin are merged on top of this list at runtime
   and can be exported back here as JSON. See src/lib/projectStore.js.

   SCHEMA
   ------
   slug         string   url segment, unique
   name         string
   tagline      string   one line, what it is
   capability   string   the engineering capability it demonstrates
   status       string   Production | Client Project | Portfolio Project | Prototype
   context      string   where it was built
   year         string
   featured     bool
   contribution string   optional — which parts of a larger system you built
   problem      string
   solution     string
   architecture string[] ordered pipeline stages, rendered as a diagram
   highlights   string[] key technical capabilities
   tech         string[]
   challenges   {title, body}[]
   result       string[]
   lessons      string[]
   links        {github, demo, docs, writeup}
                 demo = live site, writeup = an article about it
   ========================================================================== */

export const seedProjects = [
  {
    slug: "dara-ai-interviewer",
    name: "Dara: AI Interviewer",
    tagline:
      "A multi-stage AI interviewer that conducts and evaluates candidate interviews against a job description, producing transcripts, assessments, and recommendations.",
    capability: "LLM Application · Speech",
    status: "Production",
    context: "Loubby AI",
    year: "2024 to 2025",
    featured: true,
    problem:
      "Early-stage HR screening is high-volume and low-variance: the same structured questions, asked of many candidates, evaluated against the same job description. It consumes a disproportionate amount of recruiter time before any human judgement is genuinely required.",
    solution:
      "A multi-stage interview system integrated into the Loubby AI recruitment platform. It reads the job description and the candidate's resume, conducts a staged interview, transcribes spoken responses with Whisper, and evaluates answers with GPT-4o. Each run produces a full transcript, a structured performance assessment, and an explicit recommendation for the hiring team.",
    architecture: [
      "Job description + resume",
      "Question generation",
      "Interview session",
      "Whisper transcription",
      "GPT-4o evaluation",
      "Transcript · assessment · recommendation",
    ],
    highlights: [
      "Multi-stage interview flow rather than a single prompt/response exchange",
      "Evaluation grounded in the specific job description and candidate resume",
      "Speech-to-text pipeline via the Whisper API",
      "Structured outputs: transcript, performance assessment, recommendation",
      "Integrated into an existing recruitment platform, not a standalone demo",
    ],
    tech: ["Python", "GPT-4o API", "Whisper API", "REST APIs", "Prompt design"],
    challenges: [
      {
        title: "Consistency across candidates",
        body: "An evaluation is only fair if two comparable candidates are scored comparably. Anchoring every stage to the same job-description-derived criteria mattered more than any individual prompt.",
      },
      {
        title: "Structured output from an unstructured conversation",
        body: "Interview answers are discursive. Producing a consistent assessment schema out of them required separating the transcription, evaluation, and recommendation stages rather than asking for everything at once.",
      },
    ],
    result: [
      "Deployed inside the Loubby AI platform to run automated HR assessments.",
      "Designed to reduce HR screening time by ~80% and to support 500+ interviews monthly (design targets defined for the system).",
    ],
    lessons: [
      "Splitting a complex judgement into stages produces far more consistent output than one large prompt, even with a strong model.",
      "For anything evaluative, the schema of the output is a design decision as important as the model choice.",
    ],
    links: {
      github: "",
      demo: "",
      docs: "",
      writeup:
        "https://www.loubby.ai/introducing-dara-your-best-interviewing-assistant/",
    },
  },

  {
    slug: "blox-ai-clinical-assistant",
    name: "Blox AI: Clinical Knowledge Assistant",
    tagline:
      "An API-driven RAG assistant that answers medical practitioners' domain questions strictly from client-supplied documents.",
    capability: "RAG Architecture",
    status: "Client Project",
    context: "Blox Medical",
    year: "2024",
    featured: true,
    problem:
      "Medical practitioners needed answers from a specific, client-owned body of documents. A general-purpose model is the wrong tool here: it answers from training data rather than from the organisation's material, and in a clinical context an unsourced answer is worse than no answer.",
    solution:
      "A retrieval-augmented backend with a clean separation between ingestion, retrieval, and conversation. Administrators upload knowledge documents through a dedicated ingestion endpoint, which triggers embedding and indexing. Chat endpoints then retrieve the relevant document context for each question and use it to ground the model's response, so answers come from the client's own material.",
    architecture: [
      "Admin document upload",
      "Ingestion endpoint",
      "Embedding + indexing",
      "Vector store",
      "Retrieval",
      "Grounded LLM response",
      "Chat API",
    ],
    highlights: [
      "Dedicated ingestion endpoint that triggers embedding and indexing on upload",
      "Retrieval layer that supplies document context to every generation call",
      "Responses grounded in client-provided documents rather than model priors",
      "Ingestion, retrieval, and conversation split into separate concerns",
      "API-driven backend designed for maintainability and scaling",
    ],
    tech: ["Python", "RAG", "Embeddings", "Vector search", "LLM APIs", "REST APIs"],
    challenges: [
      {
        title: "Grounding, not guessing",
        body: "The value of the system is that it only answers from the supplied corpus. Retrieval quality (chunking, embedding, and what gets injected into context) determines that far more than the generation step does.",
      },
      {
        title: "Ingestion as a first-class surface",
        body: "The knowledge base changes. Treating document upload as a proper API endpoint with an indexing trigger, rather than an offline script, made the system operable by the client rather than by me.",
      },
      {
        title: "Separation of concerns",
        body: "Ingestion, retrieval, and chat have different load profiles and different failure modes. Keeping them apart in the architecture kept each one replaceable.",
      },
    ],
    result: [
      "Delivered as an API-driven backend that lets practitioners query a client-owned document base in natural language.",
      "Administrators can extend the knowledge base themselves through the ingestion endpoint.",
    ],
    lessons: [
      "In RAG, most of the engineering effort belongs in retrieval and ingestion. The generation call is the smallest part of the system.",
      "A domain where a wrong answer is costly forces the architecture to be explicit about sourcing from the start.",
    ],
    links: { github: "", demo: "https://bloxmedical.com/", docs: "", writeup: "" },
  },

  {
    slug: "scanledger",
    name: "ScanLedger",
    tagline:
      "Document intake and natural-language analytics for a business data platform: scanned records become structured datasets, and those datasets answer questions in plain English.",
    capability: "OCR · Analytics",
    status: "Production",
    context: "Own product",
    year: "2025",
    featured: true,
    contribution:
      "Built the document scanning / OCR pipeline and the AI analytics layer.",
    problem:
      "A business's records arrive as scans, photographs, and PDFs: readable by a person, useless to a system. Getting them into a form you can query means somebody retyping them. And once the data is finally in, answering a question about it still means knowing how to write the query, which puts the answers out of reach of the people who need them most.",
    solution:
      "Two layers of ScanLedger, an AI-powered business data platform covering documents, inventory, sales, and finances. The intake layer takes a document from upload to structured record: OCR lifts the text off the page, an LLM extracts it against a defined schema rather than free-form, and the result is validated before anything is stored. The analytics layer sits on those datasets and answers questions asked in plain English, grounding each answer in the dataset's schema, precomputed statistics, and sample records, then streaming the response back as it is generated.",
    architecture: [
      "Document upload",
      "OCR",
      "LLM extraction",
      "Schema validation",
      "Structured dataset",
      "Natural-language query",
      "Grounded answer",
    ],
    highlights: [
      "OCR pipeline handling scanned and photographed source documents",
      "LLM extraction constrained to a defined schema, not free-form output",
      "Validation between extraction and storage, so bad reads do not become records",
      "Plain-English questions answered over the extracted datasets: totals, comparisons, trends, anomalies",
      "Answers grounded in dataset schema, precomputed statistics, and sample records",
      "Responses streamed back as they are generated",
    ],
    tech: [
      "Python",
      "FastAPI",
      "OCR",
      "LLM extraction",
      "Structured schema",
      "REST APIs",
      "Analytics",
    ],
    challenges: [
      {
        title: "Real documents are not clean documents",
        body: "Source material is photographed at an angle, creased, or low contrast. The quality of everything downstream is set at the OCR step, so that is where the effort goes, not in the prompt that comes after it.",
      },
      {
        title: "Extraction that is checkable",
        body: "An LLM will happily return a confident, well-formed, wrong field. Extracting against a fixed schema and validating before storage turns a plausible answer into one that can be rejected.",
      },
      {
        title: "Answering questions without hallucinating the data",
        body: "A natural-language answer about a dataset is only useful if the number in it is real. Grounding each response in the dataset's schema and precomputed statistics, rather than letting the model reason over raw rows, keeps the answer tied to what is actually stored.",
      },
      {
        title: "Analytics are only as good as the intake",
        body: "Owning both ends of the pipeline made the dependency obvious: a silently mis-read field does not surface as an error, it surfaces as a slightly wrong answer.",
      },
    ],
    result: [
      "Live in ScanLedger, with the AI chat available on its Pro and Enterprise plans.",
      "Scanned business records become structured datasets that can be questioned in plain English rather than re-keyed and queried by hand.",
    ],
    lessons: [
      "In document AI the model is the easy part. Intake quality and validation decide whether the output can be trusted.",
      "Owning both extraction and analytics is the fastest way to find out how much your analytics depend on your extraction.",
    ],
    links: {
      github: "",
      demo: "",
      docs: "https://scanledgerr.com/docs/ai-chat",
      writeup: "",
    },
  },

  {
    slug: "jabari-action-bot",
    name: "Jabari: Action Bot",
    tagline:
      "An in-product AI assistant that takes actions and navigates platform endpoints through tool calling, rather than only answering questions.",
    capability: "Tool Calling · AI Agents",
    status: "Production",
    context: "Loubby AI",
    year: "2024 to 2025",
    featured: true,
    problem:
      "A chatbot that can only describe what a user should do next adds a step instead of removing one. Inside a recruitment platform with many endpoints and workflows, users needed an assistant that could actually perform the action and navigate them there.",
    solution:
      "An assistant embedded in the recruitment platform, built with LangChain over GPT-4o, capable of navigating platform endpoints and generating job descriptions on request. It was later upgraded to OpenAI tool calling, which made its actions faster and its outputs more deterministic, with Groq used to cut response latency.",
    architecture: [
      "User message",
      "Assistant runtime",
      "Tool selection",
      "Platform endpoints",
      "Action executed",
      "Response to user",
    ],
    highlights: [
      "Endpoint navigation: the assistant performs actions, not just explanations",
      "Job-description generator built into the assistant",
      "Migrated from prompt-driven flow to OpenAI tool calling for determinism",
      "Groq used to improve response time",
      "Multi-user memory so context persists correctly per user",
    ],
    tech: ["Python", "LangChain", "GPT-4o API", "Groq API", "Tool calling"],
    challenges: [
      {
        title: "From describing to doing",
        body: "Moving the assistant from text output to real actions meant defining a tool surface over platform endpoints and deciding what it was allowed to touch.",
      },
      {
        title: "Determinism",
        body: "Tool calling replaced a lot of prompt scaffolding that was producing variable results. The same request now resolves to the same tool invocation.",
      },
      {
        title: "Latency inside a live product",
        body: "An in-product assistant is judged on response time as much as answer quality; routing appropriate work to Groq made it usable in the interface.",
      },
    ],
    result: [
      "Shipped inside the Loubby AI platform as an action-capable assistant.",
      "Tool calling improved both speed and output determinism over the previous prompt-driven approach.",
    ],
    lessons: [
      "Tool calling is not just a feature. It is what converts an assistant from a text generator into part of the application.",
      "Latency is a product requirement for anything embedded in a live interface.",
    ],
    links: {
      github: "",
      demo: "",
      docs: "",
      writeup:
        "https://www.loubby.ai/5-powerful-ai-tools-on-loubby-ai-to-transform-your-hiring-process/",
    },
  },

  {
    slug: "openclaw-delivery-pipeline",
    name: "Automated Result Delivery Pipeline",
    tagline:
      "A webhook that intercepts a finished Dara interview and puts the result on the recruiter's phone, through WhatsApp, Slack, or Telegram.",
    capability: "AI Automation · Delivery",
    status: "Production",
    context: "Divverse LLC",
    year: "2024 to Present",
    featured: true,
    problem:
      "Dara finishes an interview and produces a score, a transcript, and a recommendation. None of that is useful sitting in a database. Somebody still had to go and look, collect it, format it, and forward it to whoever was making the decision, which is exactly the delay the automated interview was supposed to remove. Different organisations also wanted it in different places, so a single hard-coded notification route was useless.",
    solution:
      "A webhook that intercepts the result the moment a Dara interview concludes, assembles the score and summary into a message, and hands it to OpenClaw for delivery. The result lands directly on the recruiter's device, in WhatsApp, Slack, or Telegram, whichever that organisation actually uses. The channel is configuration rather than code, so a new organisation is a settings change and not a new integration.",
    architecture: [
      "Dara interview concludes",
      "Webhook intercept",
      "Score + summary assembled",
      "Routing rules",
      "OpenClaw delivery",
      "WhatsApp · Slack · Telegram",
      "Recruiter's device",
    ],
    highlights: [
      "Webhook fires on interview completion rather than on a schedule or a poll",
      "Candidate scores and summaries reach the recruiter in real time",
      "Delivered to the device the recruiter already works in, not another dashboard to check",
      "Per-organisation channel preferences held as configuration, not code",
      "Multi-channel delivery through OpenClaw: WhatsApp, Slack, Telegram",
      "Also applied to an operational WhatsApp message-delivery workflow",
    ],
    tech: [
      "OpenClaw",
      "Python",
      "Webhooks",
      "REST APIs",
      "WhatsApp",
      "Slack",
      "Telegram",
    ],
    challenges: [
      {
        title: "Catching the result at the right moment",
        body: "Polling for finished interviews is wasteful and always late. Intercepting on a webhook means the delivery starts the instant the interview concludes, which is what makes it feel immediate to the recruiter.",
      },
      {
        title: "Flexibility without a rewrite per client",
        body: "Hard-coding a channel means a new integration for every organisation. Making delivery configuration rather than code kept one pipeline serving all of them.",
      },
      {
        title: "Third-party messaging fails in its own ways",
        body: "Each platform has its own constraints and failure behaviour, so the pipeline treats delivery as something that can fail and be retried rather than assuming the happy path.",
      },
    ],
    result: [
      "Interview results reach recruiters on their own devices in real time, with no manual collection or forwarding step.",
      "Each organisation receives results through the channel it already uses, set by configuration.",
    ],
    lessons: [
      "Automation earns its value at the last mile: getting the output to the right person is often the part still being done by hand.",
      "Delivering into a tool someone already has open beats building another place for them to go and check.",
    ],
    links: { github: "", demo: "", docs: "", writeup: "" },
  },
];

/* --------------------------------------------------------------------------
   Data & ML work — deliberately secondary (spec §20). Kept as a compact list
   so it supports the AI engineering identity without competing with it.
   -------------------------------------------------------------------------- */

export const dataWork = [
  {
    title: "Price prediction models",
    detail:
      "Machine learning models built for freelance clients, with reported accuracy above 95%.",
    tech: "Python · Scikit-learn",
  },
  {
    title: "Performance monitoring dashboard",
    detail:
      "An operational dashboard for tracking organisational performance, built on a live MySQL source.",
    tech: "R · Shiny · ggplot2",
  },
  {
    title: "Multi-country reconciliation",
    detail:
      "Reconciliation of reports and payments for centres across 50+ countries.",
    tech: "MySQL · R",
  },
  {
    title: "Statistical research reporting",
    detail:
      "Statistical analyses and research reports produced for client research work.",
    tech: "Python · R",
  },
];

export const STATUS_OPTIONS = [
  "Production",
  "Client Project",
  "Independent Project",
  "Portfolio Project",
  "Prototype",
];
