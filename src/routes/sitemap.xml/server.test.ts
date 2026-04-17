import { SITE_URL } from "$lib/shared/constants";
import { describe, expect, it } from "vitest";
import { GET } from "./+server";

describe("sitemap endpoint", () => {
  it("returns localized urls and alternates", async () => {
    const response = await GET({} as Parameters<typeof GET>[0]);
    const body = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "application/xml; charset=utf-8",
    );
    expect(body).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(body).toContain(`<loc>${SITE_URL}/en</loc>`);
    expect(body).toContain(`<loc>${SITE_URL}/projects/nexus</loc>`);
    expect(body).toContain(`<loc>${SITE_URL}/en/projects/nexus</loc>`);
    expect(body).toContain('hreflang="pt-BR"');
    expect(body).toContain('hreflang="en"');
    expect(body).toContain('hreflang="x-default"');
  });
});
