import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupHeading,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@pelagornis/page/components";

export default function CommandDemo() {
  return (
    <Command label="Commands" className="w-full max-w-sm">
      <CommandInput placeholder="Search commands…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <CommandGroupHeading>File</CommandGroupHeading>
          <CommandItem value="new" shortcut="⌘N">
            New file
          </CommandItem>
          <CommandItem value="open">Open</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup>
          <CommandGroupHeading>Edit</CommandGroupHeading>
          <CommandItem value="copy">Copy</CommandItem>
          <CommandItem value="paste">Paste</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
