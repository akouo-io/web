import {
  Badge,
  Card,
  DiarizationTimeline,
  SpeakerLegend,
  TranscriptView,
  Waveform,
} from "@akouo/ui";
import type { DiarizationSegment, TranscriptSegment } from "@akouo/ui";

const DURATION = 240;

const peaks = Array.from(
  { length: 96 },
  (_, i) => 0.2 + 0.7 * Math.abs(Math.sin(i / 3)),
);

const diarization: DiarizationSegment[] = [
  { speaker: 1, start: 0, end: 40, name: "Ada" },
  { speaker: 2, start: 40, end: 95, name: "Alan" },
  { speaker: 1, start: 95, end: 120, name: "Ada" },
  { speaker: 3, start: 120, end: 180, name: "Grace" },
  { speaker: 2, start: 180, end: 210, name: "Alan" },
  { speaker: 4, start: 210, end: 240, name: "Edsger" },
];

const transcript: TranscriptSegment[] = [
  { id: "1", speaker: 2, name: "Alan", start: 95, text: "Let us start with the roadmap for next quarter." },
  { id: "2", speaker: 3, name: "Grace", start: 120, text: "The new palette makes speakers much easier to follow." },
  { id: "3", speaker: 3, name: "Grace", start: 152, text: "I think we should lead the launch with it." },
  { id: "4", speaker: 2, name: "Alan", start: 180, text: "Agreed — I will put together the milestones." },
];

export function Preview() {
  return (
    <section id="preview" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Live preview
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The same components that power the Akouo app.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-3xl p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-medium text-foreground">
              Weekly sync
            </div>
            <span className="tabular-nums text-xs text-muted-foreground">
              4:00 · 4 speakers
            </span>
          </div>

          <div className="mt-4">
            <Waveform peaks={peaks} progress={0.5} />
          </div>
          <div className="mt-3">
            <DiarizationTimeline
              segments={diarization}
              duration={DURATION}
              currentTime={120}
            />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto]">
            <TranscriptView segments={transcript} currentTime={120} />
            <SpeakerLegend
              className="sm:w-44"
              speakers={[
                { speaker: 1, name: "Ada", meta: "1:05" },
                { speaker: 2, name: "Alan", meta: "1:25" },
                { speaker: 3, name: "Grace", meta: "1:00" },
                { speaker: 4, name: "Edsger", meta: "0:30" },
              ]}
            />
          </div>
        </Card>
      </div>
    </section>
  );
}
