<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_CONTACT_SECTION } from "$lib/shared/constants";
  import { CONTACT_INFO } from "$lib/features/contact/data";
  import Icon from "@iconify/svelte";

  let copied = $state(false);
  let timeout: ReturnType<typeof setTimeout>;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        CONTACT_INFO.Email.replace("mailto:", ""),
      );
      copied = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  }
</script>

<Section
  id={ID_CONTACT_SECTION}
  class="flex min-h-[calc(100svh-50px-2rem)] flex-col pb-44"
  title={t("contact_title")}
>
  <div class="my-auto grid gap-16 xl:grid-cols-2">
    <!-- Headline and Specs -->
    <div>
      <h3 class="font-display text-4xl leading-tight font-bold md:text-5xl">
        {t("contact_message")}
      </h3>
    </div>
    <!-- Actions -->
    <div class="flex flex-col gap-4">
      <button
        type="button"
        class="tap-push group relative w-full gap-6 rounded-2xl border border-white/10 bg-muted px-6 py-4 font-bold transition-[color,background,scale] hover:scale-[1.01] hover:bg-muted-foreground/15 hover:text-primary active:scale-[0.99]"
        onclick={copyEmail}
      >
        <span class="font-mono tracking-widest uppercase">
          {CONTACT_INFO.Email}
        </span>
        <Icon
          class="absolute center-y right-4 size-5 transition-transform group-hover:-rotate-12"
          icon={copied ? "fa6-solid:check" : "fa6-solid:copy"}
        />
      </button>
      <div class="grid gap-4 md:grid-cols-2">
        <Link
          class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold transition-colors hover:bg-white/10 hover:text-primary"
          variant="none"
          href={CONTACT_INFO.WhatsApp}
          newTab
        >
          <Icon class="size-6" icon="simple-icons:whatsapp" />
          <span>Whatsapp</span>
        </Link>
        <Link
          class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold transition-colors hover:bg-white/10 hover:text-primary"
          variant="none"
          href={CONTACT_INFO.LinkedIn}
          newTab
        >
          <Icon class="size-6" icon="simple-icons:linkedin" />
          <span>LinkedIn</span>
        </Link>
        <Link
          class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold transition-colors hover:bg-white/10 hover:text-primary"
          variant="none"
          href={CONTACT_INFO.GitHub}
          newTab
        >
          <Icon class="size-6" icon="simple-icons:github" />
          <span>GitHub</span>
        </Link>
        <Link
          class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold transition-colors hover:bg-white/10 hover:text-primary"
          variant="none"
          href="/cv.pdf"
          newTab
        >
          <Icon class="size-6" icon="fa6-solid:file-pdf" />
          <span>Resume</span>
        </Link>
      </div>
    </div>
  </div>
</Section>
