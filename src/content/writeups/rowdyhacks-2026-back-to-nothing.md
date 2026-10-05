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
     The glyph-panel reading and the exact accepted flag are the team's;
     the intermediate artifacts below were independently verified. -->

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

The recovered BMP is a photo of a neon sign: four rows of ten hand-drawn glyphs
in red, blue, and green.

![The recovered glyph panel, four rows of colored neon symbols drawn from mixed scripts.](/images/ctf/rowdyhacks-2026-back-to-nothing/glyph-panel.webp)

*The decoded panel. The 15 distinct forms are a deliberate mix of scripts, which is what makes them hard to name.*

Two features make it a cipher rather than decoration. The glyphs fall into three
color classes of five (red, blue, green), and in every row the last four glyphs
repeat the first four, so only the first six per row are independent, giving 24
meaningful positions.

The 15 forms are pulled from several scripts at once, which is the whole
difficulty: some read as Japanese kana, some as Latin letters, some as numerals,
and others as symbols with no obvious single source. A shape can imitate a
character without being it, so the set resists a clean lookup.

We worked out the full substitution, one letter per form. The panel glyphs are
hand-drawn, so the table gives the closest printable shape for each; the photo
above is the real reference.

| Color | Glyph | Letter |
| --- | --- | --- |
| Red | `8` | Y |
| Red | four-like mark | H |
| Red | crossed stroke | T |
| Red | `6` | G |
| Red | circle-and-cross | R |
| Blue | `∩` | O |
| Blue | `C` | A |
| Blue | looped stroke | E |
| Blue | `U` | I |
| Blue | `F` | S |
| Green | hooked stroke | U |
| Green | `乙` | V |
| Green | `λ` | D |
| Green | `の` | P |
| Green | `ん` | N |

Reading the 24 independent positions in order gives the panel's message:

```text
Y O U H A V
E T O D I G
D E E P E R
I N S I D E
```

That is **YOU HAVE TO DIG DEEPER INSIDE**. Uppercased with no spaces,
`YOUHAVETODIGDEEPERINSIDE` is the Steghide passphrase for the next stage.

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

## Takeaway

Depth, not any single trick, is the lesson: five trivial encodings (fragmentation, a byte transform, a visual cipher, Steghide/AES, and an audio spectrogram) compound into something that resists automated carving. For a forensic analyst the takeaway is the inverse: "nothing here" after one pass of the usual tools is not evidence a file is clean.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{Anomolous_Adventures}</code></pre>
<img src="/images/ctf/rowdyhacks-2026-back-to-nothing/spectrogram-flag.webp" alt="Spectrogram of the reversed audio, with the flag text visible as bright bands against a dark background." />
</details>
