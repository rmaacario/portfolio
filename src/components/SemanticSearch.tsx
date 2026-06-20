import { useCallback, useRef, useState } from "react";
import { corpus, type Doc } from "../data/corpus";
import "./SemanticSearch.css";

type Status = "idle" | "loading" | "embedding" | "ready" | "error";
type Result = Doc & { score: number };

const MODEL = "Xenova/all-MiniLM-L6-v2";
const EXAMPLES = [
  "Who can build me a chatbot over my documents?",
  "translation for endangered native languages",
  "how good is this MT system, really?",
  "fine-tuning transformer models",
];

function cosine(a: number[], b: number[]): number {
  // Vectors are L2-normalized by the model, so dot product = cosine similarity.
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

// Graceful fallback if the model can't load (offline, blocked CDN, etc.).
function keywordRank(query: string): Result[] {
  const terms = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
  return corpus
    .map((d) => {
      const hay = (d.title + " " + d.text).toLowerCase();
      const score = terms.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0) /
        Math.max(terms.length, 1);
      return { ...d, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export default function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [usedFallback, setUsedFallback] = useState(false);

  const extractor = useRef<any>(null);
  const docVecs = useRef<number[][] | null>(null);

  const embed = useCallback(async (texts: string[]): Promise<number[][]> => {
    const out = await extractor.current(texts, {
      pooling: "mean",
      normalize: true,
    });
    return out.tolist();
  }, []);

  const ensureModel = useCallback(async () => {
    if (extractor.current && docVecs.current) return true;
    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      setStatus("loading");
      extractor.current = await pipeline("feature-extraction", MODEL, {
        progress_callback: (p: any) => {
          if (p.status === "progress" && p.total) {
            setProgress(Math.round((p.loaded / p.total) * 100));
          }
        },
      });
      setStatus("embedding");
      docVecs.current = await embed(corpus.map((d) => `${d.title}. ${d.text}`));
      return true;
    } catch (e) {
      console.error("transformers.js failed, using keyword fallback", e);
      return false;
    }
  }, [embed]);

  const run = useCallback(
    async (q: string) => {
      const text = q.trim();
      if (!text) return;
      setResults([]);
      const ok = await ensureModel();
      if (!ok) {
        setUsedFallback(true);
        setResults(keywordRank(text));
        setStatus("ready");
        return;
      }
      setStatus("embedding");
      const [qVec] = await embed([text]);
      const ranked: Result[] = corpus
        .map((d, i) => ({ ...d, score: cosine(qVec, docVecs.current![i]) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
      setUsedFallback(false);
      setResults(ranked);
      setStatus("ready");
    },
    [ensureModel, embed]
  );

  const busy = status === "loading" || status === "embedding";

  return (
    <div className="ss">
      <form
        className="ss-form"
        onSubmit={(e) => {
          e.preventDefault();
          run(query);
        }}
      >
        <div className="ss-input-wrap">
          <svg className="ss-search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </g>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask in your own words — e.g. “build a chatbot over my docs”"
            aria-label="Semantic search query"
            disabled={busy}
          />
        </div>
        <button type="submit" className="btn btn-primary ss-go" disabled={busy}>
          {busy ? "Working…" : "Search"}
        </button>
      </form>

      <div className="ss-examples">
        <span className="ss-examples-label">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="ss-chip"
            disabled={busy}
            onClick={() => {
              setQuery(ex);
              run(ex);
            }}
          >
            {ex}
          </button>
        ))}
      </div>

      {busy && (
        <div className="ss-status" role="status">
          <div className="ss-spinner" />
          <div>
            {status === "loading" ? (
              <>
                Loading the embedding model in your browser… {progress > 0 && `${progress}%`}
                <span className="ss-sub">~30 MB, one time · all computation stays on your device</span>
              </>
            ) : (
              <>Encoding and ranking…</>
            )}
          </div>
        </div>
      )}

      {status === "ready" && results.length > 0 && (
        <div className="ss-results">
          <p className="ss-results-head">
            {usedFallback
              ? "Top matches (keyword fallback):"
              : "Ranked by semantic similarity:"}
          </p>
          {results.map((r, i) => {
            const pct = Math.max(0, Math.round(r.score * 100));
            return (
              <div className="ss-result" key={r.id} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="ss-result-bar" style={{ width: `${Math.min(pct, 100)}%` }} />
                <div className="ss-result-body">
                  <div className="ss-result-top">
                    <span className="ss-result-title">
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noopener">
                          {r.title}
                        </a>
                      ) : (
                        r.title
                      )}
                    </span>
                    <span className="ss-result-score">{pct}%</span>
                  </div>
                  <p className="ss-result-text">{r.text}</p>
                  <span className="ss-result-tag">{r.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
