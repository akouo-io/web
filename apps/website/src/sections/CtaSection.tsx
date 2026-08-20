import { Button } from "@akouo/ui";

export function CtaSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start turning conversations into clarity
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Upload your first recording and get a speaker-labelled transcript in
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button>Get started free</Button>
            <Button variant="secondary">Book a demo</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
