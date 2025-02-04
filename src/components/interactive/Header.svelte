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
    class="font-patua-one text-offwhite max-tablet:center-x z-2 tablet:left-12 desktop:top-12 desktop:left-16 absolute top-8 cursor-default text-xl tracking-wider"
  >
    <span
      class="before:text-silver after:text-silver before:mr-0.5 before:content-['<'] after:ml-0.5 after:content-['/>']"
    >
      Azganoth
    </span><span
      class="text-orchid motion-safe:animate-blink"
      aria-hidden="true"
    >
      _
    </span>
  </h1>
  <nav>
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
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Icon class="size-8" name={open ? "close" : "menu"} />
        </button>
        <ul
          class="bg-charcoal inert:invisible inert:-translate-y-2 inert:opacity-0 shadow-elevation z-1 fixed inset-x-0 top-0 origin-top px-8 pb-8 pt-28 duration-300 ease-out motion-safe:transition-[visibility,opacity,translate]"
          inert={!open}
          use:clickaway={{ ignoreNodes: [menuToggler] }}
          onclickaway={() => {
            open = false;
          }}
        >
          {#each links as { label, link, description } (link)}
            <li class="not-first:mt-4 text-center">
              <Link
                variant="nav"
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
        class="z-1 desktop:center-x max-desktop:right-12 desktop:top-[3.375rem] absolute top-[2.375rem] flex"
      >
        {#each links as { label, link, description } (link)}
          <li>
            <Link variant="nav" href={link} aria-label={description}>
              {label}
            </Link>
          </li>
        {/each}
      </ul>
    {/if}
  </nav>
</header>
