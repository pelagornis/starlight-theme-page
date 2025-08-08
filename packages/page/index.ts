import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';

export interface NavigationItem {
  href: string;
  label: string;
}

export interface pageConfig {
  navigation?: NavigationItem[];
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
        // navigation 설정을 환경 변수로 저장
        if (userConfig?.navigation) {
          process.env.PAGE_NAVIGATION = JSON.stringify(userConfig.navigation);
        }

        updateConfig({
          components: {
            // page 스타일 컴포넌트들 오버라이드
            Header: '@pelagornis/page/overrides/Header.astro',
            PageFrame: '@pelagornis/page/overrides/PageFrame.astro',
            Sidebar: '@pelagornis/page/overrides/Sidebar.astro',
            TwoColumnContent: '@pelagornis/page/overrides/TwoColumnContent.astro',
            ContentPanel: '@pelagornis/page/overrides/ContentPanel.astro',
            Search: '@pelagornis/page/overrides/Search.astro',
            ThemeSelect: '@pelagornis/page/overrides/ThemeSelect.astro',
            LanguageSelect: '@pelagornis/page/overrides/LanguageSelect.astro',
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

// navigation 설정을 가져오는 함수
export const getPageNavigation = (): NavigationItem[] | undefined => {
  try {
    const navigation = process.env.PAGE_NAVIGATION;
    return navigation ? JSON.parse(navigation) : undefined;
  } catch {
    return undefined;
  }
};