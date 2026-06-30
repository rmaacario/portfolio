import { useCallback, useEffect, useRef, useState } from "react";
import { corpus, type Doc } from "../data/corpus";
import "./ChatBot.css";

type Source = Doc & { score: number };
type Turn = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  streaming?: boolean;
  fallback?: boolean;
  welcome?: boolean;
};

const MODEL = "Xenova/all-MiniLM-L6-v2";
// Set in .env as PUBLIC_CHAT_ENDPOINT once the Cloudflare Worker is deployed.
const CHAT_ENDPOINT = import.meta.env.PUBLIC_CHAT_ENDPOINT as string | undefined;
const TOP_K = 4;

const WELCOME =
  "Puranga ára! 👋 (that's “good day” in Nheengatu) I'm Rafael's assistant 🌿 Ask me anything about his experience, research, or what he can build for you — every answer is grounded in his portfolio, with sources you can check.";

const EXAMPLES = [
  "What does Rafael do?",
  "Tell me about his work on Indigenous languages",
  "Can he build a chatbot over my documents?",
  "How does he evaluate machine-translation quality?",
];

// Compact robot mascot for the chat header and assistant bubbles —
// the same friendly bot as the big mascot, in the Amazonian palette.
function BotAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="cb-mascot"
    >
      <defs>
        <linearGradient id="avBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0875a" />
          <stop offset="1" stopColor="#a8481f" />
        </linearGradient>
      </defs>
      <line x1="20" y1="12" x2="20" y2="7" stroke="#2f7d52" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="20" cy="5.5" r="2.4" fill="#2f7d52" />
      <rect x="4" y="18" width="5" height="9" rx="2.5" fill="#2f7d52" />
      <rect x="31" y="18" width="5" height="9" rx="2.5" fill="#2f7d52" />
      <path d="M13 31 L13 36 L18 32 Z" fill="#a8481f" />
      <rect x="8" y="12" width="24" height="20" rx="6" fill="url(#avBody)" />
      <circle cx="15" cy="21" r="2.3" fill="#fbf3ea" />
      <circle cx="25" cy="21" r="2.3" fill="#fbf3ea" />
      <path d="M15 26 Q20 29.5 25 26" fill="none" stroke="#fbf3ea" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function cosine(a: number[], b: number[]): number {
  // Model output is L2-normalized, so dot product = cosine similarity.
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

// Used when the model can't load (offline / blocked CDN).
function keywordRank(query: string): Source[] {
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
  return corpus
    .map((d) => {
      const hay = (d.title + " " + d.text).toLowerCase();
      const score =
        terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0) /
        Math.max(terms.length, 1);
      return { ...d, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);
}

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([
    { role: "assistant", content: WELCOME, welcome: true },
  ]);
  const [loadingModel, setLoadingModel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);

  const extractor = useRef<any>(null);
  const docVecs = useRef<number[][] | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loadingModel]);

  const embed = useCallback(async (texts: string[]): Promise<number[][]> => {
    const out = await extractor.current(texts, { pooling: "mean", normalize: true });
    return out.tolist();
  }, []);

  const ensureModel = useCallback(async () => {
    if (extractor.current && docVecs.current) return true;
    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      setLoadingModel(true);
      extractor.current = await pipeline("feature-extraction", MODEL, {
        progress_callback: (p: any) => {
          if (p.status === "progress" && p.total) {
            setProgress(Math.round((p.loaded / p.total) * 100));
          }
        },
      });
      docVecs.current = await embed(corpus.map((d) => `${d.title}. ${d.text}`));
      return true;
    } catch (e) {
      console.error("transformers.js failed, using keyword fallback", e);
      return false;
    } finally {
      setLoadingModel(false);
    }
  }, [embed]);

  const retrieve = useCallback(
    async (q: string): Promise<Source[]> => {
      const ok = await ensureModel();
      if (!ok) return keywordRank(q);
      const [qVec] = await embed([q]);
      return corpus
        .map((d, i) => ({ ...d, score: cosine(qVec, docVecs.current![i]) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K);
    },
    [ensureModel, embed]
  );

  const ask = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || busy) return;
      setInput("");
      setBusy(true);
      setTurns((t) => [...t, { role: "user", content: question }]);

      const sources = await retrieve(question);

      // No backend wired yet: degrade gracefully to a retrieval-only reply.
      if (!CHAT_ENDPOINT) {
        setTurns((t) => [
          ...t,
          {
            role: "assistant",
            fallback: true,
            sources,
            content:
              "Here are the most relevant pieces of Rafael's background for that — the live answer model isn't connected yet, but these are exactly the sources it would draw from:",
          },
        ]);
        setBusy(false);
        return;
      }

      setTurns((t) => [...t, { role: "assistant", content: "", sources, streaming: true }]);

      try {
        const res = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            contexts: sources.map((s) => ({ title: s.title, text: s.text, href: s.href })),
          }),
        });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setTurns((t) => {
            const next = [...t];
            const last = next[next.length - 1];
            if (last?.role === "assistant") next[next.length - 1] = { ...last, content: acc };
            return next;
          });
        }
        setTurns((t) => {
          const next = [...t];
          const last = next[next.length - 1];
          if (last?.role === "assistant") next[next.length - 1] = { ...last, streaming: false };
          return next;
        });
      } catch (e) {
        console.error("chat request failed", e);
        setTurns((t) => {
          const next = [...t];
          const last = next[next.length - 1];
          if (last?.role === "assistant") {
            next[next.length - 1] = {
              ...last,
              streaming: false,
              fallback: true,
              content:
                "I couldn't reach the answer service just now — but here are the most relevant pieces of Rafael's background:",
            };
          }
          return next;
        });
      } finally {
        setBusy(false);
      }
    },
    [busy, retrieve]
  );

  const onlyWelcome = turns.length === 1 && turns[0].welcome;

  return (
    <div className="cb-window">
      <header className="cb-bar">
        <span className="cb-bar-avatar">
          <BotAvatar size={34} />
        </span>
        <div className="cb-bar-meta">
          <span className="cb-bar-name">Rafael's assistant</span>
          <span className="cb-bar-status">
            <i className="cb-online" /> online · grounded in his portfolio
          </span>
        </div>
        <span className="cb-bar-tag mono">RAG</span>
      </header>

      <div className="cb-thread" ref={threadRef}>
        {turns.map((turn, i) => (
          <div key={i} className={`cb-turn cb-${turn.role}`}>
            {turn.role === "assistant" && (
              <span className="cb-avatar">
                <BotAvatar size={30} />
              </span>
            )}
            <div className="cb-bubble">
              {turn.content && <p className="cb-text">{turn.content}</p>}
              {turn.streaming && !turn.content && (
                <span className="cb-typing"><i /><i /><i /></span>
              )}

              {turn.sources && turn.sources.length > 0 && (
                <details className="cb-sources" open={turn.fallback}>
                  <summary>
                    {turn.fallback ? "Sources" : `Grounded in ${turn.sources.length} sources`}
                  </summary>
                  <div className="cb-sources-list">
                    {turn.sources.map((s) => (
                      <div className="cb-source" key={s.id}>
                        <div className="cb-source-top">
                          <span className="cb-source-title">
                            {s.href ? (
                              <a href={s.href} target="_blank" rel="noopener">{s.title}</a>
                            ) : (
                              s.title
                            )}
                          </span>
                          <span className="cb-source-score">{Math.max(0, Math.round(s.score * 100))}%</span>
                        </div>
                        <p className="cb-source-text">{s.text}</p>
                        <span className="cb-source-tag">{s.tag}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}

        {onlyWelcome && (
          <div className="cb-quickreplies">
            {EXAMPLES.map((ex) => (
              <button key={ex} className="cb-chip" disabled={busy} onClick={() => ask(ex)}>
                {ex}
              </button>
            ))}
          </div>
        )}

        {loadingModel && (
          <div className="cb-loading" role="status">
            <div className="cb-spinner" />
            <span>
              Loading the embedding model in your browser… {progress > 0 && `${progress}%`}
              <span className="cb-sub">~30 MB, one time · retrieval runs on your device</span>
            </span>
          </div>
        )}
      </div>

      <form
        className="cb-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Rafael…"
          aria-label="Ask about Rafael"
          disabled={busy}
        />
        <button type="submit" className="cb-send" aria-label="Send" disabled={busy || !input.trim()}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 12 L20 4 L14 20 L11 13 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}
