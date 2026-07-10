# Maintenance guide

How to keep derekwei.xyz current, healthy, and CSP-clean. Setup basics are in the [README](../README.md); deployment specifics are in [DEPLOYMENT.md](DEPLOYMENT.md).

## Regular content upkeep

- **`/now/`** — refresh every month or two. A stale "now" page is worse than none; update what you are currently studying, building, and competing in, and bump the last-updated date in `src/pages/now.astro`.
- **Writeups** — publish shortly after each CTF or competition while the details are fresh. Copy `src/content/writeups/_template.md`, keep `draft: true` while writing, flip to `draft: false` when done. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md).
- **Projects** — keep `status` honest. Move entries from `in-progress` to `shipped` only when they are real and usable; set `updated` when a project meaningfully changes.
- **Resume facts** — certifications, competitions, and education live in `src/consts.ts`. Update them there once; every page that references them picks up the change.

## Dependency updates

```sh
npm outdated              # see what has newer versions
npm update                # applies patch/minor updates within package.json ranges
npx @astrojs/upgrade      # guided upgrade for Astro majors + official integrations
```

- Patch/minor updates (`npm update`) are usually safe; Astro **major** versions can change APIs (content layer, config), so use `npx @astrojs/upgrade` and read the migration notes it prints.
- After any update, always run both before pushing:

```sh
npm run check && npm run build
```

If either fails, fix locally before pushing — a failed Cloudflare build leaves production on the previous deploy, but broken pushes pile up fast.

## Pre-deploy checklist

Before pushing to `main`:

1. `npm run check` — no type or diagnostic errors.
2. `npm run build` — builds clean, no content schema errors.
3. `npm run preview` — open the built site locally.
4. Click through every nav item (Home, Resume, Projects, Writeups, Lab Notes, Tools, Architecture, Now, Contact) — no 404s, no obviously broken layout.
5. Exercise the tools under `/tools/` with real input — they are client-side scripts and the most likely thing a bad change silently breaks (see the CSP section below). There are eleven: base64, url, hex, rot13, hash, hash-id, entropy, ioc, regex, headers, subnet.
6. After the deploy goes live, spot-check the production URL once — edge headers and CSP behavior only exist there, not in preview.

A fuller, categorized version of this list is in [SECURITY_CHECKLIST.md](SECURITY_CHECKLIST.md), [SEO_CHECKLIST.md](SEO_CHECKLIST.md), and [ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md).

## Keeping the CSP intact

Production serves `Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; ...` from `public/_headers`. These rules must hold in every page and component:

- **No `style="..."` attributes.** Tailwind/utility classes or `<style>` blocks in `.astro` files only (Astro extracts those to external CSS; `inlineStylesheets: 'never'` in `astro.config.mjs` keeps it that way — do not change that setting).
- **No inline event handlers** (`onclick=`, `oninput=`, etc.). Use `<script>` blocks at the end of the `.astro` file with `addEventListener` — Astro bundles them into external files, which `script-src 'self'` allows. `assetsInlineLimit: 0` in `astro.config.mjs` also forces scripts to stay external rather than being inlined into the HTML.
- **No external resources**: no CDN scripts, no Google Fonts, no remote images or embeds. Everything ships from this origin (system font stack, local assets).
- **JSON-LD is fine.** The one inline `<script type="application/ld+json">` on the home page is data, not executable code — CSP's `script-src` does not govern it.

**What breaks if violated:** nothing fails in `npm run dev` or `npm run preview` (no CSP there), but in production the browser silently refuses to apply the inline style or execute the inline/external script. The symptom is "works locally, dead in prod" — an unstyled element or a tool that does nothing, with the only evidence being CSP violation errors in the browser devtools console.

**Extending the CSP deliberately:** if a real need arises (for example, loading images from a CDN), edit the policy in `public/_headers` with the narrowest possible addition — e.g. append the specific host to `img-src`:

```
Content-Security-Policy: ...; img-src 'self' data: https://images.example-cdn.com; ...
```

Never reach for `'unsafe-inline'` or a wildcard. After any header change, redeploy and re-verify at [securityheaders.com](https://securityheaders.com/?q=derekwei.xyz) plus a manual check of the devtools console on the affected pages.

## Adding a new page

1. Create `src/pages/<name>.astro` (the filename is the route: `src/pages/uses.astro` → `/uses/`).
2. Use the standard skeleton — `BaseLayout` for the shell and metadata, `PageHeader` for the single `<h1>`:

   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import PageHeader from '../components/PageHeader.astro';
   ---
   <BaseLayout title="Uses" description="Unique 140-160 character description for search results.">
     <PageHeader kicker="~/uses" title="Uses" lede="Short intro line." />
     <section class="py-10">
       <!-- content -->
     </section>
   </BaseLayout>
   ```

3. Add the page to `NAV` in `src/consts.ts` (use the trailing-slash href form, e.g. `/uses/`) so it appears in the header and footer navigation.
4. The sitemap picks it up automatically on the next build.

## Adding a new browser tool

1. Create `src/pages/tools/<tool>.astro` following the pattern of the existing tools (kicker `~/tools/<tool>`, a lede, the UI in a `panel`, all logic in a `<script>` block at the end using `addEventListener` and null-checked `getElementById`).
2. Keep it **fully client-side** — no `fetch` to third parties (the CSP's `connect-src 'self'` forbids it), no external libraries.
3. Add an entry to the `tools` array in `src/pages/tools/index.astro` with the right `group`.
4. Verify it in a real browser (not just `npm run check`) — type-checking does not catch runtime logic errors. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Troubleshooting

Common failures and their fixes have their own guide: [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
