import { Spinner, Stack } from "@pelagornis/page/components";

export default function SpinnerDemo() {
  return (
    <Stack direction="row" gap="sizeXLarge" align="center" wrap>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" label="Loading…" labelPosition="right" />
    </Stack>
  );
}
