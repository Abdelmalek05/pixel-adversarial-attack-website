"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";

const DATA = [
  { size: 8, area: 0.125, fitness: 0.319, displayValue: 0.319, success: false, queries: 8192 },
  { size: 12, area: 0.281, fitness: 0.273, displayValue: 0.273, success: false, queries: 8192 },
  { size: 16, area: 0.500, fitness: 0.0, displayValue: 0.05, success: true, queries: 2048 },
  { size: 20, area: 0.781, fitness: 0.0, displayValue: 0.05, success: true, queries: 1024 },
  { size: 24, area: 1.125, fitness: 0.0, displayValue: 0.05, success: true, queries: 1024 },
];

function useThemeColors() {
  const [colors, setColors] = useState({
    accent: "#3B5998",
    accentWarm: "#A33B2A",
    fg: "#1A1A1A",
    fgMuted: "#5C5C58",
    success: "#4F7A4A",
  });
  useEffect(() => {
    function update() {
      const isDark = document.documentElement.classList.contains("dark");
      setColors({
        accent: isDark ? "#7AA2D9" : "#3B5998",
        accentWarm: isDark ? "#D9846E" : "#A33B2A",
        fg: isDark ? "#E8E0D2" : "#1A1A1A",
        fgMuted: isDark ? "#9A9182" : "#5C5C58",
        success: isDark ? "#7BAA76" : "#4F7A4A",
      });
    }
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return colors;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="px-3 py-2 text-xs font-mono space-y-0.5"
      style={{
        background: "rgb(var(--bg))",
        border: "1px solid rgb(var(--rule))",
        color: "rgb(var(--fg))",
      }}
    >
      <div className="text-base">{d.size}×{d.size} px</div>
      <div style={{ color: "rgb(var(--fg-muted))" }}>area: {d.area.toFixed(3)}%</div>
      <div style={{ color: "rgb(var(--fg-muted))" }}>fitness: {d.fitness.toFixed(3)}</div>
      <div style={{ color: "rgb(var(--fg-muted))" }}>queries used: {d.queries.toLocaleString()}</div>
      <div className={d.success ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}>
        {d.success ? "✓ attack succeeded" : "✗ attack failed"}
      </div>
    </div>
  );
}

export function PatchSweepChart() {
  const colors = useThemeColors();

  return (
    <div className="figure-frame p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="small-caps text-[10px] mb-1" style={{ color: "rgb(var(--fg-muted))" }}>
            Patch-Size Sweep
          </div>
          <div className="font-display text-lg">Phase transition at 16×16</div>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3" style={{ background: colors.accentWarm }} />
            <span style={{ color: "rgb(var(--fg-muted))" }}>fail</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-3" style={{ background: colors.success }} />
            <span style={{ color: "rgb(var(--fg-muted))" }}>success</span>
          </span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 10, right: 30, bottom: 30, left: 10 }}>
            <CartesianGrid strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="size"
              tickFormatter={(v) => `${v}px`}
              axisLine={{ stroke: colors.fgMuted }}
              tickLine={false}
              label={{
                value: "patch side length",
                position: "insideBottom",
                offset: -16,
                fill: colors.fgMuted,
                fontSize: 11,
                fontFamily: "JetBrains Mono",
              }}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 0.4]}
              tickFormatter={(v) => v.toFixed(2)}
              axisLine={false}
              tickLine={false}
              label={{
                value: "fitness (lower = better)",
                angle: -90,
                position: "insideLeft",
                fill: colors.fgMuted,
                fontSize: 11,
                fontFamily: "JetBrains Mono",
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: colors.accent + "10" }} />
            <ReferenceLine
              x={14}
              yAxisId="left"
              stroke={colors.fgMuted}
              strokeDasharray="2 4"
              label={{
                value: "threshold",
                position: "top",
                fill: colors.fgMuted,
                fontSize: 10,
                fontFamily: "JetBrains Mono",
              }}
            />
            <Bar yAxisId="left" dataKey="displayValue" radius={[2, 2, 0, 0]}>
              {DATA.map((entry, idx) => (
                <Cell key={idx} fill={entry.success ? colors.success : colors.accentWarm} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs" style={{ color: "rgb(var(--fg-muted))" }}>
        Below 16 pixels the attack fails after the full DE budget. At 16 and above it succeeds in
        a fraction of the budget. The transition is sharp, not gradual — making the threshold a
        useful specification for input-side defences.
      </div>
    </div>
  );
}
