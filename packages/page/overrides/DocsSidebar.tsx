import { Fragment, type ReactNode } from "react";
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarLink,
  SidebarNav,
} from "@refineui/react";
import type { DocsNavEntry } from "./nav";

export function DocsSidebar({
  id,
  entries,
  navLabel,
  footer,
  header,
}: {
  id?: string;
  title?: string;
  titleHref?: string;
  entries: DocsNavEntry[];
  navLabel: string;
  footer?: ReactNode;
  header?: ReactNode;
}) {
  return (
    <Sidebar id={id} data-refineui-docs-sidebar>
      {header ? <SidebarHeader>{header}</SidebarHeader> : null}
      <SidebarContent style={{ overflow: "hidden" }}>
        <ScrollArea type="hover" className="h-full w-full min-h-0">
          <ScrollAreaViewport>
            <SidebarNav aria-label={navLabel}>
              {entries.map((entry) =>
                entry.type === "link" ? (
                  <SidebarLink
                    key={entry.href}
                    href={entry.href}
                    active={entry.isCurrent}
                    {...(entry.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {entry.label}
                  </SidebarLink>
                ) : (
                  <SidebarGroup key={entry.label}>
                    <SidebarGroupLabel>{entry.label}</SidebarGroupLabel>
                    {entry.entries.map((link, index) => (
                      <Fragment key={link.href}>
                        {link.section && link.section !== entry.entries[index - 1]?.section ? (
                          <SidebarGroupLabel data-docs-sidebar-section>{link.section}</SidebarGroupLabel>
                        ) : null}
                        <SidebarLink
                          href={link.href}
                          active={link.isCurrent}
                          {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        >
                          {link.label}
                        </SidebarLink>
                      </Fragment>
                    ))}
                  </SidebarGroup>
                ),
              )}
            </SidebarNav>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      </SidebarContent>
      {footer}
    </Sidebar>
  );
}
