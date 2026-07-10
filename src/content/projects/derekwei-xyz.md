---
title: 'derekwei.xyz (this site)'
description: 'This site: a fast, static Astro 5 build with a strict CSP, no cookies or trackers, and no third-party requests, deployed on Cloudflare Pages.'
status: shipped
date: 2026-07-09
tags: [astro, typescript, tailwind, cloudflare-pages]
repo: https://github.com/B1ueBurD/derekwei-xyz
featured: true
---

The site you're reading right now. It's my portfolio, but I also treated it as a small
exercise in doing the boring security work properly on something I actually ship.

## Goals

- **Fast.** Static HTML rendered at build time, system fonts only, no client-side
  framework runtime. Nothing loads from anywhere but this domain.
- **Accessible.** Semantic landmarks, one `h1` per page, a skip link, visible focus
  styles, and honest heading structure throughout.
- **Recruiter-friendly.** Everything a recruiter would want (resume, certifications,
  projects, contact) is at most one click from the header, and the resume prints
  cleanly.

## Stack

- **Astro 5** with fully static output; pages are plain HTML with scripts only where a
  page genuinely needs them.
- **TypeScript** in strict mode, including the inline scripts Astro compiles and
  bundles.
- **Tailwind CSS 4** with a small set of design tokens for the dark blueprint palette.
- **Markdown/MDX content collections** for projects, writeups, and lab notes, validated
  against Zod schemas at build time.

## Security posture

A static portfolio doesn't have much attack surface, which is exactly why it should get
the fundamentals right:

- Strict Content Security Policy with no inline scripts; everything Astro emits is
  bundled to external files.
- Security headers shipped via Cloudflare Pages' `_headers` file.
- No cookies, no trackers, no analytics, no third-party requests of any kind.
- System font stack only: no font CDN, no external stylesheets.

The full breakdown (headers, CSP directives, and the reasoning behind them) is on the
[architecture page](/architecture/).
