<script lang="ts">
  import Icon from "@components/Icon.svelte";
  import { onMount } from "svelte";

  let hidden = $state(false);

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
  class="push-down fixed bottom-8 right-6 p-2 text-2xl text-white transition-visibility-transform duration-300 ease-out hover:text-orchid aria-hidden:invisible aria-hidden:translate-y-full aria-hidden:opacity-0 md:right-12"
  href="#start"
  aria-label="Voltar ao início"
  aria-hidden={hidden}
>
  <Icon name="back-to-top" />
</a>
