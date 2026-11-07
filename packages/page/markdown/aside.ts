import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Element, ElementContent, Root } from "hast";
import { toHtml } from "hast-util-to-html";
import rehypeParse from "rehype-parse";
import { unified } from "unified";
import { DocsAside, type AsideType } from "../overrides/DocsAside.ts";

const require = createRequire(import.meta.url);
const starlightDist = path.dirname(require.resolve("@astrojs/starlight/components"));
const { Icons } = (await import(/* @vite-ignore */ pathToFileURL(path.join(starlightDist, "components-internals/Icons.js")).href)) as {
  Icons: Record<string, string>;
};

const parser = unified().use(rehypeParse, { fragment: true });
const parse = (html: string) => parser.parse(html) as Root;

/** Icons Starlight puts on a `:::type` aside when none is given. */
const defaultIcons: Record<AsideType, string> = {
  note: "information",
  tip: "rocket",
  caution: "warning",
  danger: "error",
};

const isElement = (node: unknown): node is Element => (node as Element)?.type === "element";

function svgMarkup(html: string): string | undefined {
  const svg = parse(html).children.find((child): child is Element => isElement(child) && child.tagName === "svg");
  return svg ? toHtml(svg.children) : undefined;
}

const defaultIconMarkup = Object.fromEntries(
  Object.entries(defaultIcons).map(([type, name]) => [type, svgMarkup(`<svg>${Icons[name]}</svg>`)]),
) as Record<AsideType, string>;

type MdxFragment = { type: "mdxJsxTextElement"; attributes?: Array<{ name?: string; value?: unknown }> };

/**
 * The title icon's SVG body. Starlight writes it as an `<svg>` element, as raw HTML in Markdown,
 * or as a `<Fragment set:html>` in MDX.
 */
function iconOf(node: ElementContent): string | undefined {
  if (isElement(node)) return node.tagName === "svg" ? toHtml(node.children) : undefined;
  if (node.type === "raw") return svgMarkup(node.value);
  const fragment = node as unknown as MdxFragment;
  if (fragment.type !== "mdxJsxTextElement") return undefined;
  const html = fragment.attributes?.find((attribute) => attribute.name === "set:html")?.value;
  return typeof html === "string" ? svgMarkup(html) : undefined;
}

function classList(node: Element): string[] {
  const value = node.properties?.className ?? node.properties?.class;
  return Array.isArray(value) ? value.map(String) : typeof value === "string" ? value.split(/\s+/) : [];
}

function asideType(node: Element): AsideType | undefined {
  if (node.tagName !== "aside" || !classList(node).includes("starlight-aside")) return undefined;
  const type = classList(node)
    .find((name) => name.startsWith("starlight-aside--"))
    ?.slice("starlight-aside--".length);
  return type && type in defaultIcons ? (type as AsideType) : undefined;
}

function textOf(nodes: ElementContent[]): string {
  return nodes
    .map((node) => (node.type === "text" ? node.value : isElement(node) && node.tagName !== "svg" ? textOf(node.children) : ""))
    .join("");
}

function replaceMarker(parent: Element | Root, marker: string, nodes: ElementContent[]): boolean {
  const index = parent.children.findIndex((child) => isElement(child) && child.properties?.[marker] !== undefined);
  if (index !== -1) {
    parent.children.splice(index, 1, ...nodes);
    return true;
  }
  return parent.children.some((child) => isElement(child) && replaceMarker(child, marker, nodes));
}

/** Starlight's `:::type` aside markup redrawn with the same RefineUI Alert `<Aside>` renders. */
export function refineUIAside(node: Element): Element | undefined {
  const type = asideType(node);
  if (!type) return undefined;
  const [titleNode, contentNode] = node.children.filter(isElement);
  const iconNode = titleNode?.children.find((child) => iconOf(child) !== undefined);
  const customIcon = iconNode && iconOf(iconNode) !== defaultIconMarkup[type] ? iconNode : undefined;
  const title = textOf(titleNode?.children ?? []).trim();
  const content = withAsides(contentNode?.children ?? []);

  const markup = renderToStaticMarkup(
    createElement(
      DocsAside,
      { type, title, customIcon: Boolean(customIcon), icon: createElement("span", { "data-page-aside-icon": "" }) },
      createElement("span", { "data-page-aside-content": "" }),
    ),
  );
  const alert = parse(markup).children[0] as Element;
  if (customIcon) replaceMarker(alert, "dataPageAsideIcon", [customIcon]);
  replaceMarker(alert, "dataPageAsideContent", content);
  return alert;
}

/** Copies instead of editing in place: Sätteri hands visitors read-only nodes. */
function withAsides(nodes: readonly ElementContent[]): ElementContent[] {
  return nodes.map((node) => {
    if (!isElement(node)) return node;
    return (
      refineUIAside(node) ?? {
        type: "element",
        tagName: node.tagName,
        properties: node.properties,
        children: withAsides(node.children),
      }
    );
  });
}

/** Rehype plugin for the `unified` Markdown processor. */
export function rehypeRefineUIAside() {
  return (tree: Root) => {
    tree.children = withAsides(tree.children as ElementContent[]) as Root["children"];
  };
}

type SatteriContext = { replaceNode(node: Readonly<Element>, newNode: Element): void };

type MarkdownProcessor = { options?: { hastPlugins?: unknown[]; rehypePlugins?: unknown[] } } | undefined;

/** Registers the aside transform on whichever Markdown processor Astro is configured with. */
export function registerRefineUIAside(processor: MarkdownProcessor) {
  if (Array.isArray(processor?.options?.hastPlugins)) processor.options.hastPlugins.push(satteriRefineUIAside());
  else if (Array.isArray(processor?.options?.rehypePlugins)) processor.options.rehypePlugins.push(rehypeRefineUIAside);
}

/** HAST plugin for Astro's default Sätteri Markdown processor. */
export function satteriRefineUIAside() {
  return {
    name: "pelagornis-refineui-aside",
    element: [
      {
        filter: ["aside"],
        visit(node: Readonly<Element>, ctx: SatteriContext) {
          const alert = refineUIAside(node as Element);
          if (alert) ctx.replaceNode(node, alert);
        },
      },
    ],
  };
}
