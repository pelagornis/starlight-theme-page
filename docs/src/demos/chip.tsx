import { useState } from "react";
import { Chip, Stack, Tag } from "@pelagornis/page/components";

export default function ChipDemo() {
  const [filters, setFilters] = useState(["astro", "react", "tokens"]);

  return (
    <Stack gap="sizeMedium">
      <Stack direction="row" gap="sizeSmall" wrap>
        <Chip>Default</Chip>
        <Chip variant="filled">Filled</Chip>
        <Chip variant="outline" size="sm">
          Small outline
        </Chip>
        <Tag variant="outline">Tag alias</Tag>
      </Stack>
      <Stack direction="row" gap="sizeSmall" wrap>
        {filters.map((filter) => (
          <Chip key={filter} onRemove={() => setFilters((current) => current.filter((item) => item !== filter))}>
            {filter}
          </Chip>
        ))}
      </Stack>
    </Stack>
  );
}
