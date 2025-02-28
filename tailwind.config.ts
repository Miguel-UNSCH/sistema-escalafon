/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", "class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rosewater: "var(--ctp-rosewater)",
        flamingo: "var(--ctp-flamingo)",
        pink: "var(--ctp-pink)",
        mauve: "var(--ctp-mauve)",
        red: "var(--ctp-red)",
        maroon: "var(--ctp-maroon)",
        peach: "var(--ctp-peach)",
        yellow: "var(--ctp-yellow)",
        green: "var(--ctp-green)",
        teal: "var(--ctp-teal)",
        sky: "var(--ctp-sky)",
        sapphire: "var(--ctp-sapphire)",
        blue: "var(--ctp-blue)",
        lavender: "var(--ctp-lavender)",

        text: "var(--ctp-text)",
        subtext1: "var(--ctp-subtext1)",
        subtext0: "var(--ctp-subtext0)",
        overlay2: "var(--ctp-overlay2)",
        overlay1: "var(--ctp-overlay1)",
        overlay0: "var(--ctp-overlay0)",
        surface2: "var(--ctp-surface2)",
        surface1: "var(--ctp-surface1)",
        surface0: "var(--ctp-surface0)",
        base: "var(--ctp-base)",
        mantle: "var(--ctp-mantle)",
        crust: "var(--ctp-crust)",

        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
} satisfies Config;
