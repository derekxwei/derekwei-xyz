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

Reusing a (key, nonce) pair in CTR or GCM collapses the cipher to a two-time pad: one known plaintext XORs out the keystream and decrypts everything else under that pair. The messenger reset its counter to a constant on restart, which is exactly the mistake. Nonces must be unique for the life of a key, random or a counter persisted across restarts, and it is the kind of bug a crypto review or a linter catches before it ships.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{wh0_4dd3d_br0}</code></pre>
</details>
