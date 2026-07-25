<script lang="ts">
  import { page } from "$app/state";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";

  import {
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
  } from "$lib/shared/constants";
  import {
    IconArrowRight,
    IconClose,
    IconExternalLink,
    IconMenu,
  } from "$lib/shared/icons";
  import { getCurrentLocalizedPath } from "$lib/shared/utils/currentPath.svelte";

  interface JumpLink {
    label: string;
    link: string;
    description: string;
  }

  const links = $derived<JumpLink[]>([
    {
      label: t("nav_bio"),
      link: `#${ID_BIO_SECTION}`,
      description: t("a11y_go_to_bio"),
    },
    {
      label: t("nav_skills"),
      link: `#${ID_SKILLS_SECTION}`,
      description: t("a11y_go_to_skills"),
    },
    {
      label: t("nav_projects"),
      link: `#${ID_PROJECTS_SECTION}`,
      description: t("a11y_go_to_projects"),
    },
    {
      label: t("nav_contact"),
      link: `#${ID_CONTACT_SECTION}`,
      description: t("a11y_go_to_contact"),
    },
  ]);

  let mobilePopover = $state<HTMLDivElement>();

  $effect(() => {
    if (page.url) {
      mobilePopover?.hidePopover();
    }
  });

  const cvHref = $derived(t("_cv_href"));
</script>

<header
  class="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-xl"
>
  <div
    class="mx-auto flex h-18 max-w-360 items-center justify-between px-6 md:px-12 xl:px-16"
  >
    <div class="shrink-0">
      {@render homeLink()}
    </div>

    <nav class="max-md:hidden" aria-label={t("a11y_desktop_navigation")}>
      <ul class="flex items-center gap-7">
        {#each links as { label, link, description } (link)}
          <li>
            <Link
              class="font-display text-sm tracking-wide text-muted-foreground hover:text-foreground"
              variant="none"
              href={link}
              aria-label={description}
            >
              {label}
            </Link>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="flex items-center gap-2">
      <LanguageSelector />
      <Link
        class="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 font-mono text-sm font-bold tracking-wide text-background shadow-glow transition-colors hover:bg-primary/85 max-md:hidden"
        variant="none"
        href={cvHref}
        newTab
        aria-label={t("a11y_download_cv")}
      >
        <span>{t("start_curriculum")}</span>
        <IconExternalLink class="size-3.5" />
      </Link>

      <button
        type="button"
        class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-primary md:hidden"
        popovertarget="mobile-menu"
        aria-label={t("a11y_open_nav_menu")}
        aria-controls="mobile-menu"
      >
        <IconMenu class="size-5" />
      </button>

      <div
        bind:this={mobilePopover}
        id="mobile-menu"
        class="inset-0 h-dvh w-dvw max-w-none border-0 bg-background/98 p-6 transition-all transition-discrete not-open:-translate-y-8 not-open:opacity-0 starting:-translate-y-8 starting:opacity-0"
        popover
      >
        <div class="mx-auto flex h-full max-w-lg flex-col">
          <div class="flex h-14 items-center justify-between">
            {@render homeLink()}
            <button
              type="button"
              class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:text-primary"
              onclick={() => mobilePopover?.hidePopover()}
              aria-label={t("a11y_close_nav_menu")}
            >
              <IconClose class="size-5" />
            </button>
          </div>

          <nav aria-label={t("a11y_mobile_navigation")}>
            <ul class="mt-16 flex flex-col">
              {#each links as { label, link, description } (link)}
                <li class="border-b border-white/8">
                  <Link
                    class="flex items-center justify-between py-5 font-display text-2xl tracking-tight hover:text-primary"
                    href={link}
                    aria-label={description}
                    variant="none"
                    onclick={() => mobilePopover?.hidePopover()}
                  >
                    {label}
                    <IconArrowRight class="size-4 text-muted-foreground" />
                  </Link>
                </li>
              {/each}
            </ul>
          </nav>

          <Link
            class="mt-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-mono font-bold text-background shadow-glow"
            variant="none"
            href={cvHref}
            newTab
            aria-label={t("a11y_download_cv")}
            onclick={() => mobilePopover?.hidePopover()}
          >
            <span>{t("start_curriculum")}</span>
            <IconExternalLink />
          </Link>
        </div>
      </div>
    </div>
  </div>
</header>

{#snippet homeLink()}
  <Link
    variant="none"
    href={getCurrentLocalizedPath("/")}
    aria-label={t("a11y_go_to_home")}
  >
    <Logo class="h-8 w-auto" />
  </Link>
{/snippet}
