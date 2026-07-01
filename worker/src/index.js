/**
 * Cloudflare Worker — chat proxy for the portfolio's "Ask about Rafael" bot.
 *
 * The browser does the retrieval (in-browser MiniLM embeddings pick the most
 * relevant chunks) and POSTs { question, contexts } here. This Worker holds the
 * OpenAI key as a secret, calls the model with the supplied context, and streams
 * the answer back as plain text. The key never reaches the browser.
 *
 * Secret (set once, never committed):
 *   wrangler secret put OPENAI_API_KEY
 */

const ALLOWED_ORIGINS = [
  "https://rmaacario.github.io",
  "http://localhost:4321",
  "http://localhost:4399",
  "http://localhost:3000",
];

const MODEL = "gpt-4o-mini";
const MAX_QUESTION_LEN = 600;
const MAX_CONTEXTS = 6;

const SYSTEM_PROMPT = `You are the assistant on Rafael Macário Fernandes' personal portfolio.
Rafael is an NLP Engineer and a PhD candidate in Computational Linguistics at the University of São Paulo (USP).
Answer visitors' questions about Rafael — his skills, experience, research, and projects — in a warm, friendly, welcoming voice (first or third person is fine, but never invent facts). Be genuinely approachable, like a friendly colleague who's excited to talk about Rafael's work.

Rules:
- Ground every answer ONLY in the CONTEXT provided below. The context is retrieved from Rafael's own portfolio.
- If the context does not contain the answer, say so plainly and suggest what Rafael does work on, or point the visitor to the contact section. Do not fabricate employers, dates, publications, or numbers.
- Be concise: 1–3 short sentences. Avoid long, run-on sentences — break ideas up and keep it punchy. Only go longer if the visitor explicitly asks for detail.
- Speak about Rafael positively but honestly. Do not overstate.
- Add a few tasteful emojis to keep the tone warm and friendly (roughly 1–3 per reply) — relevant ones like 🌿 🌎 🤖 💬 📚 ✨ 🗣️ work well. Don't overdo it or make every sentence end in an emoji; they should feel natural, not spammy.

Voice — light Nheengatu flavor (Rafael works on this Indigenous Amazonian language):
- You MAY occasionally open or sprinkle in a single Nheengatu word followed by its English meaning in parentheses, to reflect Rafael's work. Use at most one per reply, and never force it.
- Only use Nheengatu words you are certain of. Safe, attested examples you may use: "Puranga ára" (good day / hello), "nheengatu" (the good language), "pirá" (fish), "igara" (canoe), "putira" (flower).
- NEVER invent, guess, or improvise a Nheengatu word. If you are not sure of a word, simply use English. Accuracy matters more than flavor — Rafael is a specialist and a wrong word is worse than none.`;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, origin);
    }
    if (!env.OPENAI_API_KEY) {
      return json({ error: "Server not configured" }, 500, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, origin);
    }

    const question = String(payload?.question ?? "").trim().slice(0, MAX_QUESTION_LEN);
    const contexts = Array.isArray(payload?.contexts)
      ? payload.contexts.slice(0, MAX_CONTEXTS)
      : [];

    if (!question) return json({ error: "Empty question" }, 400, origin);

    const contextBlock = contexts
      .map((c, i) => {
        const title = String(c?.title ?? "").slice(0, 200);
        const text = String(c?.text ?? "").slice(0, 1200);
        return `[${i + 1}] ${title}\n${text}`;
      })
      .join("\n\n");

    const userMessage = `CONTEXT:\n${contextBlock || "(no context retrieved)"}\n\nVISITOR QUESTION: ${question}`;

    let upstream;
    try {
      upstream = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          stream: true,
          temperature: 0.3,
          max_tokens: 400,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
        }),
      });
    } catch {
      return json({ error: "Upstream unreachable" }, 502, origin);
    }

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => "");
      console.error("OpenAI error", upstream.status, detail);
      return json({ error: "Model request failed", status: upstream.status, detail }, 502, origin);
    }

    // Re-stream OpenAI's SSE as plain UTF-8 text deltas via a TransformStream,
    // so the client just appends chunks — no SSE parsing in the browser.
    const { readable, writable } = new TransformStream();

    const pump = async () => {
      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      const writer = writable.getWriter();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              await writer.close();
              return;
            }
            try {
              const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
              if (delta) await writer.write(encoder.encode(delta));
            } catch {
              // partial JSON spanning chunks — the next read completes it
            }
          }
        }
        await writer.close();
      } catch (e) {
        console.error("stream pump failed", e);
        try {
          await writer.abort(e);
        } catch {
          // writer already closed
        }
      }
    };

    // Keep the Worker alive until the pump finishes (prevents the runtime from
    // cancelling the request as "hung").
    ctx.waitUntil(pump());

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        ...corsHeaders(origin),
      },
    });
  },
};
