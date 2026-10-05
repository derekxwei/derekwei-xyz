---
title: 'RowdyHacks XII: Case Files'
description: 'A 250-point web challenge and textbook IDOR: a skipped case ID exposed a classified case and its restricted evidence through predictable, unauthorized API paths.'
event: 'RowdyHacks XII'
category: 'web'
points: 250
date: 2026-10-04
tags:
  - idor
  - bola
  - broken-access-control
  - api
draft: false
---

<!-- Authorized competition practice against the organizer-hosted portal.
     The flag is behind a spoiler toggle. -->

## Challenge

Web · 250 points. The challenge provides an analyst login to a case-management
portal; the flag belongs to a case the analyst is not assigned.

## Enumeration

After logging in, the case page shows the analyst's assigned case RH-1042 and
recent IDs **1039, 1040, 1042, 1044**. The page's JavaScript calls
`/api/cases/<id>` and also defines `/api/evidence/<id>`. The gap in the
sequence (**1043**) is the obvious thing to probe:

```text
/api/cases/1041  -> 404
/api/cases/1043  -> CLASSIFIED, owner RH_ADMIN, evidence_id 7712
```

## Solution

Case 1043 belongs to another user and is marked classified, but the API returns
it anyway. Following its `evidence_id` to `/api/evidence/7712` returns the
restricted evidence, containing the flag. The portal authenticated the user but
never checked that the user was *allowed to see this specific object*.

## Defensive takeaway

This is Insecure Direct Object Reference / Broken Object-Level Authorization,
consistently at the top of the OWASP API risks. Authentication is not
authorization: every object fetch must verify the requester owns or is permitted
that record, server-side, on every endpoint. Sequential, guessable IDs make the
flaw trivial to enumerate; object-level checks are the fix, not unguessable IDs.

## Flag

<details>
<summary><strong>Spoiler: show the flag</strong></summary>
<pre><code>rowdy{f0rg0tt3n_c4s3}</code></pre>
</details>
