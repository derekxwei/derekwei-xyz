# Accessibility checklist

derekwei.xyz aims for **WCAG 2.1 AA**. Accessible markup is also good engineering and good SEO, and for a security portfolio it signals that you sweat the details. Most of this is built into the shared layout and components; this checklist is for verifying it and not regressing.

## Built in

- **Landmarks** — `BaseLayout` provides `<header>`, `<main id="main">`, and `<footer>`. A **skip link** (`Skip to content`) is the first focusable element and jumps to `#main`.
- **One `<h1>` per page** via `PageHeader`; body/section headings descend in order (`<h2>`, `<h3>`).
- **Visible focus** — a global `:focus-visible` outline in the site accent color, never removed.
- **Keyboard-operable nav** — the mobile menu toggle is a real `<button>` with `aria-expanded`/`aria-controls`, and closes on `Escape`.
- **`aria-current="page"`** on the active nav link.
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables smooth scrolling and transitions.
- **Live regions** — the browser tools use `aria-live="polite"` on output and error areas so results are announced.
- **Labelled controls** — every input/textarea/select in the tools has an associated `<label>` (or `aria-label`); radio groups use `<fieldset>`/`<legend>`.
- **Color scheme** — declared `color-scheme: dark`; the palette is tuned for high contrast (see below).

## Per-page / per-component checklist

- [ ] **Headings in order** — no skipping levels (don't jump `<h2>` → `<h4>`). Exactly one `<h1>`.
- [ ] **Every control has an accessible name** — `<label for>`, wrapping `<label>`, or `aria-label`. Icon-only buttons need an `aria-label` or `sr-only` text.
- [ ] **Images have `alt`** — descriptive for meaningful images, empty `alt=""` for decorative ones. Decorative SVGs get `aria-hidden="true"`.
- [ ] **Links make sense out of context** — avoid "click here"; the link text should describe the destination.
- [ ] **Keyboard reachable** — every interactive element is focusable and operable with Tab/Enter/Space (and arrow keys for radio groups). Nothing is mouse-only.
- [ ] **Focus is visible** on every interactive element (don't override the global outline).
- [ ] **Color is not the only signal** — status like project `in-progress` uses a text label + badge, not color alone.
- [ ] **ASCII diagrams / preformatted art** (e.g. the architecture delivery diagram) have a text alternative — `role="img"` with a descriptive `aria-label`.
- [ ] **Tables** use `<th scope>` and a `<caption>` (see the security-headers table on the architecture page).
- [ ] **Wide content scrolls, the page doesn't** — tables and code blocks sit in an `overflow-x-auto` container so the page body never scrolls sideways on mobile.

## Contrast

- [ ] Body text (`--color-ink` / `--color-muted` on `--color-bg`) meets **4.5:1**.
- [ ] Large text and UI components meet **3:1**.
- [ ] The accent green (`--color-accent`, `#34d399`) is used on the dark background for text/borders at sizes/weights that clear the threshold; verify new usages with a contrast checker rather than assuming.

## How to test

1. **Keyboard only** — unplug the mouse. Tab through each page: skip link works, focus order is logical, focus is always visible, the mobile menu opens/closes, every tool is fully operable.
2. **Automated scan** — run [axe DevTools](https://www.deque.com/axe/devtools/) or Lighthouse (Accessibility) on each page type (home, a content list, a content detail, a tool). Fix flagged issues; treat a 100 as the floor, not proof.
3. **Zoom** — zoom the browser to 200%. No content is cut off, nothing overlaps, no horizontal scroll on the page body.
4. **Screen reader spot-check** — with VoiceOver (macOS), NVDA (Windows), or Orca (Linux): headings navigation reads a sensible outline, form controls announce their labels, tool output is announced when it updates.
5. **Reduced motion** — enable "reduce motion" in the OS and confirm the site doesn't animate.
6. **Forced colors / high contrast mode** (Windows) — content stays legible.

## When adding a browser tool

The tools are the most interactive part of the site and the easiest place to introduce an accessibility bug:

- [ ] Inputs labelled; related inputs grouped with `<fieldset>`/`<legend>`.
- [ ] Output and error regions have `aria-live="polite"`.
- [ ] Errors are conveyed as text (never color-only, never a native `alert()`).
- [ ] Copy buttons and toggles have accessible names and give text feedback ("Copied").
- [ ] Fully keyboard-operable end to end.
