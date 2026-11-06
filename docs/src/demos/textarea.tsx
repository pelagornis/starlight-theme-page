import { Stack, Textarea } from "@pelagornis/page/components";

export default function TextareaDemo() {
  return (
    <Stack gap="sizeSmall" className="w-full max-w-sm">
      <Textarea placeholder="Write a comment…" rows={4} aria-label="Comment" fullWidth />
      <Textarea error defaultValue="Too short" rows={2} aria-label="Error" fullWidth />
    </Stack>
  );
}
