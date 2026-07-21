import { describe, expect, it, vi } from "vitest";
import { _LANG_COOKIE_AGE, POST } from "./+server";

const createEvent = (body: string) => {
  const cookies = {
    set: vi.fn(),
  };

  return {
    event: {
      request: new Request("https://azganoth.vercel.app/api/lang", {
        method: "POST",
        body,
      }),
      cookies,
    } as unknown as Parameters<typeof POST>[0],
    cookies,
  };
};

describe("language API", () => {
  it("rejects invalid JSON", async () => {
    const { event } = createEvent("{");
    const response = await POST(event);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Invalid JSON",
    });
  });

  it("rejects unsupported locales", async () => {
    const { event, cookies } = createEvent(JSON.stringify({ lang: "fr" }));
    const response = await POST(event);

    expect(response.status).toBe(400);
    expect(cookies.set).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Unsupported language",
    });
  });

  it("sets the language cookie for supported locales", async () => {
    const { event, cookies } = createEvent(JSON.stringify({ lang: "en" }));
    const response = await POST(event);

    expect(response.status).toBe(200);
    expect(cookies.set).toHaveBeenCalledWith("lang", "en", {
      path: "/",
      maxAge: _LANG_COOKIE_AGE,
      httpOnly: true,
      sameSite: "lax",
    });
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});
