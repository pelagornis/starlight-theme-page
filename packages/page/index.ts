import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';

export interface NavigationItem {
  href: string;
  label: string;
}

export interface pageConfig {
  navigation?: NavigationItem[];
  siteTitle?: string;
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

        updateConfig({
          components: {
            Header: '@pelagornis/page/overrides/Header.astro',
            PageFrame: '@pelagornis/page/overrides/PageFrame.astro',
            Sidebar: '@pelagornis/page/overrides/Sidebar.astro',
            TwoColumnContent: '@pelagornis/page/overrides/TwoColumnContent.astro',
            ContentPanel: '@pelagornis/page/overrides/ContentPanel.astro',
            Search: '@pelagornis/page/overrides/Search.astro',
            ThemeSelect: '@pelagornis/page/overrides/ThemeSelect.astro',
            LanguageSelect: '@pelagornis/page/overrides/LanguageSelect.astro',
            SocialIcons: '@pelagornis/page/overrides/SocialIcons.astro',
            Footer: '@pelagornis/page/overrides/Footer.astro',
            MarkdownContent: '@pelagornis/page/overrides/MarkdownContent.astro',
            Hero: '@pelagornis/page/overrides/Hero.astro',
            MobileMenuToggle: '@pelagornis/page/overrides/MobileMenuToggle.astro',
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