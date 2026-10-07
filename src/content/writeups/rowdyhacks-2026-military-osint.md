---
title: 'RowdyHacks XII: Military OSINT'
description: 'A 150-point OSINT challenge: identifying a fighter wing from its aircraft markings and resolving its home station to the decimal coordinates the checker wanted.'
event: 'RowdyHacks XII'
category: 'osint'
points: 150
date: 2026-10-03
tags:
  - osint
  - geolocation
  - aviation
  - open-source
draft: false
---

<!-- Authorized competition practice using public sources only. The accepted
     coordinates and flag were supplied by a teammate; the unit/base
     identification is from public references and is reproducible. -->

## Challenge

OSINT · 150 points. A photo of a military aircraft is provided, and a local
checker asks for the base where it is stationed, as decimal latitude/longitude.

<img src="/images/ctf/rowdyhacks-2026-military-osint/aircraft.webp" alt="The military aircraft from the challenge photo, carrying Lone Star Gunfighters tail markings." loading="lazy" decoding="async">
*The provided aircraft. Its markings were the thread that led to the unit and its base.*

## Identification (public sources)

The aircraft carries a **Lone Star Gunfighters** marking, which identifies the
**149th Fighter Wing** of the Texas Air National Guard. Its publicly documented
home station is **Kelly Field Annex, Joint Base San Antonio-Lackland**. This
chain from unit to base is reproducible from open references about the wing's
markings and basing; no private data is involved.

## The checker input

The checker accepts a coordinate pair in latitude, longitude order. The pair a
teammate submitted and that the checker accepted was:

```text
29.38333, -98.58083
```

A separately published airfield reference point (~`29.3842, -98.5812`) supports
the same location from public mapping; neither coordinate is claimed to be the
photo's exact capture point, only the station the challenge asked for.

## Takeaway

Unit insignia, tail markings, and squadron nicknames are deliberately public, but in aggregate they fix a base and a mission, and a single captioned photo geolocates a facility entirely from open sources, the exact correlation an adversary runs. The OPSEC counter is to control imagery from sensitive sites and to assume any visible marking is collectable.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{l0n3_st4r_gunf1ght3rs}</code></pre>
</details>
