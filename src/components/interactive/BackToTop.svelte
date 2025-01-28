<script lang="ts">
  import Icon from "@components/Icon.svelte";
  import { onMount } from "svelte";

  let hidden = $state(true);

  onMount(() => {
    const startSection = document.querySelector("#start");
    if (!startSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          hidden = entry.isIntersecting;
        });
      },
      { threshold: 0.99 },
    );

    observer.observe(startSection);
    return () => {
      observer.disconnect();
    };
  });
</script>

<a
  id="back-to-top-shortcut"
  class="push-on-active tablet:right-12 hover:text-orchid text-offwhite fixed bottom-8 right-6 p-2 duration-300 ease-out aria-hidden:invisible aria-hidden:translate-y-full aria-hidden:opacity-0 motion-safe:transition-[visibility,opacity,translate,scale]"
  href="#start"
  aria-label="Voltar ao início"
  aria-hidden={hidden}
>
  <Icon class="size-8" name="back-to-top" />
</a>
