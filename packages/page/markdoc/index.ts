import { component, Markdoc, nodes, type AstroMarkdocConfig } from "@astrojs/markdoc/config";
import { tableClasses, type TablePart } from "../markdown/table.ts";

type AttributeType = StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor;
type Attributes = Record<string, { type: AttributeType | AttributeType[]; required?: boolean; default?: unknown }>;

const string = { type: String };
const number = { type: Number };
const boolean = { type: Boolean };
const ariaLabel = { ariaLabel: string };

function tag(is: string, attributes: Attributes, selfClosing = false) {
  return {
    render: component("@pelagornis/page/markdoc/components", "Element"),
    selfClosing,
    attributes: {
      is: { type: String, default: is },
      class: string,
      id: string,
      ...attributes,
    },
  };
}

type TableNodeName = "thead" | "tbody" | "tr" | "th" | "td";

function tablePart(name: TableNodeName, extra: Record<string, string> = {}) {
  return {
    ...nodes[name],
    transform(node: InstanceType<typeof Markdoc.Ast.Node>, config: Parameters<InstanceType<typeof Markdoc.Ast.Node>["transform"]>[0]) {
      const attributes = node.transformAttributes(config);
      return new Markdoc.Tag(name, { ...attributes, ...extra, class: tableClasses[name as TablePart] }, node.transformChildren(config));
    },
  };
}

const tableNodes = {
  table: {
    ...nodes.table,
    transform(node: InstanceType<typeof Markdoc.Ast.Node>, config: Parameters<InstanceType<typeof Markdoc.Ast.Node>["transform"]>[0]) {
      const table = new Markdoc.Tag(
        "table",
        { ...node.transformAttributes(config), class: tableClasses.table },
        node.transformChildren(config),
      );
      return new Markdoc.Tag(
        "div",
        { class: `${tableClasses.wrapper} not-content`, "data-refineui": "table", "data-page-table": "" },
        [table],
      );
    },
  },
  thead: tablePart("thead"),
  tbody: tablePart("tbody"),
  tr: tablePart("tr", { "data-refineui": "table-row" }),
  th: tablePart("th", { scope: "col" }),
  td: tablePart("td"),
};

const layout = {
  as: string,
  gap: string,
  align: string,
  justify: string,
};

/**
 * Markdoc tags for RefineUI components that render without client state.
 * Use with `defineMarkdocConfig({ extends: [starlightMarkdoc(), pageMarkdoc()] })`.
 */
export function pageMarkdoc(): AstroMarkdocConfig {
  return {
    nodes: tableNodes,
    tags: {
      box: tag("Box", {
        as: string,
        padding: string,
        paddingX: string,
        paddingY: string,
        background: string,
        radius: string,
        border: string,
        borderColor: string,
      }),
      container: tag("Container", { as: string, padding: string }),
      grid: tag("Grid", { ...layout, columns: number, minItem: string, columnGap: string, rowGap: string }),
      stack: tag("Stack", { ...layout, direction: string, wrap: boolean, inline: boolean }),
      spacer: tag("Spacer", {}, true),
      divider: tag("Divider", { layout: string, align: string }),
      text: tag("Text", { as: string, variant: { type: String, default: "bodyMd" } }),
      button: tag("Button", {
        ...ariaLabel,
        variant: string,
        size: string,
        layout: string,
        fullWidth: boolean,
        disabled: boolean,
        type: string,
      }),
      link: tag("Link", {
        href: { type: String, required: true },
        target: string,
        rel: string,
        showExternalIcon: boolean,
        disabled: boolean,
      }),
      label: tag("Label", { htmlFor: string, required: boolean, size: string, disabled: boolean }),
      input: tag(
        "Input",
        {
          ...ariaLabel,
          type: string,
          name: string,
          placeholder: string,
          defaultValue: string,
          size: string,
          error: boolean,
          success: boolean,
          fullWidth: boolean,
          disabled: boolean,
        },
        true,
      ),
      textarea: tag(
        "Textarea",
        {
          ...ariaLabel,
          name: string,
          placeholder: string,
          defaultValue: string,
          rows: number,
          error: boolean,
          success: boolean,
          fullWidth: boolean,
          disabled: boolean,
        },
        true,
      ),
      checkbox: tag(
        "Checkbox",
        {
          label: string,
          description: string,
          variant: string,
          name: string,
          value: string,
          defaultChecked: boolean,
          disabled: boolean,
        },
        true,
      ),
      radio: tag(
        "Radio",
        {
          label: string,
          description: string,
          name: string,
          value: string,
          defaultChecked: boolean,
          disabled: boolean,
        },
        true,
      ),
      progress: tag("Progress", { ...ariaLabel, value: { type: Number, required: true }, max: number, size: string }, true),
      spinner: tag("Spinner", { size: string, label: string, labelPosition: string }, true),
      skeleton: tag("Skeleton", { width: { type: [String, Number] }, height: { type: [String, Number] }, shape: string }, true),
      badge: tag("Badge", { variant: string, layout: string }),
      chip: tag("Chip", { variant: string, size: string, disabled: boolean }),
      icon: tag(
        "WebIcon",
        { ...ariaLabel, name: { type: String, required: true }, size: number, color: string, iconStyle: string },
        true,
      ),
      avatars: tag("Avatars", { avatars: { type: Array, required: true }, size: string, max: number, layout: string }, true),
    },
  };
}

export default pageMarkdoc;
