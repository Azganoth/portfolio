<script lang="ts">
  import { dev } from "$app/environment";
  import ProjectView from "$lib/components/ProjectView.svelte";
  import interVarWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import "../app.css";

  let { children } = $props();

  const title = "Azganoth - Desenvolvedor FullStack";
  const description =
    "Portfólio para apresentar as minhas habilidades e projetos.";
  const url = "https://azganoth.vercel.app/";
  const metaImage = "/meta_image.png";

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={interVarWoff2}
    crossorigin="anonymous"
  />
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={metaImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={metaImage} />
</svelte:head>

{@render children()}
<ProjectView />
