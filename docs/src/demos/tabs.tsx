import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "@pelagornis/page/components";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text variant="bodyMd">Tabs switch between panes in place.</Text>
      </TabsContent>
      <TabsContent value="usage">
        <Text variant="bodyMd">Give each trigger and content the same value.</Text>
      </TabsContent>
      <TabsContent value="tokens">
        <Text variant="bodyMd">The indicator uses RefineUI motion tokens.</Text>
      </TabsContent>
    </Tabs>
  );
}
