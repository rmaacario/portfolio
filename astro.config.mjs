import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Update `site` / `base` to match where this deploys.
// For GitHub Pages project site (rmaacario.github.io/rafael-portfolio) keep `base`.
// For a user site or custom domain, set base to "/".
export default defineConfig({
  site: "https://rmaacario.github.io",
  base: "/portfolio/",
  integrations: [react(), sitemap()],
  vite: {
    optimizeDeps: {
      exclude: ["@huggingface/transformers"],
    },
  },
});
