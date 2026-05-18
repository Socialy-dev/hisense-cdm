import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#faf9f5",
        "cream-card": "#fefdf9",
        "cream-border": "#e8e6dc",
        ink: "#0e1a1f",
        "ink-soft": "#16201f",
        "ink-medium": "#2d3534",
        teal: "#00b3ac",
        "teal-glow": "#17d1ba",
        "gray-warm": "#b0aea5",
      },
      fontFamily: {
        alfabet: ["var(--font-alfabet)", "Inter", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
