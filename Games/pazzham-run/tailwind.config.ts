import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./tests/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        ink: "var(--shadow-strong)",
        soft: "var(--shadow-soft)",
      },
      borderRadius: {
        card: "var(--radius-lg)",
        button: "var(--radius-md)",
      },
      transitionTimingFunction: {
        expressive: "var(--motion-easing)",
      },
    },
  },
  plugins: [],
};

export default config;
