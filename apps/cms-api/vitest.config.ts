import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    swc.vite() as any,
  ],
  test: {
    name: 'api-unit',
    globals: true,
    include: ['src/**/*.spec.ts'],
    reporters: ['text', 'html', 'json', 'junit'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'src/*.ts',
        'src/**/*.{module,dto,ro,strategy,controller,fixture}.ts',
      ],
    },
  },
})
