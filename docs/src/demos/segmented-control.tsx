import { useState } from "react";
import { SegmentedControl, SegmentedControlItem, Stack, Text } from "@pelagornis/page/components";

export default function SegmentedControlDemo() {
  const [view, setView] = useState("grid");

  return (
    <Stack gap="sizeSmall" align="center">
      <SegmentedControl value={view} onValueChange={setView} aria-label="View">
        <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
        <SegmentedControlItem value="list">List</SegmentedControlItem>
        <SegmentedControlItem value="board">Board</SegmentedControlItem>
      </SegmentedControl>
      <Text variant="captionMd">View: {view}</Text>
    </Stack>
  );
}
