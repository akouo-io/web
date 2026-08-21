import { Badge } from "@akouo/ui";
import type { ReactNode } from "react";

/** Visibly-marked editorial placeholder for a decision still to be supplied. */
function Ph({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 rounded border border-dashed border-border bg-muted px-1.5 py-0.5 text-sm text-muted-foreground">
      {children}
    </span>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-primary"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
      />
      <span>{children}</span>
    </li>
  );
}

export function SecurityPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* Hero */}
      <div className="flex items-center gap-3">
        <ShieldIcon />
        <Badge variant="secondary">Security &amp; privacy</Badge>
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Security &amp; privacy at Akouo
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Akouo records your meetings, transcribes them, and turns them into
        something you can search and act on. That only works if you trust it with
        the conversation. This page describes how that trust is kept — what is
        captured, where it lives, who can reach it, and the control you keep over
        it.
      </p>

      {/* Two principles */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="font-semibold text-foreground">
            Nothing is captured without consent
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Detecting a meeting is not recording it. Until you accept, nothing is
            captured.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="font-semibold text-foreground">
            Your meetings are private by default
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            You decide who can see a meeting — only you, the people you share it
            with, or your organization.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <Section id="capture" title="How Akouo captures a meeting">
          <p>
            Akouo captures audio <strong className="text-foreground">on your
            own computer</strong>, through the Akouo desktop app. No bot joins
            your meeting; no third party appears in the participant list; nothing
            is recorded on a server sitting between you and the people you&rsquo;re
            talking to.
          </p>
          <ul className="space-y-3">
            <Bullet>
              <strong className="text-foreground">Consent first.</strong> The app
              detects that you&rsquo;re in a meeting and asks before it records —
              detecting a meeting is not the same as recording it.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">No always-on listening.</strong>{" "}
              Akouo records only during a session you&rsquo;ve started. It does
              not listen continuously in the background, and ordinary microphone
              activity does not trigger recording.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">You choose who sees it.</strong>{" "}
              At record time you decide whether a meeting is private or linked to
              your organization.
            </Bullet>
          </ul>
          <p>
            Where the law requires consent from everyone present — for example in
            two-party-consent jurisdictions — Akouo can track each participant&rsquo;s
            consent status alongside the recording.
          </p>
        </Section>

        <Section id="data" title="Where your data lives">
          <p>
            Akouo is hosted on infrastructure located in{" "}
            <Ph>European region — name provider &amp; region</Ph>. Your account,
            meetings, recordings, transcripts, and derived output are stored
            there.
          </p>
          <p>
            Turning speech into text and attributing it to speakers involves a
            small number of specialist sub-processors. We choose them deliberately
            and hold them to the same standard we hold ourselves. Any security
            certifications those providers hold describe their systems, not
            Akouo&rsquo;s own.{" "}
            <Ph>
              If/when Akouo completes an independent audit, state it here — don&rsquo;t
              imply a provider&rsquo;s certification covers Akouo.
            </Ph>
          </p>
          <p>
            Where personal data of EU/EEA users is handled by a provider subject to
            another jurisdiction, we rely on{" "}
            <strong className="text-foreground">Standard Contractual Clauses</strong>{" "}
            and a transfer impact assessment rather than claiming full data
            sovereignty. <Ph>Confirm SCCs are in place and link the terms.</Ph>
          </p>
        </Section>

        <Section id="encryption" title="Encryption">
          <p>
            Data is encrypted{" "}
            <strong className="text-foreground">in transit</strong> and{" "}
            <strong className="text-foreground">at rest</strong> across the Akouo
            pipeline. <Ph>State Akouo&rsquo;s own encryption standards once hosting
            and storage are fixed — don&rsquo;t borrow a provider&rsquo;s figures.</Ph>
          </p>
        </Section>

        <Section id="ai" title="AI and your data">
          <p>
            Akouo uses AI to transcribe your meetings and to derive structure from
            them — summaries, action items, decisions, and similar.
          </p>
          <ul className="space-y-3">
            <Bullet>
              <strong className="text-foreground">
                Your conversations are not used to train models.
              </strong>{" "}
              <Ph>
                Confirm in writing for Akouo and every sub-processor, then state
                plainly — or remove the claim.
              </Ph>
            </Bullet>
            <Bullet>
              <strong className="text-foreground">
                AI output is derived, not authoritative.
              </strong>{" "}
              Everything the AI produces from a transcript is a suggestion. It can
              be regenerated, corrected, or discarded, and it never silently
              overwrites something a person decided. Your record of who said what
              stays anchored to the transcript, not to a model&rsquo;s
              interpretation of it.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">
                Sensitive-data redaction
              </strong>{" "}
              can be applied where required.{" "}
              <Ph>State whether PII redaction is offered and how.</Ph>
            </Bullet>
          </ul>
        </Section>

        <Section id="control" title="Your control over your data">
          <ul className="space-y-3">
            <Bullet>
              <strong className="text-foreground">Access and export.</strong> You
              can read and export your meetings, transcripts, and derived output
              at any time.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">
                Deletion is reversible, then permanent.
              </strong>{" "}
              Deleting a meeting hides it immediately and holds it for{" "}
              <Ph>retention window — e.g. 30 / 60 / 90 days</Ph>, during which it
              can be restored. After that window a purge job permanently removes
              the meeting and everything beneath it — recordings, transcripts, and
              segments. This supports your right to erasure.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">
                Departure doesn&rsquo;t shred history, or expose it.
              </strong>{" "}
              When someone leaves an organization, their access is removed and
              their account link is severed — but the transcript still reads
              correctly, because attribution lives with the meeting, not the
              departed account.
            </Bullet>
            <Bullet>
              <strong className="text-foreground">
                Sensitive actions are logged.
              </strong>{" "}
              Deletions, restores, administrative access to restricted meetings,
              and changes to membership are recorded in an append-only audit log.
            </Bullet>
          </ul>
        </Section>

        <Section id="rights" title="Your rights (GDPR)">
          <p>
            If you are in the EU/EEA (or a comparable jurisdiction), you have the
            right to access, correct, export, and erase your personal data, to
            restrict or object to processing, and to lodge a complaint with your
            supervisory authority. To exercise any of these, contact{" "}
            <Ph>privacy contact / DPO email</Ph>.
          </p>
          <p>
            Akouo acts as{" "}
            <Ph>
              data controller / processor — state per relationship
            </Ph>
            . A <strong className="text-foreground">Data Processing Agreement</strong>{" "}
            is available at <Ph>link / on request</Ph>.
          </p>
        </Section>

        <Section id="report" title="Reporting a security concern">
          <p>
            If you believe you&rsquo;ve found a vulnerability or have a security
            concern, contact <Ph>security contact email</Ph>.{" "}
            <Ph>State your disclosure expectations / response window.</Ph>
          </p>
        </Section>
      </div>

      <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        Last updated: <Ph>date</Ph>.
      </p>
    </div>
  );
}
