# derekwei.xyz

Personal cybersecurity portfolio of Derek Wei - [derekwei.xyz](https://derekwei.xyz).

Built with **Astro 5**, **TypeScript** (strict), **Tailwind CSS 4**, and **MDX**, deployed as a fully static site on **Cloudflare Pages**. No client-side framework, no external resources, and a strict Content-Security-Policy served at the edge.

## Quickstart

Requires **Node 24** (pinned in [`.nvmrc`](.nvmrc)). If you use nvm / fnm / volta, the version is picked up automatically:

```sh
nvm use        # reads .nvmrc
npm install
```

| Command           | What it does                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server at `http://localhost:4321` with hot reload. Draft content is visible here.        |
| `npm run build`   | Type-check-free production build to `dist/`. Drafts and `_`-prefixed files are excluded.               |
| `npm run preview` | Serve the built `dist/` locally to sanity-check the production output. (Edge headers do not apply - see [Security headers](#security-headers).) |
| `npm run check`   | Run `astro check` - TypeScript and Astro diagnostics across pages, components, and content. Run this before every push. |

`npm test` is an alias for `npm run check`.

## Project structure

```
.
├── astro.config.mjs        # site URL, MDX + sitemap integrations, Tailwind (Vite plugin),
│                           #   inlineStylesheets: 'never' (keeps CSS external for the CSP)
├── .nvmrc                  # Node 24 - also read by Cloudflare Pages builds
├── public/                 # copied to dist/ verbatim (not processed by Astro)
│   ├── _headers            # Cloudflare Pages edge security headers (HSTS, CSP, caching)
│   ├── robots.txt          # allows all crawlers, points at the sitemap
│   └── favicon.svg
└── src/
    ├── consts.ts           # single source of truth: SITE, NAV, CERTIFICATIONS,
    │                       #   COMPETITIONS, EDUCATION - pages import these, never hard-code
    ├── content.config.ts   # content collection definitions + zod frontmatter schemas
    ├── content/
    │   ├── projects/       # project entries (.md/.mdx); _template.md to copy
    │   ├── writeups/       # CTF writeups; _template.md to copy
    │   └── lab-notes/      # homelab / experiment notes; _template.md to copy
    ├── layouts/
    │   └── BaseLayout.astro  # <html> shell: head/meta/OG tags, header, footer
    ├── components/         # Header, Footer, PageHeader, Card, Badge, Prose
    ├── pages/              # file-based routing - each .astro file is a route
    └── styles/
        └── global.css      # Tailwind 4 theme tokens + shared component classes
```

## Editing content

All long-form content lives in the three collections under `src/content/`. Each collection folder contains a `_template.md` with full frontmatter and inline guidance.

To add an entry:

1. Copy the `_template.md` in the collection folder.
2. Rename it - the **filename becomes the URL slug** (e.g. `src/content/writeups/byuctf-2026-example.md` → `/writeups/byuctf-2026-example/`). Use lowercase and hyphens.
3. Fill in the frontmatter (schemas below, enforced by `src/content.config.ts` - the build fails on invalid frontmatter).
4. Write the body in Markdown or MDX.

### Draft and template semantics

- `draft: true` - the entry renders in `npm run dev` but is **excluded from production builds**. Use it for work in progress; flip to `draft: false` (or delete the line) to publish.
- Files starting with `_` (like `_template.md`) are **ignored entirely**, in dev and in production - they are excluded by the collection glob pattern, not by the draft flag.

### `projects` frontmatter

| Field         | Type / values                                | Required | Notes                                             |
| ------------- | -------------------------------------------- | -------- | ------------------------------------------------- |
| `title`       | string                                       | yes      |                                                   |
| `description` | string                                       | yes      | One or two sentences; shown on cards and in meta. |
| `status`      | `shipped` \| `in-progress` \| `planned`      | yes      | Unfinished work stays `in-progress`.              |
| `date`        | date (`YYYY-MM-DD`)                          | yes      | Used for sorting (newest first).                  |
| `updated`     | date                                         | no       | Set when a project meaningfully changes.          |
| `tags`        | string array                                 | no       | Defaults to `[]`.                                 |
| `repo`        | URL                                          | no       | Link to source.                                   |
| `link`        | URL                                          | no       | Link to a live deployment/demo.                   |
| `featured`    | boolean                                      | no       | Defaults to `false`.                              |
| `draft`       | boolean                                      | no       | Defaults to `false`.                              |

### `writeups` frontmatter

| Field         | Type / values                                                                | Required | Notes                          |
| ------------- | ---------------------------------------------------------------------------- | -------- | ------------------------------ |
| `title`       | string                                                                        | yes      | Usually the challenge name.    |
| `description` | string                                                                        | yes      |                                |
| `event`       | string                                                                        | yes      | e.g. `BYU CTF`, `RowdyCon`.    |
| `category`    | `web` \| `crypto` \| `forensics` \| `pwn` \| `rev` \| `osint` \| `network` \| `misc` | yes |                          |
| `difficulty`  | `easy` \| `medium` \| `hard` \| `insane`                                      | no       |                                |
| `date`        | date                                                                          | yes      |                                |
| `tags`        | string array                                                                  | no       | Defaults to `[]`.              |
| `draft`       | boolean                                                                       | no       | Defaults to `false`.           |

### `lab-notes` frontmatter

| Field         | Type / values | Required | Notes                                    |
| ------------- | ------------- | -------- | ---------------------------------------- |
| `title`       | string        | yes      |                                          |
| `description` | string        | yes      |                                          |
| `date`        | date          | yes      |                                          |
| `updated`     | date          | no       | Set when a note is revisited.            |
| `tags`        | string array  | no       | Defaults to `[]`.                        |
| `draft`       | boolean       | no       | Defaults to `false`.                     |

## Deploying to Cloudflare Pages

1. Push the repository to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, then select the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Framework preset "Astro" fills these in automatically if offered.
4. Node version: Cloudflare picks up **Node 24** from `.nvmrc` automatically. If it does not, set the environment variable `NODE_VERSION=24` in the Pages project settings (Production and Preview).
5. Save and deploy. From then on:
   - Every push to `main` triggers a production deploy.
   - Every pull request gets its own preview URL (`<hash>.<project>.pages.dev`).

## Custom domain and DNS

1. In the Pages project: **Custom domains → Set up a custom domain** → add `derekwei.xyz` (and optionally `www.derekwei.xyz`).
2. If the domain's DNS is already on Cloudflare (recommended), the required records are created automatically - nothing else to do.
3. If DNS is elsewhere, create:
   - `CNAME derekwei.xyz → <project>.pages.dev` - note the apex requires CNAME flattening, which many DNS providers do not support; moving DNS to Cloudflare avoids this entirely.
   - `CNAME www → <project>.pages.dev`
4. Recommended: a Redirect Rule sending `www.derekwei.xyz/*` → `https://derekwei.xyz/$1` (301) so there is a single canonical host.
5. Set SSL/TLS mode to **Full (strict)** in the Cloudflare SSL/TLS settings.

## Security headers

Response headers are defined in [`public/_headers`](public/_headers) and applied by Cloudflare Pages **at the edge** on every response:

- **Strict-Transport-Security** - one year, `includeSubDomains`, `preload`.
- **Content-Security-Policy** - strict allowlist: `default-src 'none'`, with `script-src 'self'` and `style-src 'self'` only. No inline scripts, no inline styles, no external origins of any kind. `img-src 'self' data:`, `frame-ancestors 'none'`, `base-uri 'none'`, `form-action 'self'`, `upgrade-insecure-requests`. (`astro.config.mjs` sets `inlineStylesheets: 'never'` specifically so Astro's CSS stays in external files and satisfies this policy.)
- **X-Content-Type-Options:** `nosniff`.
- **X-Frame-Options:** `DENY` (belt-and-suspenders alongside `frame-ancestors 'none'`).
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **Permissions-Policy** - camera, microphone, geolocation, sensors, payment, and USB all disabled.
- **Cross-Origin-Opener-Policy / Cross-Origin-Resource-Policy:** `same-origin`.
- **Caching:** `/_astro/*` build assets are fingerprinted, so they are served `public, max-age=31536000, immutable`.

These headers are a Cloudflare Pages feature - they **do not apply** under `npm run preview` (or `npm run dev`), so header-dependent behavior can only be fully verified on a deployed URL. After deploying, verify at [securityheaders.com](https://securityheaders.com/?q=derekwei.xyz).

See [docs/MAINTENANCE.md](docs/MAINTENANCE.md#keeping-the-csp-intact) for the coding rules that keep the site CSP-clean, and [docs/SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md) for the full hardening checklist.

## robots.txt and sitemap

- [`public/robots.txt`](public/robots.txt) allows all crawlers and points at `https://derekwei.xyz/sitemap-index.xml`.
- The sitemap is generated at build time by `@astrojs/sitemap` (configured in `astro.config.mjs` with `site: 'https://derekwei.xyz'`). No manual upkeep needed - new pages and published content entries are included automatically on the next build.

## Documentation

Detailed guides live in [`docs/`](docs/):

| Doc | What it covers |
| --- | --- |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Cloudflare Pages setup, DNS, custom domain, and rollback. |
| [MAINTENANCE.md](docs/MAINTENANCE.md) | Routine upkeep, dependency updates, pre-deploy checklist. |
| [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | How to write projects, writeups, and lab notes. |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common build/deploy/runtime failures and fixes. |
| [SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md) | Headers, CSP, and per-release security review. |
| [SEO_CHECKLIST.md](docs/SEO_CHECKLIST.md) | Metadata, sitemap, and search-visibility checks. |
| [ACCESSIBILITY_CHECKLIST.md](docs/ACCESSIBILITY_CHECKLIST.md) | WCAG-aligned review steps. |
| [ROADMAP_90_DAYS.md](docs/ROADMAP_90_DAYS.md) | A suggested 90-day plan for building the site's content. |
| [CLAUDE_PROMPTS_ARCHIVE.md](docs/CLAUDE_PROMPTS_ARCHIVE.md) | Reusable prompts for extending the site with an AI assistant. |
