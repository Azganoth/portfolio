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
  import Icon from "@components/Icon.svelte";
  import Link from "@components/Link.svelte";
  import clickaway from "@utils/actions/clickaway.svelte";
  import { MediaQuery } from "svelte/reactivity";

  const mobile = new MediaQuery("not all and (min-width: 768px)");

  let open = $state(false);
  let menuToggler = $state<HTMLButtonElement>();
</script>

<header>
  <h1
    class="font-patua-one text-offwhite max-tablet:center-x z-2 tablet:left-12 desktop:top-12 desktop:left-16 absolute top-8 flex cursor-default gap-0.5 text-xl tracking-wider"
  >
    <span class="text-silver" aria-hidden="true">&lt;</span>
    <span>Azganoth</span>
    <span class="text-silver flex" aria-hidden="true">
      /&gt;
      <span class="text-orchid motion-safe:animate-blink">_</span>
    </span>
  </h1>
  <nav aria-label="Navegação principal">
    {#if mobile.current}
      <div>
        <button
          bind:this={menuToggler}
          class="push-on-active hover:text-orchid z-2 absolute right-8 top-[2.125rem] block select-none"
          type="button"
          onclick={() => {
            open = !open;
          }}
          aria-label="Abrir menu de navegação"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon class="size-8" name={open ? "close" : "menu"} />
        </button>
        <div
          id="mobile-menu"
          class="bg-charcoal inert:invisible inert:-translate-y-2 inert:opacity-0 shadow-elevation z-1 fixed inset-x-0 top-0 origin-top px-8 pb-8 pt-28 duration-300 ease-out motion-safe:transition-[visibility,opacity,translate]"
          role="menu"
          inert={!open}
          aria-label="Seções principais"
          use:clickaway={{ ignoreNodes: [menuToggler] }}
          onclickaway={() => {
            open = false;
          }}
        >
          {#each links as { label, link, description } (link)}
            <Link
              variant="nav"
              class="not-first:mt-4 block text-center"
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
      <div
        class="z-1 desktop:center-x max-desktop:right-12 desktop:top-[3.375rem] absolute top-[2.375rem] flex"
        role="menubar"
        aria-label="Seções principais"
      >
        {#each links as { label, link, description } (link)}
          <Link
            variant="nav"
            role="menuitem"
            href={link}
            aria-label={description}
          >
            {label}
          </Link>
        {/each}
      </div>
    {/if}
  </nav>
</header>
