import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';

export interface pageConfig {
  // 추후 확장 가능한 설정들
}

export type pageUserConfig = pageConfig;

/**
 * page 스타일 Starlight 테마 플러그인
 * 토스의 직관적이고 깔끔한 디자인을 제공합니다.
 */
export default function pagePlugin(userConfig?: pageUserConfig): StarlightPlugin {
  return {
    name: 'page-plugin',
    hooks: {
      setup({ config, updateConfig }) {
        updateConfig({
          components: {
            // page 스타일 컴포넌트들 오버라이드
            Header: '@pelagornis/page/overrides/Header.astro',
            PageFrame: '@pelagornis/page/overrides/PageFrame.astro',
            Sidebar: '@pelagornis/page/overrides/Sidebar.astro',
            TwoColumnContent: '@pelagornis/page/overrides/TwoColumnContent.astro',
            Search: '@pelagornis/page/overrides/Search.astro',
            ThemeSelect: '@pelagornis/page/overrides/ThemeSelect.astro',
            Footer: '@pelagornis/page/overrides/Footer.astro',
            MarkdownContent: '@pelagornis/page/overrides/MarkdownContent.astro',
            Hero: '@pelagornis/page/overrides/Hero.astro',
            MobileMenuToggle: '@pelagornis/page/overrides/MobileMenuToggle.astro',
          },
          customCss: [
            // page 스타일 CSS를 먼저 로드하여 기본 스타일을 override
            '@pelagornis/page/styles.css',
          ],
        });
      },
    },
  };
}