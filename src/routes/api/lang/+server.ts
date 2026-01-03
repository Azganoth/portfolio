import { type Locale } from "$lib/features/i18n/translation.svelte";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { lang } = (await request.json()) as { lang?: Locale };
  if (lang) {
    cookies.set("lang", lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });

    return json({ success: true });
  }

  return json(
    { success: false, error: "Language not specified" },
    { status: 400 },
  );
};
