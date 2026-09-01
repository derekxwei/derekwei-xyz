---
title: 'Browser-based cybersecurity tool hub'
description: 'A set of client-side security utilities for encoding, hashing, password entropy, IOC parsing, subnetting, and header checks. Runs entirely in the browser.'
status: shipped
date: 2026-07-08
tags: [tools, client-side, web]
repo: 'https://github.com/derekxwei/derekwei-xyz'
featured: false
link: https://derekwei.xyz/tools/
---

The [tools](/tools/) section of this site: a collection of small security utilities that
run entirely in the browser. They are handy for CTF practice, quick analysis, and learning
how the underlying transforms work.

## What is included

Encoding and conversion (Base64, URL, hex, ROT13), crypto and hashing (SHA digest
generator, hash identifier, password entropy estimator), analysis (indicators-of-compromise
parser and defanger, regex tester, security-headers checklist), and networking (IPv4 subnet
calculator).

## Design

- **Runs in the browser.** All processing is client-side JavaScript. There is no backend
  and no storage; nothing you type is sent anywhere. The site's Content Security Policy
  (`connect-src 'self'`) enforces that at the browser level.
- **Verified end to end.** The tools were exercised in a real browser against known test
  vectors, not just type-checked.
- **Honest scope.** These are learning and quick-analysis utilities, not a replacement for
  professional security tooling.

## Status

Live and part of this site. New utilities get added as I find myself wanting them during
CTF and lab work.
