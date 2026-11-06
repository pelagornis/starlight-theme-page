import { Avatars, Stack } from "@pelagornis/page/components";

const team = [
  { alt: "Jihoon Ahn" },
  { alt: "Mina Park" },
  { alt: "Leo Kim" },
  { alt: "Sora Lee" },
  { alt: "Ren Ito" },
];

export default function AvatarsDemo() {
  return (
    <Stack gap="sizeLarge">
      <Avatars avatars={team} max={3} />
      <Avatars avatars={team} size="lg" layout="spread" max={4} />
    </Stack>
  );
}
