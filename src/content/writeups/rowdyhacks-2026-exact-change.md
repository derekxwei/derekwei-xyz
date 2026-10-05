---
title: 'RowdyHacks XII: exact change'
description: 'A 250-point reversing challenge: reconstructing a JAR''s hidden service command by reproducing its coin-reconciliation algorithm to derive the service code.'
event: 'RowdyHacks XII'
category: 'rev'
points: 250
date: 2026-10-04
tags:
  - reverse-engineering
  - java
  - bytecode
  - algorithm-recovery
draft: false
---

<!-- Authorized competition practice. The flag is behind a spoiler toggle. -->

## Challenge

Reversing · 250 points. The ZIP contains a Java JAR (a vending/coin service) and
a five-sale shift slip. Running the documented `status` command confirms five
reconciled sales and one penny left over.

## Finding the hidden command

Bytecode inspection (`javap` / a decompiler) reveals an **undocumented**
`service <slip> <code>` command gated behind a computed code. The code is derived
by replaying the business logic:

1. Reconcile each sale in order.
2. For each, make exact change with the **fewest coins** available, favoring
   larger denominations on ties.
3. Subtract those coins from the tubes.
4. Mix the sale details and dispensed coin counts into a rolling 16-bit state,
   emitting **two base-36 characters per sale**.

Reproducing that over the slip yields the service code `3O2WCO5E3W`, and the
remaining tubes `[0, 0, 0, 1]` match the JAR's own `status` output, a good
cross-check that the reimplementation is faithful before trusting the code.

## Solution

```sh
java -jar exact-change.jar service shift-v39.txt 3O2WCO5E3W
```

The service command prints the flag.

## Takeaway

Hidden commands and "secret" codes computed inside shipped bytecode are not
security, Java bytecode decompiles cleanly, and any deterministic algorithm can
be re-derived and replayed. Secrets and privileged operations have to live
server-side behind real authorization, not behind obscurity in a client artifact.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{c0ins_d0nt_f0ll0w_gr33dy}</code></pre>
</details>
