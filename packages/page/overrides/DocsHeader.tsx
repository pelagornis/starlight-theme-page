import { useEffect, useMemo, useRef, useState } from "react";
import { iconSizes } from "@refineui/tokens";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupHeading,
  CommandInput,
  CommandItem,
  CommandList,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Stack,
  WebIcon,
} from "@refineui/react";
import type { DocsLabels } from "./labels";

export type DocsHeaderNavLink = {
  label: string;
  href: string;
  active: boolean;
  description?: string;
};

export type DocsHeaderNavSection = {
  value: string;
  label: string;
  href: string;
  active: boolean;
  links: DocsHeaderNavLink[];
};

export type DocsSearchItem = {
  value: string;
  label: string;
  href: string;
  group: string;
  external?: boolean;
};

function NavLinkStack({ title, description }: { title: string; description?: string }) {
  return (
    <Stack as="span" gap="sizeXXXSmall" className="min-w-0 flex-1 px-refineui-size-xxx-small">
      <span className="break-words whitespace-normal">{title}</span>
      {description ? (
        <span className="break-words whitespace-normal text-refineui-alias-foreground-tertiary refineui-typo-body-4">
          {description}
        </span>
      ) : null}
    </Stack>
  );
}

export function DocsHeaderNav({ sections, label }: { sections: DocsHeaderNavSection[]; label: string }) {
  if (sections.length === 0) return null;

  return (
    <div data-refineui-docs-nav>
      <NavigationMenu aria-label={label}>
        <NavigationMenuList>
          {sections.map((section) =>
            section.links.length === 0 ? (
              <NavigationMenuItem key={section.value} value={section.value}>
                <NavigationMenuLink href={section.href} active={section.active}>
                  {section.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={section.value} value={section.value}>
                <NavigationMenuTrigger data-active={section.active ? "true" : undefined}>
                  {section.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-full min-w-refineui-navigation-menu-panel-width grid-cols-2 gap-refineui-size-x-small">
                    {section.links.map((link) => (
                      <NavigationMenuLink
                        key={link.href}
                        href={link.href}
                        active={link.active}
                        {...(/^https?:/i.test(link.href) ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        <NavLinkStack title={link.label} description={link.description} />
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

type ContentResult = { url: string; title: string; excerpt: string };

type Pagefind = {
  init: () => Promise<void>;
  debouncedSearch: (
    term: string,
    options?: object,
    debounceMs?: number,
  ) => Promise<{ results: Array<{ data: () => Promise<PagefindData> }> } | null>;
};

type PagefindData = { url: string; excerpt: string; meta: { title?: string } };

let pagefind: Promise<Pagefind | null> | undefined;

/** Pagefind's index exists only in a production build, so dev servers fall back to page titles. */
function loadPagefind() {
  pagefind ??= import(/* @vite-ignore */ `${import.meta.env.BASE_URL.replace(/\/$/, "")}/pagefind/pagefind.js`)
    .then(async (module: Pagefind) => {
      await module.init();
      return module;
    })
    .catch(() => null);
  return pagefind;
}

function plainText(html: string) {
  return new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
}

function useContentSearch(query: string, enabled: boolean) {
  const [results, setResults] = useState<ContentResult[]>([]);

  useEffect(() => {
    const term = query.trim();
    if (!enabled || term.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    loadPagefind().then(async (search) => {
      const found = await search?.debouncedSearch(term, {}, 150);
      if (!found || cancelled) return;
      const data = await Promise.all(found.results.slice(0, 8).map((result) => result.data()));
      if (cancelled) return;
      setResults(
        data.map((entry) => ({ url: entry.url, title: entry.meta.title ?? entry.url, excerpt: plainText(entry.excerpt) })),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [query, enabled]);

  return results;
}

export function DocsHeaderSearch({
  items,
  contentSearch,
  labels,
}: {
  items: DocsSearchItem[];
  contentSearch: boolean;
  labels: Pick<DocsLabels, "search" | "searchPlaceholder" | "searchEmpty" | "searchPages" | "searchContent">;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const contentResults = useContentSearch(query, open && contentSearch);

  const groups = useMemo(() => {
    const map = new Map<string, DocsSearchItem[]>();
    for (const item of items) {
      const group = item.group || labels.searchPages;
      const list = map.get(group) ?? [];
      list.push(item);
      map.set(group, list);
    }
    return Array.from(map.entries());
  }, [items, labels.searchPages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) window.open(href, "_blank", "noreferrer");
    else window.location.assign(href);
  };

  return (
    <>
      <Button
        type="button"
        layout="icon"
        variant="ghost"
        size="md"
        data-refineui-docs-search-trigger
        aria-label={`${labels.search} (⌘K)`}
        aria-keyshortcuts="Meta+K Control+K"
        onClick={() => setOpen(true)}
      >
        <WebIcon name="search" size={iconSizes.small} color="currentColor" aria-hidden />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{ label: labels.search, value: query, onValueChange: setQuery }}
      >
        <CommandInput placeholder={labels.searchPlaceholder} />
        <CommandList>
          <CommandEmpty>{labels.searchEmpty}</CommandEmpty>
          {groups.map(([group, groupItems]) => (
            <CommandGroup key={group}>
              <CommandGroupHeading>{group}</CommandGroupHeading>
              {groupItems.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={[item.label, group]}
                  onSelect={() => go(item.href, item.external)}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          {contentResults.length > 0 ? (
            <CommandGroup>
              <CommandGroupHeading>{labels.searchContent}</CommandGroupHeading>
              {contentResults.map((result) => (
                <CommandItem
                  key={result.url}
                  value={`content:${result.url}`}
                  forceMount
                  onSelect={() => go(result.url)}
                >
                  <span data-refineui-docs-search-result>
                    <span data-refineui-docs-search-result-title>{result.title}</span>
                    <span data-refineui-docs-search-result-excerpt>{result.excerpt}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}

const MOBILE_MENU_MQ = "(max-width: 49.99rem)";

export function DocsMobileMenuToggle({ labels }: { labels: Pick<DocsLabels, "menuOpen" | "menuClose"> }) {
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.toggleAttribute("data-mobile-menu-expanded", expanded);
    return () => document.body.removeAttribute("data-mobile-menu-expanded");
  }, [expanded]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MENU_MQ);
    const onChange = () => {
      if (!media.matches) setExpanded(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-docs-mobile-sidebar]");
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code !== "Escape") return;
      setExpanded(false);
      buttonRef.current?.focus();
    };
    nav?.addEventListener("keyup", onKeyUp);
    return () => nav?.removeEventListener("keyup", onKeyUp);
  }, []);

  return (
    <Button
      ref={buttonRef}
      type="button"
      layout="icon"
      variant="ghost"
      size="md"
      data-refineui-docs-menu-toggle
      aria-expanded={expanded}
      aria-controls="starlight__sidebar"
      aria-label={expanded ? labels.menuClose : labels.menuOpen}
      onClick={() => setExpanded((open) => !open)}
    >
      <WebIcon
        name={expanded ? "dismiss" : "text-align-justify"}
        size={iconSizes.small}
        color="currentColor"
        aria-hidden
      />
    </Button>
  );
}
