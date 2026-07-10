# Troubleshooting

Common failures building, deploying, and running derekwei.xyz, with the fastest path to a fix. Ordered roughly by where you'll hit them: local build → deploy → runtime.

## `node` / `npm` not found

The machine may not have Node on the PATH, or a shell opened before install has a stale PATH.

- Install **Node 24** (matches [`.nvmrc`](../.nvmrc)). On Windows: `winget install OpenJS.NodeJS.LTS`. With a version manager: `nvm install 24 && nvm use`.
- If Node is installed but the current shell can't see it, open a **new** terminal (PATH is set at shell start), or on Windows refresh it in-session:
  ```powershell
  $env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
  ```

## `npm install` warns about install scripts (esbuild / sharp)

Expected. `esbuild` and `sharp` need their platform binaries, and they're allow-listed in `package.json` under `allowScripts`. If they were skipped and a build later fails with a missing-binary error:

```sh
npm rebuild esbuild sharp
```

## `npm run build` fails on a content entry (zod / frontmatter error)

The schemas in [`src/content.config.ts`](../src/content.config.ts) are the contract. The error names the file and the field. Common causes:

- A date not in `YYYY-MM-DD` form.
- `status` / `category` / `difficulty` set to a value outside the allowed enum.
- A required field (`title`, `description`, `date`, and for writeups `event` + `category`) missing.

Fix the frontmatter to match the schema. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for the full field tables.

## `astro check` (npm run check) reports type errors

Run it locally — it prints the same diagnostics with file and line:

```sh
npm run check
```

Things that have bitten this project before:

- **`astro.config.mjs` typed against Vite's `PluginOption`.** The Tailwind Vite plugin can trip a structural type mismatch. The config intentionally omits the `// @ts-check` pragma at the top of that file so the JS config isn't type-checked against a stricter Vite type than it needs.
- **`crypto.subtle.digest` argument typing.** Pass the data as `BufferSource` (an `ArrayBuffer` or a typed array), not a union that includes `SharedArrayBuffer`.
- **DOM lookups are nullable.** `document.getElementById(...)` returns `T | null` under strict mode — null-check before use, or the build fails.

## Build succeeds locally but the tool pages do nothing

Type-checking does **not** catch runtime logic errors. The tools are client-side scripts — verify them in a real browser (`npm run preview`, then click through each tool with real input). If a tool is silent:

- Open the browser devtools **Console** — a thrown error or (in production) a **CSP violation** is the usual cause.
- In production specifically, a violation means the page used an inline style/handler or an external resource. See the next section.

## "Works in dev/preview, broken in production"

Almost always the **Content-Security-Policy**, which only exists on the Cloudflare edge — not under `npm run dev` or `npm run preview`. The browser silently refuses the offending thing and logs a violation in the devtools console on the production URL.

Culprits and fixes (full rules in [MAINTENANCE.md → Keeping the CSP intact](MAINTENANCE.md#keeping-the-csp-intact)):

- A `style="..."` attribute → move to a class or a `<style>` block.
- An inline `onclick=`/`oninput=` handler → use `addEventListener` in a `<script>` block.
- An external script/font/image/embed → host it locally, or extend the CSP deliberately and narrowly in `public/_headers`.

## New content doesn't appear in production

- It's probably `draft: true` — drafts render in dev but are excluded from the production build and sitemap. Set `draft: false`.
- Or the filename starts with `_` — those files (like `_template.md`) are never built. Rename it.

## Cloudflare Pages build fails (but it builds locally)

- **Node version.** Confirm the build uses Node 24. `.nvmrc` should be picked up automatically; if not, set `NODE_VERSION=24` in the Pages project env vars (Production **and** Preview) and retry.
- **Lockfile drift.** Cloudflare installs from `package-lock.json`. If you changed dependencies, make sure the updated lockfile is committed.
- **Case sensitivity.** Cloudflare's build runs on Linux (case-sensitive filesystem); Windows/macOS are case-insensitive. An import like `../components/card.astro` for a file named `Card.astro` works locally and fails in the cloud. Match the case exactly.

## `git push` appears to hang

On Windows, Git Credential Manager may be waiting on an interactive prompt that can't surface (e.g. in a non-interactive shell), or the shell is buffering output. To get a clean, non-interactive result:

```sh
GIT_TERMINAL_PROMPT=0 git ls-remote origin   # verify auth + connectivity without a full push
```

If credentials are cached, this returns the remote refs immediately. If it errors on auth, sign in to GitHub once in an interactive terminal (or configure a credential helper / PAT) and retry the push there.

## Deploy went out but production looks wrong

Roll back instantly from **Cloudflare Pages → Deployments → (last good) → Rollback** while you fix the issue in git. Full procedure in [DEPLOYMENT.md → Rollback](DEPLOYMENT.md#rollback).

## Security headers show as missing

They're a Cloudflare Pages feature served from `public/_headers` **at the edge** — they never appear under `npm run preview`. Check them on the deployed URL with [securityheaders.com](https://securityheaders.com/?q=derekwei.xyz). If they're missing in production, confirm `public/_headers` exists in the build output (`dist/_headers` after `npm run build`) and that the file has no syntax errors (each rule block starts with a path pattern, indented header lines beneath).
