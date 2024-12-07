import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,ts,tsx}"],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      slate: "#0b0b0f", // background 1
      charcoal: "#16161d", // background 2
      white: "#f8f8f8", // text 1
      gray: "#5e5e6a", // text 2
      orchid: "#8a49ff", // accent 1
      green: "#06d79c", // accent 2
      pink: "#fb839e", // accent 3
    },
    fontSize: {
      "3xl": "3rem",
      "2xl": "2rem",
      xl: "1.5rem",
      l: "1.25rem",
      m: "1rem",
      s: "0.875rem",
    },
    fontFamily: {
      display: ["Paytone One", "sans-serif"],
      regular: ["Inter", "sans-serif"],
      code: ["Cascadia Code", "monospace"],
      decorative: ["Patua One", "sans-serif"],
    },
    letterSpacing: {
      wider: "1px",
      wide: "0.5px",
      normal: "0",
      tight: "-0.25px",
    },
    screens: {
      md: "768px", // tablet
      lg: "1440px", // desktop
    },
    extend: {
      zIndex: {
        1: "1",
      },
      scale: {
        25: "0.25",
      },
      boxShadow: {
        elevation: "0 0.25rem 0.5rem 0 rgba(0 0 0 / 0.25)",
        "elevation-small": "0 0 0.25rem 0 rgba(0 0 0 / 0.25)",
      },
      dropShadow: {
        "stand-out": "0 0 0.25rem rgba(0 0 0 / 0.75)",
      },
      transitionProperty: {
        visibility: "opacity, visibility",
        "visibility-transform": "opacity, visibility, transform",
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "40%": { opacity: 0 },
          "30%, 50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("inert", "&[inert]");
    }),
  ],
};
