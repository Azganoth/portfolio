<script lang="ts">
  import { page } from "$app/state";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";

  import {
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
  } from "$lib/shared/constants";
  import { getLocalizedPath } from "$lib/shared/utils";
  import Icon from "@iconify/svelte";

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
</script>

<header>
  <!-- Navigation Bar -->
  <div class="fixed inset-x-0 top-4 z-50 flex justify-center">
    <!-- Desktop Bar -->
    <div
      class="flex items-center gap-4 rounded-full border border-white/10 bg-muted/80 p-2 px-6 shadow-elevation backdrop-blur-md max-md:hidden"
    >
      <nav aria-label={t("a11y_desktop_navigation")}>
        <ul class="flex items-center gap-6">
          <li>
            {@render homeLink()}
          </li>
          {#each links as { label, link, description } (link)}
            <li>
              <Link
                class="font-display tracking-wide hover:text-primary"
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
      <div class="h-6 w-px bg-white/10"></div>
      <Link
        class="-mr-3.5 flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 font-mono font-bold tracking-wide text-secondary transition-all ease-snappy hover:scale-105 hover:border-secondary/40 hover:bg-secondary/20 active:scale-95"
        variant="none"
        href="/cv.pdf"
        newTab
        aria-label={t("a11y_download_cv")}
      >
        <span>{t("start_curriculum")}</span>
        <Icon icon="fa6-solid:arrow-up-right-from-square" />
      </Link>
    </div>

    <!-- Mobile Bar -->
    <div
      class="flex items-center gap-4 rounded-full bg-background/80 p-2.5 px-20 backdrop-blur-md md:hidden"
    >
      {@render homeLink()}
      <button
        type="button"
        class="fixed right-4 block transition-colors hover:text-primary"
        popovertarget="mobile-menu"
      >
        <Icon icon="fa7-solid:bars" class="size-8" />
      </button>

      <!-- Mobile Menu -->
      <div
        bind:this={mobilePopover}
        id="mobile-menu"
        class="w-full bg-muted p-8 pt-8 transition-all transition-discrete not-open:-translate-y-16 not-open:opacity-0 starting:-translate-y-16 starting:opacity-0"
        popover
      >
        <div class="flex flex-col items-center gap-6">
          {@render homeLink()}
          <nav>
            <ul class="flex flex-col gap-6">
              {#each links as { label, link, description } (link)}
                <li>
                  <Link
                    class="block text-center font-display text-lg tracking-wide"
                    href={link}
                    aria-label={description}
                  >
                    {label}
                  </Link>
                </li>
              {/each}
            </ul>
          </nav>

          <div class="h-px w-full bg-white/10"></div>

          <Link
            class="flex items-center justify-center gap-2 font-mono text-lg font-bold text-primary"
            href="/cv.pdf"
            newTab
            aria-label={t("a11y_download_cv")}
          >
            <span>{t("start_curriculum")}</span>
            <Icon icon="fa6-solid:arrow-up-right-from-square" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</header>

{#snippet homeLink()}
  <Link
    variant="none"
    href={getLocalizedPath("/")}
    aria-label={t("a11y_go_to_home")}
  >
    <Logo class="h-8 w-auto" />
  </Link>
{/snippet}
