import process from 'node:process'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

const isCI = !!process.env.CI

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }) as any,
  ],
  test: {
    name: 'api-unit',
    globals: true,
    include: ['src/**/*.spec.ts'],
    reporters: isCI ? ['basic', 'json', 'junit'] : 'default',
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
