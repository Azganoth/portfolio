<script lang="ts">
  import { CONTACT_INFO } from "$lib/features/contact/data";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_CONTACT_SECTION } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const cvHref = $derived(t("_cv_href"));
  const otherContacts = $derived([
    { link: CONTACT_INFO.GitHub, label: "GitHub" },
    { link: CONTACT_INFO.WhatsApp, label: "WhatsApp" },
    { link: cvHref, label: t("start_curriculum") },
  ]);
</script>

<Section
  id={ID_CONTACT_SECTION}
  class="flex min-h-[calc(100svh-4.5rem)] flex-col justify-center pb-10 md:pb-12"
>
  <div
    class="relative grid gap-12 overflow-hidden rounded-3xl border border-white/10 bg-muted/20 p-6 shadow-elevation md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:p-14"
  >
    <div class="min-w-0">
      <p
        class="mb-5 font-mono text-xs font-bold tracking-widest text-secondary uppercase"
      >
        {t("contact_title")}
      </p>
      <h2
        class="max-w-3xl min-w-0 font-display text-2xl font-bold text-balance wrap-break-word sm:text-4xl"
      >
        {t("contact_message")}
      </h2>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {t("contact_description")}
      </p>
      <div class="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <span class="flex items-center gap-2 text-green-400">
          <span class="size-2 rounded-full bg-green-400"></span>
          {t("contact_status_available")}
        </span>
        <span class="flex items-center gap-2 text-muted-foreground">
          <Icon icon="lucide:map-pin" class="size-4" />
          {t("bio_stat_location_value")}
        </span>
      </div>
    </div>

    <div class="flex min-w-0 flex-col gap-3">
      <Link
        class="group flex items-center justify-between rounded-xl bg-primary px-5 py-4 font-mono font-bold text-background shadow-glow transition-colors hover:bg-primary/85"
        variant="none"
        href={CONTACT_INFO.Email}
      >
        <span>{t("contact_email_cta")}</span>
        <Icon
          icon="fa6-solid:arrow-right"
          class="size-4 transition-transform group-hover:translate-x-1"
        />
      </Link>
      <Link
        class="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-5 py-4 font-mono font-bold text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
        variant="none"
        href={CONTACT_INFO.LinkedIn}
        newTab
      >
        <span>{t("contact_connect")}</span>
        <Icon
          icon="fa6-solid:arrow-up-right-from-square"
          class="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
      <div class="mt-4 flex flex-wrap gap-x-5 gap-y-3">
        <span
          class="w-full font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          {t("contact_elsewhere")}
        </span>
        {#each otherContacts as { link, label } (link)}
          <Link
            variant="none"
            class="text-sm text-muted-foreground hover:text-foreground"
            href={link}
            newTab
          >
            {label}
          </Link>
        {/each}
      </div>
    </div>

    <div
      class="pointer-events-none absolute -right-32 -bottom-40 size-100 rounded-full bg-primary/12 blur-3xl"
    ></div>
  </div>
</Section>
