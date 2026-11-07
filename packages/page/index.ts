import react from '@astrojs/react';
import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translations } from './i18n.ts';
import { llmsTxt } from './llms/index.ts';
import { registerRefineUIAside } from './markdown/aside.ts';
import { registerRefineUITable } from './markdown/rehype-table.ts';

const require = createRequire(import.meta.url);
const overridesDir = path.dirname(fileURLToPath(import.meta.url));

function override(name: string) {
  return path.join(overridesDir, 'overrides', name);
}

export interface NavigationLink {
  label: string;
  href: string;
  /** Labels per locale `lang`, e.g. `{ ko: '가이드' }`. */
  translations?: Record<string, string>;
  /** Second line under the label in a dropdown. A string, or one per locale `lang`. */
  description?: string | Record<string, string>;
}

export interface NavigationMenu {
  /** Defaults to the sidebar group label when `sidebar` is set. */
  label?: string;
  translations?: Record<string, string>;
  /** Dropdown links. */
  items?: NavigationLink[];
  /** Label of a top-level sidebar group, as written in the Starlight config, to fill the dropdown from. */
  sidebar?: string;
}

export type NavigationItem = NavigationLink | NavigationMenu;

export interface pageConfig {
  navigation?: NavigationItem[];
  siteTitle?: string;
  footerText?: string;
  /** Sidebar trail above each page title. Defaults to `true`. */
  breadcrumbs?: boolean;
  /**
   * Writes `llms.txt`, `llms-full.txt`, and a Markdown copy of each page at build time.
   * Files in `public/` with the same names win. Defaults to `true`.
   */
  llmsTxt?: boolean | LlmsTxtConfig;
  skipComponents?: string[];
}

export interface LlmsTxtConfig {
  /** Defaults to the Starlight `title`. */
  title?: string;
  /** Defaults to the Starlight `description`. */
  description?: string;
  /** Markdown placed after the description in `llms.txt`. */
  details?: string;
}

export type pageUserConfig = pageConfig;

type ExpressiveCodeOptions = Exclude<StarlightUserConfig['expressiveCode'], boolean | undefined>;

