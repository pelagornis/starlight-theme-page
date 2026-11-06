import { Button, Stack, WebIcon } from "@pelagornis/page/components";

export default function ButtonDemo() {
  return (
    <Stack direction="row" gap="sizeSmall" align="center" wrap>
      <Button variant="primary">Continue</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="ghost" layout="icon" aria-label="Add">
        <WebIcon name="add" size={20} color="currentColor" />
      </Button>
    </Stack>
  );
}
