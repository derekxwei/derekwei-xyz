---
title: 'Offensive security home lab'
description: 'An authorized home lab for penetration testing practice, CTF challenges, and GPU-assisted password cracking, built on a local virtualization workstation.'
status: in-progress
date: 2026-07-05
tags: [homelab, pentest, ctf, virtualization]
featured: false
---

An authorized home lab for offensive-security practice: penetration testing against
targets I own or have explicit permission to test, Capture the Flag challenges, and
GPU-assisted password cracking. The workstation exists and is in use; the surrounding lab
is still being built out.

The full environment, including the travel network and remote-access tooling, is
documented on the [lab page](/lab/). This entry is the project view of it.

## What runs today

- A Windows 11 virtualization workstation (Ryzen 7 9800X3D, 32 GB RAM, RTX 5070) hosting
  disposable VMs for CTF and penetration testing practice.
- Hashcat password-cracking exercises against hashes generated inside the lab, using the
  GPU rather than any external service.
- An Obsidian vault capturing methodology, so solves become repeatable rather than
  one-off.

## Planned build-out

This is the roadmap, not a list of things that exist yet:

1. **Segmented lab network** so practice targets stay isolated from anything I depend on
   day to day.
2. **A rotating set of intentionally vulnerable targets** (self-hosted practice VMs) to
   exercise enumeration, exploitation, and post-exploitation.
3. **Defensive visibility** on the same lab, so offensive activity can be matched against
   what a defender would actually see. This is where the CySA+ background is useful.

## Ground rules

Everything stays inside VMs and authorized targets. No credentials, keys, private
addresses, or exact topology appear here or anywhere in the repository.

<!-- Keep this in sync with the /lab page as the build-out progresses. -->
