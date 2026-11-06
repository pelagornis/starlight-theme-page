import { Button, Stack, Text } from "@pelagornis/page/components";

export default function StackDemo() {
  return (
    <Stack gap="sizeLarge" className="w-full">
      <Stack gap="sizeXXSmall">
        <Text variant="subtitleMd">Vertical stack</Text>
        <Text variant="bodySm">Children are spaced with a spacing token.</Text>
      </Stack>
      <Stack direction="row" gap="sizeSmall" align="center" justify="between">
        <Text variant="bodyMd">Row with space between</Text>
        <Stack direction="row" gap="sizeSmall">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
