<script lang="ts">
  import { mulberry32 } from "$lib/utils/random";
  import { onMount } from "svelte";

  const random = mulberry32(1);

  let canvasFar: HTMLCanvasElement;
  let canvasMid: HTMLCanvasElement;
  let canvasNear: HTMLCanvasElement;

  type Star = {
    x: number;
    y: number;
    r: number;
    pulseOffset: number;
    pulseSpeed: number;
  };

  onMount(() => {
    const layers = [
      {
        el: canvasFar,
        speed: 0.25,
        numStars: 300,
        size: 0.5,
        stars: [] as Star[],
      },
      {
        el: canvasMid,
        speed: 0.5,
        numStars: 150,
        size: 1,
        stars: [] as Star[],
      },
      {
        el: canvasNear,
        speed: 0.75,
        numStars: 75,
        size: 1.5,
        stars: [] as Star[],
      },
    ];

    // Viewport dimensions
    let w = 0;
    let h = 0;

    function setup() {
      w = window.innerWidth;
      h = window.innerHeight;

      layers.forEach((layer) => {
        layer.el.width = w;
        layer.el.height = h;
        layer.stars = [];

        for (let i = 0; i < layer.numStars; i++) {
          layer.stars.push({
            x: random() * w,
            y: random() * document.body.scrollHeight, // Stars are positioned along the whole page
            r: random() * layer.size,
            pulseOffset: random() * Math.PI * 2, // Randomize starting pulse strength
            pulseSpeed: 0.0005 + random() * 0.001, // Randomize speed (0.0005 - 0.0015, used against milliseconds)
          });
        }
      });
    }

    function animate(time: number) {
      const scrollY = window.scrollY;

      layers.forEach((layer) => {
        const ctx = layer.el.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, w, h);

        layer.stars.forEach((star) => {
          // Parallax effect, calculate the star's apparent position in the viewport
          const y = star.y - scrollY * layer.speed;

          // Only draw stars that are currently visible
          if (y > -star.r && y < h + star.r) {
            const pulse =
              (Math.sin(time * star.pulseSpeed + star.pulseOffset) + 1) / 2;
            ctx.globalAlpha = 0.2 + pulse * 0.8;

            ctx.beginPath();
            ctx.arc(star.x, y, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", setup);

    setup();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setup);
    };
  });
</script>

<div
  aria-hidden="true"
  class="**:[canvas]:fixed **:[canvas]:inset-0.5 **:[canvas]:-z-50 fixed inset-0 -z-50"
>
  <canvas bind:this={canvasFar}></canvas>
  <canvas bind:this={canvasMid}></canvas>
  <canvas bind:this={canvasNear}></canvas>
</div>
