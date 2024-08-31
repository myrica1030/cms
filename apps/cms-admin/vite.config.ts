/// <reference types="vitest" />
import path from 'node:path'
import url from 'node:url'
import reactPlugin from '@vitejs/plugin-react-swc'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'

const resolve = (subPath: string) => path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), subPath)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve('src'),
    },
  },
  plugins: [
    reactPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 768,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: proxy => {
          proxy.on('proxyReq', req => {
            // eslint-disable-next-line no-console
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${req.method} ${req.path}' sent`)
          })
          proxy.on('proxyRes', (res, req) => {
            // eslint-disable-next-line no-console
            console.log(dayjs().format('HH:mm:ss.SSS'), `Request '${req.method} ${req.url}' was proxy with response ${res.statusCode}`)
          })
        },
      },
    },
  },
  test: {
    globals: true,
    testTimeout: 4000,
    setupFiles: 'src/setupTests.ts',
    environment: 'happy-dom',
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
      thresholds: {
        perFile: true,
        branches: -10,
        functions: -5,
        statements: -15,
        lines: -20,
      },
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
