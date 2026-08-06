<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import { SKILLS, TAG_META } from "$lib/features/skills/data";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_SKILLS_SECTION } from "$lib/shared/constants";

  const skillGroups = $derived(
    Object.entries(SKILLS).map(([key, skills]) => ({
      title: t(`skills_category_${key as keyof typeof SKILLS}`),
      skills,
    })),
  );
</script>

<Section id={ID_SKILLS_SECTION} title={t("skills_title")}>
  <dl class="mt-12 flex flex-col">
    {#each skillGroups as { title, skills }, groupIndex (title)}
      <Reveal
        class="border-t border-white/8 py-6 delay-(--delay) duration-500 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
        style={`--delay: ${groupIndex * 80}ms`}
      >
        <dt class="mb-6 eyebrow text-secondary">
          {title}
        </dt>
        <dd>
          <ul class="flex flex-wrap gap-x-3 gap-y-2.5">
            {#each skills as skill (skill)}
              {@const { icon: SkillIcon, color } =
                TAG_META[skill] ?? TAG_META["fallback"]}
              <li
                class="group/skill flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-2.5 py-2.5 text-sm transition-colors select-none hover:border-white/20 hover:bg-white/8"
              >
                <SkillIcon
                  class="size-6 shrink-0 text-(--brand)"
                  style="--brand: {color}"
                />
                <span
                  class="font-mono font-semibold tracking-wide text-foreground/90"
                >
                  {skill}
                </span>
              </li>
            {/each}
          </ul>
        </dd>
      </Reveal>
    {/each}
  </dl>
</Section>
