import { useState } from "react";
import { Radio, Stack } from "@pelagornis/page/components";

const plans = [
  { value: "basic", label: "Basic", description: "For personal docs" },
  { value: "pro", label: "Pro", description: "Includes versioned docs" },
  { value: "team", label: "Team", description: "Shared workspaces" },
];

export default function RadioDemo() {
  const [plan, setPlan] = useState("pro");

  return (
    <Stack gap="sizeSmall" role="radiogroup" aria-label="Plan">
      {plans.map((item) => (
        <Radio
          key={item.value}
          name="plan"
          value={item.value}
          label={item.label}
          description={item.description}
          checked={plan === item.value}
          onChange={(event) => setPlan(event.target.value)}
        />
      ))}
    </Stack>
  );
}
