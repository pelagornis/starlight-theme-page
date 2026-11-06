import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@pelagornis/page/components";

export default function DropdownDemo() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Options</Button>
      </DropdownTrigger>
      <DropdownContent align="start">
        <DropdownItem selected>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownSeparator />
        <DropdownItem disabled>Delete</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
