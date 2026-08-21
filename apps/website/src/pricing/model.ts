export interface TierConfig {
  id: string;
  name: string;
  blurb: string;
  /** Monthly price per user, in dollars. */
  price: number;
  /** Hours included per user per month. */
  includedHours: number;
  /** Price per hour beyond the included cap, in dollars. */
  overage: number;
  features: string[];
  cta: string;
}

/** The four tiers map to the validated categorical slots 1–4 (see index.css). */
export const defaultTiers: TierConfig[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For individuals",
    price: 12,
    includedHours: 10,
    overage: 2.0,
    features: [
      "10 hours of recording / month",
      "Speaker diarization",
      "Time-coded transcripts",
      "Export to Notion",
    ],
    cta: "Get started",
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For power users",
    price: 29,
    includedHours: 25,
    overage: 1.75,
    features: [
      "25 hours of recording / month",
      "Everything in Starter",
      "Custom templates",
      "Export to Jira, Linear & GitHub",
    ],
    cta: "Get started",
  },
  {
    id: "team",
    name: "Team",
    blurb: "For working groups",
    price: 59,
    includedHours: 60,
    overage: 1.5,
    features: [
      "60 hours of recording / month",
      "Everything in Pro",
      "Shared workspaces",
      "Admin controls",
    ],
    cta: "Get started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For organizations",
    price: 99,
    includedHours: 120,
    overage: 1.25,
    features: [
      "120 hours of recording / month",
      "Everything in Team",
      "SSO & SAML",
      "Priority support",
    ],
    cta: "Contact sales",
  },
];

/** What the customer pays per user per month at a given usage. */
export function monthlyCost(tier: TierConfig, hours: number): number {
  return tier.price + Math.max(0, hours - tier.includedHours) * tier.overage;
}

/** The id of the cheapest tier at a given usage (ties resolve to the first). */
export function cheapestTierId(tiers: TierConfig[], hours: number): string {
  let best = tiers[0];
  if (!best) return "";
  for (const tier of tiers) {
    if (monthlyCost(tier, hours) < monthlyCost(best, hours)) best = tier;
  }
  return best.id;
}

export function money(n: number): string {
  const abs = Math.abs(n);
  const digits = abs < 100 && abs % 1 !== 0 ? 2 : 0;
  return `$${n.toFixed(digits)}`;
}
