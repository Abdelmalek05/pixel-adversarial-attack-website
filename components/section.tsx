interface SectionProps {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-12 py-16 md:py-24 border-b rule-line last:border-b-0">
      <header className="mb-10">
        <div
          className="small-caps text-[10px] mb-2"
          style={{ color: "rgb(var(--accent))" }}
        >
          § {number}
        </div>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">{title}</h2>
      </header>
      <div className="prose-content space-y-5 max-w-prose">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-[1.7]">{children}</p>;
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-xl leading-relaxed font-display italic" style={{ color: "rgb(var(--fg))" }}>{children}</p>;
}

export function FigureBlock({ children, caption, number }: {
  children: React.ReactNode;
  caption?: string;
  number?: string;
}) {
  return (
    <div className="my-10 max-w-none">
      {children}
      {(caption || number) && (
        <div className="mt-3 text-xs leading-relaxed max-w-prose" style={{ color: "rgb(var(--fg-muted))" }}>
          {number && (
            <span className="small-caps mr-2" style={{ color: "rgb(var(--accent))" }}>
              Fig. {number}
            </span>
          )}
          {caption}
        </div>
      )}
    </div>
  );
}
