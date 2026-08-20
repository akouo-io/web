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

const SearchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const ShareIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
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
    title: "Search everything",
    description:
      "Full-text search across sessions, speakers, and generated summaries.",
    icon: SearchIcon,
    chip: "bg-speaker-5/15 text-speaker-5",
  },
  {
    title: "Export and share",
    description:
      "Share a clip, export a transcript, or send a summary in a click.",
    icon: ShareIcon,
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
            From raw recording to a clean, searchable, speaker-labelled
            transcript.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg [&>svg]:size-5 ${feature.chip}`}
                >
                  {feature.icon}
                </div>
                <CardTitle className="mt-3 text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
