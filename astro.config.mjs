import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rusya2b2.netlify.app',
  build: {
    // Brief §9: kritik CSS inline
    inlineStylesheets: 'always',
  },
});
