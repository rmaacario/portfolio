/**
 * Knowledge base for the live semantic-search demo.
 * Each entry is embedded in-browser; a visitor's query is embedded the same way
 * and ranked by cosine similarity — a miniature RAG retrieval step.
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
    id: "rag-wiline",
    title: "Production RAG pipelines at WiLine",
    tag: "Production",
    href: "https://connect.wiline.com/",
    text: "Built production-grade chatbots and retrieval-augmented generation pipelines using LangChain, FAISS, and large language models, with custom retrievers connecting vector stores to generation components.",
  },
  {
    id: "doc-automation",
    title: "Multilingual documentation automation",
    tag: "Production",
    text: "Automated multilingual documentation workflows on GitLab using webhooks, DeepL, and LLMs to translate, generate, and keep technical content in sync across languages.",
  },
  {
    id: "nheengatu",
    title: "Nheengatu–Portuguese parallel corpus",
    tag: "Research",
    href: "https://github.com/rmaacario/nhengatu-constitution",
    text: "Built a sentence-aligned bilingual corpus of 5,028 pairs from the Brazilian constitution translated into Nheengatu, an Indigenous low-resource language, to support machine translation and language preservation.",
  },
  {
    id: "americasnlp",
    title: "Fine-tuning NLLB-200 for Indigenous languages",
    tag: "Research",
    href: "https://github.com/rmaacario/americasnlp2026-usp",
    text: "Fine-tuned the NLLB-200 multilingual translation model for Guarani, Wixarika, Nahuatl, and Bribri as part of the AmericasNLP 2026 shared task on low-resource machine translation.",
  },
  {
    id: "thesis",
    title: "LLMs vs. NMT for spatial semantics",
    tag: "Research",
    href: "https://www.teses.usp.br/teses/disponiveis/8/8139/tde-10122024-105745/pt-br.php",
    text: "Master's thesis comparing open-source large language models against neural machine translation systems for translating spatial prepositions in English to Brazilian Portuguese subtitles, evaluated with BLEU, METEOR, BERTScore, COMET, and TER.",
  },
  {
    id: "mt-eval",
    title: "Machine-translation evaluation at Intento",
    tag: "Experience",
    text: "Conducted multilingual machine-translation and AI evaluations, ran assessments for generative tasks like summarization and voice recognition, and automated evaluation pipelines through scripting with Python, spaCy, pandas, and sacreBLEU.",
  },
  {
    id: "bert",
    title: "Fine-tuning BERT for text classification",
    tag: "Open source",
    href: "https://github.com/rmaacario/Fine-Tune-BERT-for-Text-Classification-with-TensorFlow",
    text: "A reproducible walkthrough for fine-tuning BERT on a text-classification task with TensorFlow, covering tokenization, training, and evaluation.",
  },
  {
    id: "ai-agents",
    title: "AI agents: search and reinforcement learning",
    tag: "Open source",
    href: "https://github.com/rmaacario/AI-agents",
    text: "Implemented classic search algorithms and reinforcement-learning techniques such as pathfinding and value iteration from the UC Berkeley artificial intelligence curriculum.",
  },
  {
    id: "phd",
    title: "PhD research at USP",
    tag: "Research",
    text: "Doctoral research in computational linguistics on fine-tuning, prompting, and retrieval-augmented generation for low-resource and Indigenous languages at the University of São Paulo.",
  },
  {
    id: "frontend",
    title: "Frontend and documentation engineering",
    tag: "Experience",
    text: "Extended Docusaurus with custom React, CSS, and JavaScript, integrated analytics, and built chat-based assistance to improve documentation experience and navigation.",
  },
];