const codeStyleOverrides = {
  borderRadius: 'var(--refineui-radius-rounded-large)',
  borderWidth: 'var(--refineui-stroke-width-thin)',
  borderColor: 'var(--refineui-color-alias-border-default)',
  codeBackground: 'var(--refineui-color-alias-surface-sunken)',
  codeForeground: 'var(--refineui-color-alias-foreground-primary)',
  codeFontSize: 'var(--refineui-typography-body-2-font-size)',
  codeLineHeight: 'var(--refineui-typography-body-1-line-height)',
  codePaddingBlock: 'var(--refineui-spacing-size-large)',
  codePaddingInline: 'var(--refineui-spacing-size-x-large)',
  codeSelectionBackground: 'var(--refineui-color-alias-background-surface-selected)',
  focusBorder: 'var(--refineui-color-alias-border-focus)',
  scrollbarThumbColor: 'var(--refineui-color-alias-border-default)',
  scrollbarThumbHoverColor: 'var(--refineui-color-alias-border-hover)',
  uiFontFamily: 'var(--refineui-text-body-sm-font-family)',
  uiFontSize: 'var(--refineui-typography-caption-2-font-size)',
  uiFontWeight: 'var(--refineui-typography-caption-2-font-weight)',
  uiLineHeight: 'var(--refineui-typography-caption-2-line-height)',
  uiPaddingBlock: 'var(--refineui-spacing-size-x-small)',
  uiPaddingInline: 'var(--refineui-spacing-size-x-large)',
  uiSelectionBackground: 'var(--refineui-color-alias-background-surface-selected)',
  uiSelectionForeground: 'var(--refineui-color-alias-foreground-primary)',
  frames: {
    shadowColor: 'transparent',
    frameBoxShadowCssValue: 'none',
    editorBackground: 'var(--refineui-color-alias-surface-sunken)',
    terminalBackground: 'var(--refineui-color-alias-surface-sunken)',
    editorTabBarBackground: 'var(--refineui-color-alias-background-primary)',
    editorTabBarBorderColor: 'var(--refineui-color-alias-border-default)',
    editorTabBarBorderBottomColor: 'var(--refineui-color-alias-border-default)',
    editorActiveTabBackground: 'var(--refineui-color-alias-surface-sunken)',
    editorActiveTabForeground: 'var(--refineui-color-alias-foreground-primary)',
    editorActiveTabBorderColor: 'transparent',
    editorActiveTabIndicatorTopColor: 'var(--refineui-color-alias-foreground-primary)',
    editorActiveTabIndicatorBottomColor: 'transparent',
    editorActiveTabIndicatorHeight: 'var(--refineui-stroke-width-thick)',
    terminalTitlebarBackground: 'var(--refineui-color-alias-background-primary)',
    terminalTitlebarForeground: 'var(--refineui-color-alias-foreground-secondary)',
    terminalTitlebarBorderBottomColor: 'var(--refineui-color-alias-border-default)',
    terminalTitlebarDotsForeground: 'var(--refineui-color-alias-foreground-tertiary)',
    terminalTitlebarDotsOpacity: '1',
    inlineButtonBackground: 'var(--refineui-color-alias-background-primary)',
    inlineButtonBackgroundIdleOpacity: '0',
    inlineButtonBackgroundHoverOrFocusOpacity: '1',
    inlineButtonBackgroundActiveOpacity: '1',
    inlineButtonForeground: 'var(--refineui-color-alias-foreground-secondary)',
    inlineButtonBorder: 'var(--refineui-color-alias-border-default)',
    inlineButtonBorderOpacity: '1',
    tooltipSuccessBackground: 'var(--refineui-color-alias-surface-inverse)',
    tooltipSuccessForeground: 'var(--refineui-color-alias-foreground-inversed)',
  },
  textMarkers: {
    markBackground: 'var(--refineui-color-alias-background-surface-selected)',
    markBorderColor: 'var(--refineui-color-alias-border-default)',
    insBackground: 'color-mix(in srgb, var(--refineui-color-alias-background-success-subtle) 45%, transparent)',
    insBorderColor: 'var(--refineui-color-alias-border-success)',
    insDiffIndicatorColor: 'var(--refineui-color-alias-foreground-success)',
    delBackground: 'color-mix(in srgb, var(--refineui-color-alias-background-error-subtle) 45%, transparent)',
    delBorderColor: 'var(--refineui-color-alias-border-error)',
    delDiffIndicatorColor: 'var(--refineui-color-alias-foreground-error)',
    inlineMarkerBorderRadius: 'var(--refineui-radius-rounded-small)',
  },
} satisfies NonNullable<ExpressiveCodeOptions['styleOverrides']>;

function expressiveCodeConfig(
  userOptions: StarlightUserConfig['expressiveCode'],
): StarlightUserConfig['expressiveCode'] {
  if (userOptions === false) return false;
  const options: ExpressiveCodeOptions = userOptions === true || userOptions === undefined ? {} : userOptions;
  const user = options.styleOverrides ?? {};
  const frames = { ...codeStyleOverrides.frames, ...user.frames };
  const textMarkers = { ...codeStyleOverrides.textMarkers, ...user.textMarkers };
  return {
    useStarlightUiThemeColors: true,
    ...options,
    styleOverrides: { ...codeStyleOverrides, ...user, frames, textMarkers },
  };
}

function readSvg(file: string | undefined, root: URL) {
  if (!file?.endsWith('.svg')) return undefined;
  const svg = readFileSync(new URL(`./${file.replace(/^\.?\//, '')}`, root), 'utf8');
  return svg
    .replace(/<\?xml[^>]*>/, '')
    .replace(/<svg\b/, '<svg aria-hidden="true" data-refineui-docs-logo-mark')
    .trim();
}

/** SVG logos are inlined so marks drawn with `currentColor` follow the theme's foreground color. */
function inlineLogo(logo: StarlightUserConfig['logo'], root: URL) {
  if (!logo) return undefined;
  if ('src' in logo) {
    const src = readSvg(logo.src, root);
    return src ? { src } : undefined;
  }
  const dark = readSvg(logo.dark, root);
  const light = readSvg(logo.light, root);
  return dark && light ? { dark, light } : undefined;
}

const refineUIContentComponents = [
  'Aside.astro',
  'Badge.astro',
  'Card.astro',
  'FileTree.astro',
  'LinkButton.astro',
  'LinkCard.astro',
  'Tabs.astro',
];

/**
 * Content components are not component slots, so Starlight's own imports of them
 * (used by MDX pages and the Markdoc tags) are pointed at the RefineUI versions.
 */
