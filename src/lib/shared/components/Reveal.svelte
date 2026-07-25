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
      /**
       * Render already revealed, without observing the viewport.
       *
       * Above-the-fold content is always intersecting, so observing it only
       * delays its first paint until hydration runs. Use this for content that
       * must paint immediately, such as the LCP element.
       * @default false
       */
      immediate?: boolean;
    };

  let {
    children,
    root,
    rootMargin,
    threshold = 0.3,
    once = true,
    tag = "div" as Tag,
    override = false,
    immediate = false,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={tag}
  class={[
    !override &&
      "transition-all motion-reduce:transform-none motion-reduce:transition-none",
    immediate && "is-visible",
    className,
  ]}
  {...restProps}
  {@attach immediate
    ? () => {}
    : inView({ root, rootMargin, threshold, once })}
>
  {@render children?.()}
</svelte:element>
