# Concept D acceptance checklist

Branch: `design/concept-d-production`, cut from `main` at `adde2e7`. Nothing is merged and nothing is deployed. `main` is untouched.

## How to preview it

The repository has no branch preview deployment configured, and no Cloudflare setting was changed to add one. Preview it locally:

```bash
git switch design/concept-d-production && npm run build && npm run preview
```

That serves the built site at `http://localhost:4321`. Use the built preview rather than `npm run dev`, because it exercises the same static output Cloudflare would serve.

To compare against what is live, open https://derekwei.xyz in another tab. To return to the current site locally:

```bash
git switch main
```

## What already passed automated checks

Recorded so you can skip re-verifying them and spend your time on judgement instead.

- `npm run check`: 0 errors, 0 warnings, 0 hints across 41 files.
- `npm run build`: 31 pages, same page count as `main`.
- No horizontal overflow: 13 routes at 320, 390, 430, 768, 1024, 1440, and 1920, 91 checks.
- WCAG AA contrast in both themes, with semi-transparent backgrounds correctly composited.
- Every focusable control shows a 2px focus ring under `:focus-visible`.
- No console messages on any route. No external script or image source anywhere in the built HTML.
- Resume PDF, vCard, `theme-boot.js`, and `_headers` are byte-identical to `main`.
- `src/consts.ts`, `src/content/`, `public/`, `astro.config.mjs`, `package.json`, and the lockfile are untouched.

## Desktop

- [ ] At 1920 by 1080 the page uses the width without feeling stretched.
- [ ] The homepage reads in the intended order: hero, then 01 Evidence, 02 Experience, 03 Credentials, 04 Direction, 05 Contact.
- [ ] Each section rule spans the full content width and lines up with the header and footer edges.
- [ ] The section number and category read as wayfinding, not decoration.
- [ ] Section titles are clearly stronger than body text.
- [ ] The AO-SINT screenshot is the most prominent thing in Selected work.
- [ ] The two supporting projects read as subordinate to AO-SINT, not as equals.
- [ ] Long paragraphs stay comfortable to read and do not run the full width.
- [ ] Tables and diagrams have room without being blown up.
- [ ] Nothing looks accidentally left-aligned, orphaned, or misaligned between sections.

## Mobile

- [ ] At roughly 390px the hero name fits without awkward breaks.
- [ ] Buttons are easy to hit and do not overlap.
- [ ] The menu button opens the navigation, and every item is easy to tap.
- [ ] Escape or a second tap closes the menu.
- [ ] The AO-SINT image is legible on a phone.
- [ ] Nothing scrolls sideways on any page.
- [ ] The resume and achievements pages are still scannable on a phone.

## Dark and Light

- [ ] Light mode reads as the same website, not a different one.
- [ ] Nothing is washed out or too dim in either theme.
- [ ] Switching themes does not cause a flash of the wrong colours.
- [ ] The choice survives a page load and a navigation.
- [ ] System mode follows the operating system setting.
- [ ] The card page respects a stored Light preference even though it has no theme control.

## Navigation

- [ ] All nine items are present: Resume, Achievements, Projects, CTF, Lab, Tools, Architecture, About, Contact.
- [ ] No Home item, and the terminal brand still goes home.
- [ ] Every label is unchanged from the live site.
- [ ] The current page is indicated, including on the homepage where the brand carries it.
- [ ] Every link goes where its label says.
- [ ] The header stays put while scrolling and does not shrink, hide, or animate.

## Resume and credentials

- [ ] The resume page shows the same information as the live site.
- [ ] Download resume (PDF) opens the same one-page PDF.
- [ ] Five CompTIA certifications, stated as five.
- [ ] Stackable certifications are listed separately with the note that they are awarded for combinations, not extra exams.
- [ ] AWS Certified AI Practitioner shows issued August 7 2026 and expires August 7 2029.
- [ ] Every credential link opens the right public Credly badge.
- [ ] Both scholarships appear with the correct amounts.
- [ ] Nothing reads as overclaiming.

## Contact

- [ ] The only phone number shown is the Google Voice number.
- [ ] Call, text, and email actions work from a phone.
- [ ] LinkedIn goes to the right profile.
- [ ] The card page is still short, still has no site navigation, and still saves a contact.
- [ ] The vCard downloads and imports correctly.

## CTF

- [ ] The AO-SINT writeup reads well end to end.
- [ ] The placement is stated as a team result for Team idktheflag, never as an individual placement.
- [ ] Evidence screenshots are noticeably larger than before and are worth looking at.
- [ ] Paragraphs stay narrow while the screenshots go wide, and that combination feels right rather than disjointed.
- [ ] The flag spoiler is still collapsed by default and still opens.
- [ ] All six images load, with no gap or jump as you scroll.

## Accessibility

- [ ] Tab through the homepage: focus is always visible and never lands somewhere invisible.
- [ ] The skip link appears on the first Tab and works.
- [ ] The menu, when closed, cannot be tabbed into.
- [ ] The theme control is operable by keyboard, and Escape closes it.
- [ ] Text is comfortable at 200 percent browser zoom.
- [ ] Nothing is conveyed by colour alone.
- [ ] If you use a screen reader, section headings announce sensibly and the numbers are not read out as content.

## Motion

- [ ] Buttons, the theme control, the menu button, and the AO-SINT feature all respond the instant you press them.
- [ ] Nothing moves, fades, or slides as you scroll.
- [ ] View selected work jumps to the Evidence section; with reduced motion enabled it jumps instantly instead of gliding.
- [ ] With reduced transparency enabled the header is solid rather than blurred.
- [ ] Nothing bounces, springs, or animates on its own.

## Known items to decide on

Neither is a defect introduced here. Both are judgement calls worth an explicit answer.

1. **Certification links on the homepage measure about 21px tall.** They sit inside a sentence ("5x CompTIA certified: CySA+ · PenTest+ · ..."), which WCAG 2.5.8 exempts from the 24px target minimum. Enlarging them would break the line they sit in. Left as is. Say if you would rather they became a chip row.

2. **`--color-faint` was corrected from `#6b7f9c` to `#6e829e`.** The old value measured 4.35:1 on the panel surface, below the 4.5:1 floor for normal text, and it carries real metadata there. The new value is a 1.0 percent lightness increase with hue and saturation held, giving 4.53:1 on panel, 4.88:1 on the page background, and 4.74:1 on the secondary panel. This is the one production colour value that changed. Confirm you are happy with it.

## Approval

Nothing merges without your explicit go-ahead. When you have worked through this list, reply with either the specific changes you want, or a clear instruction to merge `design/concept-d-production` into `main`.
