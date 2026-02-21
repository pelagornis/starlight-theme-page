import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface NavigationItem {
  href: string;
  label: string;
}

export type DocChatProvider = 'openai' | 'claude' | 'gemini';

export interface DocChatConfig {
  /** LLM to use (openai | claude | gemini). API keys are set in the site .env */
  provider?: DocChatProvider;
  /** Model ID (optional; uses provider default when not set) */
  model?: string;
}

export interface pageConfig {
  navigation?: NavigationItem[];
  siteTitle?: string;
  footerText?: string;
  /** Doc-based chat: choose provider (default openai). /api/chat is injected by page */
  docChat?: DocChatConfig;
  skipComponents?: string[];
}

export type pageUserConfig = pageConfig;

export default function pagePlugin(userConfig?: pageUserConfig): StarlightPlugin {
  return {
    name: 'page-plugin',
    hooks: {
      setup({ config, astroConfig, updateConfig, addIntegration }) {
        if (userConfig?.navigation) {
          process.env.PAGE_NAVIGATION = JSON.stringify(userConfig.navigation);
        }
        
        if (userConfig?.siteTitle) {
          process.env.PAGE_SITE_TITLE = userConfig.siteTitle;
        }
        
        if (userConfig?.footerText) {
          process.env.PAGE_FOOTER_TEXT = userConfig.footerText;
        }

        if (userConfig?.docChat != null) {
          process.env.PAGE_DOC_CHAT_ENABLED = '1';
          if (userConfig.docChat.provider != null) {
            process.env.PAGE_DOC_CHAT_PROVIDER = userConfig.docChat.provider;
          }
          if (userConfig.docChat.model != null) {
            process.env.PAGE_DOC_CHAT_MODEL = userConfig.docChat.model;
          }
          addIntegration({
            name: 'page-doc-chat-api',
            hooks: {
              'astro:config:setup': async ({ injectRoute }) => {
                injectRoute({
                  pattern: '/api/chat/[provider]',
                  entrypoint: path.join(__dirname, 'api', 'chat-[provider].ts'),
                  prerender: false,
                });
              },
            },
          });
        }

        process.env.PAGE_BASE = astroConfig?.base ?? '';

        // Do not override components already set by the user
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

        // Exclude components in skipComponents or already set by the user
        const components: Record<string, string> = {};
        for (const [key, value] of Object.entries(defaultComponents)) {
          if (!skipComponents.includes(key) && !(key in existingComponents)) {
            components[key] = value;
          }
        }

        const customCss = [
          ...(config.customCss ?? []),
          '@pelagornis/page/styles.css',
          '@refineui/web-icons/dist/fonts/refineui-system-icons.css',
        ];
        updateConfig({
          components: {
            ...components,
            ...existingComponents, // User-set components take precedence
          },
          customCss,
        });
      },
    },
  };
}