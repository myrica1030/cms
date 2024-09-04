/// <reference types="vitest" />
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import reactPlugin from '@vitejs/plugin-react-swc'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'

const resolve = (subPath: string) => path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), subPath)
const isCI = !!process.env.CI
const API_URL = String(process.env.CMS_API_URL ?? `http://localhost:${process.env.CMS_API_PORT}`)

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'CMS_',
  resolve: {
    alias: {
      src: resolve('src'),
    },
  },
  plugins: [
    reactPlugin(),
    codecovVitePlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'cms-admin',
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 768,
  },
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        configure: proxy => {
          proxy.on('proxyReq', request => {
            // eslint-disable-next-line no-console
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${request.method} ${request.path}' sent`)
          })
          proxy.on('proxyRes', (res, request) => {
            // eslint-disable-next-line no-console
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${request.method} ${request.url}' was proxy with response ${res.statusCode}`)
          })
        },
      },
    },
  },
  test: {
    name: 'admin-unit',
    globals: true,
    testTimeout: 4000,
    setupFiles: 'src/setup-tests.ts',
    environment: 'happy-dom',
    reporters: isCI ? ['basic', 'json', 'junit'] : 'default',
    include: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.{spec,test}.{ts,tsx}',
    ],
    alias: {
      '**/*.(css|sass|scss)$': resolve('./scripts/test-mock/mock-css.js'),
      '**/*.(jpg|svg)$': resolve('./scripts/test-mock/mock-file.js'),
    },
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.{form,context}.ts?(x)',
        '!src/services/{index,api}.ts',
        '!src/constants/**',
        '!src/{index,App}.tsx',
        '!src/{appMenu,serviceWorker,fixtures}.ts',
      ],
    },
  },
})
