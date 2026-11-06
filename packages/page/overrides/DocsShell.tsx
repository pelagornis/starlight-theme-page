import type { CSSProperties, ReactNode, TransitionEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { iconSizes, semanticInteraction } from "@refineui/tokens";
import { motionMsToNumber } from "@refineui/utilities/animation";
import {
    Button,
    SidebarProvider,
    SidebarTrigger,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    ScrollArea,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
    SidebarFooter,
    SidebarLink,
    SidebarPeek,
    SidebarPeekEdge,
    SidebarPeekInset,
    SidebarPeekPanel,
    SidebarPeekPin,
    WebIcon,
} from "@refineui/react";
import { DocsSidebar } from "./DocsSidebar";
import type { DocsLabels } from "./labels";
import type { DocsNavEntry } from "./nav";

function SidebarResizeHandle({ animating, label }: { animating: boolean; label: string }) {
    return <ResizableHandle withHandle disabled={animating} aria-label={label} />;
}

/** PageFrame's inline script reads the same keys before hydration. */
export const STORAGE_KEY = "refineui-docs-sidebar-size";
export const COLLAPSED_KEY = "refineui-docs-sidebar-collapsed";
const DOCS_SIDEBAR_ID = "refineui-docs-sidebar";
const DESKTOP_MQ = "(min-width: 50rem)";
const DEFAULT_SIDEBAR = 22;
const MIN_SIDEBAR = 14;
const MAX_SIDEBAR = 36;
/** Drag / Home to ~0% collapses the rail (float noise). */
const COLLAPSE_AT = 1;

const PANEL_MS = motionMsToNumber(semanticInteraction.duration.panel);
const PANEL_EASING = semanticInteraction.easing.panel;

function readStoredSize(): number {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw == null ? Number.NaN : Number(raw);
    if (!Number.isFinite(parsed)) return DEFAULT_SIDEBAR;
    return Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, parsed));
}

function readStoredCollapsed(): boolean {
    return window.localStorage.getItem(COLLAPSED_KEY) === "1";
}

function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clampSidebarSize(size: number): number {
    return Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, size));
}

type ShellProps = {
    title: string;
    titleHref: string;
    entries: DocsNavEntry[];
    githubHref?: string;
    labels: DocsLabels;
    children?: ReactNode;
};

function DocsMainScroll({ children }: { children?: ReactNode }) {
    return (
        <ScrollArea type="hover" data-docs-shell-main className="h-full w-full min-h-0">
            <ScrollAreaViewport>{children}</ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
            </ScrollAreaScrollbar>
        </ScrollArea>
    );
}

function DocsShellSidebar({
    id,
    title,
    titleHref,
    entries,
    githubHref,
    labels,
}: Pick<ShellProps, "title" | "titleHref" | "entries" | "githubHref" | "labels"> & {
    id?: string;
}) {
    return (
        <DocsSidebar
            id={id}
            title={title}
            titleHref={titleHref}
            entries={entries}
            navLabel={labels.nav}
            footer={
                githubHref ? (
                    <SidebarFooter>
                        <SidebarLink href={githubHref} target="_blank" rel="noreferrer">
                            GitHub
                        </SidebarLink>
                    </SidebarFooter>
                ) : null
            }
        />
    );
}

function DocsShellMain({
    collapsed,
    labels,
    children,
}: {
    collapsed: boolean;
    labels: DocsLabels;
    children?: ReactNode;
}) {
    return (
        <SidebarPeekInset>
            <SidebarTrigger
                layout="icon"
                size="sm"
                data-docs-sidebar-toggle
                aria-label={collapsed ? labels.sidebarOpen : labels.sidebarClose}
            >
                <WebIcon name="panel-left" size={iconSizes.small} color="currentColor" fallback="☰" />
            </SidebarTrigger>
            <DocsMainScroll>{children}</DocsMainScroll>
        </SidebarPeekInset>
    );
}

/**
 * Desktop shell. The server renders the default width; the stored width and collapsed state
 * are applied before the first paint after hydration. Button collapse animates flex-grow.
 */
