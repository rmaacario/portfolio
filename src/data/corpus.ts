/**
 * Knowledge base for the "Ask my portfolio" chatbot.
 * Each entry is embedded in-browser; a visitor's question is embedded the same
 * way and the top matches are retrieved and sent (as grounding context) to the
 * answer model — a real RAG pipeline. Keep entries factual and specific.
 */
export type Doc = {
  id: string;
  title: string;
  text: string;
  tag: string;
  href?: string;
};

export const corpus: Doc[] = [
  {
    id: "about",
    title: "Who Rafael is",
    tag: "About",
    text: "Rafael Macário Fernandes is an NLP Engineer and a PhD candidate in Computational Linguistics at the University of São Paulo (USP), based in São Paulo, Brazil. He builds and evaluates production chatbots, retrieval-augmented generation (RAG) pipelines, and machine-translation systems — with a focus on low-resource and Indigenous languages. He speaks Portuguese (native), English (C2), and Spanish (B2).",
  },
  {
    id: "role-wiline",
    title: "NLP Engineer at WiLine Networks",
    tag: "Experience",
    text: "Since May 2025 Rafael is an NLP Engineer at WiLine Networks (Princeton, US · remote). He builds production chatbots and scalable RAG pipelines on LangChain, FAISS, and LLMs, wiring custom retrievers and APIs into high-availability services (FastAPI). He designed a multi-signal framework to detect RAG hallucinations, and automated multilingual documentation pipelines on GitLab with webhooks, DeepL, and LLMs.",
  },
  {
    id: "rag-chatbots",
    title: "Production RAG chatbots at WiLine",
    tag: "Production",
    href: "https://connect.wiline.com/",
    text: "Rafael builds WiLine's production retrieval-augmented chatbots end to end — both the public in-product assistants embedded on the product sites (Connect, SD-WAN, WiLine Edge Cloud) and internal RAG bots that answer over the company's internal documentation. Custom retrievers connect a FAISS vector store to LLMs on LangChain, returning grounded, cited answers, shipped as live chat widgets visitors can actually use.",
  },
  {
    id: "rag-eval",
    title: "Evaluating RAG systems for hallucinations",
    tag: "Production",
    href: "https://wec.wiline.com/resources/rag-hallucination-eval",
    text: "Rafael designed and published a multi-signal framework that detects hallucinations in RAG chatbots using natural-language inference (NLI), semantic similarity, and faithfulness scoring — turning quality signals into a production trust layer. It was released as a WiLine technical white paper.",
  },
  {
    id: "doc-automation",
    title: "Multilingual documentation automation",
    tag: "Production",
    text: "Rafael automated multilingual documentation workflows on GitLab using webhooks, DeepL, and LLMs to translate, generate, and keep technical content in sync across languages.",
  },
  {
    id: "role-techwriter",
    title: "Technical Writer at WiLine Networks",
    tag: "Experience",
    text: "From September 2024 to May 2025 Rafael was a Technical Writer at WiLine Networks (remote). He developed and maintained clear, multilingual product documentation with Docusaurus, extended the docs sites with custom React/CSS/JavaScript and chat-based assistance, and integrated Google Analytics and Tag Manager to track engagement and optimize content.",
  },
  {
    id: "role-intento",
    title: "Linguist Analyst at Intento",
    tag: "Experience",
    text: "From May to September 2024 Rafael was a Linguist Analyst at Intento, Inc. (San Francisco, remote). He ran multilingual machine-translation and AI evaluations across generative tasks such as summarization and speech recognition, built and automated evaluation pipelines in Python (spaCy, pandas, sacreBLEU), and delivered benchmarking reports and improvement proposals adopted by client-facing teams.",
  },
  {
    id: "phd",
    title: "PhD research at USP",
    tag: "Research",
    text: "Rafael's doctoral research (USP, 2024–present) is on cross-lingual transfer from Portuguese to Nheengatu, using contact-induced language convergence as a computational bridge for low-resource Indigenous NLP. It centers on transfer learning and language-contact effects rather than prompting.",
  },
  {
    id: "cross-lingual",
    title: "Cross-lingual transfer: Portuguese ↔ Nheengatu",
    tag: "Research",
    href: "https://github.com/rmaacario/nhengatu-constitution",
    text: "Rafael built a 5,028-pair Portuguese–Nheengatu parallel corpus from the Brazilian constitution, then ran four cross-lingual experiments — Word2Vec, fastText, Procrustes/VecMap alignment, and fine-tuned XLM-R — for this Indigenous low-resource language. Fine-tuning lifted cross-lingual sentence retrieval to P@1 24.7% / MRR 0.37, a 22× gain over zero-shot.",
  },
  {
    id: "americasnlp",
    title: "USP at AmericasNLP 2026 — culturally-aware captioning",
    tag: "Research",
    href: "https://github.com/rmaacario/americasnlp2026-usp",
    text: "Rafael's sole-author system for the AmericasNLP 2026 shared task (ACL 2026, San Diego) does culturally-aware image captioning across five Indigenous languages — Guaraní, Nahuatl, Wixárika, Maya Yucateco, and Bribri. A two-stage pipeline pairs a vision-language model (Qwen3-VL) under cultural prompting with a fine-tuned NLLB-200, exposing tokenizer gaps and domain-fit effects. It placed 3rd in human evaluation out of 8 teams.",
  },
  {
    id: "thesis",
    title: "Master's thesis — LLMs vs NMT for spatial language",
    tag: "Research",
    href: "https://teses.usp.br/teses/disponiveis/8/8139/tde-10122024-105745/en.html",
    text: "Rafael's MA thesis (USP, 2022–2024), “Open-Source LLMs vs. NMT Systems: Translating Spatial Language in EN–PT-br Subtitles,” compares open-source large language models against neural machine translation for translating spatial prepositions from English to Brazilian Portuguese subtitles, evaluated with BLEU, METEOR, BERTScore, COMET, and TER plus manual error analysis.",
  },
  {
    id: "bert",
    title: "Fine-tuning BERT for text classification",
    tag: "Open source",
    href: "https://github.com/rmaacario/Fine-Tune-BERT-for-Text-Classification-with-TensorFlow",
    text: "A reproducible walkthrough for fine-tuning BERT on a text-classification task with TensorFlow, covering tokenization, training, and evaluation.",
  },
  {
    id: "pystrips",
    title: "PyStrips — classical PDDL/STRIPS planner",
    tag: "Open source",
    href: "https://github.com/rmaacario/AI-agents",
    text: "A heuristic forward-search planner for PDDL/STRIPS based on the HSP framework: it parses a domain and problem, grounds the actions, and solves with progression search using the h_add, h_max, or FastForward (h_ff) heuristics.",
  },
  {
    id: "docs-eng",
    title: "Documentation engineering — WiLine Edge Cloud",
    tag: "Experience",
    href: "https://wec.wiline.com/docs",
    text: "Rafael owns WiLine Edge Cloud's documentation end to end: he designs and builds the Docusaurus docs sites themselves (React/CSS/JavaScript), writes every guide, and ships the in-product AI assistant. He builds and writes three documentation platforms — WiLine Edge Cloud (WEC), SD-WAN, and Connect — each with its own product identity.",
  },
  {
    id: "tutorials",
    title: "Hands-on AI tutorials",
    tag: "Writing",
    href: "https://wec.wiline.com/docs/tutorials/",
    text: "Rafael writes hands-on, self-hosting AI tutorials run from scratch on a real box: building an LLM evaluation harness with Promptfoo against the WEC Inference API (assertions, latency guardrails, JSON-schema checks, model-graded rubrics, a CI gate); deploying the OpenClaw agent via Docker Compose; and self-hosting the Nous Research Hermes agent with SQLite-backed memory that survives a reboot.",
  },
  {
    id: "ai-news",
    title: "AI News newsletter",
    tag: "Writing",
    href: "https://wec.wiline.com/docs/news/",
    text: "Rafael writes AI News, a newsletter of short, high-signal reads on what's changing in AI infrastructure — new tools, releases, and shifts — with a plain take on what each means if you self-host, covering topics like open-weight models (GLM-5.2) and AI gateways (LiteLLM's Rust rewrite).",
  },
  {
    id: "skills",
    title: "Skills and tech stack",
    tag: "Skills",
    text: "Rafael's stack spans NLP and LLM engineering (RAG, LangChain, FAISS, fine-tuning, embeddings, transformers, prompt engineering, Hugging Face, spaCy, PyTorch/TensorFlow), MT evaluation (BLEU, METEOR, BERTScore, COMET, TER, sacreBLEU), back-end (Python, FastAPI, APIs, Docker, GitLab CI), and front-end (React, JavaScript, CSS, Docusaurus, Astro). He both builds and rigorously evaluates systems.",
  },
  {
    id: "education",
    title: "Education",
    tag: "Education",
    text: "Rafael is doing a PhD in Computational Linguistics at the University of São Paulo (USP, 2024–present) and holds an MA in Computational Linguistics from USP (2022–2024). His work bridges linguistic theory and scalable engineering.",
  },
  {
    id: "focus",
    title: "What Rafael can build for you",
    tag: "Skills",
    text: "Rafael can build production RAG chatbots and assistants over your documents (LangChain + FAISS + LLMs with custom retrievers and cited answers), evaluation harnesses that measure faithfulness, hallucination, and translation quality, machine-translation and fine-tuning pipelines for low-resource languages, and the front-end and documentation around them. He is open to NLP and AI engineering opportunities.",
  },
  {
    id: "contact",
    title: "Contact and links",
    tag: "Contact",
    href: "https://github.com/rmaacario",
    text: "Rafael is based in São Paulo, Brazil and is open to opportunities. You can reach him by email and find his work on GitHub (github.com/rmaacario), LinkedIn, Google Scholar, and the ACL Anthology. Use the Contact section of this site to get in touch.",
  },
];
