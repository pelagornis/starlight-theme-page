import { createElement, type ReactNode } from "react";
import { Alert, AlertBody, AlertDescription, AlertIcon, AlertRow, AlertTitle, type AlertVariant } from "@refineui/react";

export type AsideType = "note" | "tip" | "caution" | "danger";

const alertVariants: Record<AsideType, AlertVariant> = {
  note: "info",
  tip: "success",
  caution: "warning",
  danger: "danger",
};

/**
 * Starlight's aside as a RefineUI Alert. It is page content rather than a live message,
 * so it is a labelled note instead of `role="alert"`. `icon` replaces the variant's icon
 * when `customIcon` is set; Astro passes an empty `icon` slot even when none was given.
 * Written without JSX because the Markdown plugin imports it while Astro loads its config.
 */
export function DocsAside({
  type,
  title,
  customIcon = false,
  icon,
  children,
}: {
  type: AsideType;
  title: string;
  customIcon?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return createElement(
    Alert,
    { variant: alertVariants[type], role: "note", "aria-label": title, "data-refineui-docs-aside": type },
    createElement(
      AlertRow,
      null,
      createElement(AlertIcon, null, customIcon ? icon : undefined),
      createElement(
        AlertBody,
        null,
        createElement(AlertTitle, { className: "not-content", "aria-hidden": true }, title),
        createElement(AlertDescription, { "data-refineui-docs-aside-content": true }, children),
      ),
    ),
  );
}
