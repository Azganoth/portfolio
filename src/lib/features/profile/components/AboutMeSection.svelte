<script lang="ts">
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import ProjectLink from "$lib/features/projects/components/ProjectLink.svelte";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_BIO_SECTION } from "$lib/shared/constants";
  import { IconGlobe, IconGraduationCap, IconMapPin } from "$lib/shared/icons";
  import profileImage from "$lib/shared/images/profile.webp?enhanced";

  const footerSections = $derived([
    {
      label: t("bio_stat_education_label"),
      value: t("bio_stat_education_value"),
      icon: IconGraduationCap,
      accent: "text-primary",
    },
    {
      label: t("bio_stat_languages_label"),
      value: t("bio_stat_languages_value"),
      icon: IconGlobe,
      accent: "text-secondary",
    },
    {
      label: t("bio_stat_location_label"),
      value: t("bio_stat_location_value"),
      icon: IconMapPin,
      accent: "text-accent",
    },
  ]);
</script>

{#snippet leafdown()}
  <ProjectLink class="text-white" slug="leafdown">Leafdown</ProjectLink>
{/snippet}
{#snippet nexus()}
  <ProjectLink class="text-white" slug="nexus">Nexus</ProjectLink>
{/snippet}
{#snippet fixmyhalo()}
  <ProjectLink class="text-white" slug="fixmyhalo">Fix My Halo</ProjectLink>
{/snippet}
{#snippet cropandquest()}
  <ProjectLink class="text-white" slug="cropandquest">Crop & Quest</ProjectLink>
{/snippet}
{#snippet pixelicons()}
  <ProjectLink class="text-white" slug="pixelicons">Pixel Icons</ProjectLink>
{/snippet}

<Section id={ID_BIO_SECTION}>
  <Reveal
    class="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-muted/70 shadow-elevation backdrop-blur-md duration-700 ease-out-expo not-in-view:translate-y-8 not-in-view:opacity-0"
  >
    <div class="grid md:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.65fr)]">
      <div class="relative min-h-72 overflow-hidden md:min-h-140">
        <enhanced:img
          class="absolute inset-0 h-full w-full object-cover object-center"
          src={profileImage}
          alt={t("a11y_avatar_alt")}
        />
      </div>

      <div class="flex min-w-0 flex-col">
        <div class="p-6 md:p-10 lg:p-12">
          <h2
            class="mb-4 font-mono font-bold tracking-widest text-primary uppercase"
          >
            {t("bio_title")}
          </h2>
          <div
            class="max-w-3xl space-y-4 leading-relaxed text-muted-foreground md:text-lg"
          >
            <p>
              <Translation key="bio_description_1" />
            </p>
            <p>
              <Translation
                key="bio_description_2"
                values={{ leafdown, nexus }}
              />
            </p>
            <p>
              <Translation
                key="bio_description_3"
                values={{ cropandquest, fixmyhalo, pixelicons }}
              />
            </p>
          </div>
        </div>

        <div
          class="mt-auto grid border-t border-white/8 sm:grid-cols-3 sm:divide-x sm:divide-white/8"
        >
          {#each footerSections as { label, value, icon: StatIcon, accent } (value)}
            <div
              class="flex items-start gap-3 border-b border-white/8 px-5 py-5 last:border-b-0 sm:border-b-0"
            >
              <StatIcon class={["mt-0.5 size-4 shrink-0", accent]} />
              <div class="min-w-0">
                <p
                  class="text-sm font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  {label}
                </p>
                <p class="mt-1 text-sm font-semibold text-foreground">
                  {value}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Reveal>
</Section>
