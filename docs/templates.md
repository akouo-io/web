# Templates

Templates turn a raw transcript into structured output you can act on. Define a
template once, and Akouo applies it to every meeting you point it at.

## The core idea

Every meeting Akouo records becomes a transcript — but a transcript is just a
wall of text. A template tells Akouo what to pull out of it: the action items,
decisions, numbers, or notes you actually care about, in a shape you decide.
Define it once, and Akouo applies it to every meeting you point it at.

## The building blocks

Akouo doesn't ship a fixed list of output types. You compose a template from a
few simple pieces:

- **Summaries** — free-form narrative: a recap, a topic breakdown, the open
  questions left hanging.
- **Action items** — things someone owns, with an optional assignee and due
  date, that you can check off and carry across meetings.
- **Metrics** — a single measurable value: a rating, a count, a yes/no, a
  dollar figure — the kind of thing worth tracking across a series of calls.
- **Lists** — structured records for anything that doesn't fit the above.

"Action items" isn't a built-in Akouo concept — it's just a field you named.
Your template captures what your meetings are actually about, not what a generic
tool assumed.

## What makes the output trustworthy

- **Traceable** — every value Akouo extracts links back to the exact moment in
  the transcript where it was said. Nothing is a floating claim you have to take
  on faith.
- **Confidence-scored** — each extracted value carries a confidence signal.
- **Attributed** — extracted items are tied to the person who said them.
- **Live** — because Akouo captures live, the same template can track its
  agenda during the call, then produce the full structured extraction once the
  meeting ends.

## It's yours

Templates belong to you — you author them, you own them. Change one and Akouo
keeps the earlier version intact, so:

- an extraction always reflects the template as it stood when it ran, and
- you can re-run an old meeting against your newest template without losing the
  original.
