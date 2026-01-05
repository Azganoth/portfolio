<script lang="ts" generics="Tag extends keyof SvelteHTMLElements = 'div'">
  import {
    inView,
    type InViewOptions,
  } from "$lib/shared/attachments/inview.svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type Props = SvelteHTMLElements[Tag] &
    Pick<InViewOptions, "root" | "rootMargin" | "threshold" | "once"> & {
      /**
       * The HTML tag to render.
       * @default "div"
       */
      tag?: Tag;
      /**
       * Override the default transition styles.
       * @default false
       */
      override?: boolean;
    };

  let {
    children,
    root,
    rootMargin,
    threshold = 0.3,
    once = true,
    tag = "div" as Tag,
    override = false,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={tag}
  class={[!override && "motion-reduce:transition- transition-all", className]}
  {...restProps}
  {@attach inView({ root, rootMargin, threshold, once })}
>
  {@render children?.()}
</svelte:element>
