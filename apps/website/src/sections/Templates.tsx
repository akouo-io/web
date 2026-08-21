import {
  Badge,
  Card,
  Checkbox,
  Separator,
  SpeakerTag,
  Stat,
  Timecode,
} from "@akouo/ui";

const blocks = [
  {
    name: "Summaries",
    description: "A recap, a topic breakdown, the open questions left hanging.",
    dot: "bg-speaker-1",
  },
  {
    name: "Action items",
    description:
      "Owned tasks with an assignee and due date you can check off and carry forward.",
    dot: "bg-speaker-3",
  },
  {
    name: "Metrics",
    description:
      "A single measurable value — a rating, a count, a figure — tracked across calls.",
    dot: "bg-speaker-5",
  },
  {
    name: "Lists",
    description: "Structured records for anything that doesn't fit the above.",
    dot: "bg-speaker-6",
  },
];

export function Templates() {
  return (
    <section id="templates" className="border-t border-border bg-muted/30 py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
        {/* Left: the idea + building blocks */}
        <div>
          <Badge variant="secondary" className="mb-4">
            Templates
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Turn every meeting into structured output
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A transcript is just a wall of text. A template tells Akouo what to
            pull out of it — in a shape you decide. Define it once, and Akouo
            applies it to every meeting you point it at.
          </p>

          <ul className="mt-8 space-y-4">
            {blocks.map((block) => (
              <li key={block.name} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 size-2.5 shrink-0 rounded-full ${block.dot}`}
                />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {block.name}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {block.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-md text-sm text-muted-foreground">
            Every value links back to the moment it was said, carries a
            confidence signal, and is attributed to who said it — nothing you
            have to take on faith.
          </p>
        </div>

        {/* Right: a mock extraction */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-foreground">
              Weekly sales sync
            </div>
            <Badge variant="secondary">Sales template</Badge>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Deal size" value="$45k" delta="+12%" trend="up" />
            <Stat label="Sentiment" value="8/10" delta="steady" trend="neutral" />
          </div>

          <Separator className="my-5" />

          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Action items
          </div>
          <div className="mt-3 space-y-3">
            <ActionItem
              done
              text="Send revised pricing to the Q3 accounts"
              speaker={2}
              name="Alan"
              seconds={182}
              confidence="94%"
            />
            <ActionItem
              text="Book the follow-up demo for next week"
              speaker={3}
              name="Grace"
              seconds={228}
              confidence="88%"
            />
          </div>

          <Separator className="my-5" />

          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Summary
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground">
            The team aligned on Q3 pricing and agreed to lead the launch with the
            new speaker view.{" "}
            <Timecode seconds={120} className="align-middle" />
          </p>
        </Card>
      </div>
    </section>
  );
}

function ActionItem({
  text,
  done,
  speaker,
  name,
  seconds,
  confidence,
}: {
  text: string;
  done?: boolean;
  speaker: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  seconds: number;
  confidence: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox defaultChecked={done} className="mt-0.5" aria-label={text} />
      <div className="flex-1">
        <p
          className={
            done
              ? "text-sm text-muted-foreground line-through"
              : "text-sm text-foreground"
          }
        >
          {text}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <SpeakerTag speaker={speaker} name={name} size="sm" />
          <Timecode seconds={seconds} />
          <Badge variant="outline" className="font-normal text-muted-foreground">
            {confidence} confidence
          </Badge>
        </div>
      </div>
    </div>
  );
}
