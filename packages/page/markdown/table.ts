import { createElement, type ElementType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@refineui/react";

function classAt(markup: string, index = 0): string {
  return [...markup.matchAll(/class="([^"]*)"/g)][index]?.[1] ?? "";
}

function classOf(component: ElementType): string {
  return classAt(renderToStaticMarkup(createElement(component)));
}

const tableMarkup = renderToStaticMarkup(createElement(Table));

/** Class names the RefineUI Table parts render, read from the components themselves. */
export const tableClasses = {
  wrapper: classAt(tableMarkup, 0),
  table: classAt(tableMarkup, 1),
  thead: classOf(TableHeader),
  tbody: classOf(TableBody),
  tfoot: classOf(TableFooter),
  tr: classOf(TableRow),
  th: classOf(TableHead),
  td: classOf(TableCell),
  caption: classOf(TableCaption),
} as const;

export type TablePart = keyof typeof tableClasses;

export function tableClassList(part: TablePart): string[] {
  return tableClasses[part].split(/\s+/).filter(Boolean);
}