function refineUIContentComponentsPlugin() {
  return {
    name: 'page-refineui-content-components',
    enforce: 'pre' as const,
    resolveId(source: string, importer: string | undefined) {
      const name = source.replace('./user-components/', '');
      if (name === source || !refineUIContentComponents.includes(name)) return null;
      if (!importer?.replaceAll('\\', '/').includes('/@astrojs/starlight/')) return null;
      return override(name);
    },
  };
}

/** The default locale's string for options Starlight accepts per language. */
function defaultLocaleText(config: StarlightUserConfig, value: string | Record<string, string> | undefined) {
  if (typeof value !== 'object') return value;
  const locales = config.locales as Record<string, { lang?: string }> | undefined;
  const lang = locales?.root?.lang ?? locales?.[config.defaultLocale ?? '']?.lang ?? 'en';
  return value[lang] ?? Object.values(value)[0];
}

export default function pagePlugin(userConfig?: pageUserConfig): StarlightPlugin {
  return {
    name: 'page-plugin',
    hooks: {
      'i18n:setup'({ injectTranslations }) {
        injectTranslations(translations);
      },
      'config:setup'({ config, astroConfig, updateConfig, addIntegration }) {
        addIntegration(react());
        addIntegration({
          name: 'page-refineui-tailwind',
          hooks: {
            'astro:config:setup'({ config: astroSetupConfig, updateConfig: updateAstroConfig }) {
              updateAstroConfig({
                vite: {
                  plugins: [tailwindcss(), refineUIContentComponentsPlugin()],
                },
              });
              registerRefineUITable(astroSetupConfig.markdown.processor);
              registerRefineUIAside(astroSetupConfig.markdown.processor);
            },
          },
        });

        if (userConfig?.llmsTxt !== false) {
          const llms = typeof userConfig?.llmsTxt === 'object' ? userConfig.llmsTxt : {};
          addIntegration(
            llmsTxt({
              title: llms.title ?? defaultLocaleText(config, config.title) ?? 'Documentation',
              description: llms.description ?? config.description,
              details: llms.details,
              excludeLocales: Object.keys(config.locales ?? {}).filter(
                (locale) => locale !== 'root' && locale !== config.defaultLocale,
              ),
            }),
          );
        }

        if (userConfig?.navigation) {
          process.env.PAGE_NAVIGATION = JSON.stringify(userConfig.navigation);
        }

        if (userConfig?.siteTitle) {
          process.env.PAGE_SITE_TITLE = userConfig.siteTitle;
        }

        if (userConfig?.footerText) {
          process.env.PAGE_FOOTER_TEXT = userConfig.footerText;
        }

        process.env.PAGE_BASE = astroConfig?.base ?? '';
        process.env.PAGE_BREADCRUMBS = String(userConfig?.breadcrumbs ?? true);

        const logoSvg = inlineLogo(config.logo, astroConfig.root);
        if (logoSvg) process.env.PAGE_LOGO_SVG = JSON.stringify(logoSvg);

        const customCss = [
          ...(config.customCss ?? []),
          require.resolve('./tailwind.css'),
          require.resolve('@refineui/web-icons/dist/fonts/refineui-system-icons.css'),
          require.resolve('@refineui/react/refineui.css'),
          require.resolve('./chrome.css'),
        ];

        const components: NonNullable<StarlightUserConfig['components']> = {
          PageFrame: override('PageFrame.astro'),
          Header: override('Header.astro'),
          SiteTitle: override('SiteTitle.astro'),
          ThemeSelect: override('ThemeSelect.astro'),
          LanguageSelect: override('LanguageSelect.astro'),
          Sidebar: override('Sidebar.astro'),
          MobileMenuFooter: override('MobileMenuFooter.astro'),
          PageSidebar: override('PageSidebar.astro'),
          TableOfContents: override('TableOfContents.astro'),
          MobileTableOfContents: override('MobileTableOfContents.astro'),
          Footer: override('Footer.astro'),
          Pagination: override('Pagination.astro'),
          PageTitle: override('PageTitle.astro'),
          Hero: override('Hero.astro'),
        };
        for (const name of userConfig?.skipComponents ?? []) {
          delete components[name as keyof typeof components];
        }

        updateConfig({ customCss, components, expressiveCode: expressiveCodeConfig(config.expressiveCode) });
      },
    },
  };
}
