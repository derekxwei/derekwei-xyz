---
title: 'RowdyHacks XII: Hidden in Plain Sight'
description: 'A 200-point layered-stego challenge: an EXIF hint led to a ZIP appended after a JPEG end marker, then a steghide payload unlocked with a passphrase from the archive.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 200
date: 2026-10-03
tags:
  - steganography
  - steghide
  - exif
  - polyglot
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Forensics · 200 points. A single photo, `vacation.jpg`, is provided.

## Layer 1: the EXIF hint

The `ImageDescription` EXIF field is Base64. Decoding it says the image has
extra data after the JPEG end-of-image marker (`FF D9`), beginning with `PK`,
the ZIP signature. So the JPEG is a polyglot with an archive appended to its
tail.

## Layer 2: the appended ZIP

Scanning for the ZIP signature after the final `FF D9` and carving from there
yields an archive:

```sh
# locate PK after the JPEG end marker, carve to EOF, then unzip
unzip -oq embedded.zip -d extracted
```

It contains `photo2.jpg` and a `readme.txt` that supplies the passphrase
`p1xel_hunt3r` for the next layer.

## Layer 3: the steghide payload

`photo2.jpg` carries a steghide payload unlocked by that passphrase:

```sh
steghide extract -sf extracted/photo2.jpg -p p1xel_hunt3r -xf payload.txt -f
cat payload.txt   # -> FLAG: flag{flexible_array_member}
```

Every clue needed for the next layer lived inside the previous one; no platform
hint was used.

## Defensive takeaway

Data after a file's logical end marker is invisible to viewers but trivially
carved, a reliable covert channel and exfiltration trick. Upload pipelines and
DLP should re-encode or canonicalize images and reject trailing bytes, rather
than assume a valid header means a clean file.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>flag{flexible_array_member}</code></pre>
</details>
