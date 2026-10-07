---
title: 'RowdyHacks XII: Works on My Machine'
description: 'A 350-point reversing challenge with a two-stage handshake: static analysis recovered the first transmission, a connection-specific transform the second.'
event: 'RowdyHacks XII'
category: 'rev'
points: 350
date: 2026-10-03
tags:
  - reverse-engineering
  - static-analysis
  - protocol
  - two-stage
draft: false
---

<!-- Authorized competition practice. The final second-stage exchange and flag
     were supplied by a teammate; the first-stage value was recovered locally. -->

## Challenge

Reversing · 350 points. The attachment is an old terminal "verification program,"
and the prompt asks for the transmission it expects.

## Stage 1: recovered locally

Static analysis of the binary reconstructs the first expected transmission,
`legacy_build_7f31_access`, and checks it against all 24 of the program's
reconstructed byte comparisons. This value is an intermediate handshake token,
not the final flag. Sending it unlocks the second stage.

## Stage 2: the connection-specific transform

The solve is two-stage. After the first transmission unlocks it, the service
expects a second value that is run through a **connection-specific shuffle/XOR
adapter**: the transform depends on the live session, which is what defeats a
purely static, replay-once approach. A teammate completed this exchange against
the service, and it returned the flag.

The repeatable end-to-end solver a teammate used was not preserved in our shared
workspace, so this writeup documents the verified first stage and the known shape
of the second; the final exchange and flag are from the teammate's run.

## Takeaway

A static token baked into a client is recoverable, which is exactly why the second stage ran it through a session-specific transform, the same reason real protocols use per-session challenge and response instead of a fixed secret. The operational note cuts both ways: an undocumented interactive win is hard to reproduce or hand off, so repeatable tooling matters as much to an operator as an audit trail does to a defender.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{1t_f1n4lly_w0rk3d}</code></pre>
</details>
