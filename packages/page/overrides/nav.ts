export type DocsNavLink = {
  type: "link";
  label: string;
  href: string;
  isCurrent: boolean;
  external?: boolean;
  section?: string;
};

export type DocsNavGroup = {
  type: "group";
  label: string;
  entries: DocsNavLink[];
  isCurrent: boolean;
};

export type DocsNavEntry = DocsNavLink | DocsNavGroup;

type StarlightLink = {
  type: "link";
  label: string;
  href: string;
  isCurrent: boolean;
};

type StarlightGroup = {
  type: "group";
  label: string;
  entries: StarlightEntry[];
};

type StarlightEntry = StarlightLink | StarlightGroup;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function flattenLinks(entries: StarlightEntry[], section?: string): DocsNavLink[] {
  const links: DocsNavLink[] = [];
  for (const entry of entries) {
    if (entry.type === "link") {
      links.push({
        type: "link",
        label: entry.label,
        href: entry.href,
        isCurrent: entry.isCurrent,
        external: isExternalHref(entry.href),
        ...(section ? { section } : {}),
      });
      continue;
    }
    links.push(...flattenLinks(entry.entries, entry.label));
  }
  return links;
}

function firstLink(entries: StarlightEntry[]): StarlightLink | undefined {
  for (const entry of entries) {
    const link = entry.type === "link" ? entry : firstLink(entry.entries);
    if (link) return link;
  }
  return undefined;
}

/** Sidebar groups that lead to the current page, outermost first. Empty when the page isn't in the sidebar. */
export function sidebarTrail(entries: StarlightEntry[]): Array<{ label: string; href: string }> {
  for (const entry of entries) {
    if (entry.type !== "group") continue;
    const inner = sidebarTrail(entry.entries);
    const containsCurrent = inner.length > 0 || entry.entries.some((child) => child.type === "link" && child.isCurrent);
    if (!containsCurrent) continue;
    return [{ label: entry.label, href: firstLink(entry.entries)?.href ?? "" }, ...inner];
  }
  return [];
}

/** JSON-safe nav tree for React islands — one group level; nested groups become `section` on their links. */
export function serializeNav(entries: StarlightEntry[]): DocsNavEntry[] {
  return entries.map((entry) => {
    if (entry.type === "link") {
      return {
        type: "link",
        label: entry.label,
        href: entry.href,
        isCurrent: entry.isCurrent,
        external: isExternalHref(entry.href),
      };
    }
    const links = flattenLinks(entry.entries);
    return {
      type: "group",
      label: entry.label,
      entries: links,
      isCurrent: links.some((link) => link.isCurrent),
    };
  });
}
