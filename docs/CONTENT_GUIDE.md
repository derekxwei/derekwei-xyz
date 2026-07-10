# Content guide

How to write and publish the three kinds of content on derekwei.xyz: **projects**, **CTF writeups**, and **lab notes**. All three are Markdown/MDX files in typed collections under `src/content/`, validated against schemas in `src/content.config.ts`.

## The workflow, in brief

1. Copy the collection's `_template.md` (e.g. `src/content/writeups/_template.md`).
2. Rename it — **the filename becomes the URL slug**. Use lowercase and hyphens: `byuctf-2026-lost-in-translation.md` → `/writeups/byuctf-2026-lost-in-translation/`.
3. Fill in the frontmatter (fields below). The build **fails** on invalid frontmatter, which is the point — it catches mistakes before they ship.
4. Write the body in Markdown (or MDX if you need components).
5. Keep `draft: true` while working; set `draft: false` (or remove the line) to publish.
6. `npm run build` and preview before pushing.

### Draft and template rules

- `draft: true` → visible in `npm run dev`, **excluded from production**. Your safe staging state.
- Files starting with `_` (like `_template.md`) are **never built**, in any mode — they're excluded by the collection glob, independent of the draft flag.

## Writing style

Match the tone of the rest of the site: **professional, technical, direct**. A few house rules that also keep the content honest and recruiter-friendly:

- **No invented metrics or placements.** Don't claim a rank, score, or percentile you can't substantiate. "Competed in BYU CTF" is fine; "Top 10 at BYU CTF" needs to be true.
- **Mark unfinished work `in-progress`.** Don't describe a planned project in the past tense.
- **Respect competition rules.** Some CTFs prohibit publishing solutions or flags for active/reused challenges. When in doubt, redact the flag (`flag{REDACTED}`) and focus on methodology.
- **No secrets.** Never paste real tokens, keys, internal hostnames, or personal data into a writeup, even as an "example."
- **Teach the method.** The most valuable writeups explain *how you thought about it* — recon, the dead ends, the insight — not just the final command.

## Projects — `src/content/projects/`

| Field | Type / values | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | |
| `description` | string | yes | One or two sentences; shown on cards and in `<meta>`. |
| `status` | `shipped` \| `in-progress` \| `planned` | yes | Unfinished work stays `in-progress`. |
| `date` | date (`YYYY-MM-DD`) | yes | Sort key (newest first). |
| `updated` | date | no | Set when the project meaningfully changes. |
| `tags` | string array | no | e.g. `[astro, blue-team]`. Defaults to `[]`. |
| `repo` | URL | no | Link to source. Omit rather than link to a dead/private repo. |
| `link` | URL | no | Live demo/deployment. |
| `featured` | boolean | no | `true` surfaces it on the home page. Defaults to `false`. |
| `draft` | boolean | no | Defaults to `false`. |

Suggested body structure: **Overview → Design/approach → Status → Next steps**. The `_template.md` has this skeleton.

## CTF writeups — `src/content/writeups/`

| Field | Type / values | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | Usually the challenge name. |
| `description` | string | yes | One-line summary. |
| `event` | string | yes | e.g. `BYU CTF`, `RowdyCon`, `CTF@CIT`. |
| `category` | `web` \| `crypto` \| `forensics` \| `pwn` \| `rev` \| `osint` \| `network` \| `misc` | yes | |
| `difficulty` | `easy` \| `medium` \| `hard` \| `insane` | no | |
| `date` | date | yes | |
| `tags` | string array | no | Defaults to `[]`. |
| `draft` | boolean | no | Defaults to `false`. |

Suggested body structure: **TL;DR → Challenge → Recon → Solution → Flag (redact if required) → Takeaways**. Fenced code blocks render with the site's monospace styling; keep commands copy-pasteable.

## Lab notes — `src/content/lab-notes/`

Shorter, rougher than writeups — notes from the homelab and hands-on practice. Lower bar for polish; higher value in frequency.

| Field | Type / values | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | |
| `description` | string | yes | |
| `date` | date | yes | |
| `updated` | date | no | Set when you revisit a note. |
| `tags` | string array | no | Defaults to `[]`. |
| `draft` | boolean | no | Defaults to `false`. |

Suggested body structure: **Context → Setup → What I did → What broke → Notes**.

## Markdown tips

- **Headings** inside a body start at `##` — the page's single `<h1>` is the title from frontmatter (rendered by `PageHeader`). Don't add another `#`.
- **Links** are standard Markdown; external links render fine, but there's no need to add `rel` attributes in content (the site doesn't load third-party content).
- **Images**: place them in `src/content/<collection>/` alongside the entry (or under `src/assets/`) and reference them relatively so Astro optimizes and fingerprints them. Avoid hotlinking remote images — the CSP's `img-src 'self' data:` blocks them anyway.
- **MDX**: rename the file to `.mdx` if you need to import and use a component. Plain `.md` is enough for everything else.

## Publishing checklist

- [ ] Frontmatter complete and valid (`npm run build` passes).
- [ ] `draft: false`.
- [ ] Filename is a clean, lowercase, hyphenated slug.
- [ ] No secrets, no invented results, competition rules respected.
- [ ] Previewed locally (`npm run preview`) — renders correctly, links work.
- [ ] Committed and pushed (the sitemap updates automatically).
