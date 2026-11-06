import { Divider, Stack, Text } from "@pelagornis/page/components";

export default function DividerDemo() {
  return (
    <Stack gap="sizeLarge" className="w-full">
      <Text variant="bodyMd">Above the line</Text>
      <Divider />
      <Divider layout="content" align="center">
        Or continue with
      </Divider>
      <Text variant="bodyMd">Below the line</Text>
    </Stack>
  );
}
