# CTF writeup template (authoring reference)

A recruiter-friendly structure for writing up a Capture the Flag challenge. Copy the
skeleton below into a new file when you are ready to publish a real writeup.

- **To publish on the site:** use the live content template at
  `src/content/writeups/_template.md` (it has the required Astro frontmatter). This file
  is the narrative reference for *what to write in each section*; that file is *how to ship
  it*. They intentionally use the same section order.
- **Ground rules:** authorized practice only, no live flags, redact where event rules
  require it, and never include anything that would help attack a real system. Keep the
  reasoning; that is the part a recruiter actually values.

---

## Challenge Overview

One or two sentences: what the challenge was and the single insight that solved it. A
reader should understand the shape of the problem from this alone.

## Event

The competition and year (for example, BYU CTF 2026). Link the event if it has a public
page.

## Category

web / cryptography / forensics / reverse engineering / binary exploitation (pwn) / OSINT /
networking / misc.

## Difficulty

As stated by the organizers (easy / medium / hard / insane), or your honest estimate if
they did not rate it. Say which.

## Goal

What recovering the flag required in concrete terms (for example, "read a file outside the
web root" or "recover the AES key from a nonce-reuse bug").

## Initial Observations

First impressions before digging in: what stood out, what the challenge looked like, and
the initial hypotheses those observations suggested.

## Enumeration

What you inspected and why: recon, source review, file or binary inspection, traffic
capture. Show the commands and what they revealed.

## Failed Attempts

The approaches that did not work and *why* they failed. This is the most useful section for
a reader and the most honest signal of how you think. Do not omit it.

## Breakthrough

The realization that moved things forward and what led to it. Connect it back to an earlier
observation where you can.

## Solution Summary

The working path, step by step, with commands and short snippets. Explain the reasoning at
each step, not just the keystrokes. Redact the flag if required.

## Defensive Takeaway

The bug class or misconfiguration behind the challenge, and how a defender prevents or
detects it in the real world. This is where CySA+ blue-team literacy shows.

## Lessons Learned

What transfers to the next challenge and to real offensive or defensive work. Keep it to a
few concrete points.

---

### Recruiter framing tips

- Lead with reasoning, not tooling. "I hypothesized X because Y" beats "I ran tool Z."
- Keep the failed-attempts section. It demonstrates methodology and honesty.
- Always include the defensive takeaway. It shows you understand both sides.
- One clean, complete writeup is worth more than five thin ones.
