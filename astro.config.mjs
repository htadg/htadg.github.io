// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  outDir: './docs',
  site: 'https://hiten.is-a.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});