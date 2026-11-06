import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@refineui/react';

export interface HeaderNavItem {
  href: string;
  label: string;
  active: boolean;
}

export function HeaderNav({ items, label }: { items: HeaderNavItem[]; label: string }) {
  if (items.length === 0) return null;

  return (
    <NavigationMenu aria-label={label}>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink href={item.href} active={item.active}>
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
