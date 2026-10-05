---
title: 'RowdyHacks XII: Remilia’s Wine Problem'
description: 'A 150-point ICS/OT challenge: read-only Modbus holding-register reads over the OT tunnel surfaced the overpressured tank value needed for the flag.'
event: 'RowdyHacks XII'
category: 'network'
points: 150
date: 2026-10-03
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

ICS/OT · 150 points. The prompt asks for the overpressured wine-dispenser tank
reading, in the format `rowdy{S4kuya_1ts_at_<number>}`. It names an OT gateway
and local ports 1500-1503, but lists no connection files.

## Approach

Using the WebSocket tunnel pattern supplied with the other OT challenges on the
same gateway, local port **1502** answered Modbus/TCP. A function-3 holding-
register read (unit 1, start 0, count 8) returned:

```text
request : 000300000006010300000008
registers 0-2: 125, 85, 495   (rest zero)
```

The raw values carry no names or units. Register 2's **495** was the clear
candidate for the overpressure reading, and the checker accepted that number in
the required format. Everything here is read-only. No Modbus write function was
issued.

## Defensive takeaway

Modbus has no authentication or encryption: anything that can reach tcp/502 (or a
tunnel to it) can read every register, and the "overpressure" value is just as
exposed as any other. The only real controls are at the network layer: segmentation, an OT firewall/data diode, and monitoring for Modbus from unexpected sources, because the protocol itself will answer anyone who asks.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{S4kuya_1ts_at_495}</code></pre>
</details>
