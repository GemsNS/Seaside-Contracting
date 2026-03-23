import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-aqua": "var(--primary-aqua)",
        "base-black": "var(--base-black)",
        "base-white": "var(--base-white)",
        "neutral-offwhite": "var(--neutral-offwhite)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(2.25rem,5vw,3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: {
        architectural: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        450: "450ms",
        650: "650ms",
      },
    },
  },
  plugins: [],
};

export default config;
