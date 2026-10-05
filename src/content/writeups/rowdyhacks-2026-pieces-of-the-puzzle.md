---
title: 'RowdyHacks XII: Pieces of the Puzzle'
description: 'A 250-point network-forensics challenge: reassembling a split archive from six pieces scattered across HTTP responses and Base64-encoded DNS TXT records.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 250
date: 2026-10-03
tags:
  - pcap
  - tshark
  - dns-exfiltration
  - http
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Forensics · 250 points. A capture (`capture.pcap`) is provided; the prompt says
an archive was split into six pieces.

## Enumeration

The six pieces hide across two protocols:

- **HTTP**: three responses for `/static/*.part` whose bodies begin
  `PIECE 1 OF 6`, `PIECE 3 OF 6`, and `PIECE 5 OF 6`.
- **DNS**: TXT answers for `p2.exfil.ctf.local`, `p4.exfil.ctf.local`, and
  `p6.exfil.ctf.local`, each a Base64-encoded body with the same numbered
  header.

## Solution

Strip the `PIECE n OF 6` header from each piece, Base64-decode the DNS bodies,
concatenate the six binary payloads in numeric order, and the result is a valid
ZIP. It opens with the challenge-provided password `ctf`:

```sh
# tshark exports the HTTP objects and reads the DNS TXT records;
# reassemble in order, then verify and extract:
7z t -pctf secret.zip          # -> Everything is Ok
7z x -so -pctf secret.zip flag.txt
```

## Takeaway

Splitting a payload across HTTP and DNS TXT records is deliberate tradecraft: it beats single-stream detection and rides DNS, which leaves through resolvers that are rarely inspected as closely as web traffic. For a defender that is the signal to hunt, unusual TXT volume and long base64-looking labels, and to correlate across protocols instead of per-flow.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>flag{out_of_order_execution}</code></pre>
</details>
