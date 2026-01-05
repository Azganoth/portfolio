<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";

  import {
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_MOBILE_MENU,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
  } from "$lib/shared/constants";
  import { getLocalizedPath } from "$lib/shared/utils";
  import Icon from "@iconify/svelte";
  import { MediaQuery } from "svelte/reactivity";

  const mobile = new MediaQuery("not all and (min-width: 768px)");

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

  let open = $state(false);
  let menuToggler = $state<HTMLButtonElement>();

  const handleKeydown = (event: KeyboardEvent) => {
    if (open && event.key === "Escape") {
      open = false;
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

<header>
  <!-- Navigation Bar -->
  <div class="fixed inset-x-0 top-4 z-50 flex justify-center">
    <div
      class="flex items-center gap-6 rounded-full border border-white/10 bg-muted/80 p-2 px-6 shadow-elevation backdrop-blur-md"
    >
      <Link
        variant="none"
        href={getLocalizedPath("/")}
        aria-label={t("a11y_go_to_home")}
      >
        <Logo class="h-8 w-auto" />
      </Link>

      {#if mobile.current}
        <!-- Mobile Bar -->
        <div class="h-6 w-px bg-white/10"></div>
        <button
          bind:this={menuToggler}
          class="block transition-colors hover:text-primary"
          type="button"
          onclick={() => {
            open = !open;
          }}
          aria-label={open ? t("a11y_close_nav_menu") : t("a11y_open_nav_menu")}
          aria-expanded={open}
          aria-controls={ID_MOBILE_MENU}
        >
          <Icon
            class="pointer-events-none size-6"
            icon={open ? "fa6-solid:xmark" : "fa6-solid:bars"}
          />
        </button>
      {:else}
        <!-- Desktop Bar -->
        <nav
          aria-label={t("a11y_main_navigation")}
          class="flex items-center gap-6"
        >
          <ul class="flex gap-6">
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
          <div class="h-4 w-px bg-white/10"></div>
          <Link
            class="flex items-center gap-2 font-mono font-bold text-primary transition-colors hover:text-primary/80"
            variant="none"
            href="/cv.pdf"
            newTab
            aria-label={t("a11y_download_cv")}
          >
            <span>{t("start_curriculum")}</span>
            <Icon icon="fa6-solid:arrow-up-right-from-square" />
          </Link>
        </nav>
      {/if}
    </div>
  </div>

  {#if mobile.current}
    <!-- Mobile Menu -->
    <ul
      id={ID_MOBILE_MENU}
      class="fixed inset-x-0 top-0 z-40 flex origin-top flex-col gap-4 bg-muted px-8 pt-28 pb-8 shadow-elevation duration-300 ease-out inert:invisible inert:-translate-y-2 inert:opacity-0 motion-safe:transition-all"
      inert={!open}
      onclickaway={() => {
        open = false;
      }}
      {@attach clickaway({
        ignoreNodes: [menuToggler].filter(Boolean) as HTMLElement[],
      })}
    >
      {#each links as { label, link, description } (link)}
        <li>
          <Link
            class="block text-center font-display text-lg tracking-wide"
            href={link}
            onclick={() => {
              open = false;
            }}
            aria-label={description}
          >
            {label}
          </Link>
        </li>
      {/each}

      <li class="border-t border-white/10 pt-4">
        <Link
          class="flex items-center justify-center gap-2 font-mono text-lg font-bold text-primary"
          href="/cv.pdf"
          newTab
          onclick={() => {
            open = false;
          }}
          aria-label={t("a11y_download_cv")}
        >
          <span>{t("start_curriculum")}</span>
          <Icon icon="fa6-solid:arrow-up-right-from-square" />
        </Link>
      </li>
    </ul>
  {/if}
</header>
