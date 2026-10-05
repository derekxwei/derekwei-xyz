---
title: 'RowdyHacks XII: sonion'
description: 'A 250-point forensics-into-reversing challenge: carving a ZIP from a PNG, then inverting a 46-byte checker''s per-byte transform to recover the accepted code.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 250
date: 2026-10-03
tags:
  - file-carving
  - reverse-engineering
  - png
  - checker-inversion
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Forensics · 250 points. A meme image, `sonion.png`, is provided.

## Carve the payload

`pngcheck -v` reports data after the PNG's `IEND` chunk. At offset `0x37c93`
that trailing data begins with a ZIP header. The carved archive holds
`order.txt`, a `README.txt`, and a stripped Linux executable `receipt_check`.
The README says the code the program accepts is the flag.

## Invert the checker

`receipt_check` wants a 46-byte input and compares each transformed byte against
a table in the binary. The transform (helper at `0x401955`) is:

```text
out[i] = ROL8( ((input[i] ^ 0x5a) + 7*i) & 0xff, 3 )
```

Every step is reversible, so recovering the input is mechanical: undo the
rotate, subtract `7*i`, XOR with `0x5a`, for each of the 46 positions:

```text
input[i] = (ROR8(table[i], 3) - 7*i) ^ 0x5a
```

Feeding the recovered string back in, the checker responds `receipt accepted`,
and that string is the flag.

## Defensive takeaway

Two familiar lessons stack here: trailing data after `IEND` is a carving target
(validate and re-encode uploads), and a verification routine shipped inside a
binary is reversible no matter how many add/XOR/rotate steps it uses. Input
validation is not a secret: anything the client can check, an attacker can run
backwards.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{when_you_find_an_onion_ring_in_yo_fries}</code></pre>
</details>
