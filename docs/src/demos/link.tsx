import { Link, Stack } from "@pelagornis/page/components";

export default function LinkDemo() {
  return (
    <Stack direction="row" gap="sizeLarge" align="center" wrap>
      <Link href="/guides/getting-started/">Getting started</Link>
      <Link href="https://ui.pelagornis.com/" target="_blank">
        RefineUI
      </Link>
      <Link href="https://ui.pelagornis.com/" target="_blank" showExternalIcon={false}>
        Without icon
      </Link>
      <Link href="/" disabled>
        Disabled
      </Link>
    </Stack>
  );
}
