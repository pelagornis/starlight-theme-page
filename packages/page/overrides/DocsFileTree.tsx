import { iconSizes } from "@refineui/tokens";
import { Tree, TreeItem, TreeItemContent, TreeItemTrigger, WebIcon } from "@refineui/react";
import type { FileTreeEntry } from "./fileTree";

function entryValue(parent: string, index: number, entry: FileTreeEntry) {
  return `${parent}/${index}:${entry.name}`;
}

function collect(entries: FileTreeEntry[], parent: string, directories: string[], highlighted: string[]) {
  entries.forEach((entry, index) => {
    const value = entryValue(parent, index, entry);
    if (entry.directory) directories.push(value);
    if (entry.highlight) highlighted.push(value);
    collect(entry.children, value, directories, highlighted);
  });
}

function Entries({ entries, parent }: { entries: FileTreeEntry[]; parent: string }) {
  return entries.map((entry, index) => {
    const value = entryValue(parent, index, entry);
    return (
      <TreeItem key={value} value={value} disabled={entry.placeholder}>
        <TreeItemTrigger>
          <span data-refineui-docs-file-tree-entry>
            {entry.placeholder ? null : (
              <WebIcon
                name={entry.directory ? "folder" : "document"}
                size={iconSizes.small}
                color="currentColor"
                aria-hidden
              />
            )}
            <span data-refineui-docs-file-tree-name>{entry.name}</span>
            {entry.comment ? <span data-refineui-docs-file-tree-comment>{entry.comment}</span> : null}
          </span>
        </TreeItemTrigger>
        {entry.children.length > 0 ? (
          <TreeItemContent>
            <Entries entries={entry.children} parent={value} />
          </TreeItemContent>
        ) : null}
      </TreeItem>
    );
  });
}

/** Starlight's `<FileTree>` drawn with RefineUI Tree. Directories start open; the first `**highlight**` is selected. */
export function DocsFileTree({ entries, label }: { entries: FileTreeEntry[]; label: string }) {
  const directories: string[] = [];
  const highlighted: string[] = [];
  collect(entries, "", directories, highlighted);

  return (
    <Tree size="sm" aria-label={label} defaultExpanded={directories} defaultSelected={highlighted[0]}>
      <Entries entries={entries} parent="" />
    </Tree>
  );
}
