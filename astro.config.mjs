import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://derekwei.xyz',
  integrations: [mdx(), sitemap()],
  // Old routes kept alive after the /ctf and /lab rename. Static builds emit
  // a small redirect HTML page for each, so existing links do not 404.
  redirects: {
    '/writeups': '/ctf',
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
