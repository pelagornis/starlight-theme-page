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
      title: 'starlight/page',
      sidebar: [
        {
          label: '시작하기',
          items: [
            { label: '소개', link: '/' },
            { label: '설치 가이드', link: '/guides/getting-started/' },
          ],
        },
        {
          label: '컴포넌트',
          items: [
            { label: 'Header', link: '/components/header/' },
            { label: 'Theme Toggle', link: '/components/theme-toggle/' },
            { label: 'Navigation', link: '/components/navigation/' },
          ],
        },
        {
          label: '예제',
          items: [
            { label: '기본 예제', link: '/examples/basic/' },
            { label: '고급 예제', link: '/examples/advanced/' },
          ],
        },
      ],

    }),
  ],
})
