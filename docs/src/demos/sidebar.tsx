import {
  Box,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarLink,
  SidebarNav,
  Text,
} from "@pelagornis/page/components";

export default function SidebarDemo() {
  return (
    <Box border="strokeWidthThin" borderColor="borderDefault" radius="roundedLarge" className="h-80 w-64 overflow-hidden">
      <Sidebar className="h-full">
        <SidebarHeader>
          <SidebarBrand>Docs</SidebarBrand>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            <SidebarGroup>
              <SidebarGroupLabel>Start</SidebarGroupLabel>
              <SidebarLink href="#" active>
                Getting started
              </SidebarLink>
              <SidebarLink href="#">Use in MDX</SidebarLink>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Components</SidebarGroupLabel>
              <SidebarLink href="#">Button</SidebarLink>
              <SidebarLink href="#">Tabs</SidebarLink>
            </SidebarGroup>
          </SidebarNav>
        </SidebarContent>
        <SidebarFooter>
          <Text variant="captionMd">v2.0.0</Text>
        </SidebarFooter>
      </Sidebar>
    </Box>
  );
}
