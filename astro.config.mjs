import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

// Astro loads .env for pages; load it here as well for local URL settings.
if (existsSync('.env')) loadEnvFile('.env');

// Set SITE_URL when a GitHub Pages address or custom domain is ready.
// Set BASE_PATH only when publishing under a repository subdirectory.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
