import { useState } from "react";
import type { MouseEvent } from "react";

import { money, monthlyCost } from "./model";
import type { TierConfig } from "./model";

const SERIES_VARS = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
];

const W = 720;
const H = 360;
const PAD = { l: 52, r: 108, t: 16, b: 36 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;

interface Props {
  tiers: TierConfig[];
  usageHours: number;
  maxHours?: number;
}

/** What the customer pays per user per month, by tier, across usage. */
export function CostChart({ tiers, usageHours, maxHours = 80 }: Props) {
  const [hoverH, setHoverH] = useState<number | null>(null);

  const xs = Array.from({ length: maxHours + 1 }, (_, h) => h);
  const x = (h: number) => PAD.l + (h / maxHours) * PLOT_W;

  let maxV = 0;
  for (const tier of tiers) maxV = Math.max(maxV, monthlyCost(tier, maxHours));
  const step = Math.max(10, Math.ceil(maxV / 5 / 10) * 10);
  const top = Math.ceil(maxV / step) * step;
  const y = (v: number) => PAD.t + ((top - v) / top) * PLOT_H;

  const yTicks: number[] = [];
  for (let t = 0; t <= top + 1e-9; t += step) yTicks.push(t);
  const xTicks = xs.filter((h) => h % 20 === 0);

  const line = (tier: TierConfig) =>
    xs.map((h) => `${x(h)},${y(monthlyCost(tier, h))}`).join(" ");

  const labels = tiers
    .map((tier, i) => ({
      name: tier.name,
      color: SERIES_VARS[i],
      y: y(monthlyCost(tier, maxHours)),
    }))
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
          aria-label="Monthly cost per user versus hours recorded, by tier"
          onMouseMove={onMove}
          onMouseLeave={() => setHoverH(null)}
        >
          {yTicks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.l}
                x2={PAD.l + PLOT_W}
                y1={y(t)}
                y2={y(t)}
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              <text
                x={PAD.l - 8}
                y={y(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground"
                fontSize="11"
              >
                {money(t)}
              </text>
            </g>
          ))}

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
            hours recorded / user / month
          </text>

          {/* your-usage marker */}
          <line
            x1={x(usageHours)}
            x2={x(usageHours)}
            y1={PAD.t}
            y2={PAD.t + PLOT_H}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* tier lines + included-cap kink markers */}
          {tiers.map((tier, i) => (
            <g key={tier.id}>
              <polyline
                points={line(tier)}
                fill="none"
                stroke={SERIES_VARS[i]}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {tier.includedHours <= maxHours && (
                <circle
                  cx={x(tier.includedHours)}
                  cy={y(tier.price)}
                  r="4"
                  fill={SERIES_VARS[i]}
                  stroke={surface}
                  strokeWidth="2"
                />
              )}
            </g>
          ))}

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
              {tiers.map((tier, i) => (
                <circle
                  key={tier.id}
                  cx={x(hoverH)}
                  cy={y(monthlyCost(tier, hoverH))}
                  r="3.5"
                  fill={SERIES_VARS[i]}
                  stroke={surface}
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}

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

        {hoverH !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md"
            style={{
              left: `${Math.min(82, Math.max(12, (x(hoverH) / W) * 100))}%`,
            }}
          >
            <div className="mb-1 font-medium text-foreground">
              {hoverH} hrs / month
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
                    {money(monthlyCost(tier, hoverH))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Each plan is flat until its included hours (the dot), then adds a simple
        per-hour rate. Find where your usage lands to see which plan costs the
        least.
      </p>
    </figure>
  );
}
