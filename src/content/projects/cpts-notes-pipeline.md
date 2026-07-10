---
title: 'CPTS study notes pipeline'
description: 'A Claude Code, Claude Haiku, and Obsidian workflow that turns pasted CPTS study material into structured notes, checklists, and review artifacts, with human review.'
status: in-progress
date: 2026-07-10
tags: [automation, obsidian, claude, workflow]
featured: true
---

A workflow for studying toward the Certified Penetration Testing Specialist (CPTS). It uses
Claude Code and Claude Haiku to turn pasted study material into structured, Obsidian-ready
notes: checklists, review artifacts, and organized references that slot into an existing
vault.

To be clear about status: this is a study workflow. I am **preparing for** the CPTS, not
claiming to hold it.

## Problem

CPTS preparation generates a large volume of material across many topics: enumeration,
exploitation, privilege escalation, pivoting, and reporting. Studying it by hand ran into
three recurring problems:

- **Volume.** There is far more material than fits in working memory, and re-reading it
  linearly is a poor way to retain it.
- **Consistency.** Notes taken ad hoc drift in structure over time, which makes them hard
  to review and cross-reference later.
- **Review workflow.** Without deliberate review artifacts (checklists, spaced prompts),
  notes get written once and never revisited, which defeats the point.

## Approach

The pipeline standardizes how raw material becomes durable notes:

- **Claude Code** orchestrates the workflow and file handling.
- **Claude Haiku** does the fast, high-volume reformatting into consistent structures.
- **Obsidian** is the destination vault, so notes are linkable and searchable.
- **Structured formatting** turns prose into topic summaries, command and technique
  checklists, and spaced-review prompts, all following the same shape.
- **Human review** is the final gate: I check accuracy before anything enters the vault.

## Workflow

```text
source material
    -> processing (Claude Code + Claude Haiku)
    -> structured notes (summaries, checklists)
    -> review artifacts (spaced-review prompts)
    -> human review (accuracy check)
    -> Obsidian vault
```

## Security considerations

- **No secrets.** Credentials, tokens, and lab-specific details are never pasted in or
  written into notes.
- **No private credentials or infrastructure.** Nothing tying back to real accounts or
  environments goes through the pipeline.
- **No copyrighted redistribution.** Course content is used privately for study and is not
  reproduced or published; none of it appears on this site.
- **Human review required.** Generated notes are a starting point, not an authority. The
  model speeds up structuring; it does not get the final say on correctness.

## Lessons learned

- **Prompt design matters more than model choice.** A precise, consistent prompt produces
  notes that are actually reusable; a vague one produces tidy-looking but shallow output.
- **Consistency compounds.** Once every note follows the same structure, review and
  cross-linking get much easier, which is where the real retention gain comes from.
- **Automation assists, it does not replace understanding.** The value is in reviewing and
  internalizing the structured notes, not in generating them.

## Future improvements

- **Better templates** for each topic area so structure is even more predictable.
- **Review scheduling** to surface notes on a spaced cadence rather than on demand.
- **Reference linking** that automatically connects related notes and techniques.
- **Workflow refinements** to reduce the manual steps between paste and vault while keeping
  the human accuracy check in place.
