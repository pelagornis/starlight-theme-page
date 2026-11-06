import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Stack,
} from "@pelagornis/page/components";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog size="sm" open={open} onOpenChange={setOpen}>
      <DialogTrigger variant="primary">Delete page</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this page?</DialogTitle>
          <DialogDescription>The page and its translations are removed from the sidebar.</DialogDescription>
        </DialogHeader>
        <Stack direction="row" gap="sizeSmall" justify="end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
