import { DEFAULT_LOCALE, SITE_URL } from "$lib/shared/constants";
import {
  localizePathname,
  localizeUrl,
  normalizePathname,
  stripSupportedLocaleFromPathname,
} from "$lib/shared/utils/path";
import { describe, expect, it } from "vitest";

describe("path utilities", () => {
  it("normalizes pathnames", () => {
    expect(normalizePathname("/projects/nexus/")).toBe("/projects/nexus");
    expect(normalizePathname("projects/nexus")).toBe("/projects/nexus");
    expect(normalizePathname("/")).toBe("/");
  });

  it("strips supported locale prefixes", () => {
    expect(stripSupportedLocaleFromPathname("/pt/projects/nexus")).toBe(
      "/projects/nexus",
    );
    expect(stripSupportedLocaleFromPathname("/en")).toBe("/");
    expect(stripSupportedLocaleFromPathname("/fr/projects/nexus")).toBe(
      "/fr/projects/nexus",
    );
  });

  it("keeps default locale paths unprefixed", () => {
    expect(localizePathname("/projects/nexus", DEFAULT_LOCALE)).toBe(
      "/projects/nexus",
    );
    expect(localizePathname("/pt/projects/nexus", DEFAULT_LOCALE)).toBe(
      "/projects/nexus",
    );
  });

  it("prefixes non-default locale paths", () => {
    expect(localizePathname("/", "en")).toBe("/en");
    expect(localizePathname("/projects/nexus", "en")).toBe(
      "/en/projects/nexus",
    );
    expect(localizePathname("/pt/projects/nexus", "en")).toBe(
      "/en/projects/nexus",
    );
  });

  it("builds absolute localized urls", () => {
    expect(localizeUrl("/projects/nexus", "pt")).toBe(
      `${SITE_URL}/projects/nexus`,
    );
    expect(localizeUrl("/projects/nexus", "en")).toBe(
      `${SITE_URL}/en/projects/nexus`,
    );
  });
});
