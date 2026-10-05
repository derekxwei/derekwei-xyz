---
title: 'RowdyHacks XII: Dutiful Maid Troubles'
description: 'A 200-point ICS/OT challenge: toggling a single Modbus coil enabled a holding-register output whose ASCII bytes spelled the flag, then restoring the coil to its original state.'
event: 'RowdyHacks XII'
category: 'network'
points: 200
date: 2026-10-04
tags:
  - ics-ot
  - modbus
  - coil-write
  - process-control
draft: false
---

<!-- Authorized competition practice against organizer OT infrastructure. A single
     coil was written as the challenge required, then restored. Flag behind a
     spoiler toggle. -->

## Challenge

ICS/OT · 200 points. The prompt asks us to "change a machine's conditions to
recover its output," over the same OT gateway and tunnel as the other Touhou OT
challenges (local ports 1500-1503).

## Approach

Through the tunnel, `127.0.0.1:1502` answered Modbus/TCP. Reading holding
registers 10-29 (function 3) initially returned twenty zeros, and coil 0
(function 1) read **off**. The challenge is explicit that a condition must change,
so I flipped coil 0 on with a single function-5 write, then re-read the registers:

```text
write coil 0 ON : 37050000000601050000ff00
registers 10-29 -> 114 111 119 100 121 123 78 49 71 72 84 79 70 77 79 68 66 85 83 125
                   ->  r o w d y { N 1 G H T O F M O D B U S }
```

Each register's byte is ASCII, spelling the flag. Writing coil 0 **off** again
(`...0500000000`) restored the original state and the registers returned to zero. The solver does this in a `finally` block so the device is left as it was found.

## Takeaway

This is the one that should worry a defender: a single unauthenticated function-5 coil write changed the physical process and produced new output, and in the real world that primitive moves a valve, a relay, or a pump. Modbus writes have no authentication, so the controls are network-level, segmentation and read-only data diodes where possible, plus an alert on any write function from anything but the authorized controller. Restoring the coil after testing is basic OT discipline; an attacker would not.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{N1GHTOFMODBUS}</code></pre>
</details>
