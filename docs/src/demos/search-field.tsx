import { useState } from "react";
import { SearchField, Stack, Text } from "@pelagornis/page/components";

export default function SearchFieldDemo() {
  const [query, setQuery] = useState("");

  return (
    <Stack gap="sizeSmall" className="w-full max-w-sm">
      <SearchField value={query} onValueChange={setQuery} aria-label="Search components" />
      <SearchField appearance="plain" defaultValue="tokens" aria-label="Plain search" />
      <Text variant="captionMd">Query: {query || "—"}</Text>
    </Stack>
  );
}
