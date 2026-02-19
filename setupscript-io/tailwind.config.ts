import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          red: "#b91c1c", // Refined from #ff1a1a
          magenta: "#cc00ff",
          crimson: "#8b0000",
        },
      },
      boxShadow: {
        "neon-red": "0 0 12px rgba(185, 28, 28, 0.5)",
        "neon-magenta": "0 0 12px rgba(204,0,255,0.5)",
        "neon-card": "0 0 0 1px #b91c1c, 0 0 15px rgba(185, 28, 28, 0.2)",
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
          primary: "#b91c1c",
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
          error: "#b91c1c",
        },
      },
    ],
  },
};

export default config;
