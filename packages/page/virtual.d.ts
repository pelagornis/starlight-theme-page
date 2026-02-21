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

// 패키지에 이미 dist/index.d.ts 가 있으나, 이 워크스페이스에서 resolve 안 될 수 있어 fallback 선언.
// 제거해도 되며, 그때는 프로젝트에서 @refineui/web-icons 가 resolve되도록 해야 함.
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