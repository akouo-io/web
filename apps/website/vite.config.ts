import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const dir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Relative base so the static build works when served from a subpath
  // (e.g. GitHub Pages project sites at /<repo>/). Override to "/" for a
  // custom domain or user/org root page.
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    // Multi-page: the marketing site plus a standalone /pricing page.
    rollupOptions: {
      input: {
        main: resolve(dir, "index.html"),
        pricing: resolve(dir, "pricing.html"),
        security: resolve(dir, "security.html"),
      },
    },
  },
});
