<script lang="ts">
  import { page } from "$app/state";
  import { locale, t, type Locale } from "$lib/features/i18n/translation";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { DEFAULT_LOCALE } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  let languages: [label: string, value: Locale][] = [
    ["Português", "pt"],
    ["English", "en"],
  ];

  let open = $state(false);
  let toggler = $state<HTMLButtonElement>();

  $effect(() => {
    document.documentElement.setAttribute("lang", $locale);
  });

  const changeLanguage = async (newLang: Locale) => {
    // Save preference in a cookie
    try {
      await fetch("/api/lang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lang: newLang }),
      });
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  let rawCurrentPath = $derived(
    page.params.lang
      ? page.url.pathname.replace(new RegExp(`^/${page.params.lang}(/|$)`), "/")
      : page.url.pathname,
  );

  let currentLang = $derived((page.params.lang as Locale) || DEFAULT_LOCALE);
</script>

<div class="fixed right-8 bottom-10 z-10">
  <button
    bind:this={toggler}
    type="button"
    class="tap-push block transition-[scale,color] hover:text-primary"
    onclick={() => {
      open = !open;
    }}
    aria-label={$t("common_language_openmenu")}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="language-list"
  >
    <Icon class="size-6" icon="fa7-solid:language" />
  </button>
  <div
    id="language-list"
    class="absolute right-12 bottom-0 z-1 flex origin-bottom-right flex-col gap-1 space-y-4 rounded-2xl bg-muted p-6 shadow-elevation ease-out inert:invisible inert:scale-90 inert:opacity-0 motion-safe:transition-all"
    role="menu"
    inert={!open}
    onclickaway={() => {
      open = false;
    }}
    {@attach clickaway({ ignoreNodes: [toggler] })}
  >
    {#each languages as [label, value] (value)}
      {@const href =
        value === DEFAULT_LOCALE
          ? rawCurrentPath
          : `/${value}${rawCurrentPath === "/" ? "" : rawCurrentPath}`}
      <Link
        class={[
          "text-center",
          value === currentLang ? "text-primary" : "hover:text-secondary",
        ]}
        {href}
        variant="none"
        role="menuitem"
        onclick={() => {
          changeLanguage(value);
          open = false;
        }}
        aria-current={value === currentLang && "page"}
        aria-label={$t("common_language_change", {
          language: label.toLowerCase(),
        })}
      >
        {label}
      </Link>
    {/each}
  </div>
</div>
