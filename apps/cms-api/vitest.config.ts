import path from 'node:path'
import process from 'node:process'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

const isCI = !!process.env.CI

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      common: path.resolve(__dirname, 'src/_common'),
      infra: path.resolve(__dirname, 'src/_infra'),
    },
  },
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
    env: {
      APP_SECRET: 'secret',
    },
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
