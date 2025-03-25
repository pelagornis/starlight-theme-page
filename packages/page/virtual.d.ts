declare module 'virtual:page-config' {
    const PageConfig: import('./utils/config').PageConfig
  
    export default PageConfig
  }
  
  declare module 'virtual:starlight/user-config' {
    const UserConfig: import('@astrojs/starlight/types').StarlightConfig

    export default UserConfig
  }
  
  declare module 'virtual:starlight/user-images' {
    type ImageMetadata = import('astro').ImageMetadata
    export const logos: {
      dark?: ImageMetadata
      light?: ImageMetadata
    }
  }
  
  declare module 'virtual:starlight/pagefind-config' {
    export const pagefindUserConfig: Partial<
      Extract<import('@astrojs/starlight/types').StarlightConfig['pagefind'], object>
    >
  }