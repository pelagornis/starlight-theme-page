import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, type ButtonVariant } from "@refineui/react";

export type LinkButtonVariant = "primary" | "secondary" | "minimal";

const buttonVariants: Record<LinkButtonVariant, ButtonVariant> = {
  primary: "primary",
  secondary: "outline",
  minimal: "ghost",
};

/**
 * RefineUI Button renders a `<button>` only, so a link button takes the attributes Button renders,
 * read from the component itself so they follow RefineUI updates.
 */
export function linkButtonAttributes(variant: LinkButtonVariant): Record<string, string> {
  const markup = renderToStaticMarkup(createElement(Button, { variant: buttonVariants[variant] }));
  const attributes = markup.slice("<button".length, markup.indexOf(">"));
  return Object.fromEntries(
    [...attributes.matchAll(/([\w-]+)="([^"]*)"/g)]
      .filter(([, name]) => name === "class" || name.startsWith("data-"))
      .map(([, name, value]) => [name, value.replaceAll("&amp;", "&")]),
  );
}
