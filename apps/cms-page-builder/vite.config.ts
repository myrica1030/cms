/// <reference types="vitest" />
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import \'src/style/variables\';',
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['ion-icon'].includes(tag),
        },
      },
    }),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'cms-page-builder',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  test: {
    name: 'page-builder-unit',
    reporters: ['basic', 'html', 'json', 'junit'],
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.(spec|test).ts',
    ],
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/__test__/',
      ],
    },
  },
})
