<script lang="ts">
  import { t } from "$lib/features/i18n/translation";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import { reveal } from "$lib/shared/attachments/reveal.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";
  import {
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_MOBILE_MENU,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
  } from "$lib/shared/constants";
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
      label: $t("nav_bio"),
      link: `#${ID_BIO_SECTION}`,
      description: $t("a11y_go_to_bio"),
    },
    {
      label: $t("nav_skills"),
      link: `#${ID_SKILLS_SECTION}`,
      description: $t("a11y_go_to_skills"),
    },
    {
      label: $t("nav_projects"),
      link: `#${ID_PROJECTS_SECTION}`,
      description: $t("a11y_go_to_projects"),
    },
    {
      label: $t("nav_contact"),
      link: `#${ID_CONTACT_SECTION}`,
      description: $t("a11y_go_to_contact"),
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
  <Link
    variant="none"
    class="center-x z-2 desktop:top-12 absolute top-8"
    href="/"
    aria-label={$t("a11y_go_to_home")}
  >
    <Logo />
  </Link>
  <nav aria-label={$t("a11y_main_navigation")}>
    {#if mobile.current}
      <div>
        <button
          bind:this={menuToggler}
          class="push-on-active hover:text-purple z-2 absolute right-8 top-[2.125rem] block transition-all"
          type="button"
          onclick={() => {
            open = !open;
          }}
          aria-label={open
            ? $t("a11y_close_nav_menu")
            : $t("a11y_open_nav_menu")}
          aria-expanded={open}
          aria-controls={ID_MOBILE_MENU}
        >
          <Icon
            class="pointer-events-none size-8"
            icon={open ? "fa6-solid:xmark" : "fa6-solid:bars"}
          />
        </button>
        <ul
          id={ID_MOBILE_MENU}
          class="bg-stardust inert:invisible inert:-translate-y-2 inert:opacity-0 shadow-elevation z-1 fixed inset-x-0 top-0 origin-top space-y-4 px-8 pb-8 pt-28 duration-300 ease-out motion-safe:transition-all"
          inert={!open}
          onclickaway={() => {
            open = false;
          }}
          {@attach clickaway({ ignoreNodes: [menuToggler] })}
        >
          {#each links as { label, link, description } (link)}
            <li>
              <Link
                class="font-orbitron block text-center text-lg"
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
        </ul>
      </div>
    {:else}
      <ul
        class="z-1 center-x reveal-slide-up absolute bottom-[7.5rem] flex gap-4 duration-700"
        {@attach reveal()}
      >
        {#each links as { label, link, description } (link)}
          <li>
            <Link
              class="font-orbitron hover:text-purple before:font-jetbrains-mono block whitespace-nowrap before:pr-1 before:text-white/15 before:content-['/']"
              variant="none"
              href={link}
              aria-label={description}
            >
              {label}
            </Link>
          </li>
        {/each}
      </ul>
    {/if}
  </nav>
</header>
