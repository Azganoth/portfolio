<script lang="ts">
  import { t, translationStore } from "$lib/features/i18n/translation.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";
  import { SITE_URL } from "$lib/shared/constants";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const syncLocale = () => {
    translationStore.locale = data.locale;
  };

  syncLocale();

  const project = $derived(data.project);
  const eyebrow = $derived(
    project ? `${project.year}/${project.category}` : t("start_role"),
  );
  const title = $derived(
    project?.title ?? t("start_hello", { name: "Ademir" }),
  );
  const summary = $derived(project?.summary);
  const preview = $derived(project?.previews[0]);
  const host = $derived(new URL(SITE_URL).host);
</script>

<svelte:head>
  <title>OG Preview</title>
</svelte:head>

<div
  data-og-card
  class="relative flex h-157.5 w-300 flex-col justify-between overflow-hidden bg-background p-16"
>
  <div
    class="pointer-events-none absolute -top-40 -left-40 size-144 rounded-full bg-primary/10 blur-3xl"
  ></div>

  <div class="relative flex items-start justify-between">
    <Logo class="h-12 w-auto" />
    <span class="font-mono text-xl text-muted-foreground">{host}</span>
  </div>

  <div class="relative flex items-center gap-14">
    <div
      class={[
        "flex min-w-0 flex-1 flex-col gap-6",
        !summary && "flex-col-reverse",
      ]}
    >
      <span class="eyebrow text-2xl text-primary">{eyebrow}</span>
      <h1
        class="font-display text-7xl font-bold tracking-tight text-balance text-white"
      >
        {title}
      </h1>
      {#if summary}
        <p class="text-2xl leading-relaxed text-muted-foreground">
          {summary}
        </p>
      {/if}
    </div>

    {#if preview}
      <img
        class="h-70 w-105 shrink-0 rounded-2xl border border-white/10 object-cover shadow-2xl"
        src={preview.url}
        width={preview.width}
        height={preview.height}
        alt=""
      />
    {/if}
  </div>

  <div class="relative h-2 w-32 rounded-full bg-primary shadow-glow"></div>
</div>
