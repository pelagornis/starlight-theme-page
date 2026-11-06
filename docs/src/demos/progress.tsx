import { Progress, Stack, Text } from "@pelagornis/page/components";

export default function ProgressDemo() {
  return (
    <Stack gap="sizeMedium" className="w-full max-w-sm">
      <Stack gap="sizeXXSmall">
        <Text variant="captionMd">Uploading · 60%</Text>
        <Progress value={60} max={100} aria-label="Upload" />
      </Stack>
      <Progress value={30} size="lg" aria-label="Large" />
    </Stack>
  );
}
