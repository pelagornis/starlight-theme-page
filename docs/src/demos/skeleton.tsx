import { Skeleton, Stack } from "@pelagornis/page/components";

export default function SkeletonDemo() {
  return (
    <Stack direction="row" gap="sizeMedium" align="center" className="w-full max-w-sm">
      <Skeleton width={48} height={48} shape="circle" />
      <Stack gap="sizeXSmall" className="flex-1">
        <Skeleton width="60%" height={16} />
        <Skeleton width="100%" height={12} />
      </Stack>
    </Stack>
  );
}
