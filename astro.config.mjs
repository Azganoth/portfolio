// @ts-check
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://azganoth.github.io/",
  output: "static",
  integrations: [
    preact({ devtools: true }),
    tailwind({ applyBaseStyles: false }),
  ],
});
