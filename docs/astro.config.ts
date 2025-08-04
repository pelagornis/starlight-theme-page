import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import pagePlugin from '@pelagornis/page';

// https://astro.build/config
export default defineConfig({
  site: 'https://starlight-theme-page.vercel.app/',
  integrations: [
    starlight({
      logo: {
        dark: './src/assets/logo-dark.svg',
        light: './src/assets/logo-light.svg',
        alt: 'Starlight Page',
      },
      editLink: {
        baseUrl: 'https://github.com/pelagornis/starlight-theme-page/edit/main/docs/',
      },
      plugins: [
        pagePlugin()
      ],
      social: {
        github: 'https://github.com/pelagornis/starlight-theme-page',
      },
      title: 'starlight/page'
    }),
  ],
})
