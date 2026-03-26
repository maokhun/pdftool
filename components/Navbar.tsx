"use client";

import { useEffect, useState } from "react";
import { LogoIcon, MoonIcon, SunIcon, UserIcon } from "@/components/icons";

const menuItems = [
  "Edit",
  "Merge",
  "Convert",
  "Compress",
  "More Tools",
  "Plans"
];

type ThemeMode = "light" | "dark";

export default function Navbar() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("pdf_theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme: ThemeMode = prefersDark ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("pdf_theme", theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 mb-8 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-soft dark:bg-white dark:text-slate-900">
            <LogoIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold">Nimbus PDF</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Smart document workspace
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          {menuItems.map((item) => (
            <button
              key={item}
              className="transition hover:text-slate-900 dark:hover:text-white"
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-700/70 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white text-slate-700 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-700/70 dark:bg-slate-900 dark:text-slate-100"
            aria-label="User profile"
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
