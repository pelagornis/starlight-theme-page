import {
  Box,
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
    <ScrollArea type="hover" className="h-refineui-foundation-size-2560 w-full">
      <ScrollAreaViewport>
        <Stack as="ul" className="m-0 list-none p-0">
          {releases.map((release) => (
            <Box
              key={release}
              as="li"
              paddingX="sizeLarge"
              paddingY="sizeMedium"
              data-scroll-edge-item
              className="border-b-refineui-thin border-refineui-alias-border-default"
            >
              <Text variant="bodySm">{release}</Text>
            </Box>
          ))}
        </Stack>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}
