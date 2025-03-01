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
    <button onClick={toggleTheme} className="hover:bg-mantle p-2 rounded-full text-maroon hover:text-red transition-all">
      {theme === "dark" ? <Sun size={26} className="rounded-full" /> : <Moon size={26} className="rounded-full" />}
    </button>
  );
}
