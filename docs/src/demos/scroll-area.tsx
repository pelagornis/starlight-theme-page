import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Stack,
  Text,
} from "@pelagornis/page/components";

const releases = Array.from({ length: 20 }, (_, index) => `v2.${20 - index}.0`);

export default function ScrollAreaDemo() {
  return (
    <ScrollArea type="hover" className="h-48 w-full max-w-xs">
      <ScrollAreaViewport>
        <Stack gap="sizeXSmall">
          {releases.map((release) => (
            <Text key={release} variant="bodyMd">
              {release}
            </Text>
          ))}
        </Stack>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
