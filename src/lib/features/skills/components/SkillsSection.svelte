<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import { ADDITIONAL_SKILLS, SKILL_GROUPS } from "$lib/features/skills/data";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_SKILLS_SECTION, TAG_META } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const skillGroups = $derived(
    SKILL_GROUPS.map((group) => ({
      ...group,
      title: t(group.titleKey),
      description: t(group.descriptionKey),
    })),
  );
</script>

<Section id={ID_SKILLS_SECTION} title={t("skills_title")}>
  <p
    class="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground xl:mx-0 xl:text-start"
  >
    {t("skills_description")}
  </p>
  <div class="grid gap-4 lg:grid-cols-3">
    {#each skillGroups as { title, description, icon, skills }, groupIndex (title)}
      <Reveal
        class="rounded-3xl border border-white/10 bg-muted/15 p-6 delay-(--delay) duration-500 ease-out-expo not-in-view:translate-y-6 not-in-view:opacity-0 md:p-8"
        style={`--delay: ${groupIndex * 100}ms`}
      >
        <div
          class="mb-6 grid size-11 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary"
        >
          <Icon {icon} class="size-5" />
        </div>
        <div class="mb-7">
          <h3 class="font-display text-xl font-semibold tracking-tight">
            {title}
          </h3>
          <p class="mt-3 leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <ul class="grid grid-cols-2 gap-x-5 gap-y-3">
          {#each skills as skill (skill)}
            {@const { icon, color } = TAG_META[skill] ?? TAG_META["fallback"]}
            <li class="flex min-w-0 items-center gap-2.5 text-sm">
              <Icon class="size-4 shrink-0 opacity-80" {icon} {color} />
              <span
                class="truncate font-mono font-semibold tracking-wide text-foreground/85"
              >
                {skill}
              </span>
            </li>
          {/each}
        </ul>
      </Reveal>
    {/each}
  </div>

  <div
    class="mt-5 flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/2 px-5 py-4 md:flex-row md:items-center"
  >
    <span
      class="shrink-0 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase"
    >
      {t("skills_category_additional")}
    </span>
    <span class="hidden h-4 w-px bg-white/10 md:block"></span>
    <ul class="flex flex-wrap gap-x-4 gap-y-2">
      {#each ADDITIONAL_SKILLS as skill (skill)}
        <li class="text-sm text-foreground/70">{skill}</li>
      {/each}
    </ul>
  </div>
</Section>
