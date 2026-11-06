import { useState } from "react";
import { Slider, Stack, Text } from "@pelagornis/page/components";

export default function SliderDemo() {
  const [volume, setVolume] = useState(40);

  return (
    <Stack gap="sizeSmall" className="w-full max-w-sm">
      <Slider min={0} max={100} value={volume} onChange={setVolume} aria-label="Volume" />
      <Text variant="captionMd">Volume: {volume}</Text>
    </Stack>
  );
}
