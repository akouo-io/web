import {
  Badge,
  Card,
  Checkbox,
  Separator,
  SpeakerTag,
  Timecode,
} from "@akouo/ui";
import type { ReactNode } from "react";

function DestChip({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

const routes = [
  { from: "Action items", to: "Jira · Linear · GitHub" },
  { from: "Notes & summaries", to: "Notion" },
];

export function Export() {
  return (
    <section id="export" className="py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
        {/* Left: the idea + routing */}
        <div>
          <Badge variant="secondary" className="mb-4">
            Export
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Send it where your work happens
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Review what Akouo pulled out of a meeting, and with one action it
            becomes a Jira ticket, a Linear issue, a GitHub issue, or a page in
            Notion.
          </p>

          <div className="mt-8 space-y-3">
            {routes.map((route) => (
              <div
                key={route.from}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-40 shrink-0 font-medium text-foreground">
                  {route.from}
                </span>
                <span aria-hidden="true" className="text-muted-foreground">
                  →
                </span>
                <span className="text-muted-foreground">{route.to}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-md text-sm text-muted-foreground">
            Akouo reads the shape, not the label — rename your fields and export
            keeps working. You can only export what you’ve accepted, and once an
            item is filed, its ticket link is remembered so a re-run never files
            a duplicate.
          </p>
        </div>

        {/* Right: a mock export panel */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-foreground">
              Weekly sync
            </div>
            <Badge variant="secondary">Ready to export</Badge>
          </div>

          <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Action items
          </div>
          <div className="mt-3 space-y-4">
            {/* Already filed — link remembered */}
            <div className="flex items-start gap-3">
              <Checkbox defaultChecked className="mt-0.5" aria-label="Filed action item" />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  Send revised pricing to the Q3 accounts
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <SpeakerTag speaker={2} name="Alan" size="sm" />
                  <Timecode seconds={182} />
                </div>
              </div>
              <Badge variant="success" className="shrink-0">
                Filed · LIN-482
              </Badge>
            </div>

            {/* Accepted — ready to file */}
            <div className="flex items-start gap-3">
              <Checkbox defaultChecked className="mt-0.5" aria-label="Accepted action item" />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  Book the follow-up demo for next week
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <SpeakerTag speaker={3} name="Grace" size="sm" />
                  <Timecode seconds={228} />
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <DestChip>Jira</DestChip>
                <DestChip>Linear</DestChip>
                <DestChip>GitHub</DestChip>
              </div>
            </div>

            {/* Unconfirmed — cannot export yet */}
            <div className="flex items-start gap-3 opacity-60">
              <Checkbox className="mt-0.5" aria-label="Unconfirmed suggestion" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Draft a recap for the newsletter
                </p>
                <span className="text-xs text-muted-foreground">
                  Accept to enable export
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Summary
              </div>
              <p className="mt-1 text-sm text-foreground">Meeting recap</p>
            </div>
            <DestChip>Export to Notion</DestChip>
          </div>
        </Card>
      </div>
    </section>
  );
}
