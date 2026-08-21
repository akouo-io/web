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
}

export interface Costs {
  /** All values are dollars per hour of audio. */
  transcription: number;
  diarization: number;
  extraction: number;
  storage: number;
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
  },
  {
    id: "pro",
    name: "Pro",
    blurb: "For power users",
    price: 29,
    includedHours: 25,
    overage: 1.75,
  },
  {
    id: "team",
    name: "Team",
    blurb: "For working groups",
    price: 59,
    includedHours: 60,
    overage: 1.5,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "For organizations",
    price: 99,
    includedHours: 120,
    overage: 1.25,
  },
];

export const defaultCosts: Costs = {
  transcription: 0.5,
  diarization: 0.1,
  extraction: 0.15,
  storage: 0.05,
};

export function costPerHour(c: Costs): number {
  return c.transcription + c.diarization + c.extraction + c.storage;
}

export function revenuePerUser(tier: TierConfig, hours: number): number {
  return tier.price + Math.max(0, hours - tier.includedHours) * tier.overage;
}

export function costPerUser(hours: number, c: Costs): number {
  return hours * costPerHour(c);
}

/** Gross margin as a fraction (0..1), or null when there is no revenue. */
export function marginPct(
  tier: TierConfig,
  hours: number,
  c: Costs,
): number | null {
  const revenue = revenuePerUser(tier, hours);
  if (revenue <= 0) return null;
  return (revenue - costPerUser(hours, c)) / revenue;
}

/**
 * Margin exactly at the included-hours cap — the point of maximum exposure,
 * where you have paid for every included hour but no overage revenue has begun.
 */
export function marginAtCap(tier: TierConfig, c: Costs): number | null {
  return marginPct(tier, tier.includedHours, c);
}

export function money(n: number): string {
  const abs = Math.abs(n);
  const digits = abs < 10 && abs % 1 !== 0 ? 2 : abs < 100 ? 1 : 0;
  return `$${n.toFixed(digits)}`;
}

export function pct(fraction: number | null): string {
  if (fraction === null) return "—";
  return `${Math.round(fraction * 100)}%`;
}
