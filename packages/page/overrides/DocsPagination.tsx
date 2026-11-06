import { iconSizes } from "@refineui/tokens";
import { Stack, Text, WebIcon } from "@refineui/react";
import type { DocsLabels } from "./labels";

function PagerLink({
    href,
    label,
    caption,
    direction,
}: {
    href: string;
    label: string;
    caption: string;
    direction: "prev" | "next";
}) {
    const isPrev = direction === "prev";

    return (
        <a href={href} data-refineui-docs-pager data-direction={direction}>
            <WebIcon
                name={isPrev ? "chevron-left" : "chevron-right"}
                size={iconSizes.medium}
                color="currentColor"
                fallback={isPrev ? "‹" : "›"}
            />
            <Stack gap="sizeXXXSmall" className="min-w-0" align={isPrev ? "start" : "end"}>
                <Text variant="captionMd" className="m-0 text-refineui-alias-foreground-tertiary">
                    {caption}
                </Text>
                <Text variant="subtitleMd" className="m-0 text-refineui-alias-foreground-primary truncate">
                    {label}
                </Text>
            </Stack>
        </a>
    );
}

export function DocsPagination({
    prev,
    next,
    labels,
}: {
    prev?: { label: string; href: string };
    next?: { label: string; href: string };
    labels: Pick<DocsLabels, "previous" | "next" | "pagination">;
}) {
    if (!prev && !next) return null;

    return (
        <nav data-refineui-docs-pagination aria-label={labels.pagination}>
            {prev ? <PagerLink href={prev.href} label={prev.label} caption={labels.previous} direction="prev" /> : <span />}
            {next ? <PagerLink href={next.href} label={next.label} caption={labels.next} direction="next" /> : <span />}
        </nav>
    );
}
