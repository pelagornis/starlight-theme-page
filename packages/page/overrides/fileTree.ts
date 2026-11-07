import type { Element, ElementContent } from "hast";
import { select } from "hast-util-select";
import { toText } from "hast-util-to-text";
import rehypeParse from "rehype-parse";
import { unified } from "unified";

export interface FileTreeEntry {
  name: string;
  directory: boolean;
  highlight: boolean;
  placeholder: boolean;
  comment?: string;
  children: FileTreeEntry[];
}

const parser = unified().use(rehypeParse, { fragment: true });

const isElement = (node: ElementContent, tagName: string): node is Element =>
  node.type === "element" && node.tagName === tagName;

/** Reads the Markdown list Starlight's `<FileTree>` takes, with the same rules for directories, `**highlights**`, comments, and `…`. */
export function parseFileTree(html: string): FileTreeEntry[] {
  const list = select("ul", parser.parse(html));
  return list ? listEntries(list) : [];
}

function listEntries(list: Element): FileTreeEntry[] {
  return list.children
    .filter((node): node is Element => isElement(node, "li"))
    .map((item) => {
      const nodes = item.children
        .flatMap((node) => (isElement(node, "p") ? node.children : [node]))
        .filter((node) => node.type !== "comment" && !(node.type === "text" && !node.value.trim()));
      const nested = nodes.find((node): node is Element => isElement(node, "ul"));
      const [first, ...rest] = nodes.filter((node) => node !== nested);

      let name = first ? toText(first).trim() : "";
      const comment: string[] = [];
      if (first?.type === "text") {
        const [filename = "", ...words] = first.value.trim().split(" ");
        name = filename;
        comment.push(words.join(" "));
      }
      comment.push(...rest.map((node) => toText(node)));

      return {
        name,
        directory: /\/$/.test(name) || Boolean(nested),
        highlight: Boolean(first && isElement(first, "strong")),
        placeholder: /^(\.{3}|…)$/.test(name),
        comment: comment.join(" ").trim() || undefined,
        children: nested ? listEntries(nested) : [],
      };
    });
}
