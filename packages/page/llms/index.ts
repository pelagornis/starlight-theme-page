import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import type { Element, ElementContent, Root } from "hast";
import { select, selectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remove } from "unist-util-remove";

export interface LlmsTxtOptions {
  title: string;
  description?: string;
  /** Markdown placed after the description in `llms.txt`. */
  details?: string;
  /** Locale path prefixes to leave out, so the files cover one language. */
  excludeLocales?: string[];
}

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

interface Page {
  href: string;
  title: string;
  description: string;
  markdown: string;
}

const stripSelectors = [
  "script",
  "style",
  "link",
  "template",
  "svg",
  ".page-preview",
  ".sl-anchor-link",
  ".expressive-code .copy",
  "[data-pagefind-ignore]",
  '[data-refineui-docs-card] [aria-hidden="true"]',
  '[data-refineui-docs-link-card] [aria-hidden="true"]',
];

const parseHtml = unified().use(rehypeParse);

const toMarkdown = unified()
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify, { bullet: "-", fences: true });

/** Astro serializes island props as `[type, value]` pairs; type 0 is a plain value and type 1 an array. */
function deserialize(value: unknown): unknown {
  if (!Array.isArray(value) || value.length !== 2 || typeof value[0] !== "number") return value;
  const [type, inner] = value;
  if (type === 1 && Array.isArray(inner)) return inner.map(deserialize);
  if (type === 0 && inner && typeof inner === "object") {
    return Object.fromEntries(Object.entries(inner).map(([key, entry]) => [key, deserialize(entry)]));
  }
  return inner;
}

function sidebarGroups(tree: Root): NavGroup[] {
  const island = select('astro-island[component-export="DocsSidebar"]', tree);
  const props = island?.properties.props;
  if (typeof props !== "string") return [];
  const entries = deserialize(JSON.parse(props).entries) as Array<Record<string, unknown>>;
  const links = (items: Array<Record<string, unknown>>): NavLink[] =>
    items.flatMap((item) =>
      item.type === "group"
        ? links(item.entries as Array<Record<string, unknown>>)
        : item.external
          ? []
          : [{ label: String(item.label), href: String(item.href) }],
    );
  return entries
    .filter((entry) => entry.type === "group")
    .map((entry) => ({ label: String(entry.label), links: links(entry.entries as Array<Record<string, unknown>>) }));
}

function codeBlocks(content: Element) {
  for (const block of selectAll(".expressive-code", content)) {
    const pre = select("pre", block);
    const code = select("code", block);
    if (!pre || !code) continue;
    const title = toText(select("figcaption .title", block) ?? { type: "root", children: [] }).trim();
    const lang = typeof pre.properties.dataLanguage === "string" ? pre.properties.dataLanguage : "";
    const fenced: Element = {
      type: "element",
      tagName: "pre",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "code",
          properties: lang ? { className: [`language-${lang}`] } : {},
          children: [
            {
              type: "text",
              value: selectAll(".ec-line", code)
                .map((line) => toText(line, { whitespace: "pre" }).replace(/\n$/, ""))
                .join("\n"),
            },
          ],
        },
      ],
    };
    const label: ElementContent[] = title
      ? [{ type: "element", tagName: "p", properties: {}, children: [{ type: "element", tagName: "code", properties: {}, children: [{ type: "text", value: title }] }] }]
      : [];
    Object.assign(block, { tagName: "div", properties: {}, children: [...label, fenced] });
  }
}

/** Lists every tab of a tab set instead of only the one that is open. */
function tabSets(content: Element) {
  for (const set of selectAll('[data-refineui="tabs"]', content)) {
    const labels = selectAll('[role="tab"]', set).map((tab) => toText(tab).trim());
    const panels = selectAll('[role="tabpanel"]', set);
    if (labels.length === 0 || panels.length === 0) continue;
    const items: ElementContent[] = panels.map((panel, index) => ({
      type: "element",
      tagName: "li",
      properties: {},
      children: [
        { type: "element", tagName: "p", properties: {}, children: [{ type: "text", value: labels[index] ?? "" }] },
        ...panel.children,
      ],
    }));
    Object.assign(set, { tagName: "ul", properties: {}, children: items });
  }
}

function treeItems(node: Element, found: Element[] = []) {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    if (child.properties.role === "treeitem") found.push(child);
    else treeItems(child, found);
  }
  return found;
}

function treeLines(items: Element[], depth = 0): string[] {
  return items.flatMap((item) => {
    const group = select('[role="group"]', item);
    const entry = select("[data-refineui-docs-file-tree-entry]", item);
    const text = (selector: string) => {
      const node = entry && select(selector, entry);
      return node ? toText(node).trim() : "";
    };
    const name = text("[data-refineui-docs-file-tree-name]");
    const comment = text("[data-refineui-docs-file-tree-comment]");
    return [
      `${"  ".repeat(depth)}${name}${comment ? `  # ${comment}` : ""}`,
      ...(group ? treeLines(treeItems(group), depth + 1) : []),
    ];
  });
}

/** File trees are interactive Trees on the page; in Markdown they read as an indented listing. */
function fileTrees(content: Element) {
  for (const frame of selectAll("[data-refineui-docs-file-tree]", content)) {
    const tree = select('[role="tree"]', frame);
    const listing: ElementContent = { type: "text", value: tree ? treeLines(treeItems(tree)).join("\n") : "" };
    const code: Element = { type: "element", tagName: "code", properties: {}, children: [listing] };
    Object.assign(frame, { tagName: "pre", properties: {}, children: [code] });
  }
}

