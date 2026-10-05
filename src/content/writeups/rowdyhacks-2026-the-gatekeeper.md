---
title: 'RowdyHacks XII: The Gatekeeper'
description: 'A 200-point reversing challenge: inverting a per-byte transform in a stripped x86-64 ELF to reconstruct the 24-byte passphrase it accepts.'
event: 'RowdyHacks XII'
category: 'rev'
points: 200
date: 2026-10-03
tags:
  - reverse-engineering
  - elf
  - static-analysis
  - disassembly
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Reversing · 200 points. A stripped x86-64 ELF prompts for a 24-byte passphrase
and grants or denies access.

## Static analysis

Disassembly around `0x40125d` shows the check runs per byte. For each index
`i`, the program computes:

```text
((input[i] + 3*i) ^ 0x5a) & 0xff
```

and compares it to a 24-byte table at virtual address `0x402010` (file offset
`0x2010` in this mapping). Because every operation is invertible and position
is the only state, the passphrase can be solved one byte at a time:

```text
input[i] = ((table[i] ^ 0x5a) - 3*i) & 0xff
```

## Solution

Inverting the transform over the 24 table bytes reconstructs the passphrase,
which the binary then accepts with `access granted. nice key.`

A `strings` dump also shows `flag{left_over_from_v0_9}`, a decoy left over from
an earlier build. The reliable path is the byte comparison, not the loose
string, which is a good reminder to verify where a candidate actually comes
from before trusting it.

## Takeaway

A secret checked entirely inside a client binary is a secret you have already
shipped: any invertible transform can be run backwards. Real authentication
has to happen server-side against a value the user never receives; local checks
only raise the effort, they do not protect anything.

## Flag

<details>
<summary><strong>Spoiler: show the accepted passphrase / flag</strong></summary>
<pre><code>flag{it_compiles_though}</code></pre>
</details>
