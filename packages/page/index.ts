import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';

export interface NavigationItem {
  href: string;
  label: string;
}

export interface pageConfig {
  navigation?: NavigationItem[];
  siteTitle?: string;
  footerText?: string;
  skipComponents?: string[];
}

export type pageUserConfig = pageConfig;

export default function pagePlugin(userConfig?: pageUserConfig): StarlightPlugin {
  return {
    name: 'page-plugin',
    hooks: {
      setup({ config, updateConfig }) {
        if (userConfig?.navigation) {
          process.env.PAGE_NAVIGATION = JSON.stringify(userConfig.navigation);
        }
        
        if (userConfig?.siteTitle) {
          process.env.PAGE_SITE_TITLE = userConfig.siteTitle;
        }
        
        if (userConfig?.footerText) {
          process.env.PAGE_FOOTER_TEXT = userConfig.footerText;
        }

        // 사용자가 이미 설정한 컴포넌트가 있으면 덮어쓰지 않음
        const existingComponents = config.components || {};
        const skipComponents = userConfig?.skipComponents || [];
        
        const defaultComponents: Record<string, string> = {
          Header: '@pelagornis/page/overrides/Header.astro',
          Footer: '@pelagornis/page/overrides/Footer.astro',
          PageFrame: '@pelagornis/page/overrides/PageFrame.astro',
          Sidebar: '@pelagornis/page/overrides/Sidebar.astro',
          TwoColumnContent: '@pelagornis/page/overrides/TwoColumnContent.astro',
          ContentPanel: '@pelagornis/page/overrides/ContentPanel.astro',
          Search: '@pelagornis/page/overrides/Search.astro',
          ThemeSelect: '@pelagornis/page/overrides/ThemeSelect.astro',
          LanguageSelect: '@pelagornis/page/overrides/LanguageSelect.astro',
          SocialIcons: '@pelagornis/page/overrides/SocialIcons.astro',
          MarkdownContent: '@pelagornis/page/overrides/MarkdownContent.astro',
          Hero: '@pelagornis/page/overrides/Hero.astro',
          MobileMenuToggle: '@pelagornis/page/overrides/MobileMenuToggle.astro',
        };

        // skipComponents에 포함된 컴포넌트나 사용자가 이미 설정한 컴포넌트는 제외
        const components: Record<string, string> = {};
        for (const [key, value] of Object.entries(defaultComponents)) {
          if (!skipComponents.includes(key) && !(key in existingComponents)) {
            components[key] = value;
          }
        }

        updateConfig({
          components: {
            ...components,
            ...existingComponents, // 사용자가 설정한 컴포넌트가 최우선
          },
          customCss: [
            ...(config.customCss ?? []),
            '@pelagornis/page/styles.css',
          ],
        });
      },
    },
  };
}