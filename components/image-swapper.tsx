"use client";

import { useState } from "react";

type Variant = {
  label: string;
  src: string;
  caption?: string;
};

interface ImageSwapperProps {
  variants: Variant[];
  legend?: string;
}

export function ImageSwapper({ variants, legend }: ImageSwapperProps) {
  const [idx, setIdx] = useState(0);
  const v = variants[idx];

  return (
    <div className="figure-frame p-4">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {variants.map((variant, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="text-xs font-mono px-2.5 py-1 transition-all"
            style={{
              background: idx === i ? "rgb(var(--accent))" : "transparent",
              color: idx === i ? "rgb(var(--bg))" : "rgb(var(--fg-muted))",
              border: `1px solid ${idx === i ? "rgb(var(--accent))" : "rgb(var(--rule))"}`,
              borderRadius: "2px",
            }}
          >
            {variant.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden" style={{ background: "rgb(var(--bg))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={v.src}
          alt={v.label}
          className="w-full h-auto block transition-opacity duration-200"
          loading="lazy"
        />
      </div>

      {(v.caption || legend) && (
        <div className="mt-3 text-xs" style={{ color: "rgb(var(--fg-muted))" }}>
          {v.caption && <span className="block">{v.caption}</span>}
          {legend && <span className="block mt-1">{legend}</span>}
        </div>
      )}
    </div>
  );
}
