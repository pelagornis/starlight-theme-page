import {
  Box,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Text,
} from "@pelagornis/page/components";

function PanelLabel({ children }: { children: string }) {
  return (
    <Box
      background="backgroundSurface"
      padding="sizeLarge"
      className="flex h-full w-full items-center justify-center"
    >
      <Text variant="bodySm" className="text-refineui-alias-foreground-secondary">
        {children}
      </Text>
    </Box>
  );
}

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-refineui-foundation-size-2560 w-full">
      <ResizablePanel defaultSize={35} minSize={20}>
        <PanelLabel>Sidebar</PanelLabel>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65} minSize={30}>
        <PanelLabel>Main</PanelLabel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
