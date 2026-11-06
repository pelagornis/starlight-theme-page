import markdoc from '@astrojs/markdoc';
import netlify from '@astrojs/netlify';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import pagePlugin from '@pelagornis/page';
import catalog from './src/components/docs/catalog.json';

const componentGroups = catalog.categories.map((category) => ({
  label: category.label,
  translations: category.translations,
  collapsed: false,
  items: catalog.components
    .filter((component) => component.category === category.id)
    .map((component) => ({ slug: `components/${component.id}` })),
}));

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
  site: 'https://pelagornis-page.netlify.app/',
  output: 'server',
  adapter: netlify(),
  integrations: [
    markdoc(),
    starlight({
      logo: {
        dark: './src/assets/page-dark.svg',
        light: './src/assets/page-light.svg',
        alt: 'Starlight Page',
      },
      editLink: {
        baseUrl: 'https://github.com/pelagornis/starlight-theme-page/edit/main/docs/',
      },

      plugins: [
        pagePlugin({
          navigation: [{ sidebar: 'Guides' }, { sidebar: 'Components' }],
          footerText: `© ${new Date().getFullYear()} Pelagornis Inc. All rights reserved.`,
          llmsTxt: {
            title: '@pelagornis/page',
            description:
              'A Starlight plugin that replaces the docs shell with RefineUI components and re-exports every RefineUI component for MDX and Markdoc pages.',
          },
        })
      ],
      sidebar: [
        {
          label: 'Guides',
          translations: { ko: '가이드', ja: 'ガイド', zh: '指南' },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Components',
          translations: { ko: '컴포넌트', ja: 'コンポーネント', zh: '组件' },
          items: [
            {
              label: 'Overview',
              translations: { ko: '개요', ja: '概要', zh: '概览' },
              slug: 'components',
            },
            ...componentGroups,
          ],
        },
      ],
      social: [
        {
            icon: 'slack',
            label: 'Slack',
            href: 'https://pelagornis.slack.com/',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/pelagornis/starlight-theme-page',
        },
      ],
      title: 'Page',
      locales
    }),
  ],
})
