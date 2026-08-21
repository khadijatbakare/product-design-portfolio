"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(
      "khadijat-theme",
    ) as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("khadijat-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-widest"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
      <span className="hidden md:inline">
        {theme === "light" ? "After hours" : "Daylight"}
      </span>
    </button>
  );
}
