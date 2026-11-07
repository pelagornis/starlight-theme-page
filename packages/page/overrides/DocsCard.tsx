import type { AnchorHTMLAttributes, ReactNode } from "react";
import { iconSizes } from "@refineui/tokens";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  WebIcon,
} from "@refineui/react";

/** Starlight's `<Card>` as a RefineUI Card. `title` is HTML, as in Starlight. */
export function DocsCard({ title, icon, children }: { title: string; icon?: ReactNode; children?: ReactNode }) {
  return (
    <Card variant="outlined" data-refineui-docs-card>
      <CardHeader className="not-content">
        <CardHeaderMain>
          <CardTitle className="flex items-center gap-refineui-size-small">
            {icon ? <span data-refineui-docs-card-icon>{icon}</span> : null}
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </CardTitle>
        </CardHeaderMain>
      </CardHeader>
      <CardContent data-refineui-docs-card-body>{children}</CardContent>
    </Card>
  );
}

interface DocsLinkCardProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  title: string;
  description?: string;
  class?: string;
}

/** Starlight's `<LinkCard>` as an interactive RefineUI Card; the whole card is the link. */
export function DocsLinkCard({ title, description, class: className, ...attributes }: DocsLinkCardProps) {
  return (
    <Card variant="outlined" interactive className="relative" data-refineui-docs-link-card>
      <CardHeader className="not-content">
        <CardHeaderMain>
          <CardTitle>
            <a
              {...attributes}
              className={["text-inherit no-underline after:absolute after:inset-0", className].filter(Boolean).join(" ")}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </CardTitle>
          {description ? <CardDescription dangerouslySetInnerHTML={{ __html: description }} /> : null}
        </CardHeaderMain>
        <CardAction className="self-center">
          <WebIcon
            name="chevron-right"
            size={iconSizes.small}
            color="currentColor"
            className="text-refineui-alias-foreground-tertiary rtl:-scale-x-100"
            aria-hidden
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
