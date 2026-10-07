---
title: 'RowdyHacks XII: Locked File'
description: 'A 250-point crypto challenge solved by GPU-cracking an AES-encrypted 7-Zip. Documents the known approach; the password and flag were not preserved.'
event: 'RowdyHacks XII'
category: 'crypto'
points: 250
date: 2026-10-03
tags:
  - password-cracking
  - hashcat
  - 7-zip
  - rule-based-attack
draft: false
---

<!-- Authorized competition practice. This is the one RowdyHacks challenge whose
     final reproduction we did not preserve; it is documented honestly as such. -->

> **Status: incomplete by design.** Our team (Team Difference) was credited with
> this solve: a teammate cracked it on a GPU machine and submitted the flag.
> That machine's terminal history was cleared afterward, so the exact password,
> the exact Hashcat command, and the flag string were not saved. Everything
> below is the known, verified approach up to the cracking step. Nothing here is
> guessed, and no flag is claimed. This is the only RowdyHacks XII writeup
> without a reproducible final answer.

## Challenge

Cryptography · 250 points. The download contains `words.txt`, `rules.txt`, and
`KeepOut!.7z`. The 7-Zip archive is AES-encrypted with a high key-derivation
iteration count (2^19) and holds an encrypted `flag.jpeg` and `success.gif`.

## Known approach

`rules.txt` describes exactly how the password was constructed: take a base word,
capitalize its first letter, replace one letter with a leetspeak substitution,
then append one digit and one symbol. That is a textbook setup for a
**rule-based dictionary attack** rather than brute force.

The standard workflow for this is:

1. Extract the archive's hash in Hashcat's 7-Zip format (mode **11600**), e.g.
   with the `7z2hashcat` tool.
2. Build a wordlist from `words.txt` (plus common lists), and express the
   `rules.txt` transformation as Hashcat rules: capitalization, a leet
   substitution, and a digit+symbol suffix.
3. Run the attack on a GPU, which is what makes the 2^19-iteration KDF tractable
   in contest time.
4. Verify any candidate with `7z t` against the original archive, then open
   `flag.jpeg` to read the flag.

## What we have, and what we don't

Our local (GPU-less) attempts ran large negative passes (the full supplied-dictionary leet space ending in a digit-plus-symbol, plus several RockYou-based passes) without a hit, which is consistent with the real password
needing GPU throughput. The teammate's GPU run found it; the integrity-checked
portable attack package (archive, mode-11600 hash, candidate stems and suffixes)
was prepared, but the successful command and the recovered password/flag were
lost when the terminal was cleared.

I will update this page with the exact command and flag if the teammate can
recover them. Until then, no flag is recorded here.

## Takeaway

The weak link is never AES, it is the password policy. A human-memorable pattern (capitalize, one leet swap, then a digit and a symbol) collapses the keyspace enough that a rule-based GPU attack is practical even against a 2^19-iteration KDF. Length and randomness are the fix, because a slow KDF only buys time in proportion to how unpredictable the secret is.

## Flag

Not available. See the status note above.
