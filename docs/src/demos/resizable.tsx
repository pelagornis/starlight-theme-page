import {
  Box,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Text,
} from "@pelagornis/page/components";

export default function ResizableDemo() {
  return (
    <Box border="strokeWidthThin" borderColor="borderDefault" radius="roundedLarge" className="h-48 w-full overflow-hidden">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={35} minSize={20}>
          <Box padding="sizeLarge">
            <Text variant="subtitleMd">Sidebar</Text>
          </Box>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={65} minSize={30}>
          <Box padding="sizeLarge">
            <Text variant="subtitleMd">Content</Text>
          </Box>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Box>
  );
}
