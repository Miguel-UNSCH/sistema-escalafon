/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-main": "var(--bg-main)",
        "bg-section": "var(--bg-section)",
        "bg-block": "var(--bg-block)",
        "bg-alt": "var(--bg-alt)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-button": "var(--bg-button)",
        "bg-dropdown": "var(--bg-dropdown)",

        "text-primary": "var(--text-primary)",
        "text-main": "var(--text-main)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-title": "var(--text-title)",
        "text-headline": "var(--text-headline)",
        "text-subtitle": "var(--text-subtitle)",
        "text-section": "var(--text-section)",
        "text-section-title": "var(--text-section-title)",
        "text-link": "var(--text-link)",
        "text-link-hover": "var(--text-link-hover)",
        "text-button": "var(--text-button)",
        "text-warning": "var(--text-warning)",
        "text-error": "var(--text-error)",

        "header-primary": "var(--header-primary)",
        "title-main": "var(--title-main)",
        "header-secondary": "var(--header-secondary)",
        "title-sub": "var(--title-sub)",
        "section-header": "var(--section-header)",
        "subsection-header": "var(--subsection-header)",

        "button-primary": "var(--button-primary)",
        "button-secondary": "var(--button-secondary)",
        "button-confirm": "var(--button-confirm)",
        "button-cancel": "var(--button-cancel)",
        "button-danger": "var(--button-danger)",
        "button-hover": "var(--button-hover)",
        "button-disabled": "var(--button-disabled)",

        "link-main": "var(--link-main)",
        "link-hover": "var(--link-hover)",
        "link-disabled": "var(--link-disabled)",

        "box-shadow": "var(--box-shadow)",
        "border-primary": "var(--border-primary)",
        "border-focus": "var(--border-focus)",
        "border-disabled": "var(--border-disabled)",
        "text-shadow": "var(--text-shadow)",

        "alert-success": "var(--alert-success)",
        "alert-warning": "var(--alert-warning)",
        "alert-error": "var(--alert-error)",
        "alert-info": "var(--alert-info)",

        "icon-main": "var(--icon-main)",
        "icon-hover": "var(--icon-hover)",
        "icon-action": "var(--icon-action)",
        "icon-disabled": "var(--icon-disabled)",

        "navbar-background": "var(--navbar-background)",
        "footer-background": "var(--footer-background)",
        "input-checked": "var(--input-checked)",
        "input-placeholder": "var(--input-placeholder)",
        "loading-bar": "var(--loading-bar)",
        "loading-spinner": "var(--loading-spinner)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
