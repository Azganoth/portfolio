<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import ProjectList from "$lib/features/projects/components/ProjectList.svelte";
  import type { ProjectSummary } from "$lib/features/projects/schema";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_PROJECTS_SECTION } from "$lib/shared/constants";

  interface Props {
    projects: ProjectSummary[];
  }

  let { projects }: Props = $props();
</script>

<Section id={ID_PROJECTS_SECTION} title={t("projects_title")}>
  <ProjectList class="pt-8 pb-32" {projects} />
</Section>
