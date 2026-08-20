import { Badge, Button, Text } from "@akouo/ui";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
      {/* Soft token-colored glow behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 size-[24rem] rounded-full bg-speaker-2/10 blur-3xl"
      />

      <Badge variant="secondary" className="mb-6">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-primary"
        />
        The sound of listening
      </Badge>

      <h1 className="max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Transcription that knows{" "}
        <span className="text-primary">who’s speaking</span>
      </h1>

      <Text
        variant="muted"
        size="lg"
        className="mt-6 max-w-2xl text-pretty leading-8"
      >
        Akouo turns your recordings into clean, speaker-labelled transcripts —
        searchable, shareable, and ready in minutes.
      </Text>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button>Get started</Button>
        <Button variant="secondary">See how it works</Button>
      </div>
    </section>
  );
}
