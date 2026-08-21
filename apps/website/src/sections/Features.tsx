import { cn } from "@akouo/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@akouo/ui";
import type { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  chip: string;
  href?: string;
}

const UsersIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const MonitorIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const TemplateIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 9v12" />
  </svg>
);

const ExportIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="M12 15V3M8 7l4-4 4 4" />
  </svg>
);

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Speaker diarization",
    description:
      "Automatic labels for every voice, colored so you always know who said what.",
    icon: UsersIcon,
    chip: "bg-speaker-1/15 text-speaker-1",
  },
  {
    title: "Time-coded transcripts",
    description:
      "Every line is timestamped and clickable — jump straight to the moment.",
    icon: ClockIcon,
    chip: "bg-speaker-3/15 text-speaker-3",
  },
  {
    title: "Record any meeting",
    description:
      "Capture calls right from your desktop — Zoom, Google Meet, or Teams.",
    icon: MonitorIcon,
    chip: "bg-speaker-2/15 text-speaker-2",
    href: "#desktop",
  },
  {
    title: "Custom templates",
    description:
      "Define what to pull from each meeting — summaries, action items, metrics.",
    icon: TemplateIcon,
    chip: "bg-speaker-4/15 text-speaker-4",
    href: "#templates",
  },
  {
    title: "Export to your tools",
    description:
      "Send action items and notes to Jira, Linear, GitHub, or Notion.",
    icon: ExportIcon,
    chip: "bg-speaker-5/15 text-speaker-5",
    href: "#export",
  },
  {
    title: "Search everything",
    description:
      "Full-text search across sessions, speakers, and generated summaries.",
    icon: SearchIcon,
    chip: "bg-speaker-6/15 text-speaker-6",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to make sense of a conversation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From raw recording to a clean, searchable transcript — and into the
            tools where your work happens.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const card = (
              <Card
                className={cn(
                  "h-full",
                  feature.href && "transition-colors hover:border-ring",
                )}
              >
                <CardHeader>
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-lg [&>svg]:size-5",
                      feature.chip,
                    )}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-3 text-base">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );

            return feature.href ? (
              <a
                key={feature.title}
                href={feature.href}
                className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {card}
              </a>
            ) : (
              <div key={feature.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
