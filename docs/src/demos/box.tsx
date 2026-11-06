import { Box, Stack, Text } from "@pelagornis/page/components";

export default function BoxDemo() {
  return (
    <Stack gap="sizeMedium" className="w-full">
      <Box padding="sizeLarge" background="backgroundSurface" radius="roundedLarge">
        <Text variant="bodyMd">Surface box with large padding</Text>
      </Box>
      <Box
        as="section"
        paddingX="sizeLarge"
        paddingY="sizeSmall"
        border="strokeWidthThin"
        borderColor="borderDefault"
        radius="roundedLarge"
      >
        <Text variant="bodyMd">Outlined section</Text>
      </Box>
    </Stack>
  );
}
