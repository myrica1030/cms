import path from 'node:path'
import process from 'node:process'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import { config } from 'dotenv'
import UnoCSS from 'unocss/vite'
import unpluginAutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import unpluginIcons from 'unplugin-icons/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import unpluginComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteSvgLoader from 'vite-svg-loader'
import { configDefaults } from 'vitest/config'

const __dirname = import.meta.dirname

config({ path: [path.join(__dirname, '../../.env')] })

const isCI = process.env.CI
const apiUrl = String(process.env.CMS_API_URL ?? `http://localhost:${process.env.CMS_API_PORT}`)

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'CMS_',
  resolve: {
    alias: {
      '@/assets': path.join(__dirname, 'src/assets'),
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    UnoCSS(),
    vue(),
    vueJsx(),
    vueDevTools(),
    viteSvgLoader(),
    unpluginAutoImport({
      vueTemplate: true,
      imports: ['vue', '@vueuse/core'],
      viteOptimizeDeps: false,
      dts: 'src/types/auto-imports.d.ts',
    }),
    unpluginIcons({
      customCollections: {
        svg: FileSystemIconLoader(path.join(__dirname, 'src/assets/svg')),
      },
    }),
    unpluginComponents({
      dts: 'src/types/components.d.ts',
      resolvers: [
        PrimeVueResolver(),

        // Load `@/assets/svg` as icon
        // Usage: <IconSvgLogo class="font-size-10" />
        IconsResolver({ prefix: 'icon', customCollections: ['svg'] }),

        // Load `@/assets/svg` as component
        // Usage: <SvgLogo class="w-54" />
        componentName => {
          if (componentName.startsWith('Svg')) {
            const name = componentName.slice(3).replaceAll(/([A-Z])/g, '-$1').toLowerCase().slice(1)
            return { as: componentName, from: `@/assets/svg/${name}.svg` }
          }
        },
      ],
    }),
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
        target: apiUrl,
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
    root: __dirname,
    include: [
      '**/__tests__/**/*.{ts,tsx}',
      '**/*.{spec,test}.{ts,tsx}',
    ],
    exclude: [...configDefaults.exclude, 'e2e/**'],
    testTimeout: 4000,
    setupFiles: 'src/setup-tests.ts',
    environment: 'happy-dom',
    reporters: isCI ? ['basic', 'json', 'junit'] : 'default',
    alias: {
      '**/*.(css|sass|scss)$': path.resolve('./scripts/test-mock/mock-css.js'),
      '**/*.(jpg|svg)$': path.resolve('./scripts/test-mock/mock-file.js'),
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
