import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@refineui/react';
import { useEffect, useState } from 'react';

type Theme = 'auto' | 'dark' | 'light';

const storageKey = 'starlight-theme';

function parseTheme(theme: unknown): Theme {
  return theme === 'auto' || theme === 'dark' || theme === 'light' ? theme : 'auto';
}

function systemTheme(): 'dark' | 'light' {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme === 'auto' ? systemTheme() : theme;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(storageKey, theme === 'auto' ? '' : theme);
  }
}

export function ThemeSelect({
  label,
  dark,
  light,
  auto,
}: {
  label: string;
  dark: string;
  light: string;
  auto: string;
}) {
  const [value, setValue] = useState<Theme>('auto');

  useEffect(() => {
    const stored = parseTheme(
      typeof localStorage !== 'undefined' ? localStorage.getItem(storageKey) || 'auto' : 'auto',
    );
    setValue(stored);
    applyTheme(stored);

    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      const current = parseTheme(localStorage.getItem(storageKey) || 'auto');
      if (current === 'auto') applyTheme('auto');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const theme = parseTheme(next);
        setValue(theme);
        applyTheme(theme);
      }}
    >
      <SelectTrigger aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">{light}</SelectItem>
        <SelectItem value="dark">{dark}</SelectItem>
        <SelectItem value="auto">{auto}</SelectItem>
      </SelectContent>
    </Select>
  );
}
