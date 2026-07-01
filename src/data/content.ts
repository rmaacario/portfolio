/**
 * Single source of truth for the portfolio content.
 * Edit values here — every section reads from this file.
 */

export const site = {
  name: "Rafael Macário Fernandes",
  shortName: "Rafael Macário",
  role: "NLP Engineer · Computational Linguist",
  // One-line value proposition shown in the hero.
  tagline:
    "I build and evaluate LLM, RAG, and machine-translation systems — with the same rigor for low-resource and Indigenous languages.",
  // Longer paragraph for the about / intro block.
  intro:
    "NLP Engineer and PhD candidate in Computational Linguistics at the University of São Paulo. I build and evaluate production-grade chatbots, RAG pipelines, and machine-translation systems — measuring faithfulness, hallucination, and translation quality. My research focuses on cross-lingual transfer between Brazilian Portuguese and low-resource Indigenous languages such as Nheengatu.",
  location: "São Paulo, Brazil",
  email: "rafael.macario@usp.br",
  resumeUrl: "/resume-rafael-fernandes.pdf",
  // Drop a square photo at /public/me.jpg (or change the name). Falls back to a
  // monogram if the file is missing.
  photo: "me.jpg",
  initials: "RMF",
  available: true,
  availability: "Open to opportunities",
  // Used for SEO / Open Graph.
  url: "https://rmaacario.github.io",
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "C2" },
    { name: "Spanish", level: "B2" },
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/rmaacario", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rafaelmacariofernandes/",
    icon: "linkedin",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=OoIPg3AAAAAJ&hl=en",
    icon: "scholar",
  },
  {
    label: "ACL Anthology",
    href: "https://aclanthology.org/people/r/rafael-fernandes/",
    icon: "book",
  },
  { label: "Email", href: "mailto:rafael.macario@usp.br", icon: "mail" },
];

export type LinkType = "github" | "colab" | "paper" | "site" | "demo";
export type ProjectLink = { label: string; href: string; type: LinkType };

// A card visual: either a real image, or a generated motif drawn in SVG.
export type Cover =
  | { type: "image"; src: string; alt: string; pos?: string }
  | { type: "collage"; srcs: string[]; alt: string }
  | { type: "logo"; src: string; alt: string }
  | { type: "motif"; motif: "corpus" | "finetune" | "mteval" | "rag" | "bert" | "agents" };

