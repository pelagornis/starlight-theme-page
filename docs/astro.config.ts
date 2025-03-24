import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://pelagornis.github.io/page/',
    integrations: [
      starlight({
        logo: {
          dark: './src/assets/logo-dark.svg',
          light: './src/assets/logo-light.svg',
          alt: 'Starlight Page',
        },
        editLink: {
          baseUrl: 'https://github.com/pelagornis/page/edit/main/docs/',
        },
        plugins: [
          
        ],
      }),
    ],
  })
  