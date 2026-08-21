import { Badge, Card, NumberInput, Slider } from "@akouo/ui";
import { useState } from "react";
import type { ReactNode } from "react";

import { MarginChart } from "./MarginChart";
import {
  costPerHour,
  defaultCosts,
  defaultTiers,
  marginAtCap,
  marginPct,
  money,
  pct,
  revenuePerUser,
  costPerUser,
} from "./model";
import type { Costs, TierConfig } from "./model";

const SERIES_VARS = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
];

function NumField({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
}: {
  label: ReactNode;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
      {label}
      <NumberInput
        className="h-9"
        value={value}
        min={min}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
      />
    </label>
  );
}

export function PricingPage() {
  const [tiers, setTiers] = useState<TierConfig[]>(defaultTiers);
  const [costs, setCosts] = useState<Costs>(defaultCosts);
  const [usage, setUsage] = useState(12);

  const setTier = (id: string, patch: Partial<TierConfig>) =>
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  const setCost = (key: keyof Costs, n: number) =>
    setCosts((prev) => ({ ...prev, [key]: n }));

  const costLabels: Array<[keyof Costs, string]> = [
    ["transcription", "Transcription $/hr"],
    ["diarization", "Diarization $/hr"],
    ["extraction", "Extraction $/hr"],
    ["storage", "Storage $/hr"],
  ];

  return (
    <div className="viz mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-4">
          Pricing model
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Metered pricing, modelled live
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every number here is editable — tier prices, included hours, overage,
          and the four cost inputs. Change an assumption and every card and the
          chart update instantly.
        </p>
      </div>

      {/* Controls: usage slider + cost inputs */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">
              Usage assumption
            </span>
            <span className="tabular-nums text-sm text-muted-foreground">
              {usage} hrs / user / month
            </span>
          </div>
          <Slider
            min={2}
            max={60}
            value={usage}
            onChange={(e) => setUsage(Number(e.target.value))}
            aria-label="Usage in hours per user per month"
          />
          <p className="text-xs text-muted-foreground">
            Default is 12 hrs. Drag toward 30–40 to see where Pro thins out and
            why Team&rsquo;s higher allowance holds up.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {costLabels.map(([key, label]) => (
            <NumField
              key={key}
              label={label}
              value={costs[key]}
              step={0.05}
              onChange={(n) => setCost(key, n)}
            />
          ))}
          <div className="flex flex-col justify-end">
            <div className="text-xs font-medium text-muted-foreground">
              Live cost / hr
            </div>
            <div className="text-lg font-semibold tabular-nums text-foreground">
              {money(costPerHour(costs))}
            </div>
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, i) => {
          const color = SERIES_VARS[i];
          const cap = marginAtCap(tier, costs);
          const rev = revenuePerUser(tier, usage);
          const cost = costPerUser(usage, costs);
          const now = marginPct(tier, usage, costs);
          return (
            <Card key={tier.id} className="flex flex-col gap-4 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: color }}
                  />
                  <h2 className="font-semibold text-foreground">{tier.name}</h2>
                </div>
                <p className="text-xs text-muted-foreground">{tier.blurb}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <NumField
                  label="Price $"
                  value={tier.price}
                  onChange={(n) => setTier(tier.id, { price: n })}
                />
                <NumField
                  label="Incl. hrs"
                  value={tier.includedHours}
                  onChange={(n) => setTier(tier.id, { includedHours: n })}
                />
                <NumField
                  label="Over $/hr"
                  value={tier.overage}
                  step={0.25}
                  onChange={(n) => setTier(tier.id, { overage: n })}
                />
              </div>

              <div
                className="rounded-lg border border-border p-3"
                style={{ borderColor: color }}
              >
                <div className="text-xs text-muted-foreground">
                  Worst-case margin (at {tier.includedHours} hr cap)
                </div>
                <div
                  className="text-2xl font-semibold tabular-nums"
                  style={{ color }}
                >
                  {pct(cap)}
                </div>
              </div>

              <dl className="space-y-1 text-sm">
                <Row label={`Revenue @ ${usage} hr`} value={money(rev)} />
                <Row label="Cost" value={money(cost)} />
                <Row label="Margin" value={pct(now)} strong />
              </dl>
            </Card>
          );
        })}
      </div>

      {/* Margin chart */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Gross margin vs. usage
        </h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          The dashed line marks your {usage}-hour assumption; each dot marks a
          tier&rsquo;s cap.
        </p>
        <MarginChart tiers={tiers} costs={costs} usageHours={usage} />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={
          strong
            ? "font-semibold tabular-nums text-foreground"
            : "tabular-nums text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}
