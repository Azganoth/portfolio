import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguageSelector from "./LanguageSelector.svelte";

const goto = vi.hoisted(() => vi.fn());
const page = vi.hoisted(() => ({
  url: new URL("https://azganoth.vercel.app/projects/nexus?view=grid#demo"),
  params: { lang: "pt" },
}));

vi.mock("$app/environment", () => ({
  browser: true,
}));

vi.mock("$app/navigation", () => ({
  goto,
}));

vi.mock("$app/state", () => ({
  page,
}));

describe("LanguageSelector", () => {
  beforeEach(() => {
    page.url = new URL(
      "https://azganoth.vercel.app/projects/nexus?view=grid#demo",
    );
    page.params = { lang: "pt" };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ success: true }))),
    );
  });

  it("opens the language menu and navigates to the localized path", async () => {
    const user = userEvent.setup();
    render(LanguageSelector);

    await user.click(
      screen.getByRole("button", { name: "Abrir menu de linguagens" }),
    );

    const englishLink = screen.getByRole("menuitem", {
      name: "Mudar idioma para english",
    });
    expect(englishLink).toHaveAttribute(
      "href",
      "/en/projects/nexus?view=grid#demo",
    );

    await user.click(englishLink);

    expect(fetch).toHaveBeenCalledWith("/api/lang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: "en" }),
      keepalive: true,
    });
    expect(goto).toHaveBeenCalledWith("/en/projects/nexus?view=grid#demo");
  });
});
