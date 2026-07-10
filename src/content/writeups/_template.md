---
# TEMPLATE: copy this file to a new name WITHOUT the leading underscore
# (e.g. `2026-eventname-challenge-name.md`). Files starting with "_" are
# excluded from the build by the content collection glob pattern.
title: 'TODO: Challenge title'
description: 'TODO: one-sentence summary shown on cards and in search results (aim for 140-160 characters).'
event: 'TODO: event name (see COMPETITIONS in src/consts.ts)'
# category: pick exactly one of: web | crypto | forensics | pwn | rev | osint | network | misc
category: misc
# difficulty (optional): one of easy | medium | hard | insane.
# Delete the line entirely if the event did not state one.
difficulty: medium
# Solve/publish date, YYYY-MM-DD.
date: 2026-07-10
# Freeform lowercase tags, e.g. [sqli, burp, wireshark]
tags: []
# Flip to false to publish. Drafts render in `npm run dev` only.
draft: true
---

<!-- Before publishing: check the event's rules on flag disclosure and redact if required. -->
<!-- Authorized practice only. No live flags, no unauthorized targets, no real-world attack guidance. -->

## Goal

<!-- One or two sentences: what the challenge asked for and the single insight that cracked it. -->

## Challenge

<!-- The prompt as given: points, provided files or services, and any constraints that mattered. -->

## Initial observations

<!-- First impressions before digging in: what stood out, what it looked like, initial hypotheses. -->

## Enumeration

<!-- What you looked at and why: enumeration, file inspection, traffic capture, source review. -->

## Failed attempts

<!-- The dead ends, and why they failed. This is the useful part; keep it honest. -->

## Breakthrough

<!-- The realization that moved things forward, and what led to it. -->

## Solution summary

<!-- The working path, step by step, with commands and snippets. Explain the reasoning, not just keystrokes. -->

## Defensive takeaway

<!-- What a defender should learn from this: the misconfiguration or bug class, and how it is prevented. -->

## Tools used

<!-- The tooling that mattered: e.g. Burp Suite, Wireshark, Ghidra, hashcat. -->

## Lessons learned

<!-- What transfers to the next challenge, and to real-world offensive or defensive work. -->
