import { Badge, Button, Card, Slider } from "@akouo/ui";
import { useState } from "react";

import { CostChart } from "./CostChart";
import { cheapestTierId, defaultTiers, money, monthlyCost } from "./model";

const SERIES_VARS = [
  "var(--series-1)",
  "var(--series-2)",
  "var(--series-3)",
  "var(--series-4)",
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-primary"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PricingPage() {
  const tiers = defaultTiers;
  const [usage, setUsage] = useState(12);
  const bestId = cheapestTierId(tiers, usage);

  return (
    <div className="viz mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Pricing
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, usage-based pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Every plan includes a monthly pool of recording hours. Go over, and you
          only pay a simple per-hour rate — no surprises.
        </p>
      </div>

      {/* Usage estimator */}
      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-border bg-card p-6">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-foreground">
            How much will you record?
          </span>
          <span className="tabular-nums text-sm text-muted-foreground">
            {usage} hrs / user / month
          </span>
        </div>
        <Slider
          className="mt-2"
          min={2}
          max={60}
          value={usage}
          onChange={(e) => setUsage(Number(e.target.value))}
          aria-label="Hours recorded per user per month"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Drag to estimate your monthly cost on each plan.
        </p>
      </div>

      {/* Tier cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, i) => {
          const color = SERIES_VARS[i];
          const best = tier.id === bestId;
          const estimate = monthlyCost(tier, usage);
          const over = Math.max(0, usage - tier.includedHours);
          return (
            <Card
              key={tier.id}
              className="flex flex-col gap-4 p-5"
              style={best ? { borderColor: color } : undefined}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: color }}
                    />
                    <h2 className="font-semibold text-foreground">
                      {tier.name}
                    </h2>
                  </div>
                  {best && (
                    <Badge variant="secondary" className="text-[10px]">
                      Best value
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tier.blurb}
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold tabular-nums text-foreground">
                    {money(tier.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /user/mo
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tier.includedHours} hrs included, then {money(tier.overage)}
                  /hr
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground">
                  Your estimate at {usage} hrs
                </div>
                <div className="text-lg font-semibold tabular-nums text-foreground">
                  {money(estimate)}
                  <span className="text-xs font-normal text-muted-foreground">
                    {" "}
                    /user/mo
                  </span>
                </div>
                {over > 0 && (
                  <div className="text-xs text-muted-foreground">
                    incl. {over} hrs overage
                  </div>
                )}
              </div>

              <ul className="flex flex-1 flex-col gap-2 text-sm text-foreground">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={best ? "primary" : "secondary"}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* What you'd pay */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          What you&rsquo;d pay
        </h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          Monthly cost per user by plan. The dashed line marks your {usage}-hour
          estimate.
        </p>
        <CostChart tiers={tiers} usageHours={usage} />
      </div>
    </div>
  );
}
