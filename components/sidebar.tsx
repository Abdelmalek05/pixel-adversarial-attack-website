"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const SECTIONS = [
  { id: "overview", label: "Overview", num: "00" },
  { id: "background", label: "Background", num: "01" },
  { id: "setup", label: "Setup & Baseline", num: "02" },
  { id: "fgsm", label: "White-Box: FGSM", num: "03" },
  { id: "blackbox", label: "Black-Box: DE Patches", num: "04" },
  { id: "threshold", label: "Patch-Size Threshold", num: "05" },
  { id: "comparison", label: "Comparison", num: "06" },
  { id: "discussion", label: "Discussion", num: "07" },
  { id: "team", label: "Team & Resources", num: "08" },
];

export function Sidebar() {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 rounded-sm border flex items-center justify-center font-mono text-sm"
        style={{
          background: "rgb(var(--bg))",
          borderColor: "rgb(var(--rule))",
        }}
      >
        {open ? "×" : "≡"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-72 border-r overflow-y-auto z-40 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "rgb(var(--bg))",
          borderColor: "rgb(var(--rule))",
        }}
      >
        <div className="px-8 py-10">
          {/* Brand / institution */}
          <div className="mb-12 pb-6 border-b rule-line">
            <div className="small-caps text-xs mb-3" style={{ color: "rgb(var(--fg-muted))" }}>
              ENSIA · CNS
            </div>
            <h1 className="font-display text-xl leading-tight mb-1">
              Adversarial Attacks
            </h1>
            <p className="font-display italic text-sm" style={{ color: "rgb(var(--fg-muted))" }}>
              on a YOLOv8 Aircraft Detector
            </p>
          </div>

          {/* Section nav */}
          <nav>
            <div className="small-caps text-[10px] mb-3" style={{ color: "rgb(var(--fg-muted))" }}>
              Contents
            </div>
            <ol className="space-y-0.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={`nav-link flex items-baseline gap-3 ${
                      active === s.id ? "active" : ""
                    }`}
                  >
                    <span className="font-mono text-[10px] tabular-nums opacity-60">
                      {s.num}
                    </span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Theme toggle and meta at the bottom */}
          <div className="mt-12 pt-6 border-t rule-line space-y-4">
            <div className="flex items-center justify-between">
              <span className="small-caps text-[10px]" style={{ color: "rgb(var(--fg-muted))" }}>
                Theme
              </span>
              <ThemeToggle />
            </div>
            <div className="text-xs leading-relaxed" style={{ color: "rgb(var(--fg-muted))" }}>
              May 2026 · Computer<br />and Network Security
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
}
