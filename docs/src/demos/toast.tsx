import { Button, Stack, Toaster, toast } from "@pelagornis/page/components";

export default function ToastDemo() {
  return (
    <Stack direction="row" gap="sizeSmall" wrap>
      <Button variant="primary" onClick={() => toast("Settings saved", { variant: "success", duration: 3000 })}>
        Show success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Upload failed", {
            variant: "error",
            action: { label: "Retry", onClick: () => toast("Retrying…") },
          })
        }
      >
        Show error
      </Button>
      <Toaster />
    </Stack>
  );
}
