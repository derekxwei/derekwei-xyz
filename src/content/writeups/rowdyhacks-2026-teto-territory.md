---
title: 'RowdyHacks XII: teto territory'
description: 'A 250-point multi-stage challenge: a PNG with an appended WAV whose stereo-difference DTMF tones spelled the password to a final encrypted ZIP.'
event: 'RowdyHacks XII'
category: 'misc'
points: 250
date: 2026-10-03
tags:
  - steganography
  - dtmf
  - audio
  - file-carving
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Miscellaneous · 250 points. A player ZIP contains `territory.png`.

## Layered structure

The PNG's logical image ends well before the file does. The appended bytes
start with a RIFF/WAV header, and that WAV's declared size in turn points to a
final encrypted ZIP at the tail. So the single image is three files stacked:
PNG, then WAV, then ZIP.

## Decoding the audio

The WAV has two channels that are nearly identical. Subtracting right from left
isolates **thirteen short dual-frequency tones**, and the spectrogram of the
full track even spells the hint `TWO VOICES FIND DIFFERENCE`, confirming the
stereo-difference approach.

The tones are standard telephone-keypad (DTMF) frequency pairs. They decode to
`8386837748679`, which is the keypad spelling of `TETOTERRITORY`. That numeric
string is the ZIP password:

```sh
7z t -p8386837748679 territory.zip     # -> Everything is Ok
7z x -so -p8386837748679 territory.zip territory.txt
```

The WAV metadata's `archive password: baguette` is a decoy. It fails the
integrity check.

## Defensive takeaway

Covert channels stack: trailing data, a stereo-difference signal, and DTMF are
each invisible to a casual look at the "image." The general defense is the same
as other polyglot tricks: canonicalize/re-encode media on ingest and treat any
bytes past the logical end of a file as suspect.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{t3t0_p3ar}</code></pre>
</details>
