import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pelagornis/page/components";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="install" className="w-full">
      <AccordionItem value="install">
        <AccordionTrigger>How do I install the theme?</AccordionTrigger>
        <AccordionContent>Run bun add @pelagornis/page and register the plugin in Starlight.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="css">
        <AccordionTrigger>Do I import any CSS?</AccordionTrigger>
        <AccordionContent>No. The plugin injects the RefineUI stylesheets.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="components">
        <AccordionTrigger>Where do components come from?</AccordionTrigger>
        <AccordionContent>@pelagornis/page/components re-exports @refineui/react.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
