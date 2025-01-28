// @ts-check
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
  site: "https://azganoth.github.io/",
  output: "static",
  integrations: [svelte()],
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        title: "Azganoth.io Bundle Size Report",
        filename: "bundle-size-report.html",
        template: "flamegraph",
        emitFile: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
});
