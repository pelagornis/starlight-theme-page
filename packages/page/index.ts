import type { StarlightPlugin } from '@astrojs/starlight/types';

import { overrideComponents } from './utils/starlight';

export default function pagePlugin(): StarlightPlugin {
  return {
    name: 'page-plugin',
    hooks: {
      'config:setup': function({ config: starlightConfig, logger, updateConfig, addIntegration }) {
        updateConfig({
            components: overrideComponents(
              starlightConfig,
              [  
                'Search'
              ],
              logger
            ),
        })
      }
    }
  }
}