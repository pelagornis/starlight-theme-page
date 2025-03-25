import type { ViteUserConfig } from 'astro'
import type { PageConfig } from './config'

export function vitePluginStarlightThemeBlack(config: PageConfig): VitePlugin {
  const moduleId = 'virtual:page-config'
  const resolvedModuleId = `\0${moduleId}`
  const moduleContent = `export default ${JSON.stringify(config)}`

  return {
    name: 'vite-plugin-page',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]