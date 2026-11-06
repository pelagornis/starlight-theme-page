import { tableClassList, type TablePart } from "./table.ts";

type Properties = Record<string, unknown>;
type Element = { type: "element"; tagName: string; properties?: Properties; children: Node[] };
type Parent = { type: string; children: Node[] };
type Node = Element | Parent | { type: string };

const parts = new Set<string>(["thead", "tbody", "tfoot", "tr", "th", "td", "caption"]);

function isElement(node: Node): node is Element {
  return node.type === "element";
}

function hasChildren(node: Node): node is Parent {
  return Array.isArray((node as Parent).children);
}

function classNames(node: Pick<Element, "properties">, part: TablePart): string[] {
  const current = node.properties?.className;
  const existing = Array.isArray(current) ? current.map(String) : typeof current === "string" ? current.split(/\s+/) : [];
  return [...tableClassList(part), ...existing];
}

function wrapper(children: Node[]): Element {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: [...tableClassList("wrapper"), "not-content"],
      dataRefineui: "table",
      dataPageTable: "",
    },
    children,
  };
}

function decorate(node: Element, inHeader: boolean) {
  for (const child of node.children) {
    if (!isElement(child)) continue;
    const header = inHeader || child.tagName === "thead";
    const properties = (child.properties ??= {});
    if (parts.has(child.tagName)) properties.className = classNames(child, child.tagName as TablePart);
    if (child.tagName === "tr") properties.dataRefineui = "table-row";
    if (child.tagName === "th" && header) properties.scope ??= "col";
    decorate(child, header);
  }
}

function transform(parent: Parent) {
  parent.children = parent.children.map((child) => {
    if (!isElement(child)) return child;
    if (child.tagName === "table") {
      (child.properties ??= {}).className = classNames(child, "table");
      decorate(child, false);
      return wrapper([child]);
    }
    if (hasChildren(child)) transform(child);
    return child;
  });
}

/** Rehype plugin for the `unified` Markdown processor. */
export function rehypeRefineUITable() {
  return (tree: Parent) => transform(tree);
}

type SatteriElement = Readonly<Pick<Element, "tagName" | "properties">>;
type SatteriContext = {
  setProperty(node: SatteriElement, key: string, value: unknown): void;
  wrapNode(node: SatteriElement, parentNode: Element): void;
  parent(node: SatteriElement): Readonly<{ type: string; tagName?: string }> | undefined;
};

function inTableHeader(node: SatteriElement, ctx: SatteriContext): boolean {
  let parent = ctx.parent(node);
  while (parent && parent.type === "element") {
    if (parent.tagName === "thead") return true;
    if (parent.tagName === "table") return false;
    parent = ctx.parent(parent as SatteriElement);
  }
  return false;
}

/** HAST plugin for Astro's default Sätteri Markdown processor. */
export function satteriRefineUITable() {
  return {
    name: "pelagornis-refineui-table",
    element: [
      {
        filter: ["table"],
        visit(node: SatteriElement, ctx: SatteriContext) {
          ctx.setProperty(node, "className", classNames(node, "table"));
          ctx.wrapNode(node, wrapper([]));
        },
      },
      {
        filter: [...parts],
        visit(node: SatteriElement, ctx: SatteriContext) {
          ctx.setProperty(node, "className", classNames(node, node.tagName as TablePart));
          if (node.tagName === "tr") ctx.setProperty(node, "dataRefineui", "table-row");
          if (node.tagName === "th" && node.properties?.scope === undefined && inTableHeader(node, ctx)) {
            ctx.setProperty(node, "scope", "col");
          }
        },
      },
    ],
  };
}

type MarkdownProcessor = { options?: { hastPlugins?: unknown[]; rehypePlugins?: unknown[] } } | undefined;

/** Registers the table transform on whichever Markdown processor Astro is configured with. */
export function registerRefineUITable(processor: MarkdownProcessor) {
  if (Array.isArray(processor?.options?.hastPlugins)) processor.options.hastPlugins.push(satteriRefineUITable());
  else if (Array.isArray(processor?.options?.rehypePlugins)) processor.options.rehypePlugins.push(rehypeRefineUITable);
}
