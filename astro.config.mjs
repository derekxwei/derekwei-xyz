import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://derekwei.xyz',
  markdown: {
    // Prism emits class-based tokens (.token.keyword, ...) styled from external
    // CSS, unlike Shiki's inline styles. The strict CSP (style-src 'self', no
    // 'unsafe-inline') blocks inline styles, so Prism keeps code highlighted
    // while staying CSP-clean. Token colors live in src/styles/global.css.
    syntaxHighlight: 'prism',
    // Disable smartypants: it rewrites straight quotes and dashes into curly
    // typography, which reads as machine-generated. Keep copy as written.
    smartypants: false,
  },
  integrations: [
    mdx(),
    // /card is publicly accessible but intentionally unlisted: it is excluded
    // from the sitemap and carries noindex (meta + X-Robots-Tag). Not a
    // security control - the page contains only deliberately public info.
    sitemap({ filter: (page) => new URL(page).pathname !== '/card/' }),
  ],
  // Old routes kept alive after the /ctf and /lab rename. Static builds emit
  // a small redirect HTML page for each, so existing links do not 404.
  redirects: {
    '/writeups': '/ctf',
    '/ctf/broncoctf-2025-ao-sint': '/ctf/broncoctf-2026-ao-sint',
    '/now': '/about',
  },
  build: {
    // Keep all CSS in external files so the strict Content-Security-Policy
    // (style-src 'self', no 'unsafe-inline') holds in production.
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline scripts into HTML: the CSP (script-src 'self') forbids
      // inline script execution, so every script must ship as an external file.
      assetsInlineLimit: 0,
    },
  },
});
