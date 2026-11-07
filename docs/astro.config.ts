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
          navigation: [
            {
              label: 'Guides',
              translations: { ko: '가이드', ja: 'ガイド', zh: '指南' },
              items: [
                {
                  label: 'Getting Started',
                  href: '/guides/getting-started/',
                  translations: { ko: '시작하기', ja: 'はじめに', zh: '开始使用' },
                  description: { en: 'Install and register', ko: '설치와 등록', ja: 'インストールと登録', zh: '安装与注册' },
                },
                {
                  label: 'Use in MDX',
                  href: '/guides/mdx/',
                  translations: { ko: 'MDX에서 사용', ja: 'MDX で使う', zh: '在 MDX 中使用' },
                  description: { en: 'Imports and islands', ko: '가져오기와 아일랜드', ja: 'インポートとアイランド', zh: '导入与岛' },
                },
                {
                  label: 'Use in Markdoc',
                  href: '/guides/markdoc/',
                  translations: { ko: 'Markdoc에서 사용', ja: 'Markdoc で使う', zh: '在 Markdoc 中使用' },
                  description: { en: 'The tag preset', ko: '태그 프리셋', ja: 'タグのプリセット', zh: '标签预设' },
                },
                {
                  label: 'Shell overrides',
                  href: '/guides/overrides/',
                  translations: { ko: '셸 오버라이드', ja: 'シェルのオーバーライド', zh: '外壳覆盖' },
                  description: { en: 'Replaced Starlight slots', ko: '바뀐 Starlight 슬롯', ja: '置き換えたスロット', zh: '替换的插槽' },
                },
                {
                  label: 'Starlight components',
                  href: '/guides/starlight-components/',
                  translations: { ko: 'Starlight 컴포넌트', ja: 'Starlight のコンポーネント', zh: 'Starlight 组件' },
                  description: { en: 'Built-ins, restyled', ko: '기본 컴포넌트 스타일', ja: '標準コンポーネント', zh: '内置组件样式' },
                },
              ],
            },
            { sidebar: 'Components' },
          ],
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
