import { Input, Stack } from "@pelagornis/page/components";

export default function InputDemo() {
  return (
    <Stack gap="sizeSmall" className="w-full max-w-sm">
      <Input placeholder="Default" aria-label="Default" fullWidth />
      <Input size="lg" placeholder="Large" aria-label="Large" fullWidth />
      <Input error defaultValue="Invalid value" aria-label="Error" fullWidth />
      <Input success defaultValue="Looks good" aria-label="Success" fullWidth />
      <Input disabled placeholder="Disabled" aria-label="Disabled" fullWidth />
    </Stack>
  );
}
