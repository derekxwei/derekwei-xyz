---
title: 'RowdyHacks XII: world is mine'
description: 'A 150-point web challenge: forum hints pointed at SQL injection in a login username field, and a classic comment-terminator payload authenticated as staff to expose the flag.'
event: 'RowdyHacks XII'
category: 'web'
points: 150
date: 2026-10-03
tags:
  - sqli
  - authentication-bypass
  - csrf-token
  - web
draft: false
---

<!-- Authorized competition practice against the organizer-hosted site.
     The flag is behind a spoiler toggle. -->

## Challenge

Web · 150 points. A live forum is provided, and the flag lives on a staff-only
page.

## Recon

The forum's own posts are the clue trail. An announcement names the staff
account `miku_mod`. A retired-login note gives an old password that "no longer
works." A community post mentions that a quote character in the staff username
produces a different error and that the database query "is being investigated."
Together these point squarely at **SQL injection in the username field** of the
login form.

## Solution

The site issues a CSRF token on `GET /login`, so the request has to be
session-aware: fetch the token first, then submit the injection. Supplying the
username `miku_mod'--` with any non-empty password behaves exactly as if the
quote closes the username string and `--` comments out the password check:

```text
username = miku_mod'--
password = anything
```

The server authenticates the session and redirects to `/staff`, whose event
handoff section displays the flag.

## Defensive takeaway

Authentication queries must use parameterized statements; string-concatenated
SQL in a login form is the highest-stakes place this bug can appear, because it
is an unauthenticated path to account takeover. Distinct error messages for
"bad quote" versus "bad password" also leak that the input reaches the query —
error responses should be uniform.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{v1rtu4a1_1d0l}</code></pre>
</details>
