import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import pagePlugin from '@pelagornis/page';

export const locales = {
  root: {
    label: 'English',
    lang: 'en'
  },
  ko: {
    label: '한국어',
    lang: 'ko'
  },
  ja: {
    label: '日本語',
    lang: 'ja'
  },
  zh: {
    label: '中文',
    lang: 'zh'
  },
};

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
        pagePlugin({
          navigation: [
            { href: '/guides/getting-started/', label: 'Guide' },
            { href: '/components/header/', label: 'Components' },
          ],
        })
      ],
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
      social: [
        {
            icon: 'discord',
            label: 'Discord',
            href: 'https://github.com/pelagornis/starlight-theme-page',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/pelagornis/starlight-theme-page',
        },
      ],
      title: 'starlight/page',
      locales
    })
  ],
})
