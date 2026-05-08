import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ['"EB Garamond"', 'Georgia', 'serif'],
        body: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        // light theme
        paper: "#FAF8F3",
        ink: "#1A1A1A",
        "ink-muted": "#5C5C58",
        rule: "#D9D4C7",
        accent: "#3B5998",      // ink-blue
        "accent-warm": "#A33B2A", // muted brick-red for emphasis
        // dark theme
        midnight: "#0A1220",
        "midnight-elev": "#101A2C",
        cream: "#E8E0D2",
        "cream-muted": "#9A9182",
        "rule-dark": "#1F2A40",
        "accent-dark": "#7AA2D9",
        "accent-warm-dark": "#D9846E",
      },
      maxWidth: {
        prose: "68ch",
        wide: "84ch",
      },
      typography: {},
    },
  },
  plugins: [],
};

export default config;
