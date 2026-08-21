const steps = [
  {
    n: 1,
    title: "Record or upload",
    description:
      "Record a meeting with the desktop app, or drop in existing audio or video.",
  },
  {
    n: 2,
    title: "Transcribe and extract",
    description:
      "Akouo transcribes, labels speakers, and pulls out what your template asks for.",
  },
  {
    n: 3,
    title: "Review and export",
    description:
      "Confirm what matters, then send action items and notes to Jira, Linear, or Notion.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From meeting to your tools in three steps
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
