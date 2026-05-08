interface StatProps {
  value: string;
  label: string;
  sublabel?: string;
  warm?: boolean;
}

export function Stat({ value, label, sublabel, warm }: StatProps) {
  return (
    <div className="border-t-2 pt-4" style={{ borderColor: "rgb(var(--fg))" }}>
      <div className="stat-num text-5xl mb-2" style={{
        color: warm ? "rgb(var(--accent-warm))" : "rgb(var(--fg))"
      }}>
        {value}
      </div>
      <div className="small-caps text-[10px] mb-1" style={{ color: "rgb(var(--fg-muted))" }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs italic" style={{ color: "rgb(var(--fg-muted))" }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
