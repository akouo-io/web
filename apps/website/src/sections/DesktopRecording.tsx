import {
  Badge,
  Button,
  LiveCaption,
  RecordingIndicator,
  Waveform,
} from "@akouo/ui";

const peaks = Array.from(
  { length: 72 },
  (_, i) => 0.2 + 0.7 * Math.abs(Math.sin(i / 2.6)),
);

const points = [
  "Capture system and microphone audio in one click",
  "Works with Zoom, Google Meet, and Teams — no bots in the call",
  "Auto-transcribes and labels speakers the moment you stop",
];

export function DesktopRecording() {
  return (
    <section id="desktop" className="border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" className="mb-4">
            Desktop app
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Record meetings, right from your desktop
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Capture any call with the Akouo desktop app. When you stop, your
            recording is transcribed and every speaker is labelled
            automatically.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Download for desktop</Button>
            <Button variant="secondary">See how it works</Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <RecordingIndicator label="Recording" />
              <span className="tabular-nums text-xs text-muted-foreground">
                12:04
              </span>
            </div>
            <div className="mt-4">
              <Waveform peaks={peaks} progress={0.85} />
            </div>
          </div>
          <LiveCaption
            active={false}
            finalText="So for next quarter we want to focus on"
            partialText="the diarization accuracy improvements"
          />
        </div>
      </div>
    </section>
  );
}
