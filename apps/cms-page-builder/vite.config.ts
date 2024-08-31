import path from 'node:path'
import url from 'node:url'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

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
      reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['ion-icon'].includes(tag),
        },
      },
    }),
  ],
})
