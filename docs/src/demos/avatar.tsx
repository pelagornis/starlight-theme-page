import { Avatar, AvatarIcon, AvatarText, Stack } from "@pelagornis/page/components";

export default function AvatarDemo() {
  return (
    <Stack direction="row" gap="sizeMedium" align="center" wrap>
      <Avatar layout="initials" size="sm">
        <AvatarText>JA</AvatarText>
      </Avatar>
      <Avatar layout="initials" size="md" showStatus status="online">
        <AvatarText>PG</AvatarText>
      </Avatar>
      <Avatar layout="icon" size="lg">
        <AvatarIcon name="person" />
      </Avatar>
    </Stack>
  );
}
