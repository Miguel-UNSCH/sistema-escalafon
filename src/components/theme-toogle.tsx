"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="hover:bg-mantle p-2 rounded-full text-maroon hover:text-red transition-all">
      {theme === "dark" ? <Sun size={26} className="rounded-full" /> : <Moon size={26} className="rounded-full" />}
    </button>
  );
}
