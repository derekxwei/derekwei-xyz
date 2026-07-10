# Deployment guide

derekwei.xyz is a static Astro site deployed on **Cloudflare Pages**, built from the `main` branch of the GitHub repository. This guide is the end-to-end procedure; the [README](../README.md) has the condensed version.

## Overview

```
git push (main)  ─▶  GitHub  ─▶  Cloudflare Pages build  ─▶  global edge  ─▶  visitors (HTTPS)
                                 npm run build → dist/
```

There is no server to run or patch. A push to `main` deploys production; a pull request gets its own preview URL.

## One-time setup

### 1. Push the repository to GitHub

The repo lives at `https://github.com/B1ueBurD/derekwei-xyz`. If you are starting fresh:

```sh
git init -b main
git remote add origin https://github.com/B1ueBurD/derekwei-xyz.git
git add -A
git commit -m "Initial commit"
git push -u origin main
```

### 2. Create the Cloudflare Pages project

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize Cloudflare to access the repository and select `derekwei-xyz`.
3. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** Astro (fills in the two fields below), or set them manually:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Node version:** Cloudflare reads **Node 24** from [`.nvmrc`](../.nvmrc) automatically. If a build fails with a Node/engine error, set an environment variable `NODE_VERSION=24` in the Pages project (add it to **both** Production and Preview).
5. Save and deploy. The first build takes a minute or two.

### 3. Custom domain and DNS

1. In the Pages project: **Custom domains → Set up a custom domain** → add `derekwei.xyz`. Optionally add `www.derekwei.xyz`.
2. **If the domain's DNS is already on Cloudflare (recommended):** the required records are created automatically. Nothing else to do.
3. **If DNS is elsewhere:** create these records at your DNS provider:
   - `CNAME  derekwei.xyz  →  <project>.pages.dev`
     The apex/root domain requires **CNAME flattening**, which not all providers support. If yours doesn't, move the domain's nameservers to Cloudflare - it removes this whole problem.
   - `CNAME  www  →  <project>.pages.dev`
4. **Canonical host:** pick one host and redirect the other. A Cloudflare **Redirect Rule** sending `www.derekwei.xyz/*` → `https://derekwei.xyz/$1` (301) keeps `derekwei.xyz` canonical and avoids duplicate-content ambiguity. (The site's `<link rel="canonical">` tags already point at the apex via `site:` in `astro.config.mjs`.)
5. **SSL/TLS mode:** set to **Full (strict)** in the Cloudflare SSL/TLS settings.

## Routine deploys

After setup, deploying is just:

```sh
npm run check && npm run build   # verify locally first
git add -A
git commit -m "Describe the change"
git push
```

- Push to `main` → **production** deploy at `https://derekwei.xyz`.
- Open a pull request → **preview** deploy at `https://<hash>.<project>.pages.dev`, safe for review without touching production.

Run the [pre-deploy checklist](MAINTENANCE.md#pre-deploy-checklist) before every push.

## Verifying a deploy

Once the build is green and the DNS has propagated:

1. Load `https://derekwei.xyz` and click through the nav.
2. Confirm HTTPS and the redirect from `www` (if configured).
3. Check the security headers - they only exist on the deployed edge, not in `npm run preview`:
   - [securityheaders.com](https://securityheaders.com/?q=derekwei.xyz) should report an A/A+.
   - [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory) for a second opinion.
4. Fetch `https://derekwei.xyz/sitemap-index.xml` and `https://derekwei.xyz/robots.txt` - both should return 200.
5. Open the browser devtools console on a couple of pages (including a `/tools/` page) - no CSP violation errors.

## Rollback

Cloudflare Pages keeps every deployment. To revert:

1. Pages project → **Deployments**.
2. Find the last known-good deployment.
3. **⋯ → Rollback to this deployment** (or **Retry deployment**).

This is instant and does not require a git change. Once production is stable again, fix the problem in git and push a proper deploy. For a git-side revert instead, `git revert <bad-commit>` and push - Cloudflare rebuilds from the reverted tree.

## Search Console (optional but recommended)

After the domain is live, submit the sitemap to [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters) so writeups and projects get indexed. See [SEO_CHECKLIST.md](SEO_CHECKLIST.md).
