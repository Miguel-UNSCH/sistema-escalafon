"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="hover:bg-[#ccd0da] p-2 rounded-full transition-all">
      {theme === "dark" ? <Sun size={26} className="rounded-full text-[#f38ba8]" /> : <Moon size={26} className="rounded-full text-[#d20f39]" />}
    </button>
  );
}