function DocsDesktopShell({ title, titleHref, entries, githubHref, labels, children }: ShellProps) {
    const restoredSize = useRef(DEFAULT_SIDEBAR);
    const [sidebarSize, setSidebarSize] = useState(DEFAULT_SIDEBAR);
    const [collapsed, setCollapsed] = useState(false);
    const [animating, setAnimating] = useState(false);
    const motionTimerRef = useRef<number | null>(null);

    useLayoutEffect(() => {
        restoredSize.current = readStoredSize();
        const storedCollapsed = readStoredCollapsed();
        setCollapsed(storedCollapsed);
        setSidebarSize(storedCollapsed ? 0 : restoredSize.current);
    }, []);

    const clearMotionTimer = () => {
        if (motionTimerRef.current != null) {
            window.clearTimeout(motionTimerRef.current);
            motionTimerRef.current = null;
        }
    };

    useEffect(() => () => clearMotionTimer(), []);

    const persistCollapsed = (next: boolean) => {
        window.localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
    };

    const persistSize = (next: number) => {
        const clamped = clampSidebarSize(next);
        restoredSize.current = clamped;
        window.localStorage.setItem(STORAGE_KEY, String(clamped));
    };

    const finishCollapse = () => {
        clearMotionTimer();
        setSidebarSize(0);
        setAnimating(false);
        setCollapsed(true);
        persistCollapsed(true);
    };

    const finishExpand = () => {
        clearMotionTimer();
        setSidebarSize(restoredSize.current);
        setAnimating(false);
        setCollapsed(false);
        persistCollapsed(false);
    };

    const runPanelMotion = (toSize: number, onDone: () => void) => {
        clearMotionTimer();
        if (prefersReducedMotion()) {
            setSidebarSize(toSize);
            onDone();
            return;
        }
        setAnimating(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setSidebarSize(toSize);
                motionTimerRef.current = window.setTimeout(onDone, PANEL_MS + 32);
            });
        });
    };

    const collapseInstant = () => {
        clearMotionTimer();
        setAnimating(false);
        setSidebarSize(0);
        setCollapsed(true);
        persistCollapsed(true);
    };

    const collapseAnimated = () => {
        if (collapsed || animating) return;
        if (sidebarSize > COLLAPSE_AT) {
            persistSize(sidebarSize);
        }
        setCollapsed(true);
        runPanelMotion(0, finishCollapse);
    };

    const expandAnimated = () => {
        if (!collapsed || animating) return;
        setSidebarSize(0);
        runPanelMotion(restoredSize.current, finishExpand);
    };

    const handleSidebarTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
        if (!animating) return;
        if (event.propertyName !== "flex-grow") return;
        if (event.target !== event.currentTarget) return;
        if (sidebarSize <= COLLAPSE_AT) {
            finishCollapse();
            return;
        }
        finishExpand();
    };

    const panelMotionStyle: CSSProperties | undefined = animating
        ? {
              transitionProperty: "flex-grow",
              transitionDuration: `${PANEL_MS}ms`,
              transitionTimingFunction: PANEL_EASING,
          }
        : undefined;

    const railOpen = !collapsed || animating;
    const peekEligible = collapsed && !animating;

    const sidebarBlock = (docked: boolean) => (
        <DocsShellSidebar
            id={docked ? DOCS_SIDEBAR_ID : undefined}
            title={title}
            titleHref={titleHref}
            entries={entries}
            githubHref={githubHref}
            labels={labels}
        />
    );

    return (
        <SidebarPeek
            enabled={peekEligible}
            widthPercent={restoredSize.current}
            mode="contained"
            onPin={expandAnimated}
            className="relative h-full w-full min-h-0"
        >
            <SidebarProvider
                id={DOCS_SIDEBAR_ID}
                open={!collapsed}
                onOpenChange={(open) => {
                    if (animating) return;
                    if (open) expandAnimated();
                    else collapseAnimated();
                }}
            >
            <ResizablePanelGroup
                orientation="horizontal"
                data-docs-shell="desktop"
                data-docs-sidebar-collapsed={collapsed && !animating ? "" : undefined}
                data-docs-shell-animating={animating ? "" : undefined}
                className="relative h-full w-full min-h-0"
                onLayout={(sizes) => {
                    if (animating || collapsed) return;
                    const next = sizes[0];
                    if (next == null) return;
                    if (next <= COLLAPSE_AT) {
                        collapseInstant();
                        return;
                    }
                    setSidebarSize(next);
                    persistSize(next);
                }}
            >
                <ResizablePanel
                    size={sidebarSize}
                    minSize={0}
                    maxSize={collapsed && !animating ? 0 : MAX_SIDEBAR}
                    className="flex min-h-0 overflow-hidden"
                    style={panelMotionStyle}
                    onTransitionEnd={handleSidebarTransitionEnd}
                >
                    {railOpen ? (
                        <div data-docs-shell-sidebar className="flex h-full min-h-0 w-full">
                            {sidebarBlock(true)}
                        </div>
                    ) : null}
                </ResizablePanel>
                {railOpen ? <SidebarResizeHandle animating={animating} label={labels.sidebarResize} /> : null}
                <ResizablePanel
                    size={100 - sidebarSize}
                    minSize={collapsed && !animating ? 100 : 50}
                    className="relative flex min-h-0 min-w-0"
                    style={panelMotionStyle}
                >
                    <DocsShellMain collapsed={collapsed} labels={labels}>
                        {children}
                    </DocsShellMain>
                    <SidebarPeekEdge />
                    <SidebarPeekPanel>
                        <SidebarPeekPin>
                            <Button
                                type="button"
                                variant="ghost"
                                layout="icon"
                                size="sm"
                                aria-label={labels.sidebarPin}
                                onClick={expandAnimated}
                            >
                                <WebIcon
                                    name="panel-left"
                                    size={iconSizes.small}
                                    color="currentColor"
                                    fallback="☰"
                                />
                            </Button>
                        </SidebarPeekPin>
                        <div data-docs-shell-sidebar className="flex min-h-0 w-full flex-1">
                            {sidebarBlock(false)}
                        </div>
                    </SidebarPeekPanel>
                </ResizablePanel>
            </ResizablePanelGroup>
            </SidebarProvider>
        </SidebarPeek>
    );
}

/**
 * Docs page shell — RefineUI Sidebar + Resizable + ScrollArea.
 */
export function DocsShell(props: ShellProps) {
    const [desktop, setDesktop] = useState(true);

    useLayoutEffect(() => {
        const media = window.matchMedia(DESKTOP_MQ);
        const sync = () => setDesktop(media.matches);
        sync();
        media.addEventListener("change", sync);
        return () => media.removeEventListener("change", sync);
    }, []);

    if (!desktop) {
        return (
            <div data-docs-shell="mobile" className="w-full min-w-0">
                {props.children}
            </div>
        );
    }

    return <DocsDesktopShell {...props} />;
}
