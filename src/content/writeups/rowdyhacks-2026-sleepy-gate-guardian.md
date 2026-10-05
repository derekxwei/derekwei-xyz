---
title: 'RowdyHacks XII: Sleepy Gate Guardian'
description: 'A 100-point ICS/OT challenge: a SCADA-LTS dashboard left on the default administrator account exposed the flag in a data point''s history.'
event: 'RowdyHacks XII'
category: 'network'
points: 100
date: 2026-10-03
tags:
  - ics-ot
  - scada-lts
  - default-credentials
  - access-control
draft: false
---

<!-- Authorized competition practice. Solved by a teammate; this documents the
     reported default-credential exposure. The flag is behind a spoiler toggle. -->

## Challenge

ICS/OT · 100 points. The scenario concerns access to a private SCADA dashboard;
no file attachment is provided.

## Approach

The reported solve authenticated to the SCADA-LTS dashboard with the **default
administrator account**, then read the flag from the logged history of the
`SDM_Front_Gate – Meiling Flag` data point. A teammate completed this; the
writeup records the reported default-account exposure and where the flag lived.

## Defensive takeaway

Default credentials are one of the most common and most damaging real-world ICS
weaknesses — they turn "private dashboard" into "public dashboard" for anyone who
can reach it. The baseline controls are unglamorous and non-negotiable: change
every default account on commissioning, disable unused ones, and alert on logins
to built-in admin identities. Historised data points also persist values long
after they leave the live view, so access control has to cover history, not just
the current reading.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{D0nt_Leav3_The_G@te_Ungu4rded}</code></pre>
</details>
