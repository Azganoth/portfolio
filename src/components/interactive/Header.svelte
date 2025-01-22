<script lang="ts" module>
  const links: { label: string; link: string; description: string }[] = [
    {
      label: "Início",
      link: "#start",
      description: "Ir para o início da página",
    },
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

<header
  class="fixed left-1/2 top-4 z-10 flex max-h-16 min-h-16 w-full max-w-[311px] -translate-x-1/2 items-center justify-between rounded-2xl bg-charcoal p-4 shadow-elevation-medium motion-safe:transition-[max-width] md:max-w-[704px] lg:max-w-[880px]"
>
  <h1 class="cursor-default font-decorative text-xl tracking-wider text-white">
    <span
      class="before:mr-0.5 before:text-gray before:content-['<'] after:ml-0.5 after:text-gray after:content-['/>']"
    >
      Azganoth
    </span>
    <span class="text-orchid motion-safe:animate-blink" aria-hidden="true">
      _
    </span>
  </h1>
  <nav>
    {#if mobile.current}
      <div>
        <button
          bind:this={menuToggler}
          class="push-down block select-none text-2xl hover:text-orchid"
          type="button"
          onclick={() => {
            open = !open;
          }}
          aria-label="Abrir menu de navegação"
          aria-haspopup="true"
          aria-expanded={open}
        >
          <Icon name="menu" />
        </button>
        <ul
          class="fixed inset-x-0 top-24 origin-top rounded-2xl bg-charcoal px-4 py-8 shadow-elevation-medium duration-300 ease-out inert:invisible inert:-translate-y-2 inert:opacity-0 motion-safe:transition-visibility-transform"
          inert={!open}
          use:clickaway={{ ignoreNodes: [menuToggler] }}
          onclickaway={() => {
            open = false;
          }}
        >
          {#each links as { label, link, description } (link)}
            <li class="mt-4 text-center first:mt-0">
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
      <ul class="flex">
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
