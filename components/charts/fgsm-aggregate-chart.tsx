"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts";

// Real numbers from the project's CSV
const DATA = [
  { eps: 0.0, count: 3.14, conf: 0.844, suppressed: 0.0 },
  { eps: 0.01, count: 4.43, conf: 0.810, suppressed: 14.3 },
  { eps: 0.03, count: 2.43, conf: 0.690, suppressed: 14.3 },
  { eps: 0.05, count: 0.71, conf: 0.655, suppressed: 42.9 },
  { eps: 0.10, count: 0.14, conf: 0.279, suppressed: 85.7 },
];

const TABS = [
  { id: "count", label: "Detection Count", unit: "boxes per image" },
  { id: "conf", label: "Mean Max-Confidence", unit: "score (0–1)" },
  { id: "suppressed", label: "Full-Suppression Rate", unit: "% of images" },
] as const;

type TabId = typeof TABS[number]["id"];

function useThemeColors() {
  const [colors, setColors] = useState({
    accent: "#3B5998",
    accentWarm: "#A33B2A",
    fg: "#1A1A1A",
    fgMuted: "#5C5C58",
    surface: "#F5F1E6",
  });

  useEffect(() => {
    function update() {
      const isDark = document.documentElement.classList.contains("dark");
      setColors({
        accent: isDark ? "#7AA2D9" : "#3B5998",
        accentWarm: isDark ? "#D9846E" : "#A33B2A",
        fg: isDark ? "#E8E0D2" : "#1A1A1A",
        fgMuted: isDark ? "#9A9182" : "#5C5C58",
        surface: isDark ? "#101A2C" : "#F5F1E6",
      });
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function CustomTooltip({ active, payload, label, unit }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 text-xs font-mono"
      style={{
        background: "rgb(var(--bg))",
        border: "1px solid rgb(var(--rule))",
        color: "rgb(var(--fg))",
      }}
    >
      <div style={{ color: "rgb(var(--fg-muted))" }}>ε = {label}</div>
      <div className="text-base mt-1">
        {typeof payload[0].value === "number" ? payload[0].value.toFixed(2) : payload[0].value}
        <span className="text-xs ml-1" style={{ color: "rgb(var(--fg-muted))" }}>{unit}</span>
      </div>
    </div>
  );
}

export function FgsmAggregateChart() {
  const [tab, setTab] = useState<TabId>("suppressed");
  const colors = useThemeColors();
  const tabConfig = TABS.find((t) => t.id === tab)!;

  return (
    <div className="figure-frame p-6">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-6 border-b rule-line pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-xs font-mono px-3 py-1.5 transition-all ${
              tab === t.id ? "ring-1" : ""
            }`}
            style={{
              background: tab === t.id ? "rgb(var(--accent) / 0.1)" : "transparent",
              color: tab === t.id ? "rgb(var(--accent))" : "rgb(var(--fg-muted))",
              borderRadius: "2px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="h-72">
        {tab === "suppressed" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 10, right: 10, bottom: 30, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="eps"
                type="number"
                domain={[0, 0.1]}
                ticks={[0, 0.01, 0.03, 0.05, 0.10]}
                tickFormatter={(v) => v.toFixed(2)}
                axisLine={{ stroke: colors.fgMuted }}
                tickLine={false}
                label={{
                  value: "perturbation ε",
                  position: "insideBottom",
                  offset: -16,
                  fill: colors.fgMuted,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono",
                }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip unit="%" />} cursor={{ fill: colors.accent + "10" }} />
              <Bar dataKey="suppressed" fill={colors.accentWarm} radius={[2, 2, 0, 0]} />
              <ReferenceLine
                y={50}
                stroke={colors.fgMuted}
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DATA} margin={{ top: 10, right: 10, bottom: 30, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="eps"
                type="number"
                domain={[0, 0.1]}
                ticks={[0, 0.01, 0.03, 0.05, 0.10]}
                tickFormatter={(v) => v.toFixed(2)}
                axisLine={{ stroke: colors.fgMuted }}
                tickLine={false}
                label={{
                  value: "perturbation ε",
                  position: "insideBottom",
                  offset: -16,
                  fill: colors.fgMuted,
                  fontSize: 11,
                  fontFamily: "JetBrains Mono",
                }}
              />
              <YAxis
                domain={tab === "conf" ? [0, 1] : [0, "dataMax + 1"]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip unit={tab === "conf" ? "" : ""} />}
                cursor={{ stroke: colors.accent, strokeDasharray: "3 3" }}
              />
              <Line
                type="monotone"
                dataKey={tab}
                stroke={tab === "conf" ? colors.accentWarm : colors.accent}
                strokeWidth={2}
                dot={{ r: 5, fill: colors.accent, stroke: colors.surface, strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 text-xs" style={{ color: "rgb(var(--fg-muted))" }}>
        <span className="small-caps">Figure</span> — {tabConfig.label} versus ε across the 7-image
        test set. Hover bars or points for exact values.
      </div>
    </div>
  );
}
