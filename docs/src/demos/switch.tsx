import { useState } from "react";
import { Stack, Switch, Text } from "@pelagornis/page/components";

export default function SwitchDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Stack direction="row" gap="sizeSmall" align="center">
      <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Auto update" />
      <Text variant="bodyMd">Auto update is {enabled ? "on" : "off"}</Text>
    </Stack>
  );
}
