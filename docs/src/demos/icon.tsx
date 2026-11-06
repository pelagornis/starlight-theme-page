import { Stack, WebIcon } from "@pelagornis/page/components";

const icons = ["search", "add", "settings", "home", "document", "chevron_right"];

export default function IconDemo() {
  return (
    <Stack direction="row" gap="sizeLarge" align="center" wrap>
      {icons.map((name) => (
        <WebIcon key={name} name={name} size={24} color="currentColor" aria-label={name} />
      ))}
      <WebIcon name="heart" size={24} iconStyle="filled" color="currentColor" aria-label="heart filled" />
    </Stack>
  );
}
