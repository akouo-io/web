import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the static build works when served from a subpath
  // (e.g. GitHub Pages project sites at /<repo>/). Override to "/" for a
  // custom domain or user/org root page.
  base: "./",
  plugins: [react(), tailwindcss()],
});
