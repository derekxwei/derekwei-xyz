---
title: 'RowdyHacks XII: Cirno’s Perfect Guest Access'
description: 'A 100-point ICS/OT challenge: an exposed SCADA-LTS HMI view returned the flag through a guest-accessible component that required no login.'
event: 'RowdyHacks XII'
category: 'network'
points: 100
date: 2026-10-03
tags:
  - ics-ot
  - scada-lts
  - hmi
  - access-control
draft: false
---

<!-- Authorized competition practice. Solved by a teammate; this documents the
     reported guest-access exposure. The flag is behind a spoiler toggle. -->

## Challenge

ICS/OT · 100 points. The scenario centers on a display and an HMI in a SCADA
environment; no file attachment is provided.

## Approach

The solve used the challenge's publicly exposed **Misty Lake HMI** view in
SCADA-LTS. Its **Fairy-HMI** component rendered the flag directly, with no
authentication required to reach that view. A teammate completed this one; the
writeup records the reported guest-access exposure rather than any new access.

## Defensive takeaway

Human-Machine Interfaces are frequently deployed with "view" access left open on
the assumption that the OT network is already isolated. That assumption fails the
moment the HMI is reachable — an unauthenticated view can disclose process state,
set-points, and, as here, whatever the panel shows. HMIs should require
authentication for every view, and OT dashboards should never be exposed to an
untrusted network.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{Guest_4ccess_For_B4kas}</code></pre>
</details>
