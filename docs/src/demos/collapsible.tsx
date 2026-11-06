import { Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from "@pelagornis/page/components";

export default function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen className="w-full">
      <CollapsibleTrigger>Release notes</CollapsibleTrigger>
      <CollapsibleContent>
        <Text variant="bodyMd">The shell now uses RefineUI for the header, sidebar, search, and footer.</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}
