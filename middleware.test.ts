import { beforeEach, describe, expect, it, vi } from "vitest";
import middleware from "./middleware";

const next = vi.hoisted(() => vi.fn());

vi.mock("@vercel/functions", () => ({
  next,
}));

const request = (pathname: string, headers?: HeadersInit) =>
  new Request(`https://azganoth.vercel.app${pathname}`, { headers });

describe("middleware", () => {
  beforeEach(() => {
    next.mockReset();
    next.mockImplementation(
      (init?: ResponseInit) => new Response(null, { status: 200, ...init }),
    );
  });

  it("passes through non-page requests", () => {
    expect(middleware(request("/favicon.svg")).status).toBe(200);
    expect(middleware(request("/api/lang")).status).toBe(200);
    expect(middleware(request("/_app/version.json")).status).toBe(200);
    expect(middleware(request("/.well-known/security.txt")).status).toBe(200);
    expect(next).toHaveBeenCalledTimes(4);
  });

  it("redirects default locale prefixes to unprefixed paths", () => {
    const response = middleware(request("/pt/projects/nexus"));

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "https://azganoth.vercel.app/projects/nexus",
    );
    expect(response.headers.get("Set-Cookie")).toContain("lang=pt");
  });

  it("sets the language cookie for non-default localized paths", () => {
    const response = middleware(request("/en/projects/nexus"));

    expect(response.status).toBe(200);
    expect(response.headers.get("Set-Cookie")).toContain("lang=en");
  });

  it("does not rewrite when the localized path matches the cookie", () => {
    const response = middleware(
      request("/en/projects/nexus", { cookie: "lang=en" }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Set-Cookie")).toBeNull();
  });

  it("redirects unprefixed paths to the preferred non-default locale", () => {
    const response = middleware(
      request("/projects/nexus", {
        "accept-language": "en-US,en;q=0.9,pt;q=0.8",
      }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "https://azganoth.vercel.app/en/projects/nexus",
    );
    expect(response.headers.get("Set-Cookie")).toContain("lang=en");
  });

  it("keeps unprefixed paths for default and unsupported preferences", () => {
    expect(
      middleware(
        request("/projects/nexus", {
          "accept-language": "pt-BR,pt;q=0.9,en;q=0",
        }),
      ).status,
    ).toBe(200);
    expect(
      middleware(
        request("/projects/nexus", {
          "accept-language": "fr-FR,fr;q=0.9",
        }),
      ).status,
    ).toBe(200);
  });

  it("honors an English language cookie on unprefixed paths", () => {
    const response = middleware(
      request("/projects/nexus", { cookie: "lang=en" }),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(
      "https://azganoth.vercel.app/en/projects/nexus",
    );
  });
});
