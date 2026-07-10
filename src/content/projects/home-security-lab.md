---
title: 'Home security lab'
description: 'A small home lab for hands-on defensive practice — early stage and in progress, with the build-out planned rather than finished.'
status: in-progress
date: 2026-07-09
tags: [homelab, blue-team, detection]
featured: true
---

I'm building a small home lab to get hands-on defensive practice before I start the
B.S. Cybersecurity program at UTSA this fall. Certifications and CTFs taught me the
concepts; the lab is where I want to actually run the tooling — collect logs, write
detections, and break things in an environment where breaking things is the point.

## Planned build-out

This is the roadmap, not a list of things that exist yet:

1. **Virtualization host** — a machine dedicated to running lab VMs, kept separate from
   anything I depend on day to day.
2. **Segmented lab network** — the lab isolated from the rest of the home network, so
   experiments can't touch real devices.
3. **Windows and Linux targets** — a handful of endpoint VMs to generate realistic
   activity, monitor, and attack.
4. **Centralized log collection** — endpoint and network logs forwarded to one place
   instead of scattered across machines.
5. **SIEM / detection experimentation** — writing and testing detection rules against
   my own activity in the lab.

## Current status

Early stage and in progress. I'm still working out hardware and software choices, so
there's nothing concrete to document yet — this page will grow as pieces actually land.

<!-- TODO(derek): document actual hardware/software as it lands -->
