<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t, type Locale } from "$lib/features/i18n/translation.svelte";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { DEFAULT_LOCALE } from "$lib/shared/constants";
  import { localizePathname } from "$lib/shared/utils";
  import { getCurrentUnlocalizedPath } from "$lib/shared/utils/currentPath.svelte";
  import Icon from "@iconify/svelte";

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

<div class="fixed right-8 bottom-10 z-10">
  <button
    bind:this={toggler}
    type="button"
    class="block transition-all ease-snappy hover:scale-110 hover:text-primary active:scale-95"
    onclick={() => {
      open = !open;
    }}
    aria-label={t("a11y_language_openmenu")}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="language-list"
  >
    <Icon class="size-6" icon="fa7-solid:language" />
  </button>
  <div
    id="language-list"
    class="absolute right-12 bottom-0 z-1 flex origin-bottom-right flex-col gap-3 rounded-2xl bg-muted p-6 shadow-elevation ease-snappy inert:invisible inert:scale-95 inert:opacity-0 motion-safe:transition-all"
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
          "text-center",
          value === currentLang ? "text-primary" : "hover:text-secondary",
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
