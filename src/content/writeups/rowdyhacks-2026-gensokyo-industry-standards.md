---
title: 'RowdyHacks XII: Gensokyo Industry Standards'
description: 'A 50-point ICS/OT warm-up: recovering the well-known TCP port Modbus uses, confirmed against the local Nmap service registry rather than from memory.'
event: 'RowdyHacks XII'
category: 'network'
points: 50
date: 2026-10-03
tags:
  - ics-ot
  - modbus
  - protocols
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

ICS/OT · 50 points. The prompt asks for the TCP port number that the Modbus
protocol uses, and fixes the answer format as `rowdy{hey_its_<number>}`.

## Approach

Modbus is the canonical industrial-control protocol, and its application layer
(MBAP, Modbus Application Protocol) listens on a single well-known port. Rather
than trust memory, I confirmed it against the Nmap service registry that ships
with Kali:

```sh
awk '$1 == "mbap" && $2 == "502/tcp" { print }' /usr/share/nmap/nmap-services
```

That line identifies **502/tcp** as the Modbus Application Protocol. Dropping
`502` into the required format produces the flag. No attachment or hint was
needed.

## Takeaway

Knowing default service ports is the first step in both offense and defense.
On an OT network, Modbus has no authentication or encryption, so unexpected
traffic to tcp/502 (or Modbus reaching hosts that should never speak it) is
a high-signal indicator worth alerting on at the segmentation boundary.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{hey_its_502}</code></pre>
</details>
