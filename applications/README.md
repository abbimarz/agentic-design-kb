# Applications

One subfolder per **domain** you're applying agentic workflows to. This is
the axis meant to keep growing — unlike [foundations/](../foundations/)
(stable mechanics) or [skills-catalog/](../skills-catalog/) (skills by
discipline), a new domain here doesn't require touching anything else.

## Current domains

- [design/](design/) — asset pipelines, AI-native design systems
- [video-editing/](video-editing/) — Remotion project structure, animation
  techniques, brief-to-video workflow
- [business-ops/](business-ops/) — internal automation (reporting, reminders)

## Adding a new domain

Not pre-created as empty folders on purpose — add one the first time you
have real notes for it, following this shape:

```
applications/<domain-name>/
├── <topic>.md      # one file per concrete workflow/example you've captured
└── images/         # only if a diagram/screenshot is genuinely needed
```

Candidates you've mentioned wanting room for: marketing, 3D modeling, 3D
printing. When notes exist, create `applications/marketing/`,
`applications/3d-modeling/`, `applications/3d-printing/` etc. the same way —
no change needed to this README's structure, just add a bullet above.

If a workflow/idea isn't tied to one domain (e.g. "use a script to triage an
inbox" applies everywhere), it belongs in
[../use-case-ideas.md](../use-case-ideas.md) instead of a specific domain
folder.
