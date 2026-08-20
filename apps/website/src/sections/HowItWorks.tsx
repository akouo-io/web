const steps = [
  {
    n: 1,
    title: "Upload",
    description: "Drop in audio or video — Akouo handles the rest.",
  },
  {
    n: 2,
    title: "Transcribe",
    description: "We transcribe and separate speakers automatically.",
  },
  {
    n: 3,
    title: "Review and share",
    description: "Edit labels, grab quotes, and share in a click.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From recording to transcript in three steps
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n} className="flex flex-col items-start gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.n}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
