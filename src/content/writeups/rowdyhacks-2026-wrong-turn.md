---
title: 'RowdyHacks XII: WRONG TURN'
description: 'A 200-point network-forensics challenge: carving an HTTP-transferred PDF out of a packet capture to read the briefing that hid the flag among decoy traffic.'
event: 'RowdyHacks XII'
category: 'forensics'
points: 200
date: 2026-10-03
tags:
  - pcap
  - wireshark
  - tshark
  - http
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Forensics · 200 points. A packet capture (`wrong-turn.pcap`) is provided, with
a prompt that points at a "plan."

## Enumeration

The capture carries several HTTP requests. Most are noise (a portal, a stylesheet, a health check, a queue), but one request stands out:
`GET /docs/getaway-route.pdf`. Exporting the HTTP objects and converting that
PDF to text pulls the document straight out of the stream:

```sh
export_dir=$(mktemp -d)
tshark -r wrong-turn.pcap --export-objects "http,$export_dir" -q
pdftotext "$export_dir/getaway-route.pdf" -
```

## Solution

The PDF is a getaway briefing: pickup at the east service entrance, then
loading bay to service road to rendezvous, with a note that the main exit has
cameras and that reaching the river means a wrong turn. Under "A message from
the crew leader," it prints the flag. The unrelated traffic was there to make
the capture look busy.

## Takeaway

Anything sent over cleartext HTTP is recoverable byte for byte by anyone on the path, documents included, and exported HTTP objects rebuild them verbatim. To an attacker on the wire that is free collection; to a responder the same capture is an evidence source. The fix is the boring one that still matters: TLS everywhere, and treat any span port or capture as a disclosure surface.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{you_were_only_supposed_to_blow_the_doors_off}</code></pre>
</details>
