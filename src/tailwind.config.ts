
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#141413",
          light: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#FAFAF8",
          light: "#141413",
        },
        muted: {
          DEFAULT: "#828179",
          light: "#666666",
        },
        accent: "#61AAF2",
        bubble: {
          received: {
            DEFAULT: "#4B5563",
            light: "#E5E7EB",
          },
          sent: "#61AAF2",
        },
        border: {
          DEFAULT: "#ffffff14",
          light: "#00000014",
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
