---
title: 'RowdyHacks XII: read receipts'
description: 'A 200-point crypto challenge exploiting AES-CTR keystream reuse: a messenger reset its counter on restart, so one known plaintext recovered the keystream and decrypted another message.'
event: 'RowdyHacks XII'
category: 'crypto'
points: 200
date: 2026-10-03
tags:
  - aes-ctr
  - nonce-reuse
  - keystream
  - known-plaintext
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Cryptography · 200 points. The archive contains `encrypt.py`, a `chat.txt`
transcript, and two encrypted message attachments.

## The flaw

`encrypt.py` uses AES in CTR mode. The bug is in how the counter is managed:
the messenger **resets its counter to 3917 on every restart** while keeping the
same key. Both attachments were therefore encrypted under the same
`(key, nonce)` pair, counter block `00000000000000000000000000000f4d`.

CTR mode is a stream cipher: ciphertext is plaintext XOR a keystream derived
from the key and counter. Reuse that pair and you reuse the keystream, which
collapses the security entirely.

## Solution

`chat.txt` quotes the full 216-byte supply list, which is the plaintext of one
attachment. XOR the known plaintext against that attachment's ciphertext to
recover the keystream, then XOR the keystream against the second attachment:

```text
keystream   = ciphertext_supply XOR plaintext_supply
plaintext_2 = ciphertext_plan   XOR keystream
```

That reveals the second message, the vault plan, and the flag. The attack
never recovers the AES key; one known plaintext under a reused nonce is enough
to read the overlapping bytes of the other message.

## Takeaway

A `(key, nonce)` pair must never repeat in CTR (or GCM). Nonces should be random
or a strictly monotonic counter persisted across restarts, never reset to a
constant. This is the same class of bug as the classic two-time pad.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{wh0_4dd3d_br0}</code></pre>
</details>