export type Project = {
  title: string;
  blurb: string;
  // Short tag shown on the card (e.g. "Research", "Production").
  kind: "Research" | "Production" | "Open source";
  year: string;
  tags: string[];
  cover: Cover;
  // Optional highlighted metric, e.g. "5,028 sentence pairs".
  metric?: string;
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Cross-lingual transfer: Portuguese ↔ Nheengatu",
    kind: "Research",
    year: "2025",
    blurb:
      "Built a 5,028-pair Portuguese–Nheengatu parallel corpus from the Brazilian constitution, then ran four cross-lingual experiments — Word2Vec, fastText, Procrustes/VecMap alignment, and fine-tuned XLM-R — for this Indigenous low-resource language. Fine-tuning lifted cross-lingual sentence retrieval to P@1 24.7% / MRR 0.37, a 22× gain over zero-shot.",
    metric: "5,028 aligned pairs · fine-tuned XLM-R · P@1 24.7%",
    tags: ["Cross-lingual transfer", "XLM-R", "Corpus", "Low-resource", "Evaluation"],
    cover: { type: "motif", motif: "corpus" },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rmaacario/nhengatu-constitution",
        type: "github",
      },
      {
        label: "Open in Colab",
        href: "https://colab.research.google.com/github/rmaacario/nhengatu-constitution",
        type: "colab",
      },
    ],
    featured: true,
  },
  {
    title: "USP at AmericasNLP 2026 — culturally-aware captioning",
    kind: "Research",
    year: "2026",
    blurb:
      "Sole-author system (ACL 2026, San Diego) for culturally-aware image captioning across 5 Indigenous languages — Guaraní, Nahuatl, Wixárika, Maya Yucateco, and Bribri. A two-stage pipeline pairs a vision-language model (Qwen3-VL) under cultural prompting with fine-tuned NLLB-200, exposing tokenizer gaps and domain-fit effects.",
    metric: "Guaraní — 3rd place in human evaluation (of 8 teams)",
    tags: ["Qwen3-VL", "NLLB-200", "Fine-tuning", "Hugging Face", "Low-resource"],
    cover: {
      type: "image",
      src: "covers/americasnlp-banner.png",
      alt: "First Workshop on NLP for Indigenous Languages of the Americas",
      pos: "right center",
    },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rmaacario/americasnlp2026-usp",
        type: "github",
      },
      { label: "Poster", href: "banners/americasnlp-poster.png", type: "paper" },
      {
        label: "Open in Colab",
        href: "https://colab.research.google.com/github/rmaacario/americasnlp2026-usp",
        type: "colab",
      },
    ],
    featured: true,
  },
  {
    title: "Production RAG chatbots for WiLine's products",
    kind: "Production",
    year: "2025",
    blurb:
      "Production retrieval-augmented chatbots I build end to end for WiLine — both the public in-product assistants on the product sites and the internal RAG bots that answer over the company's internal documentation. Custom retrievers connect a FAISS vector store to LLMs on LangChain for grounded, cited answers, shipped as live chat widgets.",
    tags: ["RAG", "LangChain", "FAISS", "LLMs", "Vector search", "Chatbots"],
    cover: {
      type: "collage",
      srcs: ["covers/connect-bot.png", "covers/internal-bot-1.jpg"],
      alt: "WiLine AI assistants — public product bot and internal-documentation bot",
    },
    links: [
      { label: "Try it on Connect", href: "https://connect.wiline.com/", type: "site" },
      { label: "Try it on SD-WAN", href: "https://sd-wan.wiline.com/", type: "site" },
    ],
    featured: true,
  },
  {
    title: "Evaluating RAG systems for hallucinations",
    kind: "Production",
    year: "2026",
    blurb:
      "WiLine technical white paper: a multi-signal framework that detects hallucinations in RAG chatbots using natural-language inference, semantic similarity, and faithfulness scoring — turning quality signals into a production trust layer.",
    tags: ["RAG", "Hallucination detection", "NLI", "Faithfulness", "Evaluation"],
    cover: { type: "motif", motif: "rag" },
    links: [
      {
        label: "Read the white paper",
        href: "https://wec.wiline.com/resources/rag-hallucination-eval",
        type: "paper",
      },
    ],
    featured: true,
  },
  {
    title: "Fine-tune BERT for text classification",
    kind: "Open source",
    year: "2023",
    blurb:
      "A clean, reproducible walkthrough for fine-tuning BERT on a text-classification task with TensorFlow — from tokenization to evaluation.",
    tags: ["BERT", "TensorFlow", "Classification"],
    cover: { type: "motif", motif: "bert" },
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rmaacario/Fine-Tune-BERT-for-Text-Classification-with-TensorFlow",
        type: "github",
      },
      {
        label: "Open in Colab",
        href: "https://colab.research.google.com/github/rmaacario/Fine-Tune-BERT-for-Text-Classification-with-TensorFlow",
        type: "colab",
      },
    ],
  },
  {
    title: "PyStrips — classical PDDL/STRIPS planner",
    kind: "Open source",
    year: "2023",
    blurb:
      "A heuristic forward-search planner for PDDL/STRIPS based on the HSP framework: parses a domain and problem, grounds the actions, and solves with progression search using h_add, h_max, or FastForward (h_ff) heuristics.",
    tags: ["Python", "PDDL/STRIPS", "Heuristic search", "Planning"],
    cover: { type: "motif", motif: "agents" },
    links: [
      { label: "GitHub", href: "https://github.com/rmaacario/AI-agents", type: "github" },
    ],
  },
];

