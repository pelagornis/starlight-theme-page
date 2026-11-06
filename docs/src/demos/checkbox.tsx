import { useState } from "react";
import { Checkbox, Stack } from "@pelagornis/page/components";

export default function CheckboxDemo() {
  const [notify, setNotify] = useState(true);

  return (
    <Stack gap="sizeSmall">
      <Checkbox label="Accept terms and conditions" />
      <Checkbox
        label="Enable notifications"
        description="Receive updates about releases"
        checked={notify}
        onChange={(event) => setNotify(event.target.checked)}
      />
      <Checkbox variant="circular" label="Circular" defaultChecked />
      <Checkbox label="Disabled" disabled />
    </Stack>
  );
}
