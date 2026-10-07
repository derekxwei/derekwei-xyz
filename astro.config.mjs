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
    sitemap({
        filter: (page) => {
          const p = new URL(page).pathname;
          // /card is unlisted by choice; /lab-notes/ has no published
          // entries yet, so submitting it offers a crawler an empty page.
          return p !== '/card/' && p !== '/lab-notes/';
        },
      }),
  ],
  // Legacy routes are redirected by public/_redirects, which Cloudflare
  // serves as real 301s. Astro's redirects option emits 200 meta-refresh
  // stubs instead, and a matching static asset beats a redirect rule.
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
