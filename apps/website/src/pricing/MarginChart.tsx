import { useState } from "react";
import type { MouseEvent } from "react";

import { costPerHour, marginPct, money, pct } from "./model";
import type { Costs, TierConfig } from "./model";

const SERIES_VARS = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
];

const W = 720;
const H = 360;
const PAD = { l: 48, r: 108, t: 16, b: 36 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;

interface Props {
  tiers: TierConfig[];
  costs: Costs;
  usageHours: number;
  maxHours?: number;
}

export function MarginChart({ tiers, costs, usageHours, maxHours = 132 }: Props) {
  const [hoverH, setHoverH] = useState<number | null>(null);

  const xs = Array.from({ length: maxHours + 1 }, (_, h) => h);
  const x = (h: number) => PAD.l + (h / maxHours) * PLOT_W;

  // y domain across every sampled point (0 always visible).
  let lo = 0;
  let hi = 0;
  for (const tier of tiers) {
    for (const h of xs) {
      const m = marginPct(tier, h, costs);
      if (m === null) continue;
      lo = Math.min(lo, m);
      hi = Math.max(hi, m);
    }
  }
  const range = hi - lo || 1;
  lo -= range * 0.08;
  hi += range * 0.08;
  const y = (m: number) => PAD.t + ((hi - m) / (hi - lo)) * PLOT_H;

  // y gridlines at 10% steps within the domain.
  const yTicks: number[] = [];
  for (let t = Math.ceil(lo / 0.1) * 0.1; t <= hi + 1e-9; t += 0.1) {
    yTicks.push(Math.round(t * 100) / 100);
  }
  const xTicks = xs.filter((h) => h % 24 === 0);

  const line = (tier: TierConfig) =>
    xs
      .map((h) => {
        const m = marginPct(tier, h, costs);
        return m === null ? null : `${x(h)},${y(m)}`;
      })
      .filter(Boolean)
      .join(" ");

  // Direct end-labels, nudged apart so they don't overlap.
  const labels = tiers
    .map((tier, i) => {
      const m = marginPct(tier, maxHours, costs);
      return { name: tier.name, color: SERIES_VARS[i], y: m === null ? PAD.t : y(m) };
    })
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < labels.length; i += 1) {
    const prev = labels[i - 1];
    const cur = labels[i];
    if (prev && cur && cur.y - prev.y < 16) cur.y = prev.y + 16;
  }

  function onMove(e: MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const h = Math.round(((vx - PAD.l) / PLOT_W) * maxHours);
    setHoverH(Math.max(0, Math.min(maxHours, h)));
  }

  const surface = "hsl(var(--card))";

  return (
    <figure className="viz">
      {/* Legend (identity is never color-alone). */}
      <figcaption className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        {tiers.map((tier, i) => (
          <span key={tier.id} className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ background: SERIES_VARS[i] }}
            />
            {tier.name}
          </span>
        ))}
      </figcaption>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Gross margin versus hours per user per month, by tier"
          onMouseMove={onMove}
          onMouseLeave={() => setHoverH(null)}
        >
          {/* gridlines + y labels */}
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.l}
                x2={PAD.l + PLOT_W}
                y1={y(t)}
                y2={y(t)}
                stroke="hsl(var(--border))"
                strokeWidth={Math.abs(t) < 1e-9 ? 1.5 : 1}
              />
              <text
                x={PAD.l - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                fontSize="11"
              >
                {Math.round(t * 100)}%
              </text>
            </g>
          ))}

          {/* x labels */}
          {xTicks.map((h) => (
            <text
              key={h}
              x={x(h)}
              y={PAD.t + PLOT_H + 20}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="11"
            >
              {h}
            </text>
          ))}
          <text
            x={PAD.l + PLOT_W / 2}
            y={H - 2}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            hours / user / month
          </text>

          {/* current-usage marker */}
          <line
            x1={x(usageHours)}
            x2={x(usageHours)}
            y1={PAD.t}
            y2={PAD.t + PLOT_H}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* tier lines + cap markers */}
          {tiers.map((tier, i) => {
            const capM = marginPct(tier, tier.includedHours, costs);
            return (
              <g key={tier.id}>
                <polyline
                  points={line(tier)}
                  fill="none"
                  stroke={SERIES_VARS[i]}
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {capM !== null && tier.includedHours <= maxHours && (
                  <circle
                    cx={x(tier.includedHours)}
                    cy={y(capM)}
                    r="4.5"
                    fill={SERIES_VARS[i]}
                    stroke={surface}
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}

          {/* hover crosshair + points */}
          {hoverH !== null && (
            <g>
              <line
                x1={x(hoverH)}
                x2={x(hoverH)}
                y1={PAD.t}
                y2={PAD.t + PLOT_H}
                stroke="hsl(var(--foreground))"
                strokeWidth="1"
                opacity="0.4"
              />
              {tiers.map((tier, i) => {
                const m = marginPct(tier, hoverH, costs);
                if (m === null) return null;
                return (
                  <circle
                    key={tier.id}
                    cx={x(hoverH)}
                    cy={y(m)}
                    r="3.5"
                    fill={SERIES_VARS[i]}
                    stroke={surface}
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>
          )}

          {/* direct end-labels */}
          {labels.map((l) => (
            <g key={l.name}>
              <circle cx={PAD.l + PLOT_W + 10} cy={l.y} r="3" fill={l.color} />
              <text
                x={PAD.l + PLOT_W + 18}
                y={l.y}
                dominantBaseline="middle"
                className="fill-foreground"
                fontSize="11"
              >
                {l.name}
              </text>
            </g>
          ))}
        </svg>

        {/* hover tooltip */}
        {hoverH !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md"
            style={{
              left: `${Math.min(82, Math.max(12, (x(hoverH) / W) * 100))}%`,
            }}
          >
            <div className="mb-1 font-medium text-foreground">
              {hoverH} hrs/user
            </div>
            <div className="space-y-0.5">
              {tiers.map((tier, i) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: SERIES_VARS[i] }}
                    />
                    {tier.name}
                  </span>
                  <span className="tabular-nums text-foreground">
                    {pct(marginPct(tier, hoverH, costs))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Each line dips at that tier&rsquo;s included-hours cap — cost peaks right
        before overage revenue starts. Because overage is priced above your live
        cost of {money(costPerHour(costs))}/hr, margin recovers past the cap. The
        V-shape is why the cap is a floor, not a cliff.
      </p>
    </figure>
  );
}
