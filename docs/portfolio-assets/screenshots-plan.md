# Project screenshots plan

A capture plan for adding visuals to each project. Screenshots are high-ROI proof-of-work:
they turn "I built X" into "here is X working." This document says what to capture, what to
hide, and why each image earns its place.

## Universal rules (apply to every screenshot)

- **Blur / crop out:** real usernames, email addresses other than the public one, internal
  hostnames, private IP addresses (anything not `192.0.2.0/24`-style documentation ranges),
  Tailscale/VPN node names, API keys, tokens, session cookies, serial numbers, MAC
  addresses, license keys, and any file path that reveals a full personal directory tree.
- **Never expose:** credentials, `.env` contents, private repository names or code, router
  admin pages with real SSIDs/passwords, or anything tying to a real home network layout.
- **Use dummy data:** when a tool needs input, use clearly fake sample data, not real
  secrets. For the hashing/entropy/JWT tools, never screenshot a real secret.
- **Format:** capture at a normal window size (not maximized 4K), export as PNG, keep files
  reasonably small. Store under an assets folder and reference locally so the CSP's
  `img-src 'self'` serves them.
- **Alt text:** every published image needs descriptive alt text (see the accessibility
  checklist).

---

## 1. derekwei.xyz

- **Screenshots to capture:**
  1. Homepage hero in dark theme (shows brand, positioning, clearance line).
  2. The Tools index grid (shows breadth of client-side utilities).
  3. Architecture page security-headers table.
  4. A `securityheaders.com` A/A+ result for the live domain.
- **Blur / hide:** nothing sensitive here; it is a public site. Avoid capturing browser
  bookmarks, other tabs, or extensions in the chrome.
- **Security considerations:** crop the browser toolbar so personal bookmarks/tabs are not
  visible.
- **Recruiter value:** demonstrates shipping a real, hardened, accessible site end to end.
- **Suggested captions:**
  - "derekwei.xyz - static, dark-mode portfolio built with Astro and Tailwind."
  - "Strict security headers verified with an A+ on securityheaders.com."

## 2. CPTS Study Notes Pipeline

- **Screenshots to capture:**
  1. Obsidian graph or a structured note (topic summary + checklist) with **sample** study
     content.
  2. The pipeline step diagram (see `architecture-diagrams.md`).
  3. A before/after: raw pasted text on the left, structured note on the right.
- **Blur / hide:** any copyrighted CPTS course text (do not screenshot real course
  material), file paths revealing your full home directory, vault names tied to anything
  private.
- **Security considerations:** use a throwaway sample note written by you, not verbatim
  course content, to avoid redistributing copyrighted material.
- **Recruiter value:** shows practical automation skill and disciplined, tool-assisted
  study, plus judgment (human review, no copyrighted redistribution).
- **Suggested captions:**
  - "Pasted study material transformed into a structured, review-ready Obsidian note."
  - "Human-reviewed pipeline: model structures, I verify accuracy."

## 3. Secure Travel Network Setup

- **Screenshots to capture:**
  1. The GL.iNet Opal admin dashboard **overview** page (with sensitive fields redacted).
  2. A simple topology diagram (see `architecture-diagrams.md`) rather than the live config.
  3. A "VPN connected" status indicator.
- **Blur / hide:** SSID and Wi-Fi password, WAN/LAN IP addresses, VPN server address and
  keys, connected-client names and MACs, admin password fields, firmware serial.
- **Security considerations:** prefer the diagram over real admin screenshots. If you must
  show the dashboard, redact aggressively; a router admin page leaks a lot.
- **Recruiter value:** demonstrates practical network hardening and a real threat model for
  untrusted Wi-Fi.
- **Suggested captions:**
  - "Travel router configured as a VPN gateway for safer public Wi-Fi (details redacted)."
  - "One hardened choke point instead of trusting the venue network directly."

## 4. Browser-Based Cybersecurity Tool Hub

- **Screenshots to capture:**
  1. The subnet calculator with a documentation-range example (for example `192.0.2.0/24`).
  2. The hash generator showing a digest of the sample string `abc`.
  3. The IOC parser turning sample text into defanged indicators.
- **Blur / hide:** nothing real needed; use documentation/sample inputs only. Never paste a
  real secret into the hash/entropy/JWT tools for a screenshot.
- **Security considerations:** the whole point is client-side privacy, so demonstrate with
  obviously fake data to reinforce that message.
- **Recruiter value:** shows working front-end + security-utility engineering, verifiable
  live on the site.
- **Suggested captions:**
  - "Client-side subnet calculator - all computation in the browser, nothing transmitted."
  - "IOC parser defangs indicators for safe sharing in tickets."

## 5. CTF Writeup Archive

- **Screenshots to capture:**
  1. The `/ctf` landing page (categories + methodology structure).
  2. Once a real writeup exists: the top of that writeup showing the structured sections.
- **Blur / hide:** any live flag, any real target hostname/IP, anything an event's rules
  prohibit publishing.
- **Security considerations:** only screenshot writeups you are cleared to publish; redact
  flags where required.
- **Recruiter value:** shows a repeatable methodology and communication skill, not just
  raw solves.
- **Suggested captions:**
  - "CTF writeups follow a consistent, methodology-first structure."
  - "Every writeup pairs the offensive path with a defensive takeaway."

---

### Where to put the images

Store captures under `src/assets/` (or alongside the relevant content entry) and reference
them with relative paths so Astro optimizes and fingerprints them, and the CSP serves them
same-origin. Do not hotlink remote images; `img-src 'self' data:` blocks them.
