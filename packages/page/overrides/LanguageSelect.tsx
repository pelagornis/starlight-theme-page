import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@refineui/react';

export interface LanguageOption {
  value: string;
  label: string;
}

export function LanguageSelect({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: LanguageOption[];
}) {
  if (options.length < 2) return null;

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next && next !== value) window.location.pathname = next;
      }}
    >
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
