import { Stack, Text } from "@pelagornis/page/components";

export default function TextDemo() {
  return (
    <Stack gap="sizeSmall" className="w-full">
      <Text as="h3" variant="headingSm">
        Heading small
      </Text>
      <Text variant="titleMd">Title medium</Text>
      <Text variant="subtitleMd">Subtitle medium</Text>
      <Text variant="bodyMd">Body medium is the default reading size.</Text>
      <Text variant="captionMd">Caption medium</Text>
    </Stack>
  );
}
