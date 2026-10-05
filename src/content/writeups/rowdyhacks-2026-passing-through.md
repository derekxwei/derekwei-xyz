---
title: 'RowdyHacks XII: Passing Through'
description: 'A 300-point OSINT investigation: geolocating a lift bridge in New Orleans and pulling eight facts, down to a federal case number and bag counts, from public records.'
event: 'RowdyHacks XII'
category: 'osint'
points: 300
date: 2026-10-04
tags:
  - osint
  - geolocation
  - public-records
  - new-orleans
draft: false
---

<!-- Authorized competition practice using only public sources. The flag is
     behind a spoiler toggle. -->

## Challenge

OSINT · 300 points. The challenge site supplies a full-resolution photo of a lift
bridge and a checker that validates eight separate discoveries before releasing
the flag.

![The lift bridge from the challenge photo, later identified as the Danziger Bridge over the Industrial Canal in New Orleans.](/images/ctf/rowdyhacks-2026-passing-through/lift-bridge.webp)

*The starting photo. The tower shape, the loop ramp, and the canal fixed it to the Danziger Bridge.*

## Geolocation

The concrete towers, the loop ramp to the left, and the canal match the
**Danziger Bridge** on US 90, seen from the **I-10 High Rise Bridge** looking
**north** along New Orleans' Industrial Canal. A
[Louisiana DOTD notice](https://wwwapps.dotd.la.gov/administration/announcements/announcement.aspx?key=31004)
places the bridge between France Road and Jourdan Road, and a
[road guide](https://www.aaroads.com/guides/us-090-la) documents its France Road
loop ramp.

## From a warehouse to a court record

The warehouse behind the right-hand tower is **Dupuy Storage & Forwarding, LLC**.
Dupuy's [New Orleans location page](https://dupuygroup.com/locations/new-orleans/)
lists **4300 Jourdan Road, New Orleans, LA 70126**. That address appears in a
federal case,
[*Coex Coffee International v. Dupuy Storage & Forwarding, LLC*](https://www.govinfo.gov/content/pkg/USCOURTS-laed-2_06-cv-04798/pdf/USCOURTS-laed-2_06-cv-04798-0.pdf),
**Civil Action No. 06-4798**. Its pages give Warehouse No. 1 at 4300 Jourdan Road
and report **1,495** coffee bags destroyed and **4,319** sold for salvage, a
combined **5,814**.

## The eight answers

```text
Danziger Bridge · I-10 High Rise Bridge · north ·
Dupuy Storage & Forwarding, LLC · 4300 Jourdan Road, New Orleans, LA 70126 ·
06-4798 · 1 · 5814
```

The checker reports "All eight discoveries verified" and shows the flag.

## Takeaway

Each step was a public source, a bridge notice, a company page, a federal court PDF, chained from one photo into a precise facility, its owner, and its legal history, which is exactly how OSINT and due diligence work. The OPSEC counterpart is to assume a published image can be pivoted into records far beyond what the picture appears to show.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{the_bridge_was_the_easy_part}</code></pre>
</details>
