<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t, type Locale } from "$lib/features/i18n/translation.svelte";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { DEFAULT_LOCALE } from "$lib/shared/constants";
  import { IconLanguage } from "$lib/shared/icons";
  import { localizePathname } from "$lib/shared/utils";
  import { getCurrentUnlocalizedPath } from "$lib/shared/utils/currentPath.svelte";

  let languages: [label: string, value: Locale][] = [
    ["Português", "pt"],
    ["English", "en"],
  ];

  let open = $state(false);
  let toggler = $state<HTMLButtonElement>();

  const changeLanguage = async (newLang: Locale) => {
    // Save preference in a cookie
    try {
      await fetch("/api/lang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lang: newLang }),
        keepalive: true,
      });
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  const selectLanguage = async (
    event: MouseEvent,
    newLang: Locale,
    href: string,
  ) => {
    event.preventDefault();
    await changeLanguage(newLang);
    open = false;
    await goto(href);
  };

  let rawCurrentPath = $derived(getCurrentUnlocalizedPath(page.url.pathname));
  let currentQuery = $derived(browser ? page.url.search : "");
  let currentHash = $derived(browser ? page.url.hash : "");

  let currentLang = $derived((page.params.lang as Locale) || DEFAULT_LOCALE);

  const getLanguageHref = (locale: Locale) =>
    `${localizePathname(rawCurrentPath, locale)}${currentQuery}${currentHash}`;
</script>

<div class="relative">
  <button
    bind:this={toggler}
    type="button"
    class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-white/20 hover:bg-white/10 hover:text-foreground"
    onclick={() => {
      open = !open;
    }}
    aria-label={t("a11y_language_openmenu")}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="language-list"
  >
    <IconLanguage class="size-6" />
  </button>
  <div
    id="language-list"
    class="absolute top-12 right-0 z-1 flex min-w-40 origin-top-right flex-col rounded-xl border border-white/10 bg-background/95 p-2 shadow-elevation backdrop-blur-xl ease-snappy inert:invisible inert:scale-95 inert:opacity-0 motion-safe:transition-all"
    role="menu"
    inert={!open}
    onclickaway={() => {
      open = false;
    }}
    {@attach clickaway({ ignoreNodes: [toggler] })}
  >
    {#each languages as [label, value] (value)}
      {@const href = getLanguageHref(value)}
      <Link
        class={[
          "rounded-lg px-3 py-2 text-sm",
          value === currentLang
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground",
        ]}
        {href}
        variant="none"
        role="menuitem"
        onclick={(event) => selectLanguage(event, value, href)}
        aria-current={value === currentLang ? "page" : false}
        aria-label={t("a11y_language_change", {
          language: label.toLowerCase(),
        })}
      >
        {label}
      </Link>
    {/each}
  </div>
</div>
