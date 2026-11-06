import { Button, Stack, Tooltip } from "@pelagornis/page/components";

export default function TooltipDemo() {
  return (
    <Stack direction="row" gap="sizeSmall" wrap>
      <Tooltip trigger={<Button variant="outline">Top</Button>} content="Shown above" position="Top" />
      <Tooltip trigger={<Button variant="outline">Bottom</Button>} content="Shown below" position="Bottom" />
      <Tooltip trigger={<Button variant="outline">Right</Button>} content="Shown on the right" position="Right" />
    </Stack>
  );
}
