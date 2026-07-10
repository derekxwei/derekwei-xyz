---
title: 'CPTS study notes pipeline'
description: 'A Claude Code, Claude Haiku, and Obsidian workflow that turns pasted CPTS study material into structured notes, checklists, and review artifacts, with human review.'
status: in-progress
date: 2026-07-10
tags: [automation, obsidian, claude, workflow]
featured: true
---

A workflow for studying toward the Certified Penetration Testing Specialist (CPTS). It
uses Claude Code and Claude Haiku to turn pasted study material into structured,
Obsidian-ready notes: checklists, review artifacts, and organized references that slot
into an existing vault.

To be clear about status: this is a study workflow. I am **preparing for** the CPTS, not
claiming to hold it.

## How it works

1. Study material is pasted in as source text.
2. The workflow reorganizes it into consistent note structures: topic summaries, command
   and technique checklists, and spaced-review artifacts.
3. Output is formatted for direct use in Obsidian, with links back to references.
4. I review everything by hand for accuracy before it enters the vault. The model speeds
   up structuring; it does not get the final say on correctness.

## Guardrails

- Sensitive or copyrighted course content is not pasted into public or otherwise unsafe
  contexts, and none of it is reproduced here.
- The pipeline is a study aid, not a replacement for the source material or hands-on lab
  practice.
- Accuracy checking is a human step, on purpose. Generated study notes are a starting
  point, not an authority.

## Status

In progress and evolving as I work through the material. The structure and prompts get
refined as I find what actually helps retention.
