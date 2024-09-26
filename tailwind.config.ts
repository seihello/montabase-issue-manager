import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...fontFamily.sans],
    },
    extend: {
      width: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "176": "44rem",
        "192": "48rem",
        "208": "52rem",
        "224": "56rem",
        "256": "64rem",
      },
      colors: {
        main: {
          50: "#e4edff",
          100: "#cfdfff",
          300: "#83acff",
          500: "#0055ff",
          700: "#0044cb",
          900: "#002060",
        },
        warning: {
          100: "#FFF4E4",
          500: "#D9CA7B",
          900: "#9E8E00",
        },
        error: {
          100: "#FFEEEF",
          500: "#F55C67",
          900: "#DD224F",
        },
        gray: {
          100: "#F3F5F7",
          200: "#E2E5E7",
          300: "#D4D7DD",
          400: "#CBCBCF",
          500: "#ABAFB5",
          600: "#989DA5",
          700: "#747A81",
          800: "#5A5F62",
          900: "#1F2324",
        },
        background: "#ffffff",
        foreground: "#030712",
        primary: "#002060",
        "primary-foreground": "#f9fafb",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#002060", // same as primary
        secondary: "#f3f4f6",
        "secondary-foreground": "#111827",
        destructive: "#dd224f",
        "destructive-foreground": "#f9fafb",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        accent: "#f3f4f6",
        "accent-foreground": "#111827",
        popover: "#ffffff",
        "popover-foreground": "#030712",
        tooltip: "#374151",
        "tooltip-foreground": "#ffffff",
        card: "#ffffff",
        "card-foreground": "#030712",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
