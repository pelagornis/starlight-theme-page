# <img src="/assets/page-dark.svg" alt="" align="left" width="40" height="40"> Starlight Theme Page

> A Starlight theme that uses RefineUI for the docs shell.

![Official](https://badge.pelagornis.com/official.svg)
[![npm version](https://img.shields.io/npm/v/@pelagornis/page.svg)](https://www.npmjs.com/package/@pelagornis/page)
[![license](https://img.shields.io/npm/l/@pelagornis/page.svg)](https://github.com/pelagornis/starlight-theme-page/blob/main/LICENSE)
[![stars](https://img.shields.io/github/stars/pelagornis/starlight-theme-page.svg)](https://github.com/pelagornis/starlight-theme-page)

## Requirements

- Node.js 22.23.4 or later
- Astro 7 and Starlight 0.42
- React 19 with `@astrojs/react` 7

## Install

```bash
bun add @pelagornis/page @astrojs/react react react-dom
```

npm, pnpm, and Yarn work too. `@astrojs/starlight`, `@astrojs/react`, `react`, and `react-dom` are peer dependencies, and `@astrojs/markdoc` is an optional one for the Markdoc preset. The plugin registers React and Tailwind, and injects the RefineUI stylesheets.

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

## Use components in pages

Every RefineUI component is exported from `@pelagornis/page/components`.

```mdx
import { Button } from "@pelagornis/page/components";

<Button variant="primary">Continue</Button>
```

Compound components such as `Tabs` or `Dialog` share React state, so compose them in a `.tsx` file and import that file with `client:load`.

For Markdoc, add the preset and write tags:

```js
// markdoc.config.mjs
import { defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";
import pageMarkdoc from "@pelagornis/page/markdoc";

export default defineMarkdocConfig({
  extends: [starlightMarkdoc(), pageMarkdoc()],
});
```

```md
{% button variant="primary" %}Continue{% /button %}
```

Markdown tables render with the RefineUI Table markup. Starlight's Aside, Badge, Tabs, and Steps are restyled with RefineUI tokens. Card and LinkCard render as a RefineUI Card, and FileTree as a RefineUI Tree. The docs site has a page for each of the 59 components with a live preview, example source, MDX and Markdoc usage, and props.

## Shell

Starlight slots replaced with RefineUI:

`PageFrame`, `Header`, `SiteTitle`, `ThemeSelect`, `LanguageSelect`, `Sidebar`, `MobileMenuFooter`, `PageSidebar`, `TableOfContents`, `MobileTableOfContents`, `Footer`, `Pagination`, `PageTitle`, `Hero`.

- The header search (<kbd>⌘</kbd> <kbd>K</kbd>) matches page titles, and in production builds page text through Pagefind.
- UI strings follow Starlight's translations. Strings Starlight doesn't ship come in English, Korean, Japanese, and Chinese.
- SVG logos are inlined, so a mark drawn with `fill="currentColor"` follows the theme.

List slot names in `skipComponents` to keep the Starlight default for them.

## Upgrading from 1.x

2.0 rebuilds the shell on `@refineui/react`.

- Update to Astro 7, Starlight 0.42, React 19, and Node.js 22.23.4 or later, then add `@astrojs/react`, `react`, and `react-dom`.
- The `./styles`, `./overrides/*`, and `./components/*.astro` entry points are gone. Import components from `@pelagornis/page/components` instead.
- The `docChat` option and the `./doc-chat` entry point are removed. Use `llms.txt` for AI tools.
- `navigation` still accepts `{ href, label }` links, and now also takes dropdowns.

## Develop

This repository uses Bun workspaces.

```bash
bun install
bun run start
```

## License

MIT. See [LICENSE](LICENSE).
