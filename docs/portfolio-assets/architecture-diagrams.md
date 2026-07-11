# Architecture diagram specifications

Specs for three diagrams to add as visuals (project pages, slides, or the architecture
page). Each includes a title, purpose, components, an ASCII flow you can hand to a diagram
tool, a caption for publishing, and speaker notes for talking through it in an interview.

Keep them clean and blueprint-styled to match the site: dark background, blue/cyan accents,
slate borders. Do not include real IP addresses, keys, or internal hostnames in any
diagram.

---

## 1. derekwei.xyz delivery pipeline

- **Title:** How derekwei.xyz ships
- **Purpose:** Show that the site is static, has no origin server to attack or patch, and
  deploys automatically from source control to a global edge.
- **Components:**
  - **GitHub** - source of truth; a push to `main` triggers the build. Repository is
    private while actively maintained.
  - **Cloudflare Pages** - runs `npm run build`, producing the static `dist/` output.
  - **HTTPS / global edge** - the static output is served from Cloudflare's edge over HTTPS,
    with security headers applied at the edge.
  - **Visitor** - receives prerendered HTML; no backend is involved at request time.
- **Flow:**

  ```text
  GitHub (push to main)
        |
        v
  Cloudflare Pages  (npm run build -> dist/)
        |
        v
  HTTPS / global edge  (security headers applied)
        |
        v
  Visitor
  ```

- **Caption:** "A push to GitHub builds the site and publishes static output to Cloudflare's
  edge. No origin server, no database - less to attack and less to maintain."
- **Speaker notes:** "The pipeline is deliberately short. Because the deploy artifact is
  just static files, there is no server to keep patched and no runtime attack surface.
  Security headers and a strict CSP are applied at the edge. Version 1 intentionally has no
  backend; I would only add one when a feature genuinely requires it."

---

## 2. CPTS study notes pipeline

- **Title:** CPTS study notes pipeline
- **Purpose:** Show a disciplined, tool-assisted study workflow with a human accuracy gate,
  and that no secrets or copyrighted material are redistributed.
- **Components:**
  - **Source material** - study text pasted in as input.
  - **Claude processing** - Claude Code orchestrates; Claude Haiku reformats at volume.
  - **Structured notes** - consistent topic summaries and technique checklists.
  - **Review artifacts** - spaced-review prompts generated from the notes.
  - **Human review** - manual accuracy check before anything is trusted.
  - **Obsidian vault** - the linkable, searchable destination.
- **Flow:**

  ```text
  Source material
        |
        v
  Claude processing  (Claude Code + Claude Haiku)
        |
        v
  Structured notes
        |
        v
  Review artifacts
        |
        v
  Human review  (accuracy gate)
        |
        v
  Obsidian vault
  ```

- **Caption:** "Pasted study material becomes structured, review-ready notes - with a human
  accuracy check before anything enters the vault."
- **Speaker notes:** "The model speeds up structuring; it does not get the final say on
  correctness. Sensitive or copyrighted course content never goes into a public or unsafe
  context, and none of it is reproduced. The value is in reviewing and internalizing the
  structured notes, not in generating them."

---

## 3. Secure travel network

- **Title:** Secure travel network
- **Purpose:** Show a practical defensive-networking setup that reduces exposure on
  untrusted public Wi-Fi across multiple devices.
- **Components:**
  - **Devices** - laptop, phone, and other personal devices.
  - **GL.iNet Opal (GL-SFT1200)** - travel router acting as the single hardened choke point.
  - **VPN gateway** - the router routes device traffic over an encrypted tunnel.
  - **Internet** - reached through the tunnel rather than directly over the venue network.
- **Flow:**

  ```text
  Devices  (laptop, phone, ...)
        |
        v
  GL.iNet Opal  (travel router)
        |
        v
  VPN gateway  (encrypted tunnel)
        |
        v
  Internet
  ```

- **Caption:** "Devices connect to a hardened travel router that carries their traffic over
  a VPN, instead of trusting public Wi-Fi directly."
- **Speaker notes:** "This is a mitigation, not a guarantee - it reduces casual exposure on
  untrusted networks by giving every device one consistent, hardened path out. It covers DNS
  handling, a VPN gateway, basic segmentation, and router hardening. No credentials, keys, or
  private addresses are shown in the diagram."

---

### Rendering suggestions

- Any diagramming tool works (Excalidraw, draw.io, Mermaid). For Mermaid, each flow maps to
  a simple top-to-bottom `flowchart TD` with one node per step.
- Match the site palette: dark navy background, cyan/blue accent for arrows and node
  borders, cool-gray text.
- Export as SVG or PNG and store under `src/assets/`; reference locally so the CSP serves it
  same-origin.