// Brand-logo wall (logos live in /public/logos, generated from simple-icons).
// `dark` flags logos that are near-black/very dark and need lightening in dark mode.
export type TechLogo = { name: string; slug: string; dark?: boolean };
export const techStack: { group: string; items: TechLogo[] }[] = [
  {
    group: "Agentic AI & LLMs",
    items: [
      { name: "LangChain", slug: "langchain", dark: true },
      { name: "LangGraph", slug: "langgraph" },
      { name: "MCP", slug: "mcp" },
      { name: "Claude", slug: "claude" },
      { name: "OpenAI", slug: "openai", dark: true },
      { name: "Gemini", slug: "googlegemini" },
      { name: "Ollama", slug: "ollama", dark: true },
    ],
  },
  {
    group: "RAG & inference",
    items: [
      { name: "FAISS", slug: "faiss" },
      { name: "Milvus", slug: "milvus" },
      { name: "LlamaIndex", slug: "llamaindex" },
      { name: "vLLM", slug: "vllm" },
      { name: "LightLLM", slug: "lightllm" },
      { name: "Hugging Face", slug: "huggingface" },
    ],
  },
  {
    group: "ML & NLP",
    items: [
      { name: "PyTorch", slug: "pytorch" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "Keras", slug: "keras" },
      { name: "spaCy", slug: "spacy" },
      { name: "scikit-learn", slug: "scikitlearn" },
    ],
  },
  {
    group: "Data & notebooks",
    items: [
      { name: "Python", slug: "python" },
      { name: "pandas", slug: "pandas", dark: true },
      { name: "NumPy", slug: "numpy", dark: true },
      { name: "SciPy", slug: "scipy" },
      { name: "Jupyter", slug: "jupyter" },
      { name: "Colab", slug: "googlecolab" },
      { name: "Kaggle", slug: "kaggle" },
      { name: "R", slug: "r" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "FastAPI", slug: "fastapi" },
      { name: "Flask", slug: "flask", dark: true },
      { name: "Pydantic", slug: "pydantic" },
      { name: "Streamlit", slug: "streamlit" },
      { name: "Docker", slug: "docker" },
      { name: "Git", slug: "git" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Astro", slug: "astro" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Vite", slug: "vite" },
      { name: "HTML5", slug: "html5" },
      { name: "CSS", slug: "css" },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "NLP Engineer",
    company: "WiLine Networks",
    location: "Princeton, US · Remote",
    period: "May 2025 — Present",
    points: [
      "Built production chatbots and scalable RAG pipelines on LangChain, FAISS, and LLMs — with custom retrievers and APIs into high-availability services.",
      "Designed a multi-signal framework to detect RAG hallucinations (NLI, semantic similarity, faithfulness scoring), published as a WiLine technical white paper.",
      "Automated multilingual documentation pipelines on GitLab using webhooks, DeepL, and LLMs.",
    ],
    stack: ["LangChain", "FAISS", "RAG", "Evaluation", "FastAPI", "Conversational AI"],
  },
  {
    role: "Technical Writer",
    company: "WiLine Networks",
    location: "Princeton, US · Remote",
    period: "Sep 2024 — May 2025",
    points: [
      "Developed and maintained clear, multilingual product documentation with Docusaurus.",
      "Extended Docusaurus with custom React/CSS/JavaScript and chat-based assistance.",
      "Integrated Google Analytics and Tag Manager to track engagement and optimize content.",
    ],
    stack: ["React.js", "Docusaurus", "JavaScript", "Documentation UX", "Analytics"],
  },
  {
    role: "Linguist Analyst",
    company: "Intento, Inc.",
    location: "San Francisco, US · Remote",
    period: "May 2024 — Sep 2024",
    points: [
      "Ran multilingual machine-translation and AI evaluations across generative tasks — summarization, speech recognition, and more.",
      "Built and automated evaluation pipelines, scripting repetitive QA steps in Python.",
      "Delivered benchmarking reports and improvement proposals adopted by client-facing teams.",
    ],
    stack: ["MT/AI evaluation", "spaCy", "pandas", "sacreBLEU", "Prompt engineering"],
  },
];

export const education = [
  {
    school: "University of São Paulo (USP)",
    degree: "PhD in Computational Linguistics",
    period: "2024 — Present",
    detail:
      "Cross-lingual transfer from Portuguese to Nheengatu, using contact-induced language convergence as a computational bridge for low-resource Indigenous NLP.",
  },
  {
    school: "University of São Paulo (USP)",
    degree: "MA in Computational Linguistics",
    period: "2022 — 2024",
    detail:
      "Open-source LLMs versus neural machine translation for spatial prepositions in EN→PT-br subtitles, evaluated with BLEU, METEOR, BERTScore, COMET and TER.",
  },
];

export const research = [
  {
    title: "Master's thesis — USP",
    logo: "brand/usp.png",
    blurb:
      "“Open-Source LLMs vs. NMT Systems: Translating Spatial Language in EN–PT-br Subtitles.” Corpus-based study with BLEU, METEOR, BERTScore, COMET, TER and manual error analysis.",
    href: "https://teses.usp.br/teses/disponiveis/8/8139/tde-10122024-105745/en.html",
    cta: "Read the thesis",
  },
  {
    title: "ACL Anthology profile",
    logo: "brand/acl.svg",
    blurb:
      "Peer-reviewed publications on linguistic quality assessment, machine-translation evaluation, and multilingual NLP.",
    href: "https://aclanthology.org/people/r/rafael-fernandes/",
    cta: "View publications",
  },
  {
    title: "Google Scholar",
    logo: "brand/scholar.png",
    blurb:
      "Citations, co-authorships, and research visibility across NLP, LQA, and MT evaluation.",
    href: "https://scholar.google.com/citations?user=OoIPg3AAAAAJ&hl=en",
    cta: "Visit profile",
  },
];

// Technical writing — the WiLine Edge Cloud (WEC) docs site, hands-on AI
// tutorials, and the AI News newsletter. Rafael owns this end to end: he builds
// and styles the docs site itself, writes every guide, and ships the assistant.
export type Article = {
  title: string;
  href: string;
  blurb: string;
  level?: "Beginner" | "Intermediate";
  part?: string;
  read?: string;
  // True while a guide is still in the publishing pipeline — links to the hub
  // instead of a dead deep link, and shows a "soon" marker.
  upcoming?: boolean;
  // Surfaced in the portfolio's concise "featured guides" list. The full set
  // lives on the docs site, reached via the "see all" link.
  featured?: boolean;
};

export type WritingSeries = {
  name: string;
  kind: "Tutorial series" | "Newsletter";
  blurb: string;
  articles: Article[];
};

export const writing = {
  eyebrow: "WiLine Edge Cloud · WEC",
  title: "Docs & tutorials",
  // Lead statement — the top-to-bottom ownership message.
  lead: "WiLine Edge Cloud's documentation, owned end to end — the Docusaurus site (React/CSS), every guide, and the in-product AI assistant. The tutorials below are run from scratch on a real box: the actual commands, versions, and the fixes for what breaks.",
  hubUrl: "https://wec.wiline.com/docs",
  tutorialsUrl: "https://wec.wiline.com/docs/tutorials/",
  newsUrl: "https://wec.wiline.com/docs/news/",
  // The documentation platforms Rafael builds and owns. Each renders as a
  // browser-framed preview in the Writing section (visuals are hand-built in
  // the component, keyed by id — no screenshots to go stale).
  sites: [
    {
      id: "wec",
      name: "WiLine Edge Cloud",
      tagline: "The only AI-first Edge Cloud",
      desc: "AI-first edge cloud — the docs, tutorials, and AI News all live here.",
      href: "https://wec.wiline.com/docs",
      host: "wec.wiline.com/docs",
    },
    {
      id: "sdwan",
      name: "WiLine SD-WAN",
      tagline: "Deploy, manage, and scale your network",
      desc: "Software-defined networking — guides, references, and release notes.",
      href: "https://sd-wan.wiline.com",
      host: "sd-wan.wiline.com",
    },
    {
      id: "connect",
      name: "WiLine Connect",
      tagline: "How can we help?",
      desc: "Voice, video, and messaging — setup guides and feature how-tos.",
      href: "https://connect.wiline.com",
      host: "connect.wiline.com",
    },
  ],
  series: [
    {
      name: "AI tutorials",
      kind: "Tutorial series",
      blurb:
        "Self-hosting AI, end to end — evaluation harnesses, agents with persistent memory, and the infra to run them. Every guide run from scratch on a real box, with the actual commands and the fixes for what breaks.",
      articles: [
        {
          level: "Intermediate",
          read: "14 min read",
          title: "Evaluate your models with Promptfoo on the WEC Inference API",
          blurb:
            "A full evaluation harness — assertions, latency guardrails, JSON-schema checks, model-graded rubrics, and a CI gate.",
          href: "https://wec.wiline.com/docs/tutorials/eval-models-promptfoo-wiline-inference/",
        },
        {
          level: "Beginner",
          read: "12 min read",
          title: "Deploy OpenClaw on a WEC instance via Docker Compose",
          blurb:
            "Fresh instance to a self-hosted agent that actually answers — with every real error and fix from a live deploy.",
          href: "https://wec.wiline.com/docs/tutorials/deploy-openclaw-docker-compose/",
        },
        {
          level: "Intermediate",
          read: "13 min read",
          title: "Self-host the Hermes Agent with persistent memory",
          blurb:
            "Real install, model config, and SQLite-backed memory — with a test that proves it survives a full restart.",
          href: "https://wec.wiline.com/docs/tutorials/self-host-hermes-agent/",
        },
      ],
    },
    {
      name: "AI News",
      kind: "Newsletter",
      blurb:
        "Short, high-signal reads on what's changing in AI infrastructure — new tools, releases, and shifts, with a plain take on what each means if you self-host.",
      articles: [
        {
          read: "4 min read",
          title: "GLM-5.2: the only open-weight model in the top 10 — and you can run it on WEC",
          blurb:
            "The lone open-weight, MIT-licensed model holding its own against the proprietary frontier — 1M-token context, top open-source coding scores.",
          href: "https://wec.wiline.com/docs/news/glm-5-2-open-weight-top-10/",
        },
        {
          read: "5 min read",
          title: "Why LiteLLM is rewriting its gateway in Rust — and why AI developers should care",
          blurb:
            "AI gateways are becoming critical infrastructure — with real consequences for latency, cost, and reliability.",
          href: "https://wec.wiline.com/docs/news/litellm-rust-gateway/",
        },
      ],
    },
  ] satisfies WritingSeries[],
};

// Optional feature banner (e.g. your ACL conference banner). Set `src` once the
// image is in /public; leave src empty to hide the block.
export const featureBanner = {
  src: "banners/americasnlp-poster.png",
  alt: "USP at AmericasNLP 2026 — Culturally-Aware Image Captioning for Indigenous Languages",
  eyebrow: "Latest · ACL 2026, San Diego",
  caption:
    "USP at AmericasNLP 2026 — culturally-aware image captioning for 5 Indigenous languages, with a Qwen3-VL → fine-tuned NLLB-200 pipeline.",
  href: "https://github.com/rmaacario/americasnlp2026-usp",
};

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "LLM & NLP",
    items: [
      "LangChain",
      "RAG",
      "FAISS",
      "Hugging Face",
      "Transformers",
      "spaCy",
      "Ollama",
      "Prompt engineering",
      "Fine-tuning",
    ],
  },
  {
    label: "Backend & tooling",
    items: ["Python", "FastAPI", "Flask", "Docker", "Git / GitLab", "Shell", "REST APIs"],
  },
  {
    label: "Research & data",
    items: [
      "Machine translation",
      "MT evaluation (sacreBLEU, COMET)",
      "pandas",
      "NumPy",
      "scikit-learn",
      "TensorFlow",
      "R (tidyverse, ggplot2)",
    ],
  },
  {
    label: "Frontend",
    items: ["React.js", "Node.js", "Vite", "Astro", "TypeScript", "HTML / CSS"],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Demo", href: "#demo" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];
