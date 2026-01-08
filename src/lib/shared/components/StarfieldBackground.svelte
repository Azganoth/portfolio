<script lang="ts">
  import { mulberry32 } from "$lib/shared/utils";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;

  // Configuration
  const STAR_COUNT = 800;
  const PARALLAX_STRENGTH = 0.01;
  const VIRTUAL_WIDTH = 4000; // Cover 4k
  const COLOR_WHITE = "white";

  type Star = {
    x: number; // Relative to center
    y: number;
    z: number; // Depth: 0 (far) to 1 (near)
    size: number;
    color: string;
    pulseOffset: number;
    pulseSpeed: number;
  };

  onMount(() => {
    const random = mulberry32(1);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let mouse = { x: 0, y: 0 };
    let frameId: number;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      if (!ctx) return;

      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;

      // Handle High DPI
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    const initStars = () => {
      stars = [];

      for (let i = 0; i < STAR_COUNT; i++) {
        const x = (random() - 0.5) * VIRTUAL_WIDTH;
        const y = random() * document.body.scrollHeight;
        const z = 0.1 + random() * 0.9;
        const color = COLOR_WHITE;

        stars.push({
          x,
          y,
          z,
          size: 0.5 + z * 1.5,
          color,
          pulseOffset: random() * Math.PI * 2,
          pulseSpeed: 0.001 + random() * 0.003,
        });
      }
    };

    const animate = (time: number) => {
      if (!ctx) return;

      const scrollY = window.scrollY;

      const cx = w / 2;
      const cy = h / 2;
      const mouseOffsetX = (mouse.x - cx) * PARALLAX_STRENGTH;
      const mouseOffsetY = (mouse.y - cy) * PARALLAX_STRENGTH;

      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        // Mouse Parallax
        const apparentX = cx + star.x - mouseOffsetX * star.z;
        const apparentY = star.y - scrollY * star.z - mouseOffsetY * star.z;

        // Only render visible stars
        if (
          apparentX > -50 &&
          apparentX < w + 50 &&
          apparentY > -50 &&
          apparentY < h + 50
        ) {
          const pulse =
            (Math.sin(time * star.pulseSpeed + star.pulseOffset) + 1) / 2;
          const alpha = 0.3 + star.z * 0.4 + pulse * 0.2;

          // Draw Star
          ctx.beginPath();
          ctx.arc(apparentX, apparentY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      });

      frameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    resizeCanvas();
    initStars();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 -z-50"
  aria-hidden="true"
></canvas>
