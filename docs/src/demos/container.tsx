import { Container, Stack, Text } from "@pelagornis/page/components";

export default function ContainerDemo() {
  return (
    <Container padding="sizeXXLarge">
      <Stack gap="sizeSmall">
        <Text variant="headingSm" as="h3">
          Page title
        </Text>
        <Text variant="bodyMd">Container centers content and applies token padding.</Text>
      </Stack>
    </Container>
  );
}
