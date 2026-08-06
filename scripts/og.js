import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import { createServer } from "vite";

const LOCALES = ["pt", "en"];
const PROJECTS_DIR = path.join(process.cwd(), "src/lib/features/projects/data");
const OUT_DIR = path.join(process.cwd(), "static/og");

const startDevServer = async () => {
  const server = await createServer({ server: { port: 0 } });
  await server.listen();

  const origin = server.resolvedUrls?.local[0];
  if (!origin) {
    await server.close();
    throw new Error("vite dev server reported no local URL");
  }

  return { origin: origin.replace(/\/$/, ""), stop: () => server.close() };
};

const capture = async (page, origin, params, output) => {
  const query = new URLSearchParams(params);

  const response = await page.goto(`${origin}/dev/og?${query}`);
  if (!response?.ok()) {
    throw new Error(`/dev/og?${query} responded ${response?.status()}`);
  }

  const card = page.locator("[data-og-card]");
  await card.waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      [...document.images].filter((i) => !i.complete).map((i) => i.decode()),
    ),
  );
  await card.screenshot({ path: output, animations: "disabled" });

  console.log(`og: ${path.basename(output)}`);
};

const main = async () => {
  const { origin, stop } = await startDevServer();
  const browser = await chromium.launch({ channel: "chrome" });

  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
    });
    await fs.mkdir(OUT_DIR, { recursive: true });

    await page.goto(`${origin}/dev/og`);
    await page.locator("[data-og-card]").waitFor();
    await page.evaluate(() => document.fonts.ready);

    for (const locale of LOCALES) {
      await capture(
        page,
        origin,
        { locale },
        path.join(OUT_DIR, `default-${locale}.png`),
      );

      const slugs = (await fs.readdir(path.join(PROJECTS_DIR, locale)))
        .filter((filename) => filename.endsWith(".md"))
        .map((filename) => filename.slice(0, -".md".length));

      for (const slug of slugs) {
        await capture(
          page,
          origin,
          { locale, slug },
          path.join(OUT_DIR, `${slug}-${locale}.png`),
        );
      }
    }
  } finally {
    await browser.close();
    stop();
  }
};

await main();
