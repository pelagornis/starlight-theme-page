import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuLabel,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@pelagornis/page/components";

export default function MenuDemo() {
  return (
    <Menu>
      <MenuTrigger>
        <Button variant="outline">File</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuLabel>File</MenuLabel>
          <MenuItem shortcut="⌘N">New file</MenuItem>
          <MenuItem shortcut="⌘O" description="Open from disk">
            Open
          </MenuItem>
          <MenuDivider />
          <MenuItem state="disabled">Save</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}
