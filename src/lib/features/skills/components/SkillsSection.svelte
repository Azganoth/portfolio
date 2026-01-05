<script lang="ts">
  import {
    t,
    type TranslationKey,
  } from "$lib/features/i18n/translation.svelte";
  import { SKILLS_BY_CATEGORY } from "$lib/features/skills/data";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_SKILLS_SECTION, TAG_META } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const categorizedSkills = $derived(
    Object.entries(SKILLS_BY_CATEGORY).map(([category, skills]) => ({
      category: t(category as TranslationKey),
      skills,
    })),
  );
</script>

<Section id={ID_SKILLS_SECTION} title={t("skills_title")}>
  <div
    class="flex flex-col flex-wrap items-center justify-center gap-8 xl:flex-row xl:items-start xl:gap-y-16"
  >
    {#each categorizedSkills as { category, skills } (category)}
      <div class="max-w-96">
        <h3
          class="relative mb-12 text-center text-lg font-semibold after:absolute after:-bottom-4 after:center-x after:h-1 after:w-8 after:rounded-full after:bg-primary after:content-['']"
        >
          {category}
        </h3>
        <ul class="flex flex-wrap justify-center gap-4">
          {#each skills as skill, i (skill)}
            {@const { icon, color } = TAG_META[skill]}
            <Reveal
              class="delay-(--delay) duration-400 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
              style={`--delay: ${i * 100}ms`}
            >
              <div
                class="group flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm transition-transform ease-snappy hover:scale-110"
              >
                <Icon
                  class="size-5 transition-transform group-hover:-rotate-12"
                  {icon}
                  {color}
                />
                <span
                  class="cursor-default font-mono font-bold tracking-wide text-foreground/90 duration-300 ease-out"
                >
                  {skill}
                </span>
              </div>
            </Reveal>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</Section>
