---
title: 'RowdyHacks XII: beam me in'
description: 'A 250-point pwn challenge against a vulnerable Erlang/OTP SSH daemon that allowed pre-authentication command execution, reading the flag through the provided challenge tunnel.'
event: 'RowdyHacks XII'
category: 'pwn'
points: 250
date: 2026-10-03
tags:
  - erlang-otp
  - ssh
  - cve-2025-32433
  - pre-auth-rce
draft: false
---

<!-- Authorized competition practice against organizer-provided infrastructure.
     The flag is behind a spoiler toggle. No reusable exploit chain is published. -->

## Challenge

PWN · 250 points. The organizers provided a tunnel exposing the challenge's SSH
service on `127.0.0.1:2222`. The goal was to read a flag file on the host.

## Identifying the bug

The SSH banner was the tell: `SSH-2.0-Erlang/5.1.4.7`. That identifies the
Erlang/OTP SSH application, which had a critical **pre-authentication remote
code execution** vulnerability, [CVE-2025-32433](https://nvd.nist.gov/vuln/detail/CVE-2025-32433).
(The flag itself is a nod to the CVE.) The flaw is a protocol state-machine
error: the server accepts connection-protocol messages, including a channel
`exec` request, *before* authentication completes. An `exec` request reaches
Erlang's `os:cmd/1`, so an unauthenticated client can run shell commands.

## Approach

Working only against the organizers' tunnel, I used the pre-auth `exec` path to
run two read-only commands (list the target directory, then read the flag file), writing output to a world-readable results path the challenge exposed:

```text
ls  /home/test/Documents            # -> flag.txt, operator_note.txt
cat /home/test/Documents/flag.txt   # -> the flag
```

The successful channel request returned SSH message type 99 (`CHANNEL_SUCCESS`),
confirming execution. I'm describing the method at a conceptual level rather
than publishing a weaponized chain.

## Takeaway

Service fingerprinting pays: an Erlang/OTP SSH banner plus a known pre-authentication RCE (CVE-2025-32433) is unauthenticated command execution from a single request. The defensive weight is real because the stakes are: patch the runtime, keep application SSH off untrusted networks, and detect the primitive, a channel `exec` before authentication completes, which no legitimate client sends.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{cV3_2o25-E243e}</code></pre>
</details>
