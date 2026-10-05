---
title: 'RowdyHacks XII: Buffer Overrun'
description: 'A 300-point pwn challenge: a textbook ret2win stack overflow in a 32-bit binary with no canary and no PIE, returning into a win() that spawns a root shell.'
event: 'RowdyHacks XII'
category: 'pwn'
points: 300
date: 2026-10-03
tags:
  - buffer-overflow
  - ret2win
  - stack
  - memory-safety
draft: false
---

<!-- Authorized competition practice against the organizer-provided binary in its
     isolated environment. The flag is behind a spoiler toggle. -->

## Challenge

PWN · 300 points. A 32-bit ELF reads up to 200 bytes into a stack buffer and has
a `win()` function at `0x080491b6` that sets UID/GID to 0 and launches
`/bin/sh`. The binary has **no stack canary** and is **not position
independent**, so `win`'s address is fixed and a plain return is enough, no
shellcode or ROP chain required.

## Finding the offset

In `read_it`, the destination passed to `read` is `ebp-0x28`, and the saved
return address is at `ebp+4`. The distance is `0x28 + 4 = 44` bytes. So 44 bytes
of filler reach the saved return address, and the next four bytes overwrite it:

```python
payload = b"A" * 44 + struct.pack("<I", 0x080491b6)   # return into win()
```

Delivered to the original `/opt/challenge/vuln` in the challenge's isolated SSH
environment, this returns into `win()`, which hands back a root shell; reading
`/root/flag.txt` prints the flag.

## Defensive takeaway

This is the canonical reason modern toolchains exist: a bounds-checked read
(`fgets` with a size, not an over-long `read` into a small buffer) prevents the
overflow outright, and the standard mitigations each break this exact path: **stack canaries** detect the overwrite, **PIE + ASLR** hide `win`'s address, and
**NX** stops code-on-stack variants. Ship with `-fstack-protector-strong`, PIE,
and RELRO, and never size a read by the attacker's input.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>flag{stack_smashing_detected}</code></pre>
</details>
