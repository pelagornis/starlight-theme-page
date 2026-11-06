import { Tree, TreeItem, TreeItemContent, TreeItemTrigger } from "@pelagornis/page/components";

export default function TreeDemo() {
  return (
    <Tree defaultExpanded={["src", "overrides"]} defaultSelected="header" aria-label="Files" className="w-full max-w-xs">
      <TreeItem value="src">
        <TreeItemTrigger>src</TreeItemTrigger>
        <TreeItemContent>
          <TreeItem value="overrides">
            <TreeItemTrigger>overrides</TreeItemTrigger>
            <TreeItemContent>
              <TreeItem value="header">
                <TreeItemTrigger>Header.astro</TreeItemTrigger>
              </TreeItem>
              <TreeItem value="footer">
                <TreeItemTrigger>Footer.astro</TreeItemTrigger>
              </TreeItem>
            </TreeItemContent>
          </TreeItem>
        </TreeItemContent>
      </TreeItem>
      <TreeItem value="package">
        <TreeItemTrigger>package.json</TreeItemTrigger>
      </TreeItem>
    </Tree>
  );
}
