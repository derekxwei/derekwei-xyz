# Concept D acceptance

Branch `design/concept-d-production`. Nothing merged, nothing on the production domain. `main` still controls derekwei.xyz.

**Preview:** https://design-concept-d-production.derekwei-xyz.pages.dev

That is a Cloudflare Pages branch preview created automatically by the push. It carries `x-robots-tag: noindex` and is not the custom domain. No Cloudflare setting was changed.

Local alternative:

```bash
git switch design/concept-d-production && npm ci && npm run build && npm run preview
```

Already verified automatically, so you can skip re-checking: `astro check` clean, 31 pages built, no horizontal overflow across 13 routes at six widths, WCAG AA in both themes, zero console errors, zero external resources, zero broken links, resume PDF and vCard byte-identical to main.

---

## Desktop

- [ ] Hero clarity: the name, the one-line summary, and the three actions read in that order without effort.
- [ ] Evidence prominence: AO-SINT is unmistakably the most important thing on the homepage.
- [ ] Section rules: the five full-width lines help you find your place rather than chopping the page up.
- [ ] Width usage: 1920 feels used, not stretched.
- [ ] Typography: section titles clearly outrank body text, and the monospace is doing a job rather than decorating.
- [ ] Supporting-work hierarchy: the two projects read as secondary to AO-SINT, not as equals.

## Mobile

- [ ] Navigation: the menu opens, every item is easy to tap, Escape or a second tap closes it.
- [ ] Theme control: reachable and usable one-handed.
- [ ] Tap targets: nothing feels fiddly.
- [ ] Text wrapping: no awkward breaks in the hero name or headings.
- [ ] Evidence-image scaling: the AO-SINT screenshot is still worth looking at on a phone.
- [ ] No overflow: nothing scrolls sideways on any page.

## Pages

- [ ] Resume: same information as live, PDF downloads, prints cleanly.
- [ ] Achievements: five CompTIA stated as five, stackables still marked as combinations, AWS dates correct, Credly links work.
- [ ] Projects: index and one detail page both read well.
- [ ] CTF: index card leads correctly to the writeup.
- [ ] AO-SINT: evidence images are noticeably larger, prose stays narrow, spoiler still closed.
- [ ] Architecture: diagram and the CSP table are legible and not stretched.
- [ ] About: introduction, direction, principles, and context all present.
- [ ] Contact: email, call, text, and LinkedIn all work; only the Google Voice number appears.
- [ ] Card: still short, still no site navigation, still saves a contact.

## Decisions

- [ ] **Faint-token correction.** `#6b7f9c` to `#6e829e`, a 1.0 percent lightness increase, to clear 4.5:1 on panel surfaces. The one production colour value that changed. Keep or reject.
- [ ] **Inline credential links.** The homepage links sit inside a sentence at about 21px, which WCAG 2.5.8 exempts. Keep as a sentence, or adjust.
- [ ] **Section numbering** 01 to 05, homepage only. Keep or drop.
- [ ] **Full-width section rules.** Keep or drop.
- [ ] **AO-SINT scale**, 1216px at a 1920px viewport. Keep or reduce.
- [ ] **Approve or reject Concept D for merge.**

## To approve

Reply with:

> Merge design/concept-d-production into main

Anything else, including a defect list, will be treated as changes to make first.
