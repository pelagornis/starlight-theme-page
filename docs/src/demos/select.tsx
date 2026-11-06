import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@pelagornis/page/components";

export default function SelectDemo() {
  const [framework, setFramework] = useState("astro");

  return (
    <Select value={framework} onValueChange={setFramework}>
      <SelectTrigger aria-label="Framework">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Static</SelectLabel>
          <SelectItem value="astro">Astro</SelectItem>
          <SelectItem value="eleventy">Eleventy</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="next">Next.js</SelectItem>
      </SelectContent>
    </Select>
  );
}
