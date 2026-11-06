import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";
import pageMarkdoc from "@pelagornis/page/markdoc";

const starlight = starlightMarkdoc();
const fence = starlight.nodes.fence;

export default defineMarkdocConfig({
  extends: [starlight, pageMarkdoc()],
  nodes: {
    // starlight-markdoc's fence schema drops Markdoc's `process` attribute, which these docs need to show tags verbatim.
    fence: {
      ...fence,
      attributes: { ...fence.attributes, process: { type: Boolean, render: false, default: true } },
    },
  },
  tags: {
    "tabs-example": {
      render: component("./src/components/markdoc/TabsExample.astro"),
      selfClosing: true,
    },
  },
});
