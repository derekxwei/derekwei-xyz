---
title: 'RowdyHacks XII: Marisa Stole the Precious Ports!'
description: 'A 150-point ICS/OT recon challenge: use nmap and Modbus port knowledge to pick the real OpenPLC out of three decoy ports, then read its holding registers for the flag.'
event: 'RowdyHacks XII'
category: 'network'
points: 150
date: 2026-10-04
tags:
  - ics-ot
  - modbus
  - nmap
  - recon
  - openplc
draft: false
---

<!-- Authorized competition practice against organizer OT infrastructure.
     Read-only; no OT write functions were used. Flag behind a spoiler toggle. -->

## Challenge

ICS/OT · 150 points. The network map was "stolen," so the task is to find where
Modbus actually lives. A connection ZIP supplies an OT tunnel mapping local ports
1500-1503 to the organizers' gateway.

## Approach

This one rewards recon and protocol knowledge rather than any exploit. An nmap
scan across the tunnel surfaces three Modbus-looking ports, decoys planted so the
scan looks right, and the task is to find the one the live OpenPLC actually runs
on. Modbus's textbook port is 502, but here the real PLC answers on **1502**;
probing each candidate shows which one speaks for the plant.

Confirming it is a single read. A function-3 holding-register request to 1502
(unit 1, start 30, count 31) returns 31 values whose low bytes are ASCII, and
decoding them spells the flag:

```text
request : 3636000000060103001e001f
registers 30-60 low bytes  ->  r o w d y { ... }   (first five 114 111 119 100 121, last 125 = '}')
```

The solve only reads holding registers; no write function was used.

## Takeaway

The real work here was reconnaissance, not exploitation: an nmap scan showed several Modbus-looking ports and only one was the live OpenPLC, so the challenge rewarded reading the scan and knowing the protocol's ports. Once the right endpoint was identified it answered fully, the way OT recon works in practice. Segmentation and alerting on Modbus scans from unexpected hosts are the practical counters, because finding the device is most of the attack.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{B0rr0w_Th3se_P0rts_Th1ef}</code></pre>
</details>
