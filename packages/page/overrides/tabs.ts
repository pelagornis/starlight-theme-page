import type { Element, Root } from "hast";
import { toHtml } from "hast-util-to-html";
import rehypeParse from "rehype-parse";
import { unified } from "unified";

export interface TabPanel {
  label: string;
  icon?: string;
  html: string;
}

const parser = unified().use(rehypeParse, { fragment: true });

function tabItems(node: Root | Element, found: Element[] = []) {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    if (child.tagName === "starlight-tab-item") found.push(child);
    else tabItems(child, found);
  }
  return found;
}

const isStylesheet = (node: Element) =>
  node.tagName === "link" && [node.properties.rel].flat().map(String).includes("stylesheet");

/** Removes stylesheet links from `node`, collecting their markup. */
function takeStylesheets(node: Root | Element, found: Set<string>) {
  node.children = node.children.filter((child) => {
    if (child.type !== "element") return true;
    if (isStylesheet(child)) {
      found.add(toHtml(child));
      return false;
    }
    takeStylesheets(child, found);
    return true;
  }) as typeof node.children;
}

/**
 * Reads the `<TabItem>`s Starlight renders into `<Tabs>`; tab sets nested in a panel stay in that panel.
 * `@astrojs/react` drops `<link rel="stylesheet">` from island HTML, so panel stylesheets
 * (such as Expressive Code's) come back separately to be rendered outside the island.
 */
export function parseTabs(html: string): { panels: TabPanel[]; stylesheets: string[] } {
  const tree = parser.parse(html);
  const stylesheets = new Set<string>();
  takeStylesheets(tree, stylesheets);
  const panels = tabItems(tree).map((item) => ({
    label: String(item.properties.dataLabel ?? ""),
    icon: item.properties.dataIcon ? String(item.properties.dataIcon) : undefined,
    html: toHtml(item.children),
  }));
  return { panels, stylesheets: [...stylesheets] };
}
