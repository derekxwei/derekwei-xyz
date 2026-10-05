---
title: "RowdyHacks XII: Cirno's Perfect Guest Access"
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

## Takeaway

A reachable HMI is free reconnaissance. The common assumption that the OT network
is already isolated leaves view access unauthenticated, so the moment you can
route to the panel it hands over process state, set-points, and, here, the flag,
with no credentials and no alerts. On a real engagement that exposed view is
often the fastest way to map a plant before touching a single control.
Authentication on every view would have closed it.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{Guest_4ccess_For_B4kas}</code></pre>
</details>
