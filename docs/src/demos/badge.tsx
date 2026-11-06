import { Badge, Stack } from "@pelagornis/page/components";

export default function BadgeDemo() {
  return (
    <Stack direction="row" gap="sizeSmall" align="center" wrap>
      <Badge>New</Badge>
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="outline">Beta</Badge>
      <Badge variant="success">Stable</Badge>
      <Badge variant="warning">Deprecated</Badge>
      <Badge variant="danger">Removed</Badge>
      <Badge variant="danger" layout="number">
        12
      </Badge>
    </Stack>
  );
}
