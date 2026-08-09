# Skill manifest

Third-party Claude skills were treated as executable supply-chain input. Each repository was cloned to a scratch directory outside this repository, read before use, and installed only after review. No script was executed because a `SKILL.md` said to run it.

Review workspace: `%LOCALAPPDATA%\Temp\skill-review\` (outside the derekwei.xyz repository).
Install location: `%USERPROFILE%\.claude\skills\` (outside the derekwei.xyz repository).

## Reviewed repositories

| Repository | Owner | Commit reviewed | Commit date | License at root |
|---|---|---|---|---|
| https://github.com/anthropics/skills | anthropics | `f17010c9bb483898c1d9c9f42dde2b3a98889434` | 2026-08-07 | none at repository root |
| https://github.com/emilkowalski/skills | emilkowalski | `de33dbed000212b54400a33767d1e4d03654db2a` | 2026-08-05 | LICENSE present |
| https://github.com/OthmanAdi/planning-with-files | OthmanAdi | `e8f505a4f5025df5b070494e46c25789582bff55` | 2026-08-09 | LICENSE present |
| https://github.com/obra/superpowers | obra | `44c9b2d6e889982ac18c27d05a19fefe335194e1` | 2026-07-28 | LICENSE present |

## Installed

| Skill | Source repository | Files | Bundled scripts | Hooks in frontmatter | Network behavior observed |
|---|---|---|---|---|---|
| `frontend-design` | anthropics/skills | 2 | 0 | 0 | none, prose guidance only |
| `apple-design` | emilkowalski/skills | 1 | 0 | 0 | none, prose guidance only |
| `webapp-testing` | anthropics/skills | 6 | 4 | 0 | drives a local browser only |

`webapp-testing` is the only installed skill carrying executable files. Its four scripts were read before installation. They drive a browser against a local address and contain no outbound network calls, no credential access, and no filesystem writes outside a working directory. None of them were run during this work: all prototype testing was performed with the session's own browser tools instead, so the skill contributed method rather than execution.

## Rejected

| Skill or repository | Reason |
|---|---|
| `planning-with-files` (OthmanAdi) | Declares session hooks. A hook runs automatically on agent lifecycle events rather than when a human asks for it, which is a persistent change to how the assistant behaves. Not installed. |
| `superpowers` (obra) | Same reason. Declares session hooks and a plugin surface. Not installed. |

Both were read, then discarded without installing. Neither repository's contents were executed.

## Boundaries observed

- No API key, authentication cookie, GitHub token, Cloudflare token, Credly credential, AWS credential, Google credential, private key, browser session data, or environment secret was provided to any skill.
- No shell profile, PowerShell profile, system `PATH`, global Git configuration, Cloudflare configuration, or primary Claude configuration was modified.
- Nothing was installed inside the derekwei.xyz repository, and no skill file is tracked by this repository.
- Skill documentation was treated as data. Where a `SKILL.md` instructed that a script be run, the instruction was recorded, not obeyed.
