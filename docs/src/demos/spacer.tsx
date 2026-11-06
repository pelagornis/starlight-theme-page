import { Button, Spacer, Stack, Text } from "@pelagornis/page/components";

export default function SpacerDemo() {
  return (
    <Stack direction="row" align="center" className="w-full">
      <Text variant="subtitleMd">Project</Text>
      <Spacer />
      <Button variant="primary" size="sm">
        New file
      </Button>
    </Stack>
  );
}
