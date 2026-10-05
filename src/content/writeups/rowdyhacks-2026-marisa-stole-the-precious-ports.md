---
title: 'RowdyHacks XII: Marisa Stole the Precious Ports!'
description: 'A 150-point ICS/OT challenge: read-only Modbus holding-register reads over the OT tunnel whose low-byte ASCII values spelled out the flag.'
event: 'RowdyHacks XII'
category: 'network'
points: 150
date: 2026-10-04
tags:
  - ics-ot
  - modbus
  - holding-registers
  - read-only
draft: false
---

<!-- Authorized competition practice against organizer OT infrastructure.
     Read-only; no OT write functions were used. Flag behind a spoiler toggle. -->

## Challenge

ICS/OT · 150 points. The prompt asks where Modbus communicates after the network
map was "stolen," and supplies a connection ZIP with an OT tunnel mapping local
ports 1500-1503 to the organizers' gateway.

## Approach

Running the supplied client against the gateway, read-only Modbus function probes
identified **127.0.0.1:1502** as the endpoint speaking Modbus/TCP. A function-3
holding-register read (unit 1, start 30, count 31) returned 31 values whose low
bytes are ASCII:

```text
request : 3636000000060103001e001f
registers 30...: 114 111 119 100 121 ...   ->  r o w d y ...   (last: 125 = '}')
```

Decoding the low byte of each register spells the flag directly. The solve only
reads holding registers. No write function was used.

## Defensive takeaway

Because Modbus has no authentication, read access to the right register range
discloses whatever the device exposes, here, an entire string sitting in holding
registers. Finding the live endpoint was the whole challenge, which mirrors real
OT reconnaissance: once a device answers, it answers fully. Segmentation and
monitoring for Modbus scans from unexpected hosts are the practical defenses.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{B0rr0w_Th3se_P0rts_Th1ef}</code></pre>
</details>
