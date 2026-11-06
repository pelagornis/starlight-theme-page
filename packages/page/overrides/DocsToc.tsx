import { useEffect, useRef, useState, type RefObject, type WheelEvent } from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarLink,
    Text,
    WebIcon,
} from "@refineui/react";
import { iconSizes } from "@refineui/tokens";

const PAGE_TITLE_ID = "_top";

export type DocsTocItem = {
    slug: string;
    text: string;
    children: DocsTocItem[];
};

type DocsTocProps = {
    title: string;
    items: DocsTocItem[];
    minHeadingLevel: number;
    maxHeadingLevel: number;
    variant?: "desktop" | "mobile";
};

function flatten(items: DocsTocItem[]): DocsTocItem[] {
    const out: DocsTocItem[] = [];
    for (const item of items) {
        out.push(item);
        if (item.children.length > 0) out.push(...flatten(item.children));
    }
    return out;
}

function useTocScrollSpy(
    rootRef: RefObject<HTMLElement | null>,
    minH: number,
    maxH: number,
    setActiveSlug: (slug: string) => void,
) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const links = [...root.querySelectorAll<HTMLAnchorElement>("a[data-refineui='sidebar-link']")];
        if (links.length === 0) return;

        const isHeading = (el: Element): el is HTMLHeadingElement => {
            if (!(el instanceof HTMLHeadingElement)) return false;
            if (el.id === PAGE_TITLE_ID) return true;
            const level = el.tagName[1];
            if (!level) return false;
            const int = parseInt(level, 10);
            return int >= minH && int <= maxH;
        };

        const getElementHeading = (el: Element | null): HTMLHeadingElement | null => {
            if (!el) return null;
            const origin = el;
            while (el) {
                if (isHeading(el)) return el;
                el = el.previousElementSibling;
                while (el?.lastElementChild) el = el.lastElementChild;
                const heading = getElementHeading(el);
                if (heading) return heading;
            }
            return getElementHeading(origin.parentElement);
        };

        const onIntersect: IntersectionObserverCallback = (entries) => {
            for (const { isIntersecting, target } of entries) {
                if (!isIntersecting) continue;
                const heading = getElementHeading(target);
                if (!heading) continue;
                const link = links.find((item) => item.hash === "#" + encodeURIComponent(heading.id));
                if (link) {
                    const slug = decodeURIComponent(link.hash.slice(1));
                    setActiveSlug(slug);
                    break;
                }
            }
        };

        const toObserve = document.querySelectorAll("main [id], main [id] ~ *, main .content > *");
        let observer: IntersectionObserver | undefined;

        const getRootMargin = (): `-${number}px 0% ${number}px` => {
            const navBarHeight = document.querySelector("header")?.getBoundingClientRect().height || 0;
            const mobileTocHeight = root.querySelector("summary")?.getBoundingClientRect().height || 0;
            const top = navBarHeight + mobileTocHeight + 32;
            const bottom = top + 53;
            const height = document.documentElement.clientHeight;
            return `-${top}px 0% ${bottom - height}px`;
        };

        const observe = () => {
            if (observer) return;
            observer = new IntersectionObserver(onIntersect, { rootMargin: getRootMargin() });
            toObserve.forEach((node) => observer!.observe(node));
        };

        const idle =
            window.requestIdleCallback || ((cb: IdleRequestCallback) => window.setTimeout(cb, 1));
        const idleId = idle(() => observe());

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const onResize = () => {
            if (observer) {
                observer.disconnect();
                observer = undefined;
            }
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => idle(() => observe()), 200);
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(resizeTimeout);
            observer?.disconnect();
            if (typeof idleId === "number") window.clearTimeout(idleId);
            else window.cancelIdleCallback?.(idleId);
        };
    }, [rootRef, minH, maxH, setActiveSlug]);
}

