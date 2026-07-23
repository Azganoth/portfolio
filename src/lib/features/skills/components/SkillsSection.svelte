<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import { SKILL_GROUPS } from "$lib/features/skills/data";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_SKILLS_SECTION, TAG_META } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const skillGroups = $derived(
    SKILL_GROUPS.map((group) => ({
      ...group,
      title: t(group.titleKey),
    })),
  );
</script>

<Section id={ID_SKILLS_SECTION} title={t("skills_title")}>
  <p
    class="mx-auto mb-8 max-w-3xl text-center leading-relaxed text-muted-foreground xl:mx-0 xl:text-start"
  >
    {t("skills_description")}
  </p>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    {#each skillGroups as { title, emphasis, skills } (title)}
      <div
        class={[
          "rounded-3xl border p-6 md:p-8",
          emphasis === "primary" &&
            "border-primary/25 bg-primary/5 shadow-glow lg:col-span-2",
          emphasis === "supporting" && "border-white/10 bg-muted/20",
          emphasis === "additional" &&
            "border-white/5 bg-white/2 lg:col-span-3",
        ]}
      >
        <div class="mb-6">
          <h3
            class={[
              "font-display font-semibold",
              emphasis === "primary" ? "text-xl" : "text-lg",
              emphasis === "additional" && "text-foreground/80",
            ]}
          >
            {title}
          </h3>
        </div>
        <ul class="flex flex-wrap gap-3">
          {#each skills as skill, i (skill)}
            {@const { icon, color } = TAG_META[skill] ?? TAG_META["fallback"]}
            <Reveal
              tag="li"
              class="delay-(--delay) duration-400 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
              style={`--delay: ${i * 100}ms`}
            >
              <div
                class={[
                  "group flex items-center rounded-lg border transition-all ease-snappy",
                  emphasis === "additional"
                    ? "gap-2 border-white/5 bg-white/3 px-3 py-2 text-xs text-foreground/70 hover:border-white/10 hover:text-foreground"
                    : "gap-3 border-white/10 bg-white/5 p-3 text-sm hover:-translate-y-1",
                ]}
              >
                <Icon
                  class={[
                    "transition-transform group-hover:-rotate-12",
                    emphasis === "additional" ? "size-4 opacity-75" : "size-5",
                  ]}
                  {icon}
                  {color}
                />
                <span
                  class={[
                    "cursor-default font-mono font-bold tracking-wide duration-300 ease-out",
                    emphasis !== "additional" && "text-foreground/90",
                  ]}
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
