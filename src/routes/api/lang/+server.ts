import { isSupportedLocale } from "$lib/shared/constants";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const LANG_COOKIE_AGE = 60 * 60 * 24 * 365;

export const POST: RequestHandler = async ({ request, cookies }) => {
  let lang: unknown;

  try {
    ({ lang } = (await request.json()) as { lang?: unknown });
  } catch {
    return json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isSupportedLocale(lang)) {
    return json(
      { success: false, error: "Unsupported language" },
      { status: 400 },
    );
  }

  cookies.set("lang", lang, {
    path: "/",
    maxAge: LANG_COOKIE_AGE,
    httpOnly: true,
    sameSite: "lax",
  });

  return json({ success: true });
};