function TocTree({
    items,
    depth = 0,
    activeSlug,
}: {
    items: DocsTocItem[];
    depth?: number;
    activeSlug: string;
}) {
    return (
        <>
            {items.map((item) => (
                <div key={item.slug}>
                    <SidebarLink
                        href={"#" + item.slug}
                        active={item.slug === activeSlug}
                        data-depth={depth}
                        className={
                            depth > 0
                                ? depth === 1
                                    ? "ps-refineui-size-x-large"
                                    : "ps-refineui-size-xx-large"
                                : undefined
                        }
                    >
                        {item.text}
                    </SidebarLink>
                    {item.children.length > 0 ? (
                        <TocTree items={item.children} depth={depth + 1} activeSlug={activeSlug} />
                    ) : null}
                </div>
            ))}
        </>
    );
}

export function DocsToc({
    title,
    items,
    minHeadingLevel,
    maxHeadingLevel,
    variant = "desktop",
}: DocsTocProps) {
    const rootRef = useRef<HTMLElement>(null);
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const [activeSlug, setActiveSlug] = useState(PAGE_TITLE_ID);
    const activeLabel =
        flatten(items).find((item) => item.slug === activeSlug)?.text ?? flatten(items)[0]?.text ?? "";

    useTocScrollSpy(rootRef, minHeadingLevel, maxHeadingLevel, setActiveSlug);

    /**
     * The desktop TOC sits in Starlight's fixed right rail, outside the docs
     * ScrollArea. Forward wheel gestures from a TOC link to the actual reading
     * viewport so the fixed rail never becomes a dead-end scroll surface.
     */
    const forwardDesktopWheel = (event: WheelEvent<HTMLElement>) => {
        if (variant !== "desktop") return;
        const viewport = document.querySelector<HTMLElement>(
            "[data-docs-shell-main] [data-refineui='scroll-area-viewport']",
        );
        if (!viewport) return;
        event.preventDefault();
        viewport.scrollBy({ left: event.deltaX, top: event.deltaY });
    };

    useEffect(() => {
        if (variant !== "mobile") return;
        const details = detailsRef.current;
        if (!details) return;

        const closeToC = () => {
            details.open = false;
        };

        const onLinkClick = () => closeToC();
        details.querySelectorAll("a").forEach((a) => a.addEventListener("click", onLinkClick));

        const onWindowClick = (event: MouseEvent) => {
            if (!details.contains(event.target as Node)) closeToC();
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && details.open) {
                const hasFocus = details.contains(document.activeElement);
                closeToC();
                if (hasFocus) details.querySelector("summary")?.focus();
            }
        };

        window.addEventListener("click", onWindowClick);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            details.querySelectorAll("a").forEach((a) => a.removeEventListener("click", onLinkClick));
            window.removeEventListener("click", onWindowClick);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [variant, items]);

    if (variant === "mobile") {
        return (
            <nav
                ref={rootRef}
                data-refineui-docs-toc-mobile
                aria-labelledby="refineui-docs-toc-mobile-heading"
            >
                <details id="refineui-docs-mobile-toc" ref={detailsRef}>
                    <summary id="refineui-docs-toc-mobile-heading" data-refineui-docs-toc-summary>
                        <span data-refineui-docs-toc-toggle>
                            <Text as="span" variant="captionLg">
                                {title}
                            </Text>
                            <span data-refineui-docs-toc-caret>
                                <WebIcon
                                    name="chevron-right"
                                    size={iconSizes.xsmall}
                                    color="currentColor"
                                    fallback="›"
                                />
                            </span>
                        </span>
                        <Text
                            as="span"
                            variant="bodyMd"
                            className="min-w-0 truncate text-refineui-alias-foreground-primary"
                        >
                            <span data-refineui-docs-toc-current>{activeLabel}</span>
                        </Text>
                    </summary>
                    <div data-refineui-docs-toc-dropdown>
                        <SidebarGroup>
                            <TocTree items={items} activeSlug={activeSlug} />
                        </SidebarGroup>
                    </div>
                </details>
            </nav>
        );
    }

    return (
        <nav
            ref={rootRef}
            data-refineui-docs-toc
            aria-labelledby="refineui-docs-toc-heading"
            onWheel={forwardDesktopWheel}
        >
            <SidebarGroup>
                <SidebarGroupLabel id="refineui-docs-toc-heading">{title}</SidebarGroupLabel>
                <TocTree items={items} activeSlug={activeSlug} />
            </SidebarGroup>
        </nav>
    );
}
