// @ts-check
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
  site: "https://azganoth.github.io/",
  output: "static",
  integrations: [svelte(), tailwind({ applyBaseStyles: false })],
  vite: {
    plugins: [
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
