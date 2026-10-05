---
title: 'RowdyHacks XII: Goomba'
description: 'A 100-point forensics challenge where a file posing as a JPEG is really a PNG, hiding the flag in the least-significant bits of its RGB channels.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 100
date: 2026-10-03
tags:
  - steganography
  - zsteg
  - lsb
  - file-signatures
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Forensics · 100 points. A single image named `Goomba.jpg` is provided.

## Initial observation

The extension says JPEG, but the bytes disagree:

```sh
file Goomba.jpg   # -> PNG image data
```

The mismatch is the whole hint: treat the file as its real format, not its
name. JPEG stego tooling would have been a dead end here.

## Approach

PNG lends itself to least-significant-bit (LSB) stego because its channels are
stored losslessly. Reading the LSB of the red, green, and blue channels in
pixel order recovers the flag:

```sh
zsteg -E b1,rgb,lsb,xy Goomba.jpg | strings -n 5 | head -1
```

`zsteg -a Goomba.jpg` independently flags the same bit stream as text, which
confirms the channel order rather than guessing it.

## Takeaway

The file lied about its type, and that is the whole move: validate magic bytes, never the extension, because polyglots and disguised payloads ride that exact assumption past naive filters. The flag sat in the RGB least-significant bits, a cheap covert channel. Defensively, re-encoding or canonicalizing an uploaded image destroys an LSB payload outright, and a type/extension mismatch is a clean thing to alert on.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{D0nt_STOMP_0n_m3!}</code></pre>
</details>
