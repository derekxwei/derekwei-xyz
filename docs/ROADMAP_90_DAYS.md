# 90-day roadmap

A suggested plan for turning derekwei.xyz from a solid skeleton into a portfolio with depth, over the ~90 days after launch. It's a guide, not a contract - adjust to your actual schedule (UTSA starts in the fall, so the back half overlaps the start of the semester).

**Ground rules that don't change:** no invented metrics or placements, mark unfinished work `in-progress`, respect competition rules when publishing writeups, and run the [pre-deploy checklist](MAINTENANCE.md#pre-deploy-checklist) before every push. Publishing cadence beats big-bang drops - small, honest, frequent.

## Days 1–7: launch and lock in

- [ ] Deploy to Cloudflare Pages and connect the `derekwei.xyz` domain ([DEPLOYMENT.md](DEPLOYMENT.md)).
- [ ] Verify headers ([securityheaders.com](https://securityheaders.com/?q=derekwei.xyz)), run Lighthouse (perf + a11y), and confirm the sitemap/robots resolve in production.
- [ ] Submit the sitemap to Google Search Console and Bing ([SEO_CHECKLIST.md](SEO_CHECKLIST.md)).
- [ ] Fill in the personalization TODOs left in the source: certification earned-dates on the resume, and (once they exist) `repo` URLs and LinkedIn/GitHub links on Contact.
- [ ] Proofread every page end to end for accuracy - this is the version recruiters see first.

## Days 8–30: first real content

The site's credibility comes from content only you can write. Aim for a handful of genuine entries.

- [ ] **2–3 CTF writeups** from events you've actually competed in (National Cyber League, BYU CTF, RowdyCon, CTF@CIT, Squ1rrel, CyberPatriot). Pick challenges you can explain well; teach the method. Redact flags where required.
- [ ] **1–2 lab notes** from real homelab work - even "set up a VM and forwarded its logs" is a legitimate, useful note. Frequency and honesty matter more than polish.
- [ ] Flesh out the **home security lab** project with what you've actually built so far; keep the rest as a clearly-labeled roadmap.
- [ ] Update **/now** to reflect what you're currently doing.

## Days 31–60: depth and range

- [ ] **3–4 more writeups** spanning different categories (web, crypto, forensics, OSINT, rev) so the range shows breadth. Cross-link related ones.
- [ ] **A second real project** - e.g. a small detection rule set, a script that automates a homelab task, or a documented network segmentation exercise. Ship it as `in-progress` and move to `shipped` when it's genuinely usable.
- [ ] **Continue lab notes** - target one every week or two. A running log is more convincing than a single polished post.
- [ ] Consider **one more browser tool** if you find yourself wanting one during CTFs (the pattern is documented in [MAINTENANCE.md](MAINTENANCE.md#adding-a-new-browser-tool)). Only build tools you'd actually use.
- [ ] Check Search Console: are writeups getting indexed? Fix any coverage issues.

## Days 61–90: polish and reach

- [ ] **Resume pass** - once you have more certs/experience, update `src/consts.ts`; the whole site follows. Print to PDF and check it reads cleanly on one or two pages.
- [ ] **Accessibility + performance audit** on the now-larger site ([ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md)). Larger content collections are where heading-order and contrast slips creep in.
- [ ] **Internal linking pass** - projects → related writeups → related lab notes. Good for readers and for crawlers.
- [ ] **Backfill** any thin areas: is every nav section worth clicking into, or is one still an empty state?
- [ ] Point recruiters, professors, and CTF teammates at the live site and take feedback.

## Ongoing (past day 90)

- Publish a writeup shortly after each CTF, while it's fresh.
- Keep `/now` current - refresh it monthly.
- Move projects from `in-progress` to `shipped` as they become real.
- Run dependency updates on a monthly cadence ([MAINTENANCE.md](MAINTENANCE.md#dependency-updates)).
- Revisit this roadmap and write the next one.

## A note on honesty

The strongest thing this portfolio can do is be **true**. A short list of real writeups and a genuinely-documented homelab beats a long list of vague claims every time - and for a security role, where trustworthiness *is* the job, it's the whole point. Never pad it with metrics you can't stand behind.
