<script lang="ts" module>
  const links: { label: string; link: string; description: string }[] = [
    {
      label: "Sobre mim",
      link: "#bio",
      description: "Ir para a seção de biografia",
    },
    {
      label: "Habilidades",
      link: "#skills",
      description: "Ir a seção de habilidades",
    },
    {
      label: "Projetos",
      link: "#projects",
      description: "Ir para a seção de projetos",
    },
    {
      label: "Contato",
      link: "#contact",
      description: "Ir para a seção de contato",
    },
  ];
</script>

<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import { clickaway } from "$lib/utils/clickaway";
  import Icon from "@iconify/svelte";
  import { MediaQuery } from "svelte/reactivity";

  const mobile = new MediaQuery("not all and (min-width: 768px)");

  let open = $state(false);
  let menuToggler = $state<HTMLButtonElement>();
</script>

<header>
  <div class="center-x z-2 desktop:top-12 absolute top-8" aria-hidden="true">
    <Logo />
  </div>
  <nav aria-label="Navegação principal">
    {#if mobile.current}
      <div>
        <button
          bind:this={menuToggler}
          class="push-on-active hover:text-purple z-2 absolute right-8 top-[2.125rem] block transition-all"
          type="button"
          onclick={() => {
            open = !open;
          }}
          aria-label="Abrir menu de navegação"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon
            class="pointer-events-none size-8"
            icon={open ? "fa6-solid:xmark" : "fa6-solid:bars"}
          />
        </button>
        <div
          id="mobile-menu"
          class="bg-stardust inert:invisible inert:-translate-y-2 inert:opacity-0 shadow-elevation z-1 fixed inset-x-0 top-0 origin-top space-y-4 px-8 pb-8 pt-28 duration-300 ease-out motion-safe:transition-all"
          role="menu"
          inert={!open}
          aria-label="Seções principais"
          onclickaway={() => {
            open = false;
          }}
          {@attach clickaway({ ignoreNodes: [menuToggler] })}
        >
          {#each links as { label, link, description } (link)}
            <Link
              class="font-orbitron block text-center text-lg"
              role="menuitem"
              href={link}
              onclick={() => {
                open = false;
              }}
              aria-label={description}
            >
              {label}
            </Link>
          {/each}
        </div>
      </div>
    {:else}
      <nav
        class="z-1 center-x absolute bottom-[7.5rem] flex gap-4"
        aria-label="Seções principais"
      >
        {#each links as { label, link, description } (link)}
          <Link
            class="font-orbitron hover:text-purple before:font-jetbrains-mono block whitespace-nowrap before:pr-1 before:text-white/15 before:content-['/']"
            variant="none"
            href={link}
            aria-label={description}
          >
            {label}
          </Link>
        {/each}
      </nav>
    {/if}
  </nav>
</header>
