import path from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
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

// https://vitejs.dev/config/
export default defineConfig({
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
      imports: ['vue'],
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
  ],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
})
