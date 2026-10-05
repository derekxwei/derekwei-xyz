---
title: 'RowdyHacks XII: A Small Toolkit'
description: 'A 250-point crypto challenge: a Vigenère letter revealed a key, a four-digit PIN fell to a tiny hash search, and its SHA-256 digest XOR-decrypted the flag.'
event: 'RowdyHacks XII'
category: 'crypto'
points: 250
date: 2026-10-04
tags:
  - vigenere
  - known-plaintext
  - brute-force
  - xor
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Cryptography · 250 points. The archive has three files meant to be read in
order: `01_letter.txt`, `02_lock.txt`, and `03_locked.bin`.

## Step 1 — Vigenère (known plaintext)

The uppercase line in `01_letter.txt` is Vigenère ciphertext. Its opening is the
pangram `THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.`; subtracting that known
plaintext from the ciphertext reveals the repeating key **`SECRETKEY`**. The
letter then points to the lock file.

## Step 2 — the PIN (tiny keyspace)

`02_lock.txt` gives a SHA-256 hash of a four-digit PIN with no zero. That is only
`9^4 = 6561` candidates — enumerate them and match the hash to find **`7391`**.

## Step 3 — XOR with the digest

As the lock instructions specify, XOR each byte of `03_locked.bin` with the
corresponding byte of the raw SHA-256 digest of ASCII `7391`, repeating the
digest as a keystream. That produces the flag. The three steps are independent
and each one hands the next its input.

## Defensive takeaway

The challenge name is the point: XOR with a short, derivable key is not
encryption. Two of the three "locks" collapse because their keyspace is tiny — a
4-digit PIN is searchable instantly, and a known-plaintext crib breaks a repeating
Vigenère key. Real confidentiality needs a proper cipher with a high-entropy key,
not an invertible transform keyed by something guessable.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>flag{xor_is_not_encryption}</code></pre>
</details>
