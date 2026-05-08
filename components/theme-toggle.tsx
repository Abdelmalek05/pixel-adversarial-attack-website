"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-8 w-14 rounded-full border opacity-0"
        style={{ borderColor: "rgb(var(--rule))" }}
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="group relative h-8 w-14 rounded-full border transition-colors"
      style={{ borderColor: "rgb(var(--rule))", background: "rgb(var(--surface-elev))" }}
    >
      <span
        className="absolute top-0.5 h-6 w-6 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          left: theme === "dark" ? "1.5rem" : "0.125rem",
          background: theme === "dark" ? "rgb(var(--accent))" : "rgb(var(--fg))",
          color: theme === "dark" ? "rgb(var(--bg))" : "rgb(var(--bg))",
        }}
      >
        <span className="text-[11px] leading-none">
          {theme === "dark" ? "☾" : "☼"}
        </span>
      </span>
    </button>
  );
}
