# rafael-chat — OpenAI proxy for the portfolio chatbot

A tiny Cloudflare Worker that holds the OpenAI API key server-side so the
portfolio (a static GitHub Pages site) can have a real chatbot without exposing
any secret in the browser.

**Flow:** browser retrieves the most relevant chunks with in-browser embeddings →
POSTs `{ question, contexts }` here → this Worker calls OpenAI with the key →
streams the grounded answer back. The key never reaches the browser.

## One-time deploy

Requires a free [Cloudflare account](https://dash.cloudflare.com/sign-up).

```bash
cd worker
npm install -g wrangler        # or: npx wrangler ...
wrangler login                 # opens browser, authorize once

# Store your OpenAI key as an encrypted secret (paste it when prompted):
wrangler secret put OPENAI_API_KEY

# Deploy:
wrangler deploy
```

`wrangler deploy` prints a URL like:

```
https://rafael-chat.<your-subdomain>.workers.dev
```

## Wire it into the site

Add the URL (with `/` — the Worker serves at the root) to a `.env` file in the
portfolio root, then redeploy the site:

```
PUBLIC_CHAT_ENDPOINT=https://rafael-chat.<your-subdomain>.workers.dev
```

```bash
cd ..        # portfolio root
npm run deploy
```

## Notes & cost control

- Only origins in `ALLOWED_ORIGINS` (in `src/index.js`) can call the Worker —
  `https://rmaacario.github.io` plus localhost for dev. Add any custom domain there.
- Model is `gpt-4o-mini`, capped at 400 output tokens — cents per thousand chats.
- Set a hard monthly **usage limit** in the OpenAI dashboard
  (Settings → Limits) as a backstop.
- To rotate the key: `wrangler secret put OPENAI_API_KEY` again, then `wrangler deploy`.