/**
 * RefineUI components rendered in the page body are live examples; only tables, tab sets,
 * and the cards the theme draws for Starlight's `<Card>` and `<LinkCard>` carry text worth keeping.
 */
function liveExamples(node: Root | Element, found = new Set<Element>()) {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    if (child.properties.dataRefineuiDocsCard !== undefined || child.properties.dataRefineuiDocsLinkCard !== undefined) continue;
    const role = child.properties.dataRefineui;
    if (role === "table" || role === "tabs") continue;
    if (role !== undefined) found.add(child);
    else liveExamples(child, found);
  }
  return found;
}

/** Points links to other pages at their Markdown copies. */
function pageLinks(content: Element, site: string) {
  for (const link of selectAll('a[href^="/"]', content)) {
    const [path, hash] = String(link.properties.href).split("#");
    if (!path.endsWith("/")) continue;
    link.properties.href = `${site}${mdPath(path)}${hash ? `#${hash}` : ""}`;
  }
}

function pageMarkdown(tree: Root, site: string): string {
  const content = select(".sl-markdown-content", tree);
  if (!content) return "";
  fileTrees(content);
  const stripped = liveExamples(content, new Set(stripSelectors.flatMap((selector) => selectAll(selector, content))));
  remove(content, (node) => node.type === "comment" || stripped.has(node as Element));
  codeBlocks(content);
  tabSets(content);
  pageLinks(content, site);
  const root: Root = { type: "root", children: content.children };
  return String(toMarkdown.stringify(toMarkdown.runSync(root))).trim();
}

function quote(text: string) {
  return text ? `> ${text}\n\n` : "";
}

function mdPath(href: string) {
  return href === "/" ? "/index.md" : `${href.replace(/\/$/, "")}.md`;
}

/** Files the site ships itself (from `public/`) are left as they are. */
async function writeUnlessShipped(file: string, contents: string) {
  const shipped = await access(file).then(
    () => true,
    () => false,
  );
  if (!shipped) await writeFile(file, contents);
  return !shipped;
}

export function llmsTxt(options: LlmsTxtOptions): AstroIntegration {
  let site = "";
  return {
    name: "page-llms-txt",
    hooks: {
      "astro:config:done": ({ config }) => {
        site = (config.site ?? "").replace(/\/$/, "");
      },
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const excluded = (options.excludeLocales ?? []).map((locale) => `${locale}/`);
        const byHref = new Map<string, Page>();
        let groups: NavGroup[] = [];

        const files = (await readdir(root, { recursive: true })).filter(
          (file) => file === "index.html" || file.endsWith(`${sep}index.html`),
        );
        for (const file of files) {
          const pathname = file.slice(0, -"index.html".length).split(sep).join("/");
          if (excluded.some((prefix) => pathname.startsWith(prefix))) continue;
          const tree = parseHtml.parse(await readFile(join(root, file), "utf8"));
          if (!select(".sl-markdown-content", tree)) continue;
          if (groups.length === 0) groups = sidebarGroups(tree);
          const href = `/${pathname}`;
          const title = toText(select("h1#_top", tree) ?? { type: "root", children: [] }).trim();
          const description = String(select('meta[name="description"]', tree)?.properties.content ?? "");
          byHref.set(href, { href, title, description, markdown: pageMarkdown(tree, site) });
        }

        const ordered = [
          byHref.get("/"),
          ...groups.flatMap((group) => group.links.map((link) => byHref.get(link.href))),
        ].filter((page): page is Page => Boolean(page));

        for (const page of ordered) {
          const out = join(root, mdPath(page.href));
          await mkdir(dirname(out), { recursive: true });
          await writeFile(out, `# ${page.title}\n\n${quote(page.description)}${page.markdown}\n`);
        }

        const summary = options.description ? `\n\n> ${options.description}` : "";
        const index = [
          `# ${options.title}${summary}`,
          ...(options.details ? [options.details.trim()] : []),
          `Every page is also available as Markdown at its URL with \`.md\` in place of the trailing slash. [llms-full.txt](${site}/llms-full.txt) has all pages in one file.`,
          ...groups.map((group) =>
            [
              `## ${group.label}`,
              ...group.links
                .map((link) => byHref.get(link.href))
                .filter((page): page is Page => Boolean(page))
                .map((page) => `- [${page.title}](${site}${mdPath(page.href)})${page.description ? `: ${page.description}` : ""}`),
            ].join("\n"),
          ),
        ].join("\n\n");
        const wroteIndex = await writeUnlessShipped(join(root, "llms.txt"), `${index}\n`);

        const full = ordered
          .map((page) => `# ${page.title}\n\nSource: ${site}${page.href}\n\n${quote(page.description)}${page.markdown}`)
          .join("\n\n---\n\n");
        const wroteFull = await writeUnlessShipped(join(root, "llms-full.txt"), `# ${options.title}${summary}\n\n---\n\n${full}\n`);

        const written = [wroteIndex && "llms.txt", wroteFull && "llms-full.txt"].filter(Boolean).join(", ");
        logger.info(`${written ? `${written} and ` : ""}${ordered.length} Markdown pages written`);
      },
    },
  };
}
