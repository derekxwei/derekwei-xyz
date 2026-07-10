# Security checklist

The security posture of derekwei.xyz and how to keep it. This is a static, backend-less site, so the attack surface is small - but the point of a cybersecurity portfolio is to get the small things exactly right. Verify these after any change to `public/_headers`, `astro.config.mjs`, or the tool pages, and again after each production deploy.

## What the site does by design

- **No backend.** Nothing to inject into, no server to patch, no database. Every route is prerendered HTML.
- **No third-party requests.** No CDN, no Google Fonts, no analytics, no trackers. Every byte comes from the origin. This is enforced by the CSP, not just convention.
- **No cookies, no storage of user data.** The browser tools run entirely client-side and transmit nothing.
- **All scripts external and same-origin.** `assetsInlineLimit: 0` and `inlineStylesheets: 'never'` keep JS and CSS in fingerprinted external files so the CSP can forbid inline code.

## HTTP response headers

Defined in [`public/_headers`](../public/_headers), applied by Cloudflare Pages at the edge. Confirm each is present on the live site (they do **not** appear under `npm run preview`).

- [ ] **Strict-Transport-Security** - `max-age=31536000; includeSubDomains; preload`. HTTPS-only for a year; eligible for the [preload list](https://hstspreload.org/).
- [ ] **Content-Security-Policy** - `default-src 'none'` allowlist (see below).
- [ ] **X-Content-Type-Options** - `nosniff`.
- [ ] **X-Frame-Options** - `DENY` (legacy fallback for `frame-ancestors`).
- [ ] **Referrer-Policy** - `strict-origin-when-cross-origin`.
- [ ] **Permissions-Policy** - camera, microphone, geolocation, sensors, payment, USB all `()` (disabled).
- [ ] **Cross-Origin-Opener-Policy** - `same-origin`.
- [ ] **Cross-Origin-Resource-Policy** - `same-origin`.
- [ ] **Caching** - `/_astro/*` served `public, max-age=31536000, immutable`.

### The Content-Security-Policy

```
default-src 'none';
script-src 'self'; style-src 'self';
img-src 'self' data:; font-src 'self'; connect-src 'self';
frame-ancestors 'none'; base-uri 'none'; form-action 'self';
upgrade-insecure-requests
```

- [ ] `default-src 'none'` - everything denied unless explicitly granted.
- [ ] No `'unsafe-inline'`, no `'unsafe-eval'`, no wildcards, no remote hosts.
- [ ] `frame-ancestors 'none'` - cannot be framed (clickjacking defense).
- [ ] `connect-src 'self'` - the client-side tools cannot exfiltrate to any other origin even if a bug tried to.

The CSP is only as strong as the code that respects it. Enforce the coding rules in [MAINTENANCE.md → Keeping the CSP intact](MAINTENANCE.md#keeping-the-csp-intact): no `style=` attributes, no inline event handlers, no external resources.

## Per-release review

- [ ] `git diff` contains no secrets, tokens, private keys, `.env` values, or internal hostnames. (There should never be any - the site has no backend - but check.)
- [ ] No new third-party script, font, image host, or `fetch()` to an external origin sneaked in. If one is genuinely needed, extend the CSP with the **narrowest** possible addition and re-verify.
- [ ] The browser tools still transmit nothing - they must stay pure client-side computation. The [IOC parser](../src/pages/tools/ioc.astro), [hash generator](../src/pages/tools/hash.astro), and [password entropy estimator](../src/pages/tools/entropy.astro) handle the most sensitive input, so they in particular must never `fetch`, log, or otherwise send what the user types anywhere.
- [ ] `npm audit` reviewed. For a static site with no runtime server, most advisories affect only the build toolchain, but read them - don't blanket-ignore.
- [ ] Dependencies are pinned via `package-lock.json` (committed). Cloudflare builds from the lockfile.

## Content safety

- [ ] Writeups redact flags where competition rules require, and contain no real credentials or sensitive infrastructure detail (see [CONTENT_GUIDE.md](CONTENT_GUIDE.md)).
- [ ] No personal data beyond what's intended (email and city). No phone number, home address, or date of birth anywhere in the repo.

## Post-deploy verification

- [ ] [securityheaders.com](https://securityheaders.com/?q=derekwei.xyz) - grade A or A+.
- [ ] [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) - clean.
- [ ] Browser devtools console on the home page and a `/tools/` page - zero CSP violation errors.
- [ ] `https://derekwei.xyz` forces HTTPS; HTTP and `www` redirect to the canonical host.
- [ ] SSL/TLS mode in Cloudflare is **Full (strict)**.

## Dependency & supply-chain hygiene

- Update deliberately (see [MAINTENANCE.md](MAINTENANCE.md#dependency-updates)), and run `npm run check && npm run build` after every update.
- The three packages with install scripts (`esbuild`, `sharp`) are explicitly allow-listed in `package.json` - review that list if a dependency update adds new install scripts.
- Prefer removing an unused dependency over updating it.
