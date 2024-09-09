import { defineConfig } from 'cypress'
import viteConfig from './vite.config'

export default defineConfig({
  viewportWidth: 1200,
  reporter: 'cypress-multi-reporters',

  video: false,

  e2e: {
    setupNodeEvents(_on, _config) {},
    baseUrl: 'http://localhost:5173',
    reporterOptions: {
      reporterEnabled: 'list, mocha-junit-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junit-e2e.xml',
      },
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig,
    },
    reporterOptions: {
      reporterEnabled: 'list, mocha-junit-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junit-component.xml',
      },
    },
  },
})
