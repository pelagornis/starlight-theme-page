import { Input, Label, LabelRequired, Stack } from "@pelagornis/page/components";

export default function LabelDemo() {
  return (
    <Stack gap="sizeLarge" className="w-full max-w-sm">
      <Stack gap="sizeXSmall">
        <Label htmlFor="label-name">
          Name <LabelRequired />
        </Label>
        <Input id="label-name" placeholder="Jane Doe" fullWidth />
      </Stack>
      <Label size="lg">Large label</Label>
      <Label disabled>Disabled label</Label>
    </Stack>
  );
}
