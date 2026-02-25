declare module '@astrojs/starlight/components/Search.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
  const component: AstroComponentFactory
  export default component
}

declare module 'virtual:starlight/user-images' {
  type ImageMetadata = import('astro').ImageMetadata
  export const logos: {
    dark?: ImageMetadata
    light?: ImageMetadata
  }
}

// Package may have dist/index.d.ts but resolve can fail in this workspace; fallback declaration.
// Can be removed if @refineui/web-icons is resolved in the project.
declare module '@refineui/web-icons' {
  type IconFn = (size?: number, color?: string, className?: string) => string
  export const createIconHTML: (iconName: string, style: 'regular' | 'filled') => IconFn
  export const Lightbulb: IconFn
  export const Moon: IconFn
  export const Search: IconFn
  export const Menu: IconFn
  export const Globe: IconFn
  export const Chat: IconFn
  export const Close: IconFn
  export const ArrowRight: IconFn
  export const ArrowUp: IconFn
}