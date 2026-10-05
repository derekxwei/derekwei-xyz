---
title: 'RowdyHacks XII: Do You Know What Will Rock You?'
description: 'A 300-point challenge chaining a hidden page, an SSH password found in RockYou, and a ZIP password also from RockYou to reach the flag.'
event: 'RowdyHacks XII'
category: 'misc'
points: 300
date: 2026-10-03
tags:
  - password-cracking
  - rockyou
  - ssh
  - john
draft: false
---

<!-- Authorized competition practice against organizer-provided services.
     The flag is behind a spoiler toggle. -->

## Challenge

Miscellaneous · 300 points. A website hints that another page exists, and the
flag is several hops away.

## Step 1 — the hidden page

A bounded scan for `.html` pages finds `/dakota.html`, which gives the SSH
username `rowdy-rocks` but shows the password as `REDACTED`. The challenge also
supplies a tunnel mapping its SSH service to a local port.

## Step 2 — the SSH password (RockYou)

The obvious page- and title-derived passwords were rejected, so the password was
a common one. A **single, slow, rate-limited** credential run against the first
100 entries of the local RockYou list stopped quickly at `iloveu` (line 22) for
`rowdy-rocks`. On the host, `/home/rowdy-rocks/flag/download.txt` pointed to a
website route, `/flag_Rnaitnatsat.zip`.

## Step 3 — the ZIP password (RockYou again)

The downloaded ZIP holds one encrypted `flag.txt`. Extracting its hash and
checking it against RockYou finds the password `scooter` (line 455) in under a
second:

```sh
zip2john flag_Rnaitnatsat.zip > flag_zip.hash
john --wordlist=/usr/share/wordlists/rockyou.txt flag_zip.hash
unzip -P scooter -p flag_Rnaitnatsat.zip flag.txt
```

Two independent secrets in the chain were both in the first few hundred lines of
RockYou.

## Defensive takeaway

RockYou is the baseline every attacker starts from, and both gates here fell to
it instantly. The controls are well known: ban known-breached passwords, require
length over complexity, rate-limit and lock out SSH (or disable password auth for
keys), and add MFA. A password that appears in a public wordlist provides no
protection at all, no matter what it is wrapped in.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{bRu13_f0rC1nG-r0Ck5}</code></pre>
</details>
