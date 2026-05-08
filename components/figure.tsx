"use client";

import { useState } from "react";

interface FigureProps {
  src: string;
  caption?: string;
  alt?: string;
  number?: string;
}

export function Figure({ src, caption, alt, number }: FigureProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <figure className="figure-frame p-4">
        <button
          onClick={() => setZoomed(true)}
          className="block w-full overflow-hidden cursor-zoom-in group"
          aria-label="Zoom figure"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || caption || "figure"}
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
          />
        </button>
        {(caption || number) && (
          <figcaption
            className="mt-3 text-xs leading-relaxed"
            style={{ color: "rgb(var(--fg-muted))" }}
          >
            {number && (
              <span className="small-caps mr-2" style={{ color: "rgb(var(--accent))" }}>
                Fig. {number}
              </span>
            )}
            {caption}
          </figcaption>
        )}
      </figure>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setZoomed(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || caption || "figure"}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-mono"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
