import type { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Stack,
} from "@pelagornis/page/components";

function ContentGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full min-w-refineui-navigation-menu-panel-width grid-cols-2 gap-refineui-size-x-small">
      {children}
    </div>
  );
}

function LinkStack({ title, description }: { title: string; description: string }) {
  return (
    <Stack as="span" gap="sizeXXXSmall" className="min-w-0 flex-1 px-refineui-size-xxx-small">
      <span className="break-words whitespace-normal refineui-typo-body-2">{title}</span>
      <span className="break-words whitespace-normal text-refineui-alias-foreground-tertiary refineui-typo-body-4">
        {description}
      </span>
    </Stack>
  );
}

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu aria-label="Main" defaultValue="docs">
      <NavigationMenuList>
        <NavigationMenuItem value="docs">
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentGrid>
              <NavigationMenuLink href="/guides/getting-started/">
                <LinkStack title="Getting started" description="Install and register the plugin" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/guides/mdx/">
                <LinkStack title="Use in MDX" description="Imports and client directives" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/guides/markdoc/">
                <LinkStack title="Use in Markdoc" description="The pageMarkdoc() preset" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/guides/overrides/">
                <LinkStack title="Shell overrides" description="Slots the theme replaces" />
              </NavigationMenuLink>
            </ContentGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="components">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ContentGrid>
              <NavigationMenuLink href="/components/box/">
                <LinkStack title="Layout" description="Box, Stack, Grid" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/components/button/">
                <LinkStack title="Actions" description="Button, Menu, Command" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/components/field/">
                <LinkStack title="Forms" description="Input, Select, Calendar" />
              </NavigationMenuLink>
              <NavigationMenuLink href="/components/dialog/">
                <LinkStack title="Overlays" description="Dialog, Drawer, Popover" />
              </NavigationMenuLink>
            </ContentGrid>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="refineui">
          <NavigationMenuLink href="https://ui.pelagornis.com/">RefineUI</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
