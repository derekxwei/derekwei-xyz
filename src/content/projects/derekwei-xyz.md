---
title: 'derekwei.xyz (this site)'
description: 'This site: a fast, static Astro 5 build with a strict CSP, no cookies or trackers, and no third-party requests, deployed on Cloudflare Pages.'
status: shipped
date: 2026-07-09
tags: [astro, typescript, tailwind, cloudflare-pages]
repo: 'https://github.com/derekxwei/derekwei-xyz'
featured: true
---

The site you're reading right now. It's my portfolio, but I also treated it as a small
exercise in doing the boring security work properly on something I actually ship.

## Problem

A cybersecurity portfolio has a higher bar than most personal sites: it should demonstrate
the security fundamentals it talks about. That means fast, accessible, recruiter-friendly,
and hardened, without dragging in a backend, database, or third-party scripts that widen
the attack surface in version 1.

## Approach

- **Astro 5** with fully static output; pages are plain HTML with scripts only where a
  page genuinely needs them.
- **TypeScript** in strict mode, including the inline scripts Astro compiles and bundles.
- **Tailwind CSS 4** with a small set of design tokens for the dark blueprint palette.
- **Markdown/MDX content collections** for projects, writeups, and lab notes, validated
  against Zod schemas at build time.
- **GitHub-based deployment to Cloudflare Pages**: a push builds the site and publishes the
  static output to Cloudflare's edge. The repository is kept private while the site is
  actively maintained.

## Architecture

![Delivery pipeline diagram: local development pushes to a private GitHub repository, which triggers a Cloudflare Pages build. The Cloudflare edge serves the static output over HTTPS with strict security headers to the visitor's browser, with no origin server.](/images/architecture/derekwei-site-architecture.svg)

The flow in order: local development, then a push to the private GitHub repository, then a
Cloudflare Pages build, then the Cloudflare edge over HTTPS, then the visitor's browser.
There is no origin server and no backend at request time.

## Security considerations

A static portfolio doesn't have much attack surface, which is exactly why it should get
the fundamentals right:

- Strict Content Security Policy with no inline scripts; everything Astro emits is
  bundled to external files.
- Security headers shipped via Cloudflare Pages' `_headers` file.
- No cookies, no trackers, no analytics, no third-party requests of any kind.
- System font stack only: no font CDN, no external stylesheets.

The full breakdown (headers, CSP directives, and the reasoning behind them) is on the
[architecture page](/architecture/).

## Lessons learned

- A strict CSP forces good habits: no inline scripts or styles meant restructuring a few
  components, but the result is a policy that actually holds instead of one padded with
  `unsafe-inline`.
- Keeping every fact in one place (a single constants module) stopped the resume,
  homepage, and achievements page from drifting out of sync.
- Static-first removes whole categories of problems. There is no server to patch and no
  database to leak.

## Future improvements

- Publish sanitized CTF writeups and lab notes on a regular cadence.
- Add a lightweight, privacy-respecting way to measure interest without cookies or
  third-party trackers.
- Revisit whether any interactive feature genuinely needs a backend before adding one, so
  the security model only grows when there is a real reason.
