# Use-Case Ideas

Cross-domain workflow ideas — things worth automating with Claude regardless
of which [application domain](applications/README.md) they end up applied
to. Move an idea into a domain-specific file once you've actually built it
and it has specifics worth capturing.

- **Drift audit** — check whether an implementation has drifted from its
  spec/design system over time.
- **Research synthesis** — feed documents in one at a time via a script to
  get around context window limits, then have Claude synthesize across all
  of them.
- **Design ticket triage** — use a script to help establish priority across
  a backlog.
- **Inbox triage** — sort/flag different types of activity in an inbox.
- **Monthly reporting** — roll up recurring status/metrics into a report.
- **Proposal generation from a client call** — turn call notes/transcript
  into a draft proposal.

## Patterns

### Cheap artifact before full run

Before committing to an expensive full run (a full video render, a full
batch job, a long generation), produce a cheap intermediate artifact first
and actually check it — don't just trust the setup and run the expensive
version directly.

Observed concretely in a Remotion workflow: rendering single PNG stills at
each animation phase boundary, reading them back to confirm framing/timing/
color, and only then running the full video render — see
[applications/video-editing/remotion.md](applications/video-editing/remotion.md#brief-to-video-workflow).
The pattern isn't video-specific: it generalizes to anything where a full
run is slow/costly and a cheap preview can catch a mistake early — e.g. a
single test record before a full batch import, or one rendered page before
a full document generation run.
