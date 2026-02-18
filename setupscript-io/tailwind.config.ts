import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          red: "#ff1a1a",
          magenta: "#cc00ff",
          crimson: "#8b0000",
        },
      },
      boxShadow: {
        "neon-red": "0 0 12px rgba(255,26,26,0.5)",
        "neon-magenta": "0 0 12px rgba(204,0,255,0.5)",
        "neon-card": "0 0 0 1px #ff1a1a, 0 0 15px rgba(255,26,26,0.2)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        syne: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        setupscript: {
          primary: "#ff1a1a",
          "primary-content": "#ffffff",
          secondary: "#cc00ff",
          "secondary-content": "#ffffff",
          accent: "#8b0000",
          "accent-content": "#ffffff",
          neutral: "#111111",
          "neutral-content": "#888888",
          "base-100": "#0a0a0a",
          "base-200": "#111111",
          "base-300": "#0d0d0d",
          "base-content": "#e5e5e5",
          info: "#cc00ff",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#ff1a1a",
        },
      },
    ],
  },
};

export default config;
