import { Bubble, BubbleContent, BubbleGroup } from "@pelagornis/page/components";

export default function BubbleDemo() {
  return (
    <BubbleGroup className="w-full max-w-md">
      <Bubble variant="muted" align="start">
        <BubbleContent>Does the theme support Markdoc?</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Yes. Register a tag with an Astro wrapper.</BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="start">
        <BubbleContent>Great, thanks.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  );
}
