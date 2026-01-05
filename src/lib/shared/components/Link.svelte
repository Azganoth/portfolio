<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface Props extends HTMLAnchorAttributes {
    variant?: "default" | "none";
    newTab?: boolean;
  }

  let {
    class: className,
    children,
    variant = "default",
    newTab,
    ...otherProps
  }: Props = $props();
</script>

<a
  class={[
    "font-bold transition-all ease-snappy",
    variant === "default" && "font-body hover:text-secondary",
    className,
  ]}
  {...newTab && { target: "_blank" }}
  {...otherProps}
>
  {@render children?.()}
</a>
