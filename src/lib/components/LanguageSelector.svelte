<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import { DEFAULT_LOCALE } from "$lib/constants";
  import { locale, t, type Locale } from "$lib/i18n";
  import { clickaway } from "$lib/utils/clickaway.svelte";
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
</script>

<div class="fixed bottom-10 right-8 z-10">
  <button
    bind:this={toggler}
    type="button"
    class="push-on-active hover:text-purple block transition-all"
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
    class="bg-stardust inert:invisible inert:scale-90 inert:opacity-0 shadow-elevation z-1 absolute bottom-0 right-12 flex origin-bottom-right flex-col gap-1 space-y-4 rounded-2xl p-6 ease-out motion-safe:transition-all"
    role="menu"
    inert={!open}
    onclickaway={() => {
      open = false;
    }}
    {@attach clickaway({ ignoreNodes: [toggler] })}
  >
    {#each languages as [label, value] (value)}
      {@const href = value === DEFAULT_LOCALE ? "/" : `/${value}`}
      <Link
        class={[
          "text-center",
          value === $locale ? "text-yellow" : "hover:text-teal",
        ]}
        {href}
        variant="none"
        role="menuitem"
        onclick={() => {
          changeLanguage(value);
          open = false;
        }}
        aria-current={value === $locale && "page"}
        aria-label={$t("common_language_change", {
          language: label.toLowerCase(),
        })}
      >
        {label}
      </Link>
    {/each}
  </div>
</div>
