import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#E3F2FD", // Light Blue background
            foreground: "#0D47A1", // Dark Blue text for contrast
            primary: {
              DEFAULT: "#2196F3",
              foreground: "#FFFFFF",
            },
            focus: "#2196F3",
          },
        },
        dark: {
          colors: {
            background: "#0A1929", // Very Dark Blue background
            foreground: "#E3F2FD", // Light Blue text
            primary: {
              DEFAULT: "#64B5F6",
              foreground: "#0A1929",
            },
            focus: "#64B5F6",
          },
        },
      },
    }),
  ],
};

export default config;
