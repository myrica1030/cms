import { defineConfig } from 'cypress'
import viteConfig from './vite.config'

export default defineConfig({
  viewportWidth: 1200,

  e2e: {
    setupNodeEvents(_on, _config) {},
    baseUrl: 'http://localhost:5173',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig,
    },
  },
})
