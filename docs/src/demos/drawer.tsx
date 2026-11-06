import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Switch,
  Stack,
  Text,
} from "@pelagornis/page/components";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} placement="right">
      <DrawerTrigger variant="outline">Open settings</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Preferences for this workspace.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <Stack direction="row" gap="sizeSmall" align="center">
            <Switch aria-label="Compact sidebar" />
            <Text variant="bodyMd">Compact sidebar</Text>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
