# Claude prompts archive

Reusable prompts for extending derekwei.xyz with an AI coding assistant (Claude Code or similar). These encode the site's constraints so generated output stays consistent, accurate, and CSP-clean. Copy a prompt, fill the blanks, and paste it into your assistant while it has the repo open.

## The constraints every prompt should carry

Whatever you ask for, the assistant needs to respect these — they're baked into the prompts below, but keep them in mind when writing your own:

- **Stack:** Astro 5, TypeScript (strict), Tailwind CSS 4 (Vite plugin), MDX content collections. Static output, deployed on Cloudflare Pages.
- **Facts are fixed.** No invented metrics, placements, scores, dates, or credentials. Use only what's in `src/consts.ts`. Security-clearance wording is exactly: *"U.S. citizen eligible to obtain a Secret security clearance."*
- **No PII** beyond email and city — no phone, home address, or date of birth.
- **Mark unfinished work `in-progress`.**
- **Strict CSP:** no `style="..."` attributes, no inline event handlers (`onclick=`), no external scripts/fonts/images. Scripts go in end-of-file `<script>` blocks using `addEventListener`; null-check DOM lookups.
- **Reuse the components:** `BaseLayout`, `PageHeader`, `Card`, `Badge`, `Prose`, and the classes in `src/styles/global.css` (`panel`, `btn`, `input`, `label`, `kicker`, `link`).
- **Verify:** run `npm run check` and `npm run build`, and for anything interactive, exercise it in a real browser — type-checking doesn't catch runtime bugs.

## Prompt: add a CTF writeup

```
Add a CTF writeup to the site.

Event: <event, e.g. BYU CTF 2026>
Challenge: <name>
Category: <web|crypto|forensics|pwn|rev|osint|network|misc>
Difficulty: <easy|medium|hard|insane, optional>
Date: <YYYY-MM-DD>

Here are my rough notes / the solution steps:
<paste your notes — recon, the key insight, commands, final approach>

Create src/content/writeups/<slug>.md following src/content/writeups/_template.md
and the schema in src/content.config.ts. Structure the body as
TL;DR / Challenge / Recon / Solution / Flag / Takeaways. Redact the flag if the
event's rules require it. Keep the tone technical and direct; teach the method,
don't just dump commands. Set draft: true so I can review it first. Do not invent
any detail I didn't give you. Then run npm run build to confirm it validates.
```

## Prompt: add a project

```
Add a project entry.

Title: <title>
Status: <shipped|in-progress|planned>   # be honest; unfinished = in-progress
Date: <YYYY-MM-DD>
Tags: <comma-separated>
Repo/Link: <URLs if any, else omit — never link to a dead/private repo>

What it is (facts only, no embellishment):
<describe what actually exists today vs. what's planned>

Create src/content/projects/<slug>.md per _template.md and the schema. Structure:
Overview / Design / Status / Next steps. Anything not yet built goes under a clearly
labeled roadmap, phrased as a plan, not an accomplishment. Set featured: true only if
I say so. draft: true for review. Run npm run build.
```

## Prompt: add a browser tool

```
Add a client-side browser tool at src/pages/tools/<name>.astro.

What it does: <one-line description and the exact input → output behavior>
Edge cases to handle: <list them>

Requirements:
- 100% client-side. No backend, no fetch to any third party (CSP connect-src 'self').
- Match the existing tools' structure exactly: kicker "~/tools/<name>", a lede,
  the UI in a `panel`, inputs with class "input" and <label> pairs, buttons
  btn/btn-primary/btn-ghost. Output and error regions use aria-live="polite".
  Errors shown as red (text-danger) text, never alert().
- ALL logic in a <script> block at the end, TypeScript, using addEventListener and
  null-checked getElementById. No inline handlers, no style attributes.
- Copy buttons use navigator.clipboard with a try/catch and "Copied" feedback.
Then add it to the `tools` array in src/pages/tools/index.astro under the right group,
run npm run check and npm run build, and verify it works in a browser with real input
and the edge cases above.
```

## Prompt: add a new top-level page

```
Add a new page at src/pages/<name>.astro for <purpose>.

Use BaseLayout (with a unique 140–160 char description) and PageHeader (kicker
"~/<name>", a title, and a one-line lede). Content in <section class="py-10"> blocks
using the existing component classes. Semantic HTML, one <h1> (from PageHeader),
headings in order, accessible. Only use facts from src/consts.ts. Then add the page
to NAV in src/consts.ts using the trailing-slash href form, and run npm run build.
```

## Prompt: update the resume or bio facts

```
Update <cert / education / competition / focus area>: <the change>.

These facts live in src/consts.ts (CERTIFICATIONS, EDUCATION, COMPETITIONS, SITE).
Edit them there so every page that references them updates. Do not hard-code the fact
into a page. Keep the clearance wording exactly as-is. Run npm run check and
npm run build.
```

## Prompt: dependency update / maintenance pass

```
Do a dependency update pass. Run `npm outdated`, apply safe patch/minor updates with
`npm update`, and for any Astro major use `npx @astrojs/upgrade`. After updating, run
`npm run check && npm run build` and fix anything that breaks. Summarize what changed
and flag anything that needs my attention. Don't change application behavior.
```

## Prompt: pre-deploy review

```
Review the current working tree before I deploy. Check:
- npm run check and npm run build both pass.
- No CSP violations: no style= attributes, inline handlers, or external resources in
  any new/changed file.
- No invented facts, no PII beyond email/city, clearance wording intact,
  unfinished work marked in-progress.
- New content isn't accidentally left draft: true if it's meant to publish.
- Accessibility basics on any new page (one h1, labelled controls, headings in order).
Report anything off; don't push.
```

## Tips for writing your own prompts

- **Give facts, not vibes.** The assistant will faithfully render whatever you provide — and will (correctly) refuse to invent what you don't. Paste real notes.
- **Name the files and components.** "Follow `_template.md`" and "reuse `Card`" produce consistent output; "make a card" produces drift.
- **Always ask it to build and verify.** "Run `npm run build`" and "test it in a browser" catch the errors a type-checker won't.
- **One change per prompt.** Smaller asks are easier to review and less likely to touch things you didn't intend.
