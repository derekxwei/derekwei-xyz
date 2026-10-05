---
title: 'RowdyHacks XII: Back to Nothing'
description: 'The 600-point forensics flagship: reassembling a 7-Zip from element-symbol fragments, undoing a custom byte transform to recover a BMP, reading a glyph panel for a Steghide passphrase, then reversing a payload into a spectrogram that spelled the flag.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 600
date: 2026-10-03
tags:
  - steganography
  - steghide
  - spectrogram
  - 7-zip
  - byte-transform
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle.
     The glyph-panel reading and the exact accepted flag were supplied by a
     teammate; the intermediate artifacts below were independently verified. -->

## Challenge

Forensics · 600 points, the hardest challenge on the board. It is a five-stage
chain where each stage produces the key to the next.

## Stage 1: reassemble the archive

The challenge ZIP contains nine `Rock Me.*` fragments whose extensions are
**chemical element symbols**. Sorting by atomic number gives the order:

```text
H(1)  C(6)  S(16)  Rb(37)  Sb(51)  Cs(55)  Pm(61)  Gd(64)  Db(105)
```

Concatenated in that order, the fragments form a valid 7-Zip archive. Its
password, `solidsnake`, falls to a quick local dictionary check and is confirmed
by the archive integrity test. Extracting it yields a ~39 MB file named
`Major Tom`.

## Stage 2: undo the byte transform

`Major Tom` is not a usable file until two transforms are reversed: subtract each
byte's zero-based index modulo 16, then remove the `0x64` filler byte that
follows every zero byte. Doing so strips ~2.17 MB of padding and produces a
**4096 × 3072, 24-bit BMP** (37,748,790 bytes). A structural audit reversed the
transform both ways and reproduced every byte, which is how I trusted it before
moving on.

## Stage 3: read the glyph panel

The recovered BMP shows four rows of ten colored glyphs. In each row the last
four glyphs repeat the first four, leaving six independent glyphs per row. A
teammate supplied the substitution reading, which checked out consistently
across the panel:

| First six glyphs | Decoded letters |
| --- | --- |
| `ABCDEF` | `YOUHAV` |
| `GHBIJK` | `ETODIG` |
| `IGGLGM` | `DEEPER` |
| `JNOJIG` | `INSIDE` |

The 24 independent positions read **YOU HAVE TO DIG DEEPER INSIDE**. The working
Steghide passphrase is that phrase, uppercase, no spaces:
`YOUHAVETODIGDEEPERINSIDE`.

## Stage 4: extract and reverse the payload

Steghide, given that passphrase against the recovered BMP, extracts a payload
named `vaw` (it reports Rijndael-128/CBC, a 32-byte key makes it AES-256-CBC):

```sh
steghide extract -sf Major_Tom.bin -p YOUHAVETODIGDEEPERINSIDE -xf vaw
```

The name `vaw` is `wav` reversed, and the file's tail reverses into a `RIFF`/
`WAVE` header. Reversing the **entire** byte stream yields a 3.0-second, 44.1 kHz
mono WAV.

## Stage 5: read the spectrogram

Rendering the reversed WAV's spectrogram spells the flag body:

```sh
ffmpeg -i reversed.wav -lavfi \
  'showspectrumpic=s=1800x800:legend=1:scale=log:mode=combined' \
  -frames:v 1 spectrogram.png
```

The spectrogram reads `Anomolous_Adventures` (the misspelling is the author's).
A mark before the closing brace resembles `!`; the teammate's accepted
submission confirms the flag has no trailing `!`. The author also confirmed that
brute-forcing the Steghide password was not the intended route. The glyph panel
was.

## Defensive takeaway

Depth, not any single clever trick, is the lesson: five independent encodings (fragmentation, a custom byte transform, visual substitution, Steghide/AES, and an audio spectrogram), each trivial alone, compound into something that resists
automated carving. For defenders, it is a reminder that "nothing here" after one
pass of the usual tools is not proof a file is clean.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{Anomolous_Adventures}</code></pre>
</details>
