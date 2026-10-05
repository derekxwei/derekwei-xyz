---
title: 'RowdyHacks XII: YOUR FIRST CTF!!!'
description: 'A 25-point workshop warm-up: reading a check-in page''s source to decode a Base64 flag from its JavaScript, past a decoy HTML comment.'
event: 'RowdyHacks XII'
category: 'misc'
points: 25
date: 2026-10-03
tags:
  - web
  - source-review
  - base64
  - beginner
draft: false
---

<!-- Authorized competition practice. Flags are behind a spoiler toggle. -->

## Challenge

Workshop · 25 points. The beginner workshop paired an in-person CTFd challenge
with a small check-in website that asks what else its page loaded.

## Approach

Viewing the page source shows the check-in page pulls in `check-in.js`. An HTML
comment holds `rowdy{not_the_real_flag}`, a deliberate decoy to catch anyone
who stops at "view source." The real website flag is in the script, wrapped in
an `atob(...)` Base64 string:

```sh
# extract the atob("...") argument from check-in.js and decode it
python3 -c "import base64; print(base64.b64decode('<string>').decode())"
```

## Note on the two flags

This challenge has two distinct answers. The **in-person CTFd flag** was given
during the workshop and is what scores the 25 points. The **website flag**
above is a separate artifact recovered from the JavaScript and is valid only on
that site. Submitting it to CTFd returns incorrect. Keeping the two straight
was the real lesson of the warm-up.

## Defensive takeaway

Anything shipped to the browser (comments, JavaScript strings, Base64 blobs) is readable by the client. Base64 is encoding, not encryption, and a decoy in
the markup does not protect a secret sitting one function call away.

## Flags

<details>
<summary><strong>Spoiler: show the flags</strong></summary>
<pre><code>CTFd (scored):  rowdy{welcome_to_your_first_ctf!}
Website (JS):   rowdy{youFoundMe}</code></pre>
</details>
