# Starlight Theme Page

A Starlight plugin that uses RefineUI for the docs shell.

![Official](https://badge.pelagornis.com/official.svg)
[![npm version](https://img.shields.io/npm/v/@pelagornis/page.svg)](https://www.npmjs.com/package/@pelagornis/page)
[![stars](https://img.shields.io/github/stars/pelagornis/starlight-theme-page.svg)](https://github.com/pelagornis/starlight-theme-page)

## Requirements

Node.js 22.23.4 or later, Astro 7, Starlight 0.42, and React 19 with `@astrojs/react` 7. Upgrading from 1.x? See [the repository README](https://github.com/pelagornis/starlight-theme-page#upgrading-from-1x).

## Install

```bash
bun add @pelagornis/page @astrojs/react react react-dom
```

`@astrojs/starlight`, `@astrojs/react`, `react`, and `react-dom` are peer dependencies. `@astrojs/markdoc` is an optional peer for the Markdoc preset. The plugin registers React and Tailwind, and injects the RefineUI stylesheets.

## Configure

```ts
// astro.config.ts
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import pagePlugin from "@pelagornis/page";

export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      plugins: [
        pagePlugin({
          navigation: [
            { href: "/guides/getting-started/", label: "Guide", translations: { ko: "가이드" } },
            { sidebar: "Components" },
          ],
          footerText: "© 2026 Example",
        }),
      ],
    }),
  ],
});
```

| Option | Use |
| --- | --- |
| `navigation` | Header items. A link (`{ label, href }`) or a dropdown (`{ label, items }`, or `{ sidebar: "Group label" }` to fill it from a top-level sidebar group). Dropdown links show a short `description` under the label; the panel grows with it, so keep it to a few words. Every item takes `translations` keyed by locale `lang`. |
| `footerText` | Footer copyright line. |
| `siteTitle` | Brand text in the header. Defaults to the Starlight `title`. |
| `breadcrumbs` | Sidebar trail above each page title. Defaults to `true`. |
| `llmsTxt` | Writes `llms.txt`, `llms-full.txt`, and a Markdown copy of each page at build time. Files you put in `public/` win. Pass `{ title, description, details }` to change the summary, or `false` to turn it off. Defaults to `true`. |
| `skipComponents` | Starlight slots that keep the default implementation. |

The header search matches page titles and, in production builds, page text through Pagefind. UI strings follow Starlight's translations; the strings Starlight doesn't ship come in English, Korean, Japanese, and Chinese.

## Entry points

| Import | Contents |
| --- | --- |
| `@pelagornis/page` | The Starlight plugin |
| `@pelagornis/page/components` | Every export of `@refineui/react` |
| `@pelagornis/page/markdoc` | `pageMarkdoc()` preset with tags for server-rendered components |
| `@pelagornis/page/table` | `tableClasses`, the RefineUI Table class names for plain table markup |

Markdown tables in `.md`, `.mdx`, and `.mdoc` pages render with the RefineUI Table markup automatically.

```mdx
import { Button } from "@pelagornis/page/components";

<Button variant="primary">Continue</Button>
```

```js
// markdoc.config.mjs
import { defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";
import pageMarkdoc from "@pelagornis/page/markdoc";

export default defineMarkdocConfig({
  extends: [starlightMarkdoc(), pageMarkdoc()],
});
```

## Shell

Overrides: `PageFrame`, `Header`, `SiteTitle`, `ThemeSelect`, `LanguageSelect`, `Sidebar`, `MobileMenuFooter`, `PageSidebar`, `TableOfContents`, `MobileTableOfContents`, `Footer`, `Pagination`, `PageTitle`, `Hero`.

Starlight's Aside, Badge, Tabs, and Steps are restyled with RefineUI tokens. Card and LinkCard render as a RefineUI Card, and FileTree as a RefineUI Tree. The plugin supports Starlight 0.42.

## License

MIT. See [LICENSE](../../LICENSE).
