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
    "NLP Engineer and PhD candidate in Computational Linguistics at the University of São Paulo. I design and evaluate production-grade chatbots, retrieval-augmented generation pipelines, and machine-translation systems — measuring faithfulness, hallucination, and translation quality while bridging linguistic theory and scalable engineering. My research focuses on cross-lingual transfer and language-contact effects between Brazilian Portuguese and low-resource Indigenous languages such as Nheengatu.",
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
    title: "WiLine product documentation — platforms, sites & chatbot",
    kind: "Production",
    year: "2025",
    blurb:
      "End-to-end ownership of WiLine's product documentation across the company's products: writing the docs, building and styling the sites themselves (Docusaurus + React/CSS), and building the in-product assistant — production RAG with custom retrievers on LangChain + FAISS, plus automated multilingual documentation workflows (webhooks + DeepL + LLMs).",
    tags: ["Docusaurus", "React", "LangChain", "FAISS", "RAG", "Technical writing"],
    cover: {
      type: "image",
      src: "covers/wiline-connect.png",
      alt: "WiLine Connect documentation portal",
    },
    links: [
      { label: "Connect portal", href: "https://connect.wiline.com/", type: "site" },
      { label: "SD-WAN portal", href: "https://sd-wan.wiline.com/", type: "site" },
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
  { label: "Contact", href: "#contact" },
];
