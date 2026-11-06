import { Button, Popover, PopoverContent, PopoverTrigger, Stack, Text } from "@pelagornis/page/components";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Show details</Button>
      </PopoverTrigger>
      <PopoverContent placement="bottom" align="center">
        <Stack gap="sizeXXSmall">
          <Text variant="subtitleMd">@pelagornis/page</Text>
          <Text variant="bodySm">Re-exports every RefineUI component.</Text>
        </Stack>
      </PopoverContent>
    </Popover>
  );
}
