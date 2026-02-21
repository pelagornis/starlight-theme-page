import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import pagePlugin from '@pelagornis/page';

// .env 로드: config 파일 폴더(docs) 기준 + 모노레포 루트 docs/.env
const dir = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(dir, '.env') });
loadEnv({ path: path.join(process.cwd(), 'docs', '.env'), override: true });

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
  integrations: [
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
            { href: '/guides/getting-started/', label: 'Guide' },
            { href: '/components/header/', label: 'Components' },
          ],
          footerText: `© ${new Date().getFullYear()} Pelagornis Inc. All rights reserved.`,
          docChat: {
            provider: process.env.PUBLIC_DOC_CHAT_PROVIDER as 'openai' | 'claude' | 'gemini' | undefined,
            model: process.env.PUBLIC_DOC_CHAT_MODEL,
          },
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
    })
  ],
})
